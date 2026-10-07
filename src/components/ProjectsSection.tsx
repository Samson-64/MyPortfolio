import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import fallbackProjectImg from '../assets/images/proj1.png';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const reduce = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !stackRef.current) return;

    let cancelled = false;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('.stack-card');

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        cardEls.forEach((card, i) => {
          if (i === cardEls.length - 1) return;

          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cardEls[cardEls.length - 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });

          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: 'none',
            scrollTrigger: {
              trigger: cardEls[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            },
          });
        });

        cardEls.forEach((card) => {
          const img = card.querySelector<HTMLElement>('.card-img');
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, stackRef);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    // Pin positions depend on decoded image sizes
    const stack = stackRef.current;
    if (stack) {
      const imgs = Array.from(stack.querySelectorAll('img'));
      Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header with scroll-triggered reveal */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-baseline justify-between mb-10 pb-4 border-b border-white/4"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight text-balance">
          Selected Work
        </h2>
        <motion.span
          initial={reduce ? false : { opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs font-mono tracking-widest text-[#8C8984] uppercase shrink-0 pl-4"
        >
          [ {PROJECTS.length} Case Studies ]
        </motion.span>
      </motion.div>

      {/* Vertical sticky-stack of full-width project cards */}
      <div ref={stackRef} className="relative flex flex-col gap-10">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={`stack-card group cursor-pointer rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/4 hover:border-white/16 transition-colors duration-300 shadow-sm hover:shadow-2xl hover:shadow-black/70 ${
              reduce ? '' : 'md:sticky md:top-0'
            }`}
            role="button"
            tabIndex={0}
            onClick={() => onSelectProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(project);
              }
            }}
          >
            <motion.div
              className="card-inner"
              initial={reduce ? false : { opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Visual Container - exact 21:10 matches source screenshots, no crop */}
              <div className="relative aspect-[21/10] max-h-[62dvh] overflow-hidden bg-[#090909]">
                <div className="card-img absolute left-0 -top-[10%] w-full h-[120%]">
                  <img
                    src={project.screenshots[0]?.url || fallbackProjectImg}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#0C0C0C] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Bottom Bar */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-sans text-xl font-medium text-[#E8E2D8] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#8C8984] mt-1 font-normal">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#7E7B76] border border-white/6 px-2.5 py-1 rounded-full group-hover:border-[#E8DEC8]/30 group-hover:text-[#8C8984] transition-colors">
                    {project.category}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/3 group-hover:bg-[#E8DEC8] text-[#8C8984] group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
