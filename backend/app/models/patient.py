from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import relationship
from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    patient_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    national_id = Column(String, unique=True, nullable=False, index=True)
    birth_date = Column(Date, nullable=False)
    age = Column(Integer, nullable=True)
    sex = Column(String, nullable=True)
    height_cm = Column(Float, nullable=True)
    weight_kg = Column(Float, nullable=True)
    activity_level = Column(String, nullable=True)
    case_type = Column(String, nullable=True)
    data_status = Column(String, nullable=False, default="draft")  # 'draft' أو 'confirmed'

    # العلاقات مع الجداول الأخرى (Relationships)
    anthropometrics = relationship("Anthropometrics", back_populates="patient", cascade="all, delete-orphan")
    lab_results = relationship("LabResult", back_populates="patient", cascade="all, delete-orphan")
    disease_profiles = relationship("DiseaseProfile", back_populates="patient", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="patient", cascade="all, delete-orphan")
    follow_ups = relationship("FollowUp", back_populates="patient", cascade="all, delete-orphan")
    prescriptions = relationship("NutritionPrescription", back_populates="patient", cascade="all, delete-orphan")
