import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { ExternalLink } from 'lucide-react';
import { useSoundContext } from './SoundContext';

interface ActivityCardProps {
  icon: any;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
  isExpanded: boolean;
  mentors?: Array<{
    name: string;
    role: string;
    avatar: string;
    linkedin?: string;
    quote?: string;
  }>;
  events?: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
  isExpanded,
  mentors,
  events
}) => {
  const { playHover } = useSoundContext();

  return (
    <motion.div
      layout
      className={`col-span-1 ${isExpanded ? 'md:col-span-3' : ''}`}
    >
      <Tilt
        options={{
          max: isExpanded ? 0 : 25,
          scale: 1.05,
          speed: 1000,
          transition: true,
        }}
        className={`bg-blue-zodiac/30 backdrop-blur-sm rounded-lg border border-hippie-blue/30 
                   overflow-hidden cursor-pointer transition-all duration-300
                   hover:border-${color} group`}
      >
        <motion.div
          className="p-6"
          onClick={onClick}
          onMouseEnter={playHover}
          layout
        >
          <motion.div className="flex items-start justify-between">
            <motion.div className="flex-1">
              <motion.div
                className={`w-16 h-16 rounded-lg bg-${color}/20 flex items-center justify-center 
                           mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-8 h-8 text-${color}`} />
              </motion.div>
              <motion.h3 className="text-xl font-semibold text-citrine-white mb-2">
                {title}
              </motion.h3>
              <motion.p className="text-hippie-blue">{description}</motion.p>
            </motion.div>
          </motion.div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 pt-6 border-t border-hippie-blue/30"
            >
              {/* Mentors Section */}
              {mentors && mentors.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-citrine-white mb-4">Mentors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mentors.map((mentor, index) => (
                      <div
                        key={index}
                        className="bg-blue-zodiac/20 p-4 rounded-lg border border-hippie-blue/20"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h5 className="text-citrine-white font-semibold">{mentor.name}</h5>
                            <p className="text-hippie-blue text-sm">{mentor.role}</p>
                          </div>
                        </div>
                        {mentor.quote && (
                          <p className="text-hippie-blue text-sm mt-2 italic">"{mentor.quote}"</p>
                        )}
                        {mentor.linkedin && (
                          <a
                            href={mentor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center text-${color} hover:text-${color}/80 mt-2`}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            <span className="text-sm">LinkedIn</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {events && events.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-citrine-white mb-4">Upcoming Events</h4>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="bg-blue-zodiac/20 p-4 rounded-lg border border-hippie-blue/20"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-citrine-white font-semibold">{event.title}</h5>
                            <p className="text-hippie-blue text-sm mt-1">{event.description}</p>
                          </div>
                          <span className={`text-${color} text-sm`}>{event.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default ActivityCard;