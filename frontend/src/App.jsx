import React, { useState, useEffect } from 'react';
import { translations } from './constants/i18n';
import { QawaamLogo } from './components/QawaamLogo';
import { LandingScreen } from './screens/LandingScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { InterviewScreen } from './screens/InterviewScreen';
import { EditGenerateScreen } from './screens/EditGenerateScreen';
import { PatientPlanScreen } from './screens/PatientPlanScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('landing');
  const [sharedPatientData, setSharedPatientData] = useState({
    id: 'P-10024',
    name: 'سارة أسامة أحمد',
    nationalId: '1092837465',
    dob: '1996-05-14',
    weight: '72',
    height: '165',
    activity: 'متوسط (3 أيام تمرين/أسبوع)',
    allergy: 'حساسية من اللاكتوز والسمسم',
    labFile: { name: 'CBC_Blood_Report_Sara.pdf', size: '1.2 MB', url: '#' },
    specialistNotes: '',
    confirmed: false
  });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Universal Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="cursor-pointer" onClick={() => setActiveTab('landing')}>
            <QawaamLogo className="h-12" lang={lang} />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse bg-slate-100 p-1.5 rounded-xl text-sm font-medium">
            {[
              { id: 'landing', label: t.nav.home },
              { id: 'register', label: t.nav.register },
              { id: 'interview', label: t.nav.interview },
              { id: 'generate', label: t.nav.generate },
              { id: 'plan', label: t.nav.plan },
              { id: 'admin', label: t.nav.admin }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-[#4ACCA6] text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mandatory Language Switcher Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#4ACCA6] text-[#4ACCA6] font-bold text-sm hover:bg-[#4ACCA6] hover:text-white transition-all shadow-sm"
              title="Switch Language / تغيير اللغة"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{t.common.language}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex overflow-x-auto px-4 py-2 bg-slate-100 border-t border-slate-200 gap-2">
          {[
            { id: 'landing', label: t.nav.home },
            { id: 'register', label: t.nav.register },
            { id: 'interview', label: t.nav.interview },
            { id: 'generate', label: t.nav.generate },
            { id: 'plan', label: t.nav.plan },
            { id: 'admin', label: t.nav.admin }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
                activeTab === item.id ? 'bg-[#4ACCA6] text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'landing' && <LandingScreen t={t} onStart={() => setActiveTab('register')} />}
        {activeTab === 'register' && <RegistrationScreen t={t} onRegisterSuccess={() => setActiveTab('interview')} />}
        {activeTab === 'interview' && (
          <InterviewScreen
            t={t}
            patient={sharedPatientData}
            setPatient={setSharedPatientData}
            onProceed={() => setActiveTab('generate')}
          />
        )}
        {activeTab === 'generate' && (
          <EditGenerateScreen
            t={t}
            patient={sharedPatientData}
            onGenerateSuccess={() => setActiveTab('plan')}
          />
        )}
        {activeTab === 'plan' && <PatientPlanScreen t={t} patient={sharedPatientData} />}
        {activeTab === 'admin' && <AdminDashboardScreen t={t} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#4ACCA6] text-base">{t.brandName}</span>
            <span>|</span>
            <span className="text-[#FC9F30]">{t.tagline}</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 Qawaam Expert System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}