import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, CLIENT_LOGOS } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenResume }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col items-center justify-start pt-24 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Moody Developer Portrait with Smooth Vignette matching template */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 mb-6 pointer-events-none"
        >
          {/* Subtle Radial Gradient Vignette over image */}
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img
              src="/src/assets/images/hero_moody_portrait_1787407878893.jpg"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            />
            {/* Smooth Edge Blend */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808]" />
          </div>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(8,8,8,1)]" />
        </motion.div>

        {/* Calm, Elegant Editorial Serif Headline matching template */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="space-y-3"
        >
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-[76px] font-light text-[#E8E2D8] tracking-tight leading-[1.04]">
            Frontend Developer <br />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="italic font-serif font-light text-[#DCD4C7] inline-block"
            >
              &amp; UI Engineer
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md mx-auto text-xs sm:text-sm text-[#7D7A75] leading-relaxed pt-2 font-normal"
          >
            Specializing in high-performance React applications, clean TypeScript code, and refined user interfaces.
          </motion.p>
        </motion.div>

        {/* Minimal Scroll / Services Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-6"
        >
          <button
            id="hero-services-btn"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#0E0E0E]/80 text-[#8C8984] hover:text-[#ECE5DA] hover:border-white/[0.16] text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer group hover:bg-[#151515]"
          >
            <span>My Services</span>
            <motion.span
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3 h-3 text-[#777] group-hover:text-[#ECE5DA] transition-colors" />
            </motion.span>
          </button>
        </motion.div>

        {/* Tech Logos Row matching template with staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-full pt-16 mt-6 border-t border-white/[0.04]"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs font-mono tracking-widest text-[#504E4B] uppercase">
            {CLIENT_LOGOS.map((tech, idx) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.06 }}
                className="hover:text-[#8C8984] transition-colors cursor-default"
              >
                {tech.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
