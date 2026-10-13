import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Phone, Mail, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSafetyModalOpen, openAuthModal, currentUser } = useApp();

  return (
    <footer className="bg-[#FAF2E8] border-t border-[#EADBCE] text-[#6E594F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#EADBCE]">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E2B96F] to-[#B5853B] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
                G
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#45352F] tracking-wide">
                  GoldAge
                </span>
                <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D6AE65]/20 text-[#8C6D2B]">
                  50+
                </span>
              </div>
            </div>

            <p className="text-sm text-[#7A6258] max-w-md leading-relaxed">
              თბილი, სანდო და უსაფრთხო გაცნობისა და ქორწინების პლატფორმა უფროსი თაობისთვის საქართველოში. იპოვეთ სიყვარული, მეგობრობა და ცხოვრების თანამგზავრი.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#8C6D2B] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% შემოწმებული წევრები • Google-ის გარეშე, მარტივი წვდომა</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#45352F] uppercase tracking-wider">
              ნავიგაცია
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-[#45352F] transition-colors"
                >
                  მთავარი გვერდი
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('members')}
                  className="hover:text-[#45352F] transition-colors"
                >
                  გაცნობა და ძიება
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="hover:text-[#45352F] transition-colors"
                >
                  თქვენი რჩეულები
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stories')}
                  className="hover:text-[#45352F] transition-colors"
                >
                  ბედნიერი ისტორიები
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Safety */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#45352F] uppercase tracking-wider">
              უსაფრთხოება
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setSafetyModalOpen(true)}
                  className="hover:text-[#45352F] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B5853B]" />
                  <span>უსაფრთხოების წესები</span>
                </button>
              </li>
              <li>
                <span className="text-[#8C766B]">კონფიდენციალურობა და ეთიკა</span>
              </li>
              {!currentUser && (
                <li>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="text-[#8C6D2B] font-bold hover:underline"
                  >
                    უფასო რეგისტრაცია
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C766B] gap-4">
          <p>© 2026 GoldAge. ყველა უფლება დაცულია.</p>
          <p className="flex items-center gap-1">
            შექმნილია სითბოთი და პატივისცემით <Heart className="w-3.5 h-3.5 fill-[#A43838] text-[#A43838]" /> უფროსი თაობისთვის
          </p>
        </div>
      </div>
    </footer>
  );
};
