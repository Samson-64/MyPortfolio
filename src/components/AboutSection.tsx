import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_FLUID } from '../lib/motion';
import { SplitHeading } from './motion/SplitHeading';
import { SpotlightLayers, useSpotlight } from './motion/Spotlight';
import cvPdf from '../assets/Doc/Samson_Mamuya_CV.pdf';

const SkillRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="group relative hover:text-[#ECE5DA] transition-colors">
    <span
      aria-hidden="true"
      className="absolute -left-3 top-1/2 h-px w-0 -translate-y-1/2 bg-[#E8DEC8] transition-[width] duration-300 group-hover:w-2.5"
    />
    <span>{children}</span>
  </li>
);

export const AboutSection: React.FC = () => {
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-5xl mx-auto border-t border-white/4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left: Heading & Bio */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_FLUID }}
          className="md:col-span-6 space-y-6"
        >
          <SplitHeading className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight text-balance">
            About &amp; Background
          </SplitHeading>

          <p className="text-base text-[#9A968F] leading-relaxed font-normal">
            I am a frontend developer and UI engineer based in Dar es Salaam, Tanzania. Over the past 4+ years, I have specialized in building modern React applications, crafting smooth component interactions with Tailwind CSS and Framer Motion, and integrating backend REST APIs.
          </p>

          <p className="text-sm text-[#9A968F] leading-relaxed font-normal">
            My primary strength is in frontend architecture, user experience, and responsive design, while continually expanding my knowledge in Node.js and backend engineering fundamentals.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono tracking-wider uppercase text-[#E8DEC8] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group"
            >
              <span className="relative">
                [ View Curriculum Vitae
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#E8DEC8] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→ ]</span>
            </a>
          </div>
        </motion.div>

        {/* Right: Skills Matrix */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_FLUID }}
          className="md:col-span-6 space-y-8"
        >
          {/* Skills 2-Column Minimal List */}
          <div
            ref={spotlight.ref}
            onPointerMove={spotlight.onPointerMove}
            className={`${spotlight.hostClassName} relative p-8 rounded-2xl bg-[#0C0C0C] border border-white/4 hover:border-white/10 transition-colors shadow-sm`}
          >
            <SpotlightLayers />

            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8984] block">
              Core Stack &amp; Skills
            </span>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-[#E8E2D8] block mb-2 font-mono">Frontend (Core)</span>
                <ul className="text-[#8C8984] space-y-1.5 font-normal">
                  <SkillRow>React 19 &amp; Next.js</SkillRow>
                  <SkillRow>TypeScript Architecture</SkillRow>
                  <SkillRow>Tailwind CSS &amp; Motion</SkillRow>
                  <SkillRow>Responsive UI &amp; Web Vitals</SkillRow>
                </ul>
              </div>
              <div>
                <span className="font-medium text-[#E8E2D8] block mb-2 font-mono">Backend (Foundations)</span>
                <ul className="text-[#8C8984] space-y-1.5 font-normal">
                  <SkillRow>Node.js &amp; Express (Basics)</SkillRow>
                  <SkillRow>REST &amp; WebSocket APIs</SkillRow>
                  <SkillRow>Git &amp; Version Control</SkillRow>
                  <SkillRow>PostgreSQL (Learning)</SkillRow>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
