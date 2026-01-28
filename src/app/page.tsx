"use client";
import React, { useState } from "react";
import PortfolioHero from "@/components/ui/portfolio-hero";
import WorksGallery from "@/components/ui/works-gallery";
import { ScrollingSkills } from "@/components/ui/scrolling-skills";
import AboutMe from "@/components/ui/about-me";
import { motion } from "framer-motion";

export default function Home() {
  const [isExiting, setIsExiting] = useState(false); // Tüm sayfanın çıkış durumu

  const handleGlobalExit = () => setIsExiting(true);

  return (
    // Motion.main sayesinde her şey tek bir elden kararacak/yok olacak
    <motion.main 
      animate={{ opacity: isExiting ? 0 : 1, filter: isExiting ? "blur(10px)" : "blur(0px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex min-h-screen flex-col items-center justify-between"
    >
      <div className="w-full">
        <PortfolioHero />
      </div>

      <ScrollingSkills />

      <div id="works" className="w-full">
        {/* Fonksiyonu galeriye paslıyoruz */}
        <WorksGallery onNavigate={handleGlobalExit} />
      </div>
      
      <div id="about" className="w-full">
        <AboutMe />
      </div>
    </motion.main>
  );
}