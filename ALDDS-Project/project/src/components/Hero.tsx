import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createCircuitNodes = () => {
      if (!containerRef.current) return;
      
      const existingNodes = containerRef.current.querySelectorAll('.circuit-node');
      existingNodes.forEach(node => node.remove());
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        node.style.position = 'absolute';
        node.style.width = Math.random() * 6 + 2 + 'px';
        node.style.height = node.style.width;
        node.style.backgroundColor = Math.random() > 0.5 ? '#00f5ff' : '#39ff14';
        node.style.borderRadius = '50%';
        node.style.opacity = '0';
        node.style.boxShadow = `0 0 10px ${node.style.backgroundColor}`;
        node.style.left = Math.random() * containerRect.width + 'px';
        node.style.top = Math.random() * containerRect.height + 'px';
        
        container.appendChild(node);
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        node.style.animation = `
          pulse ${duration}s ease-in-out ${delay}s infinite alternate,
          float ${duration * 2}s ease-in-out ${delay}s infinite alternate
        `;
        
        setTimeout(() => {
          node.style.opacity = (Math.random() * 0.5 + 0.2).toString();
          node.style.transition = 'opacity 1s ease-in-out';
        }, delay * 1000);
      }
    };
    
    createCircuitNodes();
    window.addEventListener('resize', createCircuitNodes);
    return () => window.removeEventListener('resize', createCircuitNodes);
  }, []);

  const handleDownloadReport = () => {
    // In a real implementation, this would generate a PDF report
    alert('Report generation feature coming soon!');
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 circuit-pattern opacity-20 z-0"></div>
      <div ref={containerRef} className="absolute inset-0 z-0"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6">
            <h1 className="mb-4 text-neon-blue">
              ALSDD Project
              <span className="block text-neutral-100 text-2xl md:text-3xl mt-2">
                Advanced Log & Structure Demonstrator
              </span>
            </h1>
            
            <p className="mb-8 text-neutral-300 max-w-3xl mx-auto text-lg">
              First-Year, Second-Term Final Project • National School of Cyber Security
            </p>
            
            <div className="mb-10 text-neutral-400 text-sm">
              By Hassani Fateh · Abbaci Mohamed Sadek · Kassoul Mohamed Ali
            </div>
            
            <div className="text-sm text-neutral-400 mb-8">
              Presented to:
              <div className="mt-2 space-y-1">
                <p>Dr. Berghout Yasser Moussa - CS | PhD | AI/ML | Dev | Coaching </p>
                <p>Dr. Belayadi Djahida - Assistant Professort</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.a 
              href="#repos" 
              className="btn-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Github className="mr-2 h-5 w-5" />
              View Security Logs Manager
            </motion.a>
            
            <motion.a 
              href="#repos" 
              className="btn-secondary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Github className="mr-2 h-5 w-5" />
              View Dictionary Manager
            </motion.a>
          </div>
          
          <motion.button
            onClick={handleDownloadReport}
            className="btn-outline flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Project Report
          </motion.button>
        </motion.div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="p-6 rounded-xl glass-effect"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-orbitron mb-4 text-neon-blue">Binary Tree</h3>
            <div className="h-60 flex items-center justify-center relative">
              <BinaryTreeVisual />
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-xl glass-effect"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-xl font-orbitron mb-4 text-neon-green">Stack & Queue</h3>
            <div className="h-60 flex items-center justify-center">
              <StackQueueVisual />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-neon-blue flex justify-center">
          <motion.div 
            className="w-1.5 h-1.5 bg-neon-blue rounded-full"
            animate={{ 
              y: [4, 16, 4], 
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const BinaryTreeVisual: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 150" className="mx-auto">
      <g className="group">
        <circle 
          cx="100" 
          cy="20" 
          r="15" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700 group-hover:shadow-neon-blue" 
        />
        <text x="100" y="24" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">10</text>
      </g>
      
      <path 
        d="M90 30 L 60 60" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="50"
        strokeDashoffset="50"
        style={{
          animation: 'drawLine 1s forwards 0.3s'
        }}
      />
      
      <path 
        d="M110 30 L 140 60" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="50"
        strokeDashoffset="50"
        style={{
          animation: 'drawLine 1s forwards 0.5s'
        }}
      />
      
      <g className="group">
        <circle 
          cx="60" 
          cy="60" 
          r="12" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="60" y="63" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">5</text>
      </g>
      
      <g className="group">
        <circle 
          cx="140" 
          cy="60" 
          r="12" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="140" y="63" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">15</text>
      </g>
      
      <path 
        d="M53 70 L 30 100" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{
          animation: 'drawLine 1s forwards 0.7s'
        }}
      />
      
      <path 
        d="M67 70 L 80 100" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{
          animation: 'drawLine 1s forwards 0.9s'
        }}
      />
      
      <path 
        d="M133 70 L 120 100" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{
          animation: 'drawLine 1s forwards 1.1s'
        }}
      />
      
      <path 
        d="M147 70 L 170 100" 
        className="stroke-neon-blue stroke-2 opacity-60" 
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{
          animation: 'drawLine 1s forwards 1.3s'
        }}
      />
      
      <g className="group">
        <circle 
          cx="30" 
          cy="100" 
          r="10" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="30" y="103" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">2</text>
      </g>
      
      <g className="group">
        <circle 
          cx="80" 
          cy="100" 
          r="10" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="80" y="103" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">8</text>
      </g>
      
      <g className="group">
        <circle 
          cx="120" 
          cy="100" 
          r="10" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="120" y="103" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">12</text>
      </g>
      
      <g className="group">
        <circle 
          cx="170" 
          cy="100" 
          r="10" 
          className="fill-neutral-800 stroke-neon-blue stroke-2 transition-all duration-300 group-hover:fill-neutral-700" 
        />
        <text x="170" y="103" className="text-xs fill-neon-blue text-center font-mono" textAnchor="middle">20</text>
      </g>
      
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes drawLine {
              to {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 0.6;
              }
              50% {
                opacity: 1;
              }
            }
          `
        }}
      />
    </svg>
  );
};

const StackQueueVisual: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="h-1/2 p-2">
        <h4 className="text-sm mb-2 text-neon-green">Stack</h4>
        <div className="flex flex-col-reverse gap-1 h-24 justify-end">
          {[1, 2, 3, 4].map((val, index) => (
            <motion.div 
              key={`stack-${val}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-neutral-800 border border-neon-green px-4 py-1 text-xs rounded flex items-center justify-between"
            >
              <span>item-{val}</span>
              <span className="text-[10px] text-neon-green">push()</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="h-1/2 p-2">
        <h4 className="text-sm mb-2 text-neon-blue">Queue</h4>
        <div className="flex gap-1 h-12 items-center relative overflow-hidden">
          {[1, 2, 3, 4].map((val, index) => (
            <motion.div 
              key={`queue-${val}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
              className="min-w-12 bg-neutral-800 border border-neon-blue px-2 py-1 text-xs rounded text-center"
            >
              {val}
            </motion.div>
          ))}
          <motion.div 
            className="absolute top-0 right-0 bottom-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="text-[10px] text-neon-blue">
              enqueue()→
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;