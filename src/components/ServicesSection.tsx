import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';
import { EASE_FLUID, SPRING_SOFT } from '../lib/motion';
import { SpotlightLayers, useSpotlight } from './motion/Spotlight';
import { Magnetic } from './motion/Magnetic';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  featured: boolean;
  onNavigate: (sectionId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  title,
  description,
  featured,
  onNavigate,
}) => {
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();

  return (
    <motion.div
      ref={spotlight.ref}
      onPointerMove={spotlight.onPointerMove}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: EASE_FLUID },
        },
      }}
      whileHover={reduce ? undefined : { y: -4, transition: SPRING_SOFT }}
      className={`${spotlight.hostClassName} relative isolate min-h-[300px] overflow-hidden rounded-2xl bg-[#0C0C0C] border border-white/4 hover:border-white/[0.14] transition-colors flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:shadow-black/60 ${
        featured ? 'md:col-span-5 md:row-span-2' : 'md:col-span-7'
      }`}
    >
      <SpotlightLayers />

      {/* Decorative layers recreate the raised, soft-panel treatment without changing the card palette. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.035] blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />
      </div>

      <div className="relative p-8 pb-0 space-y-4">
        <span className="text-[13px] font-mono text-[#7E7B76] block group-hover:text-[#8C8984] transition-colors">
          {number}
        </span>

        <h3 className="text-base font-semibold tracking-wider uppercase text-[#E8E2D8] font-sans group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[#8C8984] leading-relaxed">
          {description}
        </p>
      </div>

      <Magnetic className="relative mx-3 mb-3 mt-8" strength={0.18} maxDistance={6}>
        <div className="rounded-xl border border-white/[0.055] bg-[#0C0C0C] px-5 py-4 shadow-[0_-1px_0_rgba(255,255,255,0.035)_inset] transition-transform duration-300 group-hover:-translate-y-1">
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono tracking-widest uppercase text-[#7E7B76] group-hover:text-[#E8DEC8] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Work</span>
            <ArrowUpRight className="w-3 h-3 group-hover:text-[#E8DEC8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </Magnetic>
    </motion.div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="py-24 px-6 sm:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={reduce ? 'visible' : 'hidden'}
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
        className="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-fr"
      >
        {SERVICES.map((srv, idx) => (
          <ServiceCard
            key={srv.number}
            number={srv.number}
            title={srv.title}
            description={srv.description}
            featured={idx === 0}
            onNavigate={onNavigate}
          />
        ))}
      </motion.div>
    </section>
  );
};
