import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getLenis } from '../lib/lenis';

export const BackToTop: React.FC = () => {
  const reduce = useReducedMotion();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const marker = document.getElementById('hero-scroll-marker');
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowButton(!entry.isIntersecting);
    });

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          id="back-to-top-btn"
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0E0E0E]/90 hover:bg-[#E8DEC8] border border-white/6 hover:border-[#E8DEC8] text-[#8C8984] hover:text-[#080808] text-[13px] font-mono shadow-xl backdrop-blur-md transition-colors cursor-pointer group active:scale-95"
        >
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden sm:inline font-mono uppercase tracking-wider text-xs">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
