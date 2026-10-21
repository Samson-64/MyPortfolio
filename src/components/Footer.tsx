import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="py-12 px-6 sm:px-8 border-t border-white/4 bg-[#060606] text-[#8C8984] text-sm font-mono">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-[#9A968F]">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span>Frontend Developer - Dar es Salaam, Tanzania / Remote</span>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6 text-[13px] uppercase tracking-wider">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="group relative hover:text-[#ECE5DA] transition-colors cursor-pointer"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#ECE5DA] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
              />
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
};
