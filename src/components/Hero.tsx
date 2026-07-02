"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resumeData } from "@/data/resumeData";

const words = ["React.js", "Next.js", "Tailwind CSS", "Figma Design", "Modern Web Apps"];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);



  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6"
    >
      {/* Decorative Floating Blobs inside Hero */}
      <div className="absolute top-1/4 left-1/10 w-48 h-48 rounded-full bg-purple-500/5 blur-[80px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-64 h-64 rounded-full bg-blue-500/5 blur-[100px] animate-float-medium" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Intro */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 text-purple-300 text-xs font-semibold uppercase tracking-wider"
          >
            CURRENTLY WORKING AT NXDEEP CONNECTZ LLP
          </motion.div>

          {/* Name Reveal */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                {resumeData.profile.name}
              </span>
            </motion.h1>
          </div>

          {/* Role & Animated Typing */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl text-slate-300 font-medium"
          >
            A passionate <span className="text-blue-400 font-bold">{resumeData.profile.title}</span> specializing in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-extrabold typing-cursor">
              {typedText}
            </span>
          </motion.div>

          {/* Sub description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 max-w-xl text-base md:text-lg leading-relaxed font-light"
          >
            Developing scalable, high-performance web interfaces with a strong focus on clean code, responsive layout aesthetics, and seamless user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm tracking-wide rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Contact Me
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Profile Image */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            whileHover={{ y: -8, rotate: -1, borderColor: "rgba(168, 85, 247, 0.3)" }}
          >
            <Image
              src="/profile-image.JPG"
              alt={resumeData.profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              priority
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Elegant overlay gradient to fit the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-widest font-bold uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
