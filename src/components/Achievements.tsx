"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Palette } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function Achievements() {
  const getIcon = (title: string) => {
    if (title.includes("Academic")) return <Award className="w-6 h-6 text-purple-400" />;
    if (title.includes("AI")) return <Zap className="w-6 h-6 text-blue-400" />;
    return <Palette className="w-6 h-6 text-pink-400" />;
  };

  return (
    <section id="achievements" className="relative py-24 px-6 overflow-hidden bg-[#030308]/40 border-y border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-950/30 px-3.5 py-1.5 rounded-full border border-purple-500/20 mb-4">
            Highlights
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Key Achievements
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.achievements.map((ach, idx) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-[1px] rounded-2xl overflow-hidden group bg-gradient-to-tr from-white/10 to-transparent hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-500"
            >
              {/* Internal Card */}
              <div className="h-full bg-slate-950/80 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-between space-y-6">
                
                {/* Header Icon + Label */}
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(ach.title)}
                  </div>
                  <span className="text-[10px] tracking-wider font-extrabold text-purple-400 bg-purple-950/30 px-2.5 py-1 border border-purple-500/20 rounded-full">
                    {ach.score}
                  </span>
                </div>

                {/* Information */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {ach.detail}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
