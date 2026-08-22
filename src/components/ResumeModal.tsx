import React, { useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const resumeText = `
===================================================================
${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}
Specialization: ${PERSONAL_INFO.specialization}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | Instagram: ${PERSONAL_INFO.instagram} | Facebook: ${PERSONAL_INFO.facebook}
===================================================================

SUMMARY:
${PERSONAL_INFO.bio}

CORE SKILLS:
- Advanced Frontend: React 19/18, TypeScript, Next.js, Tailwind CSS, Modern CSS, Framer Motion, Responsive UI
- Foundational Backend / APIs: REST API Integration, WebSockets, Node.js & Express (Basics), Git

EXPERIENCE:
${WORK_EXPERIENCE.map(
  (w) => `
- ${w.role} | ${w.company} (${w.period}) - ${w.location}
  ${w.description}
  Key Deliverables:
  ${w.achievements.map((a) => `  * ${a}`).join('\n')}
  Stack: ${w.techStack.join(', ')}
`
).join('\n')}

EDUCATION:
${EDUCATION.map(
  (e) => `
- ${e.degree} | ${e.institution} (${e.period})
  ${e.highlights.map((h) => `  * ${h}`).join('\n')}
`
).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Samson_Mamuya_Frontend_Developer_CV.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        id="resume-modal-container"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0C0C0C] border border-white/[0.08] rounded-3xl shadow-2xl overflow-y-auto my-auto flex flex-col"
      >
        {/* Modal Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/[0.04]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E8DEC8]">
            Curriculum Vitae
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded-full border border-white/[0.08] text-xs font-mono text-[#8C8984] hover:text-white transition-colors cursor-pointer"
            >
              Print
            </button>
            <button
              onClick={handleDownloadText}
              className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] px-3 py-1 rounded-full text-xs font-mono uppercase transition-all cursor-pointer"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#777] hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div ref={printRef} className="p-8 sm:p-10 space-y-8 text-left text-[#ECE5DA]">
          {/* Header */}
          <div className="border-b border-white/[0.04] pb-6 space-y-2">
            <h1 className="font-serif text-3xl font-light text-[#E8E2D8]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs font-mono text-[#8C8984]">
              {PERSONAL_INFO.role} — {PERSONAL_INFO.location}
            </p>
            <p className="text-xs text-[#7A7773] leading-relaxed pt-1">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Technical Matrix */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
              Skills Breakdown
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.04] space-y-1">
                <span className="font-medium text-[#E8E2D8] font-mono">Frontend (Advanced)</span>
                <p className="text-[#7A7773] leading-relaxed text-[11px]">
                  React 19/18, TypeScript, Next.js, Tailwind CSS, Motion, Responsive Design, State Management.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.04] space-y-1">
                <span className="font-medium text-[#E8E2D8] font-mono">Backend &amp; APIs (Foundational)</span>
                <p className="text-[#7A7773] leading-relaxed text-[11px]">
                  REST API Consumption, WebSockets, Node.js &amp; Express (Basics), Git, PostgreSQL (Learning).
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
              Experience
            </span>
            <div className="space-y-5">
              {WORK_EXPERIENCE.map((job) => (
                <div key={job.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-[#E8E2D8]">{job.role} — {job.company}</span>
                    <span className="font-mono text-[#66635F] text-[11px]">{job.period}</span>
                  </div>
                  <p className="text-[#8C8984] leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
              Education
            </span>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#E8E2D8]">{edu.degree}</span>
                  <span className="font-mono text-[#66635F] text-[11px]">{edu.period}</span>
                </div>
                <div className="text-[#7A7773] text-[11px]">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
