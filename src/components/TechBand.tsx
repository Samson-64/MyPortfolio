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

const ICONS: Record<string, { path: string }> = {
  REACT: siReact,
  TYPESCRIPT: siTypescript,
  'NEXT.JS': siNextdotjs,
  TAILWIND: siTailwindcss,
  JAVASCRIPT: siJavascript,
  NODE: siNodedotjs,
};

export const TechBand: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Core stack" className="border-t border-white/4">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 text-sm font-mono tracking-widest text-[#7E7B76] uppercase">
          {CLIENT_LOGOS.map((tech, idx) => {
            const icon = ICONS[tech.name];
            return (
              <motion.li
                key={tech.name}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex items-center gap-2 hover:text-[#8C8984] transition-colors cursor-default"
              >
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
                <span>{tech.label}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
