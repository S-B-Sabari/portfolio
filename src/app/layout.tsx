import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import InteractiveBg from "@/components/ui/InteractiveBg";
import CommandPalette from "@/components/ui/CommandPalette";
import Dock from "@/components/ui/Dock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Sabari S B | Frontend Developer Portfolio",
  description: "Personal portfolio website of Sabari S B, a premium Frontend Developer specializing in high-performance web applications, React.js, and Next.js.",
  keywords: ["Sabari S B", "Frontend Developer", "React Developer", "Next.js Portfolio", "Figma Designer", "Madurai"],
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased bg-[#020205] text-slate-100 font-sans`}>
        {/* Global UI layout elements */}
        <CustomCursor />
        <InteractiveBg />
        <CommandPalette />
        <Dock />
        <Navbar />
        
        {/* Main page content layout with standard spacing padding */}
        <div className="pt-20">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
