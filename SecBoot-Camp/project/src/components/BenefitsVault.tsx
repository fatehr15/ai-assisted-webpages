import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Brain, 
  Award, 
  Target, 
  Network,
  Lock,
  Unlock,
  Terminal
} from 'lucide-react';


const benefits = [
  {
    icon: Shield,
    title: 'Hands-on Training',
    description: 'Practical experience with real-world cybersecurity tools and techniques',
    color: 'from-blue-500/20 to-blue-500/10'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Direct guidance from industry professionals and seasoned experts',
    color: 'from-green-500/20 to-green-500/10'
  },
  {
    icon: Brain,
    title: 'Skill Development',
    description: 'Build essential cybersecurity skills through intensive workshops',
    color: 'from-purple-500/20 to-purple-500/10'
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Earn a recognized certificate upon successful completion',
    color: 'from-red-500/20 to-red-500/10'
  },
  {
    icon: Target,
    title: 'Career Opportunities',
    description: 'Connect with potential employers and industry leaders',
    color: 'from-yellow-500/20 to-yellow-500/10'
  },
  {
    icon: Network,
    title: 'Industry Network',
    description: 'Build relationships with fellow security enthusiasts and professionals',
    color: 'from-teal-500/20 to-teal-500/10'
  }
];

const BenefitsVault = () => {
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const handleUnlock = () => {
    if (unlockedCount < benefits.length && !isUnlocking) {
      setIsUnlocking(true);
      playUnlock();
      setTimeout(() => {
        setUnlockedCount(prev => prev + 1);
        setIsUnlocking(false);
      }, 1000);
    }
  };

  const progressPercentage = (unlockedCount / benefits.length) * 100;

  return (
    <div className="relative">
      {/* Digital Vault Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-3 bg-blue-zodiac/30 px-6 py-3 rounded-lg border border-hippie-blue/30"
        >
          <Terminal className="w-6 h-6 text-golden-dream" />
          <span className="text-xl font-semibold text-citrine-white">Digital Skills Vault</span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-hippie-blue mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}% Unlocked</span>
        </div>
        <div className="h-2 bg-blue-zodiac/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-golden-dream"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Unlock Button */}
      <motion.button
        onClick={handleUnlock}
        onMouseEnter={playHover}
        disabled={unlockedCount >= benefits.length || isUnlocking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full mb-8 px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3
                   transition-all duration-300 ${
                     unlockedCount >= benefits.length
                       ? 'bg-hippie-blue text-citrine-white'
                       : 'bg-golden-dream text-blue-zodiac hover:bg-hippie-blue hover:text-citrine-white'
                   } shadow-lg hover:shadow-golden-dream/50`}
      >
        {unlockedCount >= benefits.length ? (
          <>
            <Unlock className="w-6 h-6" />
            <span>All Skills Unlocked!</span>
          </>
        ) : (
          <>
            <Lock className="w-6 h-6" />
            <span>Unlock Next Skill</span>
          </>
        )}
      </motion.button>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <AnimatePresence key={index}>
            {index < unlockedCount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{ duration: 0.5, type: "spring" }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  playHover();
                }}
                onMouseLeave={() => setActiveIndex(null)}
                className={`relative bg-gradient-to-br ${benefit.color} backdrop-blur-sm p-6 rounded-lg 
                          border border-hippie-blue/30 hover:border-golden-dream/50 
                          transition-all duration-300 group cursor-pointer
                          transform hover:scale-105`}
              >
                <motion.div
                  animate={{
                    scale: activeIndex === index ? 1.1 : 1,
                    y: activeIndex === index ? -5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <benefit.icon className="w-12 h-12 text-golden-dream mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-citrine-white group-hover:text-golden-dream">
                    {benefit.title}
                  </h3>
                  <p className="text-hippie-blue group-hover:text-citrine-white">
                    {benefit.description}
                  </p>
                </motion.div>

                {/* Glowing Effect */}
                <div className="absolute inset-0 rounded-lg bg-golden-dream/5 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Final Message */}
      {unlockedCount === benefits.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-golden-dream text-xl font-semibold">
            Congratulations! You've unlocked the path to a secure future in cybersecurity at SecBootCamp!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BenefitsVault;