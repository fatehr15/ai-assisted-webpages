import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Book } from 'lucide-react';
import DataStructureVisuals from './DataStructureVisuals';
import BSTVisual from './visualizations/BSTVisual';

const ProjectOverview: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section 
      id="projects" 
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      <div className="section-container">
        <div className="section-title">
          <h2 className="text-neon-blue mb-4">Project Overview</h2>
          <p className="text-neutral-300 max-w-3xl mx-auto">
            Our ALSDD Project demonstrates advanced data structure implementation concepts with two distinct systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <ProjectCard 
            title="Security Logs Management System" 
            icon={<Shield className="w-8 h-8 text-neon-blue" />}
            description="Real-time ingestion, storage & analysis using linked lists, queues, and stacks. Robust parsing of timestamps and messages."
            animationDelay={0.1}
            inView={inView}
            visualization={<SecurityLogsVisual />}
            color="neon-blue"
          />
          
          <ProjectCard 
            title="Dictionary Management System" 
            icon={<Book className="w-8 h-8 text-neon-green" />}
            description="AVL-balanced BST for fast lookups, with linked lists for synonyms & antonyms. Recursive insert/delete/traversal guarantee efficiency."
            animationDelay={0.2}
            inView={inView}
            visualization={<DictionaryVisual />}
            color="neon-green"
          />
        </div>

        <DataStructureVisuals />
      </div>
    </section>
  );
};

interface ProjectCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  animationDelay: number;
  inView: boolean;
  visualization: React.ReactNode;
  color: 'neon-blue' | 'neon-green';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  icon, 
  description, 
  animationDelay,
  inView,
  visualization,
  color
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div 
      className="h-80 perspective relative"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.8, delay: animationDelay }}
    >
      <div 
        className={`card-flip ${flipped ? 'rotate-y-180' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`card-front border-${color}`}>
          <div className="flex items-start mb-4">
            {icon}
            <h3 className={`text-xl ml-2 text-${color}`}>{title}</h3>
          </div>
          
          <p className="text-neutral-300 mb-4">{description}</p>
          
          <div className="mt-auto">
            {visualization}
            
            <button 
              className={`mt-4 text-sm text-${color} border border-${color} px-3 py-1 rounded hover:bg-${color}/10 transition-colors duration-300`}
            >
              Flip for details
            </button>
          </div>
        </div>
        
        <div className={`card-back border-${color}`}>
          <h3 className={`text-lg mb-4 text-${color}`}>Implementation Details</h3>
          
          <ul className="text-sm text-neutral-300 space-y-2 mb-4">
            <li className="flex items-start">
              <span className={`text-${color} mr-2`}>•</span>
              <span>Data structure integrity validated with comprehensive unit tests</span>
            </li>
            <li className="flex items-start">
              <span className={`text-${color} mr-2`}>•</span>
              <span>Memory-efficient design with optimal Big O complexity</span>
            </li>
            <li className="flex items-start">
              <span className={`text-${color} mr-2`}>•</span>
              <span>Thread-safe operations for concurrent access</span>
            </li>
            <li className="flex items-start">
              <span className={`text-${color} mr-2`}>•</span>
              <span>Modular architecture allows for easy extension</span>
            </li>
          </ul>
          
          <div className={`text-xs px-3 py-2 rounded bg-${color}/10 border border-${color}/20 text-neutral-300`}>
            <code className="block overflow-hidden whitespace-nowrap" style={{animation: 'typewriter 8s steps(40) infinite'}}>
              {color === 'neon-blue' 
                ? 'logQueue.enqueue(new LogEntry(timestamp, message));'
                : 'dictionary.insert(word, definition, synonyms);'}
            </code>
          </div>
          
          <button 
            className={`mt-4 text-sm text-${color} border border-${color} px-3 py-1 rounded hover:bg-${color}/10 transition-colors duration-300`}
          >
            Back to overview
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SecurityLogsVisual: React.FC = () => (
  <div className="w-full h-20 relative bg-neutral-900/50 rounded overflow-hidden p-2">
    <div className="flex items-center space-x-2">
      <div className="text-xs text-neutral-400">Flow:</div>
      <div className="w-14 h-6 flex items-center justify-center bg-neutral-800 rounded text-[10px] text-neon-blue">
        LogInput
      </div>
      <div className="text-neon-blue">→</div>
      <div className="w-12 h-6 flex items-center justify-center bg-neutral-800 rounded text-[10px] text-neon-blue">











        
        Queue
      </div>
      <div className="text-neon-blue">→</div>
      <div className="w-14 h-6 flex items-center justify-center bg-neutral-800 rounded text-[10px] text-neon-blue">
        LinkedList
      </div>
    </div>
    <div className="mt-2 w-full h-6 bg-neutral-800/50 rounded overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-neon-blue/20 to-neon-blue/50"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
      />
    </div>
  </div>
);

const DictionaryVisual: React.FC = () => (
  <div className="w-full h-20 relative bg-neutral-900/50 rounded overflow-hidden p-2">
    <svg width="100%" height="100%" viewBox="0 0 240 60">
      <g transform="translate(120, 15)">
        {/* Root node */}
        <circle cx="0" cy="0" r="10" className="fill-neutral-800 stroke-neon-green" />
        <text x="0" y="3" textAnchor="middle" className="fill-neon-green text-[8px]">M</text>
        
        {/* Left branch */}
        <line x1="-6" y1="6" x2="-30" y2="24" className="stroke-neon-green" />
        <circle cx="-35" cy="30" r="8" className="fill-neutral-800 stroke-neon-green" />
        <text x="-35" y="33" textAnchor="middle" className="fill-neon-green text-[7px]">F</text>
        
        {/* Right branch */}
        <line x1="6" y1="6" x2="30" y2="24" className="stroke-neon-green" />
        <circle cx="35" cy="30" r="8" className="fill-neutral-800 stroke-neon-green" />
        <text x="35" y="33" textAnchor="middle" className="fill-neon-green text-[7px]">T</text>
        
        {/* Animation of a rotation */}
        <g className="rotating-node">
          <circle cx="60" cy="30" r="6" className="fill-neutral-800 stroke-neon-green" />
          <text x="60" y="33" textAnchor="middle" className="fill-neon-green text-[6px]">Z</text>
          
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 35 30"
            to="-90 35 30"
            dur="4s"
            repeatCount="indefinite"
            values="0 35 30; -90 35 30; -90 35 30; 0 35 30"
            keyTimes="0; 0.4; 0.6; 1"
          />
        </g>
      </g>
    </svg>
  </div>
);

export default ProjectOverview;