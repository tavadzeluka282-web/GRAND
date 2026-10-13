import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Heart,
  MapPin,
  CheckCircle2,
  MessageSquare,
  ShieldAlert,
  Ban,
  Calendar,
  Sparkles,
  Compass,
  Languages
} from 'lucide-react';
import { MemberAvatar } from './MemberAvatar';

export const MemberDetailModal: React.FC = () => {
  const {
    selectedMember,
    setSelectedMember,
    favorites,
    toggleFavorite,
    setActiveTab,
    blockUser,
    reportUser,
    currentUser,
    openAuthModal
  } = useApp();

  if (!selectedMember) return null;

  const isFav = favorites.includes(selectedMember.id);

  const handleMessage = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSelectedMember(null);
    setActiveTab('messages');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EADBCE] my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header photo & overlay */}
        <div className="relative h-72 sm:h-80 bg-[#FAF2E8] overflow-hidden">
          <MemberAvatar member={selectedMember} size="card" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Status & favorite buttons */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {selectedMember.isOnline ? 'ონლაინ' : selectedMember.lastActive || 'აქტიური იყო'}
            </span>
            {selectedMember.isVerified && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D6AE65]/90 backdrop-blur-md text-white text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                შემოწმებული
              </span>
            )}
          </div>

          {/* Name & Basic info on bottom of hero */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-sm">
              {selectedMember.firstName} {selectedMember.lastName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 font-medium mt-1 drop-shadow-sm">
              <span>{selectedMember.age} წლის</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#E2B96F]" />
                {selectedMember.city}{selectedMember.region ? `, ${selectedMember.region}` : ''}
              </span>
              <span>•</span>
              <span className="text-[#E2B96F] font-bold">{selectedMember.relationshipGoal}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Quick info pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE]">
              <span className="text-[11px] text-[#8C766B] block">ოჯახური სტატუსი:</span>
              <span className="text-xs sm:text-sm font-bold text-[#45352F]">
                {selectedMember.familyStatus || 'არ არის მითითებული'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE]">
              <span className="text-[11px] text-[#8C766B] block">სასურველი ასაკი:</span>
              <span className="text-xs sm:text-sm font-bold text-[#45352F]">
                {selectedMember.preferredAgeMin || 50} - {selectedMember.preferredAgeMax || 70} წელი
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] col-span-2 sm:col-span-1">
              <span className="text-[11px] text-[#8C766B] block">ენები:</span>
              <span className="text-xs sm:text-sm font-bold text-[#45352F]">
                {(selectedMember.languages || ['ქართული']).join(', ')}
              </span>
            </div>
          </div>

          {/* Full Bio */}
          <div>
            <h3 className="text-xs font-bold text-[#8C6D2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>ჩემს შესახებ</span>
            </h3>
            <p className="text-sm sm:text-base text-[#45352F] leading-relaxed bg-[#FAF2E8]/40 p-4 rounded-2xl border border-[#EADBCE]">
              {selectedMember.bio}
            </p>
          </div>

          {/* Lifestyle */}
          {selectedMember.lifestyle && (
            <div>
              <h3 className="text-xs font-bold text-[#8C6D2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>ცხოვრების წესი და ყოველდღიურობა</span>
              </h3>
              <p className="text-sm text-[#5C483F] leading-relaxed">
                {selectedMember.lifestyle}
              </p>
            </div>
          )}

          {/* Interests */}
          <div>
            <h3 className="text-xs font-bold text-[#8C6D2B] uppercase tracking-wider mb-2.5">
              ინტერესები და გატაცებები
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedMember.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF2E8] text-[#6E4F3A] border border-[#EADBCE]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Desired Partner Location */}
          {selectedMember.preferredLocation && (
            <div className="p-3 rounded-2xl bg-[#FAF2E8]/50 border border-[#EADBCE] text-xs text-[#6E594F] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B5853B] shrink-0" />
              <span>
                <strong>სასურველი ლოკაცია:</strong> {selectedMember.preferredLocation}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:p-6 border-t border-[#EADBCE] bg-[#FAF2E8]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Favorite & Safety actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleFavorite(selectedMember.id)}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xs font-bold ${
                isFav
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white border-[#EADBCE] text-[#45352F] hover:bg-[#FAF2E8]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              <span>{isFav ? 'რჩეულებშია' : 'რჩეულები'}</span>
            </button>

            <button
              onClick={() => reportUser(selectedMember.id)}
              className="p-3 rounded-2xl bg-white border border-[#EADBCE] text-xs text-[#8C766B] hover:text-red-700 hover:border-red-200 transition-colors flex items-center gap-1.5"
              title="რეპორტი ან დაბლოკვა"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden sm:inline">რეპორტი</span>
            </button>
          </div>

          {/* Primary Send Message action */}
          <button
            onClick={handleMessage}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>მიწერეთ შეტყობინება</span>
          </button>
        </div>
      </div>
    </div>
  );
};
