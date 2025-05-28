import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Info, Star, Award, Shield, Network, Code, Brain, Terminal, Globe, Moon } from 'lucide-react';


interface GoldenTicket {
  winner: string;
  competition: string;
  timestamp: Date;
}

interface GoldenTicketShowcaseProps {
  tickets: GoldenTicket[];
}

const ticketDetails = {
  "Cipher Renegades": {
    icon: Code,
    description: "Awarded to the team that demonstrates unparalleled skill in decrypting the most challenging codes. This ticket signifies mastery in cryptanalysis, breaking through layers of digital secrecy with precision and creativity.",
    color: "from-yellow-500/20 via-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500"
  },
  "Visionary Vanguard": {
    icon: Brain,
    description: "Honors the team that stands out with the most innovative and forward-thinking solution in the Mentorship & Business challenge. A badge of honor that declares your team as pioneers of cyber entrepreneurship.",
    color: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    iconColor: "text-blue-500"
  },
  "Packet Protectors": {
    icon: Shield,
    description: "Celebrates the team that excels in defending digital infrastructures. This ticket is a mark of honor for those who skillfully safeguard networks and neutralize cyber threats with precision.",
    color: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    iconColor: "text-cyan-500"
  },
  "Circuit Conquerors": {
    icon: Terminal,
    description: "Granted to the team that triumphs in the challenge of hardware security. This ticket embodies the mastery of uncovering and mitigating vulnerabilities in physical devices and embedded systems.",
    color: "from-red-500/20 via-rose-500/20 to-pink-500/20",
    iconColor: "text-red-500"
  },
  "Web Phantoms": {
    icon: Globe,
    description: "Honors the team that demonstrates extraordinary skill in identifying and mitigating vulnerabilities in web applications. This ticket marks you as the unseen guardians of the digital realm.",
    color: "from-purple-500/20 via-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  "1nnoSleuths": {
    icon: Award,
    description: "Awarded to the team that dominates the Mini CTF challenge. This ticket represents not only technical skill and speed but also the ability to think critically under pressure.",
    color: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    iconColor: "text-emerald-500"
  },
  "Twilight Sentinels": {
    icon: Moon,
    description: "Bestowed upon the team that excels during the Midnight Cybersecurity Challenges. This ticket is a tribute to resilience and the ability to perform under the most demanding conditions.",
    color: "from-indigo-500/20 via-purple-500/20 to-violet-500/20",
    iconColor: "text-indigo-500"
  }
};

const GoldenTicketShowcase: React.FC<GoldenTicketShowcaseProps> = ({ tickets }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);


  const handleTicketClick = (winner: string) => {
    playClick();
    setSelectedTicket(selectedTicket === winner ? null : winner);
  };

  return (
    <div className="bg-blue-zodiac/30 rounded-lg border border-hippie-blue/30 p-6">
      <h2 className="text-2xl font-semibold text-golden-dream mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2" />
        Golden Ticket Showcase
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket, index) => {
          const details = ticketDetails[ticket.winner as keyof typeof ticketDetails];
          const Icon = details?.icon || Star;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTicketClick(ticket.winner)}
              onMouseEnter={playHover}
              className={`relative bg-gradient-to-br ${details?.color || 'from-golden-dream/20 to-hippie-blue/20'} 
                       rounded-lg border border-golden-dream/30 p-4 cursor-pointer group
                       hover:border-golden-dream transition-all duration-300`}
            >
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🎟️</span>
                  <Icon className={`w-6 h-6 ${details?.iconColor || 'text-golden-dream'}`} />
                </div>

                <h3 className="text-citrine-white font-semibold mb-1">{ticket.winner}</h3>
                <p className="text-hippie-blue text-sm">{ticket.competition}</p>
                <p className="text-golden-dream/70 text-xs mt-2">
                  {ticket.timestamp.toLocaleDateString()} {ticket.timestamp.toLocaleTimeString()}
                </p>

                {/* Expand Indicator */}
                <motion.div
                  animate={{ scale: selectedTicket === ticket.winner ? 0.9 : 1 }}
                  className="absolute bottom-2 right-2 text-hippie-blue/50"
                >
                  <Info className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedTicket === ticket.winner && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-golden-dream/30"
                  >
                    <p className="text-hippie-blue text-sm leading-relaxed">
                      {details?.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-golden-dream/0 via-golden-dream/10 to-golden-dream/0 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GoldenTicketShowcase;