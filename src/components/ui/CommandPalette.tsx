"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Sparkles, Mail, Phone, Check } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle command palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { name: "Hero / Top", id: "hero" },
    { name: "About Me", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Work Experience", id: "experience" },
    { name: "Technical Projects", id: "projects" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  const actions = [
    {
      name: "Copy Email Address",
      icon: copied ? <Check className="w-4 h-4 text-green-400" /> : <Mail className="w-4 h-4 text-purple-400" />,
      perform: handleCopyEmail,
    },
    {
      name: `Call Sabari (${resumeData.profile.phone})`,
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        window.open(`tel:${resumeData.profile.phone.replace(/\s+/g, "")}`);
        setIsOpen(false);
      },
    },
  ];

  // Filter sections and projects based on query
  const filteredSections = sections.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = resumeData.projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredActions = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Prompt in Header / Hero area */}
      <div className="hidden lg:block fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-md text-slate-400 text-xs hover:border-purple-500/40 hover:text-white transition-all cursor-pointer shadow-lg"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/20 text-slate-300 text-[10px]">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/20 text-slate-300 text-[10px]">K</kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cmd-backdrop bg-black/60"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl z-10 glass-panel"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Type a command or search projects..."
                  className="w-full bg-transparent text-white outline-none border-none placeholder-slate-500 text-sm py-1"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-300 border border-white/10 px-1.5 py-0.5 rounded bg-slate-900"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions */}
              <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
                {/* Navigation Section */}
                {filteredSections.length > 0 && (
                  <div className="mb-4">
                    <h3 className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      Go To Section
                    </h3>
                    <div className="space-y-0.5">
                      {filteredSections.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleNavigate(s.id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left text-sm transition-colors cursor-pointer"
                        >
                          <Hash className="w-4 h-4 text-slate-500" />
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {filteredActions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      Quick Actions
                    </h3>
                    <div className="space-y-0.5">
                      {filteredActions.map((a) => (
                        <button
                          key={a.name}
                          onClick={a.perform}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left text-sm transition-colors cursor-pointer"
                        >
                          {a.icon}
                          {a.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {filteredProjects.length > 0 && (
                  <div>
                    <h3 className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      Technical Projects
                    </h3>
                    <div className="space-y-0.5">
                      {filteredProjects.map((p) => (
                        <button
                          key={p.title}
                          onClick={() => handleNavigate("projects")}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left text-sm transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            {p.title}
                          </span>
                          <span className="text-[10px] text-slate-500 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredSections.length === 0 &&
                  filteredProjects.length === 0 &&
                  filteredActions.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-500">
                      No results found for &ldquo;{query}&rdquo;
                    </div>
                  )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
