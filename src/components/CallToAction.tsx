import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Shield, UserPlus, Search } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const { currentUser, openAuthModal, setActiveTab } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-[#FFF8EF] to-[#FAF2E8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-[#D6AE65]/20 border border-[#D6AE65]/40 flex items-center justify-center mx-auto mb-6 text-[#8C6D2B]">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#45352F] tracking-tight max-w-2xl mx-auto leading-tight">
          მზად ხართ ახალი, თბილი ურთიერთობებისთვის?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#7A6258] max-w-2xl mx-auto leading-relaxed">
          მარტოობა აღარ არის გამოსავალი. GoldAge-ზე თქვენ გელოდებათ თანამოაზრეები, რომლებსაც ესმით თქვენი ცხოვრებისეული გამოცდილება და აფასებენ გულწრფელობას.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!currentUser ? (
            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-base shadow-lg shadow-[#D6AE65]/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <UserPlus className="w-5 h-5" />
              <span>დარეგისტრირდით ახლავე (უფასოდ)</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('members')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-base shadow-lg shadow-[#D6AE65]/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Search className="w-5 h-5" />
              <span>გაიცანით წევრები</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('members')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#FAF2E8] text-[#45352F] font-bold text-base border-2 border-[#EADBCE] flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-5 h-5 text-[#8C6D2B]" />
            <span>დაათვალიერეთ ანკეტები</span>
          </button>
        </div>

        {/* Note on Google absence */}
        <div className="mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-[#8C766B] bg-white/80 px-4 py-2 rounded-full border border-[#EADBCE]">
          <Shield className="w-4 h-4 text-[#2E7D32]" />
          <span>რეგისტრაცია სრულიად დამოუკიდებელია — არ გჭირდებათ Google ანგარიში</span>
        </div>
      </div>
    </section>
  );
};
