"use client";

import React, { useState } from "react";
import { Mail, Phone, Check, Copy } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Background visual glows */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-blue-500/5 blur-[80px]" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Get In Touch
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Centered Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full items-stretch">
          
          {/* Email Widget */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-blue-400 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Email Address</span>
                <a href={`mailto:${resumeData.profile.email}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                  {resumeData.profile.email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Widget */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center gap-4 group hover:border-purple-500/30 transition-all duration-300">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-purple-400 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Phone Call</span>
              <a href={`tel:${resumeData.profile.phone.replace(/\s+/g, "")}`} className="text-sm font-semibold text-white hover:text-purple-400 transition-colors">
                {resumeData.profile.phone}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
