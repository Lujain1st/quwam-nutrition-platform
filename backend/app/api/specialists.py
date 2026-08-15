from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.specialist import Specialist

router = APIRouter(prefix="/specialists", tags=["Specialists"])


# Schemas (نماذج التحقق من البيانات)
class SpecialistRegister(BaseModel):
    name: str


class SpecialistApprove(BaseModel):
    approval_status: str  # 'approved' أو 'rejected'


class SpecialistResponse(BaseModel):
    specialist_id: int
    name: str
    approval_status: str
    reviewed_by: Optional[int]
    can_review_registrations: bool
    can_edit_knowledge_base: bool

    class Config:
        from_attributes = True


# Endpoints
@router.post("/register", response_model=SpecialistResponse, status_code=status.HTTP_201_CREATED)
def register_specialist(specialist_in: SpecialistRegister, db: Session = Depends(get_db)):
    """تسجيل أخصائي جديد (تكون حالته المبدئية pending بانتظار الموافقة)"""
    existing = db.query(Specialist).filter(Specialist.name == specialist_in.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="اسم الأخصائي مسجل بالفعل"
        )

    new_specialist = Specialist(
        name=specialist_in.name,
        approval_status="pending",
        can_review_registrations=False,
        can_edit_knowledge_base=False
    )
    
    db.add(new_specialist)
    db.commit()
    db.refresh(new_specialist)
    return new_specialist


@router.get("/pending", response_model=List[SpecialistResponse])
def get_pending_specialists(db: Session = Depends(get_db)):
    """استرجاع قائمة طلبات التسجيل التي بانتظار الموافقة"""
    return db.query(Specialist).filter(Specialist.approval_status == "pending").all()


@router.put("/{specialist_id}/review", response_model=SpecialistResponse)
def review_specialist(
    specialist_id: int,
    review_data: SpecialistApprove,
    reviewer_id: int,
    db: Session = Depends(get_db)
):
    """اعتماد أو رفض حساب الأخصائي بواسطة أخصائي يملك صلاحية can_review_registrations"""
    reviewer = db.query(Specialist).filter(Specialist.specialist_id == reviewer_id).first()
    if not reviewer or not reviewer.can_review_registrations:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="لا تملك الصلاحية لمراجعة وإقرار طلبات التسجيل"
        )

    target_specialist = db.query(Specialist).filter(Specialist.specialist_id == specialist_id).first()
    if not target_specialist:
        raise HTTPException(status_code=404, detail="الأخصائي غير موجود")

    if review_data.approval_status not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="حالة القبول يجب أن تكون approved أو rejected")

    target_specialist.approval_status = review_data.approval_status
    target_specialist.reviewed_by = reviewer_id

    db.commit()
    db.refresh(target_specialist)
    return target_specialist
