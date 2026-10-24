import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

interface SplashScreenProps {
  onComplete?: () => void;
  isLoading?: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, isLoading = true }) => {
  const [show, setShow] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && minTimeElapsed) {
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, minTimeElapsed, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(265_45%_18%/0.4),transparent_70%)]" />
          
          <div className="relative flex flex-col items-center gap-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.8 }
              }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />
              <Logo size="xl" />
            </motion.div>

            <div className="flex flex-col items-center gap-4 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white text-2xl font-black tracking-[0.2em] uppercase"
              >
                PCH
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-primary/60 text-[10px] font-bold uppercase tracking-[0.5em] max-w-[200px] leading-loose"
              >
                Poesia Cognitiva Hipnótica
              </motion.p>
            </div>

            {/* Loading Bar */}
            <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden mt-4">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              />
            </div>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.3em]">
              Sua jornada começa aqui
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
