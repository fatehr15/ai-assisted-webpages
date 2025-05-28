import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Clock, Users, Code, ArrowRight, Shield, Trophy, 
  Terminal, Network, Brain, Award, ChevronDown,
  Calendar, ClipboardList, Wrench, Crown, Star,
  ArrowUpRight, CheckCircle2
} from 'lucide-react';
import Countdown from 'react-countdown';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from '../components/AnimatedBackground';
import { useSoundContext } from '../components/SoundContext';

const eventDate = new Date('2025-05-01T15:00:00');

const CountdownRenderer = ({ days, hours, minutes, seconds }: any) => (
  <div className="grid grid-cols-4 gap-4 text-center mb-8">
    {[
      { value: days, label: 'Days' },
      { value: hours, label: 'Hours' },
      { value: minutes, label: 'Minutes' },
      { value: seconds, label: 'Seconds' }
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-blue-zodiac/30 backdrop-blur-sm p-4 rounded-lg border border-hippie-blue/30
                  hover:border-golden-dream/50 transition-all duration-300 group"
      >
        <div className="text-4xl font-bold text-golden-dream glow-text group-hover:scale-110 transition-transform">
          {String(item.value).padStart(2, '0')}
        </div>
        <div className="text-citrine-white">{item.label}</div>
      </motion.div>
    ))}
  </div>
);

const roadmapSteps = [
  {
    icon: Calendar,
    title: "Mark Your Calendar",
    description: "Save the date for SecBootCamp 2025. Three days of intense cybersecurity challenges await.",
    link: "/about"
  },
  {
    icon: ClipboardList,
    title: "Register Your Team",
    description: "Form your elite squad of up to 4 members and secure your spot in the competition.",
    link: "/registration"
  },
  {
    icon: Wrench,
    title: "Prepare for the Challenges",
    description: "Access pre-event resources and sharpen your skills for the upcoming battles.",
    link: "/activities"
  },
  {
    icon: Trophy,
    title: "Compete and Win",
    description: "Face off against the best teams and claim your place among the cyber elite.",
    link: "/leaderboard"
  }
];

const activities = [
  {
    icon: Shield,
    title: 'Hands-on Labs',
    description: 'Practice real-world cybersecurity scenarios in our state-of-the-art virtual labs',
    preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'
  },
  {
    icon: Trophy,
    title: 'CTF Competition',
    description: 'Test your skills in our Capture The Flag challenges with prizes to be won',
    preview: 'https://images.unsplash.com/photo-1569144157591-c60f3f82f137'
  },
  {
    icon: Brain,
    title: 'Expert Workshops',
    description: 'Learn from industry professionals in interactive technical sessions',
    preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
  },
  {
    icon: Network,
    title: 'Networking',
    description: 'Connect with fellow security enthusiasts and potential employers',
    preview: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b'
  }
];

const pastWinners = [
  {
    team: "CyberElite",
    prize: "VIP Access to Future Events",
    achievement: "Best Overall Performance"
  },
  {
    team: "SecureForce",
    prize: "Personalized Cyber Training Session",
    achievement: "Best Defense Strategy"
  },
  {
    team: "CodeWarriors",
    prize: "Special Feature on CIC's Website",
    achievement: "Most Impactful Contribution"
  }
];

