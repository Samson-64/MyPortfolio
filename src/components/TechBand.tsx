import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  siReact,
  siTypescript,
  siNextdotjs,
  siTailwindcss,
  siJavascript,
  siNodedotjs,
} from 'simple-icons';
import { CLIENT_LOGOS } from '../data/portfolioData';
import { EASE_FLUID } from '../lib/motion';
import { Marquee } from './motion/Marquee';

const ICONS: Record<string, { path: string }> = {
  REACT: siReact,
  TYPESCRIPT: siTypescript,
  'NEXT.JS': siNextdotjs,
  TAILWIND: siTailwindcss,
  JAVASCRIPT: siJavascript,
  NODE: siNodedotjs,
};

const TechItem: React.FC<{ name: string; label: string }> = ({ name, label }) => {
  const icon = ICONS[name];

  return (
    <li className="flex items-center gap-2 hover:text-[#8C8984] transition-colors cursor-default">
      {icon && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="w-4 h-4 shrink-0"
        >
          <path d={icon.path} fill="currentColor" />
        </svg>
      )}
      <span>{label}</span>
    </li>
  );
};

export const TechBand: React.FC = () => {
  const reduce = useReducedMotion();

  // The trailing padding closes the seam where the two halves of the marquee
  // meet, so the gap between items stays uniform all the way round.
  const listClass = reduce
    ? 'flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12'
    : 'flex items-center gap-x-8 sm:gap-x-12 pr-8 sm:pr-12';

  return (
    <section aria-label="Core stack" className="border-t border-white/4">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_FLUID }}
        className="max-w-5xl mx-auto px-6 sm:px-8 py-10 text-sm font-mono tracking-widest text-[#7E7B76] uppercase"
      >
        <Marquee>
          <ul className={listClass}>
            {CLIENT_LOGOS.map((tech) => (
              <TechItem key={tech.name} name={tech.name} label={tech.label} />
            ))}
          </ul>
        </Marquee>
      </motion.div>
    </section>
  );
};
