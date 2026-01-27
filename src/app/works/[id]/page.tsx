'use client';

import { useState, useLayoutEffect, useMemo } from 'react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

// --- TÜM PROJE VERİLERİ (SENİN VERİLERİN - EKSİKSİZ) ---
const allProjectsData: Record<string, { 
    title: string | React.ReactNode; 
    description: string; 
    about: string; 
    aboutSecondColumn?: string; 
    details: { label: string; value: string }[]; 
    images: { src: string; alt: string }[];
    extraImages?: { 
        src: string; 
        colSpan?: number; 
        caption?: string; 
    }[]
}> = {
    // --- PROJE 1 ---
    "1": {
        title: <>Ahama Living, Göcek Hotel <br /> Structure & Production Design</>,
        description: "2023-2025",
        about: "Ahama Living transformed from a raw concept in 2023 to a fully operational boutique hotel by 2025. My role was to manage this entire design-to-construction journey, bridging the gap between architectural vision and physical reality. The goal was to deliver eight custom cabana villas that didn't just look good on paper but were structurally sound and ready for guests.",
        aboutSecondColumn: "The structural system stands out as a key achievement in parametric engineering. We developed the forms using Grasshopper and fabricated them with CNC-milled timber. Because we conducted rigorous static tests in advance, we achieved incredible efficiency: the entire framework was produced overnight and assembled on-site with absolute precision.",
        details: [
            { label: "Year", value: "2023 -2025" },
            { label: "Location", value: "Istanbul, Mugla" },
            { label: "Client", value: "Odas Enerji" },
            { label: "Role", value: "Product Designer & Project Manager" }
        ],
        images: [
            { src: '/works/works1.png', alt: 'Main 1' },
            { src: '/works/works1.5.png', alt: 'Detail 1-1' },
            { src: '/works/works1.2.png', alt: 'Detail 1-2' },
            { src: '/works/works1.4.png', alt: 'Detail 1-3' },
            { src: '/works/works1.6.png', alt: 'Detail 1-4' },
            { src: '/works/works1.3.png', alt: 'Detail 1-5' },
            { src: '/works/works1.1.png', alt: 'Detail 1-6' },
        ],
        extraImages: [
            { 
                src: '/works/works1.1.png', 
                colSpan: 2, 
                caption: "Detailed view of the main structural elements during the installation phase."
            },
            { 
                src: '/works/works1.2.png', 
                colSpan: 1, 
                caption: "Material selection closeup."
            },
            { 
                src: '/works/works1.3.png', 
                colSpan: 1, 
                caption: "Joint details and finishing touches."
            },
            { 
                src: '/works/works1.4.png', 
                colSpan: 2, 
                caption: "Final construction view from the seaside facade."
            }
        ]
    },
    // --- PROJE 2 ---
    "2": {
        title: <>Istanbul Bosphorus Mansion Private Deck  <br /> Rehabilitation</>,
        description: "2023",
        about: "Located on the waterfront of the Istanbul Bosphorus, this project focused on rehabilitating an existing pier rather than tearing it down. The objective was clear: retain the pier’s historic presence while ensuring it could withstand harsh marine conditions for years to come.",
        aboutSecondColumn: "Instead of full reconstruction, I implemented a structural strengthening strategy. This approach preserved the original character of the deck while upgrading its safety and durability against the sea.",
        details: [
            { label: "Year", value: "2023" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Private Owner" },
            { label: "Role", value: "Production Designer" }
        ],
        images: [
            { src: '/works/w2/w2.JPG', alt: 'Main 2' },
            { src: '/works/w2/w2.1.png', alt: 'Detail 2-1' },
            { src: '/works/w2/w2.2.jpg', alt: 'Detail 2-2' },
            { src: '/works/w2/w2.3.png', alt: 'Detail 2-3' },
            { src: '/works/w2/w2.4.jpg', alt: 'Detail 2-4' },
            { src: '/works/w2/w2.5.png', alt: 'Detail 2-5' },
            { src: '/works/w2/w2.6.png', alt: 'Detail 2-6' },
        ],
        extraImages: [
            { 
                src: '/works/w2/w2.1.png', 
                colSpan: 2, 
                caption: "To ensure long-term stability under tidal movement and saltwater exposure, the rehabilitation required a precise, material-focused execution:" 
            },
            { 
                src: '/works/w2/w2.2.jpg', 
                colSpan: 1, 
                caption: "Malzeme detaylarını gösteren yakın çekim."
            },
            { 
                src: '/works/w2/w2.3.png', 
                colSpan: 1, 
                caption: "Concrete & Foundations: We inspected the underwater foundations and repaired areas damaged by saltwater erosion to restore solid footing."
            },
            { 
                src: '/works/w2/w2.4.jpg', 
                colSpan: 2, 
                caption: "Projenin gece görünümü."
            }
        ]
    },
    // --- PROJE 3 ---
    "3": {
        title: <>Söğüt – History and Nature Encounter  <br /> Architectural Competition Awarded Purchase Prize</>,
        description: "2023",
        about: "This proposal was awarded a Purchase Prize for reimagining the entrance to Söğüt. The objective was to create a landmark that serves as a bridge between the town's deep historical roots and its natural landscape. We aimed to transform a simple transit point into a meaningful encounter for both locals and visitors.",
        aboutSecondColumn: "The design prioritizes context-sensitive architecture. We sought a delicate balance: respecting traditional cultural heritage while introducing contemporary design solutions. The focus was on creating a space that feels native to the location yet modern in its execution, ensuring the concept remained grounded in reality and technical feasibility.",
        details: [
            { label: "Year", value: "2022" },
            { label: "Location", value: "Söğüt, Bilecik" },
            { label: "Client", value: "TMMOB" },
            { label: "Status", value: "Production Designer" }
        ],
        images: [
            { src: '/works/w3/w3.jpg', alt: 'Main 3' },
            { src: '/works/w3/w3.1.jpg', alt: 'Detail 3-1' },
            { src: '/works/w3/w3.2.png', alt: 'Detail 3-2' },
            { src: '/works/w3/w3.3.jpg', alt: 'Detail 3-3' },
            { src: '/works/w3/w3.4.jpg', alt: 'Detail 3-4' },
            { src: '/works/w3/w3.5.jpeg', alt: 'Detail 3-5' },
            { src: '/works/w3/w3.6.jpeg', alt: 'Detail 3-6' },
        ],
        extraImages: [
            { 
                src: '/works/w3/w3.1.jpg', 
                colSpan: 2, 
                caption: ""
            },
            { 
                src: '/works/w3/w3.2.png', 
                colSpan: 1, 
                caption: "Material selection closeup."
            },
            { 
                src: '/works/w3/w3.3.jpg', 
                colSpan: 1, 
                caption: "Joint details and finishing touches."
            },
            { 
                src: '/works/w3/w3.4.jpg', 
                colSpan: 2, 
                caption: ""
            }
        ]
    },
    // --- PROJE 4 ---
    "4": {
        title: <>Concrete Elements - Custom Basins<br /> Design, Production & Installation</>,
        description: "2022-2025",
        about: "This ongoing series focuses on the design and manufacturing of custom cement-mix basins. Since 2022, I have delivered these bespoke concrete elements for a diverse range of spaces, including boutique hotels, private residences, ateliers, and retail stores.",
        aboutSecondColumn: "My role covers the complete product lifecycle. I don't just design the form; I manage the production planning, casting, and on-site installation to ensure the final product performs as well as it looks.",
        details: [
            { label: "Year", value: "2022-2025" },
            { label: "Location", value: "Around Turkey" },
            { label: "Client", value: "Hotels, Cafes, Restaurants" }, 
            { label: "Material", value: "Product Designer" }
        ],
        images: [
            { src: '/works/proje4-ana.jpg', alt: 'Main 4' },
            { src: '/works/proje4-detay1.jpg', alt: 'Detail 4-1' },
            { src: '/works/proje4-detay2.jpg', alt: 'Detail 4-2' },
            { src: '/works/proje4-detay3.jpg', alt: 'Detail 4-3' },
            { src: '/works/proje4-detay4.jpg', alt: 'Detail 4-4' },
            { src: '/works/proje4-detay5.jpg', alt: 'Detail 4-5' },
            { src: '/works/proje4-detay6.jpg', alt: 'Detail 4-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje4-process1.jpg', 
                colSpan: 2, 
                caption: "Kalıp hazırlık süreci ve döküm aşaması."
            },
            { 
                src: '/works/proje4-doku.jpg', 
                colSpan: 1, 
                caption: "Yüzey dokusunu gösteren yakın plan çekim."
            },
            { 
                src: '/works/proje4-bitmis.jpg', 
                colSpan: 1, 
                caption: "Kürlenme sonrası son ürün."
            },
            { 
                src: '/works/proje4-sergi.jpg', 
                colSpan: 2, 
                caption: "Ürünlerin bir arada sergilenmesi."
            }
        ]
    },
    // --- PROJE 5 ---
    "5": {
        title: <>Wall Sconce - Various Materials<br /> Design, Production & Installation</>,
        description: "2022-2025",
        about: "Eclipse is a quarter-sphere wall sconce developed for both individual projects and mass installation in hospitality spaces. While the project started as an architectural concept, my role was to translate that form into a manufacturable product.",
        aboutSecondColumn: "Ahşap katmanların CNC teknolojisi ile işlenmesi ve elle montajı, geleneksel zanaat ile dijital tasarımı birleştiriyor. (Örnek: Strüktürel bütünlük için kilit detayları özel olarak geliştirildi...)",
        details: [
            { label: "Year", value: "2022-2025" },
            { label: "Location", value: "Around Turkey" },
            { label: "Client", value: "Hotels, Cafes, Customs" }, 
            { label: "Material", value: "Product Designer" }
        ],
        images: [
            { src: '/works/w5/w5.png', alt: 'Main 5' },
            { src: '/works/w5/w5.5.png', alt: 'Detail 5-1' },
            { src: '/works/w5/w5.2.png', alt: 'Detail 5-2' },
            { src: '/works/w5/w5.4.png', alt: 'Detail 5-3' },
            { src: '/works/w5/w5.3.png', alt: 'Detail 5-4' },
            { src: '/works/w5/w5.1.png', alt: 'Detail 5-5' },
            { src: '/works/w5/w5.6.png', alt: 'Detail 5-6' },
        ],
        extraImages: [
            { 
                src: '/works/w5/w5.1.png', 
                colSpan: 2, 
                caption: "CNC kesim sonrası parçaların birleştirilme süreci."
            },
            { 
                src: '/works/w5/w5.2.png', 
                colSpan: 1, 
                caption: "Katmanların oluşturduğu dokusal detay."
            },
            { 
                src: '/works/w5/w5.3.png', 
                colSpan: 1, 
                caption: "Teknik çizim ve montaj şeması."
            },
            { 
                src: '/works/w5/w5.3.png', 
                colSpan: 1, 
                caption: "Teknik çizim ve montaj şeması."
            },
            { 
                src: '/works/w5/w5.4.png', 
                colSpan: 2, 
                caption: "Ürünün mekandaki duruşu."
            }
        ]
    },
    // --- PROJE 6 ---
    "6": {
        title: <>Cement Mixed Planters - Various Sizes<br /> Design, Production & Installation</>,
        description: "2022-2025",
        about: "Since 2022, this collection has evolved as a continuous experiment in fabrication. For me, creating a planter isn't just about pouring concrete into a mold; it’s about refining the production logic. I treat every piece as a chance to push the limits of custom manufacturing, moving from simple casts to complex, structural forms that challenge the material.",
        aboutSecondColumn: "My approach balances the raw character of cement mixes and terrazzo composites with the practical needs of the space. Whether designing for a heavy-duty hotel lobby or a refined retail interior, I engineer the material composition to ensure the final product is visually striking yet structurally durable enough for real-world use.",
        details: [
            { label: "Year", value: "2022-2025" },
            { label: "Location", value: "Around Turkey" },
            { label: "Client", value: "Hotels, Cafes, Customs" }, 
            { label: "Material", value: "Product Designer" }
        ],
        images: [
            { src: '/works/w6/w6.png', alt: 'Main 6' },
            { src: '/works/w6/w6.1.png', alt: 'Detail 6-1' },
            { src: '/works/w6/w6.2.png', alt: 'Detail 6-2' },
            { src: '/works/w6/w6.3.png', alt: 'Detail 6-3' },
            { src: '/works/w6/w6.4.png', alt: 'Detail 6-4' },
            { src: '/works/w6/w6.5.png', alt: 'Detail 6-5' },
            { src: '/works/w6/w6.6.png', alt: 'Detail 6-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje6-render.jpg', 
                colSpan: 2, 
                caption: "Koleksiyonun ana parçası."
            },
            { 
                src: '/works/proje6-detay.jpg', 
                colSpan: 1, 
                caption: "Bağlantı detayı ve malzeme geçişi."
            },
            { 
                src: '/works/proje6-sketches.jpg', 
                colSpan: 1, 
                caption: "İlk eskizler ve form arayışları."
            },
            { 
                src: '/works/proje6-mood.jpg', 
                colSpan: 2, 
                caption: "Ürünün karanlık ortamdaki ışık etkisi."
            }
        ]
    },
    // --- PROJE 7 ---
    "7": {
        title: <>Transformation of Movement into Structure<br />Ceramic Tile Mixed Fluid Forms Installation</>,
        description: "2023-2024",
        about: "I led the full production process for this installation, collaborating directly with artist Aslı Özdoyuran. The project transformed archival swimming patterns into complex ''fluid forms'' within a gallery setting. My primary focus was to interpret these abstract digital concepts and establish a clear workflow that could translate the artist's vision into a tangible, physical reality.",
        aboutSecondColumn: "My role served as the bridge between the digital design and the workshop floor. I took the computational data and resolved the fabrication logic needed to actually build it. By overseeing the technical details, I ensured a flawless transition from screen to material, guaranteeing that the complex geometry was executed without compromising the artistic intent.",
        details: [
            { label: "Year", value: "2023-2024" },
            { label: "Location", value: "Istanbul- Izmir" },
            { label: "Client", value: "Aslı Özdoyuran" }, 
            { label: "Role", value: "Product Designer" }
        ],
        images: [
            { src: '/works/w7/w7.png', alt: 'Main 7' },
            { src: '/works/w7/w7.1.png', alt: 'Detail 7-1' },
            { src: '/works/w7/w7.2.png', alt: 'Detail 7-2' },
            { src: '/works/w7/w7.3.png', alt: 'Detail 7-3' },
            { src: '/works/w7/w7.5.1.jpg', alt: 'Detail 7-4' },
            { src: '/works/w7/w7.5.png', alt: 'Detail 7-5' },
            { src: '/works/w7/w7.6.jpeg', alt: 'Detail 7-6' },
        ],
        extraImages: [
            { 
                src: '/works/w7/w7.1.png', 
                colSpan: 2, 
                caption: "Sistemenin açık ofis kurgusundaki görünümü."
            },
            { 
                src: '/works/w7/w7.2.png', 
                colSpan: 1, 
                caption: "Bağlantı detayı ve kablo yönetimi."
            },
            { 
                src: '/works/w7/w7.3.png', 
                colSpan: 1, 
                caption: "Akustik panellerin doku detayı."
            },
            { 
                src: '/works/w7/w7.4.png', 
                colSpan: 2, 
                caption: "Farklı renk ve malzeme seçenekleri."
            }
        ]
    },
    // --- PROJE 8 ---
    "8": {
        title: <>Also Your Wound, Rosa – Installation,

 17th Istanbul Biennial<br />Cement Mixed Sculpture Installation</>,
        description: "Craft & Design | Production: 2022",
        about: "For the 17th Istanbul Biennial, I collaborated with artist Gordon Hall under the curation of Pelin Uran. My role was to lead the entire production design and fabrication for the exhibition at Kurtuluş Greek School.",
        aboutSecondColumn: "This was a massive operation. I managed a team of 10 people to produce 20 concrete sculptures, handling over three tons of material. It wasn't just about making art; it was about managing a heavy-duty production line.",
        details: [
            { label: "Year", value: "2022" },
            { label: "Location", value: "Istanbul" },
            { label: "Client", value: "Pelin Uran" }, 
            { label: "Material", value: "Product Designer" }
        ],
        images: [
            { src: '/works/w8/w8.1.png', alt: 'Main 8' },
            { src: '/works/w8/w8.png', alt: 'Detail 8-1' },
            { src: '/works/w8/w8.2.png', alt: 'Detail 8-2' },
            { src: '/works/w8/w8.3.png', alt: 'Detail 8-3' },
            { src: '/works/w8/w8.4.png', alt: 'Detail 8-4' },
            { src: '/works/w8/w8.5.png', alt: 'Detail 8-5' },
            { src: '/works/w8/w8.6.png', alt: 'Detail 8-6' },
        ],
        extraImages: [
            { 
                src: '/works/w8/w8.1.png', 
                colSpan: 2, 
                caption: "Koleksiyonun bir arada görünümü."
            },
            { 
                src: '/works/w8/w8.2.png', 
                colSpan: 1, 
                caption: "Sır dokusu ve yüzey detayı."
            },
            { 
                src: '/works/w8/w8.3.png', 
                colSpan: 1, 
                caption: "Tornada şekillendirme süreci."
            },
            { 
                src: '/works/w8/w8.4.png', 
                colSpan: 2, 
                caption: "Mekanda sergileme örneği."
            }
        ]
    },
    // --- PROJE 9 ---
    "9": {
        title: <>Carved Conversation<br />Custom Cement-Cast Wall Reliefs Installation</>,
        description: "2022-2023",
        about: "Collaborating with artist SaraNoa Mark during her Fulbright residency, I managed the translation of delicate hand-carved clay textures into large-scale cement wall panels. The process required precise mold-making to capture every detail, transferring the ephemeral nature of clay into permanent, engineered cement-based mixtures that could withstand the elements.",
        aboutSecondColumn: "The critical challenge was the installation within a centuries-old historic site. Dealing with heavy panels, I had to devise a mounting strategy that ensured absolute stability without drilling a single hole. I engineered a custom solution that respected strict preservation limits, ensuring the installation left no trace on the ancient stone.",
        details: [
            { label: "Year", value: "2022-2023" },
            { label: "Location", value: "Istanbul - Konya" },
            { label: "Client", value: "SaraNoa Mark" }, 
            { label: "Role", value: "Product Designer" }
        ],
        images: [
            { src: '/works/works9.2.jpg', alt: 'Main 9' },
            { src: '/works/works9.2.jpg', alt: 'Detail 9-1' },
            { src: '/works/works9.6.jpg', alt: 'Detail 9-2' },
            { src: '/works/works9.11.png', alt: 'Detail 9-3' },
            { src: '/works/works9.4.jpg', alt: 'Detail 9-4' },
            { src: '/works/works9.10.png', alt: 'Detail 9-5' },
            { src: '/works/works9.8.jpg', alt: 'Detail 9-6' },
        ],
        extraImages: [
            { 
                src: '/works/works9.4.jpg', 
                colSpan: 2, 
                caption: "Enstalasyonun gece görünümü ve ışık efektleri."
            },
            { 
                src: '/works/works9.4.jpg', 
                colSpan: 1, 
                caption: "Strüktür ve tekstil birleşim detayı."
            },
            { 
                src: '/works/works9.4.jpg', 
                colSpan: 1, 
                caption: "Atölye üretim aşaması."
            },
            { 
                src: '/works/works9.4.jpg', 
                colSpan: 2, 
                caption: "Ziyaretçilerin eserle etkileşimi."
            }
        ]
    }
    
};

export default function ProjectDetail() {
        const router = useRouter();
        const params = useParams();
        
        const projectData = useMemo(() => {
            const id = params?.id as string;
            return allProjectsData[id];
        }, [params?.id]);

        const [isDark, setIsDark] = useState(false);
        const [isExiting, setIsExiting] = useState(false);

    useLayoutEffect(() => {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

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

        return () => {
            lenis.destroy();
        };
    }, []);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsExiting(true);
        setTimeout(() => {
            router.push('/#works');
        }, 600);
    };

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

    if (!projectData) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"
                     style={{
                         backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
                         color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                     }}>
                    <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Fira Code', monospace" }}>
                        404 - Project Not Found
                    </h1>
                    <p className="opacity-60 mb-8" style={{ fontFamily: "'Antic', sans-serif" }}>
                        We couldn't find the project you are looking for.
                    </p>
                    <a 
                        href="/#works"
                        className="px-6 py-3 rounded-full bg-[#0082c8] text-white font-bold hover:opacity-90 transition-opacity"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                        BACK TO WORKS
                    </a>
                </div>
            );
        }
    return (
        <motion.main 
            initial={{ opacity: 0 }} 
            animate={{ opacity: (!isExiting) ? 1 : 0 }} 
            transition={{ duration: 1.0, ease: "easeInOut" }}
            
            className="min-h-screen w-full transition-colors duration-300 pb-20"
            style={{
                backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
                color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
            }}
        >
            <a 
                href="/#works" 
                onClick={handleBackClick}
                className="fixed top-8 left-8 z-50 flex items-center gap-2 transition-opacity text-[#0082c8] hover:opacity-80"
            >
                <ArrowLeft size={24} />
                {/* DÜZELTME: BACK TO WORKS yazısını Fira Code yaptık */}
                <span className="text-sm" style={{ fontFamily: "'Fira Code', monospace" }}>BACK TO WORKS</span>
            </a>

            <button
                type="button"
                onClick={toggleTheme}
                className="fixed top-8 right-8 z-50 w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
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

            {/* BAŞLIK */}
            <div className="relative flex h-[50vh] items-center justify-center">
                <div
                    aria-hidden="true"
                    className={cn(
                        'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                        'blur-[30px]',
                    )}
                    style={{
                        background: `radial-gradient(ellipse at center, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent 50%)`
                    }}
                />
                <div className="text-center z-10 px-4">
                    <h1 
                        className="text-4xl md:text-6xl font-bold mb-4 text-[#0082c8]" 
                        style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                        {projectData.title}
                    </h1>
                    <p 
                        className="text-lg md:text-xl opacity-60 mt-4 font-light" 
                        style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                        {projectData.description}
                    </p>
                </div>
            </div>

            {/* ZOOM PARALLAX */}
            <ZoomParallax images={projectData.images} />
            
            {/* --- İÇERİK ALANI --- */}
            <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">
                
                {/* 1. Proje Hakkında */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>
                        About the Project
                    </h3>

                    <div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 leading-relaxed text-lg opacity-80" 
                        style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                        <div>
                            <p>{projectData.about}</p>
                        </div>
                        <div>
                            {projectData.aboutSecondColumn && (
                                <p>{projectData.aboutSecondColumn}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Künye Bilgileri */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {projectData.details.map((detail, index) => (
                             <div key={index} className="space-y-2">
                                {/* DÜZELTME: Label (Başlık) kısmı da Fira Code yapıldı */}
                                <span className="block text-sm opacity-50 uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {detail.label}
                                </span>
                                <span className="block text-lg font-medium" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {detail.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. EKSTRA GÖRSEL GALERİ VE DETAYLAR */}
                {projectData.extraImages && projectData.extraImages.length > 0 && (
                    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16 mt-16">
                        <h3 className="text-2xl font-bold mb-12 text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>
                            Process & Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-16">
                            {projectData.extraImages.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={cn(
                                        "relative group",
                                        item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
                                    )}
                                >
                                    <div className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-4">
                                        <img 
                                            src={item.src} 
                                            alt={`Detail ${index}`}
                                            className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    
                                    {item.caption && (
                                        <p className="text-sm md:text-base opacity-70 leading-relaxed pl-1 border-l-2 border-[#0082c8]" 
                                           style={{ fontFamily: "'Antic', sans-serif" }}>
                                            {item.caption}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </motion.main>
    );
}