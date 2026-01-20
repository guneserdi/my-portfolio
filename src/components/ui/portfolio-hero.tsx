"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Lenis from '@studio-freight/lenis';
import { motion } from "framer-motion";

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
    } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    } as any);

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- TEK MERKEZLİ KAYDIRMA MOTORU ---
    // Works, About, Manifesto fark etmez, hepsi aynı sürede (1.5sn) kayacak.
    if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        
        // 500ms bekle (Sayfa ve resimler yüklensin)
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, { 
                  offset: 0,
                  immediate: false, 
                  // STANDART SÜRE: 1.5 Saniye
                  // Works, About, Manifesto hepsi bu hıza uyacak.
                  duration: 1.5, 
                  easing: (t: number) => 1 - Math.pow(1 - t, 4)
                });
            }
        }, 500); 
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sectionsToObserve = ["home", "works", "about"];
    sectionsToObserve.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault(); 
    setIsMenuOpen(false); 

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: "HOME", href: "#", id: "home" },
    { label: "WORKS", href: "#works", id: "works" },
    { label: "ABOUT ME", href: "#about", id: "about" }, 
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}       
      transition={{ duration: 0.8, ease: "easeInOut" }}
      
      className="min-h-screen text-foreground transition-colors overflow-hidden"
      style={{
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 text-[#0082c8]">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 hover:opacity-80"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            <div
              ref={menuRef}
              className={`absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100] 
                transition-all duration-300 ease-in-out origin-top-left
                ${isMenuOpen 
                  ? "opacity-100 translate-y-0 scale-100 visible" 
                  : "opacity-0 -translate-y-4 scale-95 invisible pointer-events-none"}
              `}
              style={{
                backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
              }}
            >
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: isActive ? "#0082c8" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)"),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#0082c8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isActive ? "#0082c8" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: "#0082c8",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      <main id="home" className="relative min-h-screen flex flex-col">
  {/* LOGO VE FOTOĞRAF GRUBU */}
  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
    {/* Mandalina/Logo İkonu */}
    <img 
      src="/meldalogo.png" 
      alt="Logo" 
      className="h-10 w-auto object-contain" 
    />
    
    {/* Logonun Hemen Altındaki Profil Fotoğrafı */}
    <div 
  onClick={(e) => handleScrollTo(e, "#about")} 
  className="w-[45px] h-[77px] sm:w-[63px] sm:h-[106px] md:w-[77px] md:h-[130px] lg:w-[90px] lg:h-[152px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer border-4 border-transparent hover:border-[#0082c8]"
>
  <img
    src="/meldaprofil.jpg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>
  </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center select-none">
            <div>
              <BlurText
                text="AYSE"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#0082c8", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="MELDA"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#0082c8", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="GUZEL"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#0082c8", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            
          </div>
        </div>

        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Industrial Product Designer."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => handleScrollTo(e, "#manifesto")}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 animate-bounce cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-[#0082c8] hover:opacity-80 transition-colors duration-300" />
        </button>
      </main>

      <section 
        id="manifesto" 
        className="relative w-full py-32 px-6 flex flex-col items-center justify-center text-center z-20"
      >
        <div className="max-w-3xl space-y-8">
          <h2 
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Fira Code', monospace", color: "#0082c8" }}
          >
            Manifesto
          </h2>
          
          <p 
            className="text-lg md:text-2xl leading-relaxed opacity-80 font-light"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            I design and build for the real world.
Industrial Design taught me the distinct character of materials; from the weight of concrete to the logic of composites. But I don’t just look at aesthetics; I focus on how things work and how they are actually made.
Since 2020, I’ve managed projects ranging from architectural interiors to mass-produced industrial products. My process connects design strategy directly with technical execution. To me, a concept is only strong if it is buildable.
That’s why I balance visual simplicity with engineering constraints. I don’t just draw concepts; I drive the manufacturing process to deliver finished, functional products.
          </p>
        </div>
      </section>
      
    </motion.div>
  );
}