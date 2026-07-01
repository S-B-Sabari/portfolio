export interface Project {
  title: string;
  category: "Development" | "UI/UX Design";
  tech: string[];
  duration: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  isCurrent?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  score: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level in percentage for animated progress
}

export const resumeData = {
  profile: {
    name: "SABARI S B",
    title: "Frontend Developer",
    location: "Madurai, Tamil Nadu, India",
    email: "sabarisb67@gmail.com",
    phone: "+91 90873 75866",
    github: "https://github.com/S-B-Sabari",
    linkedin: "https://linkedin.com/in/sabari-sb",
    behance: "https://behance.net/sabari-sb",
    about: "Frontend Developer with experience in building responsive, user-friendly, and modern web applications using HTML, CSS, JavaScript, React.js, and Next.js. Currently working at Nxdeep Connectz LLP, where I develop scalable frontend solutions with a strong focus on performance, clean code, and responsive design. Passionate about creating intuitive user interfaces, learning new technologies, and collaborating with teams to deliver high-quality digital products."
  },
  skills: [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "JavaScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", level: 75 }
      ]
    },
    {
      title: "Tools & Design",
      skills: [
        { name: "Figma", level: 85 },
        { name: "GitHub", level: 88 },
        { name: "Clerk (Auth)", level: 80 },
        { name: "Adobe Photoshop", level: 75 },
        { name: "Canva", level: 80 }
      ]
    },
    {
      title: "Programming",
      skills: [
        { name: "JavaScript", level: 88 },
        { name: "C", level: 70 }
      ]
    }
  ] as SkillCategory[],
  experience: [
    {
      company: "Nxdeep Connectz LLP",
      role: "Frontend Developer",
      duration: "May 2026 – Present",
      location: "Madurai, Tamil Nadu, India",
      description: "Developing scalable, high-performance frontend solutions, maintaining clean-code principles, and collaborating on responsive web application architectures.",
      isCurrent: true
    },
    {
      company: "Gatescloud Technologies",
      role: "UI/UX Designer & Frontend Developer Intern",
      duration: "Dec 2025 – May 2026",
      location: "Madurai, Tamil Nadu, India",
      description: "Designing user-centric UI/UX interfaces and building responsive, scalable frontend applications using modern web technologies.",
      isCurrent: false
    },
    {
      company: "Elysium Technologies Private Limited",
      role: "Inplant Trainee",
      duration: "June 21 – 25, 2024",
      location: "Madurai, Tamil Nadu, India",
      description: "Gained hands-on experience in web development concepts and real-time project workflows.",
      isCurrent: false
    }
  ] as Experience[],
  projects: [
    {
      title: "Matrimony Website",
      category: "Development",
      tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      duration: "March 2026 – Present",
      description: "Working on a live matrimony platform, developing responsive UI using React.js and contributing to backend services with Node.js and MongoDB.",
      liveUrl: "#",
      githubUrl: "https://github.com/S-B-Sabari",
      thumbnail: "/thumbnails/react.png"
    },
    {
      title: "AI Resume Builder",
      category: "Development",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      duration: "Jan 2026 – March 2026",
      description: "Developed a full-stack AI-powered resume builder with features to create, edit, and download professional resumes. Implemented secure user authentication, AI-based content generation, RESTful APIs, and MongoDB for efficient data management.",
      liveUrl: "#",
      githubUrl: "https://github.com/S-B-Sabari",
      thumbnail: "/thumbnails/nextjs.png"
    },
    {
      title: "Matrimony Website (UI/UX)",
      category: "UI/UX Design",
      tech: ["Figma", "UI Design", "Prototyping"],
      duration: "Feb 2026 – March 2026",
      description: "Designed a modern matrimony website in Figma focused on simplicity, clarity, and emotional connection.",
      liveUrl: "https://behance.net/sabari-sb",
      thumbnail: "/thumbnails/matrimony.png"
    },
    {
      title: "Travel Website (UI/UX)",
      category: "UI/UX Design",
      tech: ["Figma", "UI Design", "Landing Page"],
      duration: "Jan 2026 – Feb 2026",
      description: "Designed a modern travel landing page in Figma with a clear layout and user-friendly interface.",
      liveUrl: "https://behance.net/sabari-sb",
      thumbnail: "/thumbnails/travel.png"
    }
  ] as Project[],
  education: [
    {
      institution: "Mepco Schlenk Engineering College",
      degree: "Master of Computer Applications (MCA)",
      duration: "2024 – 2026",
      score: "CGPA: 8.7"
    },
    {
      institution: "Sourashtra College, Madurai",
      degree: "B.Sc. Mathematics",
      duration: "2021 – 2024",
      score: "CGPA: 6.7"
    }
  ] as Education[],
  certificates: [
    {
      title: "Frontend Developer Certificate",
      issuer: "Gatescloud Technologies Private Limited",
      description: "Certified for development work during internship.",
      image: "/certificates/gatescloud.png"
    },
    {
      title: "Inplant Trainee Certificate",
      issuer: "Elysium Technologies Private Limited",
      description: "Certified for training in web development workflows."
    },
    {
      title: "Web Developer Trainee Certificate",
      issuer: "XploCode Infotech Private Limited",
      description: "Certified after completion of a web trainee course and mini project."
    }
  ],
  languages: ["English", "Tamil", "Sourashtra"],
  achievements: [
    {
      title: "MCA Academic Performance",
      score: "8.7 CGPA",
      detail: "Graduated with top academic standing from Mepco Schlenk Engineering College."
    },
    {
      title: "Full Stack AI Builder",
      score: "Completed",
      detail: "Successfully developed and launched an end-to-end AI Resume Builder within 2 months."
    },
    {
      title: "Design Portfolio",
      score: "Active",
      detail: "Maintained a Behance portfolio showcasing clean, user-centric interfaces."
    }
  ]
};
