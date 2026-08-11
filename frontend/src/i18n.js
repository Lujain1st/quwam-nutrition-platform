// i18n Dictionary supporting bilingual Arabic (RTL) and English (LTR)
export const translations = {
  ar: {
    dir: "rtl",
    brandName: "قِوام",
    brandEn: "QAWAAM",
    tagline: "#قوام_لاتزان_الحياة",
    nav: {
      home: "الرئيسية",
      register: "التسجيل",
      interview: "اللقاء الاستشاري",
      generate: "التعديل والتوليد",
      plan: "خطة المريض",
      admin: "لوحة الادارة"
    },
    common: {
      language: "English",
      confirmedTag: "مؤكد فوراً",
      draftTag: "مسودة - بانتظار مراجعة الأخصائي",
      optional: "اختياري",
      required: "مطلوب",
      save: "حفظ",
      submit: "إرسال البيانات",
      viewFile: "عرض الملف",
      upload: "رفع ملف",
      status: "الحالة",
      actions: "الإجراءات"
    },
    landing: {
      heroTitle: "منصة إلكترونية تأخذك باستمتاع في رحلة لتحقيق نمط حياة صحي",
      heroSub: "نظام خبير ذكي يساعد أخصائيي التغذية على توليد خطط مخصصة وإدارة بيانات المرضى بكل دقة وسهولة.",
      valuesTitle: "قيمنا الأساسية",
      val1Title: "الصحة",
      val1Desc: "رفع مستوى الوعي التغذوي والبدني لمدى الحياة.",
      val2Title: "التأثير",
      val2Desc: "استخدام الذكاء الاصطناعي لتمكين الأخصائيين وتوفير الوقت.",
      val3Title: "الدعم المجتمعي",
      val3Desc: "شراكة حقيقية بين الأخصائي والمريض لتحقيق الاتزان."
    },
    registration: {
      specialistTab: "تسجيل الأخصائي",
      patientTab: "تسجيل المريض",
      specialistNotice: "تنبيه: ستقوم الإدارة بمراجعة الشهادة وتفعيل حسابك قبل البدء في استقبال المرضى.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      specialty: "التخصص الدقيق",
      certificate: "رفع الشهادة المهنية (PDF / صورة)",
      name: "الاسم الكامل",
      nationalId: "رقم الهوية / الإقامة",
      dob: "تاريخ الميلاد",
      weight: "الوزن (كجم)",
      height: "الطول (سم)",
      activity: "مستوى النشاط البدني",
      allergy: "الحساسيات والأطعمة الممنوعة",
      labResults: "نتائج التحاليل المخبرية (PDF / صورة)",
      submittedSuccess: "تم حفظ البيانات بنجاح!"
    },
    interview: {
      title: "اللقاء الاستشاري ومراجعة البيانات",
      selectPatient: "اختر المريض للمراجعة:",
      labSectionTitle: "نتائج التحاليل المخبرية المرفقة",
      noLabFile: "لم يتم إرفاق تحاليل مخبرية من قبل المريض.",
      notesTitle: "ملاحظات وتوصيات الأخصائي (اختياري)",
      notesPlaceholder: "اكتب انطباعك أو أي أعراض صحية لاحظتها خلال اللقاء...",
      proceedBtn: "حفظ البيانات والانتقال لتوليد الخطة"
    },
    generate: {
      title: "شاشة التعديل والتوليد الذكي (Fuzzy Logic & AI)",
      patientProfile: "بيانات المريض الأساسية",
      bmiLabel: "مؤشر كتلة الجسم (BMI):",
      tdeeLabel: "الاحتياج اليومي (TDEE):",
      bmrLabel: "معدل التمثيل الأساسي (BMR):",
      macroAdjust: "ضبط توزيع الماكروز (الكربوهيدرات / البروتين / الدهون)",
      generateBtn: "توليد الجدول الغذائي الذكي",
      generatedPlanTitle: "النموذج الأولي للخطّة المُولّدة"
    },
    patientPlan: {
      title: "خطتك الغذائية المخصصة",
      preparedBy: "إعداد الأخصائي:",
      downloadPdf: "تحميل الخطة (PDF)",
      print: "طباعة",
      breakfast: "الإفطار",
      lunch: "الغداء",
      dinner: "العشاء",
      snack: "وجبة خفيفة"
    },
    admin: {
      title: "لوحة تحكم Admin المنصة",
      pendingSpecs: "طلبات الأخصائيين الموعد مراجعتها",
      activeSpecs: "الأخصائيون المعتمدون",
      approveBtn: "اعتماد وتفعيل",
      rejectBtn: "رفض"
    }
  },
  en: {
    dir: "ltr",
    brandName: "QAWAAM",
    brandEn: "قِوام",
    tagline: "#Qawaam_For_Balanced_Life",
    nav: {
      home: "Home",
      register: "Registration",
      interview: "Clinical Interview",
      generate: "Edit & Generate",
      plan: "Patient Plan",
      admin: "Admin Dashboard"
    },
    common: {
      language: "عربي",
      confirmedTag: "Confirmed Immediately",
      draftTag: "Draft - Pending Specialist Review",
      optional: "Optional",
      required: "Required",
      save: "Save",
      submit: "Submit Data",
      viewFile: "View File",
      upload: "Upload File",
      status: "Status",
      actions: "Actions"
    },
    landing: {
      heroTitle: "An interactive platform guiding you toward a healthy lifetime balanced lifestyle",
      heroSub: "An intelligent expert system assisting clinical dietitians to generate personalized meal plans with ease and precision.",
      valuesTitle: "Core Values",
      val1Title: "Health",
      val1Desc: "Raising long-term nutritional and physical awareness.",
      val2Title: "Impact",
      val2Desc: "Empowering specialists with AI to save time and optimize accuracy.",
      val3Title: "Community Support",
      val3Desc: "A genuine partnership between patient and specialist for balance."
    },
    registration: {
      specialistTab: "Specialist Registration",
      patientTab: "Patient Registration",
      specialistNotice: "Notice: Admin will review your certificate and activate your account before you can receive patients.",
      email: "Email Address",
      password: "Password",
      specialty: "Clinical Specialty",
      certificate: "Upload Professional Certificate (PDF / Image)",
      name: "Full Name",
      nationalId: "National ID / Iqama",
      dob: "Date of Birth",
      weight: "Weight (kg)",
      height: "Height (cm)",
      activity: "Physical Activity Level",
      allergy: "Allergies & Food Intolerances",
      labResults: "Lab Results / Blood Tests (PDF / Image)",
      submittedSuccess: "Data saved successfully!"
    },
    interview: {
      title: "Clinical Interview & Data Review",
      selectPatient: "Select Patient to Review:",
      labSectionTitle: "Uploaded Lab Test Results",
      noLabFile: "No lab result file uploaded by patient.",
      notesTitle: "Specialist Clinical Notes (Optional)",
      notesPlaceholder: "Enter clinical observations, medical conditions, or interview notes...",
      proceedBtn: "Save & Proceed to Plan Generation"
    },
    generate: {
      title: "Smart Edit & Plan Generation (Fuzzy Logic & AI)",
      patientProfile: "Patient Core Profile",
      bmiLabel: "Body Mass Index (BMI):",
      tdeeLabel: "Total Energy Expenditure (TDEE):",
      bmrLabel: "Basal Metabolic Rate (BMR):",
      macroAdjust: "Macro Breakdown Adjustment (Carbs / Protein / Fats)",
      generateBtn: "Generate Smart Meal Plan",
      generatedPlanTitle: "Generated Plan Preview"
    },
    patientPlan: {
      title: "Your Personalized Nutrition Plan",
      preparedBy: "Prepared by Specialist:",
      downloadPdf: "Download PDF",
      print: "Print Plan",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack"
    },
    admin: {
      title: "Platform Admin Dashboard",
      pendingSpecs: "Pending Specialist Approvals",
      activeSpecs: "Approved Specialists",
      approveBtn: "Approve & Activate",
      rejectBtn: "Reject"
    }
  }
};