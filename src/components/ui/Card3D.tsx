"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-10 to 10 degrees)
    const rX = ((mouseY / height) - 0.5) * -12; // tilt vertical
    const rY = ((mouseX / width) - 0.5) * 12;  // tilt horizontal

    setRotateX(rX);
    setRotateY(rY);

    // Dynamic Glare effect position
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    
    setGlareStyle({
      opacity: 0.25,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareStyle({ opacity: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative select-none ${className}`}
    >
      {/* Glare overlay */}
      <div 
        className="absolute inset-0 rounded-inherit pointer-events-none z-10 transition-opacity duration-300"
        style={{ ...glareStyle, borderRadius: "inherit" }}
      />
      {children}
    </motion.div>
  );
}
