"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#030308]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-slate-300 tracking-wide">
            &copy; {new Date().getFullYear()} {resumeData.profile.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-500 font-light">
            Designed and built with Next.js, Tailwind CSS, & Framer Motion.
          </p>
        </div>

        {/* Heart Credit */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Crafted in Madurai, Tamil Nadu</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
        </div>

      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
