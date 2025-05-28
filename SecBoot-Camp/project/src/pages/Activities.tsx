import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Coffee, Brain, Trophy, Users, Code, Server, Shield, 
  Terminal, Cpu, Network, Globe, Bug, Search, Award, Filter,
  ChevronDown, ChevronUp, Star, MessageCircle, ExternalLink,
  Coffee as CoffeeIcon, BookOpen, Laptop, Gamepad, Sunrise,
  Wrench, Lock, Radio, HardDrive, Database, Flag
} from 'lucide-react';

interface Activity {
  time: string;
  title: string;
  type: 'workshop' | 'break' | 'networking' | 'challenge' | 'ceremony' | 'lab';
  icon: any;
  description?: string;
  speaker?: {
    name: string;
    role: string;
    company: string;
    image: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    }
  };
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  requirements?: string[];
  resources?: { title: string; url: string }[];
}

interface Filter {
  type: string[];
  difficulty: string[];
  search: string;
}

const days = [
  {
    title: 'Day 1: Thursday - Introduction & Fundamentals',
    activities: [
      {
        time: '16:00 - 17:00',
        title: 'Check-in & Networking',
        type: 'networking',
        icon: Users,
        description: 'Meet fellow participants and get to know your potential teammates.',
        difficulty: 'beginner'
      },
      {
        time: '17:00 - 18:00',
        title: 'Opening Ceremony',
        type: 'ceremony',
        icon: Award,
        description: 'Welcome address and introduction to SecBootCamp 2025.',
        
        speaker: {
          name: 'Hassani Fateh',
          role: 'Event Manager',
          company: 'SecBootCamp',
          image:"https://i.ibb.co/B2m455J5/t-l-charg-2.jpg" 
        },
        difficulty: 'beginner'
      },
      {
        time: '18:00 - 19:00',
        title: 'Overview About Cybersecurity',
        type: 'workshop',
        icon: Shield,
        description: 'Introduction to key cybersecurity concepts and current industry trends.',
        speaker: {
          name: 'Raid Kahlrass',
          role: 'CIC vice president',
          company: 'SecBootCamp',
          image:"https://i.ibb.co/B2m455J5/t-l-charg-2.jpg" 
        },
        difficulty: 'beginner'
      },
      {
        time: '19:00 - 19:10',
        title: 'Short Break',
        type: 'break',
        icon: CoffeeIcon,
        description: 'Quick refreshment break',
        
      },
      {
        time: '19:10 - 20:10',
        title: 'Awareness Talk and Demo',
        type: 'workshop',
        icon: Brain,
        description: 'Practical demonstration of cybersecurity awareness concepts',
        speaker: {
          name: 'Gheribi Abdenour',
          role: 'NSCS Student',
          company: 'SecBootCamp',
          image:"https://i.ibb.co/B2m455J5/t-l-charg-2.jpg" 
        },
        difficulty: 'beginner'
      },
      {
        time: '20:10 - 20:20',
        title: 'Short Break',
        type: 'break',
        icon: CoffeeIcon,
        description: 'Quick refreshment break',
        
      },
      {
        time: '20:20 - 21:20',
        title: 'Cryptography',
        type: 'workshop',
        icon: Lock,
        description: 'Introduction to cryptographic concepts and techniques',
        speaker: {
          name: 'Hamza Moufek',
          role: 'Cryptography Expert - NSCS Lecturer',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/Fk4N1vbX/citations.jpg'
        },
        difficulty: 'intermediate'
      },
      {
        time: '21:20 - 22:20',
        title: 'Dinner Break',
        type: 'break',
        icon: CoffeeIcon,
        description: 'Dinner and networking opportunity',
       
      },
      {
        time: '22:20 - 00:00',
        title: 'Cryptography Challenges',
        type: 'lab',
        icon: Terminal,
        description: 'Hands-on cryptography exercises and challenges',
        speaker: {
          name: 'Fatah Asma',
          role: 'NHSM Student',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/B2zyBG58/1709971314668-1.jpg'
        },
        difficulty: 'intermediate'
      },
      {
        time: '00:00 - 02:00',
        title: 'Cybersecurity Games & Networking',
        type: 'networking',
        icon: Gamepad,
        description: 'Interactive security games and social networking',
        
      }
    ]
  },
  {
    title: 'Day 2: Friday - Technical Workshops & Business',
    activities: [
      {
        time: '02:30 - 06:00',
        title: 'Overnight Cybersecurity Challenges',
        type: 'challenge',
        icon: Terminal,
        description: 'Late-night hacking challenges and exercises',
        
        difficulty: 'advanced'
      },
      {
        time: '06:00 - 07:00',
        title: 'Break',
        type: 'break',
        icon: CoffeeIcon,
        description: 'Rest period',
       
      },
      {
        time: '07:00 - 08:00',
        title: 'Early Breakfast (Sunrise)',
        type: 'break',
        icon: Sunrise,
        description: 'Breakfast and morning networking',
        
      },
      {
        time: '08:00 - 09:00',
        title: 'Mentorship & Business Sessions',
        type: 'workshop',
        icon: Users,
        description: 'Business aspects of cybersecurity and mentorship',
        speaker: {
          name: 'Berghout Yasser',
          role: 'CS PhD specializing in AI/ML and development, passionate about coaching and mentoring ( NSCS )',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/GvDt80VB/1629330717605.jpg'
        },
        difficulty: 'intermediate'
      },
      {
        time: '09:00 - 10:00',
        title: 'Mentorship & Business Sessions',
        type: 'workshop',
        icon: Users,
        description: 'Business aspects of cybersecurity and mentorship',
        speaker: {
          name: 'Walid Sahraoui',
          role: 'Associate Professor with a PhD in Optical Communications and Cybersecurity, driving innovation(NSCS)',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/Gf4sPYf0/1575961607269.jpg'
        },
        difficulty: 'intermediate'
      },
      {
        time: '10:00 - 11:30',
        title: 'Business Competition',
        type: 'challenge',
        icon: Trophy,
        description: 'Business case competition focused on cybersecurity',
        difficulty: 'intermediate'
      },
      {
        time: '14:30 - 15:30',
        title: 'Reverse Engineering',
        type: 'workshop',
        icon: Wrench,
        description: 'Introduction to reverse engineering techniques',
        speaker: {
          name: 'Bentrad Sassi',
          role: 'Ph.D. Software Engineering, Lecturer (MCA), (NSCS)',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/pB044n2w/sassi.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '15:40 - 16:40',
        title: 'Intro to Malware Analysis',
        type: 'workshop',
        icon: Bug,
        description: 'Basic concepts of malware analysis',
        difficulty: 'intermediate'
      },
      {
        time: '17:00 - 19:10',
        title: 'Hardware Security',
        type: 'workshop',
        icon: HardDrive,
        description: 'Comprehensive overview of hardware security',
        speaker: {
          name: 'Abdelkader  Ghellaimi',
          role: 'Cybersecurity enthusiasts and IA student, Top 2% Tryhackme CTF player , Electronics enthusiasts',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/L733V0P/1729663668498.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '20:40 - 22:50',
        title: 'Network Security',
        type: 'workshop',
        icon: Network,
        description: 'Network security fundamentals and advanced concepts',
        speaker: {
          name: 'Djeghlouf Asma',
          role: 'Doctor of Engineering , Network , National Higher School of Cyber security',
          company: 'SecBootCamp',
          image:'https://i.ibb.co/B2m455J5/t-l-charg-2.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '23:00 - 00:00',
        title: 'Lab Session',
        type: 'lab',
        icon: Laptop,
        description: 'Hands-on practice with network and hardware security',
        
        difficulty: 'advanced'
      }
    ]
  },
  {
    title: 'Day 3: Saturday - CTF & Closing',
    activities: [
      {
        time: '03:00 - 05:00',
        title: 'Overnight Cybersecurity Challenges',
        type: 'challenge',
        icon: Terminal,
        description: 'Final night of hacking challenges',
        
        difficulty: 'advanced'
      },
      {
        time: '07:00 - 08:00',
        title: 'Introduction to Web Security',
        type: 'workshop',
        icon: Globe,
        description: 'Web security fundamentals',
        speaker: {
          name: 'Okba Allaoua',
          role: 'Computer Systems Engineering graduate from ESI ',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/hJs1LLtn/1739921132565.jpg'
        },
        difficulty: 'intermediate'
      },
      {
        time: '08:10 - 09:10',
        title: 'Web Exploitation',
        type: 'workshop',
        icon: Bug,
        description: 'Advanced web exploitation techniques',
        speaker: {
          name: 'HARTI Dhiaa Eddine',
          role: 'Co-founder at DeliverEase , CTF player.',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/Z6xW6y79/1740436203904.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '09:20 - 10:20',
        title: 'Lab Session (Web)',
        type: 'lab',
        icon: Laptop,
        description: 'Hands-on web security exercises',
        
        difficulty: 'advanced'
      },
      {
        time: '10:30 - 12:00',
        title: 'Penetration Testing',
        type: 'workshop',
        icon: Terminal,
        description: 'Penetration testing methodology and live demo',
        speaker: {
          name: 'Abdelkhalek Brouad',
          role: 'Computer Systems student,focused on pentesting and CTF challenges.',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/23byS4rK/1657913021090.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '13:00 - 14:00',
        title: 'Binary Exploitation',
        type: 'workshop',
        icon: Code,
        description: 'Advanced binary exploitation techniques',
        speaker: {
          name: 'Djerrai Smail',
          role: '2nd year CS student at ESI, CTF player (ShellSec team), challenge author .',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/0y6LPxgW/1700215087766.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '14:10 - 15:10',
        title: 'Digital Forensics',
        type: 'workshop',
        icon: Search,
        description: 'Digital forensics methodology and tools',
        speaker: {
          name: 'Anes Bendaoud',
          role: '3rd year CS student at ESI , active in CTFs, and Technical Manager at Shellmates.',
          company: 'SecBootCamp',
          image: 'https://i.ibb.co/NgzPZT5t/1668960260461.jpg'
        },
        difficulty: 'advanced'
      },
      {
        time: '15:30 - 19:30',
        title: 'Mini Capture The Flag (CTF)',
        type: 'challenge',
        icon: Flag,
        description: 'Final CTF competition to test all learned skills',
        difficulty: 'advanced'
      },
      {
        time: '20:00 - 21:00',
        title: 'Closing Ceremony & Certificate Distribution',
        type: 'ceremony',
        icon: Award,
        description: 'Final ceremony, awards, and certificate distribution',
      
      }
    ]
  }
];

const typeColors = {
  workshop: { bg: 'border-blue-500 bg-blue-500/10', text: 'text-blue-400' },
  break: { bg: 'border-gray-500 bg-gray-500/10', text: 'text-gray-400' },
  networking: { bg: 'border-green-500 bg-green-500/10', text: 'text-green-400' },
  challenge: { bg: 'border-purple-500 bg-purple-500/10', text: 'text-purple-400' },
  ceremony: { bg: 'border-golden-dream bg-golden-dream/10', text: 'text-golden-dream' },
  lab: { bg: 'border-hippie-blue bg-hippie-blue/10', text: 'text-hippie-blue' }
};

const difficultyBadges = {
  beginner: { bg: 'bg-green-500/20', text: 'text-green-400' },
  intermediate: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  advanced: { bg: 'bg-red-500/20', text: 'text-red-400' }
};

const Activities = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filter>({
    type: [],
    difficulty: [],
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleActivity = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index);
  };

  const toggleFilter = (category: 'type' | 'difficulty', value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const filterActivities = (activities: Activity[]) => {
    return activities.filter(activity => {
      const matchesType = filters.type.length === 0 || filters.type.includes(activity.type);
      const matchesDifficulty = filters.difficulty.length === 0 || 
        (activity.difficulty && filters.difficulty.includes(activity.difficulty));
      const matchesSearch = !filters.search || 
        activity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (activity.description && activity.description.toLowerCase().includes(filters.search.toLowerCase()));

      return matchesType && matchesDifficulty && matchesSearch;
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-golden-dream mb-8"
        >
          Event Schedule
        </motion.h1>

        {/* Day Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {days.map((day, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedDay(index)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                selectedDay === index
                  ? 'bg-golden-dream text-blue-zodiac'
                  : 'bg-blue-zodiac/30 text-citrine-white hover:bg-hippie-blue/30'
              }`}
            >
              Day {index + 1}
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-zodiac/30 rounded-lg text-citrine-white hover:bg-hippie-blue/30 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-blue-zodiac/30 rounded-lg"
              >
                {/* Search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full bg-blue-zodiac/50 border border-hippie-blue/30 rounded-lg px-4 py-2 text-citrine-white focus:outline-none focus:border-golden-dream"
                  />
                </div>

                {/* Type Filters */}
                <div className="mb-4">
                  <h3 className="text-citrine-white mb-2">Activity Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(typeColors).map(type => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('type', type)}
                        className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                          filters.type.includes(type)
                            ? typeColors[type as keyof typeof typeColors].bg
                            : 'bg-blue-zodiac/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filters */}
                <div>
                  <h3 className="text-citrine-white mb-2">Difficulty Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(difficultyBadges).map(level => (
                      <button
                        key={level}
                        onClick={() => toggleFilter('difficulty', level)}
                        className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                          filters.difficulty.includes(level)
                            ? difficultyBadges[level as keyof typeof difficultyBadges].bg
                            : 'bg-blue-zodiac/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-px bg-hippie-blue/30" />

          <div className="space-y-6">
            {filterActivities(days[selectedDay].activities).map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative pl-16 py-4 border-l-4 ${typeColors[activity.type].bg}`}
              >
                {/* Time Marker */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-zodiac rounded-full border-2 border-hippie-blue flex items-center justify-center">
                  <activity.icon className="w-3 h-3 text-golden-dream" />
                </div>

                {/* Activity Card */}
                <motion.div
                  className={`bg-blue-zodiac/30 backdrop-blur-sm p-4 rounded-lg border border-hippie-blue/30
                            hover:border-golden-dream/50 transition-all duration-300 cursor-pointer`}
                  onClick={() => toggleActivity(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-golden-dream font-mono">{activity.time}</p>
                      <h3 className="text-citrine-white text-lg font-semibold mt-1">{activity.title}</h3>
                    </div>
                    <button className="text-hippie-blue hover:text-golden-dream transition-colors">
                      {expandedActivity === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${typeColors[activity.type].bg} ${typeColors[activity.type].text}`}>
                      {activity.type}
                    </span>
                    {activity.difficulty && (
                      <span className={`px-2 py-1 rounded-full text-xs ${difficultyBadges[activity.difficulty].bg} ${difficultyBadges[activity.difficulty].text}`}>
                        {activity.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedActivity === index && activity.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-4"
                      >
                        <p className="text-hippie-blue">{activity.description}</p>

                        {/* Speaker Info */}
                        {activity.speaker && (
                          <div className="flex items-center space-x-4 p-4 bg-blue-zodiac/20 rounded-lg">
                            <img
                              src={activity.speaker.image}
                              alt={activity.speaker.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="text-citrine-white font-semibold">{activity.speaker.name}</h4>
                              <p className="text-hippie-blue text-sm">{activity.speaker.role}</p>
                              <p className="text-hippie-blue text-sm">{activity.speaker.company}</p>
                              {activity.speaker.social && (
                                <div className="flex space-x-2 mt-2">
                                  {activity.speaker.social.twitter && (
                                    <a
                                      href={activity.speaker.social.twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-hippie-blue hover:text-golden-dream transition-colors"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                  {activity.speaker.social.linkedin && (
                                    <a
                                      href={activity.speaker.social.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-hippie-blue hover:text-golden-dream transition-colors"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        {activity.requirements && activity.requirements.length > 0 && (
                          <div>
                            <h4 className="text-citrine-white font-semibold mb-2">Requirements</h4>
                            <ul className="list-disc list-inside text-hippie-blue">
                              {activity.requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Resources */}
                        {activity.resources && activity.resources.length > 0 && (
                          <div>
                            <h4 className="text-citrine-white font-semibold mb-2">Resources</h4>
                            <div className="flex flex-wrap gap-2">
                              {activity.resources.map((resource, i) => (
                                <a
                                  key={i}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 px-3 py-1 bg-hippie-blue/20 rounded-full text-sm text-hippie-blue hover:text-golden-dream transition-colors"
                                >
                                  <span>{resource.title}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Activities;