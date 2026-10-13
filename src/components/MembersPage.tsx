import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Member } from '../types';
import {
  Search,
  Filter,
  RotateCcw,
  Heart,
  MapPin,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Radio
} from 'lucide-react';
import { GEORGIAN_CITIES, RELATIONSHIP_GOALS } from '../data/initialData';
import { MemberAvatar } from './MemberAvatar';

interface MembersPageProps {
  initialFilters?: {
    gender?: string;
    city?: string;
    minAge?: number;
    maxAge?: number;
  };
}

export const MembersPage: React.FC<MembersPageProps> = ({ initialFilters }) => {
  const { members, favorites, toggleFavorite, setSelectedMember, currentUser, openAuthModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>(initialFilters?.gender || 'ყველა');
  const [selectedCity, setSelectedCity] = useState<string>(initialFilters?.city || 'ყველა');
  const [selectedGoal, setSelectedGoal] = useState<string>('ყველა');
  const [minAge, setMinAge] = useState<number>(initialFilters?.minAge || 50);
  const [maxAge, setMaxAge] = useState<number>(initialFilters?.maxAge || 85);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [onlyOnline, setOnlyOnline] = useState<boolean>(false);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGender('ყველა');
    setSelectedCity('ყველა');
    setSelectedGoal('ყველა');
    setMinAge(50);
    setMaxAge(85);
    setOnlyVerified(false);
    setOnlyOnline(false);
  };

  // Filter logic
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Don't show current logged in user in search results to avoid contacting oneself
      if (currentUser && member.id === currentUser.id) return false;

      // Gender
      if (selectedGender !== 'ყველა' && member.gender !== selectedGender) {
        return false;
      }

      // City
      if (selectedCity !== 'ყველა' && member.city !== selectedCity) {
        return false;
      }

      // Relationship goal
      if (selectedGoal !== 'ყველა' && member.relationshipGoal !== selectedGoal) {
        return false;
      }

      // Age range
      if (member.age < minAge || member.age > maxAge) {
        return false;
      }

      // Verified only
      if (onlyVerified && !member.isVerified) {
        return false;
      }

      // Online only
      if (onlyOnline && !member.isOnline) {
        return false;
      }

      // Search query (name, bio, interests, city)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        const bio = (member.bio || '').toLowerCase();
        const city = (member.city || '').toLowerCase();
        const interests = (member.interests || []).join(' ').toLowerCase();

        if (
          !fullName.includes(query) &&
          !bio.includes(query) &&
          !city.includes(query) &&
          !interests.includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    members,
    currentUser,
    selectedGender,
    selectedCity,
    selectedGoal,
    minAge,
    maxAge,
    onlyVerified,
    onlyOnline,
    searchQuery
  ]);

  const handleMessageClick = (e: React.MouseEvent, member: Member) => {
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
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#45352F] tracking-tight">
            გაცნობა და ძიება
          </h1>
          <p className="mt-2 text-base text-[#7A6258]">
            იპოვეთ სასურველი ადამიანი ასაკის, ქალაქისა და საერთო ინტერესების მიხედვით.
          </p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm mb-10">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C766B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="მოძებნეთ სახელით, ინტერესით (მაგ: ყვავილები, კულინარია, წიგნები)..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-2xl text-sm font-medium text-[#45352F] placeholder-[#9E8B83] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
            </div>

            {/* Filter controls row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">სქესი:</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                >
                  <option value="ყველა">ყველა სქესი</option>
                  <option value="ქალი">ქალბატონები</option>
                  <option value="მამაკაცი">მამაკაცები</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">ქალაქი / რეგიონი:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                >
                  <option value="ყველა">მთელი საქართველო (ყველა)</option>
                  {GEORGIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">ურთიერთობის მიზანი:</label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                >
                  <option value="ყველა">ნებისმიერი მიზანი</option>
                  {RELATIONSHIP_GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Range Display */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#6E594F] mb-1.5">
                  <span>ასაკი:</span>
                  <span className="text-[#A43838] font-bold">
                    {minAge} - {maxAge} წლის
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range"
                    min="50"
                    max="70"
                    value={minAge}
                    onChange={(e) => setMinAge(Number(e.target.value))}
                    className="w-full accent-[#D6AE65] cursor-pointer"
                    title={`დან: ${minAge}`}
                  />
                  <input
                    type="range"
                    min="55"
                    max="85"
                    value={maxAge}
                    onChange={(e) => setMaxAge(Number(e.target.value))}
                    className="w-full accent-[#D6AE65] cursor-pointer"
                    title={`მდე: ${maxAge}`}
                  />
                </div>
              </div>
            </div>

            {/* Checkbox flags & Reset */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#F0E6D8]">
              <div className="flex flex-wrap items-center gap-5">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#6E594F]">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded border-[#EADBCE] text-[#D6AE65] focus:ring-[#D6AE65] w-4 h-4 accent-[#D6AE65]"
                  />
                  <UserCheck className="w-4 h-4 text-[#B5853B]" />
                  <span>მხოლოდ შემოწმებული ანკეტები</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#6E594F]">
                  <input
                    type="checkbox"
                    checked={onlyOnline}
                    onChange={(e) => setOnlyOnline(e.target.checked)}
                    className="rounded border-[#EADBCE] text-[#D6AE65] focus:ring-[#D6AE65] w-4 h-4 accent-[#D6AE65]"
                  />
                  <Radio className="w-4 h-4 text-emerald-600" />
                  <span>მხოლოდ ახლა ონლაინ</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#8C766B]">
                  ნაპოვნია: <strong className="text-[#45352F]">{filteredMembers.length}</strong>
                </span>
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#7A6258] hover:text-[#45352F] hover:bg-[#FAF2E8] transition-colors border border-[#EADBCE]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>გასუფთავება</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Members Catalog Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMembers.map((member) => {
              const isFav = favorites.includes(member.id);
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                >
                  {/* Photo frame or Privacy avatar */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#FAF2E8]">
                    <MemberAvatar member={member} size="card" className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* Status & favorite buttons */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {member.isOnline ? (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md text-emerald-300 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          ონლაინ
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/80 text-xs font-medium">
                          {member.lastActive || 'აქტიური იყო'}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(member.id);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                          isFav
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-black/30 hover:bg-black/50 text-white'
                        }`}
                        aria-label="რჩეულებში დამატება"
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom overlay with name */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif text-xl font-bold tracking-tight drop-shadow-sm">
                          {member.firstName} {member.lastName}
                        </h3>
                        {member.isVerified && (
                          <span title="შემოწმებული პროფილი">
                            <CheckCircle2 className="w-5 h-5 text-[#E2B96F] shrink-0 drop-shadow-sm" />
                          </span>
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

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Goals and Status badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF2E8] text-[#8C6D2B] border border-[#EADBCE]">
                          {member.relationshipGoal}
                        </span>
                        {member.familyStatus && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5ECE0] text-[#7A6258]">
                            {member.familyStatus}
                          </span>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-[#6E594F] line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Interests */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {member.interests.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[#F5ECE0] text-[#7A6258]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-[#F0E6D8] flex items-center gap-2">
                      <button
                        onClick={(e) => handleMessageClick(e, member)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#FAF2E8] hover:bg-[#F0E4D5] text-[#45352F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#EADBCE]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#B5853B]" />
                        <span>მიწერეთ</span>
                      </button>
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>ანკეტა</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty search state */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCE] max-w-lg mx-auto">
            <Filter className="w-12 h-12 text-[#D6AE65] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#45352F]">
              მონაცემები ვერ მოიძებნა
            </h3>
            <p className="text-sm text-[#7A6258] mt-2 mb-6">
              მოცემული ფილტრებით არცერთი წევრი არ შეესაბამება ძიებას. სცადეთ ფილტრების გასუფთავება.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#D6AE65] text-white font-bold text-sm shadow-md"
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
