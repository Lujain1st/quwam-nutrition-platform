from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    appointment_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    specialist_id = Column(Integer, ForeignKey("specialists.specialist_id"), nullable=False)
    appt_date = Column(Date, nullable=False)
    appt_time = Column(String, nullable=False)
    zoom_link = Column(String, nullable=True)
    status = Column(String, nullable=False, default="scheduled")

    # العلاقات (Relationships)
    patient = relationship("Patient", back_populates="appointments")
    specialist = relationship("Specialist", back_populates="appointments")
