from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Specialist(Base):
    __tablename__ = "specialists"

    specialist_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    approval_status = Column(String, nullable=False, default="pending")  # 'pending', 'approved', 'rejected'
    reviewed_by = Column(Integer, ForeignKey("specialists.specialist_id"), nullable=True)
    can_review_registrations = Column(Boolean, nullable=False, default=False)
    can_edit_knowledge_base = Column(Boolean, nullable=False, default=False)

    # العلاقات (Relationships)
    reviewer = relationship("Specialist", remote_side=[specialist_id], backref="reviewed_specialists")
    appointments = relationship("Appointment", back_populates="specialist")
    follow_ups = relationship("FollowUp", back_populates="specialist")
    prescriptions = relationship("NutritionPrescription", back_populates="specialist")
    created_rules = relationship("RuleBase", back_populates="creator")
