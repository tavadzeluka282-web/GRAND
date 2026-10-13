import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { GEORGIAN_CITIES } from '../data/initialData';

interface HeroSectionProps {
  onSearch: (filters: { gender: string; city: string; minAge: number; maxAge: number }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { openAuthModal, currentUser } = useApp();

  const [gender, setGender] = useState<string>('ქალი');
  const [city, setCity] = useState<string>('ყველა');
  const [minAge, setMinAge] = useState<number>(52);
  const [maxAge, setMaxAge] = useState<number>(75);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ gender, city, minAge, maxAge });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-radial from-[#FFF3E0]/70 via-[#FFF8EF] to-[#FFF8EF]">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#F2DCB3]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-[#E8C5C8]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & Filter form */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBCE]/60 border border-[#DCC7B5] text-xs sm:text-sm font-semibold text-[#6E4F3A]">
              <Sparkles className="w-4 h-4 text-[#C59B4F]" />
              <span>თბილი, სანდო და უსაფრთხო გარემო 50+ ასაკისთვის</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#3B2C24] leading-tight tracking-tight">
              იპოვეთ თქვენი <span className="text-[#A43838]">თანამოაზრე</span> ცხოვრების ოქროს წლებში
            </h1>

            <p className="text-base sm:text-lg text-[#6E594F] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              GoldAge შექმნილია უფროსი თაობისთვის — მათთვის, ვისაც სურს გულწრფელი საუბარი, ერთგული მეგობრობა, სიყვარული და ქორწინება. არანაირი სირთულე, მარტივი ქართული ინტერფეისი.
            </p>

            {/* Quick search filter card */}
            <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-[#EADBCE] shadow-lg shadow-[#7C5535]/5 max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleQuickSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Looking for */}
                  <div>
                    <label className="block text-xs font-bold text-[#6E594F] mb-1.5 text-left">
                      ვეძებ:
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF2E8] rounded-xl border border-[#EADBCE]">
                      <button
                        type="button"
                        onClick={() => setGender('ქალი')}
                        className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                          gender === 'ქალი'
                            ? 'bg-[#D6AE65] text-white shadow-xs'
                            : 'text-[#6E594F] hover:bg-white/60'
                        }`}
                      >
                        ქალბატონს
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('მამაკაცი')}
                        className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                          gender === 'მამაკაცი'
                            ? 'bg-[#D6AE65] text-white shadow-xs'
                            : 'text-[#6E594F] hover:bg-white/60'
                        }`}
                      >
                        მამაკაცს
                      </button>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-[#6E594F] mb-1.5 text-left">
                      ქალაქი / რეგიონი:
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-semibold text-[#3B2C24] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                      >
                        <option value="ყველა">მთელი საქართველო (ყველა)</option>
                        {GEORGIAN_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Age Range Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#6E594F] mb-1.5">
                    <span>ასაკობრივი ზღვარი:</span>
                    <span className="text-[#A43838] font-bold text-sm">
                      {minAge} - {maxAge} წლის
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                      <span className="text-[11px] text-[#8C766B]">დან ({minAge}):</span>
                      <input
                        type="range"
                        min="50"
                        max="70"
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                        className="w-full accent-[#D6AE65] cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#8C766B]">მდე ({maxAge}):</span>
                      <input
                        type="range"
                        min="55"
                        max="85"
                        value={maxAge}
                        onChange={(e) => setMaxAge(Number(e.target.value))}
                        className="w-full accent-[#D6AE65] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm sm:text-base shadow-md shadow-[#D6AE65]/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
                  >
                    <Search className="w-5 h-5" />
                    <span>მოძებნეთ თქვენი თანამოაზრე</span>
                  </button>

                  {!currentUser && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('register')}
                      className="py-3 px-4 rounded-xl bg-[#FAF2E8] hover:bg-[#F3E5D4] text-[#6E4F3A] font-bold text-sm border border-[#EADBCE] transition-colors"
                    >
                      რეგისტრაცია
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B5853B] shrink-0" />
                <span className="text-xs font-semibold text-[#6E594F]">100% შემოწმებული წევრები</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#A43838] shrink-0" />
                <span className="text-xs font-semibold text-[#6E594F]">სერიოზული ქორწინება</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#2E7D32] shrink-0" />
                <span className="text-xs font-semibold text-[#6E594F]">Google-ის გარეშე, მარტივად</span>
              </div>
            </div>
          </div>

          {/* Right Image Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main photo frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-[#5C3C24]/15">
                <img
                  src="/assets/hero_couple_georgian_1791830879038-7hco6br0.jpg"
                  alt="GoldAge ბედნიერი წყვილი"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EADBCE] shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAF2E8] flex items-center justify-center text-[#A43838]">
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-[#3B2C24]">
                        დავითი და ნანა — ბედნიერი წყვილი
                      </p>
                      <p className="text-xs text-[#7A6258] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B5853B]" />
                        ერთმანეთი იპოვეს GoldAge-ზე
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge top-left */}
              <div className="absolute -top-3 -left-3 bg-white px-3.5 py-1.5 rounded-full border border-[#EADBCE] shadow-md flex items-center gap-2 text-xs font-bold text-[#6E4F3A]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>აქტიური საზოგადოება</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
