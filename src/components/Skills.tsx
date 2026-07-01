"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal, Database, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { resumeData } from "@/data/resumeData";
import Card3D from "./ui/Card3D";

const getSkillIcon = (name: string) => {
  // Mapping of skill names to local public images folder PNGs
  const imageMapping: Record<string, string> = {
    "JavaScript": "/images/js.png",
    "HTML5": "/images/html5.png",
    "CSS3": "/images/css-3.png",
    "Express.js": "/images/express.png",
    "MongoDB": "/images/mongodb-img.png",
    "Figma": "/images/figma.png",
    "Clerk (Auth)": "/images/clerk.png",
    "Adobe Photoshop": "/images/adobe.png",
    "Canva": "/images/canva.png",
    "Node.js": "/images/node-img.png",
    "C": "/images/c.png"
  };

  if (imageMapping[name]) {
    return (
      <div className="relative w-10 h-10 flex items-center justify-center">
        <Image
          src={imageMapping[name]}
          alt={name}
          width={40}
          height={40}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    );
  }

  // Fallbacks for React, Next, Tailwind, GitHub
  switch (name) {
    case "React.js":
      return (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-cyan-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "Next.js":
      return (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="currentColor"/>
          </mask>
          <g mask="url(#mask0)">
            <circle cx="90" cy="90" r="90" fill="black"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.0136V68.9192L135.54 157.52C140.407 153.948 144.757 149.598 148.329 144.731C148.736 144.177 149.129 143.61 149.508 143.031V157.52Z" fill="white"/>
            <path d="M115 54H127V126H115V54Z" fill="white"/>
          </g>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case "GitHub":
      return (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-slate-100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      );
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  // Map category title to appropriate Lucide icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code className="w-4 h-4" />;
      case "Backend":
        return <Terminal className="w-4 h-4" />;
      case "Database":
        return <Database className="w-4 h-4" />;
      case "Tools & Design":
        return <Settings className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  // Get active skill list
  const activeSkills = resumeData.skills.find(
    (c) => c.title === activeCategory
  )?.skills || [];

  // Flatten all skills for the infinite marquee
  const allSkillNames = resumeData.skills.flatMap((cat) => cat.skills.map((s) => s.name));
  const marqueeItems = [...allSkillNames, ...allSkillNames, ...allSkillNames]; // multiply to fill loop width

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      {/* Background Glow Bubbles */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-500/5 blur-[80px]" />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            Technical Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white animate-fade-in">
            Core Competencies
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {resumeData.skills.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                activeCategory === category.title
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-[0_0_15px_rgba(99,102,241,0.35)] scale-105"
                  : "border-white/10 bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/25"
              }`}
            >
              {getCategoryIcon(category.title)}
              {category.title}
            </button>
          ))}
        </div>

        {/* Dynamic Skill Grid */}
        <div className="min-h-[250px]">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card3D className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/25 transition-all text-center flex flex-col items-center justify-center space-y-4 group">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/10 shadow-inner group-hover:bg-slate-800 transition-colors">
                      {getSkillIcon(skill.name)}
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide">{skill.name}</span>
                  </Card3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Infinite Marquee of Technologies */}
        <div className="mt-20 border-t border-b border-white/5 py-8 overflow-hidden relative select-none">
          {/* Side Gradients overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030308] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030308] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {marqueeItems.map((name, idx) => (
              <span 
                key={`${name}-${idx}`} 
                className="text-lg md:text-2xl font-bold tracking-widest text-slate-500/35 hover:text-purple-400 transition-colors uppercase cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
