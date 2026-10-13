export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: string;
  age: number;
  gender: 'ქალი' | 'მამაკაცი' | string;
  country: string;
  city: string;
  region?: string;
  photo: string;
  gallery?: string[];
  bio: string;
  interests: string[];
  relationshipGoal: string;
  preferredAgeMin?: number;
  preferredAgeMax?: number;
  preferredLocation?: string;
  languages?: string[];
  lifestyle?: string;
  familyStatus?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastActive?: string;
  memberSince?: string;
  password?: string;
}

export interface Story {
  id: string;
  names: string;
  ages: string;
  location: string;
  yearsTogether: string;
  image: string;
  story: string;
  quote: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  summary: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface FilterState {
  gender: string;
  city: string;
  minAge: number;
  maxAge: number;
  relationshipGoal: string;
  onlyVerified: boolean;
  onlyOnline: boolean;
  searchQuery: string;
}

export type TabType = 'home' | 'members' | 'favorites' | 'messages' | 'stories' | 'profile';
export type FontSizeScale = 'normal' | 'large' | 'extra-large';
