import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Hexagonal Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0l8.485 8.485-1.414 1.414-7.9-7.9h.828zm-9.9 0l7.9 7.9-1.415 1.415-7.9-7.9h1.414zm6.486 0l7.9 7.9-1.414 1.415-7.9-7.9h1.414zM34.97 0l7.9 7.9-1.414 1.415-7.9-7.9h1.414zm-1.414 0L41.9 8.485 40.485 9.9l-7.9-7.9h.97zm-5.657 0l7.9 7.9-1.415 1.415-7.9-7.9h1.414zm-2.83 0l7.9 7.9-1.414 1.415-7.9-7.9h1.414zm-2.828 0l7.9 7.9-1.414 1.415-7.9-7.9h1.414z' fill='%235B88B2' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5
        }}
      />

      {/* Glowing Lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-transparent via-golden-dream/20 to-transparent h-px w-full"
          style={{
            top: `${i * 10}%`,
            left: '-100%'
          }}
          animate={{
            x: ['0%', '200%']
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.2
          }}
        />
      ))}

      {/* Digital Sparks */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-golden-dream rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Glitch Effect */}
      <motion.div
        className="absolute inset-0 bg-hippie-blue/5"
        animate={{
          opacity: [0, 0.1, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3
        }}
      />
    </div>
  );
};

export default AnimatedBackground;