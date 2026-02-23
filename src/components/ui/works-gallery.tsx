"use client";

import React, { useState } from 'react';
import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "framer-motion"; 
import { useRouter } from 'next/navigation';

const galleryData = [
  { id: 1, title: "Structure & Production Design Ahama Living, Göcek Hotel", src: "/works/w1/w1.1.1.jpg" },
  { id: 2, title: "Deck Rehabilitation", src: "/works/w2/w2.JPG" },
  { id: 3, title: "Architectural Competition", src: "/works/w3/w3.1.jpg" },
  { id: 4, title: "Concrete Elements", src: "/works/w4/w4.1.png" },
  { id: 5, title: "Wall Sconce", src: "/works/w5/w5.1.1.jpeg" },
  { id: 6, title: "Cement Mixed Planters - Various Sizes", src: "/works/w6/w6.4.png" },
  { id: 7, title: "Ceramic Tile Mixed Fluid Forms Installation", src: "/works/w7/w7.3.png" },
  { id: 8, title: "Cement Mixed Sculpture Installation 17th Istanbul Biennale", src: "/works/w8/w8.1.1.png" },
  { id: 9, title: "Industrial Complex", src: "/works/w9/w9.5.png" }
];

// Props kısmına onNavigate eklendi
export default function WorksGallery({ onNavigate }: { onNavigate?: () => void }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleProjectClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    
    // SADECE BU KISIM GÜNCELLENDİ:
    // Eğer dışarıdan bir onNavigate fonksiyonu gelmişse onu tetikle (tüm sayfayı yok eder)
    if (onNavigate) onNavigate(); 
    
    setIsNavigating(true); 

    setTimeout(() => {
      router.push(`/works/${id}`);
    }, 1200);
  };

  return (
    <motion.section 
      id="works" 
      initial={{ opacity: 0, y: 30 }}
      animate={isNavigating 
        ? { opacity: 0, y: -20, filter: "blur(10px)" } 
        : { opacity: 1, y: 0, filter: "blur(0px)" }    
      }
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full py-20 px-4 md:px-6"
    >
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tighter"
            style={{ fontFamily: "'Fira Code', monospace", color: "#0082c8" }}>
          WORKS
        </h2>

        <FocusCards 
          cards={galleryData} 
          onCardClick={handleProjectClick} 
        />
        
      </div>
    </motion.section>
  );
}