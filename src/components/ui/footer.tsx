"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowUp, FaInstagram, FaLinkedin, FaBehance, FaEnvelope, FaHome, FaBriefcase, FaUser } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    // Eğer zaten Ana Sayfadaysak: Yumuşak Kaydır
    if (pathname === '/') {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } 
    // Eğer Başka Sayfadaysak (Proje Detay vb.): Direkt Git
    else {
      // Back to Works butonu gibi sade ve hızlı yönlendirme
      const targetUrl = targetId === 'home' ? '/' : `/#${targetId}`;
      router.push(targetUrl);
    }
  };

  const currentYear = new Date().getFullYear();
  const iconSize = 18; 

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* ÜST KISIM */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Logo */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>
              AYSE MELDA GUZEL
            </h3>
            <p className="opacity-60 max-w-sm text-sm md:text-base leading-relaxed" style={{ fontFamily: "'Antic', sans-serif" }}>
              Industrial Product Designer. <br />
              Besiktas/ISTANBUL <br />
              34349
            </p>
          </div>

          {/* MENU */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold opacity-40 uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>
              MENU
            </h4>
            <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: "'Antic', sans-serif" }}>
              <li>
                <a href="/#home" onClick={(e) => handleNavigation(e, 'home')} className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group cursor-pointer">
                  <FaHome size={iconSize} />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/#works" onClick={(e) => handleNavigation(e, 'works')} className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group cursor-pointer">
                  <FaBriefcase size={iconSize} />
                  <span>Works</span>
                </a>
              </li>
              <li>
                <a href="/#about" onClick={(e) => handleNavigation(e, 'about')} className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group cursor-pointer">
                  <FaUser size={iconSize} />
                  <span>About Me</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold opacity-40 uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>
              SOCIAL
            </h4>
            <div className="flex flex-col space-y-3 text-sm md:text-base" style={{ fontFamily: "'Antic', sans-serif" }}>
              <a href="https://www.instagram.com/aysemeldaguzel/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group">
                <FaInstagram size={iconSize} /> <span>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/ay%C5%9Fe-melda-g%C3%BCzel/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group">
                <FaLinkedin size={iconSize} /> <span>LinkedIn</span>
              </a>
              <a href="https://www.behance.net/aysemeldaguzel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group">
                <FaBehance size={iconSize} /> <span>Behance</span>
              </a>
              <a href="mailto:aysemeldaguzel@gmail.com" className="flex items-center gap-3 hover:text-[#0082c8] transition-colors group">
                <FaEnvelope size={iconSize} /> <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>

        {/* ALT KISIM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-200 dark:border-neutral-800 gap-4">
          <p className="text-xs font-bold text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>
            © {currentYear} All Rights Reserved.
          </p>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-xs font-bold hover:text-[#0082c8] transition-colors group uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
            Back to Top
            <FaArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}