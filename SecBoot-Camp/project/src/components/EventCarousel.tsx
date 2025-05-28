import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';


interface Event {
  title: string;
  date: string;
  description: string;
  isHighlighted?: boolean;
}

interface EventCarouselProps {
  events: Event[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    playClick();
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    playClick();
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          onMouseEnter={playHover}
          className="p-2 rounded-full bg-blue-zodiac/50 text-hippie-blue hover:text-golden-dream
                   hover:bg-blue-zodiac/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 overflow-hidden mx-4">
          <div className="relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="absolute inset-0"
              >
                <div
                  className={`h-full p-6 rounded-lg ${
                    events[currentIndex].isHighlighted
                      ? 'bg-golden-dream/20 border-2 border-golden-dream'
                      : 'bg-blue-zodiac/30 border border-hippie-blue/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-citrine-white">
                        {events[currentIndex].title}
                      </h3>
                      <div className="flex items-center text-hippie-blue mt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{events[currentIndex].date}</span>
                      </div>
                    </div>
                    {events[currentIndex].isHighlighted && (
                      <div className="px-3 py-1 bg-golden-dream/30 rounded-full text-golden-dream text-sm">
                        Featured Event
                      </div>
                    )}
                  </div>
                  <p className="text-hippie-blue">{events[currentIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={nextSlide}
          onMouseEnter={playHover}
          className="p-2 rounded-full bg-blue-zodiac/50 text-hippie-blue hover:text-golden-dream
                   hover:bg-blue-zodiac/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-golden-dream w-6'
                : 'bg-hippie-blue/30 hover:bg-hippie-blue/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;