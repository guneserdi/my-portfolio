"use client";

import TextMarquee from "@/components/ui/text-marquee";

export function ScrollingSkills() {
  return (
    <section className="w-full py-24 overflow-hidden flex flex-col gap-6">
      
      {/* 1. SATIR: SOLA AKAR (Negatif Velocity) */}
      <TextMarquee 
        baseVelocity={-0.3} 
        className="text-[#0082c8]" 
        scrollDependent={true} // Scroll yapınca hızlansın
      >
    • Rhino • Grasshopper  • Fusion 360 • AutoCAD • Photoshop • Illustrator • InDesign
      </TextMarquee>

      {/* 2. SATIR: SAĞA AKAR (Pozitif Velocity) */}
      <TextMarquee 
        baseVelocity={0.3} 
        className="text-neutral-500 dark:text-neutral-400" // Ortadaki satır farklı renk olsun (Gri/Beyaz)
        scrollDependent={true}
      >
    • Prototyping & Production Management • Material Selection & Mechanical Analysis • Project Coordination
      </TextMarquee>

      {/* 3. SATIR: SOLA AKAR (Negatif Velocity) */}
      <TextMarquee 
        baseVelocity={-0.3} 
        className="text-[#0082c8]" 
        scrollDependent={true}
      >
    • Product & Interior Design • Functional • Ergonomic & Aesthetic Solutions • Concept Development
      </TextMarquee>
      
    </section>
  );
}