import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, Story, SafetyTip, ChatMessage, TabType, FontSizeScale } from '../types';
import { INITIAL_MEMBERS, INITIAL_STORIES, SAFETY_TIPS } from '../data/initialData';

interface AppContextType {
  currentUser: Member | null;
  members: Member[];
  favorites: string[];
  blockedUsers: string[];
  messages: ChatMessage[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
  selectedStory: Story | null;
  setSelectedStory: (story: Story | null) => void;
  fontSizeScale: FontSizeScale;
  setFontSizeScale: (scale: FontSizeScale) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  loginWithCredentials: (identifier: string, password?: string) => { success: boolean; error?: string };
  registerUser: (data: Partial<Member> & { password?: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<Member>) => void;
  toggleFavorite: (memberId: string) => void;
  sendMessage: (receiverId: string, text: string) => void;
  blockUser: (memberId: string) => void;
  reportUser: (memberId: string, reason?: string) => void;
  stories: Story[];
  safetyTips: SafetyTip[];
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Member | null>(() => {
    try {
      const saved = localStorage.getItem('goldage_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_members');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: Member) => {
            const initial = INITIAL_MEMBERS.find((im) => im.id === m.id);
            if (initial && (!m.photo || m.photo === '')) {
              return { ...m, photo: initial.photo, gallery: initial.gallery };
            }
            return m;
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_MEMBERS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_favorites');
      return saved ? JSON.parse(saved) : ['user-new-1', 'user-new-2'];
    } catch {
      return ['user-new-1', 'user-new-2'];
    }
  });

  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_blocked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-1',
        senderId: 'user-new-1',
        receiverId: 'me',
        text: 'მოგესალმებით! სასიამოვნოა თქვენი პროფილის ნახვა GoldAge-ზე. თუ გნებავთ, სიამოვნებით გავისაუბრებდი.',
        timestamp: '14:20',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'user-new-3',
        receiverId: 'me',
        text: 'გამარჯობა! ბათუმიდან გწერთ. სასიამოვნო დღეს გისურვებთ!',
        timestamp: 'გუშინ',
        isRead: true
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>(() => {
    try {
      return (localStorage.getItem('goldage_font_scale') as FontSizeScale) || 'normal';
    } catch {
      return 'normal';
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('goldage_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('goldage_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('goldage_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('goldage_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('goldage_blocked', JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  useEffect(() => {
    localStorage.setItem('goldage_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('goldage_font_scale', fontSizeScale);
    const root = document.documentElement;
    root.classList.remove('font-scale-large', 'font-scale-extra-large');
    if (fontSizeScale === 'large') {
      root.classList.add('font-scale-large');
    } else if (fontSizeScale === 'extra-large') {
      root.classList.add('font-scale-extra-large');
    }
  }, [fontSizeScale]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4000);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Standard regular login ("usually registration") - NO Google
  const loginWithCredentials = (identifier: string, password?: string) => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      return { success: false, error: 'გთხოვთ შეიყვანოთ ტელეფონი ან ელ-ფოსტა.' };
    }

    const found = members.find((m) => {
      const matchEmail = m.email.toLowerCase() === cleanId;
      const matchPhone = m.phone && m.phone.replace(/[\s\-()]/g, '') === cleanId.replace(/[\s\-()]/g, '');
      const matchFirstName = m.firstName.toLowerCase() === cleanId;
      return matchEmail || matchPhone || matchFirstName;
    });

    if (found) {
      if (found.password && password && found.password !== password) {
        return { success: false, error: 'შეყვანილი პაროლი არასწორია.' };
      }
      const loggedUser = { ...found, isOnline: true };
      setCurrentUser(loggedUser);
      setIsAuthModalOpen(false);
      showToast(`მოგესალმებით, ${loggedUser.firstName}! სისტემაში წარმატებით შეხვედით.`);
      return { success: true };
    }

    return {
      success: false,
      error: 'მომხმარებელი ამ მონაცემებით ვერ მოიძებნა. გთხოვთ გაიაროთ რეგისტრაცია.'
    };
  };

  // Standard regular registration ("usually registration") - NO Google
  const registerUser = (data: Partial<Member> & { password?: string }) => {
    if (!data.firstName || !data.firstName.trim()) {
      return { success: false, error: 'გთხოვთ მიუთითოთ თქვენი სახელი.' };
    }
    if (!data.phone && !data.email) {
      return { success: false, error: 'გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.' };
    }

    const email = data.email?.trim() || (data.phone ? `${data.phone.replace(/[^0-9]/g, '')}@goldage.ge` : `user-${Date.now()}@goldage.ge`);

    // Check if existing
    const existing = members.find((m) => m.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'ეს ელ-ფოსტა ან ნომერი უკვე გამოყენებულია.' };
    }

    const defaultPhoto = data.gender === 'მამაკაცი'
      ? '/assets/portrait_levan_kutaisi_1791864157913-CJ3AL3H9.jpg'
      : '';

    const newUser: Member = {
      id: `user-${Date.now()}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName?.trim() || '',
      email,
      phone: data.phone?.trim() || '',
      birthDate: data.birthDate || '',
      age: data.age || 58,
      gender: data.gender || 'ქალი',
      country: 'საქართველო',
      city: data.city || 'თბილისი',
      region: data.region || 'მთაწმინდა',
      photo: data.photo || defaultPhoto,
      gallery: [data.photo || defaultPhoto],
      bio: data.bio?.trim() || 'გამარჯობა! დავრეგისტრირდი GoldAge-ზე. ვეძებ სანდო მეგობარსა და თანამგზავრს ცხოვრების გასაზიარებლად.',
      interests: data.interests && data.interests.length > 0 ? data.interests : ['კითხვა', 'ბუნება', 'კულინარია', 'სეირნობა'],
      relationshipGoal: data.relationshipGoal || 'სერიოზული ურთიერთობა',
      preferredAgeMin: data.preferredAgeMin || 50,
      preferredAgeMax: data.preferredAgeMax || 70,
      preferredLocation: data.preferredLocation || 'საქართველო',
      languages: data.languages || ['ქართული'],
      lifestyle: data.lifestyle || 'მშვიდი და ჯანსაღი ცხოვრების წესი, დილის ყავა და სეირნობა',
      familyStatus: data.familyStatus || 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
      password: data.password || 'password123'
    };

    setMembers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`გილოცავთ, ${newUser.firstName}! თქვენი ანგარიში წარმატებით შეიქმნა. კეთილი იყოს თქვენი მობრძანება!`);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('თქვენ გამოხვედით სისტემიდან.');
  };

  const updateProfile = (data: Partial<Member>) => {
    if (!currentUser) return;
    const updated: Member = { ...currentUser, ...data };
    setCurrentUser(updated);
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showToast('პროფილის მონაცემები წარმატებით განახლდა!');
  };

  const toggleFavorite = (memberId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(memberId);
      const updated = exists ? prev.filter((id) => id !== memberId) : [...prev, memberId];
      showToast(exists ? 'ამოიშალა რჩეულებიდან' : 'დაემატა თქვენს რჩეულებში ❤️');
      return updated;
    });
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!text.trim()) return;

    const myId = currentUser ? currentUser.id : 'me';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: myId,
      receiverId,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setMessages((prev) => [...prev, newMsg]);
    showToast('შეტყობინება წარმატებით გაიგზავნა! ✉️');

    // Friendly realistic auto-reply from mature partner
    const target = members.find((m) => m.id === receiverId);
    if (target) {
      setTimeout(() => {
        const warmReplies = [
          'ძალიან სასიამოვნოა თქვენი წერილის მიღება! მადლობა თბილი სიტყვებისთვის.',
          'გამარჯობა! სიამოვნებით გავაგრძელებ თქვენთან საუბარს.',
          'მოგესალმებით! იმედია ლამაზი და მშვიდი დღე გაქვთ. დიდი მადლობა ყურადღებისთვის.',
          'დიდი სიამოვნებით! რა სასიამოვნოა თქვენი გაცნობა.'
        ];
        const randomReply = warmReplies[Math.floor(Math.random() * warmReplies.length)];
        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          senderId: receiverId,
          receiverId: myId,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 2500);
    }
  };

  const blockUser = (memberId: string) => {
    setBlockedUsers((prev) => [...prev, memberId]);
    setFavorites((prev) => prev.filter((id) => id !== memberId));
    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }
    showToast('მომხმარებელი დაბლოკილია.');
  };

  const reportUser = (memberId: string) => {
    showToast('მადლობა სიფხიზლისთვის. შეტყობინება გადაეცა GoldAge-ის ადმინისტრაციას.');
    blockUser(memberId);
  };

  const activeMembers = members.filter((m) => !blockedUsers.includes(m.id));

  return (
    <AppContext.Provider
      value={{
        currentUser,
        members: activeMembers,
        favorites,
        blockedUsers,
        messages,
        activeTab,
        setActiveTab,
        selectedMember,
        setSelectedMember,
        selectedStory,
        setSelectedStory,
        fontSizeScale,
        setFontSizeScale,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        safetyModalOpen,
        setSafetyModalOpen,
        toastMessage,
        showToast,
        loginWithCredentials,
        registerUser,
        logout,
        updateProfile,
        toggleFavorite,
        sendMessage,
        blockUser,
        reportUser,
        stories: INITIAL_STORIES,
        safetyTips: SAFETY_TIPS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
