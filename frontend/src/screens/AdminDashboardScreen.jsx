import React, { useState } from 'react';
import { QawaamLogo } from '../components/QawaamLogo';

export const AdminDashboardScreen = ({ t }) => {
  // قائمة افتراضية لطلبات الأخصائيين بانتظار الاعتماد
  const [pendingSpecialists, setPendingSpecialists] = useState([
    { id: 1, name: 'د. ريم عبد الله', email: 'reem.diet@qawaam.net', specialty: 'تغذية أطفال وسمنة', cert: 'Certificate_Reem.pdf' },
    { id: 2, name: 'د. خالد العمري', email: 'khaled.nutrition@qawaam.net', specialty: 'تغذية رياضية', cert: 'Certificate_Khaled.pdf' }
  ]);

  // قائمة الأخصائيين المعتمدين حالياً
  const [activeSpecialists, setActiveSpecialists] = useState([
    { id: 101, name: 'د. سارة المحمود', email: 'sara.m@qawaam.net', specialty: 'تغذية علاجية' }
  ]);

  const [notification, setNotification] = useState('');

  // دالة قبول واعتماد الأخصائي
  const handleApprove = (spec) => {
    setPendingSpecialists(pendingSpecialists.filter(item => item.id !== spec.id));
    setActiveSpecialists([...activeSpecialists, { id: Date.now(), ...spec }]);
    setNotification(`تمت الموافقة على انضمام ${spec.name} بنجاح.`);
  };

  // دالة رفض طلب الأخصائي
  const handleReject = (id) => {
    setPendingSpecialists(pendingSpecialists.filter(item => item.id !== id));
    setNotification('تم رفض طلب انضمام الأخصائي.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.title}</h2>
          <p className="text-xs text-slate-500 mt-1">مراجعة واعتماد طلبات تسجيل أخصائيي التغذية ومتابعة الحسابات النشطة</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#FC9F30]/15 text-[#FC9F30] text-xs font-bold">
          لوحة الإدارة والتحكم
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex justify-between items-center">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-500 hover:text-emerald-700 font-extrabold text-sm">×</button>
        </div>
      )}

      {/* Pending Specialist Approvals Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>⏳ {t.admin.pendingSpecs}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{pendingSpecialists.length}</span>
          </h3>
        </div>

        {pendingSpecialists.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">لا توجد طلبات معلقة بانتظار الاعتماد حالياً.</p>
        ) : (
          <div className="space-y-4">
            {pendingSpecialists.map((spec) => (
              <div key={spec.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{spec.name}</h4>
                  <p className="text-xs text-slate-500">{spec.email} • <span className="text-[#4ACCA6] font-semibold">{spec.specialty}</span></p>
                  <span className="inline-block text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">الشهادة: {spec.cert}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleApprove(spec)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {t.admin.approveBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(spec.id)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs transition-all"
                  >
                    {t.admin.rejectBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Specialists Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>✅ {t.admin.activeSpecs}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">{activeSpecialists.length}</span>
          </h3>
        </div>

        <div className="space-y-3">
          {activeSpecialists.map((spec) => (
            <div key={spec.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{spec.name}</span>
                <span className="text-slate-500 text-[11px]">{spec.email} | {spec.specialty}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px]">نشط ومعتمد</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};