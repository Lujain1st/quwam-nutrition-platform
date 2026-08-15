from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class FoodExchangeSelection(Base):
    __tablename__ = "food_exchange_selections"

    selection_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    prescription_id = Column(Integer, ForeignKey("nutrition_prescriptions.prescription_id"), nullable=False)
    exchange_category = Column(String, nullable=False)
    food_item = Column(String, nullable=False)
    portion_size = Column(Float, nullable=False)

    # العلاقة (Relationship)
    prescription = relationship("NutritionPrescription", back_populates="exchange_selections")
