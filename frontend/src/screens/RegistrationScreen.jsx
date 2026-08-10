import { useState } from "react";
import {
  Stethoscope,
  User,
  UploadCloud,
  FileCheck2,
  IdCard,
  Calendar,
  Scale,
  Ruler,
  Activity,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

const ACTIVITY_LEVELS = [
  "خامل (Sedentary)",
  "نشاط خفيف (Lightly Active)",
  "نشاط متوسط (Moderately Active)",
  "نشاط عالٍ (Very Active)",
  "نشاط عالٍ جدًا (Extremely Active)",
];

function Field({ label, children, hint, hintTone = "muted" }) {
  const hintColor =
    hintTone === "confirmed" ? "text-emerald-700" : "text-stone-400";
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium text-stone-700 mb-1.5">
        <span>{label}</span>
        {hint && <span className={`text-xs font-normal ${hintColor}`}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d6d]/30 focus:border-[#1a4d6d] transition-colors";

function SpecialistForm() {
  const [fileName, setFileName] = useState("");
  return (
    <div className="space-y-4">
      <Field label="البريد الإلكتروني">
        <input
          type="email"
          required
          placeholder="name@example.com"
          className={inputClass}
        />
      </Field>
      <Field label="كلمة المرور">
        <input
          type="password"
          required
          placeholder="••••••••"
          className={inputClass}
        />
      </Field>
      <Field label="التخصص">
        <input
          type="text"
          required
          placeholder="مثال: أخصائية تغذية إكلينيكية"
          className={inputClass}
        />
      </Field>

      <label className="block">
        <span className="text-sm font-medium text-stone-700 mb-1.5 block">
          الشهادة / الإثبات المهني
        </span>
        <div className="relative rounded-lg border-2 border-dashed border-stone-300 hover:border-[#1a4d6d]/50 transition-colors bg-stone-50 px-4 py-6 text-center cursor-pointer">
          <input
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {fileName ? (
            <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm">
              <FileCheck2 size={18} />
              <span>{fileName}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-stone-500">
              <UploadCloud size={22} />
              <span className="text-sm">ارفعي ملف PDF أو صورة للشهادة</span>
            </div>
          )}
        </div>
      </label>

      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-800">
        <ShieldAlert size={16} className="shrink-0 mt-0.5" />
        <span>سيراجع مدير النظام طلبك قبل تفعيل الحساب — ستصلك رسالة بالنتيجة.</span>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#1a4d6d] py-2.5 text-sm font-medium text-white hover:bg-[#153f59] transition-colors"
      >
        إرسال طلب التسجيل
      </button>
    </div>
  );
}

function PatientForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
          <CheckCircle2 size={14} />
          <span>بيانات مؤكدة فورًا — لا تُعدَّل لاحقًا إلا من الدعم</span>
        </div>
        <Field label="الاسم الكامل">
          <input type="text" required className={inputClass} />
        </Field>
        <Field label="رقم الهوية الوطنية">
          <div className="relative">
            <IdCard size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              required
              inputMode="numeric"
              className={inputClass + " pr-10"}
            />
          </div>
        </Field>
        <Field label="تاريخ الميلاد">
          <div className="relative">
            <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input type="date" required className={inputClass + " pr-10"} />
          </div>
        </Field>
      </div>

      <div className="h-px bg-stone-200" />

      <div className="space-y-4">
        <div className="text-xs font-medium text-stone-400">
          مسودة — ستراجعها الأخصائية معك أثناء اللقاء
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="الوزن (كغ)">
            <div className="relative">
              <Scale size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input type="number" step="0.1" className={inputClass + " pr-10"} />
            </div>
          </Field>
          <Field label="الطول (سم)">
            <div className="relative">
              <Ruler size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input type="number" className={inputClass + " pr-10"} />
            </div>
          </Field>
        </div>
        <Field label="مستوى النشاط">
          <div className="relative">
            <Activity size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select className={inputClass + " pr-10 appearance-none"} defaultValue="">
              <option value="" disabled>
                اختاري مستوى نشاطك
              </option>
              {ACTIVITY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="حساسية غذائية (إن وجدت)">
          <input type="text" placeholder="مثال: حساسية من المكسرات" className={inputClass} />
        </Field>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#1a4d6d] py-2.5 text-sm font-medium text-white hover:bg-[#153f59] transition-colors"
      >
        إنشاء الحساب
      </button>
    </div>
  );
}

export default function RegistrationScreen() {
  const [role, setRole] = useState("patient");

  return (
    <div dir="rtl" className="min-h-full w-full bg-stone-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#eef3f7] mb-3">
            <span className="text-lg">🌿</span>
          </div>
          <h1 className="text-lg font-semibold text-stone-900">إنشاء حساب في قوام</h1>
          <p className="text-xs text-stone-500 mt-1">اختاري نوع حسابك للمتابعة</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5 rounded-xl bg-stone-200/70 p-1">
          <button
            type="button"
            onClick={() => setRole("specialist")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
              role === "specialist"
                ? "bg-white text-[#1a4d6d] shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            <Stethoscope size={15} />
            أخصائي
          </button>
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
              role === "patient"
                ? "bg-white text-[#1a4d6d] shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            <User size={15} />
            مريض
          </button>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6"
        >
          {role === "specialist" ? <SpecialistForm /> : <PatientForm />}
        </form>
      </div>
    </div>
  );
}