import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedMembers } from './components/FeaturedMembers';
import { StoriesSection } from './components/StoriesSection';
import { CallToAction } from './components/CallToAction';
import { MembersPage } from './components/MembersPage';
import { FavoritesPage } from './components/FavoritesPage';
import { MessagesPage } from './components/MessagesPage';
import { ProfilePage } from './components/ProfilePage';
import { MemberDetailModal } from './components/MemberDetailModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SafetyModal } from './components/SafetyModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const [searchFilters, setSearchFilters] = useState<{
    gender?: string;
    city?: string;
    minAge?: number;
    maxAge?: number;
  }>({
    gender: 'ქალი',
    city: 'ყველა',
    minAge: 50,
    maxAge: 75
  });

  const handleHeroSearch = (filters: { gender: string; city: string; minAge: number; maxAge: number }) => {
    setSearchFilters(filters);
    setActiveTab('members');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EF] text-[#45352F]">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection onSearch={handleHeroSearch} />
            <FeaturedMembers />
            <StoriesSection />
            <CallToAction />
          </>
        )}

        {activeTab === 'members' && <MembersPage initialFilters={searchFilters} />}

        {activeTab === 'favorites' && <FavoritesPage />}

        {activeTab === 'messages' && <MessagesPage />}

        {activeTab === 'stories' && (
          <div className="py-10 bg-[#FFF8EF]">
            <StoriesSection />
          </div>
        )}

        {activeTab === 'profile' && <ProfilePage />}
      </main>

      {/* Modals & Floating Overlays */}
      <MemberDetailModal />
      <StoryDetailModal />
      <SafetyModal />
      <AuthModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
