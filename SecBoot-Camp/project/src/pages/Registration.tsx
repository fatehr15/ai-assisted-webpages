import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion, useAnimation } from 'framer-motion';
import {
  Loader2,
  ShieldAlert,
  Lock,
  BadgeCheck,
  Trophy,
} from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const SecBootCampRegistration = () => {
 
  const [showConfetti, setShowConfetti] = useState(true);
  const controls = useAnimation();
  const [width, height] = useWindowSize();

  const iframeUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLScuMAzkqToiX-Y5kQmUjyAKuGHL5yKJ5p81oZRLgFB4KOUnnQ/viewform?embedded=true';

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
  }, [controls]);

  const formSteps = [
    { title: 'Personal Info', icon: <BadgeCheck className="w-5 h-5" /> },
    { title: 'Experience Level', icon: <Trophy className="w-5 h-5" /> },
    { title: 'Security Check', icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-zodiac to-[#1F1D2B] text-hippie-blue overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      <Navbar />

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-12 py-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-8"
        >
          <h1 className="text-5xl font-extrabold text-golden-dream glow-text mb-4">
            SecBootCamp 2025 Registration
          </h1>
          <p className="text-lg text-hippie-blue/80">
            Join us for a three-day immersive cybersecurity adventure, hands-on
            labs, and competitions!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between max-w-md w-full mb-6">
          {formSteps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex-1 flex items-center relative"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-zodiac/40 border-2 border-golden-dream">
                <span className="text-golden-dream">{i + 1}</span>
              </div>
              {i < formSteps.length - 1 && (
                <div className="flex-1 h-1 bg-golden-dream/40 ml-2"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          className="relative w-full max-w-4xl bg-blue-zodiac/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Border Glow */}
          <div className="absolute inset-0 border-4 rounded-2xl border-gradient-animation pointer-events-none"></div>

          {/* Loader Overlay */}
          {loading && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-blue-zodiac/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              >
                <Loader2 className="w-16 h-16 text-golden-dream" />
              </motion.div>
              <p className="mt-4 text-golden-dream font-semibold animate-pulse">
                Securing Registration Environment...
              </p>
            </motion.div>
          )}

          {/* Embedded Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={!loading ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src={iframeUrl}
              className="w-full h-[70vh] rounded-xl"
              onLoad={() => setTimeout(() => setLoading(false), 300)}
              title="SecBootCamp 2025 Form"
            />
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-4 font-medium">Have questions or need help?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-golden-dream text-blue-zodiac px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <ShieldAlert className="w-5 h-5" /> Contact Support
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="py-8 bg-blue-zodiac/40"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-golden-dream" />
            <div>
              <h4 className="font-semibold text-golden-dream">
                256-bit Encryption
              </h4>
              <p className="text-sm">Your data is fully protected</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BadgeCheck className="w-8 h-8 text-golden-dream" />
            <div>
              <h4 className="font-semibold text-golden-dream">
                ISO 27001 Certified
              </h4>
              <p className="text-sm">SecBootCamp Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-golden-dream" />
            <div>
              <h4 className="font-semibold text-golden-dream">
                Early Bird Perks
              </h4>
              <p className="text-sm">Exclusive swag & discounts</p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default SecBootCampRegistration;
