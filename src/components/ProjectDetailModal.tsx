import React, { useState } from 'react';
import { X, ExternalLink, Github, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        id="project-detail-modal-container"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0C0C0C] border border-white/8 rounded-3xl shadow-2xl overflow-y-auto my-auto flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8DEC8] border border-[#E8DEC8]/30 px-2.5 py-0.5 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-[#66635F] font-mono">
              {project.year} • {project.clientOrOrg}
            </span>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777] hover:text-[#ECE5DA] hover:bg-white/4 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 sm:p-10 space-y-8 text-left">
          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-[#8C8984] font-normal leading-relaxed">
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
                className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5"
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
                className="border border-white/8 hover:border-white/20 px-4 py-1.5 rounded-full text-xs font-mono text-[#8C8984] hover:text-white transition-all flex items-center gap-1.5"
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
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
                The Problem
              </span>
              <p className="text-xs text-[#8C8984] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
                Architectural Role
              </span>
              <p className="text-xs text-[#8C8984] leading-relaxed">
                {project.role}
              </p>
            </div>
          </div>

          {/* Architecture Strategy */}
          <div className="p-5 rounded-2xl bg-[#080808] border border-white/4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66635F] block">
              Strategy &amp; Execution
            </span>
            <p className="text-xs text-[#8C8984] leading-relaxed">
              {project.architectureOverview}
            </p>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#66635F]">
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
                <pre className="font-mono text-xs text-[#C8C2B8] leading-relaxed">
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
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#080808] border border-white/4 text-[#7A7773]"
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
