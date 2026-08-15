from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Anthropometrics(Base):
    __tablename__ = "anthropometrics"

    record_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    record_date = Column(Date, nullable=False)
    weight_kg = Column(Float, nullable=False)
    bmi = Column(Float, nullable=True)
    waist_cm = Column(Float, nullable=True)

    # العلاقة مع المريض
    patient = relationship("Patient", back_populates="anthropometrics")
