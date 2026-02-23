"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; 

// Slider'da dönecek resimler
const methodologyImages = [
  "/about/meto1.jpg",
  "/about/meto2.jpg",
  "/about/meto3.jpg",
];

export default function AboutMe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % methodologyImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + methodologyImages.length) % methodologyImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-20 px-4 md:px-6"
    >
      <div className="max-w-screen-xl mx-auto space-y-16">
        
        {/* ANA BAŞLIK */}
        <div className="w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0082c8]" 
              style={{ fontFamily: "'Fira Code', monospace" }}>
            ABOUT ME
          </h2>
        </div>

        {/* ORTA KISIM: DESIGN & BUILD (Artık Resim Sabit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h3 className="text-2xl font-bold tracking-tight uppercase text-[#0082c8]" 
                style={{ fontFamily: "'Fira Code', monospace" }}>
              Design & Build
            </h3>
            
            <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-90" 
                 style={{ fontFamily: "'Antic', sans-serif" }}>
              <p>
                As an Industrial Designer and Production Consultant, my real passion lies in the making. I’ve always believed that the magic happens when an idea jumps off the screen and into the physical world.
              </p>
              <p>
                Having worked closely with architects at studios like Urban Atölye, Tuspa, and Phi Art, my focus has always been anchored in deep material knowledge and hands-on production. Currently, I serve as a strategic consultant across various manufacturing projects. My approach goes beyond delivering blueprints—I manage the complete lifecycle to ensure that every design, from a bespoke interior detail to a mass-produced product, is perfectly executed.
              </p>
            </div>

            <a 
              href="https://docs.google.com/document/d/1eyfxWMpoZX792H22DJgJL0euYFKCpSpK0h7VpjUgcH4/edit?pli=1&tab=t.0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#0082c8] text-white rounded-sm hover:opacity-80 transition-opacity font-bold text-sm shadow-md"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <Eye size={18} /> VIEW CV 
            </a>
          </div>

          {/* SAĞ TARAF: SABİT RESİM */}
          <div className="order-1 md:order-2 relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <Image 
              src="/about/aboutme.png" 
              alt="Profile" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ALT KISIM: METHODOLOGY (Slider Buraya Geldi) & MINDSET */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          
          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold uppercase tracking-tight text-[#0082c8]" 
                  style={{ fontFamily: "'Fira Code', monospace" }}>
                Methodology & Background
              </h3>
              <p className="text-sm md:text-base leading-relaxed opacity-90" 
                 style={{ fontFamily: "'Antic', sans-serif" }}>
                While my foundation is a degree in Industrial Product Design from Bahçeşehir University, my true expertise was forged out in the field. I love blending the exactness of parametric design with the reality of hands-on fabrication. My primary focus always comes back to manufacturability. By using advanced computational tools, I always anticipate production hurdles long before they arise.
              </p>
            </div>
            
            {/* SLIDER BURADA */}
            <div className="relative w-full aspect-[16/16] overflow-hidden rounded-sm group bg-neutral-100 dark:bg-neutral-800">
              <Image 
                key={currentIndex} 
                src={methodologyImages[currentIndex]} 
                alt="Methodology Slider" 
                fill 
                className="object-cover transition-opacity duration-500"
              />
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold uppercase tracking-tight text-[#0082c8]" 
                  style={{ fontFamily: "'Fira Code', monospace" }}>
                Mindset
              </h3>
              <p className="text-sm md:text-base leading-relaxed opacity-90" 
                 style={{ fontFamily: "'Antic', sans-serif" }}>
               When I am outside the studio environment, you will find me racing as a competitive sailor. Successfully navigating open waters demands intense spatial awareness, strategic foresight, and the resilience to adapt to shifting conditions. I bring this exact rigorous discipline directly into my professional work. On a chaotic production site, much like being out at sea, you must remain highly adaptable.
              </p>
            </div>

            <div className="relative w-full aspect-[16/16] overflow-hidden rounded-sm transition-all duration-700">
               <Image 
                src="/about/mindset.JPG" 
                alt="Mindset Inspiration"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}