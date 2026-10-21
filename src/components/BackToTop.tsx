import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getLenis } from '../lib/lenis';
import { subscribeScrollProgress } from '../lib/scrollProgress';

const RING_RADIUS = 7;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export const BackToTop: React.FC = () => {
  const reduce = useReducedMotion();
  const [showButton, setShowButton] = useState(false);
  const progressRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const marker = document.getElementById('hero-scroll-marker');
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowButton(!entry.isIntersecting);
    });

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  // The ring around the arrow doubles as a scroll progress indicator.
  useEffect(() => {
    const circle = progressRef.current;
    if (!circle) return;

    return subscribeScrollProgress((progress) => {
      circle.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progress));
    });
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
          <span className="relative grid h-5 w-5 place-items-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="8"
                cy="8"
                r={RING_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              <circle
                ref={progressRef}
                cx="8"
                cy="8"
                r={RING_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE}
              />
            </svg>
            <ArrowUp className="relative h-3 w-3 transition-transform group-hover:-translate-y-px" />
          </span>
          <span className="hidden sm:inline font-mono uppercase tracking-wider text-xs">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
