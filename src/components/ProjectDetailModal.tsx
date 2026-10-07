import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Copy, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { getLenis } from '../lib/lenis';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const reduce = useReducedMotion();
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      id="project-detail-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        id="project-detail-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? false : { opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0C0C0C] border border-white/8 rounded-2xl shadow-2xl overflow-y-auto my-auto flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8DEC8] border border-[#E8DEC8]/30 px-2.5 py-0.5 rounded-full">
              {project.category}
            </span>
            <span className="text-sm text-[#8C8984] font-mono">
              {project.year} - {project.clientOrOrg}
            </span>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C8984] hover:text-[#ECE5DA] hover:bg-white/4 transition-colors cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 sm:p-10 space-y-8 text-left">
          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 id="project-modal-title" className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight text-balance">
              {project.title}
            </h2>
            <p className="text-base text-[#9A968F] font-normal leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] px-4 py-1.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 active:scale-[0.98]"
              >
                <span>Live Project</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-white/8 hover:border-white/20 px-4 py-1.5 rounded-full text-sm font-mono text-[#8C8984] hover:text-white transition-all flex items-center gap-1.5 active:scale-[0.98]"
              >
                <Github className="w-3 h-3" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Project Image */}
          {project.screenshots && project.screenshots[0] && (
            <div className="relative overflow-hidden rounded-2xl border border-white/6 aspect-video bg-[#090909]">
              <img
                src={project.screenshots[0].url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Problem & Role Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#080808] border border-white/4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C8984] block">
                The Problem
              </span>
              <p className="text-sm text-[#9A968F] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#080808] border border-white/4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C8984] block">
                Architectural Role
              </span>
              <p className="text-sm text-[#9A968F] leading-relaxed">
                {project.role}
              </p>
            </div>
          </div>

          {/* Architecture Strategy */}
          <div className="p-5 rounded-xl bg-[#080808] border border-white/4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8984] block">
              Strategy &amp; Execution
            </span>
            <p className="text-sm text-[#9A968F] leading-relaxed">
              {project.architectureOverview}
            </p>
          </div>

          {/* Metrics Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-xl bg-[#080808] border border-white/4 space-y-1"
                >
                  <span className="text-base font-medium text-[#E8DEC8] block font-serif tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8C8984] block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C8984] block">
                Key Features
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#9A968F] leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#E8DEC8] shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-mono text-[#8C8984]">
                <span>{project.codeSnippet.filename}</span>
                <button
                  onClick={handleCopyCode}
                  className="hover:text-[#E8DEC8] cursor-pointer flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-[#080808] border border-white/6 overflow-x-auto">
                <pre className="font-mono text-sm text-[#C8C2B8] leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[13px] font-mono bg-[#080808] border border-white/4 text-[#8C8984]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
