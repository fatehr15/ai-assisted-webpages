import React from 'react';
import { motion } from 'framer-motion';
import { Database, Github, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-base relative overflow-hidden py-10 border-t border-neutral-800">
      {/* SVG Tree Animation */}
      <div className="absolute bottom-0 left-8 opacity-20 w-40 h-40">
        <RecursiveTree />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Database className="h-6 w-6 text-neon-blue mr-2" />
            <span className="font-orbitron text-lg font-bold text-neon-blue">ALSDD</span>
          </div>
          
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neon-blue transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="mailto:info@example.com" className="text-neutral-400 hover:text-neon-blue transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <button 
            onClick={scrollToTop} 
            className="flex items-center text-sm text-neutral-400 hover:text-neon-blue transition-colors"
          >
            <span className="mr-1">Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm text-center md:text-left mb-4 md:mb-0">
            Made By :
          </p>
          <p className="text-neutral-400 text-sm text-center md:text-left mb-4 md:mb-0">
            f.hassani@enscs.edu.dz
          </p>
          <p className="text-neutral-400 text-sm text-center md:text-left mb-4 md:mb-0">
            m.abbaci@enscs.edu.dz
          </p>
          <p className="text-neutral-400 text-sm text-center md:text-left mb-4 md:mb-0">
            a.kassoul@enscs.edu.dz
          </p>
          
          <p className="text-neutral-500 text-xs">
            National School of Cyber Security · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

const RecursiveTree: React.FC = () => {
  // Define a recursive function to create the tree branches
  const createBranch = (
    startX: number, 
    startY: number, 
    length: number, 
    angle: number, 
    depth: number
  ): JSX.Element | null => {
    if (depth <= 0) return null;
    
    // Calculate end point
    const endX = startX + length * Math.sin(angle);
    const endY = startY - length * Math.cos(angle);
    
    // Calculate animation delay based on depth
    const delay = (5 - depth) * 0.2;
    
    return (
      <g key={`${startX}-${startY}-${angle}-${depth}`}>
        <motion.line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={depth === 4 ? "#00f5ff" : depth === 3 ? "#39ff14" : "#ff3c38"}
          strokeWidth={depth}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ 
            duration: 1, 
            delay, 
            repeat: Infinity, 
            repeatType: "reverse", 
            repeatDelay: 3
          }}
        />
        
        {createBranch(
          endX,
          endY,
          length * 0.7,
          angle - Math.PI / 6,
          depth - 1
        )}
        
        {createBranch(
          endX,
          endY,
          length * 0.7,
          angle + Math.PI / 6,
          depth - 1
        )}
      </g>
    );
  };
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {createBranch(50, 100, 25, -Math.PI / 2, 4)}
    </svg>
  );
};

export default Footer;