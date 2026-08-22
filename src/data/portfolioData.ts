import { Project, SkillCategory, WorkExperience, Education, Testimonial } from '../types';
import laptopRenderImg from '../assets/images/laptop_dark_render_1787407899771.jpg';
import deviceRenderImg from '../assets/images/device_dark_render_1787407913544.jpg';

export const PERSONAL_INFO = {
  name: 'Samson Mamuya',
  role: 'Frontend Developer & UI Engineer',
  specialization: 'React, TypeScript & UI Design',
  location: 'Dar es Salaam, Tanzania / Remote',
  availability: 'Available for frontend roles',
  email: 'samsonmamuya41@gmail.com',
  github: 'https://github.com/Samson-64',
  instagram: 'https://www.instagram.com/samson_mamuya/',
  facebook: 'https://www.facebook.com/samson.mamuya/',
  bio: 'Frontend developer specializing in React, Next.js, and TypeScript. Passionate about building fast, accessible, and aesthetically refined user interfaces.',
  stats: [
    { label: 'Experience', value: '4+ Years' },
    { label: 'Completed Projects', value: '18+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Focus', value: 'Frontend UI' }
  ]
};

export const SERVICES = [
  {
    number: '01',
    title: 'Frontend Development',
    description: 'Modern React and Next.js applications built with clean component architecture, strict TypeScript, and high performance.',
    tag: 'REACT / NEXT.JS'
  },
  {
    number: '02',
    title: 'UI Design & Motion',
    description: 'Translating designs into responsive, accessible interfaces with Tailwind CSS and fluid micro-animations.',
    tag: 'TAILWIND / MOTION'
  },
  {
    number: '03',
    title: 'API & State Integration',
    description: 'Connecting client interfaces to REST and GraphQL APIs, managing client state, and integrating foundational Node.js backends.',
    tag: 'STATE & APIS'
  }
];

export const CLIENT_LOGOS = [
  { name: 'REACT', label: 'React 19' },
  { name: 'TYPESCRIPT', label: 'TypeScript' },
  { name: 'NEXT.JS', label: 'Next.js' },
  { name: 'TAILWIND', label: 'Tailwind CSS' },
  { name: 'JAVASCRIPT', label: 'JavaScript' },
  { name: 'NODE', label: 'Node.js (Foundations)' }
];

