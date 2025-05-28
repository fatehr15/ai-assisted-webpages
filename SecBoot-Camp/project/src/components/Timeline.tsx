import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const milestones = [
  {
    year: '2023',
    title: 'Club Foundation',
    description: 'SecBootCamp was established with a vision to nurture cybersecurity talent.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'
  },
  {
    year: '2024',
    title: 'First Bootcamp',
    description: 'Successfully trained 100+ students in cybersecurity fundamentals.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f'
  },
  {
    year: '2025',
    title: 'Industry Partnership',
    description: 'Partnered with leading cybersecurity firms for mentorship programs.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
  }
];

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="py-12 overflow-x-hidden">
      <div className="relative">
        <div className="absolute left-0 right-0 h-1 top-1/2 bg-hippie-blue/30" />
        
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute w-4 h-4 bg-golden-dream rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            shadow-[0_0_15px_rgba(240,214,55,0.5)] group-hover:scale-150 transition-all duration-300" />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-64 bg-blue-zodiac/90 p-4 rounded-lg border border-hippie-blue/30
                         transform -translate-y-full mb-8 backdrop-blur-sm
                         hover:border-golden-dream/50 transition-all duration-300"
              >
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <div className="text-golden-dream font-bold text-xl mb-2">{milestone.year}</div>
                <h3 className="text-citrine-white font-semibold mb-2">{milestone.title}</h3>
                <p className="text-hippie-blue text-sm">{milestone.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;