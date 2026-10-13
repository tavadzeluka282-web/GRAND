import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Users,
  Heart,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  UserPlus,
  LogIn
} from 'lucide-react';
import { TabType } from '../types';
import { MemberAvatar } from './MemberAvatar';

export const Header: React.FC = () => {
  const {
    currentUser,
    favorites,
    messages,
    activeTab,
    setActiveTab,
    fontSizeScale,
    setFontSizeScale,
    openAuthModal,
    logout,
    setSafetyModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadMessagesCount = messages.filter((m) => m.receiverId === 'me' && !m.isRead).length;

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'მთავარი', icon: <Home className="w-4 h-4" /> },
    { id: 'members', label: 'გაცნობა / ძიება', icon: <Users className="w-4 h-4" /> },
    { id: 'favorites', label: 'რჩეულები', icon: <Heart className="w-4 h-4" />, badge: favorites.length },
    {
      id: 'messages',
      label: 'შეტყობინებები',
      icon: <MessageCircle className="w-4 h-4" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined
    },
    { id: 'stories', label: 'ისტორიები', icon: <BookOpen className="w-4 h-4" /> }
  ];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#EADBCE] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E2B96F] to-[#B5853B] flex items-center justify-center text-white shadow-md shadow-[#D6AE65]/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif font-bold text-2xl tracking-tighter">G</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#45352F] tracking-wide">
                  GoldAge
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#D6AE65]/20 text-[#8C6D2B] border border-[#D6AE65]/30">
                  50+
                </span>
              </div>
              <p className="text-xs text-[#7A6258] font-medium hidden sm:block">
                უფროსი თაობის გაცნობისა და ქორწინების პლატფორმა
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#EADBCE]/60 text-[#45352F] shadow-xs font-semibold'
                      : 'text-[#67544C] hover:text-[#45352F] hover:bg-[#F5ECE0]'
                  }`}
                >
                  <span className={isActive ? 'text-[#B58F42]' : 'text-[#8C766B]'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#D6AE65] text-white font-bold text-[11px] leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls & User Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Font size toggle for older adults */}
            <div className="flex items-center bg-[#F5ECE0] rounded-xl p-0.5 border border-[#EADBCE] text-xs font-semibold">
              <button
                onClick={() => setFontSizeScale('normal')}
                title="ნორმალური შრიფტი"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  fontSizeScale === 'normal'
                    ? 'bg-white text-[#45352F] shadow-xs font-bold'
                    : 'text-[#7A6258] hover:text-[#45352F]'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeScale('large')}
                title="დიდი შრიფტი"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  fontSizeScale === 'large'
                    ? 'bg-white text-[#45352F] shadow-xs font-bold'
                    : 'text-[#7A6258] hover:text-[#45352F]'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeScale('extra-large')}
                title="ძალიან დიდი შრიფტი"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  fontSizeScale === 'extra-large'
                    ? 'bg-white text-[#45352F] shadow-xs font-bold'
                    : 'text-[#7A6258] hover:text-[#45352F]'
                }`}
              >
                A++
              </button>
            </div>

            {/* Safety Guidelines */}
            <button
              onClick={() => setSafetyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#67544C] hover:text-[#45352F] hover:bg-[#F5ECE0] transition-colors border border-transparent hover:border-[#EADBCE]"
              title="უსაფრთხოების წესები"
            >
              <ShieldCheck className="w-4 h-4 text-[#B58F42]" />
              <span>უსაფრთხოება</span>
            </button>

            {/* User Profile or Login/Register */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white border border-[#EADBCE] hover:border-[#D6AE65] shadow-xs transition-colors"
                >
                  <MemberAvatar
                    member={currentUser}
                    size="sm"
                    className="w-8 h-8 rounded-full border border-[#D6AE65]"
                  />
                  <span className="text-sm font-semibold text-[#45352F] max-w-[120px] truncate">
                    {currentUser.firstName}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#EADBCE] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#F0E6D8]">
                      <p className="text-xs text-[#7A6258]">შესული ხართ როგორც:</p>
                      <p className="font-semibold text-sm text-[#45352F]">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-[11px] text-[#A0897F] truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#45352F] hover:bg-[#FFF8EF] transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-[#B58F42]" />
                      <span>ჩემი პროფილი</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#A83232] hover:bg-[#FFF2F2] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>სისტემიდან გასვლა</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#45352F] hover:bg-[#F5ECE0] transition-colors border border-[#EADBCE]"
                >
                  <LogIn className="w-4 h-4 text-[#8C766B]" />
                  <span>შესვლა</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-[#D6AE65] hover:bg-[#C59B4F] text-white shadow-sm shadow-[#D6AE65]/30 transition-all duration-150 hover:shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>რეგისტრაცია</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-1.5 p-0.5 rounded-full border border-[#D6AE65]"
              >
                <MemberAvatar
                  member={currentUser}
                  size="sm"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#45352F] hover:bg-[#F5ECE0] transition-colors border border-[#EADBCE]"
              aria-label="მენიუს გახსნა"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EADBCE] bg-[#FFF8EF] px-4 py-5 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5 mb-5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EADBCE]/80 text-[#45352F] font-bold shadow-xs'
                      : 'text-[#67544C] hover:bg-[#F5ECE0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#B58F42]' : 'text-[#8C766B]'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#D6AE65] text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Accessibility font scaling in mobile */}
          <div className="py-3 px-2 border-t border-[#EADBCE] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A6258]">შრიფტის ზომა:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFontSizeScale('normal')}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  fontSizeScale === 'normal'
                    ? 'bg-[#D6AE65] text-white border-[#D6AE65]'
                    : 'bg-white border-[#EADBCE] text-[#45352F]'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeScale('large')}
                className={`px-3 py-1 rounded-lg text-sm font-bold border ${
                  fontSizeScale === 'large'
                    ? 'bg-[#D6AE65] text-white border-[#D6AE65]'
                    : 'bg-white border-[#EADBCE] text-[#45352F]'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeScale('extra-large')}
                className={`px-3 py-1 rounded-lg text-base font-bold border ${
                  fontSizeScale === 'extra-large'
                    ? 'bg-[#D6AE65] text-white border-[#D6AE65]'
                    : 'bg-white border-[#EADBCE] text-[#45352F]'
                }`}
              >
                A++
              </button>
            </div>
          </div>

          {/* Safety rules in mobile */}
          <div className="pt-3 border-t border-[#EADBCE]">
            <button
              onClick={() => {
                setSafetyModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#67544C] hover:bg-[#F5ECE0]"
            >
              <ShieldCheck className="w-4 h-4 text-[#B58F42]" />
              <span>უსაფრთხოების სახელმძღვანელო</span>
            </button>
          </div>

          {/* Auth options in mobile */}
          <div className="pt-4 border-t border-[#EADBCE]">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EADBCE] text-sm font-bold text-[#45352F]"
                >
                  <User className="w-4 h-4 text-[#B58F42]" />
                  <span>ჩემი პროფილი ({currentUser.firstName})</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 text-sm font-semibold border border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>გასვლა</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#EADBCE] text-sm font-bold text-[#45352F]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>შესვლა</span>
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D6AE65] text-white text-sm font-bold shadow-md shadow-[#D6AE65]/20"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>რეგისტრაცია</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
