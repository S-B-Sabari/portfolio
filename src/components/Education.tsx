"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { resumeData, Education as EduType } from "@/data/resumeData";

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6 overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 right-1/10 w-64 h-64 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            Qualifications
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Academic Background
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-8 before:w-[1px] before:bg-white/15">
          {resumeData.education.map((edu: EduType, idx: number) => (
            <motion.div
              key={`${edu.institution}-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-16 group"
            >
              {/* Timeline circle icon */}
              <div className="absolute left-4 top-1.5 p-2 rounded-full border border-white/10 bg-slate-950 text-blue-400 group-hover:border-purple-500/50 group-hover:text-white transition-all duration-300 z-10 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Card content */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                      {edu.institution}
                    </h3>
                    <p className="text-sm font-semibold text-blue-400">{edu.degree}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" /> {edu.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-lg self-start w-fit">
                  <Award className="w-4 h-4 text-emerald-400" /> Score: {edu.score}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
