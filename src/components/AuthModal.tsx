import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Upload,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import {
  GEORGIAN_CITIES,
  RELATIONSHIP_GOALS,
  FAMILY_STATUSES,
  POPULAR_INTERESTS
} from '../data/initialData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    loginWithCredentials,
    registerUser
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);

  // Sync mode with prop
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Registration state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regGender, setRegGender] = useState<'ქალი' | 'მამაკაცი'>('ქალი');
  const [regAge, setRegAge] = useState<number>(58);
  const [regCity, setRegCity] = useState('თბილისი');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGoal, setRegGoal] = useState('ქორწინება');
  const [regFamilyStatus, setRegFamilyStatus] = useState('ქვრივი');
  const [regBio, setRegBio] = useState('');
  const [regInterests, setRegInterests] = useState<string[]>([
    'ყვავილები',
    'კლასიკური მუსიკა',
    'კულინარია',
    'სეირნობა'
  ]);
  const [regPhoto, setRegPhoto] = useState<string>('');
  const [regError, setRegError] = useState<string | null>(null);

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setRegError('ფაილის ზომა არ უნდა აღემატებოდეს 8 MB-ს.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setRegPhoto(event.target.result);
          setRegError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginWithCredentials(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'ავტორიზაცია ვერ მოხერხდა.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regFirstName.trim()) {
      setRegError('გთხოვთ მიუთითოთ სახელი.');
      return;
    }

    if (!regPhone.trim() && !regEmail.trim()) {
      setRegError('გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.');
      return;
    }

    const res = registerUser({
      firstName: regFirstName,
      lastName: regLastName,
      gender: regGender,
      age: Number(regAge),
      city: regCity,
      phone: regPhone,
      email: regEmail,
      password: regPassword || 'goldage123',
      relationshipGoal: regGoal,
      familyStatus: regFamilyStatus,
      bio: regBio || 'გამარჯობა! დავრეგისტრირდი GoldAge-ზე. ვეძებ სანდო მეგობარსა და თანამგზავრს.',
      interests: regInterests,
      photo: regPhoto
    });

    if (!res.success) {
      setRegError(res.error || 'რეგისტრაცია ვერ მოხერხდა.');
    }
  };

  const handleFillDemo = (name: string, identifier: string) => {
    setLoginIdentifier(identifier);
    setLoginPassword('password123');
    setLoginError(null);
  };

  const toggleInterest = (interest: string) => {
    if (regInterests.includes(interest)) {
      setRegInterests(regInterests.filter((i) => i !== interest));
    } else {
      setRegInterests([...regInterests, interest]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EADBCE] my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Tabs */}
        <div className="p-6 bg-[#FAF2E8] border-b border-[#EADBCE] relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-xl text-[#7A6258] hover:text-[#45352F] hover:bg-[#F0E6D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#D6AE65] flex items-center justify-center text-white font-serif font-bold text-lg">
              G
            </div>
            <span className="font-serif font-bold text-lg text-[#45352F]">GoldAge</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D6AE65]/20 text-[#8C6D2B]">
              50+
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-white rounded-2xl border border-[#EADBCE]">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLoginError(null);
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-[#D6AE65] text-white shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>შესვლა</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('register');
                setRegError(null);
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'bg-[#D6AE65] text-white shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>რეგისტრაცია</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* Note reassuring user that NO Google is required */}
          <div className="mb-6 p-3 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] flex items-center gap-2.5 text-xs text-[#6E594F]">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
            <span>
              <strong>მარტივი რეგისტრაცია Google-ის გარეშე:</strong> შეიყვანეთ მხოლოდ თქვენი მონაცემები და დაიწყეთ გაცნობა.
            </span>
          </div>

          {mode === 'login' ? (
            /* ===== LOGIN FORM ===== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center sm:text-left mb-2">
                <h3 className="font-serif text-xl font-bold text-[#45352F]">
                  ანგარიშში შესვლა
                </h3>
                <p className="text-xs text-[#7A6258] mt-1">
                  შეიყვანეთ თქვენი ტელეფონის ნომერი ან ელ-ფოსტა
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                  ტელეფონი ან ელ-ფოსტა *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C766B]" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="მაგ: 599 14 25 36 ან elene.kalandadze@goldage.ge"
                    className="w-full pl-10 pr-3.5 py-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                  პაროლი
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C766B]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="შეიყვანეთ თქვენი პაროლი"
                    className="w-full pl-10 pr-10 py-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C766B] hover:text-[#45352F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Demo Fill Buttons for quick exploration */}
              <div className="p-3 rounded-2xl bg-[#FAF2E8]/60 border border-[#EADBCE]">
                <p className="text-[11px] font-bold text-[#8C6D2B] mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  სწრაფი შესვლა სატესტო ანკეტით:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleFillDemo('ელენე', 'elene.kalandadze@goldage.ge')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white border border-[#EADBCE] hover:border-[#D6AE65] text-[#45352F] font-semibold transition-colors"
                  >
                    ელენე (52 წ, თბილისი)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('ლევან', 'levan.maisuradze@goldage.ge')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white border border-[#EADBCE] hover:border-[#D6AE65] text-[#45352F] font-semibold transition-colors"
                  >
                    ლევან (55 წ, ქუთაისი)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('ქეთი', 'keti.chelidze@goldage.ge')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white border border-[#EADBCE] hover:border-[#D6AE65] text-[#45352F] font-semibold transition-colors"
                  >
                    ქეთი (50 წ, ბათუმი)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>სისტემაში შესვლა</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs text-[#8C6D2B] hover:text-[#45352F] font-semibold underline"
                >
                  არ გაქვთ ანგარიში? გაიარეთ რეგისტრაცია
                </button>
              </div>
            </form>
          ) : (
            /* ===== REGISTRATION FORM ("USUALLY REGISTRATION") ===== */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="text-center sm:text-left mb-2">
                <h3 className="font-serif text-xl font-bold text-[#45352F]">
                  ახალი ანკეტის შექმნა
                </h3>
                <p className="text-xs text-[#7A6258] mt-1">
                  რეგისტრაცია უფასოა და არ საჭიროებს Google ანგარიშს
                </p>
              </div>

              {regError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {regError}
                </div>
              )}

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    სახელი *
                  </label>
                  <input
                    type="text"
                    required
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="მაგ: მარიამი"
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    გვარი
                  </label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="მაგ: ბერიძე"
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    სქესი *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF2E8] rounded-xl border border-[#EADBCE]">
                    <button
                      type="button"
                      onClick={() => setRegGender('ქალი')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        regGender === 'ქალი'
                          ? 'bg-[#D6AE65] text-white shadow-xs'
                          : 'text-[#6E594F]'
                      }`}
                    >
                      ქალი
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegGender('მამაკაცი')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        regGender === 'მამაკაცი'
                          ? 'bg-[#D6AE65] text-white shadow-xs'
                          : 'text-[#6E594F]'
                      }`}
                    >
                      მამაკაცი
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    ასაკი ({regAge} წლის)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="90"
                    value={regAge}
                    onChange={(e) => setRegAge(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>
              </div>

              {/* City & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    ქალაქი
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  >
                    {GEORGIAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    ტელეფონის ნომერი *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="599 12 34 56"
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    ელ-ფოსტა (სურვილისამებრ)
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mariam@gmail.com"
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    პაროლი *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="შექმენით პაროლი"
                    className="w-full py-2.5 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Relationship Goal & Family Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    მიზანი
                  </label>
                  <select
                    value={regGoal}
                    onChange={(e) => setRegGoal(e.target.value)}
                    className="w-full py-2 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-xs font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  >
                    {RELATIONSHIP_GOALS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E594F] mb-1">
                    ოჯახური სტატუსი
                  </label>
                  <select
                    value={regFamilyStatus}
                    onChange={(e) => setRegFamilyStatus(e.target.value)}
                    className="w-full py-2 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-xs font-semibold text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
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
                <label className="block text-xs font-bold text-[#6E594F] mb-1">
                  ჩემს შესახებ (მოკლედ)
                </label>
                <textarea
                  rows={2}
                  value={regBio}
                  onChange={(e) => setRegBio(e.target.value)}
                  placeholder="მოკლედ დაწერეთ თქვენს შესახებ და ვის ეძებთ..."
                  className="w-full py-2 px-3 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-xs font-medium text-[#45352F] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                />
              </div>

              {/* Photo File Upload (ფაილის არჩევა) */}
              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5 flex items-center justify-between">
                  <span>ფოტოსურათის არჩევა ფაილიდან:</span>
                  <span className="text-[10px] text-[#8C766B]">ატვირთეთ ფოტო მოწყობილობიდან</span>
                </label>

                {regPhoto ? (
                  <div className="flex items-center gap-4 p-3.5 bg-[#FAF2E8] rounded-2xl border border-[#EADBCE]">
                    <img
                      src={regPhoto}
                      alt="ატვირთული ფოტო"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D6AE65] shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#45352F] flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>ფოტო წარმატებით აიტვირთა</span>
                      </p>
                      <p className="text-[11px] text-[#7A6258] mt-0.5">
                        მზად არის ანკეტაში გამოსაჩენად
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <label
                          htmlFor="auth-photo-file-input"
                          className="cursor-pointer text-xs font-bold text-[#8C6D2B] hover:text-[#45352F] underline inline-flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>სხვა ფაილის არჩევა</span>
                        </label>
                        <span className="text-xs text-[#DCC7B5]">•</span>
                        <button
                          type="button"
                          onClick={() => setRegPhoto('')}
                          className="text-xs font-bold text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>წაშლა</span>
                        </button>
                      </div>
                    </div>
                    <input
                      id="auth-photo-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="auth-photo-file-input"
                    className="flex flex-col items-center justify-center gap-2 p-5 bg-[#FAF2E8] hover:bg-[#F3E7D6] rounded-2xl border-2 border-dashed border-[#D6AE65]/60 hover:border-[#D6AE65] cursor-pointer transition-all group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#B5853B] shadow-xs group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#45352F]">
                        დააჭირეთ ფოტოს ასარჩევად
                      </p>
                      <p className="text-[11px] text-[#8C766B] mt-0.5">
                        აირჩიეთ ფაილი კომპიუტერიდან ან ტელეფონიდან (JPG, PNG, WebP)
                      </p>
                    </div>
                    <input
                      id="auth-photo-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Interests chips */}
              <div>
                <label className="block text-xs font-bold text-[#6E594F] mb-1.5">
                  ინტერესები (მონიშნეთ რაც გიყვართ):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_INTERESTS.slice(0, 10).map((p, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleInterest(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        regInterests.includes(p)
                          ? 'bg-[#D6AE65] text-white'
                          : 'bg-[#FAF2E8] text-[#6E594F] hover:bg-[#F0E6D8]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
              >
                <UserPlus className="w-4 h-4" />
                <span>ანგარიშის შექმნა</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-[#8C6D2B] hover:text-[#45352F] font-semibold underline"
                >
                  უკვე დარეგისტრირებული ხართ? შესვლა
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
