"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Eye, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { resumeData } from "@/data/resumeData";

interface Certificate {
  title: string;
  issuer: string;
  description: string;
  image?: string;
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className="relative py-24 px-6 overflow-hidden bg-[#030308]/40 border-t border-white/5">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-950/30 px-3.5 py-1.5 rounded-full border border-purple-500/20 mb-4">
            Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Certificates & Training
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.certificates.map((cert: Certificate, idx: number) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="space-y-4">
                {/* Visual Icon Header */}
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white cursor-pointer">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-blue-400 font-semibold">{cert.issuer}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">
                  Verify Credentials
                </span>
                {cert.image && (
                  <span className="text-[9px] text-purple-400 font-bold bg-purple-950/40 px-2 py-0.5 border border-purple-500/20 rounded">
                    Has Document
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Zoom Overlay Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`relative w-full ${
                  selectedCert.image ? "max-w-2xl" : "max-w-md"
                } bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 glass-panel shadow-2xl z-10 overflow-hidden`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white bg-slate-900 transition-colors cursor-pointer z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Visual Elements */}
                <div className="flex flex-col space-y-5 pt-4">
                  {selectedCert.image ? (
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-slate-900/80 flex items-center justify-center">
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        width={800}
                        height={600}
                        className="object-contain w-full h-full"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-4 py-6">
                      <div className="p-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/10 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <Award className="w-10 h-10" />
                      </div>
                    </div>
                  )}

                  <div className="text-center space-y-1.5">
                    <h3 className="text-xl font-bold text-white tracking-wide">{selectedCert.title}</h3>
                    <p className="text-sm text-blue-400 font-bold">{selectedCert.issuer}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-light max-w-lg mx-auto">
                      {selectedCert.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest pt-2">
                    <CheckCircle2 className="w-4.5 h-4.5" /> Verified Professional
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
