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
            className="p-8 rounded-2xl bg-[#0C0C0C] border border-white/[0.04] hover:border-white/[0.14] transition-all flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:shadow-black/60"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-[#504E4B] block group-hover:text-[#8C8984] transition-colors">
                {srv.number}
              </span>

              <h3 className="text-sm font-semibold tracking-wider uppercase text-[#E8E2D8] font-sans group-hover:text-white transition-colors">
                {srv.title}
              </h3>

              <p className="text-xs text-[#7A7773] leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-8 mt-4 border-t border-white/[0.03] flex items-center justify-between">
              <button
                onClick={() => onNavigate('projects')}
                className="text-[10px] font-mono tracking-widest uppercase text-[#55524E] group-hover:text-[#E8DEC8] transition-colors cursor-pointer flex items-center gap-1.5"
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
