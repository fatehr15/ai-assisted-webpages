import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCircleProps {
  value: number;
  label: string;
  color: string;
  icon: any;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ value, label, color, icon: Icon }) => {
  const circumference = 2 * Math.PI * 40; // radius = 40
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-hippie-blue/20"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
      
      <div className="text-center mt-4">
        <div className={`text-2xl font-bold ${color}`}>{value}%</div>
        <div className="text-hippie-blue">{label}</div>
      </div>
    </div>
  );
};

export default ProgressCircle;