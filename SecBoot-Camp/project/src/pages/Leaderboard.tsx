import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, Star, ArrowUp, ArrowDown, Minus, Search, Filter, 
         ChevronDown, ChevronUp, Bell, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import CompetitionSection from '../components/CompetitionSection';
import GoldenTicketShowcase from '../components/GoldenTicketShowcase';
import DetailsModal from '../components/DetailsModal';
import CityBackground from '../components/CityBackground';

const competitions = [
  {
    title: "Cryptography – Code Breakers Arena",
    startTime: new Date('2025-04-24T17:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "Cipher Surge", points: 300 },
      { rank: 2, name: "Digital Shield", points: 250 },
      { rank: 3, name: "Cyber Nexus", points: 200 }
    ],
    goldenTicketWinner: "Cipher Renegades",
    description: "In the Cryptography competition, teams are challenged to crack encrypted messages and puzzles. They might be given various ciphers—substitution ciphers, transposition ciphers, or even more modern algorithms—to decode hidden flags.",
    pointAllocation: {
      "1st Place": 300,
      "2nd Place": 250,
      "3rd Place": 200,
      "4th Place": 150,
      "5th Place": 100
    },
    keySkills: ["Pattern Recognition", "Mathematical Logic", "Decryption Tools"]
  },
  {
    title: "Mentorship & Business – The Strategic Edge",
    startTime: new Date('2025-04-24T18:00:00'),
    difficulty: 2,
    teams: [
      { rank: 1, name: "CyberGirls", points: 400 },
      { rank: 2, name: "Lijans", points: 250 },
      { rank: 3, name: "Phantom Knights", points: 200 }
    ],
    goldenTicketWinner: "Visionary Vanguard",
    description: "Teams participate in a business case scenario related to cybersecurity, showcasing innovative ideas on securing digital assets while integrating mentorship advice.",
    pointAllocation: {
      "1st Place": 400,
      "2nd Place": 250,
      "3rd Place": 200,
      "4th Place": 120,
      "5th Place": 90
    },
    keySkills: ["Strategic Planning", "Business Acumen", "Communication"]
  },
  {
    title: "Network Security – Defending the Grid",
    startTime: new Date('2025-04-24T19:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "Lijans", points: 200 },
      { rank: 2, name: "NetGuardians", points: 150 },
      { rank: 3, name: "ByteShield", points: 100 }
    ],
    goldenTicketWinner: "Packet Protectors",
    description: "Teams must protect and penetrate simulated network environments while identifying and mitigating security vulnerabilities.",
    pointAllocation: {
      "1st Place": 200,
      "2nd Place": 150,
      "3rd Place": 100
    },
    keySkills: ["Network Analysis", "Penetration Testing", "Defense Strategies"]
  },
  {
    title: "Hardware Security – Breaking the Limits",
    startTime: new Date('2025-04-24T20:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "CyberGirls", points: 200 },
      { rank: 2, name: "HardwarePros", points: 150 },
      { rank: 3, name: "CircuitBreakers", points: 100 }
    ],
    goldenTicketWinner: "Circuit Conquerors",
    description: "Challenge focused on identifying vulnerabilities in embedded systems and performing side-channel analysis.",
    pointAllocation: {
      "1st Place": 200,
      "2nd Place": 150,
      "3rd Place": 100
    },
    keySkills: ["Hardware Analysis", "Side-Channel Attacks", "Embedded Systems"]
  },
  {
    title: "Web Security – The Digital Frontline",
    startTime: new Date('2025-04-24T21:00:00'),
    difficulty: 2,
    teams: [
      { rank: 1, name: "The Innovators", points: 200 },
      { rank: 2, name: "WebWarriors", points: 150 },
      { rank: 3, name: "SecurityFirst", points: 100 }
    ],
    goldenTicketWinner: "Web Phantoms",
    description: "Teams must identify and exploit web application vulnerabilities while implementing secure coding practices.",
    pointAllocation: {
      "1st Place": 200,
      "2nd Place": 150,
      "3rd Place": 100
    },
    keySkills: ["Web Exploitation", "Secure Coding", "Bug Hunting"]
  },
  {
    title: "Mini CTF – Ultimate Cyber Warfare",
    startTime: new Date('2025-04-24T22:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "Lijans", points: 1000 },
      { rank: 2, name: "CyberElite", points: 500 },
      { rank: 3, name: "HackMasters", points: 400 }
    ],
    goldenTicketWinner: "1nnoSleuths",
    description: "A comprehensive CTF challenge combining web exploitation, binary analysis, and cryptography puzzles.",
    pointAllocation: {
      "1st Place": 1000,
      "2nd Place": 500,
      "3rd Place": 400
    },
    keySkills: ["Multi-domain Skills", "Time Management", "Problem Solving"]
  },
  {
    title: "Part 1: The Dark Web Pursuit",
    startTime: new Date('2025-04-24T23:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "Phantom Knights", points: 150 },
      { rank: 2, name: "NightOwls", points: 100 },
      { rank: 3, name: "DarkBytes", points: 75 }
    ],
    goldenTicketWinner: "Twilight Sentinels",
    description: "First part of the midnight challenge focusing on dark web investigation and analysis.",
    pointAllocation: {
      "1st Place": 150,
      "2nd Place": 100,
      "3rd Place": 75
    },
    keySkills: ["Dark Web Analysis", "OSINT", "Investigation"]
  },
  {
    title: "Part 2: Cyber Espionage Warfare",
    startTime: new Date('2025-04-25T00:00:00'),
    difficulty: 3,
    teams: [
      { rank: 1, name: "Lijans", points: 150 },
      { rank: 2, name: "NightHawks", points: 100 },
      { rank: 3, name: "ShadowBytes", points: 75 }
    ],
    goldenTicketWinner: "Twilight Sentinels",
    description: "Second part of the midnight challenge testing advanced exploitation and stealth techniques.",
    pointAllocation: {
      "1st Place": 150,
      "2nd Place": 100,
      "3rd Place": 75
    },
    keySkills: ["Stealth Techniques", "Advanced Exploitation", "Persistence"]
  }
];

