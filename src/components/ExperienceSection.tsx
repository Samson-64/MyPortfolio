import React from 'react';
import { MapPin, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { WORK_EXPERIENCE } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenResume: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-sm font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Career Trajectory
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Work experience &amp; roles.
            </h2>
          </div>
          <button
            id="experience-view-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/8 text-sm font-medium text-zinc-200 transition-colors w-fit mt-3 md:mt-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Complete CV</span>
          </button>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Bullet Node on Timeline */}
              <div className="absolute -left-7.75 sm:-left-9.75 top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-amber-400/30 transition-all space-y-4">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="px-2 py-0.5 rounded text-[13px] font-mono font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {exp.type}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1 font-mono">
                      <span className="text-white font-semibold">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-mono text-amber-400/90 font-medium px-3 py-1 rounded bg-zinc-950 border border-white/6 w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-[13px] font-mono uppercase tracking-widest text-zinc-400">
                    Key Deliverables &amp; Impact:
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-sm text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[13px] font-mono text-zinc-400 bg-zinc-950 border border-white/4"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
