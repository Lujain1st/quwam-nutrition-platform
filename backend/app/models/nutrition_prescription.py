from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class NutritionPrescription(Base):
    __tablename__ = "nutrition_prescriptions"

    prescription_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    specialist_id = Column(Integer, ForeignKey("specialists.specialist_id"), nullable=False)
    bmr = Column(Integer, nullable=False)
    tdee = Column(Integer, nullable=False)
    calorie_lower = Column(Integer, nullable=False)
    calorie_upper = Column(Integer, nullable=False)
    macro_scenario = Column(String, nullable=False)  # أحد السيناريوهات الـ 4 الثابتة
    carb_g = Column(Integer, nullable=False)
    protein_g = Column(Integer, nullable=False)
    fat_g = Column(Integer, nullable=False)
    meal_count = Column(Integer, nullable=False)
    diet_pattern = Column(String, nullable=True)
    status = Column(String, nullable=False)
    prescription_date = Column(Date, nullable=False)

    # العلاقات (Relationships)
    patient = relationship("Patient", back_populates="prescriptions")
    specialist = relationship("Specialist", back_populates="prescriptions")
    exchange_selections = relationship("FoodExchangeSelection", back_populates="prescription", cascade="all, delete-orphan")
