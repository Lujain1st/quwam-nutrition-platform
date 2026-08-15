from fastapi import FastAPI
from app.database import init_db
from app.api import auth, patients, specialists, appointments, generate_plan

app = FastAPI(title="Qawaam API")

# إنشاء الجداول عند التشغيل
init_db()

# تسجيل المسارات (Routers)
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(specialists.router)
app.include_router(appointments.router)
app.include_router(generate_plan.router)

@app.get("/")
def root():
    return {"message": "Qawaam API is running successfully!"}
