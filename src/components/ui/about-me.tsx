"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; 

const sliderImages = [
  "/meldaprofil.jpg",
  "/works/works1.png",
  "/works/works2.png",
];

export default function AboutMe() {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // NOT: Buradaki scroll kodu SİLİNDİ. 
  // Artık kontrol tamamen Hero dosyasında olacak ki hızlar eşit olsun.

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

        {/* ORTA KISIM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <div className="space-y-8 order-2 md:order-1">
            <h3 className="text-2xl font-bold tracking-tight uppercase text-[#0082c8]" 
                style={{ fontFamily: "'Fira Code', monospace" }}>
              Design & Build
            </h3>
            
            <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-90" 
                 style={{ fontFamily: "'Antic', sans-serif" }}>
              <p>
                I am a Product Designer and Production Consultant who prefers the workshop to the desk. My career is defined by bridging the gap between digital concepts and physical reality.
              </p>
              <p>
                Building on my tenure at Urban Atölye, Tuspa Architecture, and Phi Art, I currently serve as a strategic consultant for various design and manufacturing projects. I don't just deliver drawings; I manage the entire lifecycle—ensuring that complex designs are built to last, from luxury interiors to mass production.

              </p>
            </div>

            <a 
  href="https://docs.google.com/document/d/1eyfxWMpoZX792H22DJgJL0euYFKCpSpK0h7VpjUgcH4/edit?pli=1&tab=t.0" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-3 px-6 py-3 bg-[#0082c8] text-white rounded-sm hover:opacity-80 transition-opacity font-bold text-sm shadow-md"
  style={{ fontFamily: "'Fira Code', monospace" }}
>
  <Eye size={18} /> 
  VIEW CV 
</a>
          </div>

          <div className="order-1 md:order-2 relative w-full aspect-[4/3] group rounded-sm overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            
            <div className="relative w-full h-full">
              <Image 
                key={currentIndex} 
                src={sliderImages[currentIndex]} 
                alt="Profile Slider" 
                fill 
                className="object-cover transition-opacity duration-500"
                priority
              />
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {sliderImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all border border-black/20 ${idx === currentIndex ? "bg-white scale-125" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          
          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold uppercase tracking-tight text-[#0082c8]" 
                  style={{ fontFamily: "'Fira Code', monospace" }}>
                Methodology & Background
              </h3>
              <p className="text-sm md:text-base leading-relaxed opacity-90" 
                 style={{ fontFamily: "'Antic', sans-serif" }}>
                I hold a degree in Industrial Product Design from Bahçeşehir University, but my real edge comes from the field. I combine the precision of parametric design with the grit of hands-on fabrication. My focus is always on manufacturability. I use advanced computational tools to solve production challenges before they happen. Whether I'm detailing a complex joint or managing a material supply chain, my goal is always the same: precision in execution.

              </p>
            </div>
            
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                src="/works/works4.png" 
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
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
               Outside the studio, I am a competitive sailor. Navigating open water requires spatial awareness, foresight, and the resilience to handle changing conditions. I apply this same discipline to my work. In a complex construction site, just like at sea, you need to be adaptable, quick, and technically sound. This mindset allows me to navigate project crises with the same calm I bring to the water.

              </p>
            </div>

            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                src="/works/works6.png" 
                alt="Inspiration"
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