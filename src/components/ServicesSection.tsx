import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-20 px-6 sm:px-8 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {SERVICES.map((srv) => (
          <motion.div
            key={srv.number}
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
              }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative isolate min-h-[300px] overflow-hidden rounded-[2rem] bg-[#0C0C0C] border border-white/4 hover:border-white/[0.14] transition-all flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:shadow-black/60"
          >
            {/* Decorative layers recreate the raised, soft-panel treatment without changing the card palette. */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.035] blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/[0.025] blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />
            </div>

            <div className="relative p-8 pb-0 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-mono text-[#504E4B] block group-hover:text-[#8C8984] transition-colors">
                  {srv.number}
                </span>
                <span aria-hidden="true" className="h-2 w-2 rounded-full border border-white/10" />
              </div>

              <h3 className="text-base font-semibold tracking-wider uppercase text-[#E8E2D8] font-sans group-hover:text-white transition-colors">
                {srv.title}
              </h3>

              <p className="text-sm text-[#7A7773] leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="relative mx-3 mb-3 mt-8 rounded-[1.35rem] border border-white/[0.055] bg-[#0C0C0C] px-5 py-4 shadow-[0_-1px_0_rgba(255,255,255,0.035)_inset] transition-transform duration-300 group-hover:-translate-y-1">
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-mono tracking-widest uppercase text-[#55524E] group-hover:text-[#E8DEC8] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>About {srv.tag}</span>
                <ArrowUpRight className="w-3 h-3 text-[#55524E] group-hover:text-[#E8DEC8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
