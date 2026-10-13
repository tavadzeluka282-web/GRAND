import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, CheckCircle2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { Member } from '../types';
import { MemberAvatar } from './MemberAvatar';

export const FavoritesPage: React.FC = () => {
  const { members, favorites, toggleFavorite, setSelectedMember, setActiveTab, currentUser, openAuthModal } = useApp();

  const favoriteMembers = members.filter((m) => favorites.includes(m.id));

  const handleMessage = (e: React.MouseEvent, member: Member) => {
    e.stopPropagation();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSelectedMember(member);
  };

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCE]/50 text-xs font-semibold text-[#8C6D2B] mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#A43838] text-[#A43838]" />
            <span>შენახული ანკეტები</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#45352F] tracking-tight">
            თქვენი რჩეულები
          </h1>
          <p className="mt-2 text-base text-[#7A6258]">
            აქ თავმოყრილია ის ადამიანები, რომლებმაც თქვენი ყურადღება მიიპყრეს.
          </p>
        </div>

        {favoriteMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {favoriteMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Photo frame or Privacy avatar */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#FAF2E8]">
                  <MemberAvatar member={member} size="card" className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* Actions on top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md text-emerald-300 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      აქტიურია
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(member.id);
                      }}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white shadow-md active:scale-90 transition-transform"
                      title="რჩეულებიდან ამოშლა"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-xl font-bold tracking-tight drop-shadow-sm">
                        {member.firstName} {member.lastName}
                      </h3>
                      {member.isVerified && (
                        <CheckCircle2 className="w-5 h-5 text-[#E2B96F] shrink-0 drop-shadow-sm" />
                      )}
                    </div>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-2 mt-0.5 drop-shadow-sm">
                      <span>{member.age} წლის</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E2B96F]" />
                        {member.city}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FAF2E8] text-[#8C6D2B] border border-[#EADBCE] mb-3">
                      {member.relationshipGoal}
                    </span>
                    <p className="text-sm text-[#6E594F] line-clamp-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F0E6D8] flex items-center gap-2">
                    <button
                      onClick={(e) => handleMessage(e, member)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#FAF2E8] hover:bg-[#F0E4D5] text-[#45352F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#EADBCE]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#B5853B]" />
                      <span>მიწერეთ</span>
                    </button>
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>გაიცანით</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCE] max-w-lg mx-auto">
            <Heart className="w-16 h-16 text-[#D6AE65] mx-auto mb-4 stroke-1" />
            <h3 className="font-serif text-2xl font-bold text-[#45352F]">
              რჩეულები ჯერ ცარიელია
            </h3>
            <p className="text-sm text-[#7A6258] mt-2 mb-6 leading-relaxed">
              დაათვალიერეთ წევრები და დააჭირეთ გულის ხატულას სასურველი ანკეტის შესანახად.
            </p>
            <button
              onClick={() => setActiveTab('members')}
              className="px-8 py-3.5 rounded-2xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>წევრების დათვალიერება</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
