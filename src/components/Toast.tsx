import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#45352F] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D6AE65]/40 flex items-center gap-3 max-w-md">
        <div className="w-8 h-8 rounded-xl bg-[#D6AE65]/20 flex items-center justify-center text-[#E2B96F] shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="text-sm font-semibold">{toastMessage}</p>
      </div>
    </div>
  );
};