const goldenTickets = [
  {
    winner: "Cipher Renegades",
    competition: "Cryptography",
    timestamp: new Date('2025-04-24T17:30:00')
  },
  {
    winner: "Visionary Vanguard",
    competition: "Mentorship & Business",
    timestamp: new Date('2025-04-24T18:30:00')
  },
  {
    winner: "Packet Protectors",
    competition: "Network Security",
    timestamp: new Date('2025-04-24T19:30:00')
  },
  {
    winner: "Circuit Conquerors",
    competition: "Hardware Security",
    timestamp: new Date('2025-04-24T20:30:00')
  },
  {
    winner: "Web Phantoms",
    competition: "Web Security",
    timestamp: new Date('2025-04-24T21:30:00')
  },
  {
    winner: "1nnoSleuths",
    competition: "Mini CTF",
    timestamp: new Date('2025-04-24T22:30:00')
  },
  {
    winner: "Twilight Sentinels",
    competition: "Midnight Challenges",
    timestamp: new Date('2025-04-25T00:30:00')
  }
];

const Leaderboard = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [notificationSound, setNotificationSound] = useState(true);

  const playClick = () => {
    // Placeholder for click sound effect
    console.log('Click sound played');
  };

  const playRankUp = () => {
    // Placeholder for rank up sound effect
    console.log('Rank up sound played');
  };

  const [participants, setParticipants] = useState([
    {
      id: '1',
      rank: 1,
      previousRank: 2,
      name: "Cipher Surge",
      score: 2200,
      wins: 3,
      tickets: 2,
      team: 'Binary Bandits',
      recentAchievements: ['First Place in Cryptography', 'Golden Ticket Winner']
    },
    {
      id: '2',
      rank: 2,
      previousRank: 1,
      name: "CyberGirls",
      score: 1400,
      wins: 2,
      tickets: 1,
      team: 'Tech Warriors'
    },
    {
      id: '3',
      rank: 3,
      previousRank: 3,
      name: "Lijans",
      score: 1100,
      wins: 1,
      tickets: 1,
      team: 'Code Breakers'
    },
    {
      id: '4',
      rank: 4,
      previousRank: 5,
      name: "The Innovators",
      score: 820,
      wins: 1,
      tickets: 0,
      team: 'Digital Defenders'
    },
    {
      id: '5',
      rank: 5,
      previousRank: 4,
      name: "Phantom Knights",
      score: 610,
      wins: 0,
      tickets: 1,
      team: 'Night Watch'
    }
  ]);

  const glowAnimation = useSpring({
    from: { opacity: 0.5, boxShadow: '0 0 10px rgba(240, 214, 55, 0.3)' },
    to: async (next) => {
      while (true) {
        await next({ opacity: 1, boxShadow: '0 0 20px rgba(240, 214, 55, 0.6)' });
        await next({ opacity: 0.5, boxShadow: '0 0 10px rgba(240, 214, 55, 0.3)' });
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setParticipants(prev => {
        const newParticipants = [...prev];
        const randomIndex = Math.floor(Math.random() * newParticipants.length);
        const scoreChange = Math.floor(Math.random() * 100) - 50;
        newParticipants[randomIndex] = {
          ...newParticipants[randomIndex],
          score: newParticipants[randomIndex].score + scoreChange
        };
        newParticipants.sort((a, b) => b.score - a.score);
        return newParticipants.map((p, i) => ({ ...p, rank: i + 1 }));
      });
      if (notificationSound) {
        playRankUp();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [notificationSound]);

  const filteredParticipants = participants
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.team.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' ||
                          (selectedFilter === 'winners' && p.wins > 0) ||
                          (selectedFilter === 'tickets' && p.tickets > 0);
      return matchesSearch && matchesFilter;
    })
    .slice(0, showAllTeams ? undefined : 10);

  return (
    <div className="min-h-screen pt-20 px-4 pb-12 relative">
      <CityBackground />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-golden-dream mb-4 glow-text">
            SecBootCamp Leaderboard
          </h1>
          <p className="text-hippie-blue text-xl">The Race to Cyber Supremacy</p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hippie-blue" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-blue-zodiac/30 border border-hippie-blue/30 rounded-lg
                         text-citrine-white focus:outline-none focus:border-golden-dream
                         placeholder-hippie-blue/50"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-blue-zodiac/30 border border-hippie-blue/30 rounded-lg
                       text-citrine-white focus:outline-none focus:border-golden-dream"
            >
              <option value="all">All Teams</option>
              <option value="winners">Event Winners</option>
              <option value="tickets">Golden Ticket Holders</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setNotificationSound(!notificationSound)}
              className="p-2 rounded-full bg-blue-zodiac/30 border border-hippie-blue/30
                       hover:border-golden-dream transition-colors"
            >
              {notificationSound ? (
                <Volume2 className="w-5 h-5 text-hippie-blue" />
              ) : (
                <VolumeX className="w-5 h-5 text-hippie-blue" />
              )}
            </button>
            <div className="text-hippie-blue text-sm">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <motion.button
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
              className="p-2 rounded-full bg-blue-zodiac/30 border border-hippie-blue/30
                       hover:border-golden-dream transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-hippie-blue" />
            </motion.button>
          </div>
        </div>

        <div className="mb-12 bg-blue-zodiac/30 backdrop-blur-sm rounded-lg border border-hippie-blue/30 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-citrine-white mb-6">Overall Rankings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hippie-blue/30">
                    <th className="px-6 py-4 text-left text-citrine-white">Rank</th>
                    <th className="px-6 py-4 text-left text-citrine-white">Team</th>
                    <th className="px-6 py-4 text-left text-citrine-white">Points</th>
                    <th className="px-6 py-4 text-left text-citrine-white">Wins</th>
                    <th className="px-6 py-4 text-left text-citrine-white">Golden Tickets</th>
                    <th className="px-6 py-4 text-left text-citrine-white">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant) => (
                    <motion.tr
                      key={participant.id}
                      className="border-b border-hippie-blue/10 hover:bg-hippie-blue/10 cursor-pointer
                               transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      onClick={() => {
                        playClick();
                        setSelectedTeam(participant.name);
                        setModalContent({
                          title: participant.name,
                          content: `
                            Team: ${participant.team}
                            Current Rank: ${participant.rank}
                            Total Points: ${participant.score}
                            Event Wins: ${participant.wins}
                            Golden Tickets: ${participant.tickets}
                            
                            Recent Achievements:
                            ${participant.recentAchievements ? participant.recentAchievements.join('\n') : 'No recent achievements'}
                          `
                        });
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {participant.rank === 1 ? (
                            <animated.div style={glowAnimation}>
                              <Trophy className="w-8 h-8 text-golden-dream" />
                            </animated.div>
                          ) : participant.rank === 2 ? (
                            <Medal className="w-6 h-6 text-hippie-blue" />
                          ) : participant.rank === 3 ? (
                            <Award className="w-6 h-6 text-[#CD7F32]" />
                          ) : (
                            <Star className="w-6 h-6 text-citrine-white/50" />
                          )}
                          <span className="text-citrine-white">{participant.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-hippie-blue">{participant.name}</span>
                        <span className="text-hippie-blue/50 text-sm ml-2">({participant.team})</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-golden-dream font-mono">{participant.score}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-citrine-white">{participant.wins} wins</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-1">
                          {Array.from({ length: participant.tickets }).map((_, i) => (
                            <span key={i} className="text-golden-dream">🎟️</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {participant.rank < participant.previousRank ? (
                          <ArrowUp className="w-4 h-4 text-green-500" />
                        ) : participant.rank > participant.previousRank ? (
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-500" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!showAllTeams && participants.length > 10 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllTeams(true)}
                  className="px-6 py-3 bg-hippie-blue/20 text-hippie-blue rounded-lg
                           hover:bg-hippie-blue/30 transition-colors flex items-center mx-auto"
                >
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Show All Teams
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {competitions.map((competition, index) => (
            <CompetitionSection key={index} {...competition} />
          ))}
        </div>

        <div className="mt-12">
          <GoldenTicketShowcase tickets={goldenTickets} />
        </div>

        <DetailsModal
          isOpen={!!modalContent}
          onClose={() => setModalContent(null)}
          title={modalContent?.title || ''}
        >
          <div className="text-hippie-blue whitespace-pre-line">
            {modalContent?.content}
          </div>
        </DetailsModal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-blue-zodiac/90 backdrop-blur-sm border-t
                   border-hippie-blue/30 py-2 px-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-hippie-blue">
              <Bell className="w-4 h-4 text-golden-dream" />
              <span>Live Updates</span>
            </div>
            <div className="text-hippie-blue">
              Next update in: {60 - new Date().getSeconds()} seconds
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;