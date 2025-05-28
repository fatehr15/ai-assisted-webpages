import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Trash2, Search, SortAsc, Undo2, Info } from 'lucide-react';
import BSTVisual from './visualizations/BSTVisual';

interface LogNode {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
}

const DataStructureVisuals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linkedList' | 'stack' | 'queue' | 'tree'>('linkedList');
  const [showExplanation, setShowExplanation] = useState(false);
  
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-orbitron text-neon-blue">Data Structure Operations</h2>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center text-neutral-400 hover:text-neon-blue transition-colors"
          >
            <Info className="w-5 h-5 mr-2" />
            How it works
          </button>
        </div>
        
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700"
          >
            <h3 className="text-lg font-semibold text-neon-blue mb-2">Understanding Data Structures</h3>
            <p className="text-neutral-300 mb-4">
              Each visualization demonstrates common operations on different data structures.
              Click the operations buttons to see how they affect the structure in real-time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-neon-blue mb-2">Linked List</h4>
                <ul className="list-disc list-inside text-neutral-400">
                  <li>Nodes are connected sequentially</li>
                  <li>Each node points to the next node</li>
                  <li>Efficient for insertions and deletions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-neon-green mb-2">Stack</h4>
                <ul className="list-disc list-inside text-neutral-400">
                  <li>Last-In-First-Out (LIFO) structure</li>
                  <li>Push adds to top, Pop removes from top</li>
                  <li>Used for function calls, undo operations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <TabButton 
            active={activeTab === 'linkedList'} 
            onClick={() => setActiveTab('linkedList')}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            Linked List
          </TabButton>
          <TabButton 
            active={activeTab === 'stack'} 
            onClick={() => setActiveTab('stack')}
            icon={<Plus className="w-4 h-4" />}
          >
            Stack
          </TabButton>
          <TabButton 
            active={activeTab === 'queue'} 
            onClick={() => setActiveTab('queue')}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            Queue
          </TabButton>
          <TabButton 
            active={activeTab === 'tree'} 
            onClick={() => setActiveTab('tree')}
            icon={<ChevronRight className="w-4 h-4 rotate-90" />}
          >
            Binary Tree
          </TabButton>
        </div>
        
        <div className="bg-neutral-900/50 rounded-xl p-6 backdrop-blur">
          <AnimatePresence mode="wait">
            {activeTab === 'linkedList' && <LinkedListVisual key="linkedList" />}
            {activeTab === 'stack' && <StackVisual key="stack" />}
            {activeTab === 'queue' && <QueueVisual key="queue" />}
            {activeTab === 'tree' && <BSTVisual key="tree" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center px-4 py-2 rounded-lg transition-all duration-300
      ${active 
        ? 'bg-neon-blue/20 text-neon-blue' 
        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}
    `}
  >
    {icon}
    <span className="ml-2">{children}</span>
  </button>
);

const LinkedListVisual: React.FC = () => {
  const [nodes, setNodes] = useState<LogNode[]>([
    { id: '1', timestamp: '10:00:00', severity: 'info', message: 'System startup' },
    { id: '2', timestamp: '10:01:00', severity: 'warning', message: 'High CPU usage' },
    { id: '3', timestamp: '10:02:00', severity: 'error', message: 'Connection failed' }
  ]);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  const handleOperation = async (operation: string) => {
    setActiveOperation(operation);
    
    switch (operation) {
      case 'insertAtBeginning':
        const newNode: LogNode = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          severity: 'info',
          message: 'New log entry'
        };
        setHighlightedNode(newNode.id);
        setNodes([newNode, ...nodes]);
        break;
        
      case 'deleteFirst':
        setHighlightedNode(nodes[0].id);
        await new Promise(resolve => setTimeout(resolve, 500));
        setNodes(nodes.slice(1));
        break;
        
      case 'reverse':
        setNodes([...nodes].reverse());
        break;
    }
    
    setTimeout(() => {
      setActiveOperation(null);
      setHighlightedNode(null);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neon-blue mb-2">Linked List Operations</h3>
        <p className="text-neutral-400 text-sm">
          A linked list is a linear data structure where elements are stored in nodes, 
          and each node points to the next node in the sequence.
        </p>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => handleOperation('insertAtBeginning')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'insertAtBeginning' ? 'bg-neon-blue/20' : ''
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Insert at Beginning
          <motion.div
            className="absolute inset-0 bg-neon-blue/20"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: activeOperation === 'insertAtBeginning' ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          />
        </button>
        
        <button 
          onClick={() => handleOperation('deleteFirst')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'deleteFirst' ? 'bg-neon-red/20' : ''
          }`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete First
          <motion.div
            className="absolute inset-0 bg-neon-red/20"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: activeOperation === 'deleteFirst' ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          />
        </button>
        
        <button 
          onClick={() => handleOperation('reverse')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'reverse' ? 'bg-neon-green/20' : ''
          }`}
        >
          <Undo2 className="w-4 h-4 mr-2" />
          Reverse
          <motion.div
            className="absolute inset-0 bg-neon-green/20"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: activeOperation === 'reverse' ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          />
        </button>
      </div>

      <div className="space-y-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: highlightedNode === node.id ? 1.05 : 1,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, x: 20 }}
            className={`relative transition-all duration-300 ${
              highlightedNode === node.id ? 'z-10' : 'z-0'
            }`}
          >
            <div className={`
              bg-neutral-800 p-4 rounded-lg border-2 transition-all duration-300
              ${highlightedNode === node.id 
                ? 'border-neon-blue shadow-lg shadow-neon-blue/20' 
                : 'border-transparent'
              }
            `}>
              <div className="flex items-center gap-4">
                <span className={`text-${
                  node.severity === 'info' 
                    ? 'neon-blue' 
                    : node.severity === 'warning' 
                    ? 'yellow-400' 
                    : 'red-500'
                }`}>
                  {node.severity.toUpperCase()}
                </span>
                <span className="text-neutral-400">{node.timestamp}</span>
              </div>
              <p className="text-neutral-200 mt-1">{node.message}</p>
            </div>
            
            {index < nodes.length - 1 && (
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, 2, 0],
                  transition: { 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <ChevronRight className="text-neon-blue transform rotate-90" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-sm text-neutral-400">
        {nodes.length} nodes in list
      </div>
    </motion.div>
  );
};

const StackVisual: React.FC = () => {
  const [stack, setStack] = useState<string[]>(['Data 3', 'Data 2', 'Data 1']);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  const handleOperation = async (operation: string) => {
    setActiveOperation(operation);
    
    if (operation === 'push') {
      setStack([`Data ${stack.length + 1}`, ...stack]);
    } else if (operation === 'pop') {
      setStack(stack.slice(1));
    }
    
    setTimeout(() => setActiveOperation(null), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neon-green mb-2">Stack Operations</h3>
        <p className="text-neutral-400 text-sm">
          A stack follows the Last-In-First-Out (LIFO) principle. New elements are added 
          to the top and removed from the top.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => handleOperation('push')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'push' ? 'bg-neon-green/20' : ''
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Push
        </button>
        <button 
          onClick={() => handleOperation('pop')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'pop' ? 'bg-neon-red/20' : ''
          }`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Pop
        </button>
      </div>

      <div className="flex flex-col-reverse items-center space-y-reverse space-y-2">
        {stack.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: activeOperation === 'pop' && index === 0 ? -20 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`
              w-64 p-4 rounded-lg text-center transition-colors duration-300
              ${index === 0 ? 'bg-neon-green/20 border-2 border-neon-green' : 'bg-neutral-800'}
            `}
          >
            {item}
          </motion.div>
        ))}
        <div className="w-72 h-1 bg-neutral-700 rounded-full mt-4" />
      </div>

      <div className="mt-6 text-sm text-neutral-400">
        Stack size: {stack.length}
      </div>
    </motion.div>
  );
};

