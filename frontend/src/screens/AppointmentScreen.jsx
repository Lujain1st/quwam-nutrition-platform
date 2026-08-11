 import React, { useState } from 'react';
import { QawaamLogo } from '../components/QawaamLogo';

export const AppointmentScreen = ({ t, patient }) => {
  // حالة الموعد المحجوز مسبقاً (مفترض وجود موعد تجريبي أو فارغ)
  const [bookedAppointment, setBookedAppointment] = useState({
    date: '2026-06-15',
    time: '11:30 AM',
    status: 'confirmed', // 'confirmed' or 'ready_to_join'
    zoomLink: 'https://zoom.us/j/example-qawaam-meeting'
  });

  // تواريخ قريبة متاحة للحجز
  const availableDates = [
    { dateStr: '2026-06-18', label: 'الخميس، 18 يونيو' },
    { dateStr: '2026-06-20', label: 'السبت، 20 يونيو' },
    { dateStr: '2026-06-21', label: 'الأحد، 21 يونيو' }
  ];

  // أوقات متاحة عند اختيار يوم
  const availableTimes = ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM'];

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    setBookedAppointment({
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      zoomLink: 'https://zoom.us/j/qawaam-live-consultation'
    });
    setSuccessMessage('تم تأكيد حجز الموعد بنجاح! | Appointment successfully booked.');
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleCancelAppointment = () => {
    setBookedAppointment(null);
    setSuccessMessage('تم إلغاء الموعد الحالي. يمكنك حجز موعد جديد أدناه.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">إدارة وحجز المواعيد الاستشارية</h2>
          <p className="text-xs text-slate-500 mt-1">مواعيد جلسات المتابعة مع أخصائي التغذية عبر منصة Zoom الخارجية</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#4ACCA6]/15 text-[#4ACCA6] text-xs font-bold">
          الحالة: {patient.name}
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-extrabold text-sm">×</button>
        </div>
      )}

      {/* Viewing Existing Booked Appointment (Top Section) */}
      {bookedAppointment ? (
        <div className="bg-gradient-to-br from-[#4ACCA6]/10 to-white p-6 rounded-3xl border-2 border-[#4ACCA6]/40 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#4ACCA6]/20 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#4ACCA6]">الموعد المحجوز الحالي (Active Booking)</span>
            <span className="px-3 py-1 rounded-full bg-[#4ACCA6] text-white text-[10px] font-bold">مؤكد</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] mb-1">التاريخ المختار</span>
              <span className="font-bold text-slate-900 text-sm">{bookedAppointment.date}</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] mb-1">وقت الجلسة</span>
              <span className="font-bold text-slate-900 text-sm">{bookedAppointment.time}</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 flex flex-col justify-center">
              <span className="text-slate-400 block text-[10px] mb-1">حالة الاجتماع</span>
              <span className="font-bold text-emerald-600 text-xs">جاهز للاجتماع الخارجي</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {/* Zoom External Link Button */}
            <a
              href={bookedAppointment.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>الانضمام إلى اجتماع Zoom (رابط خارجي)</span>
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCancelAppointment}
              className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs transition-all"
            >
              إلغاء الموعد
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
          لا يوجد موعد حالي محجوز. يمكنك حجز موعد جديد أدناه.
        </div>
      )}

      {/* Booking Flow: Step 1 & Step 2 */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b pb-3">حجز موعد جديد مع الأخصائي المعتمد</h3>

        {/* 1. Pick a Date */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">1. اختر تاريخ الموعد القريب:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableDates.map((item) => (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => { setSelectedDate(item.dateStr); setSelectedTime(''); }}
                className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  selectedDate === item.dateStr
                    ? 'border-[#4ACCA6] bg-[#4ACCA6]/10 text-[#4ACCA6]'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>📅 {item.label}</span>
                <span className="text-[10px] text-slate-400 font-normal">{item.dateStr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Pick a Time Slot */}
        {selectedDate && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700">2. اختر الوقت المتاح في يوم ({selectedDate}):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedTime === time
                      ? 'border-[#FC9F30] bg-[#FC9F30]/15 text-[#FC9F30]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ⏰ {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Confirmation Step */}
        {selectedDate && selectedTime && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-400 block mb-1">الموعد المحدد للمراجعة:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDate} الساعة {selectedTime}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FC9F30]/20 text-[#FC9F30] font-bold text-[10px]">جاهز للتأكيد</span>
            </div>

            <button
              type="button"
              onClick={handleBookAppointment}
              className="w-full py-4 rounded-2xl bg-[#4ACCA6] hover:bg-[#3bb894] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>تأكيد وحفظ حجز الموعد</span>
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
