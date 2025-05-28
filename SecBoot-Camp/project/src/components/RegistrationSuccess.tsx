import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


interface RegistrationSuccessProps {
  teamName?: string;
  isTeam: boolean;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ teamName, isTeam }) => {

  
  useEffect(() => {
    playSuccess();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blue-zodiac/90 backdrop-blur-md">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        colors={['#F0D637', '#5B88B2', '#FBF9E3']}
        recycle={false}
        numberOfPieces={200}
      />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-blue-zodiac/80 p-8 rounded-lg border border-golden-dream/50 text-center max-w-lg mx-4"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <Trophy className="w-16 h-16 text-golden-dream mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-golden-dream mb-4"
        >
          🎉 Registration Successful!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-hippie-blue mb-6"
        >
          {isTeam
            ? `Team "${teamName}" is now ready for the ultimate challenge!`
            : "You're now ready for the ultimate challenge!"}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <button
            onClick={() => {
              // Share registration
              const text = isTeam
                ? `Just registered Team "${teamName}" for SecBootCamp 2025! Ready to dominate! 🚀`
                : "Just registered for SecBootCamp 2025! Ready to hack! 🚀";
              
              if (navigator.share) {
                navigator.share({
                  title: 'SecBootCamp Registration',
                  text: text,
                  url: window.location.origin
                });
              }
            }}
            className="w-full px-6 py-3 bg-hippie-blue/20 text-hippie-blue rounded-lg 
                     hover:bg-hippie-blue/30 transition-all duration-300 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share the News
          </button>

          <Link
            to="/dashboard"
            className="w-full px-6 py-3 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                     hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                     shadow-[0_0_15px_rgba(240,214,55,0.5)] flex items-center justify-center"
          >
            View Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-sm text-hippie-blue"
        >
          Check your email for your digital ticket and event details!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;