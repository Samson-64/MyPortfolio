export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'React' | 'Node.js' | 'Real-Time' | 'Cloud/API';
  summary: string;
  problem: string;
  role: string;
  techStack: string[];
  architectureOverview: string;
  challenges: {
    challenge: string;
    solution: string;
  }[];
  keyFeatures?: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  screenshots: {
    url: string;
    caption: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
  clientOrOrg: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface SkillItem {
  name: string;
  category: string;
  experienceLevel: 'Advanced' | 'Expert' | 'Proficient';
  years: number;
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle?: string;
  iconName?: string;
  skills: SkillItem[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export type ExperienceItem = WorkExperience;

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export type EducationItem = Education;

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  serviceType?: string;
  message: string;
  budgetTier?: string;
}

export interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}
