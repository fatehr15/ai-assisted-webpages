import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trash2, Search, SortAsc, Undo2 } from 'lucide-react';

interface LogNode {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
}

const LinkedListVisual: React.FC = () => {
  const [nodes, setNodes] = useState<LogNode[]>([
    { id: '1', timestamp: '2024-02-20 10:00:00', severity: 'info', message: 'System startup' },
    { id: '2', timestamp: '2024-02-20 10:01:00', severity: 'warning', message: 'High CPU usage' },
    { id: '3', timestamp: '2024-02-20 10:02:00', severity: 'error', message: 'Connection failed' }
  ]);
  
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  const severityColors = {
    info: 'text-neon-blue',
    warning: 'text-yellow-400',
    error: 'text-red-500'
  };

  const handleOperation = (operation: string) => {
    setActiveOperation(operation);
    
    switch (operation) {
      case 'insertAtBeginning':
        const newNode: LogNode = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          severity: 'info',
          message: 'New log entry'
        };
        setNodes([newNode, ...nodes]);
        break;
        
      case 'deleteFirst':
        setNodes(nodes.slice(1));
        break;
        
      case 'reverse':
        setNodes([...nodes].reverse());
        break;
        
      case 'sort':
        setNodes([...nodes].sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
        break;
    }
    
    setTimeout(() => setActiveOperation(null), 1000);
  };

  return (
    <div className="p-6 rounded-xl bg-neutral-900/50 backdrop-blur-md">
      <h3 className="text-xl font-orbitron text-neon-blue mb-6">Singly Linked List Operations</h3>
      
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          onClick={() => handleOperation('insertAtBeginning')}
          className="btn-outline text-sm py-2"
        >
          Insert At Beginning
        </button>
        <button
          onClick={() => handleOperation('deleteFirst')}
          className="btn-outline text-sm py-2"
        >
          Delete First
        </button>
        <button
          onClick={() => handleOperation('reverse')}
          className="btn-outline text-sm py-2"
        >
          Reverse List
        </button>
        <button
          onClick={() => handleOperation('sort')}
          className="btn-outline text-sm py-2"
        >
          Sort by Timestamp
        </button>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`relative flex items-center ${
                index < nodes.length - 1 ? 'mb-8' : ''
              }`}
            >
              <div 
                className={`
                  p-4 rounded-lg bg-neutral-800 border border-neutral-700
                  ${highlightedNode === node.id ? 'ring-2 ring-neon-blue' : ''}
                  transition-all duration-300
                `}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-sm ${severityColors[node.severity]}`}>
                    {node.severity.toUpperCase()}
                  </span>
                  <span className="text-neutral-400 text-sm">{node.timestamp}</span>
                </div>
                <p className="text-neutral-200 mt-1">{node.message}</p>
              </div>
              
              {index < nodes.length - 1 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                      transition: { duration: 1.5, repeat: Infinity }
                    }}
                  >
                    <ChevronRight className="text-neon-blue transform rotate-90" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-8 text-sm text-neutral-400">
        {nodes.length} log entries in list
      </div>
    </div>
  );
};

export default LinkedListVisual;