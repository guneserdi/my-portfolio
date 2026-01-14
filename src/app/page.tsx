import PortfolioHero from "@/components/ui/portfolio-hero";
import WorksGallery from "@/components/ui/works-gallery";
import { ScrollingSkills } from "@/components/ui/scrolling-skills";
import AboutMe from "@/components/ui/about-me";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* 1. GİRİŞ (HERO) ALANI */}
      <div className="w-full">
        <PortfolioHero />
      </div>

      {/* 2. KAYAN YAZILAR (MARQUEE) */}
      {/* Hero ile Works arasına yerleştirdik */}
      <ScrollingSkills />

      {/* 3. PROJELER (WORKS) GALERİSİ */}
      <WorksGallery />
      
      {/* 4. ABOUT ME (YENİ) */}
      <AboutMe />

     
    </main>
  );
}