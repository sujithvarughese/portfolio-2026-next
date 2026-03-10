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
    date: "2020 - Present",
    position: "Full Stack Engineer",
    company: "Freelance/Contract",
    location: "Miami, FL",
    description: "Specialized in building comprehensive web and mobile applications from concept to deployment, working with diverse clients to deliver scalable solutions.",
    achievements: [
      "Developed and deployed 15+ full-stack applications using React, React Native, and Node.js",
      "Built AI-powered applications integrating OpenAI APIs and vector databases",
      "Implemented responsive designs with modern UI frameworks and CSS libraries",
      "Managed complete SDLC from requirements gathering to production deployment",
      "Configured AWS and Google Cloud infrastructure for scalable application hosting"
    ],
    skills: ["React", "React Native", "NodeJS", "TypeScript", "MongoDB", "AWS", "OpenAI"]
  },
  {
    date: "2019 - 2020",
    position: "Software Developer",
    company: "Technology Solutions",
    location: "Miami, FL", 
    description: "Focused on web application development and database management while gaining experience in full-stack development methodologies.",
    achievements: [
      "Built responsive web applications using HTML, CSS, JavaScript, and React",
      "Designed and implemented SQL database schemas for business applications",
      "Collaborated with cross-functional teams to deliver client requirements",
      "Participated in code reviews and agile development processes",
      "Developed RESTful APIs and integrated third-party services"
    ],
    skills: ["JavaScript", "React", "SQL", "HTML", "CSS", "API Integration"]
  },
  {
    date: "2018 - 2019",
    position: "Junior Developer",
    company: "StartUp Ventures",
    location: "Miami, FL",
    description: "Entry-level position focused on learning modern web development technologies and contributing to startup product development.",
    achievements: [
      "Contributed to front-end development using React and modern JavaScript",
      "Assisted in mobile app development with React Native",
      "Participated in daily standups and sprint planning meetings",
      "Debugged and resolved software issues across web and mobile platforms",
      "Learned version control with Git and collaborative development workflows"
    ],
    skills: ["JavaScript", "React", "React Native", "Git", "Agile"]
  },
  {
    date: "2015 - 2018",
    position: "Business Systems Analyst",
    company: "Corporate Solutions Inc",
    location: "Miami, FL",
    description: "Analyzed business processes and technology requirements, bridging the gap between business stakeholders and technical teams.",
    achievements: [
      "Analyzed business requirements and translated them into technical specifications",
      "Managed data analysis and reporting using SQL and business intelligence tools",
      "Coordinated between development teams and business stakeholders",
      "Created documentation for business processes and system workflows",
      "Supported system implementations and user training initiatives"
    ],
    skills: ["Business Analysis", "SQL", "Project Management", "Documentation"]
  }
];
