import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, title, children }) => {
  const { playClick, playUnlock } = useSoundContext();

  React.useEffect(() => {
    if (isOpen) {
      playUnlock();
    }
  }, [isOpen, playUnlock]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-blue-zodiac/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50
                     bg-blue-zodiac/90 backdrop-blur-md rounded-lg border border-hippie-blue/30 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-semibold text-golden-dream"
              >
                {title}
              </motion.h3>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-2 hover:bg-hippie-blue/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-hippie-blue" />
              </button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="typing-effect"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailsModal;