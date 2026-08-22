import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillItem } from '../types';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten skills
  const allSkills: { categoryTitle: string; skill: SkillItem }[] = [];
  SKILL_CATEGORIES.forEach((cat) => {
    cat.skills.forEach((s) => {
      allSkills.push({ categoryTitle: cat.title, skill: s });
    });
  });

  const filteredSkills = allSkills.filter((item) => {
    const matchesSearch =
      item.skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skill.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategoryIndex === 'all') return true;
    return item.categoryTitle === SKILL_CATEGORIES[activeCategoryIndex].title;
  });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/6 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-sm font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Toolkit &amp; Competencies
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Technical stack &amp; skills.
            </h2>
          </div>
          <p className="text-base text-zinc-400 max-w-md mt-3 md:mt-0 leading-relaxed">
            Search or filter across specialized frontend, backend, database, and infrastructure tooling.
          </p>
        </div>

        {/* Controls: Category Pills + Search Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="skill-filter-all"
              onClick={() => setActiveCategoryIndex('all')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeCategoryIndex === 'all'
                  ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/6'
              }`}
            >
              All Skills ({allSkills.length})
            </button>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.title}
                id={`skill-filter-${idx}`}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeCategoryIndex === idx
                    ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/6'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              id="skill-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g., Redis)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-white/6 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map(({ categoryTitle, skill }, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.2) }}
              className="p-5 rounded-xl bg-zinc-900/60 border border-white/6 hover:border-amber-400/30 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white font-mono flex items-center gap-2">
                  <span>{skill.name}</span>
                </h3>
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-white/4">
                  {skill.experienceLevel}
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {skill.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[13px] font-mono text-zinc-500">
                <span>{categoryTitle}</span>
                <span className="text-amber-400/80 font-medium">{skill.years}+ yrs prod</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
            <p className="text-base text-zinc-400">No matching skills found for "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryIndex('all');
              }}
              className="mt-2 text-sm font-mono text-amber-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
