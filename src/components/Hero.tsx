import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { EASE_FLUID } from '../lib/motion';
import { SplitHeading } from './motion/SplitHeading';
import { Parallax } from './motion/Parallax';
import { Magnetic } from './motion/Magnetic';
import heroPortraitImg from '../assets/images/heroImg.jpeg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[92dvh] flex flex-col items-center justify-start pt-24 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* Marker at 75% of the hero: BackToTop reveals once it leaves the viewport */}
      <div
        id="hero-scroll-marker"
        aria-hidden="true"
        className="absolute top-[75%] left-0 h-px w-px"
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Moody Developer Portrait with Smooth Vignette matching template */}
        <Parallax className="w-44 h-44 sm:w-56 sm:h-56 mb-6 pointer-events-none">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE_FLUID }}
            className="relative w-full h-full"
          >
            {/* Subtle Radial Gradient Vignette over image */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src={heroPortraitImg}
                alt={PERSONAL_INFO.name}
                className="object-cover contrast-125"
              />
              {/* Smooth Edge Blend */}
              <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808]" />
            </div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(8,8,8,1)]" />
          </motion.div>
        </Parallax>

        {/* Calm, Elegant Editorial Serif Headline matching template */}
        <div className="space-y-3">
          <SplitHeading
            as="h1"
            mode="mount"
            delay={0.15}
            className="font-serif text-4xl sm:text-6xl lg:text-[84px] font-light text-[#E8E2D8] tracking-tight leading-[1.1] pb-1 text-balance"
          >
            Frontend Developer
            <br />
            <span className="italic font-serif font-light text-[#DCD4C7]">
              &amp; UI Engineer
            </span>
          </SplitHeading>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md mx-auto text-sm sm:text-base text-[#9A968F] leading-relaxed pt-2 font-normal"
          >
            Specializing in high-performance React applications, clean TypeScript code, and refined user interfaces.
          </motion.p>
        </div>

        {/* Secondary nav pill */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-6"
        >
          <Magnetic className="inline-flex">
            <button
              id="hero-services-btn"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/8 bg-[#0E0E0E]/80 text-[#8C8984] hover:text-[#ECE5DA] hover:border-white/20 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer group hover:bg-[#151515] active:scale-[0.98]"
            >
              Services
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
