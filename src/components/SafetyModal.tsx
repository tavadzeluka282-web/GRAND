import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Lock,
  Coffee,
  Users,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const SafetyModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen, safetyTips } = useApp();

  if (!safetyModalOpen) return null;

  const icons = [
    <Lock className="w-5 h-5 text-[#B5853B]" />,
    <Coffee className="w-5 h-5 text-[#B5853B]" />,
    <Users className="w-5 h-5 text-[#B5853B]" />,
    <HeartHandshake className="w-5 h-5 text-[#B5853B]" />,
    <AlertTriangle className="w-5 h-5 text-[#A43838]" />
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EADBCE] my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF2E8] border-b border-[#EADBCE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D6AE65]/20 flex items-center justify-center text-[#8C6D2B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#45352F]">
                უსაფრთხოების წესები
              </h2>
              <p className="text-xs text-[#7A6258]">
                სანდო და მშვიდი გარემო 50+ ასაკის ადამიანებისთვის
              </p>
            </div>
          </div>

          <button
            onClick={() => setSafetyModalOpen(false)}
            className="p-2 rounded-xl text-[#7A6258] hover:text-[#45352F] hover:bg-[#F0E6D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[65vh] overflow-y-auto">
          <p className="text-sm text-[#6E594F] leading-relaxed">
            GoldAge ზრუნავს თითოეული წევრის უსაფრთხოებასა და ღირსებაზე. გთხოვთ გაითვალისწინოთ შემდეგი რჩევები ახალი ადამიანის გაცნობისას:
          </p>

          <div className="space-y-3">
            {safetyTips.map((tip, idx) => (
              <div
                key={tip.id}
                className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] flex gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-white border border-[#EADBCE] self-start shrink-0">
                  {icons[idx] || <ShieldCheck className="w-5 h-5 text-[#B5853B]" />}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#45352F]">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-[#8C6D2B] font-semibold mt-0.5">
                    {tip.summary}
                  </p>
                  <p className="text-xs text-[#6E594F] mt-1.5 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              ყველა ანკეტა მოწმდება მოდერაციის მიერ. საეჭვო მომხმარებლის დაბლოკვა შეგიძლიათ ნებისმიერ დროს.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#EADBCE] bg-[#FAF2E8]/40 flex justify-end">
          <button
            onClick={() => setSafetyModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-sm"
          >
            გასაგებია
          </button>
        </div>
      </div>
    </div>
  );
};
