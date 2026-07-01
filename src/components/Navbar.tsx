"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resumeData } from "@/data/resumeData";

const navItems = [
  { label: "Home", href: "/", id: "hero" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only run scroll spy on the homepage
      if (pathname === "/") {
        const scrollPosition = window.scrollY + 200; // offset
        for (const item of navItems) {
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(item.id);
              break;
            }
          }
        }
      } else {
        // Highlight based on current pathname route (e.g. /projects -> projects)
        const activeItem = navItems.find((item) => pathname === item.href);
        if (activeItem) {
          setActiveSection(activeItem.id);
        } else {
          // Fallback parsing /about/ or /projects/
          const segment = pathname.split("/")[1];
          if (segment) setActiveSection(segment);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-3 bg-[#030308]/60 backdrop-blur-md border-b border-white/10" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link 
            href="/"
            onClick={() => handleLinkClick("hero")}
            className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity cursor-pointer uppercase"
          >
            {resumeData.profile.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-x-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              onClick={() => handleLinkClick("contact")}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 cursor-pointer"
            >
              HIRE ME <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#030308]/95 backdrop-blur-lg md:hidden flex flex-col justify-center items-center gap-8"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleLinkClick(item.id)}
                      className={`text-2xl font-semibold tracking-wider cursor-pointer ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
            >
              <Link
                href="/#contact"
                onClick={() => handleLinkClick("contact")}
                className="mt-4 px-6 py-3 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
