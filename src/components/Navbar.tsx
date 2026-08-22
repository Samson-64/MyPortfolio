import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
              className="text-left cursor-pointer focus:outline-none group flex items-center gap-2"
            >
              <span className="font-serif text-lg text-[#ECE5DA] tracking-tight font-normal group-hover:text-[#E8DEC8] transition-colors">
                samson<span className="text-[#888]">.</span>
              </span>
            </button>

            {/* Centered Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-widest text-[#7C7A76]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`transition-colors cursor-pointer ${
                      isActive ? 'text-[#ECE5DA]' : 'hover:text-[#ECE5DA]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                id="nav-resume-btn"
                onClick={onOpenResume}
                className="text-[11px] font-mono text-[#8C8984] hover:text-[#ECE5DA] transition-colors cursor-pointer px-2 py-1"
              >
                CV
              </button>

              <button
                id="nav-contact-cta-btn"
                onClick={() => handleItemClick('contact')}
                className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] text-[11px] font-medium tracking-wider uppercase px-4 py-1.5 rounded-full transition-all cursor-pointer shadow-xs"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[#8C8984] hover:text-[#ECE5DA] focus:outline-none"
                aria-label="Toggle menu"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-20 z-30 p-5 rounded-2xl bg-[#0F0F0F] border border-white/6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`py-2 text-xs font-medium uppercase tracking-widest text-left transition-colors ${
                    activeSection === item.id ? 'text-[#E8DEC8]' : 'text-[#7C7A76] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="text-xs font-mono text-[#8C8984] hover:text-white"
                >
                  Resume / CV
                </button>
                <button
                  onClick={() => handleItemClick('contact')}
                  className="bg-[#E8DEC8] text-[#080808] px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
