from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class FollowUp(Base):
    __tablename__ = "follow_ups"

    followup_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"), nullable=False)
    specialist_id = Column(Integer, ForeignKey("specialists.specialist_id"), nullable=False)
    followup_date = Column(Date, nullable=False)
    current_weight = Column(Float, nullable=False)
    adherence_notes = Column(String, nullable=True)

    # العلاقات (Relationships)
    patient = relationship("Patient", back_populates="follow_ups")
    specialist = relationship("Specialist", back_populates="follow_ups")
