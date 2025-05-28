import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, Medal, Award, Flame } from 'lucide-react';
import Countdown from 'react-countdown';


interface Team {
  rank: number;
  name: string;
  points: number;
}

interface CompetitionProps {
  title: string;
  startTime: Date;
  difficulty: number;
  teams: Team[];
  goldenTicketWinner: string;
  description: string;
  pointAllocation: {
    [key: string]: number;
  };
  keySkills: string[];
}

const CompetitionSection: React.FC<CompetitionProps> = ({
  title,
  startTime,
  difficulty,
  teams,
  goldenTicketWinner,
  description,
  pointAllocation,
  keySkills
}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-golden-dream" />;
      case 2:
        return <Medal className="w-6 h-6 text-hippie-blue" />;
      case 3:
        return <Award className="w-6 h-6 text-[#CD7F32]" />;
      default:
        return null;
    }
  };

  const getDifficultyDisplay = (level: number) => {
    return Array(level)
      .fill(0)
      .map((_, i) => (
        <Flame
          key={i}
          className="w-4 h-4 text-red-500"
        />
      ));
  };

  const isMidnightChallenge = title.includes('Part');
  const bgClass = isMidnightChallenge
    ? 'bg-blue-zodiac/50 backdrop-blur-md'
    : 'bg-blue-zodiac/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 ${bgClass} rounded-lg border border-hippie-blue/30 overflow-hidden`}
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          playClick();
        }}
        onMouseEnter={playHover}
        className="w-full p-6 flex items-center justify-between hover:bg-hippie-blue/10 transition-colors"
      >
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <h3 className="text-xl font-semibold text-citrine-white">{title}</h3>
            <div className="flex items-center space-x-1">
              {getDifficultyDisplay(difficulty)}
            </div>
          </div>
          <Countdown
            date={startTime}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className={`font-mono ${
                hours < 1 ? 'text-red-500' : 'text-golden-dream'
              }`}>
                Starts in: {days}d {hours}h {minutes}m {seconds}s
              </div>
            )}
          />
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-hippie-blue" />
        ) : (
          <ChevronDown className="w-6 h-6 text-hippie-blue" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-hippie-blue/30"
          >
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-citrine-white mb-2">Overview</h4>
                <p className="text-hippie-blue">{description}</p>
              </div>

              {/* Leaderboard */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-hippie-blue/30">
                      <th className="px-4 py-2 text-left text-citrine-white">Rank</th>
                      <th className="px-4 py-2 text-left text-citrine-white">Team</th>
                      <th className="px-4 py-2 text-left text-citrine-white">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <motion.tr
                        key={team.name}
                        className="border-b border-hippie-blue/10 hover:bg-hippie-blue/10"
                        whileHover={{ scale: 1.01 }}
                      >
                        <td className="px-4 py-2">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(team.rank)}
                            <span className="text-citrine-white">{team.rank}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-hippie-blue">{team.name}</td>
                        <td className="px-4 py-2 text-golden-dream font-mono">{team.points}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Golden Ticket Winner */}
              <div className="bg-golden-dream/10 p-4 rounded-lg border border-golden-dream/30">
                <h4 className="text-golden-dream font-semibold mb-2">🎟️ Golden Ticket Winner</h4>
                <p className="text-citrine-white">{goldenTicketWinner}</p>
              </div>

              {/* Point Allocation */}
              <div>
                <h4 className="text-lg font-semibold text-citrine-white mb-2">Point Allocation</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(pointAllocation).map(([place, points]) => (
                    <div
                      key={place}
                      className="bg-blue-zodiac/20 p-2 rounded border border-hippie-blue/20"
                    >
                      <div className="text-hippie-blue">{place}</div>
                      <div className="text-golden-dream font-mono">{points} points</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h4 className="text-lg font-semibold text-citrine-white mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-hippie-blue/20 text-hippie-blue"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CompetitionSection;