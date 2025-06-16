import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onComplete, 600);
      }, 400);
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          onClick={handleClick}
        >
          <AnimatePresence>
            {!hasInteracted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center relative z-10 px-6"
              >
                {/* Minimal Logo */}
                <motion.div
                  className="mb-12 relative"
                >
                  <motion.div 
                    className="w-32 h-32 mx-auto"
                    animate={{
                      scale: [1, 0.97, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      {/* Main Fridge Body */}
                      <rect 
                        x="4" 
                        y="2" 
                        width="12" 
                        height="20" 
                        rx="2" 
                        fill="#3B82F6"
                        className="fill-[#2B4D66]"
                      />
                      {/* Light Blue Front */}
                      <rect 
                        x="5" 
                        y="3" 
                        width="10" 
                        height="18" 
                        rx="1"
                        fill="#7DD3FC"
                        className="fill-[#7DD3FC]"
                      />
                      {/* Fridge Division Line */}
                      <rect
                        x="5"
                        y="9"
                        width="10"
                        height="1"
                        fill="#2B4D66"
                      />
                      {/* Handle Top */}
                      <rect
                        x="6"
                        y="5"
                        width="2"
                        height="2"
                        fill="#2B4D66"
                      />
                      {/* Handle Bottom */}
                      <rect
                        x="6"
                        y="12"
                        width="2"
                        height="4"
                        fill="#2B4D66"
                      />
                      {/* Plus Sign */}
                      <path
                        d="M8 6.5h2M9 5.5v2"
                        stroke="#2B4D66"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                      />
                      {/* RFID Waves */}
                      <path
                        d="M17 6C18.5 8 19 10 19 12C19 14 18.5 16 17 18"
                        stroke="#2B4D66"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M18.5 4C20.5 6.5 21 9.25 21 12C21 14.75 20.5 17.5 18.5 20"
                        stroke="#2B4D66"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#2B4D66] to-transparent"
                    animate={{
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Welcome Text */}
                <motion.div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-[#2B4D66] text-3xl font-semibold tracking-wide mb-1"
                  >
                    FreshFridge
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-[#2B7C85] text-sm font-medium tracking-[0.2em] uppercase"
                  >
                    RFID Inventory Management
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-gray-500 text-sm font-light pt-4"
                  >
                    tap to begin
                  </motion.p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  className="w-6 h-6 border border-blue-600 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    ease: "linear",
                    repeat: Infinity
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 