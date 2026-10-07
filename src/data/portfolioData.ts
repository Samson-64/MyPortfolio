import { Project, SkillCategory, WorkExperience, Education, Testimonial } from '../types';
import beanThereImg from '../assets/images/proj1.png';
import sunNSunImg from '../assets/images/proj2.png';
import safariVoyageImg from '../assets/images/proj3.png';

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
    id: 'bean-there',
    title: 'Bean There',
    tagline: 'Coffee roastery landing page with an interactive brew matcher quiz',
    category: 'React',
    year: '2026',
    clientOrOrg: 'Personal Project (Fictional Coffee Roastery)',
    summary: 'A modern coffee roastery landing page built with React, TypeScript, Vite, and Tailwind CSS, showcasing seasonal drinks, operating hours, location details, and an interactive coffee quiz experience.',
    problem: 'Presenting a seasonal menu, opening hours, and location in one fast single-page site while helping visitors discover drinks that actually match their taste.',
    role: 'Design & Frontend Development',
    architectureOverview: 'Component-driven React + TypeScript SPA powered by the Vite toolchain and styled entirely with Tailwind CSS; reusable UI components in src/components, static menu and quiz content in src/data, with helper logic in src/utils.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Lucide React'],
    githubUrl: 'https://github.com/Samson-64/Bean-There',
    keyFeatures: [
      'Responsive React + TypeScript UI',
      'Interactive seasonal menu & drink detail modal',
      'Live operating-hours status card',
      'Location & reservation inquiry section',
      'Brew matcher quiz for personalized drink recommendations',
      'Vite-powered development and build toolchain'
    ],
    challenges: [
      {
        challenge: 'Helping visitors choose from a menu they have never tried before',
        solution: 'Built a brew matcher quiz that scores taste preferences and recommends matching seasonal drinks.'
      },
      {
        challenge: 'Communicating whether the roastery is open right now',
        solution: 'Live operating-hours status card derived from the weekly opening schedule.'
      }
    ],
    screenshots: [
      {
        url: beanThereImg,
        caption: 'Bean There landing page: hero, seasonal menu & brew matcher'
      }
    ]
  },
  {
    id: 'sun-n-sun-beach-hotel',
    title: 'Sun N Sun Beach Hotel',
    tagline: 'Beachfront hotel marketing site & early-stage booking platform',
    category: 'Full-Stack',
    year: '2026',
    clientOrOrg: 'Sun N Sun Beach Hotel, Dar es Salaam, Tanzania',
    summary: 'A beachfront hotel website and booking platform for a 3-star tropical retreat in Dar es Salaam: video hero with floating booking widget, rooms showcase, guest reviews, embedded map, and an Express.js REST API.',
    problem: 'Giving a beachfront hotel a modern online presence that markets its rooms and amenities while letting guests start bookings from any device.',
    role: 'Full-Stack Developer',
    architectureOverview: 'Single-page Tailwind CSS frontend with vanilla JavaScript interactions (no build step), backed by an early-stage Node.js + Express 5 REST API structured for bookings, users, and other hotel services.',
    techStack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express 5', 'Google Maps Embed'],
    githubUrl: 'https://github.com/Samson-64/SunNSun',
    keyFeatures: [
      'Hero background video with floating booking widget (check-in, check-out, guests)',
      'Sticky glassmorphism navigation bar',
      'Rooms showcase: Standard Ocean, Deluxe Sea View & Family Beach Suite',
      'Amenities grid: beach access, parking, Wi-Fi, restaurant, 24/7 reception',
      'Guest reviews section (4.3★, 193 reviews)',
      'Location section with embedded Google Map',
      'Parallax CTA banner & animated wave footer with newsletter signup',
      'Mobile-friendly floating "Book now" button + Express REST API (/api/users)'
    ],
    metrics: [
      { label: 'Guest Rating', value: '4.3 / 5' },
      { label: 'Reviews', value: '193' },
      { label: 'Room Types', value: '3' },
      { label: 'Hotel Class', value: '3-Star' }
    ],
    challenges: [
      {
        challenge: 'Creating an immersive video hero without sacrificing load performance',
        solution: 'Optimized background video with a page-load spinner and mobile-friendly layout fallbacks.'
      },
      {
        challenge: 'Building beyond a static marketing page toward real bookings',
        solution: 'Structured early-stage Express 5 backend with clean routes ready for reservation endpoints and database integration.'
      }
    ],
    screenshots: [
      {
        url: sunNSunImg,
        caption: 'Sun N Sun Beach Hotel: video hero, rooms showcase & booking widget'
      }
    ]
  },
  {
    id: 'safarivoyage-africa',
    title: 'SafariVoyage Africa',
    tagline: 'Luxury African travel front-end with a complete client-side booking flow',
    category: 'React',
    year: '2026',
    clientOrOrg: 'Personal Project',
    summary: 'A luxury African travel front-end for browsing destinations, curated guided tours, and wildlife guides, with a complete client-side booking flow. Built as a single-page React application; no backend required.',
    problem: 'Making ten African destinations, curated tour packages, and an end-to-end booking journey feel effortless in one fast front-end without any server.',
    role: 'Design & Frontend Development',
    architectureOverview: 'Single-page React 19 + TypeScript app built with Vite 6 and styled with Tailwind CSS 4; domain data centralized in src/data/africanData.ts, i18n strings and currency rates in src/utils/translations.ts, and a procedurally synthesized savanna ambience generator via the Web Audio API (src/utils/soundscape.ts). Bookings and newsletter signups persist to localStorage only.',
    techStack: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS 4', 'Motion', 'Lucide'],
    githubUrl: 'https://github.com/Samson-64/safarivoyage-africa',
    keyFeatures: [
      'Hero carousel auto-playing ten African destinations (Serengeti, Victoria Falls, Giza & more)',
      'Full-text search with region pills, activity, duration, difficulty & max-budget filters',
      'Guided tour packages: day-by-day itineraries, inclusions/exclusions, guide languages & pricing',
      '4-step booking wizard ending in a printable boarding-pass confirmation with .ics export',
      'My Bookings portal listing confirmed expeditions saved in the browser',
      'Big Five wildlife spotter with interactive field dossiers (lion, leopard, elephant, rhino, buffalo)',
      'Editorial conservation & community impact storytelling sections',
      'Localization in English, French, Kiswahili, Spanish, German & Arabic',
      'Multi-currency pricing across USD, EUR, GBP, KES, ZAR & EGP',
      'Procedural savanna soundscape synthesized live via the Web Audio API'
    ],
    metrics: [
      { label: 'Destinations', value: '10' },
      { label: 'Languages', value: '6' },
      { label: 'Currencies', value: '6' },
      { label: 'Booking Steps', value: '4' }
    ],
    challenges: [
      {
        challenge: 'Delivering rich booking interactivity without any backend',
        solution: 'Complete client-side booking flow with localStorage persistence, printable boarding-pass confirmation, and .ics calendar export.'
      },
      {
        challenge: 'Serving six languages and six currencies without cluttering components',
        solution: 'Centralized translation map and fixed-rate currency formatting utilities powering navbar pickers.'
      }
    ],
    screenshots: [
      {
        url: safariVoyageImg,
        caption: 'SafariVoyage Africa: hero carousel, destination search & guided tours'
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
    period: '2022 - Present',
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
    period: '2020 - 2022',
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
    degree: 'B.Cs. in Computer Science',
    institution: 'Institute of Finance Management (IFM)',
    location: 'Dar es Salaam, Tanzania',
    period: '2016 - 2020',
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
