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
      "Built and shipped key product features for a multi-tenant SaaS platform supporting 50k+ monthly active user across Debt.com and multiple enterprise partners, delivering configuration-driven workflows in React, TypeScript, NestJS, and Firebase/Firestore.",
      "Developed and maintained serverless backend services on Google Cloud Platform, handling thousands of daily profile creations and updates with sub-second p95 response times using Cloud Functions and Firestore.",
      "Slashed production incidents and debugging time by ~50% through implementing structured logging and request traceability via Google Cloud Logging, facilitating faster root-cause analysis across frontend, backend, and database layers.",
      "Contributed to core user-facing workflows, including secure login and access controls, in a high-trust financial domain, ensuring correctness and stability across onboarding and partner-facing flows.",
      "Collaborated across product, design, QA, and engineering leadership, translating Zeplin designs into production-ready UI while effectively communicating technical decisions to non-technical stakeholders.",
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
      "Led a cross-functional team to design and deliver a proprietary property management platform supporting 100+ rental units while collaborating directly with investors to translate business objectives into scalable backend services and frontend workflows and driving adoption through structured onboarding that reduced manual management effort by ~40%.",
      "Integrated multiple REST APIs and services, ensuring reliable synchronization of real-time property listings and comprehensive rental market data, along with Stripe API for secure online rent payments resulting in increased tenant and management satisfaction and a 150% increase in lease renewal rates.",
      "Developed back-end architecture utilizing NodeJS, MongoDB for data, and AWS S3 for scalable file management, and OAuth 2.0, Firebase, and JSON Web Tokens (JWT) for secure user authentication and role-based access control.",
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
