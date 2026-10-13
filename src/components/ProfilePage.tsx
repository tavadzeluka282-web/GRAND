import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Save,
  ShieldCheck,
  CheckCircle,
  Plus,
  X,
  Camera,
  Upload,
  Trash2,
  Sparkles
} from 'lucide-react';
import { GEORGIAN_CITIES, RELATIONSHIP_GOALS, FAMILY_STATUSES, POPULAR_INTERESTS } from '../data/initialData';
import { MemberAvatar } from './MemberAvatar';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, openAuthModal, logout } = useApp();

  if (!currentUser) {
    return (
      <div className="py-20 bg-[#FFF8EF] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#EADBCE] shadow-md max-w-md w-full">
          <User className="w-16 h-16 text-[#D6AE65] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#45352F] mb-2">
            პროფილის სანახავად შედით სისტემაში
          </h2>
          <p className="text-sm text-[#7A6258] mb-6">
            თქვენ არ ხართ ავტორიზებული. გაიარეთ რეგისტრაცია ან შედით თქვენი ანგარიშით.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-3 rounded-xl bg-[#D6AE65] text-white font-bold text-sm shadow-md"
          >
            სისტემაში შესვლა
          </button>
        </div>
      </div>
    );
  }

  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [age, setAge] = useState<number>(currentUser.age || 58);
  const [city, setCity] = useState(currentUser.city || 'თბილისი');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [goal, setGoal] = useState(currentUser.relationshipGoal || 'ქორწინება');
  const [familyStatus, setFamilyStatus] = useState(currentUser.familyStatus || 'ქვრივი');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [lifestyle, setLifestyle] = useState(currentUser.lifestyle || '');
  const [interests, setInterests] = useState<string[]>(currentUser.interests || []);
  const [photo, setPhoto] = useState(currentUser.photo || '');
  const [customInterest, setCustomInterest] = useState('');

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setPhoto(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      age: Number(age),
      city,
      phone,
      relationshipGoal: goal,
      familyStatus,
      bio,
      lifestyle,
      interests,
      photo
    });
  };

  const handleAddInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setInterests([...interests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleTogglePresetInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            {photo ? (
              <img
                src={photo}
                alt={currentUser.firstName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#FAF2E8] shadow-md"
              />
            ) : (
              <MemberAvatar
                member={currentUser}
                size="xl"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#FAF2E8] shadow-md"
              />
            )}
            <label
              htmlFor="profile-photo-upload-header"
              className="absolute bottom-0 right-0 p-2.5 rounded-full bg-[#D6AE65] text-white hover:bg-[#C59B4F] shadow-sm transition-transform active:scale-95 cursor-pointer"
              title="ფოტოს შეცვლა ფაილიდან"
            >
              <Camera className="w-4 h-4" />
            </label>
            <input
              id="profile-photo-upload-header"
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#45352F]">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <CheckCircle className="w-5 h-5 text-[#E2B96F]" />
            </div>
            <p className="text-sm text-[#7A6258] mt-1 flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="w-4 h-4 text-[#B5853B]" />
              <span>{currentUser.city}</span>
              <span>•</span>
              <span>{currentUser.age} წლის</span>
              <span>•</span>
              <span className="text-[#8C6D2B] font-semibold">{currentUser.relationshipGoal}</span>
            </p>
            <p className="text-xs text-[#A0897F] mt-1">
              წევრი 2026 წლიდან • Google-ის გარეშე, პირადი ანგარიში
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            სისტემიდან გასვლა
          </button>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-6">
          <div className="border-b border-[#F0E6D8] pb-4">
            <h2 className="font-serif text-xl font-bold text-[#45352F]">
              პირადი მონაცემების რედაქტირება
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              განაახლეთ თქვენი ინფორმაცია და ატვირთეთ თქვენი პირადი ფოტო ფაილიდან.
            </p>
          </div>

          {/* Photo File Upload Section */}
          <div className="p-4 bg-[#FAF2E8] rounded-2xl border border-[#EADBCE]">
            <label className="block text-xs font-bold text-[#6E594F] mb-2 flex items-center justify-between">
              <span>ფოტოსურათის არჩევა ფაილიდან:</span>
              <span className="text-[10px] text-[#8C766B]">კომპიუტერიდან ან მობილურიდან</span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {photo ? (
                <img
                  src={photo}
                  alt="ანკეტის ფოტო"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D6AE65] shadow-xs"
                />
              ) : (
                <MemberAvatar
                  member={currentUser}
                  size="lg"
                  className="w-20 h-20 rounded-2xl border-2 border-[#D6AE65] shadow-xs"
                />
              )}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-[#45352F]">
                  პირადი ფოტოსურათი ანკეტისთვის
                </p>
                <p className="text-[11px] text-[#7A6258] mt-0.5">
                  შეგიძლიათ ნებისმიერ დროს შეცვალოთ ან ატვირთოთ ახალი სურათი
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
                  <label
                    htmlFor="profile-form-photo-upload"
                    className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>ფაილის არჩევა</span>
                  </label>
                  <input
                    id="profile-form-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                  {photo && (
                    <button
                      type="button"
                      onClick={() => setPhoto('')}
                      className="px-3 py-1.5 rounded-xl bg-white border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>წაშლა</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                სახელი *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                გვარი
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                ასაკი
              </label>
              <input
                type="number"
                min="50"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                ქალაქი
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              >
                {GEORGIAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                საკონტაქტო ტელეფონი
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="599 00 00 00"
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                ურთიერთობის მიზანი
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              >
                {RELATIONSHIP_GOALS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                ოჯახური მდგომარეობა
              </label>
              <select
                value={familyStatus}
                onChange={(e) => setFamilyStatus(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              >
                {FAMILY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
              ჩემს შესახებ (ანკეტის აღწერა)
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="მოგვიყევით თქვენს შესახებ, რა გიყვართ და რას ეძებთ..."
              className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
            />
          </div>

          {/* Lifestyle */}
          <div>
            <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
              ცხოვრების წესი
            </label>
            <input
              type="text"
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
              placeholder="მაგ: დილის ყავა აივანზე, ყვავილების მოვლა, მშვიდი ცხოვრება"
              className="w-full py-2.5 px-3.5 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
            />
          </div>

          {/* Interests tags management */}
          <div>
            <label className="block text-xs font-bold text-[#6E594F] mb-2">
              ინტერესები და გატაცებები
            </label>
            {/* Current chosen chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D6AE65]/20 text-[#8C6D2B] border border-[#D6AE65]/30"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(item)}
                    className="hover:text-red-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick add from popular */}
            <p className="text-[11px] font-semibold text-[#8C766B] mb-1.5">
              აირჩიეთ პოპულარული ინტერესებიდან:
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {POPULAR_INTERESTS.slice(0, 10).map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleTogglePresetInterest(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    interests.includes(p)
                      ? 'bg-[#D6AE65] text-white'
                      : 'bg-[#FAF2E8] text-[#6E594F] hover:bg-[#F0E6D8]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Add custom interest */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="სხვა ინტერესის დამატება..."
                className="py-2 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-xs font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3 py-2 bg-[#FAF2E8] hover:bg-[#F0E6D8] border border-[#EADBCE] rounded-xl text-xs font-bold text-[#6E594F] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>დამატება</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#2E7D32]">
              <ShieldCheck className="w-4 h-4" />
              <span>მონაცემები ინახება დაცულად</span>
            </div>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>ცვლილებების შენახვა</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
