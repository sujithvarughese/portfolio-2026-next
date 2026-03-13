export interface ExperienceEntry {
  date: string;
  position: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills?: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    date: "2025 - Present",
    position: "Full Stack Software Engineer",
    company: "AllClear.ai",
    location: "Davie, FL",
    description: "Specialized in building and maintaining a comprehensive multi-tenant SaaS platform, working with diverse clients to deliver scalable solutions, including Debt.com and several enterprise partners.",
    achievements: [
      "Delivered production features for a multi-tenant SaaS platform powering Debt.com and enterprise debt-relief partners in the consumer fintech space, serving 50,000+ monthly users, using React, TypeScript, NestJS, and Firebase.",
      "Designed the platform’s multi-tenant Firestore architecture, introducing a multi-database structure that isolates data per organization while enabling scalable configuration-driven workflows across enterprise partners.",
      "Built an LLM-powered chatbot using the OpenAI API that converts natural-language prompts into executable decision-flow logic for an internal decision engine used by Debt.com and partner organizations to evaluate debt-relief program eligibility, enabling non-engineering teams to rapidly author and visualize complex financial eligibility rules.",
      "Designed and implemented serverless backend services on Google Cloud Platform, processing thousands of daily financial transactions with sub-second p95 latency using Cloud Functions and Firestore.",
      "Led redesign of Debt.com’s customer offer confirmation experience, replacing fragmented UI screens with a reusable React component architecture and unified layout system implemented from Zeplin specs that improved maintainability and eliminated duplicated rendering logic across multiple partner configurations.",
      "Implemented electronic signature integration for customer agreements using Server-Sent Events to track document readiness and signature status, enabling thousands of contract completions daily across partner onboarding flows.",
      "Improved system observability and debugging efficiency by implementing structured logging and request traceability via Google Cloud Logging, reducing production incidents and debugging time by 50% across frontend, backend, and database layers.",
      "Contributed to core user-facing workflows, including secure login and access controls, in a high-trust financial domain, ensuring correctness and stability across onboarding and partner-facing flows.",
      "Coordinated work using Jira, Git, CI/CD pipelines, and Miro boards, while using AI-assisted tools (GitHub Copilot, Cursor) to accelerate development and maintain release stability in a fast-moving environment."
    ],
    skills: ["TypeScript", "React", "React Native", "NodeJS", "NestJS", "Google Cloud", "Google Analytics", "Firebase", "OpenAI", "API Integration", "Jira", "Scrum", "Testing", "Git", "CI/CD", "Miro", "Postman", "GitHub Copilot", "Material UI", "HTML", "CSS", "Tailwind CSS"]
  },
  {
    date: "2022 - 2025",
    position: "Full Stack Software Engineer",
    company: "SGS Properties, Inc.",
    location: "Hollywood, FL",
    description: "Designed and built a custom property management application from concept to deployment to track rental finances, manage property data, and integrate real estate APIs for market insights and operational analytics.",
    achievements: [
      "Led development of a proprietary property management platform supporting 100+ rental units, collaborating directly with investors to translate business objectives into scalable services and reducing manual management workload by 40% through automation and structured onboarding.",
      "Integrated REST APIs for real-time property listings and rental market data, along with Stripe Payments API for secure online payments resulting in increased tenant and management satisfaction and a 150% increase in lease renewal rates.",
      "Designed backend architecture using Node.js, MongoDB, AWS S3, implementing OAuth 2.0, Firebase Auth, and JSON Web Tokens (JWT) for secure authentication and role-based access control while supporting stable, uninterrupted operations.",
      "Optimized front-end state management with component-based development using ReactJS with Redux Toolkit and useMemo/useCallback for scalable UI architecture and utilizing custom hooks, reducing load times by 50%.",
    ],
    skills: ["JavaScript", "React", "React Native", "NodeJS", "MongoDB", "Expo", "AWS", "HTML", "CSS", "API Integration", "Mantine UI", "Postman", "Testing", "Git", "CI/CD", "Deployment", "DNS & Networks", "HTML", "CSS"]
  },
  {
    date: "2021 - 2022",
    position: "Software Engineer Intern",
    company: "Florida International University Dept. of Engineering & Computing",
    location: "Miami, FL",
    description: "Developed and maintained internal software tools at Florida International University, collaborating with technical staff to design, build, and test applications while applying core computer science principles in a production environment.",
    achievements: [
      "Directed a developmental team using Agile methodologies, leading sprint planning and managing testing phases to deliver high-quality application features on schedule.",
      "Crafted responsive user interfaces grounded in UX/UI best practices, utilizing tools such as Axure RP, Adobe XD, and Figma to create seamless, engaging experiences for web and mobile platforms.",
      "Designed comprehensive system architecture, including well-defined API structures and optimized database schemas, ensuring robust performance and long-term maintainability.",
      "Participated in daily standups and sprint planning meetings",
      "Debugged and resolved software issues across web and mobile platforms",
    ],
    skills: ["Python", "JavaScript", "Jira", "SQL", "Git", "Data Structures", "DNS & Networks", "Testing", "HTML", "CSS"]
  },
];
