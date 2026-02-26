export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  github_url: string;
  demo_url: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  points: string[];
  type: string;
  certificateUrl?: string;
}

export interface Education {
  id: string;
  title: string;
  organization: string;
  period: string;
  detail: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Academia Authenticator",
    description: "AI-powered certificate verification system that detects forged academic documents.",
    category: "AI / Backend",
    tech: ["Python", "OCR", "APIs"],
    github_url: "https://github.com/Rishi-212005/ACADEMIC-AUTHENTICATOR",
    demo_url: "",
  },
  {
    id: "2",
    title: "AI-Powered Raw Material Marketplace",
    description: "Full-stack marketplace for suppliers and shopkeepers with AI-assisted inventory and order management.",
    category: "Full Stack",
    tech: ["React", "Node.js", "Express", "MySQL"],
    github_url: "https://github.com/Rishi-212005/AI-POWERED-SHOPKEEPER-VENDOR-MANAGEMENT-SYSTEM",
    demo_url: "",
  },
  {
    id: "3",
    title: "InternConnect Campus Portal",
    description: "Internship and placement portal with role-based access for students, TPOs, and recruiters.",
    category: "Full Stack",
    tech: ["PHP", "MySQL", "JavaScript"],
    github_url: "https://github.com/Rishi-212005/InternConnect-Campus-Portal",
    demo_url: "",
  },
  {
    id: "4",
    title: "Library Seat Management System",
    description: "Web system to reserve and manage library seats with simple admin controls.",
    category: "Web App",
    tech: ["PHP", "MySQL", "Bootstrap"],
    github_url: "https://github.com/Rishi-212005/Library-Seat-Management-System",
    demo_url: "",
  },
  {
    id: "5",
    title: "Encoding-Decoding Management System",
    description: "Tool to securely encode and decode messages with a clean web interface.",
    category: "Utility",
    tech: ["PHP", "MySQL", "JavaScript"],
    github_url: "https://github.com/Rishi-212005/ENCODING-DECODING-MANAGEMENT-SYSTEM",
    demo_url: "",
  },
  {
    id: "6",
    title: "Portfolio Website (Personel-Portfolio)",
    description: "Modern portfolio site showcasing projects, skills, and experience with smooth UI.",
    category: "Web App",
    tech: ["React", "TypeScript", "Tailwind"],
    github_url: "https://github.com/Rishi-212005/Personel-Portfolio",
    demo_url: "",
  },
  {
    id: "7",
    title: "Resume AI Assistant",
    description: "AI-driven helper that tailors resume and profile content using your data.",
    category: "AI / Web",
    tech: ["TypeScript", "React", "AI APIs"],
    github_url: "https://github.com/Rishi-212005/resume-ai-master",
    demo_url: "",
  },
  {
    id: "8",
    title: "Sai’s Digital Canvas",
    description: "Interactive 3D-inspired personal canvas exploring ideas and experiments.",
    category: "Experimental",
    tech: ["React", "Three.js", "TypeScript"],
    github_url: "https://github.com/Rishi-212005/sai-s-digital-canvas",
    demo_url: "",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Software Engineer Intern",
    organization: "National Informatics Centre (NIC)",
    period: "May 2025 – Jul 2025",
    location: "Ananthapuramu, India",
    points: [
      "Worked on CT Ais and Social Welfare Departments project",
      "Built secure, database-driven web applications using PHP & MySQL",
      "Collaborated with senior engineers on system architecture",
    ],
    type: "work",
    certificateUrl: "/certificates/nic-internship.pdf",
  },
];

export const education: Education[] = [
  {
    id: "1",
    title: "B.Tech Computer Science & Engineering",
    organization: "JNTU Anantapur",
    period: "2023 – 2027",
    detail: "Specializing in Software Engineering & Cybersecurity",
  },
  {
    id: "2",
    title: "Intermediate (MPC)",
    organization: "Narayana Jr College",
    period: "2021 – 2023",
    detail: "JEE Mains 2024 - Top 4% Percentile",
  },
];

export const certifications: Certification[] = [
  {
    id: "0",
    title: "NIC e-Governance Internship",
    issuer: "National Informatics Centre",
    date: "Sep 2025",
    credentialUrl: "/certificates/nic-internship.pdf",
  },
  {
    id: "1",
    title: "Cybersecurity Fundamentals",
    issuer: "Infosys Springboard",
    date: "Jan 2026",
    credentialUrl: "/certificates/cybersecurity-fundamentals.pdf",
  },
  {
    id: "2",
    title: "Fundamentals of Cryptography",
    issuer: "Infosys Springboard",
    date: "Jan 2026",
    credentialUrl: "/certificates/fundamentals-of-cryptography.pdf",
  },
  {
    id: "3",
    title: "Cryptography in IT Security & Hacking",
    issuer: "Infosys Springboard",
    date: "Feb 2026",
    credentialUrl: "/certificates/cryptography-it-security-hacking.pdf",
  },
  {
    id: "4",
    title: "Introduction to PKI",
    issuer: "Infosys Springboard",
    date: "Feb 2026",
    credentialUrl: "/certificates/intro-to-pki.pdf",
  },
  {
    id: "5",
    title: "Python Case Study - Cryptography",
    issuer: "Infosys Springboard",
    date: "Feb 2026",
    credentialUrl: "/certificates/python-cryptography.pdf",
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "JEE Mains Top 4%",
    description: "Secured top 4 percentile in JEE Mains 2024",
    icon: "trending-up",
  },
  {
    id: "2",
    title: "NIC Internship",
    description: "Selected for prestigious NIC e-Governance internship",
    icon: "award",
  },
  {
    id: "3",
    title: "Cybersecurity Certs",
    description: "3+ certifications in cybersecurity and ethical hacking",
    icon: "shield",
  },
  {
    id: "4",
    title: "10+ Projects",
    description: "Built and deployed 10+ full-stack web applications",
    icon: "star",
  },
];
