import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Shield, Users, Brain, Award, Target, Network, Code, Globe, Terminal, Cpu, Database, Radio, HardDrive, Flag, Rocket, Zap, CloudLightning as Lightning, Laptop, BookOpen, Trophy, Star, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface CoreValue {
  icon: any;
  title: string;
  description: string;
}

interface ImpactStat {
  value: number;
  label: string;
  icon: any;
  prefix?: string;
  suffix?: string;
}

interface EngagementOption {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  link: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Brain,
    title: 'Education',
    description: 'Empowering students with cutting-edge cybersecurity knowledge and practical skills through hands-on learning experiences.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Fostering creative problem-solving and pioneering new approaches to cybersecurity challenges.'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Building a safer digital future through ethical hacking and defensive security practices.'
  }
];

const impactStats: ImpactStat[] = [
  {
    value: 50,
    label: 'Active Members',
    icon: Users,
    prefix: '+'
  },
  {
    value: 10,
    label: 'Expert Mentors',
    icon: Brain,
    prefix: '>'
  },
  {
    value: 50 ,
    label: 'Games and Challenges',
    icon: Flag,
    prefix: '>'
  },
  {
    value: 95,
    label: 'Success Rate',
    icon: Trophy,
    suffix: '%'
  }
];

const engagementOptions: EngagementOption[] = [
  {
    icon: Star,
    title: 'Become a Member',
    description: 'Join our elite community of cyber innovators and access exclusive resources.',
    benefits: [
      'Access to private workshops',
      'Mentorship opportunities',
      'Exclusive events access',
      'Learning resources'
    ],
    cta: 'Apply Now',
    link: '/membership'
  },
  {
    icon: Trophy,
    title: 'Compete & Win',
    description: 'Showcase your skills in our cybersecurity competitions and challenges.',
    benefits: [
      'Regular CTF events',
      'Real-world scenarios',
      'Valuable prizes',
      'Industry recognition'
    ],
    cta: 'View Competitions',
    link: '/competitions'
  },
  {
    icon: Rocket,
    title: 'Learn & Grow',
    description: 'Accelerate your cybersecurity career through our comprehensive programs.',
    benefits: [
      'Structured learning paths',
      'Hands-on labs',
      'Industry certifications',
      'Career guidance'
    ],
    cta: 'Start Learning',
    link: '/learning'
  }
];

const CyberInnovatorsClub = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [expandedOption, setExpandedOption] = useState<number | null>(null);

  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [engageRef, engageInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-blue-zodiac/50 backdrop-blur-sm" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center">
  <img 
    src="https://i.ibb.co/JFMNDbpV/CIC-yellow.png" 
    alt="CIC-yellow" 
    style={{ 
      width: '200px',  // Adjust this value for size
      height: 'auto',
      maxWidth: '100%' 
    }}
  />
</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-golden-dream glow-text"
          >
            Cyber Innovators Club
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-citrine-white mb-12"
          >
            Powering the Future of Cybersecurity
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              to="/membership"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-block px-8 py-4 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                       hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                       shadow-[0_0_15px_rgba(240,214,55,0.5)]"
            >
              Join Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Who Are We Section */}
      <div className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-golden-dream mb-6">Who Are We?</h2>
            <p className="text-hippie-blue text-lg max-w-3xl mx-auto">
              The Cyber Innovators Club is the driving force behind SecBootCamp, bringing together passionate
              cybersecurity enthusiasts, industry professionals, and aspiring security experts. Our mission
              is to bridge the gap between theoretical knowledge and practical application in the ever-evolving
              landscape of cybersecurity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => {
                  setHoveredValue(index);
                  playHover();
                }}
                onMouseLeave={() => setHoveredValue(null)}
                className="relative bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30
                         hover:border-golden-dream/50 transition-all duration-300 group"
              >
                <motion.div
                  animate={{
                    scale: hoveredValue === index ? 1.1 : 1,
                    y: hoveredValue === index ? -5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <value.icon className="w-12 h-12 text-golden-dream mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-citrine-white group-hover:text-golden-dream">
                    {value.title}
                  </h3>
                  <p className="text-hippie-blue">{value.description}</p>
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-golden-dream/5 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <div ref={statsRef} className="py-20 px-4 relative overflow-hidden bg-blue-zodiac/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl font-bold text-golden-dream mb-16 text-center"
          >
            Our Impact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-blue-zodiac/50 rounded-lg border border-hippie-blue/30
                         hover:border-golden-dream/50 transition-all duration-300 group"
              >
                <stat.icon className="w-12 h-12 text-golden-dream mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-citrine-white mb-2">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-hippie-blue">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Options Section */}
      <div ref={engageRef} className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={engageInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl font-bold text-golden-dream mb-16 text-center"
          >
            How to Engage
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={engageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className={`bg-blue-zodiac/30 backdrop-blur-sm rounded-lg border border-hippie-blue/30
                         hover:border-golden-dream/50 transition-all duration-300 overflow-hidden
                         ${expandedOption === index ? 'md:col-span-3' : ''}`}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => {
                    setExpandedOption(expandedOption === index ? null : index);
                    playClick();
                  }}
                  onMouseEnter={playHover}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <option.icon className="w-12 h-12 text-golden-dream mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-citrine-white">
                        {option.title}
                      </h3>
                      <p className="text-hippie-blue">{option.description}</p>
                    </div>
                    <ChevronRight
                      className={`w-6 h-6 text-hippie-blue transition-transform ${
                        expandedOption === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedOption === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-hippie-blue/30"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-citrine-white mb-4">Benefits</h4>
                            <ul className="space-y-2">
                              {option.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-center text-hippie-blue">
                                  <Star className="w-4 h-4 text-golden-dream mr-2" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <Link
                              to={option.link}
                              className="inline-block px-6 py-3 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                                       hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                                       shadow-[0_0_15px_rgba(240,214,55,0.5)]"
                            >
                              {option.cta}
                            </Link>
                          </div>
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
            animate={engageInView ? { opacity: 1, y: 0 } : {}}
            className="bg-blue-zodiac/50 backdrop-blur-sm p-8 rounded-lg border border-hippie-blue/30"
          >
            <h2 className="text-3xl font-bold text-golden-dream mb-4">
              Ready to Become a Cyber Innovator?
            </h2>
            <p className="text-hippie-blue mb-8">
              Join our community of cybersecurity enthusiasts and start your journey towards becoming
              a skilled security professional.
            </p>
            <Link
              to="/contact"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-block px-8 py-4 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                       hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                       shadow-[0_0_15px_rgba(240,214,55,0.5)]"
            >
              Become a Cyber Innovator
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CyberInnovatorsClub;