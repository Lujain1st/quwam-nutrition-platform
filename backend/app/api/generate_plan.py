from datetime import date
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.patient import Patient
from app.models.nutrition_prescription import NutritionPrescription

router = APIRouter(prefix="/generate-plan", tags=["Plan Generation"])


# Schemas (نماذج البيانات)
class PlanRequest(BaseModel):
    patient_id: int
    specialist_id: int
    macro_scenario: str = "Balanced"  # 'Balanced', 'High-Protein', 'Moderate-Carb', 'High-Carb'
    meal_count: int = 3
    diet_pattern: Optional[str] = "Standard"


class PrescriptionResponse(BaseModel):
    prescription_id: int
    patient_id: int
    specialist_id: int
    bmr: int
    tdee: int
    calorie_lower: int
    calorie_upper: int
    macro_scenario: str
    carb_g: int
    protein_g: int
    fat_g: int
    meal_count: int
    diet_pattern: Optional[str]
    status: str
    prescription_date: date

    class Config:
        from_attributes = True


# الدوال المساعدة للحسابات (Helper Functions)
def calculate_bmr(weight: float, height: float, age: int, sex: str) -> float:
    """حساب BMR باستخدام معادلة Mifflin-St Jeor"""
    if sex.lower() in ["male", "ذكر", "m"]:
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
    else:
        return (10 * weight) + (6.25 * height) - (5 * age) - 161


def get_activity_multiplier(level: Optional[str]) -> float:
    """تحديد معامل النشاط البدني"""
    multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "very_active": 1.725,
        "extra_active": 1.9
    }
    return multipliers.get(str(level).lower(), 1.2)


def calculate_macros(target_calories: float, scenario: str):
    """توزيع الماكروز بحسب السيناريو المحدد"""
    scenarios = {
        "Balanced": (0.50, 0.20, 0.30),       # 50% carb, 20% protein, 30% fat
        "High-Protein": (0.40, 0.30, 0.30),   # 40% carb, 30% protein, 30% fat
        "Moderate-Carb": (0.35, 0.25, 0.40),  # 35% carb, 25% protein, 40% fat
        "High-Carb": (0.60, 0.15, 0.25)       # 60% carb, 15% protein, 25% fat
    }
    carb_pct, protein_pct, fat_pct = scenarios.get(scenario, (0.50, 0.20, 0.30))

    carb_g = round((target_calories * carb_pct) / 4)
    protein_g = round((target_calories * protein_pct) / 4)
    fat_g = round((target_calories * fat_pct) / 9)

    return carb_g, protein_g, fat_g


# Endpoints
@router.post("/", response_model=PrescriptionResponse, status_code=status.HTTP_201_CREATED)
def generate_nutrition_plan(plan_in: PlanRequest, db: Session = Depends(get_db)):
    """توليد الخطة الغذائية للمريض بناءً على بياناته المعتمدة"""
    patient = db.query(Patient).filter(Patient.patient_id == plan_in.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="المريض غير موجود")

    # الاشتراط الأساسي: لا يتم التوليد إلا إذا كانت البيانات مؤكدة من المقابلة
    if patient.data_status != "confirmed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="لا يمكن توليد خطة غذائية لبيانات غير معتمدة (draft). يجب تأكيد المقابلة أولاً."
        )

    # 1. حساب BMR و TDEE
    bmr = calculate_bmr(patient.weight_kg, patient.height_cm, patient.age, patient.sex)
    act_mult = get_activity_multiplier(patient.activity_level)
    tdee = bmr * act_mult

    # 2. تحديد مدى السعرات (Deficit/Target Range)
    calorie_lower = int(tdee - 500)
    calorie_upper = int(tdee - 300)
    target_calories = (calorie_lower + calorie_upper) / 2

    # 3. حساب توزيع السعرات والماكروز
    carb_g, protein_g, fat_g = calculate_macros(target_calories, plan_in.macro_scenario)

    # 4. إنشاء السجل في قاعدة البيانات
    prescription = NutritionPrescription(
        patient_id=patient.patient_id,
        specialist_id=plan_in.specialist_id,
        bmr=round(bmr),
        tdee=round(tdee),
        calorie_lower=calorie_lower,
        calorie_upper=calorie_upper,
        macro_scenario=plan_in.macro_scenario,
        carb_g=carb_g,
        protein_g=protein_g,
        fat_g=fat_g,
        meal_count=plan_in.meal_count,
        diet_pattern=plan_in.diet_pattern,
        status="generated",
        prescription_date=date.today()
    )

    db.add(prescription)
    db.commit()
    db.refresh(prescription)
    return prescription
