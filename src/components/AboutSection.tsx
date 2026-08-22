import React from 'react';
import { motion } from 'motion/react';
import { WORK_EXPERIENCE } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-20 px-6 sm:px-8 max-w-5xl mx-auto border-t border-white/4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left: Heading & Bio */}
        <motion.div
          initial={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="md:col-span-6 space-y-6"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight">
            About &amp; Background
          </h2>

          <p className="text-base text-[#8C8984] leading-relaxed font-normal">
            I am a frontend developer and UI engineer based in Dar es Salaam, Tanzania. Over the past 4+ years, I have specialized in building modern React applications, crafting smooth component interactions with Tailwind CSS and Framer Motion, and integrating backend REST APIs.
          </p>

          <p className="text-sm text-[#73706B] leading-relaxed font-normal">
            My primary strength is in frontend architecture, user experience, and responsive design, while continually expanding my knowledge in Node.js and backend engineering fundamentals.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onOpenResume}
              className="text-sm font-mono tracking-wider uppercase text-[#E8DEC8] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group"
            >
              <span>[ View Curriculum Vitae</span>
              <span className="group-hover:translate-x-1 transition-transform">→ ]</span>
            </button>
          </div>
        </motion.div>

        {/* Right: Skills Matrix & Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="md:col-span-6 space-y-8"
        >
          {/* Skills 2-Column Minimal List */}
          <div className="p-8 rounded-2xl bg-[#0C0C0C] border border-white/4 space-y-5 hover:border-white/10 transition-colors shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-[#66635F] block">
              Core Stack &amp; Skills
            </span>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-[#E8E2D8] block mb-2 font-mono">Frontend (Core)</span>
                <ul className="text-[#7A7773] space-y-1.5 font-normal">
                  <li className="hover:text-[#ECE5DA] transition-colors">React 19 &amp; Next.js</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">TypeScript Architecture</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">Tailwind CSS &amp; Motion</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">Responsive UI &amp; Web Vitals</li>
                </ul>
              </div>
              <div>
                <span className="font-medium text-[#E8E2D8] block mb-2 font-mono">Backend (Foundations)</span>
                <ul className="text-[#7A7773] space-y-1.5 font-normal">
                  <li className="hover:text-[#ECE5DA] transition-colors">Node.js &amp; Express (Basics)</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">REST &amp; WebSocket APIs</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">Git &amp; Version Control</li>
                  <li className="hover:text-[#ECE5DA] transition-colors">PostgreSQL (Learning)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recent Roles */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#66635F] block">
              Experience
            </span>
            <div className="space-y-3">
              {WORK_EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                  className="flex items-baseline justify-between py-2 border-b border-white/3 text-sm hover:border-white/10 transition-colors group"
                >
                  <div>
                    <span className="text-[#E8E2D8] font-medium group-hover:text-white transition-colors">{exp.role}</span>
                    <span className="text-[#66635F] ml-2">@ {exp.company}</span>
                  </div>
                  <span className="text-[#55524E] font-mono">{exp.period}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