export const PROJECTS: Project[] = [
  {
    id: 'nexus-stream',
    title: 'NexusStream',
    tagline: 'Real-time telemetry and interactive analytics dashboard',
    category: 'React',
    year: '2024',
    clientOrOrg: 'FinTech Platform',
    summary: 'A high-performance interactive dashboard featuring real-time data feeds, animated metrics charts, and smooth filtering.',
    problem: 'Rendering dynamic charts and high-frequency data streams without UI frame drops.',
    role: 'Lead Frontend Developer',
    architectureOverview: 'Modular React 19 component hierarchy with custom hooks, WebSockets integration, and Tailwind styling.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    liveUrl: 'https://example.com/nexus-stream',
    githubUrl: 'https://github.com/samsonmamuya/nexus-stream',
    metrics: [
      { label: 'UI Frame Rate', value: '60 FPS' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Load Time', value: '0.48s' },
      { label: 'Components', value: '35+ Reusable' }
    ],
    challenges: [
      {
        challenge: 'Maintaining smooth 60fps animations with frequent telemetry updates',
        solution: 'Used React memoization, debounced data dispatchers, and CSS hardware acceleration.'
      },
      {
        challenge: 'Creating a clean, accessible dark theme dashboard',
        solution: 'Engineered a semantic Tailwind color system with strict WCAG contrast compliance.'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'useTelemetryStream.ts',
      code: `// Custom hook for smooth real-time telemetry updates
import { useState, useEffect } from 'react';

export function useTelemetryStream<T>(socketUrl: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setData(payload);
    };
    return () => ws.close();
  }, [socketUrl]);

  return data;
}`
    },
    screenshots: [
      {
        url: laptopRenderImg,
        caption: 'NexusStream real-time analytics and telemetry UI'
      }
    ]
  },
  {
    id: 'synapse-flow',
    title: 'Synapse Flow',
    tagline: 'Visual node workflow & interactive state canvas',
    category: 'React',
    year: '2024',
    clientOrOrg: 'AI Automation Lab',
    summary: 'An interactive drag-and-drop workflow canvas allowing users to visually connect automation nodes and inspect state.',
    problem: 'Building an intuitive canvas with seamless dragging, zooming, and connection lines on all screen sizes.',
    role: 'Frontend UI Engineer',
    architectureOverview: 'Custom SVG canvas pipeline combined with Zustand state slices and smooth Framer Motion interactions.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Motion'],
    liveUrl: 'https://example.com/synapse-flow',
    githubUrl: 'https://github.com/samsonmamuya/synapse-flow',
    metrics: [
      { label: 'Render Speed', value: '60 FPS' },
      { label: 'Mobile Support', value: '100% Touch' },
      { label: 'Bundle Size', value: '32 KB' },
      { label: 'Accessibility', value: 'WCAG AA' }
    ],
    challenges: [
      {
        challenge: 'Handling complex node drag physics and coordinate math',
        solution: 'Implemented SVG path calculations with normalized viewport transformations.'
      }
    ],
    screenshots: [
      {
        url: deviceRenderImg,
        caption: 'Interactive workflow builder & drag-and-drop node graph'
      }
    ]
  },
  {
    id: 'hyperscale-commerce',
    title: 'HyperScale',
    tagline: 'Sub-second modern headless e-commerce storefront',
    category: 'React',
    year: '2023',
    clientOrOrg: 'Luxury Apparel Brand',
    summary: 'A fast, editorial digital storefront with instant cart slide-outs, product filtering, and fluid page transitions.',
    problem: 'Slow page transitions and laggy mobile menus impacting user conversion.',
    role: 'Frontend Developer',
    architectureOverview: 'Next.js App Router with server-side rendering, client state management, and Stripe checkout integration.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe API'],
    liveUrl: 'https://example.com/hyperscale',
    githubUrl: 'https://github.com/samsonmamuya/hyperscale-commerce',
    metrics: [
      { label: 'First Contentful Paint', value: '0.38s' },
      { label: 'Mobile Performance', value: '98/100' },
      { label: 'Cart Sync Speed', value: 'Instant' },
      { label: 'SEO Score', value: '100/100' }
    ],
    challenges: [
      {
        challenge: 'Zero-layout-shift image loading for dynamic catalog items',
        solution: 'Used Next.js Image component with blur placeholders and aspect-ratio CSS constraints.'
      }
    ],
    screenshots: [
      {
        url: laptopRenderImg,
        caption: 'Headless storefront catalog and product gallery UI'
      }
    ]
  },
  {
    id: 'devsphere-cloud',
    title: 'DevSphere',
    tagline: 'Developer interface & interactive web terminal',
    category: 'React',
    year: '2023',
    clientOrOrg: 'Developer Tools',
    summary: 'A dark-mode web application featuring an in-browser code editor, interactive terminal simulator, and file tree.',
    problem: 'Creating an intuitive desktop-grade IDE experience within standard web browsers.',
    role: 'Frontend UI Developer',
    architectureOverview: 'React component system using Monaco Editor, xterm.js integration, and tab state management.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'Node.js (API)'],
    liveUrl: 'https://example.com/devsphere',
    githubUrl: 'https://github.com/samsonmamuya/devsphere',
    metrics: [
      { label: 'UI Latency', value: '< 16ms' },
      { label: 'Dark Mode UI', value: 'Custom System' },
      { label: 'Keyboard Shortcuts', value: '20+ Supported' },
      { label: 'Test Coverage', value: '94%' }
    ],
    challenges: [
      {
        challenge: 'Ensuring seamless responsive design across desktop and tablet screens',
        solution: 'Engineered flexible CSS Grid split-pane layouts with draggable divider handles.'
      }
    ],
    screenshots: [
      {
        url: deviceRenderImg,
        caption: 'Web-based IDE workspace, file explorer, and terminal UI'
      }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend (Advanced)',
    skills: [
      { name: 'React 19 / 18', experienceLevel: 'Expert', years: 4, category: 'Frontend', description: 'Hooks, concurrent rendering, component patterns, and performance optimization.' },
      { name: 'TypeScript', experienceLevel: 'Advanced', years: 4, category: 'Frontend', description: 'Type safety, custom interfaces, generic components, and clean code.' },
      { name: 'Next.js', experienceLevel: 'Advanced', years: 3, category: 'Frontend', description: 'App Router, SSR, SSG, routing, and search engine optimization.' },
      { name: 'Tailwind CSS', experienceLevel: 'Expert', years: 4, category: 'Frontend', description: 'Responsive layouts, design token systems, and minimalist aesthetics.' },
      { name: 'HTML5 & Modern CSS', experienceLevel: 'Expert', years: 5, category: 'Frontend', description: 'Semantic markup, Flexbox, CSS Grid, and responsive web design.' },
      { name: 'UI Motion & Animation', experienceLevel: 'Advanced', years: 3, category: 'Frontend', description: 'Framer Motion, smooth transitions, and micro-interactions.' }
    ]
  },
  {
    title: 'Backend & Tools (Foundational)',
    skills: [
      { name: 'Node.js & Express', experienceLevel: 'Proficient', years: 2, category: 'Backend', description: 'Building basic REST APIs, server routing, and handling HTTP requests.' },
      { name: 'API Integration', experienceLevel: 'Advanced', years: 3, category: 'Backend', description: 'Fetching data, handling async operations, error states, and WebSockets.' },
      { name: 'Git & GitHub', experienceLevel: 'Advanced', years: 4, category: 'Backend', description: 'Version control, branch management, and collaborative development.' },
      { name: 'Databases (Learning)', experienceLevel: 'Proficient', years: 1, category: 'Backend', description: 'Basic CRUD operations, PostgreSQL, and database schema concepts.' }
    ]
  }
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Frontend Developer',
    company: 'Veloce Labs',
    location: 'Dar es Salaam, Tanzania / Remote',
    period: '2022 — Present',
    type: 'Full-Time',
    description: 'Leading frontend feature development, building responsive React interfaces, and integrating backend REST APIs.',
    achievements: [
      'Developed telemetry dashboard frontend achieving 60fps rendering and 99/100 Lighthouse score.',
      'Reduced web application bundle load time by 40% through code-splitting and asset optimization.',
      'Built a reusable design system component library in React and TypeScript.'
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST APIs', 'Git']
  },
  {
    id: 'exp-2',
    role: 'Junior Frontend Developer',
    company: 'Aether Digital',
    location: 'Remote',
    period: '2020 — 2022',
    type: 'Full-Time',
    description: 'Crafted responsive landing pages, interactive client portals, and e-commerce UI components.',
    achievements: [
      'Built interactive workflow canvas components with touch and desktop support.',
      'Translated Figma design mockups into pixel-perfect, accessible React components.'
    ],
    techStack: ['React', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Git']
  }
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.Sc. in Computer Science',
    institution: 'University of Dar es Salaam',
    location: 'Dar es Salaam, Tanzania',
    period: '2016 — 2020',
    highlights: [
      'Focused on Web Engineering, User Interface Design, and Software Fundamentals',
      'Active contributor to developer guilds and open-source web projects'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Samson delivered a beautiful, fast React frontend with pristine attention to detail and smooth interactions.',
    author: 'Marcus Vance',
    role: 'Product Lead',
    company: 'Veloce Labs'
  }
];
