from typing import List, Optional
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.patient import Patient
from app.models.anthropometrics import Anthropometrics

router = APIRouter(prefix="/patients", tags=["Patients"])


# Schemas (نماذج التحقق من البيانات)
class PatientCreate(BaseModel):
    name: str
    national_id: str
    birth_date: date
    # بيانات اختيارية يدخلها المريض بنفسه وتظل draft
    age: Optional[int] = None
    sex: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    activity_level: Optional[str] = None
    case_type: Optional[str] = "Obesity"


class PatientUpdateInterview(BaseModel):
    age: int
    sex: str
    height_cm: float
    weight_kg: float
    activity_level: str
    case_type: Optional[str] = "Obesity"


class PatientResponse(BaseModel):
    patient_id: int
    name: str
    national_id: str
    birth_date: date
    age: Optional[int]
    sex: Optional[str]
    height_cm: Optional[float]
    weight_kg: Optional[float]
    activity_level: Optional[str]
    case_type: Optional[str]
    data_status: str

    class Config:
        from_attributes = True


# Endpoints
@router.post("/register", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
def register_patient(patient_in: PatientCreate, db: Session = Depends(get_db)):
    """تسجيل المريض المبدئي (تحفظ البيانات كـ draft لحين المقابلة)"""
    existing = db.query(Patient).filter(Patient.national_id == patient_in.national_id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="رقم الهوية مسجل بالفعل"
        )

    patient = Patient(
        name=patient_in.name,
        national_id=patient_in.national_id,
        birth_date=patient_in.birth_date,
        age=patient_in.age,
        sex=patient_in.sex,
        height_cm=patient_in.height_cm,
        weight_kg=patient_in.weight_kg,
        activity_level=patient_in.activity_level,
        case_type=patient_in.case_type,
        data_status="draft"  # تبقى مسودة حتى يراجعها الأخصائي
    )
    
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


@router.get("/", response_model=List[PatientResponse])
def get_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """استرجاع قائمة جميع المرضى للأخصائي"""
    return db.query(Patient).offset(skip).limit(limit).all()


@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    """استرجاع بيانات مريض محدد"""
    patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="المريض غير موجود")
    return patient


@router.put("/{patient_id}/confirm-interview", response_model=PatientResponse)
def confirm_patient_interview(
    patient_id: int, 
    interview_data: PatientUpdateInterview, 
    db: Session = Depends(get_db)
):
    """مراجعة وتأكيد بيانات المريض خلال المقابلة (تحويل الحالة إلى confirmed)"""
    patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="المريض غير موجود")

    # تحديث البيانات السريرية وتأكيدها
    patient.age = interview_data.age
    patient.sex = interview_data.sex
    patient.height_cm = interview_data.height_cm
    patient.weight_kg = interview_data.weight_kg
    patient.activity_level = interview_data.activity_level
    patient.case_type = interview_data.case_type
    patient.data_status = "confirmed"  # اعتماد البيانات رسمياً

    # إضافة سجل قياسات جديد في جدول القياسات Anthropometrics
    bmi_val = round(interview_data.weight_kg / ((interview_data.height_cm / 100) ** 2), 2)
    new_record = Anthropometrics(
        patient_id=patient.patient_id,
        record_date=date.today(),
        weight_kg=interview_data.weight_kg,
        bmi=bmi_val
    )
    db.add(new_record)

    db.commit()
    db.refresh(patient)
    return patient
