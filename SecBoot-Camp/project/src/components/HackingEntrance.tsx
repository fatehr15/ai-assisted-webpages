import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const terminalLines = [
  'Initiating SecBootCamp Access...',
  'Loading Cybersecurity Modules...',
  'Establishing Secure Connection...',
  'Access Granted ✅'
];

const HackingEntrance = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < terminalLines.length - 1) {
        setCurrentLine(prev => prev + 1);
        playClick();
      } else {
        setIsComplete(true);
        playSuccess();
        setTimeout(() => onComplete(), 1000);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete, playClick, playSuccess]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-blue-zodiac z-50 flex items-center justify-center"
        >
          <div className="font-mono text-golden-dream text-lg md:text-xl space-y-4">
            {terminalLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2"
              >
                <span className="text-hippie-blue">{'>'}</span>
                <span className="typing-effect">{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HackingEntrance;