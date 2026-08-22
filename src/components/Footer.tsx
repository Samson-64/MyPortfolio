import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="py-12 px-6 sm:px-8 border-t border-white/4 bg-[#060606] text-[#66635F] text-sm font-mono">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-[#8C8984]">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span className="text-[#333]">•</span>
          <span>Frontend Developer — Dar es Salaam, Tanzania / Remote</span>
        </div>

        <div className="flex items-center gap-6 text-[13px] uppercase tracking-wider">
          <button onClick={() => onNavigate('home')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Home</button>
          <button onClick={() => onNavigate('services')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Services</button>
          <button onClick={() => onNavigate('projects')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Work</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#ECE5DA] transition-colors cursor-pointer">Contact</button>
        </div>
      </div>
    </footer>
  );
};
