import React, { useState } from 'react';

export const RegistrationScreen = ({ t, onRegisterSuccess }) => {
  const [role, setRole] = useState('patient'); // 'patient' or 'specialist'
  const [formData, setFormData] = useState({
    // Specialist fields
    email: '',
    password: '',
    specialty: 'تغذية علاجية',
    certFile: null,

    // Patient confirmed fields
    name: '',
    nationalId: '',
    dob: '',

    // Patient draft fields
    weight: '',
    height: '',
    activity: 'moderate',
    allergy: '',
    labFile: null
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'specialist') {
      if (!formData.email || !formData.password || !formData.certFile) {
        setErrorMsg('الرجاء تعبئة جميع الحقول المطلوبة وإرفاق المهنية | Please fill all required fields and upload certificate.');
        return;
      }
      setSuccessMsg(t.registration.specialistNotice);
    } else {
      if (!formData.name || !formData.nationalId || !formData.dob) {
        setErrorMsg('الرجاء إدخال البيانات الأساسية المؤكدة | Please fill required confirmed fields.');
        return;
      }
      setSuccessMsg(t.registration.submittedSuccess);
      setTimeout(() => onRegisterSuccess(), 1200);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Role Selector Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => { setRole('patient'); setErrorMsg(''); setSuccessMsg(''); }}
          className={`flex-1 py-4 text-center font-bold text-sm transition-all ${
            role === 'patient'
              ? 'bg-white text-[#4ACCA6] border-b-2 border-[#4ACCA6] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.registration.patientTab}
        </button>
        <button
          type="button"
          onClick={() => { setRole('specialist'); setErrorMsg(''); setSuccessMsg(''); }}
          className={`flex-1 py-4 text-center font-bold text-sm transition-all ${
            role === 'specialist'
              ? 'bg-white text-[#4ACCA6] border-b-2 border-[#4ACCA6] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.registration.specialistTab}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        
        {/* Error Alert using DISTINCT RED (Not Brand Orange) */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* PATIENT FORM */}
        {role === 'patient' && (
          <>
            {/* Section A: Confirmed Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-slate-800 text-base">1. البيانات الحيوية الأساسية</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4ACCA6]/15 text-[#4ACCA6] border border-[#4ACCA6]/30">
                  ✓ {t.common.confirmedTag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.name} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                    placeholder="مثال: سارة أسامة أحمد"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.nationalId} *</label>
                  <input
                    type="text"
                    required
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                    placeholder="10xxxxxxxx"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.dob} *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Draft Fields */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-slate-800 text-base">2. القياسات والنظام الغذائي الحالية</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FC9F30]/15 text-[#FC9F30] border border-[#FC9F30]/30">
                  ✎ {t.common.draftTag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.weight}</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.height}</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                    placeholder="168"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.activity}</label>
                  <select
                    value={formData.activity}
                    onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm bg-white"
                  >
                    <option value="sedentary">خامل / قليل الحركة</option>
                    <option value="moderate">نشاط متوسط (3 أيام/أسبوع)</option>
                    <option value="active">نشاط عالٍ (رياضي يومي)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.allergy}</label>
                  <input
                    type="text"
                    value={formData.allergy}
                    onChange={(e) => setFormData({ ...formData, allergy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                    placeholder="مثال: حساسية البيض، القمح"
                  />
                </div>
              </div>

              {/* SPECIFIC REQUIREMENT: Lab Results File Upload (Optional) */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.registration.labResults} <span className="text-slate-400 font-normal">({t.common.optional})</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#4ACCA6] transition-colors rounded-xl p-4 text-center cursor-pointer bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => setFormData({ ...formData, labFile: e.target.files[0] })}
                    className="hidden"
                    id="patient-lab-upload"
                  />
                  <label htmlFor="patient-lab-upload" className="cursor-pointer flex flex-col items-center">
                    <svg className="w-8 h-8 text-[#4ACCA6] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.labFile ? formData.labFile.name : 'انقر لرفع ملف التحاليل الطبية (PDF / Image)'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">
                      ستكون مسودة متاحة للأخصائي للمراجعة
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SPECIALIST FORM */}
        {role === 'specialist' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-[#A2D36E]/15 border border-[#A2D36E]/40 rounded-xl text-xs text-slate-700 font-medium">
              ℹ {t.registration.specialistNotice}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.email} *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
                placeholder="doctor@qawaam.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.password} *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.specialty} *</label>
              <input
                type="text"
                required
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#4ACCA6] outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.registration.certificate} *</label>
              <input
                type="file"
                required
                accept=".pdf,image/*"
                onChange={(e) => setFormData({ ...formData, certFile: e.target.files[0] })}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#4ACCA6]/10 file:text-[#4ACCA6] hover:file:bg-[#4ACCA6]/20"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>{t.common.submit}</span>
        </button>
      </form>
    </div>
  );
};