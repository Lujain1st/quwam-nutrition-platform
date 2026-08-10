import { useState } from "react";
 
/**
 * Shared translation dictionary for all Qawam screens.
 * Add new keys here as new screens are built, keeping ar/en in sync.
 */
export const translations = {
  ar: {
    dir: "rtl",
    // App shell
    appName: "قوام",
    appTagline: "منصة استشارات غذائية ذكية",
 
    // Registration screen
    createAccountTitle: "إنشاء حساب في قوام",
    chooseAccountType: "اختاري نوع حسابك للمتابعة",
    roleSpecialist: "أخصائي",
    rolePatient: "مريض",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    specialty: "التخصص",
    specialtyPlaceholder: "مثال: أخصائية تغذية إكلينيكية",
    certificate: "الشهادة / الإثبات المهني",
    certificateUploadHint: "ارفعي ملف PDF أو صورة للشهادة",
    adminReviewNotice:
      "سيراجع مدير النظام طلبك قبل تفعيل الحساب — ستصلك رسالة بالنتيجة.",
    submitSpecialistRequest: "إرسال طلب التسجيل",
    confirmedNotice: "بيانات مؤكدة فورًا — لا تُعدَّل لاحقًا إلا من الدعم",
    fullName: "الاسم الكامل",
    nationalId: "رقم الهوية الوطنية",
    birthDate: "تاريخ الميلاد",
    draftNotice: "مسودة — ستراجعها الأخصائية معك أثناء اللقاء",
    weight: "الوزن (كغ)",
    height: "الطول (سم)",
    activityLevel: "مستوى النشاط",
    activityPlaceholder: "اختاري مستوى نشاطك",
    allergy: "حساسية غذائية (إن وجدت)",
    allergyPlaceholder: "مثال: حساسية من المكسرات",
    createAccount: "إنشاء الحساب",
 
    // Interview screen
    interviewTitle: "شاشة اللقاء",
    interviewSubtitle: "اختاري المريضة وراجعي بياناتها أثناء اللقاء",
    selectPatient: "اختيار المريضة",
    searchPatientPlaceholder: "اكتبي اسم المريضة...",
    selectFromList: "— اختاري من القائمة —",
    referralReason: "سبب التحويل / الزيارة",
    referralPlaceholder: "مثال: إنقاص وزن، متابعة دورية...",
    sectionBasic: "بيانات أساسية",
    age: "العمر",
    sex: "الجنس",
    sexFemale: "أنثى",
    sexMale: "ذكر",
    choose: "اختاري",
    bmiComputed: "BMI المحسوب",
    sectionActivity: "النشاط والنمط الغذائي",
    weightHistory: "تاريخ الوزن (محاولات سابقة)",
    dietHistory: "التاريخ الغذائي",
    sectionMedical: "الحالة الطبية",
    diagnosis: "التشخيص الطبي / الحالات المصاحبة",
    medications: "الأدوية الحالية",
    physicalFindings: "نتائج الفحص الجسدي المرتبط بالتغذية",
    physicalFindingsPlaceholder: "مثال: شحوب، تورم، فقدان كتلة عضلية...",
    familyHistory: "التاريخ الصحي العائلي",
    advancedSection: "معلومات إضافية (لحالات خاصة)",
    labResults: "نتائج تحاليل مخبرية",
    feedingAbility: "القدرة على تناول الطعام",
    feedingIndependent: "مستقل",
    feedingLimited: "مساعدة محدودة",
    feedingFull: "مساعدة كاملة",
    oralProblems: "مشاكل بالفم (مضغ / بلع)",
    intake: "نسبة الاستيعاب الغذائي (Intake)",
    intakeGood: "جيدة (أكثر من 75%)",
    intakeFair: "متوسطة (حوالي 50%)",
    intakePoor: "ضعيفة (أقل من 50%)",
    intakeMinimal: "منخفضة جدًا (أقل من 25%)",
    dietOrder: "أمر الحمية / الدعم الغذائي الخاص",
    dietOrderPlaceholder: "مثال: تغذية أنبوبية، دعم غذائي خاص...",
    generatePlan: "توليد الخطة",
 
    bmiUnderweight: "نحافة",
    bmiNormal: "وزن طبيعي",
    bmiOverweight: "وزن زائد",
    bmiObesity1: "سمنة درجة أولى",
    bmiObesity2: "سمنة درجة ثانية",
    bmiSevere: "سمنة شديدة",
 
    activityLevels: [
      "خامل (Sedentary)",
      "نشاط خفيف (Lightly Active)",
      "نشاط متوسط (Moderately Active)",
      "نشاط عالٍ (Very Active)",
      "نشاط عالٍ جدًا (Extremely Active)",
    ],
  },
 
  en: {
    dir: "ltr",
    appName: "Qawam",
    appTagline: "Smart nutrition consultation platform",
 
    createAccountTitle: "Create your Qawam account",
    chooseAccountType: "Choose your account type to continue",
    roleSpecialist: "Specialist",
    rolePatient: "Patient",
    email: "Email address",
    password: "Password",
    specialty: "Specialty",
    specialtyPlaceholder: "e.g. Clinical Nutrition Specialist",
    certificate: "Certificate / Professional proof",
    certificateUploadHint: "Upload a PDF or image of your certificate",
    adminReviewNotice:
      "The system admin will review your request before activation — you'll be notified of the result.",
    submitSpecialistRequest: "Submit registration request",
    confirmedNotice: "Confirmed immediately — can only be edited by support",
    fullName: "Full name",
    nationalId: "National ID number",
    birthDate: "Date of birth",
    draftNotice: "Draft — the specialist will review this with you at the visit",
    weight: "Weight (kg)",
    height: "Height (cm)",
    activityLevel: "Activity level",
    activityPlaceholder: "Select your activity level",
    allergy: "Food allergy (if any)",
    allergyPlaceholder: "e.g. Nut allergy",
    createAccount: "Create account",
 
    interviewTitle: "Interview screen",
    interviewSubtitle: "Select the patient and review her data during the visit",
    selectPatient: "Select patient",
    searchPatientPlaceholder: "Type patient name...",
    selectFromList: "— Select from list —",
    referralReason: "Referred for",
    referralPlaceholder: "e.g. Weight loss, routine follow-up...",
    sectionBasic: "Basic data",
    age: "Age",
    sex: "Sex",
    sexFemale: "Female",
    sexMale: "Male",
    choose: "Select",
    bmiComputed: "Calculated BMI",
    sectionActivity: "Activity & dietary pattern",
    weightHistory: "Weight history (previous attempts)",
    dietHistory: "Food and nutrition history",
    sectionMedical: "Medical status",
    diagnosis: "Medical diagnosis / relevant conditions",
    medications: "Current medications",
    physicalFindings: "Nutrition-focused physical findings",
    physicalFindingsPlaceholder: "e.g. Pallor, edema, muscle wasting...",
    familyHistory: "Family / health history",
    advancedSection: "Additional information (special cases)",
    labResults: "Lab results",
    feedingAbility: "Feeding ability",
    feedingIndependent: "Independent",
    feedingLimited: "Limited assistance",
    feedingFull: "Extensive/total assistance",
    oralProblems: "Oral problems (chewing / swallowing)",
    intake: "Intake",
    intakeGood: "Good (>75%)",
    intakeFair: "Fair (approx. 50%)",
    intakePoor: "Poor (<50%)",
    intakeMinimal: "Minimal (<25%)",
    dietOrder: "Diet order / nutrition support order",
    dietOrderPlaceholder: "e.g. Tube feeding, special nutrition support...",
    generatePlan: "Generate plan",
 
    bmiUnderweight: "Underweight",
    bmiNormal: "Normal weight",
    bmiOverweight: "Overweight",
    bmiObesity1: "Obesity I",
    bmiObesity2: "Obesity II",
    bmiSevere: "Severe obesity",
 
    activityLevels: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Extremely Active",
    ],
  },
};
 
/** Simple language-toggle hook shared by every screen. */
export function useLanguage(initial = "ar") {
  const [lang, setLang] = useState(initial);
  const t = translations[lang];
  const dir = t.dir;
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  return { lang, t, dir, toggle, setLang };
}
 
export function LanguageToggle({ lang, toggle, className = "" }) {
  return (
    <button
      type="button"
      onClick={toggle}
      className={
        "text-xs font-medium text-stone-500 hover:text-[#1a4d6d] border border-stone-300 rounded-full px-3 py-1 transition-colors " +
        className
      }
    >
      {lang === "ar" ? "English" : "العربية"}
    </button>
  );
}
 