const QueueVisual: React.FC = () => {
  const [queue, setQueue] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  const handleOperation = async (operation: string) => {
    setActiveOperation(operation);
    
    if (operation === 'enqueue') {
      setQueue([...queue, `Item ${queue.length + 1}`]);
    } else if (operation === 'dequeue') {
      setQueue(queue.slice(1));
    }
    
    setTimeout(() => setActiveOperation(null), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neon-blue mb-2">Queue Operations</h3>
        <p className="text-neutral-400 text-sm">
          A queue follows the First-In-First-Out (FIFO) principle. Elements are added 
          to the back and removed from the front.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => handleOperation('enqueue')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'enqueue' ? 'bg-neon-blue/20' : ''
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Enqueue
        </button>
        <button 
          onClick={() => handleOperation('dequeue')} 
          className={`btn-outline relative overflow-hidden ${
            activeOperation === 'dequeue' ? 'bg-neon-red/20' : ''
          }`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Dequeue
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {queue.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: activeOperation === 'dequeue' && index === 0 ? 0.8 : 1,
              }}
              exit={{ opacity: 0, x: -50 }}
              className={`
                flex-shrink-0 w-32 p-4 rounded-lg text-center transition-all duration-300
                ${index === 0 
                  ? 'bg-neon-blue/20 border-2 border-neon-blue' 
                  : index === queue.length - 1 && activeOperation === 'enqueue'
                  ? 'bg-neon-green/20 border-2 border-neon-green'
                  : 'bg-neutral-800'
                }
              `}
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            background: activeOperation 
              ? 'linear-gradient(90deg, rgba(0,245,255,0.1) 0%, rgba(30,30,47,0) 100%)' 
              : 'none'
          }}
        />
      </div>

      <div className="mt-6 text-sm text-neutral-400">
        Queue size: {queue.length}
      </div>
    </motion.div>
  );
};

export default DataStructureVisuals;