"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Star } from "lucide-react";
import { resumeData, Experience as ExpType } from "@/data/resumeData";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first is expanded by default

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden bg-[#030308]/40 border-y border-white/5">
      {/* Visual Accents */}
      <div className="absolute top-1/3 left-[-5%] w-[35vw] h-[35vw] rounded-full bg-blue-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-5%] w-[35vw] h-[35vw] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-950/30 px-3.5 py-1.5 rounded-full border border-purple-500/20 mb-4">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-white/10 pl-6 md:pl-8 space-y-12">
          
          {resumeData.experience.map((exp: ExpType, idx: number) => {
            const isExpanded = expandedIndex === idx;
            const isCurrent = exp.isCurrent;

            return (
              <div key={`${exp.company}-${idx}`} className="relative group">
                
                {/* Timeline node icon */}
                <span className={`absolute -left-[35px] md:-left-[43px] top-1.5 p-2 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                  isCurrent 
                    ? "bg-gradient-to-tr from-blue-500 to-purple-600 border-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110" 
                    : "bg-[#030308] border-white/10 text-slate-500 group-hover:border-purple-500/50 group-hover:text-white"
                }`}>
                  {isCurrent ? <Star className="w-3.5 h-3.5 text-white animate-pulse" /> : <Briefcase className="w-3.5 h-3.5" />}
                </span>

                {/* Main Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isCurrent 
                      ? "border-purple-500/30 shadow-[0_4px_30px_rgba(168,85,247,0.05)] bg-slate-900/50" 
                      : "border-white/10 hover:border-white/20 bg-slate-950/20"
                  }`}
                >
                  {/* Card Header (always visible) */}
                  <div 
                    onClick={() => toggleExpand(idx)}
                    className="p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-wide">{exp.company}</h3>
                        {isCurrent && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-extrabold uppercase tracking-wide">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" /> Current Role
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-blue-400">{exp.role}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> {exp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {exp.location}</span>
                      </div>
                    </div>

                    <button className="p-1 rounded-lg border border-white/5 text-slate-400 hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-white/5 bg-slate-900/15"
                      >
                        <div className="p-6 pt-4 space-y-4">
                          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Core Responsibilities & Learning outcomes
                          </h4>
                          <p className="text-slate-300 leading-relaxed text-sm font-light">
                            {exp.description}
                          </p>
                          
                          {/* Achievement tags / highlights related to this experience */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-[10px] bg-slate-900 text-slate-400 border border-white/5 px-2.5 py-1 rounded">
                              Responsive Design
                            </span>
                            <span className="text-[10px] bg-slate-900 text-slate-400 border border-white/5 px-2.5 py-1 rounded">
                              Modern Web Standards
                            </span>
                            <span className="text-[10px] bg-slate-900 text-slate-400 border border-white/5 px-2.5 py-1 rounded">
                              Collaborative Workflow
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
