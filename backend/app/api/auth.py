from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.database import get_db
from app.models.specialist import Specialist

# إعدادات الـ JWT (يمكن تغيير المفتاح السري لاحقاً)
SECRET_KEY = "qawaam_secret_key_change_in_production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 ساعات

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class Token(BaseModel):
    access_token: str
    token_type: str
    specialist_id: int
    can_review_registrations: bool
    can_edit_knowledge_base: bool


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # البحث عن الأخصائي
    specialist = db.query(Specialist).filter(Specialist.name == form_data.username).first()

    if not specialist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="اسم المستخدم غير صحيح",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # التأكد من حالة الاعتماد
    if specialist.approval_status != "approved":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="الحساب بانتظار موافقة المسؤول" if specialist.approval_status == "pending" else "تم رفض هذا الحساب"
        )

    # إنشاء التوكن وتمرير الصلاحيات
    access_token = create_access_token(
        data={
            "sub": str(specialist.specialist_id),
            "name": specialist.name,
            "can_review": specialist.can_review_registrations,
            "can_edit_kb": specialist.can_edit_knowledge_base
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "specialist_id": specialist.specialist_id,
        "can_review_registrations": specialist.can_review_registrations,
        "can_edit_knowledge_base": specialist.can_edit_knowledge_base
    }
