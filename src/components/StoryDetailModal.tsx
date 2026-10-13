import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, MapPin, Quote, Sparkles } from 'lucide-react';

export const StoryDetailModal: React.FC = () => {
  const { selectedStory, setSelectedStory, setActiveTab } = useApp();

  if (!selectedStory) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#EADBCE] my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-72 bg-[#FAF2E8]">
          <img
            src={selectedStory.image}
            alt={selectedStory.names}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={() => setSelectedStory(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AE65]/90 text-white text-xs font-bold mb-2">
              <Heart className="w-3.5 h-3.5 fill-current" />
              {selectedStory.yearsTogether}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">{selectedStory.names}</h2>
            <p className="text-xs text-white/90 font-medium flex items-center gap-2 mt-1">
              <span>{selectedStory.ages}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E2B96F]" />
                {selectedStory.location}
              </span>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#8C6D2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>როგორ დაიწყო მათი ისტორია</span>
            </h3>
            <p className="text-sm sm:text-base text-[#45352F] leading-relaxed">
              {selectedStory.story}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] relative">
            <Quote className="w-6 h-6 text-[#D6AE65] mb-2 opacity-60" />
            <p className="font-serif italic text-sm sm:text-base text-[#45352F] leading-relaxed">
              {selectedStory.quote}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-[#EADBCE] bg-[#FAF2E8]/30 flex justify-end">
          <button
            onClick={() => {
              setSelectedStory(null);
              setActiveTab('members');
            }}
            className="px-6 py-3 rounded-2xl bg-[#D6AE65] hover:bg-[#C59B4F] text-white font-bold text-sm shadow-md transition-colors"
          >
            თქვენც იპოვეთ თქვენი თანამოაზრე
          </button>
        </div>
      </div>
    </div>
  );
};
