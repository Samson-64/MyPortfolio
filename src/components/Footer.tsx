import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="py-12 px-6 sm:px-8 border-t border-white/4 bg-[#060606] text-[#66635F] text-xs font-mono">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-[#8C8984]">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span className="text-[#333]">•</span>
          <span>Frontend Developer — Dar es Salaam, Tanzania / Remote</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
          <button onClick={() => onNavigate('home')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Home</button>
          <button onClick={() => onNavigate('services')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Services</button>
          <button onClick={() => onNavigate('projects')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Work</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Contact</button>
          <button onClick={scrollToTop} className="hover:text-[#ECE5DA] transition-colors cursor-pointer flex items-center gap-1 ml-2">
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
