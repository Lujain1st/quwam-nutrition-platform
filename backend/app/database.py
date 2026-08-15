import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# رابط الاتصال بقاعدة بيانات SQLite المحلية
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./qawaam.db")

# خيارات خاصة بـ SQLite للسماح بالاتصال من عدة مسارات
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# إنشاء محرك قاعدة البيانات (Engine)
engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False
)

# إنشاء مصنع الجلسات (SessionLocal)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# القاعدة الأساسية التي ستورث منها كل النماذج (Base)
Base = declarative_base()


def get_db():
    """دالة للحصول على جلسة قاعدة البيانات لكل طلب API"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """دالة لإنشاء جميع الجداول عند تشغيل التطبيق لأول مرة"""
    import app.models  # noqa: F401
    Base.metadata.create_all(bind=engine)
