from sqlalchemy import Column, Integer, String
from app.database import Base


class PortionReferenceTable(Base):
    __tablename__ = "portion_reference_tables"

    reference_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    calorie_level = Column(Integer, nullable=False)
    scenario_label = Column(String, nullable=False)  # 'Balanced', 'High-Protein', 'Moderate-Carb', 'High-Carb'
    cooked_vegetable = Column(Integer, nullable=False)
    green_salad = Column(Integer, nullable=False)
    fruit = Column(Integer, nullable=False)
    starch = Column(Integer, nullable=False)
    meat_portions = Column(String, nullable=False)
    fats_and_oil = Column(Integer, nullable=False)
    actual_diet_calorie = Column(Integer, nullable=False)
    calorie_difference = Column(Integer, nullable=False)
