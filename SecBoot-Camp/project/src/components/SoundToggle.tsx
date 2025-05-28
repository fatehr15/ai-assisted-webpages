import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from './SoundContext';
import { motion } from 'framer-motion';

const SoundToggle = () => {
  const { isMuted, toggleMute, playClick, playHover } = useSoundContext();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        toggleMute();
        playClick();
      }}
      onMouseEnter={playHover}
      className="fixed top-24 right-4 p-3 bg-blue-zodiac/50 backdrop-blur-sm rounded-full 
                 hover:bg-golden-dream/20 transition-all duration-300 z-50
                 border border-hippie-blue/30 hover:border-golden-dream"
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-hippie-blue" />
      ) : (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Volume2 className="w-6 h-6 text-golden-dream" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default SoundToggle;