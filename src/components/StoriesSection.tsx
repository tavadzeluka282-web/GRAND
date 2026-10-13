import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, Quote, ArrowRight } from 'lucide-react';
import { Story } from '../types';

export const StoriesSection: React.FC = () => {
  const { stories, setSelectedStory } = useApp();

  return (
    <section className="py-16 bg-[#FAF2E8] border-y border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCE] text-xs font-semibold text-[#8C6D2B] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#A43838] text-[#A43838]" />
            <span>რეალური გამოცდილება</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#45352F] tracking-tight">
            სიყვარულის ისტორიები GoldAge-ზე
          </h2>
          <p className="mt-3 text-base text-[#7A6258]">
            სიყვარულს ასაკი არ აქვს. გაიცანით ჩვენი წყვილები, რომლებმაც ცხოვრების თანამგზავრი აქ იპოვეს.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story: Story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Photo Frame */}
              <div className="relative h-60 overflow-hidden bg-[#FAF2E8]">
                <img
                  src={story.image}
                  alt={story.names}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold">{story.names}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/90 font-medium mt-0.5">
                    <span>{story.ages}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E2B96F]" />
                      {story.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Excerpt & Quote */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#8C6D2B] bg-[#FFF8EF] px-3 py-1 rounded-full border border-[#EADBCE] inline-flex">
                    <Heart className="w-3 h-3 fill-current text-[#A43838]" />
                    <span>{story.yearsTogether}</span>
                  </div>

                  <p className="text-sm text-[#6E594F] leading-relaxed line-clamp-3">
                    {story.story}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-[#FFF8EF] border border-[#F0E6D8] relative">
                    <Quote className="w-4 h-4 text-[#D6AE65] mb-1 opacity-70" />
                    <p className="font-serif italic text-xs text-[#5A453D] leading-snug">
                      {story.quote}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs font-bold text-[#8C6D2B] group-hover:text-[#45352F] transition-colors">
                  <span>სრული ისტორიის ნახვა</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
