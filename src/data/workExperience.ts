interface WorkExperienceEntry {
  date: string;
  title: string;
  company: string;
  description: string;
  keyPoints: string[];
  tech?: string[];
  location?: string;
}

export const workExperienceData: WorkExperienceEntry[] = [
  {
    date: "2024 - Present",
    title: "Full Stack Software Engineer",
    company: "Freelance & Personal Projects",
    location: "Miami, FL",
    description: "Developing full-stack web and mobile applications using modern technologies and frameworks.",
    keyPoints: [
      "Built and deployed multiple React and React Native applications",
      "Implemented AI-powered features using OpenAI API and vector databases",
      "Designed and developed RESTful APIs with Node.js and Express",
      "Managed cloud infrastructure on AWS and Google Cloud Platform",
      "Published mobile applications to App Store and Google Play"
    ],
    tech: ["JavaScript", "React", "React Native", "NodeJS", "Python", "Amazon Web Services", "OpenAI"]
  },
  {
    date: "2022 - 2024",
    title: "Software Developer",
    company: "Various Projects",
    location: "Miami, FL", 
    description: "Focused on full-stack development with emphasis on modern web technologies and mobile application development.",
    keyPoints: [
      "Developed responsive web applications using React and Next.js",
      "Created mobile applications with React Native and Expo",
      "Implemented database solutions using MongoDB and SQL",
      "Integrated third-party APIs and payment processing systems",
      "Collaborated on software development life cycle processes"
    ],
    tech: ["React", "MongoDB", "SQL", "Material UI", "Firebase", "Expo"]
  },
  {
    date: "2021 - 2022", 
    title: "Junior Developer",
    company: "Learning & Development",
    location: "Miami, FL",
    description: "Intensive learning period focusing on computer science fundamentals and modern development practices.",
    keyPoints: [
      "Completed Meta Front End Developer certification program",
      "Mastered data structures and algorithms in multiple languages",
      "Built portfolio projects demonstrating full-stack capabilities",
      "Gained proficiency in version control with Git and GitHub",
      "Learned deployment strategies and cloud services"
    ],
    tech: ["HTML", "CSS", "Bootstrap", "Git", "Google Cloud"]
  },
  {
    date: "2020 - 2021",
    title: "Career Transition & Education",
    company: "Self-Directed Learning",
    location: "Miami, FL",
    description: "Completed Bachelor's degree in Computer Science and began transitioning into software development.",
    keyPoints: [
      "Earned Bachelor's degree with focus on Computer Science",
      "Completed CompTIA A+ certification for technical foundation",
      "Gained business management and accounting technology certifications", 
      "Started learning programming fundamentals",
      "Built first web development projects"
    ],
    tech: ["Java", "C++", "Python"]
  }
];
