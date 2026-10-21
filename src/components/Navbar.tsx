import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SPRING_SNAPPY } from '../lib/motion';
import { Magnetic } from './motion/Magnetic';
import cvPdf from '../assets/Doc/Samson_Mamuya_CV.pdf';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const reduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'services', label: 'SERVICES' },
    { id: 'projects', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#080808]/90 backdrop-blur-md border-b border-white/4'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Minimal Brand */}
            <button
              id="nav-brand-logo"
              onClick={() => handleItemClick('home')}
              className="text-left cursor-pointer group flex items-center gap-2"
            >
              <span className="font-serif text-lg text-[#ECE5DA] tracking-tight font-normal group-hover:text-[#E8DEC8] transition-colors">
                Samson Mamuya
              </span>
            </button>

            {/* Centered Navigation Links */}
            <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-widest text-[#8C8984]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative transition-colors cursor-pointer active:text-[#E8DEC8] ${
                      isActive ? 'text-[#ECE5DA]' : 'hover:text-[#ECE5DA]'
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#E8DEC8]"
                        transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 right-0 h-px origin-left scale-x-0 bg-[#E8DEC8] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                id="nav-resume-btn"
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[13px] font-mono text-[#8C8984] hover:text-[#ECE5DA] transition-colors cursor-pointer px-2 py-1"
              >
                CV
                <span
                  aria-hidden="true"
                  className="absolute bottom-0.5 left-2 right-2 h-px origin-left scale-x-0 bg-[#E8DEC8] transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>

              <Magnetic strength={0.24} maxDistance={7}>
                <button
                  id="nav-contact-cta-btn"
                  onClick={() => handleItemClick('contact')}
                  className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] text-[13px] font-medium tracking-wider uppercase px-4 py-1.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Let's Talk
                </button>
              </Magnetic>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[#8C8984] hover:text-[#ECE5DA]"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-20 z-30 p-5 rounded-2xl bg-[#0F0F0F] border border-white/6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <motion.div
              className="flex flex-col space-y-3"
              initial={reduce ? false : 'hidden'}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                  }}
                  className={`py-2 text-sm font-medium uppercase tracking-widest text-left transition-colors ${
                    activeSection === item.id ? 'text-[#E8DEC8]' : 'text-[#8C8984] hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                className="pt-3 border-t border-white/6 flex items-center justify-between"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                }}
              >
                <a
                  href={cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-[#8C8984] hover:text-white"
                >
                  Resume / CV
                </a>
                <button
                  onClick={() => handleItemClick('contact')}
                  className="bg-[#E8DEC8] text-[#080808] px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider active:scale-[0.98] transition-transform"
                >
                  Let's Talk
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
