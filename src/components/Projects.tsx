"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Code2, Palette } from "lucide-react";
import Image from "next/image";
import { resumeData, Project } from "@/data/resumeData";
import Card3D from "./ui/Card3D";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Development" | "UI/UX Design">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Development", "UI/UX Design"] as const;

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter((project) => {
      const matchesFilter = activeFilter === "All" || project.category === activeFilter;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Technical Projects
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Search and Filters Panel */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 glass-panel p-4 rounded-2xl border border-white/10 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 focus:border-purple-500/55 rounded-[5px] pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 w-full md:w-auto justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-white text-slate-950 border-white font-bold"
                    : "border-white/5 bg-slate-950/50 text-slate-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                layout
              >
                <Card3D className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between h-full group hover:border-purple-500/20">
                  {/* Decorative Card Header Visual (Mockup) */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950 border-b border-white/5 flex items-center justify-center">
                    
                    {/* CSS Patterns Grid for Code feel */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                    
                    {/* Ambient Glow mesh inside mockup */}
                    <div className={`absolute inset-0 bg-gradient-to-tr opacity-25 group-hover:opacity-40 transition-opacity duration-300 ${
                      project.category === "Development" 
                        ? "from-blue-600/30 via-indigo-600/10 to-purple-600/30" 
                        : "from-pink-600/30 via-purple-600/10 to-indigo-600/30"
                    }`} />

                    {/* Window Controls Visual */}
                    <div className="absolute top-3 left-4 flex gap-1.5 z-20">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>

                    {/* Main Mockup Logo/Visual or Thumbnail cover */}
                    {project.thumbnail ? (
                      <div className="absolute inset-0 w-full h-full z-10">
                        <Image 
                          src={project.thumbnail} 
                          alt={project.title} 
                          width={640}
                          height={360}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                        <div className="p-4 rounded-full bg-slate-900 border border-white/10 shadow-2xl">
                          {project.category === "Development" ? (
                            <Code2 className="w-8 h-8 text-blue-400" />
                          ) : (
                            <Palette className="w-8 h-8 text-purple-400" />
                          )}
                        </div>
                        <span className="text-[10px] tracking-wider font-extrabold text-slate-400 uppercase bg-slate-900/80 px-2 py-0.5 border border-white/5 rounded">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Subtle Title Backdrop watermark */}
                    <div className="absolute -bottom-6 -right-6 text-7xl font-extrabold text-white/2 select-none tracking-tight">
                      {project.title.split(" ")[0]}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-bold text-white tracking-wide">{project.title}</h3>
                        <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-white/5 font-semibold whitespace-nowrap">
                          {project.duration}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges & CTA links */}
                    <div className="mt-6 space-y-4">
                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tool) => (
                          <span 
                            key={tool} 
                            className="text-[9px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-white/5 font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors ml-auto cursor-pointer"
                          >
                            Live Demo <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-sm">
            No projects found matching the criteria &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

      </div>
    </section>
  );
}
