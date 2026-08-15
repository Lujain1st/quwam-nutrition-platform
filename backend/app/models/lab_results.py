from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class LabResult(Base):
    __tablename__ = "lab_results"

    lab_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    test_date = Column(Date, nullable=False)
    test_name = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    risk_flag = Column(String, nullable=True)

    # العلاقة مع المريض
    patient = relationship("Patient", back_populates="lab_results")
