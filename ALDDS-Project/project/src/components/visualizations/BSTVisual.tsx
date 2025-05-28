import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Shuffle } from 'lucide-react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BSTVisual: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [activeOperation, setActiveOperation] = useState<'insert' | 'remove' | 'clear' | 'traverse' | 'random' | null>(null);
  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);
  const [traversalSequence, setTraversalSequence] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // update container size
  useEffect(() => {
    const update = () => containerRef.current && setContainerWidth(containerRef.current.offsetWidth);
    update(); window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // insert single
  const insertNode = (value: number) => {
    setActiveOperation('insert');
    setRoot(prev => {
      const newNode: TreeNode = { value, left: null, right: null };
      if (!prev) return newNode;
      const queue: TreeNode[] = [prev];
      while (queue.length) {
        const node = queue.shift()!;
        if (!node.left) { node.left = newNode; break; }
        queue.push(node.left);
        if (!node.right) { node.right = newNode; break; }
        queue.push(node.right);
      }
      return { ...prev };
    });
    setHighlightedValue(value);
    delay(800).then(() => {
      setHighlightedValue(null);
      setActiveOperation(null);
    });
  };

  // remove last
  const removeLast = () => {
    if (!root) return;
    setActiveOperation('remove');
    setRoot(prev => {
      if (!prev) return null;
      const queue: TreeNode[] = [prev];
      let last: TreeNode | null = null;
      let parent: TreeNode | null = null;
      while (queue.length) {
        const node = queue.shift()!;
        if (node.left) { parent = node; queue.push(node.left); last = node.left; }
        if (node.right) { parent = node; queue.push(node.right); last = node.right; }
      }
      if (parent && last) {
        if (parent.left === last) parent.left = null; else parent.right = null;
        return { ...prev };
      }
      return null;
    });
    delay(500).then(() => setActiveOperation(null));
  };

  // clear
  const clearTree = () => {
    setActiveOperation('clear');
    setRoot(null);
    setTraversalSequence([]);
    delay(300).then(() => setActiveOperation(null));
  };

  // random tree generator
  const generateRandomTree = async (count: number) => {
    setActiveOperation('random');
    setRoot(null);
    await delay(300);
    for (let i = 0; i < count; i++) {
      const val = Math.floor(Math.random() * 100);
      // direct insert without highlight delays
      setRoot(prev => {
        const newNode: TreeNode = { value: val, left: null, right: null };
        if (!prev) return newNode;
        const queue: TreeNode[] = [prev];
        while (queue.length) {
          const node = queue.shift()!;
          if (!node.left) { node.left = newNode; break; }
          queue.push(node.left);
          if (!node.right) { node.right = newNode; break; }
          queue.push(node.right);
        }
        return { ...prev };
      });
      await delay(200);
    }
    setActiveOperation(null);
  };

  // traversal
  const getTraversal = (method: 'pre' | 'in' | 'post') => {
    const seq: number[] = [];
    const dfs = (node: TreeNode | null) => {
      if (!node) return;
      if (method === 'pre') seq.push(node.value);
      dfs(node.left);
      if (method === 'in') seq.push(node.value);
      dfs(node.right);
      if (method === 'post') seq.push(node.value);
    };
    dfs(root);
    return seq;
  };

  const animateTraversal = async (method: 'pre' | 'in' | 'post') => {
    if (!root) return;
    setActiveOperation('traverse');
    const seq = getTraversal(method);
    setTraversalSequence(seq);
    for (const v of seq) {
      setHighlightedValue(v);
      await delay(500);
    }
    setHighlightedValue(null);
    setActiveOperation(null);
  };

  // layout
  const nodes: TreeNode[] = [];
  const links: { from: TreeNode; to: TreeNode }[] = [];
  const sX = 80, sY = 100;
  const compute = (n: TreeNode | null, d = 0, xO = 0): number => {
    if (!n) return 0;
    const lC = compute(n.left, d+1, xO);
    const x = xO + lC * sX;
    n.x = x; n.y = d * sY;
    nodes.push(n);
    if (n.left) links.push({ from: n, to: n.left });
    if (n.right) links.push({ from: n, to: n.right });
    const rC = compute(n.right, d+1, xO + (lC+1)*sX);
    return lC + 1 + rC;
  };
  if (root) compute(root);
  if (nodes.length && containerWidth) {
    const xs = nodes.map(n=>n.x!), minX = Math.min(...xs), maxX = Math.max(...xs)+sX;
    const shift = containerWidth/2 - (minX + (maxX-minX)/2);
    nodes.forEach(n=>{n.x!+=shift; n.y!+=20;});
  }

  return (
    <AnimatePresence>
      <motion.div key="tree" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-neon-blue mb-2">Binary Tree Visualizer</h3>
          <p className="text-neutral-400 text-sm">Each node has at most two children.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <input type="number" value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder="Value" className="input w-20" />
          <button onClick={()=>{if(inputValue){insertNode(+inputValue); setInputValue('');}}} className={`btn ${activeOperation==='insert'?'bg-neon-blue/20':'btn-outline'}`}><Plus className="w-4 h-4 mr-1"/>Add</button>
          <button onClick={removeLast} className={`btn ${activeOperation==='remove'?'bg-red-600/20':'btn-outline'}`}><Trash2 className="w-4 h-4 mr-1"/>Remove</button>
          <button onClick={clearTree} className={`btn ${activeOperation==='clear'?'bg-red-600/20':'btn-outline'}`}>Clear</button>
          <button onClick={()=>generateRandomTree(7)} className={`btn ${activeOperation==='random'?'bg-neon-blue/20':'btn-outline'}`}><Shuffle className="w-4 h-4 mr-1"/>Random</button>
          <button onClick={()=>animateTraversal('pre')} className="btn-outline">Preorder</button>
          <button onClick={()=>animateTraversal('in')} className="btn-outline">Inorder</button>
          <button onClick={()=>animateTraversal('post')} className="btn-outline">Postorder</button>
        </div>

        {traversalSequence.length>0 && <div className="mb-6 text-neutral-300">Traversal: {traversalSequence.join(' → ')}</div>}

        <div ref={containerRef} className="relative h-[450px] w-full border border-neutral-700 rounded-lg bg-neutral-900">
          <svg className="absolute inset-0 w-full h-full">
            {links.map((l, i)=><line key={i} x1={l.from.x!+24} y1={l.from.y!+24} x2={l.to.x!+24} y2={l.to.y!+24} className="stroke-neutral-700" strokeWidth={2}/>)}
          </svg>
          {nodes.map(n=>(
            <motion.div key={`${n.value}-${n.x}`} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale: highlightedValue===n.value?1.3:1}} style={{left:n.x, top:n.y}} className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 text-white font-medium ${highlightedValue===n.value?'bg-neon-blue/20 border-2 border-neon-blue shadow-lg shadow-neon-blue/20':'bg-neutral-800 border border-neutral-700'}`}>{n.value}</motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BSTVisual;
