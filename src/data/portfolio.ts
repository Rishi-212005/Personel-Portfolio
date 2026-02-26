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
    title: "E-Governance Portal",
    description: "Secure web portal for government services with role-based access control and multi-level authentication.",
    category: "Full Stack",
    tech: ["React", "Node.js", "MySQL", "RBAC"],
    github_url: "https://github.com",
    demo_url: "",
  },
  {
    id: "2",
    title: "Cyber Threat Dashboard",
    description: "Real-time cybersecurity monitoring dashboard with threat visualization and alert management.",
    category: "Cybersecurity",
    tech: ["React", "Python", "MongoDB", "WebSocket"],
    github_url: "https://github.com",
    demo_url: "",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Modern, animated portfolio built with React, Tailwind CSS, and Framer Motion with AI chatbot.",
    category: "Web App",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    github_url: "https://github.com",
    demo_url: "",
  },
  {
    id: "4",
    title: "Student Management System",
    description: "Full-stack CRUD application for managing student records with authentication and search.",
    category: "Full Stack",
    tech: ["PHP", "MySQL", "Bootstrap", "jQuery"],
    github_url: "https://github.com",
    demo_url: "",
  },
  {
    id: "5",
    title: "Secure Auth Library",
    description: "Reusable authentication module with JWT, OAuth2, and session management built for Node.js.",
    category: "Cybersecurity",
    tech: ["Node.js", "Express", "JWT", "OAuth2"],
    github_url: "https://github.com",
    demo_url: "",
  },
  {
    id: "6",
    title: "Task Tracker API",
    description: "RESTful API for task management with team collaboration features and real-time updates.",
    category: "Full Stack",
    tech: ["Express", "MongoDB", "Socket.io", "REST"],
    github_url: "https://github.com",
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
