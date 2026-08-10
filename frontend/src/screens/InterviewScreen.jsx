import { useState, useMemo } from "react";
import {
  User,
  Activity,
  HeartPulse,
  ChevronDown,
  Search,
} from "lucide-react";

const ACTIVITY_LEVELS = [
  "خامل (Sedentary)",
  "نشاط خفيف (Lightly Active)",
  "نشاط متوسط (Moderately Active)",
  "نشاط عالٍ (Very Active)",
  "نشاط عالٍ جدًا (Extremely Active)",
];

// Placeholder patient list — will come from the API in أ4-3
const MOCK_PATIENTS = [
  { id: 1, name: "سارة العتيبي" },
  { id: 2, name: "منيرة القحطاني" },
  { id: 3, name: "خلود الحربي" },
];

function classifyBmi(bmi) {
  if (!bmi) return null;
  if (bmi < 18.5) return "نحافة";
  if (bmi < 25) return "وزن طبيعي";
  if (bmi < 30) return "وزن زائد";
  if (bmi < 35) return "سمنة درجة أولى";
  if (bmi < 40) return "سمنة درجة ثانية";
  return "سمنة شديدة";
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4 text-[#1a4d6d]">
        <Icon size={17} />
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d6d]/30 focus:border-[#1a4d6d] transition-colors";

export default function InterviewScreen() {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    return w / ((h / 100) ** 2);
  }, [height, weight]);

  const filteredPatients = MOCK_PATIENTS.filter((p) =>
    p.name.includes(search)
  );

  return (
    <div dir="rtl" className="min-h-full w-full bg-stone-100 px-4 py-8">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="mb-2">
          <h1 className="text-lg font-semibold text-stone-900">شاشة اللقاء</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            اختاري المريضة وراجعي بياناتها أثناء اللقاء
          </p>
        </div>

        {/* Patient selector */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <Field label="اختيار المريضة">
            <div className="relative">
              <Search
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="اكتبي اسم المريضة..."
                className={inputClass + " pr-10 mb-2"}
              />
            </div>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className={inputClass + " appearance-none"}
            >
              <option value="" disabled>
                — اختاري من القائمة —
              </option>
              {filteredPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="mt-3">
            <Field label="سبب التحويل / الزيارة">
              <input
                type="text"
                placeholder="مثال: إنقاص وزن، متابعة دورية..."
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        {/* Section 1: basic data */}
        <Section icon={User} title="بيانات أساسية">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field label="العمر">
              <input type="number" className={inputClass} />
            </Field>
            <Field label="الجنس">
              <select className={inputClass + " appearance-none"} defaultValue="">
                <option value="" disabled>
                  اختاري
                </option>
                <option value="F">أنثى</option>
                <option value="M">ذكر</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="الطول (سم)">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="الوزن (كغ)">
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          {bmi && (
            <p className="text-xs text-stone-500 mt-3">
              BMI المحسوب:{" "}
              <span className="font-medium text-stone-700">
                {bmi.toFixed(1)} ({classifyBmi(bmi)})
              </span>
            </p>
          )}
        </Section>

        {/* Section 2: activity & diet history */}
        <Section icon={Activity} title="النشاط والنمط الغذائي">
          <div className="space-y-3">
            <Field label="مستوى النشاط">
              <select className={inputClass + " appearance-none"} defaultValue="">
                <option value="" disabled>
                  اختاري مستوى النشاط
                </option>
                {ACTIVITY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="تاريخ الوزن (محاولات سابقة)">
              <input type="text" className={inputClass} />
            </Field>
            <Field label="التاريخ الغذائي">
              <textarea rows={3} className={inputClass + " resize-none"} />
            </Field>
          </div>
        </Section>

        {/* Section 3: medical status */}
        <Section icon={HeartPulse} title="الحالة الطبية">
          <div className="space-y-3">
            <Field label="التشخيص الطبي / الحالات المصاحبة">
              <input type="text" className={inputClass} />
            </Field>
            <Field label="الأدوية الحالية">
              <input type="text" className={inputClass} />
            </Field>
            <Field label="نتائج الفحص الجسدي المرتبط بالتغذية">
              <input
                type="text"
                placeholder="مثال: شحوب، تورم، فقدان كتلة عضلية..."
                className={inputClass}
              />
            </Field>
            <Field label="التاريخ الصحي العائلي">
              <input type="text" className={inputClass} />
            </Field>
          </div>
        </Section>

        {/* Collapsible advanced section */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-stone-600"
          >
            <span>معلومات إضافية (لحالات خاصة)</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${advancedOpen ? "rotate-180" : ""}`}
            />
          </button>
          {advancedOpen && (
            <div className="px-5 pb-5 space-y-3">
              <Field label="نتائج تحاليل مخبرية">
                <input type="text" className={inputClass} />
              </Field>
              <Field label="القدرة على تناول الطعام">
                <select className={inputClass + " appearance-none"} defaultValue="">
                  <option value="" disabled>اختاري</option>
                  <option>مستقل</option>
                  <option>مساعدة محدودة</option>
                  <option>مساعدة كاملة</option>
                </select>
              </Field>
              <Field label="مشاكل بالفم (مضغ / بلع)">
                <input type="text" className={inputClass} />
              </Field>
              <Field label="نسبة الاستيعاب الغذائي (Intake)">
                <select className={inputClass + " appearance-none"} defaultValue="">
                  <option value="" disabled>اختاري</option>
                  <option>جيدة (أكثر من 75%)</option>
                  <option>متوسطة (حوالي 50%)</option>
                  <option>ضعيفة (أقل من 50%)</option>
                  <option>منخفضة جدًا (أقل من 25%)</option>
                </select>
              </Field>
              <Field label="أمر الحمية / الدعم الغذائي الخاص">
                <input
                  type="text"
                  placeholder="مثال: تغذية أنبوبية، دعم غذائي خاص..."
                  className={inputClass}
                />
              </Field>
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={!selectedPatientId}
          className="w-full rounded-lg bg-[#1a4d6d] py-3 text-sm font-medium text-white hover:bg-[#153f59] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          توليد الخطة
        </button>
      </div>
    </div>
  );
}