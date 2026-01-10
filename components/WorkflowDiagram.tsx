import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Database, Network, AudioLines } from 'lucide-react';

const NODES = [
  { id: 'user', label: 'Caller', icon: Mic, x: '15%' },
  { id: 'voice', label: 'Voice Interface', icon: AudioLines, x: '38%' },
  { id: 'brain', label: 'Intelligence', icon: Network, x: '62%' },
  { id: 'actions', label: 'Systems', icon: Database, x: '85%' }
];

const PROCESS_STEPS = [
  { label: 'RECEIVING INPUT', active: 'user' },
  { label: 'PROCESSING SPEECH', active: 'voice' },
  { label: 'ANALYZING INTENT', active: 'brain' },
  { label: 'EXECUTING ACTIONS', active: 'actions' }
];

export const WorkflowDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/50 border border-white/10 rounded-xl p-8 md:p-20 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center backdrop-blur-sm shadow-2xl">
      {/* Background Grid - kept subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />

      {/* Top Left: Activity Log - Minimalist */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
         <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
         <AnimatePresence mode="wait">
             <motion.span 
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase"
             >
                {PROCESS_STEPS[step].label}
             </motion.span>
         </AnimatePresence>
      </div>

      {/* Diagram Container */}
      <div className="relative w-full max-w-5xl h-[200px] flex items-center justify-center z-10">
        
        {/* Connecting Lines */}
        {NODES.slice(0, -1).map((node, i) => {
            const nextNode = NODES[i + 1];
            // Active if current step is the source node
            const isActive = step === i;
            
            return (
                <div 
                    key={`line-${i}`}
                    className="absolute h-px bg-white/5 overflow-hidden"
                    style={{ 
                        left: node.x, 
                        right: `calc(100% - ${nextNode.x})`, 
                        top: '50%' 
                    }}
                >
                    <motion.div 
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={isActive ? { x: '100%', opacity: [0, 1, 0] } : { opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                    />
                </div>
            );
        })}

        {/* Nodes */}
        {NODES.map((node, index) => {
            const isActive = step === index;
            
            return (
                <div 
                    key={node.id} 
                    className="absolute top-1/2 -translate-y-1/2 transform -translate-x-1/2 flex flex-col items-center"
                    style={{ left: node.x }}
                >
                     {/* The Node Circle */}
                     <motion.div 
                        animate={{ 
                            scale: isActive ? 1.1 : 1,
                            borderColor: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
                            backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.5)',
                            boxShadow: isActive ? '0 0 50px rgba(255,255,255,0.15)' : '0 0 0 rgba(0,0,0,0)'
                        }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center relative z-20 backdrop-blur-md"
                     >
                        <node.icon 
                            strokeWidth={1}
                            className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`} 
                        />
                        
                        {/* Elegant Ripple Effect when active */}
                        <AnimatePresence>
                            {isActive && (
                                <>
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                        className="absolute inset-0 rounded-full border border-white/20"
                                    />
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.3 }}
                                        animate={{ scale: 1.8, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeOut" }}
                                        className="absolute inset-0 rounded-full border border-white/10"
                                    />
                                </>
                            )}
                        </AnimatePresence>
                     </motion.div>

                     {/* Label */}
                     <motion.div 
                        animate={{ 
                            opacity: isActive ? 1 : 0.3,
                            y: isActive ? 0 : 5
                        }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 text-center"
                     >
                         <div className="text-xs md:text-sm font-serif italic tracking-wide text-white">{node.label}</div>
                     </motion.div>
                </div>
            );
        })}

      </div>
    </div>
  );
};