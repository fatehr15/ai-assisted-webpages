import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { TypeAnimation } from 'react-type-animation';
import { 
  Shield, Users, Brain, Award, Target, Network, Lock, Unlock,
  Terminal, FileText, Code, Globe, ChevronDown, ChevronUp,
  Cpu, Database, Radio, HardDrive, Flag, Rocket, Zap, Star,
  BookOpen, Laptop, MessageCircle, Heart, Calendar, Clock
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';




const eventDays = [
  {
    day: 'Day 1',
    title: 'Awareness & Fundamentals',
    icon: Brain,
    sessions: [
      { time: '17:00', title: 'Opening Ceremony' },
      { time: '18:00', title: 'Cybersecurity Overview' },
      { time: '19:10', title: 'Awareness Talk' },
      { time: '21:20', title: 'Cryptography' }
    ]
  },
  {
    day: 'Day 2',
    title: 'Workshops & Labs',
    icon: Laptop,
    sessions: [
      { time: '07:00', title: 'Metorship and business' }, 
      { time: '14:30', title: 'Reverse Engeneering' },
      { time: '17:00', title: 'Hardware Security' },
      { time: '20:40', title: 'Network Security' },
      { time: '23:00', title: 'Lab Sessions' }
    ]
  },
  {
  day: 'Day 3',
  icon: Flag,
  title: 'Challenges & Competitions',
  sessions: [
    { time: '07:00', title: 'Web' },
    { time: '10:30', title: 'Penetration Testing' },
    { time: '13:00', title: 'PWN' },
    { time: '14:30', title: 'Digital Forensics' },
    { time: '15:30', title: 'Mini CTF Competition' },
    { time: '18:30', title: 'Closing Ceremony ' },
  ],
}
];

const highlights = [
  {
    title: 'Expert-Led Workshops',
    description: 'Learn from industry professionals with years of experience in cybersecurity.',
    icon: Brain
  },
  {
    title: 'Hands-On Labs',
    description: 'Practice in real-world scenarios using industry-standard tools and techniques.',
    icon: Laptop
  },
  {
    title: 'CTF Competitions',
    description: 'Test your skills in exciting capture-the-flag challenges with valuable prizes.',
    icon: Flag
  },
  {
    title: 'Networking',
    description: 'Connect with fellow security enthusiasts and potential employers.',
    icon: Network
  }
];

const About = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { playHover, playClick } = useSoundContext();
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [highlightsRef, highlightsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [scheduleRef, scheduleInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen">
      {/* New Flexible Hero Section */}
      <div ref={heroRef} className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-zodiac to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-hippie-blue rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-golden-dream rounded-full filter blur-3xl opacity-20"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <img 
              src="https://i.ibb.co/hFrPTGCv/Sec-Yellow.png" 
              alt="SecBoot Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 transition-all duration-300 hover:scale-110"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-golden-dream to-yellow-200"
          >
            <TypeAnimation
              sequence={[
                'SecBootCamp',
                2000,
                'Learn Security',
                2000,
                'Build Skills',
                2000,
                'Secure Tomorrow',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl text-citrine-white mb-12 max-w-3xl mx-auto"
          >
            Pioneering Cybersecurity Excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/registration"
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-golden-dream to-yellow-500 text-blue-zodiac font-semibold rounded-lg
                       hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl shadow-yellow-500/30"
            >
              Join the Mission
            </Link>
            <Link
              to="/about"
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-golden-dream text-golden-dream font-semibold rounded-lg
                       hover:bg-golden-dream/10 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-golden-dream cursor-pointer"
          onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>

{/* Vision Section */}
<div id="vision" ref={visionRef} className="py-20 px-4 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={visionInView ? { opacity: 1, x: 0 } : {}}
        className="relative flex justify-center items-center"
      >
        <Tilt
          className="w-full h-96 bg-blue-zodiac/30 rounded-lg border border-hippie-blue/30 
                    backdrop-blur-sm overflow-hidden flex items-center justify-center"
          options={{
            max: 25,
            scale: 1.05,
            speed: 1000
          }}
        >
          {/* Centered Image - Fixed closing div */}
          <div className="flex flex-col items-center justify-center h-full">
            <img 
              src="https://i.ibb.co/JFMNDbpV/CIC-yellow.png" 
              alt="CIC Logo"
              className="w-auto h-40 md:h-56 object-contain animate-pulse"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-golden-dream/20 to-transparent" />
        </Tilt>
      </motion.div>
      
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
            >
              <h2 className="text-4xl font-bold text-golden-dream mb-6">Our Vision</h2>
              <p className="text-hippie-blue text-lg mb-8">
                SecBootCamp is more than just an event. It's a hands-on, high-impact experience 
                designed to immerse participants in the world of cybersecurity, fostering skills 
                that matter in real-world scenarios.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Hands-on learning in real-world scenarios" },
                  { icon: Brain, text: "Expert mentorship from professionals" },
                  { icon: Target, text: "Practical skills that employers value" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={visionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-golden-dream/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-golden-dream" />
                    </div>
                    <span className="text-citrine-white">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div ref={highlightsRef} className="py-20 px-4 relative overflow-hidden bg-blue-zodiac/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-golden-dream mb-12 text-center"
          >
            Event Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-blue-zodiac/50 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30
                         hover:border-golden-dream/50 transition-all duration-300 group"
              >
                <highlight.icon className="w-12 h-12 text-golden-dream mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2 text-citrine-white group-hover:text-golden-dream">
                  {highlight.title}
                </h3>
                <p className="text-hippie-blue">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div ref={scheduleRef} className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={scheduleInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-golden-dream mb-12 text-center"
          >
            Event Schedule
          </motion.h2>

          <div className="space-y-6">
            {eventDays.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-blue-zodiac/30 backdrop-blur-sm rounded-lg border border-hippie-blue/30
                         hover:border-golden-dream/50 transition-all duration-300"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => {
                    setSelectedDay(selectedDay === index ? null : index);
                    playClick();
                  }}
                  onMouseEnter={playHover}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <day.icon className="w-8 h-8 text-golden-dream" />
                      <div>
                        <h3 className="text-xl font-semibold text-citrine-white">{day.day}</h3>
                        <p className="text-hippie-blue">{day.title}</p>
                      </div>
                    </div>
                    {selectedDay === index ? (
                      <ChevronUp className="w-6 h-6 text-hippie-blue" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-hippie-blue" />
                    )}
                  </div>

                  <AnimatePresence>
                    {selectedDay === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-hippie-blue/30"
                      >
                        <div className="space-y-4">
                          {day.sessions.map((session, sessionIndex) => (
                            <div
                              key={sessionIndex}
                              className="flex items-center space-x-4 text-hippie-blue"
                            >
                              <Clock className="w-5 h-5 text-golden-dream" />
                              <span className="font-mono">{session.time}</span>
                              <span>{session.title}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className="py-20 px-4 relative overflow-hidden bg-blue-zodiac/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={scheduleInView ? { opacity: 1, y: 0 } : {}}
            className="bg-blue-zodiac/50 backdrop-blur-sm p-8 rounded-lg border border-hippie-blue/30"
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
    </div>
  );
};

export default About;