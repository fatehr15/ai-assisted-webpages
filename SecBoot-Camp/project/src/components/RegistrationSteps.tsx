import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import { useSoundContext } from './SoundContext';

interface Step {
  title: string;
  description: string;
  icon: any;
  quote: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

const steps: Step[] = [
  {
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: Shield,
    quote: "Every champion's journey begins with a single step."
  },
  {
    title: "Team Formation",
    description: "Build your cyber squad",
    icon: Users,
    quote: "Together we stand, divided we fall. Choose your team wisely."
  },
  {
    title: "Competition Details",
    description: "Choose your battleground",
    icon: Trophy,
    quote: "Victory belongs to those who dare to challenge themselves."
  }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-golden-dream text-blue-zodiac'
                      : isCurrent
                      ? 'bg-hippie-blue text-citrine-white'
                      : 'bg-blue-zodiac/50 text-hippie-blue'
                  } transition-all duration-300`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-full h-0.5 bg-hippie-blue/30">
                    <div
                      className="h-full bg-golden-dream transition-all duration-300"
                      style={{
                        width: isCompleted ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-citrine-white">
                  {step.title}
                </div>
                <div className="text-xs text-hippie-blue">
                  {step.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        className="relative h-2 bg-hippie-blue/20 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full bg-golden-dream"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.div
        className="mt-4 text-center text-hippie-blue italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={currentStep}
      >
        "{steps[currentStep].quote}"
      </motion.div>
    </div>
  );
};

export default steps;