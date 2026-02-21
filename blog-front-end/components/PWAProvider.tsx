'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    const handleOnline = () => toast.success("اتصال برقرار شد!");
    const handleOffline = () => toast.error("اتصال قطع شد.");

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      const isDismissed = sessionStorage.getItem('pwa-dismissed');
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

      if (!isDismissed && !isStandalone) {
        setDeferredPrompt(e);
        setShowBanner(true);
        
        // تایمر را فقط وقتی بنر نمایش داده می‌شود ست کن
        const timer = setTimeout(() => setShowBanner(false), 10000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleLater = () => {
    sessionStorage.setItem('pwa-dismissed', 'true');
    setShowBanner(false);
  };

  if (!isMounted) return <>{children}</>;

  return (
    <>
      {showBanner && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:w-96 bg-slate-900 border border-slate-700 text-white p-4 z-[10000] rounded-2xl shadow-2xl flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500" dir="rtl">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">نصب اپلیکیشن</p>
            <p className="text-[10px] text-gray-400">دسترسی سریع‌تر و آفلاین</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleInstall} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-all">نصب</button>
            <button onClick={handleLater} className="px-3 py-2 text-xs text-gray-400 hover:text-white transition-all">بعداً</button>
          </div>
        </div>
      )}
      {children}
    </>
  );
};