const Home = () => {
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalText, setTerminalText] = useState('');
  const [terminalStep, setTerminalStep] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { playHover, playClick, playSuccess } = useSoundContext();

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [roadmapRef, roadmapInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [legendRef, legendInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const terminalLines = [
    'Initializing SecBootCamp systems...',
    'Scanning for potential cyber warriors...',
    'Preparing training modules...',
    'Ready for deployment. Proceed? [Y/N]'
  ];

  useEffect(() => {
    if (showTerminal && terminalStep < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalText(terminalLines[terminalStep]);
        setTerminalStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [terminalStep, showTerminal]);

  const handleTerminalComplete = () => {
    playSuccess();
    setShowTerminal(false);
    setShowContent(true);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-zodiac z-50 flex items-center justify-center"
          >
            <div className="font-mono text-golden-dream text-lg md:text-xl space-y-4 p-8 bg-blue-zodiac/50 rounded-lg border border-hippie-blue/30 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="typing-effect"
              >
                {terminalText}
              </motion.div>
              {terminalStep === terminalLines.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center space-x-4 mt-4"
                >
                  <button
                    onClick={handleTerminalComplete}
                    onMouseEnter={playHover}
                    className="px-6 py-2 bg-golden-dream text-blue-zodiac rounded hover:bg-hippie-blue transition-colors"
                  >
                    [Y] PROCEED
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <>
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
              <AnimatedBackground />
              <div className="absolute inset-0 bg-blue-zodiac/50 backdrop-blur-sm" />

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="float-animation"
                >
                  <img 
                    src="https://i.ibb.co/hFrPTGCv/Sec-Yellow.png" 
                    alt="SecBoot Logo" 
                    className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-golden-dream/30 hover:border-golden-dream transition-all"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold mb-4 text-golden-dream glow-text"
                >
                  SecBootCamp 2025
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-xl md:text-2xl text-citrine-white mb-8"
                >
                  Where Cyber Warriors are Forged
                </motion.p>

                <Countdown date={eventDate} renderer={CountdownRenderer} />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="space-y-4"
                >
                  <Link
                    to="/registration"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-block px-8 py-4 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                             hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                             shadow-[0_0_15px_rgba(240,214,55,0.5)]"
                  >
                    Join the Mission
                  </Link>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-12 text-hippie-blue"
                  >
                    <ChevronDown className="w-8 h-8 mx-auto" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* The Road to Cyber Glory Section */}
            <div ref={roadmapRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-blue-zodiac/70 to-blue-zodiac/20">
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
                  className="text-4xl md:text-6xl font-bold text-golden-dream mb-12 text-center"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-golden-dream to-citrine-white">
                    The Cyber Odyssey
                  </span>
                  <div className="text-xl md:text-2xl text-hippie-blue mt-4 font-normal">
                    Navigate Your Path to Cybersecurity Mastery
                  </div>
                </motion.h2>

                {/* Centered Timeline Container */}
                <div className="relative flex flex-col items-center gap-16 py-12">
                  {roadmapSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={roadmapInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="w-full max-w-2xl"
                    >
                      <div className="bg-blue-zodiac/70 backdrop-blur-lg p-8 rounded-2xl border-2 border-hippie-blue/50 hover:border-golden-dream/80 transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="flex-shrink-0 relative">
                            <step.icon className="w-14 h-14 text-golden-dream transform transition-all hover:scale-110" />
                            <div className="absolute -inset-4 bg-golden-dream/10 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-grow space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="text-golden-dream font-mono text-2xl bg-blue-zodiac/50 px-4 py-2 rounded-lg">
                                PHASE-{String(index + 1).padStart(2, '0')}
                              </div>
                              <h3 className="text-2xl font-bold text-citrine-white">
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-hippie-blue/90 leading-relaxed">
                              {step.description}
                            </p>
                            <Link
                              to={step.link}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-golden-dream/20 rounded-lg hover:bg-golden-dream/30 transition-colors mt-4"
                            >
                              <span className="text-citrine-white">Explore Phase</span>
                              <ArrowUpRight className="w-5 h-5 text-golden-dream" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Centered Scrolling Badges */}
                <div className="relative mt-20 px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={roadmapInView ? { opacity: 1 } : {}}
                    className="flex justify-center overflow-hidden rotate-3"
                  >
                    <div className="animate-scroll-x flex gap-8 w-max">
                      {['ETHICAL HACKING', 'CTF CHALLENGES', 'CYBER WARFARE', 'DATA PROTECTION', 'NETWORK SECURITY'].map((text, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-3 bg-blue-zodiac/50 border border-hippie-blue/30 rounded-full">
                          <Terminal className="w-5 h-5 text-golden-dream" />
                          <span className="text-citrine-white/80 text-lg tracking-wider">{text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Become a Legend Section */}
            <div ref={legendRef} className="py-20 px-4 relative overflow-hidden bg-blue-zodiac/30">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Trophy Animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={legendInView ? { opacity: 1, scale: 1 } : {}}
                    className="relative"
                  >
                    <div className="relative w-64 h-64 mx-auto">
                      <motion.div
                        animate={{ 
                          y: [0, -20, 0],
                          rotateY: [0, 360]
                        }}
                        transition={{ 
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                          rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Trophy className="w-full h-full text-golden-dream" />
                      </motion.div>
                      {/* Holographic Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-golden-dream/20 to-transparent rounded-full blur-xl" />
                      <div className="absolute inset-0 animate-pulse bg-golden-dream/10 rounded-full blur-3xl" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={legendInView ? { opacity: 1, x: 0 } : {}}
                    className="text-center lg:text-left"
                  >
                    <h2 className="text-4xl font-bold text-golden-dream mb-6">
                      Become a Legend
                    </h2>
                    <p className="text-2xl text-citrine-white mb-8">
                      Greatness Awaits. Are You Ready to Make Your Mark?
                    </p>

                    {/* Past Winners Showcase */}
                    <div className="mb-8 space-y-4">
                      {pastWinners.map((winner, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 30 }}
                          animate={legendInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 }}
                          className="bg-blue-zodiac/50 p-4 rounded-lg border border-hippie-blue/30
                                   hover:border-golden-dream/50 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-grow">
                              <h4 className="text-xl font-semibold text-citrine-white group-hover:text-golden-dream">
                                {winner.team}
                              </h4>
                              <p className="text-golden-dream">{winner.prize}</p>
                              <p className="text-hippie-blue text-sm">{winner.achievement}</p>
                            </div>
                            <Trophy className="w-8 h-8 text-golden-dream opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      to="/registration"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="inline-flex items-center px-8 py-4 bg-golden-dream text-blue-zodiac rounded-lg 
                               font-semibold hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                               shadow-[0_0_15px_rgba(240,214,55,0.5)]"
                    >
                      <Crown className="w-6 h-6 mr-2" />
                      Join the Challenge
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div ref={ref} className="py-20 px-4 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  className="text-3xl font-bold text-golden-dream mb-12 text-center"
                >
                  What Awaits You
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.2 }}
                      onMouseEnter={playHover}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={activity.preview}
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-blue-zodiac/80 backdrop-blur-sm" />
                      </div>

                      <div className="relative p-6 h-full flex flex-col">
                        <activity.icon className="w-12 h-12 text-golden-dream mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold mb-2 text-citrine-white group-hover:text-golden-dream transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-hippie-blue flex-grow">{activity.description}</p>
                        <ArrowRight className="w-5 h-5 text-golden-dream mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 relative overflow-hidden">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  className="bg-blue-zodiac/30 backdrop-blur-sm p-8 rounded-lg border border-hippie-blue/30"
                >
                  <h2 className="text-3xl font-bold text-golden-dream mb-4">
                    Ready to Begin Your Journey?
                  </h2>
                  <p className="text-hippie-blue mb-8">
                    Join us for three days of intensive cybersecurity training, challenges, and networking
                    opportunities. Limited spots available!
                  </p>
                  <Link
                    to="/registration"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-block px-8 py-4 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                             hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                             shadow-[0_0_15px_rgba(240,214,55,0.5)]"
                  >
                    Secure Your Spot Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;