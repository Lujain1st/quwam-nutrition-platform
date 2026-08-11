import React, { useState } from 'react';

export const InterviewScreen = ({ t, patient, setPatient, onProceed }) => {
  const [editableData, setEditableData] = useState({ ...patient });

  const handleSaveAndProceed = () => {
    setPatient({ ...editableData, confirmed: true });
    onProceed();
  };

  return (
    <div className="space-y-6">
      {/* Title & Patient Select Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.interview.title}</h2>
          <p className="text-xs text-slate-500 mt-1">مراجعة بيانات الحالة والاعتماد قبل توليد التوصية الذكية</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">{t.interview.selectPatient}</label>
          <select className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 outline-none focus:ring-2 focus:ring-[#4ACCA6]">
            <option>{patient.name} ({patient.id})</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Patient Measurements & Verification */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Confirmed Bio Data */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 border-b pb-2 mb-4 flex items-center justify-between">
                <span>البيانات الشخصية المؤكدة</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">مؤكد</span>
              </h3>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-1">الاسم:</span>
                  <span className="font-bold text-slate-800">{editableData.name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-1">رقم الهوية:</span>
                  <span className="font-bold text-slate-800">{editableData.nationalId}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-1">تاريخ الميلاد:</span>
                  <span className="font-bold text-slate-800">{editableData.dob}</span>
                </div>
              </div>
            </div>

            {/* Editable Draft Data */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 border-b pb-2 mb-4 flex items-center justify-between">
                <span>القياسات الفيزيائية (تعديل الأخصائي الحقيقي)</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">مراجعة حية</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوزن (كجم)</label>
                  <input
                    type="number"
                    value={editableData.weight}
                    onChange={(e) => setEditableData({ ...editableData, weight: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-[#4ACCA6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الطول (سم)</label>
                  <input
                    type="number"
                    value={editableData.height}
                    onChange={(e) => setEditableData({ ...editableData, height: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-[#4ACCA6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">مستوى النشاط البدني</label>
                  <input
                    type="text"
                    value={editableData.activity}
                    onChange={(e) => setEditableData({ ...editableData, activity: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الحساسيات الغذائية</label>
                  <input
                    type="text"
                    value={editableData.allergy}
                    onChange={(e) => setEditableData({ ...editableData, allergy: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* SPECIFIC REQUIREMENT: Uploaded Lab Results Section */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FC9F30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{t.interview.labSectionTitle}</span>
              </h3>

              {editableData.labFile ? (
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FC9F30]/15 text-[#FC9F30] flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{editableData.labFile.name}</p>
                      <p className="text-[10px] text-slate-400">{editableData.labFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Opening ${editableData.labFile.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    {t.common.viewFile}
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 text-center rounded-xl text-xs text-slate-500">
                  {t.interview.noLabFile}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right 1 Column: Specialist Free-Text Notes & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            
            {/* SPECIFIC REQUIREMENT: Free-text Notes Field (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                {t.interview.notesTitle}
              </label>
              <textarea
                rows="6"
                value={editableData.specialistNotes}
                onChange={(e) => setEditableData({ ...editableData, specialistNotes: e.target.value })}
                placeholder={t.interview.notesPlaceholder}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-[#4ACCA6] resize-none"
              ></textarea>
            </div>

            {/* SPECIFIC REQUIREMENT: Save & Proceed CTA */}
            <button
              type="button"
              onClick={handleSaveAndProceed}
              className="w-full py-3.5 px-4 rounded-xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.interview.proceedBtn}</span>
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
