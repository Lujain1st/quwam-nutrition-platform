from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class RuleBase(Base):
    __tablename__ = "rule_bases"

    rule_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    rule_type = Column(String, nullable=False)
    condition_text = Column(String, nullable=False)
    action_text = Column(String, nullable=False)
    priority_weight = Column(Integer, nullable=False)
    created_by = Column(Integer, ForeignKey("specialists.specialist_id"), nullable=False)

    # العلاقة (Relationship)
    creator = relationship("Specialist", back_populates="created_rules")
