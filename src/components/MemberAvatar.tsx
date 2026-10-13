import React from 'react';
import { Member } from '../types';
import { User, Shield, Lock, Sparkles, Heart } from 'lucide-react';

interface MemberAvatarProps {
  member: Partial<Member>;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'card' | 'hero';
  showPrivacyLabel?: boolean;
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
  member,
  className = '',
  size = 'md',
  showPrivacyLabel = false
}) => {
  const [imageError, setImageError] = React.useState(false);
  const hasPhoto = Boolean(member.photo && !imageError);
  const initial = member.firstName ? member.firstName.charAt(0) : 'G';

  if (hasPhoto && member.photo) {
    return (
      <img
        src={member.photo}
        alt={`${member.firstName || ''} ${member.lastName || ''}`}
        onError={() => setImageError(true)}
        className={`object-cover object-top ${className}`}
      />
    );
  }

  // When there is no photo, render an elegant dignified avatar
  if (size === 'card' || size === 'hero') {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-[#FFF5EA] via-[#F8ECE1] to-[#EBDCCE] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none ${className}`}
      >
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#E8C5C8]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#D6AE65]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Monogram crest */}
        <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 rounded-full bg-white/90 border-2 border-[#D6AE65]/50 shadow-md flex items-center justify-center text-[#8C6D2B]">
            <span className="font-serif font-bold text-4xl text-[#6E4F3A] leading-none">
              {initial}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FAF2E8] border border-[#D6AE65] flex items-center justify-center text-[#B5853B] shadow-xs">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Confidential profile note */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#EADBCE] text-[11px] font-bold text-[#8C6D2B] shadow-xs">
            <Shield className="w-3 h-3 text-[#2E7D32]" />
            <span>კონფიდენციალური ანკეტა</span>
          </span>
          <p className="text-[11px] text-[#A0897F] mt-1.5 font-medium">
            ფოტოსურათი დაცულია
          </p>
        </div>
      </div>
    );
  }

  // Small circle avatars for headers, list items, chats
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-11 h-11 text-lg',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-24 h-24 text-4xl'
  }[size] || 'w-11 h-11 text-lg';

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-[#FAF0E6] to-[#EADBCE] border border-[#D6AE65]/60 flex items-center justify-center font-serif font-bold text-[#6E4F3A] shadow-xs shrink-0 select-none ${sizeClasses} ${className}`}
      title={`${member.firstName || ''} (კონფიდენციალური პროფილი)`}
    >
      <span>{initial}</span>
    </div>
  );
};
