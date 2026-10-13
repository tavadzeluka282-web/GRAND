import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member } from '../types';
import {
  Send,
  User,
  MapPin,
  Clock,
  Sparkles,
  Lock,
  MessageCircle,
  CheckCheck
} from 'lucide-react';
import { MemberAvatar } from './MemberAvatar';

export const MessagesPage: React.FC = () => {
  const {
    currentUser,
    members,
    messages,
    sendMessage,
    setSelectedMember,
    openAuthModal
  } = useApp();

  // Pick default conversation partner
  const [activePartnerId, setActivePartnerId] = useState<string>(() => {
    return members.length > 0 ? members[0].id : '';
  });
  const [inputText, setInputText] = useState('');

  if (!currentUser) {
    return (
      <div className="py-20 bg-[#FFF8EF] min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#EADBCE] shadow-md max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-[#FAF2E8] border border-[#EADBCE] flex items-center justify-center mx-auto mb-5 text-[#8C6D2B]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#45352F] mb-2">
            საჭიროა ავტორიზაცია
          </h2>
          <p className="text-sm text-[#7A6258] mb-6 leading-relaxed">
            შეტყობინებების გასაგზავნად და მისაღებად გთხოვთ გაიაროთ რეგისტრაცია ან შეხვიდეთ სისტემაში. Google ანგარიში არ არის საჭირო!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3 rounded-xl bg-white border border-[#EADBCE] font-bold text-sm text-[#45352F] hover:bg-[#FAF2E8]"
            >
              სისტემაში შესვლა
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full py-3 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md"
            >
              ახალი ანგარიშის შექმნა
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activePartner = members.find((m) => m.id === activePartnerId) || members[0];
  const myId = currentUser.id;

  // Filter messages for current partner
  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === myId && m.receiverId === activePartner?.id) ||
      (m.senderId === 'me' && m.receiverId === activePartner?.id) ||
      (m.senderId === activePartner?.id && (m.receiverId === myId || m.receiverId === 'me'))
  );

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activePartner) return;
    sendMessage(activePartner.id, inputText);
    setInputText('');
  };

  const handleQuickGreeting = (phrase: string) => {
    if (!activePartner) return;
    sendMessage(activePartner.id, phrase);
  };

  return (
    <div className="py-8 bg-[#FFF8EF] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
          {/* Left contacts sidebar */}
          <div className="md:col-span-4 border-r border-[#EADBCE] bg-[#FAF3E8]/50 flex flex-col">
            <div className="p-4 border-b border-[#EADBCE] bg-white">
              <h2 className="font-serif font-bold text-lg text-[#45352F] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#B5853B]" />
                <span>საუბრები</span>
              </h2>
              <p className="text-xs text-[#8C766B] mt-0.5">აირჩიეთ მოსაუბრე სასაუბროდ</p>
            </div>

            <div className="overflow-y-auto max-h-[600px] divide-y divide-[#F0E6D8]">
              {members.slice(0, 15).map((member) => {
                const isSelected = activePartner?.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActivePartnerId(member.id)}
                    className={`w-full p-4 flex items-center gap-3.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-[#EADBCE]/60 font-semibold'
                        : 'hover:bg-[#F5ECE0]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <MemberAvatar
                        member={member}
                        size="md"
                        className="w-12 h-12 rounded-full border border-[#EADBCE]"
                      />
                      {member.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[#45352F] truncate">
                          {member.firstName} {member.lastName}
                        </p>
                        <span className="text-[11px] text-[#A0897F]">{member.city}</span>
                      </div>
                      <p className="text-xs text-[#7A6258] truncate mt-0.5">
                        {member.relationshipGoal} • {member.age} წლის
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right chat panel */}
          <div className="md:col-span-8 flex flex-col bg-white">
            {activePartner ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-[#EADBCE] bg-[#FAF3E8]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MemberAvatar
                      member={activePartner}
                      size="md"
                      className="w-11 h-11 rounded-full border border-[#D6AE65]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#45352F]">
                        {activePartner.firstName} {activePartner.lastName}
                      </h3>
                      <p className="text-xs text-[#7A6258] flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#B5853B]" />
                        <span>{activePartner.city}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">ონლაინ</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(activePartner)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EADBCE] text-xs font-bold text-[#8C6D2B] hover:bg-[#FAF2E8] transition-colors"
                  >
                    ანკეტის ნახვა
                  </button>
                </div>

                {/* Senior Friendly Quick Greetings */}
                <div className="px-4 py-2.5 bg-[#FFF8EF] border-b border-[#F0E6D8] flex items-center gap-2 overflow-x-auto">
                  <span className="text-[11px] font-bold text-[#8C766B] shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D6AE65]" />
                    მისალმება:
                  </span>
                  <button
                    onClick={() => handleQuickGreeting('დილა მშვიდობისა! ☕')}
                    className="px-3 py-1 rounded-full bg-white border border-[#EADBCE] text-xs text-[#45352F] hover:bg-[#FAF2E8] shrink-0 font-medium transition-colors"
                  >
                    დილა მშვიდობისა! ☕
                  </button>
                  <button
                    onClick={() => handleQuickGreeting('ძალიან გამიხარდა თქვენი პროფილის ნახვა 🌸')}
                    className="px-3 py-1 rounded-full bg-white border border-[#EADBCE] text-xs text-[#45352F] hover:bg-[#FAF2E8] shrink-0 font-medium transition-colors"
                  >
                    გამიხარდა თქვენი ნახვა 🌸
                  </button>
                  <button
                    onClick={() => handleQuickGreeting('თუ გცალიათ, სიამოვნებით გავისაუბრებდი 🕊️')}
                    className="px-3 py-1 rounded-full bg-white border border-[#EADBCE] text-xs text-[#45352F] hover:bg-[#FAF2E8] shrink-0 font-medium transition-colors"
                  >
                    სიამოვნებით გავისაუბრებდი 🕊️
                  </button>
                </div>

                {/* Message Thread */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px] bg-[#FFFBF7]">
                  {threadMessages.length > 0 ? (
                    threadMessages.map((msg) => {
                      const isMe = msg.senderId === myId || msg.senderId === 'me';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                              isMe
                                ? 'bg-[#D6AE65] text-white rounded-br-xs'
                                : 'bg-white border border-[#EADBCE] text-[#45352F] rounded-bl-xs'
                            }`}
                          >
                            <p>{msg.text}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-[#A0897F] mt-1 px-1">
                            <span>{msg.timestamp}</span>
                            {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#B5853B]" />}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8C766B]">
                      <MessageCircle className="w-12 h-12 text-[#EADBCE] mb-3" />
                      <p className="font-semibold text-sm">საუბარი ჯერ არ დაწყებულა</p>
                      <p className="text-xs mt-1 max-w-xs">
                        გაუგზავნეთ თბილი მისალმება ან დაუსვით შეკითხვა საერთო ინტერესებზე!
                      </p>
                    </div>
                  )}
                </div>

                {/* Message Input form */}
                <form onSubmit={handleSend} className="p-4 border-t border-[#EADBCE] bg-white flex gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`მიწერეთ წერილი ${activePartner.firstName}-ს...`}
                    className="flex-1 py-3 px-4 bg-[#FAF2E8] border border-[#EADBCE] rounded-xl text-sm font-medium text-[#45352F] placeholder-[#9E8B83] focus:outline-none focus:ring-2 focus:ring-[#D6AE65]"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="px-5 py-3 rounded-xl bg-[#D6AE65] hover:bg-[#C59B4F] disabled:opacity-50 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>გაგზავნა</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#8C766B]">
                აირჩიეთ მოსაუბრე
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
