import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Code, Server, Database as DatabaseIcon } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  skills: string[];
  github: string;
  linkedin: string;
  icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Hassani Fateh',
    role: 'Chill leader',
    image: 'https://i.ibb.co/wrYB8b9s/20250429-175626.jpg',
    skills: ['Trees', 'BSTs', 'C/Python', 'Algorithms' , 'CTF' , 'Cryptography'],
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/fateh-hassani-4012a531b/',
    icon: <Code className="text-neon-blue" />
  },
  {
    name: 'Abbaci Mohamed Sadek',
    role: 'The hard worker (the best) ',
    image: 'https://i.ibb.co/4ZhVTbMG/20250422-175402.jpg',
    skills: [ 'Queue Management', 'Log Processing', 'C/C++' , 'Web Explotation'],
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/mohamed-essadek-abbaci-7abbb3349/',
    icon: <Server className="text-neon-green" />
  },
  {
    name: 'Kassoul Mohamed Ali',
    role: 'The laziest man (the smartest)',
    image: 'https://i.ibb.co/84TFF0Sc/1744628904451.jpg',
    skills: ['Linked Lists', 'Stack Implementation', 'Memory Management', 'Python'],
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/kassoul-mohammed-ali-a35ba9344/',
    icon: <DatabaseIcon className="text-neon-red" />
  }
];

const TeamSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="team" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-base/50 z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="section-title">
          <h2 className="text-neon-green mb-4">Meet The Team</h2>
          <p className="text-neutral-300 max-w-3xl mx-auto">
            Our talented team of developers specialized in different data structures and algorithms
          </p>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.name} 
              member={member} 
              index={index} 
              inView={inView} 
            />
          ))}
        </div>
      </div>
      
      {/* Background connection lines */}
      <svg 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none opacity-20 z-0" 
        viewBox="0 0 800 600"
      >
        <line x1="200" y1="300" x2="400" y2="300" className="stroke-neon-blue" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="400" y1="300" x2="600" y2="300" className="stroke-neon-green" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="400" y1="150" x2="400" y2="450" className="stroke-neon-red" strokeWidth="2" strokeDasharray="5,5" />
        
        <circle cx="200" cy="300" r="5" className="fill-neon-blue" />
        <circle cx="400" cy="300" r="5" className="fill-neon-green" />
        <circle cx="600" cy="300" r="5" className="fill-neon-red" />
        <circle cx="400" cy="150" r="5" className="fill-neon-blue" />
        <circle cx="400" cy="450" r="5" className="fill-neon-green" />
      </svg>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  inView: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index, inView }) => {
  return (
    <motion.div
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue via-neon-green to-neon-red rounded-lg blur opacity-25 group-hover:opacity-80 transition duration-500"></div>
        
        <div className="relative bg-neutral-900 rounded-lg overflow-hidden">
          {/* Member Image */}
          <div className="h-48 overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-80"></div>
          </div>
          
          {/* Content */}
          <div className="p-6 relative z-10 -mt-16">
            <div className="absolute right-6 top-0 p-2 bg-neutral-900 rounded-full">
              {member.icon}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-sm text-neon-blue mb-4">{member.role}</p>
            
            {/* Skills */}
            <div className="mb-4 flex flex-wrap gap-2">
              {member.skills.map(skill => (
                <span 
                  key={skill}
                  className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href={member.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neon-blue transition-colors duration-300"
                aria-label={`${member.name}'s GitHub`}
              >
                <Github size={18} />
              </a>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neon-blue transition-colors duration-300"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamSection;