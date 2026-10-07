import { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis, getLenis, destroyLenis } from './lib/lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechBand } from './components/TechBand';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Project } from './types';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Smooth page scroll (Lenis), driven by gsap's shared ticker so there is
  // only one requestAnimationFrame loop. Disabled under reduced motion.
  useEffect(() => {
    if (reduce) return;

    const lenis = initLenis();
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      destroyLenis();
    };
  }, [reduce]);

  useEffect(() => {
    const sections = ['home', 'services', 'projects', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(element, { duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-dvh bg-[#080808] text-[#ECE5DA] selection:bg-[#E8DEC8] selection:text-[#080808] relative">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#E8DEC8] focus:text-[#080808] focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* Scroll sentinel: leaves the viewport once the page is scrolled past 20px */}
      <div
        id="scroll-sentinel"
        aria-hidden="true"
        className="absolute top-0 left-0 h-5 w-full pointer-events-none"
      />

      {/* Fixed Minimal Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Layout matching the Framer template */}
      <main id="main-content" className="relative">
        <Hero
          onNavigate={scrollToSection}
        />

        <TechBand />

        <ServicesSection
          onNavigate={scrollToSection}
        />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Interactive Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
