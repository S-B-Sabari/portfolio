"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - 175); // Half of glow width (350px)
      mouseY.set(clientY - 175);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates tracker for canvas repulsion
    const mouse = { x: -1000, y: -1000, radius: 150 };
    const handleCanvasMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleCanvasMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener("mousemove", handleCanvasMouseMove);
    document.addEventListener("mouseleave", handleCanvasMouseLeave);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow float
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4 - 0.2; // slight upward drift
        this.radius = Math.random() * 1.8 + 0.8;
        this.baseOpacity = Math.random() * 0.35 + 0.15;
        this.opacity = this.baseOpacity;
        
        // Dynamic colors in the theme palette
        const colors = [
          "rgba(59, 130, 246, ", // blue-500
          "rgba(99, 102, 241, ", // indigo-500
          "rgba(139, 92, 246, ", // violet-500
          "rgba(168, 85, 247, ", // purple-500
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (repulsion + brightness boost)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Gently push away
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
          this.opacity = Math.min(0.8, this.baseOpacity + force * 0.4);
        } else {
          // Fade back to baseline
          if (this.opacity > this.baseOpacity) {
            this.opacity -= 0.01;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.shadowBlur = this.radius * 2;
        ctx.shadowColor = `${this.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    const particleCount = Math.min(75, Math.floor((width * height) / 16000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with thin glowing lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update each particle
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      document.removeEventListener("mouseleave", handleCanvasMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-[#020205] select-none pointer-events-none">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Mesh Gradients */}
      <div className="absolute inset-0 mesh-bg opacity-30 animate-pulse" />

      {/* Dynamic Interactive Particle Field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />

      {/* Dynamic Glowing Blob following mouse */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-[100px] mix-blend-screen pointer-events-none hidden lg:block"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* Static Glow elements for Ambient depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
    </div>
  );
}
