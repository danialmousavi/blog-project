'use client';

import { useState } from 'react';

export default function OfflinePage() {
  const [loading, setLoading] = useState(false);

  const handleRetry = () => {
    setLoading(true);
    
    // اگر آنلاین بود، با استفاده از آدرس مستقیم به صفحه اصلی برو
    if (navigator.onLine) {
      window.location.href = '/'; 
    } else {
      setLoading(false);
      alert("هنوز آفلاین هستید. لطفاً اتصال خود را بررسی کنید.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
         <span className="text-4xl">🌐</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">ارتباط اینترنت برقرار نیست</h1>
      <p className="text-gray-500 mb-8">برای ادامه کار با اپلیکیشن، باید به شبکه متصل باشید.</p>
      
      <button 
        onClick={handleRetry}
        disabled={loading}
        className="w-full max-w-xs py-4 bg-black text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? 'در حال تلاش مجدد...' : 'بررسی اتصال و ورود'}
      </button>
    </div>
  );
}