"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Award, CheckCircle, Languages, BookOpen } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function About() {
  const stats = [
    { 
      label: "Years Experience", 
      value: "9+ months", 
      detail: "Junior UI Developer",
      icon: <Award className="w-5 h-5 text-blue-400" /> 
    },
    { 
      label: "Projects Completed", 
      value: "04", 
      detail: "Development & UI Design",
      icon: <CheckCircle className="w-5 h-5 text-purple-400" /> 
    },
    { 
      label: "MCA Academic CGPA", 
      value: "8.7", 
      detail: "Mepco Schlenk Eng College",
      icon: <BookOpen className="w-5 h-5 text-emerald-400" /> 
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-[#030308]/40 border-y border-white/5">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-950/30 px-3.5 py-1.5 rounded-full border border-purple-500/20 mb-4">
            Biography
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Discover Who I Am
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Story */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-white/10">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">My Background</h3>
              </div>

              <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg">
                {resumeData.profile.about}
              </p>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <Languages className="w-4 h-4 text-purple-400" /> Languages Spoken
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {resumeData.languages.map((lang) => (
                    <span 
                      key={lang} 
                      className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-slate-950/60 text-slate-300 text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 tracking-wide block uppercase">
                    {stat.label}
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-white block">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 block font-light">
                    {stat.detail}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300 shadow-inner">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
