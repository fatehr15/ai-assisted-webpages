import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  techStack: string[];
  codeSnippet: string;
  githubUrl: string;
}

const repositories: Repository[] = [
  {
    id: 1,
    name: 'Security Logs Manager',
    description: 'Real-time ingestion, storage & analysis using linked lists, queues, and stacks.',
    language: 'C',
    techStack: ['Linked Lists', 'Queues', 'Stacks', 'File I/O'],
    codeSnippet: ``,
    githubUrl: 'https://github.com/AbbaciMohamed/project-1-Advenced-c-library'
  },
  {
    id: 2,
    name: 'Dictionary Manager',
    description: 'AVL-balanced BST for fast lookups, with linked lists for synonyms & antonyms.',
    language: 'C',
    techStack: ['AVL Trees', 'Binary Search Trees', 'Linked Lists'],
    codeSnippet: ``,
    githubUrl: 'https://github.com/AbbaciMohamed/project-2-C-Advenced-library'
  }
];

const RepositorySection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="repos" className="py-20 relative overflow-hidden bg-base/90" ref={ref}>
      <div className="absolute inset-0 circuit-pattern opacity-10 z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="section-title">
          <h2 className="text-neon-red mb-4">GitHub Repositories</h2>
          <p className="text-neutral-300 max-w-3xl mx-auto">
            Explore our code repositories and implementation details
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {repositories.map((repo, index) => (
            <RepositoryCard 
              key={repo.id} 
              repository={repo} 
              index={index} 
              inView={inView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface RepositoryCardProps {
  repository: Repository;
  index: number;
  inView: boolean;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository, index, inView }) => {
  const [showCode, setShowCode] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
      className="h-full"
    >
      <div 
        className={`neon-border h-full ${showCode ? 'bg-neutral-900/90' : 'bg-neutral-900/70'} rounded-lg overflow-hidden transition-all duration-500`}
      >
        <div className="relative z-10 h-full p-6 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl text-white">{repository.name}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-neon-red/20 text-neon-red">
              {repository.language}
            </span>
          </div>
          
          <p className="text-neutral-300 mb-4">
            {repository.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {repository.techStack.map(tech => (
              <span 
                key={tech} 
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-400 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mt-auto flex flex-col space-y-4">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center text-sm text-neutral-300 hover:text-neon-blue transition-colors"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showCode ? 'rotate-90' : ''}`} />
              {showCode ? 'Hide Code Sample' : 'View Code Sample'}
            </button>
            
            {showCode && (
              <div className="bg-neutral-950 rounded p-3 text-xs overflow-x-auto">
                <pre className="text-neutral-300 font-mono whitespace-pre-wrap">
                  <code>{repository.codeSnippet}</code>
                </pre>
              </div>
            )}
            
            <a 
              href={repository.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center w-full"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RepositorySection;