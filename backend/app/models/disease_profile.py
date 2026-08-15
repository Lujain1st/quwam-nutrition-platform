from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class DiseaseProfile(Base):
    __tablename__ = "disease_profiles"

    disease_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    disease_name = Column(String, nullable=False)
    severity = Column(String, nullable=True)
    comorbidity_flag = Column(Boolean, nullable=False, default=False)

    # العلاقة مع المريض
    patient = relationship("Patient", back_populates="disease_profiles")
