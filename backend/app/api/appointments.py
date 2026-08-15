from typing import List, Optional
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.appointment import Appointment
from app.models.patient import Patient
from app.models.specialist import Specialist

router = APIRouter(prefix="/appointments", tags=["Appointments"])


# Schemas (نماذج التحقق من البيانات)
class AppointmentCreate(BaseModel):
    patient_id: int
    specialist_id: int
    appt_date: date
    appt_time: str
    zoom_link: Optional[str] = None


class AppointmentUpdateZoom(BaseModel):
    zoom_link: str


class AppointmentResponse(BaseModel):
    appointment_id: int
    patient_id: int
    specialist_id: int
    appt_date: date
    appt_time: str
    zoom_link: Optional[str]
    status: str

    class Config:
        from_attributes = True


# Endpoints
@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def create_appointment(appt_in: AppointmentCreate, db: Session = Depends(get_db)):
    """حجز موعد جديد بين المريض والأخصائي"""
    patient = db.query(Patient).filter(Patient.patient_id == appt_in.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="المريض غير موجود")

    specialist = db.query(Specialist).filter(Specialist.specialist_id == appt_in.specialist_id).first()
    if not specialist:
        raise HTTPException(status_code=404, detail="الأخصائي غير موجود")

    appointment = Appointment(
        patient_id=appt_in.patient_id,
        specialist_id=appt_in.specialist_id,
        appt_date=appt_in.appt_date,
        appt_time=appt_in.appt_time,
        zoom_link=appt_in.zoom_link,
        status="scheduled"
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("/patient/{patient_id}", response_model=List[AppointmentResponse])
def get_patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    """استرجاع كل مواعيد مريض معين"""
    return db.query(Appointment).filter(Appointment.patient_id == patient_id).all()


@router.get("/specialist/{specialist_id}", response_model=List[AppointmentResponse])
def get_specialist_appointments(specialist_id: int, db: Session = Depends(get_db)):
    """استرجاع كل مواعيد أخصائي معين"""
    return db.query(Appointment).filter(Appointment.specialist_id == specialist_id).all()


@router.put("/{appointment_id}/zoom-link", response_model=AppointmentResponse)
def update_zoom_link(appointment_id: int, zoom_data: AppointmentUpdateZoom, db: Session = Depends(get_db)):
    """إضافة أو تحديث رابط Zoom للموعد"""
    appt = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="الموعد غير موجود")

    appt.zoom_link = zoom_data.zoom_link
    db.commit()
    db.refresh(appt)
    return appt
