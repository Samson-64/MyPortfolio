import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import fallbackProjectImg from '../assets/images/proj1.png';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-20 px-6 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header matching template with scroll trigger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-baseline justify-between mb-10 pb-4 border-b border-white/4"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight">
          Selected Work
        </h2>
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs font-mono tracking-widest text-[#66635F] uppercase"
        >
          [ {PROJECTS.length} Case Studies ]
        </motion.span>
      </motion.div>

      {/* 2x2 Grid of dark luxury project cards with scroll-triggered stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.16,
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }
              }
            }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onSelectProject(project)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/4 hover:border-white/16 transition-colors duration-300 shadow-sm hover:shadow-2xl hover:shadow-black/70"
          >
            {/* Visual Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-[#090909]">
              <img
                src={project.screenshots[0]?.url || fallbackProjectImg}
                alt={project.title}
                className="w-full h-full object-cover grayscale-20% group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0C0C0C] via-transparent to-transparent opacity-80" />
            </div>

            {/* Bottom Bar */}
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-sans text-lg font-medium text-[#E8E2D8] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#6E6B67] mt-0.5 font-normal">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#55524E] border border-white/6 px-2.5 py-1 rounded-full group-hover:border-[#E8DEC8]/30 group-hover:text-[#8C8984] transition-colors">
                  {project.category}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/3 group-hover:bg-[#E8DEC8] text-[#777] group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
