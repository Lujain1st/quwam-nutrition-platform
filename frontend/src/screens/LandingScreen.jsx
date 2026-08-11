import React from 'react';
import { QawaamLogo } from '../components/QawaamLogo';

export const LandingScreen = ({ t, onNavigate }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with Soft Gradient Background */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4ACCA6]/10 via-[#A2D36E]/10 to-slate-50 border border-slate-200/80 p-8 sm:p-12 lg:p-16 text-center shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4ACCA6]/15 text-[#4ACCA6] text-xs font-bold border border-[#4ACCA6]/30">
            <span>✨ {t.tagline}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.landing.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.landing.heroSub}
          </p>
          
          {/* Action Buttons: Specialist / Patient Direct Routing to Registration */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('register', 'patient')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>أنا مريض (تسجيل جديد)</span>
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('register', 'specialist')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>أنا أخصائي تغذية</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t.landing.valuesTitle}</h2>
          <div className="w-12 h-1 bg-[#4ACCA6] mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#4ACCA6]/15 text-[#4ACCA6] flex items-center justify-center font-bold">
              🌿
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.landing.val1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.landing.val1Desc}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FC9F30]/15 text-[#FC9F30] flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.landing.val2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.landing.val2Desc}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#A2D36E]/20 text-slate-800 flex items-center justify-center font-bold">
              🤝
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.landing.val3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.landing.val3Desc}</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">شركاء النجاح والاعتماد الأكاديمي</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs font-medium bg-slate-50/50">
              شعار شريك / جهة معتمدة #{item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}; 