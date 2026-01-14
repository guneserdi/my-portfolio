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
    title: string; 
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
        title: "Structure & Production Design Ahama Living, Göcek Hotel",
        description: "Concept: 2023 | Construction: 2024 | Completion: 2025",
        about: "This boutique hotel project began in 2023 as a design concept, moved into production in 2024, and officially opened in 2025. As the architectural and design studio supporting the lead concept office, we worked under the guidance of Nilüfer Kozikoğlu to deliver a fully realized design-to-construction process.",
        aboutSecondColumn: "The structural system for eight cabana-type villas was developed through parametric design in Grasshopper and fabricated with CNC-milled timber components. All structural and static tests were conducted in advance, enabling the entire framework to be produced overnight and assembled on-site with exceptional efficiency.",
        details: [
            { label: "Year", value: "2023 | 2024 | 2025" },
            { label: "Location", value: "Mugla, TR" },
            { label: "Client", value: "Ahama Living" },
            { label: "Role", value: "Product Designer" }
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
        title: "Deck Rehabilitation",
        description: "Restoration: 2023 | Location: Bodrum",
        about: "Buraya projenin ana hikayesini, başlangıç sürecini ve tasarımın arkasındaki temel fikri yazacaksın. (Örnek: Bu proje, eskiyen bir sahil iskelesinin modern ihtiyaçlara göre yeniden kurgulanması sürecini ele alıyor...)",
        aboutSecondColumn: "Buraya projenin teknik detaylarını, malzeme seçimlerini veya uygulama sürecindeki zorlukları yazacaksın. (Örnek: Tik ağacı ve kompozit malzemelerin birleşimiyle, hem estetik hem de deniz suyuna dayanıklı bir yapı hedeflendi...)",
        details: [
            { label: "Year", value: "2023" },
            { label: "Location", value: "Bodrum, TR" },
            { label: "Client", value: "Private Client" },
            { label: "Role", value: "Design & Application" }
        ],
        images: [
            { src: '/works/proje2-ana.jpg', alt: 'Main 2' },
            { src: '/works/proje2-detay1.jpg', alt: 'Detail 2-1' },
            { src: '/works/proje2-detay2.jpg', alt: 'Detail 2-2' },
            { src: '/works/proje2-detay3.jpg', alt: 'Detail 2-3' },
            { src: '/works/proje2-detay4.jpg', alt: 'Detail 2-4' },
            { src: '/works/proje2-detay5.jpg', alt: 'Detail 2-5' },
            { src: '/works/proje2-detay6.jpg', alt: 'Detail 2-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje2-detay1.jpg', 
                colSpan: 2, 
                caption: "Geniş bir açıdan projenin bitmiş hali." 
            },
            { 
                src: '/works/proje2-detay2.jpg', 
                colSpan: 1, 
                caption: "Malzeme detaylarını gösteren yakın çekim."
            },
            { 
                src: '/works/proje2-detay3.jpg', 
                colSpan: 1, 
                caption: "İnşaat sürecinden bir kare."
            },
            { 
                src: '/works/proje2-detay4.jpg', 
                colSpan: 2, 
                caption: "Projenin gece görünümü."
            }
        ]
    },
    // --- PROJE 3 ---
    "3": {
        title: "Söğüt History",
        description: "Awarded Purchase Prize | Location: Bilecik",
        about: "Söğüt'ün tarihi dokusunu modern bir müzecilik anlayışıyla harmanlayan bu proje, ziyaretçilere kronolojik bir yolculuk sunmayı amaçlıyor. (Örnek: Yarışma projesi kapsamında, alanın tarihi katmanlarına saygı duyan bir sirkülasyon kurgusu önerildi...)",
        aboutSecondColumn: "Mevcut topoğrafyaya minimum müdahale ile yerleşen kütleler, doğal taş ve brüt beton kullanımıyla çevresiyle bütünleşiyor. (Örnek: Sergi alanlarında doğal ışık kontrolü için özel cephe panelleri tasarlandı...)",
        details: [
            { label: "Year", value: "2023" },
            { label: "Location", value: "Bilecik, TR" },
            { label: "Client", value: "Municipality" },
            { label: "Status", value: "Competition Entry" }
        ],
        images: [
            { src: '/works/works3.8.jpg', alt: 'Main 3' },
            { src: '/works/works3.1.png', alt: 'Detail 3-1' },
            { src: '/works/works3.4.png', alt: 'Detail 3-2' },
            { src: '/works/works3.2.png', alt: 'Detail 3-3' },
            { src: '/works/works3.3.png', alt: 'Detail 3-4' },
            { src: '/works/works3.7.png', alt: 'Detail 3-5' },
            { src: '/works/works3.6.png', alt: 'Detail 3-6' },
        ],
        extraImages: [
            { 
                src: '/works/works3.6.png', 
                colSpan: 2, 
                caption: "Detailed view of the main structural elements during the installation phase."
            },
            { 
                src: '/works/works3.7.png', 
                colSpan: 1, 
                caption: "Material selection closeup."
            },
            { 
                src: '/works/works3.2.png', 
                colSpan: 1, 
                caption: "Joint details and finishing touches."
            },
            { 
                src: '/works/works3.2.png', 
                colSpan: 2, 
                caption: "Final construction view from the seaside facade."
            }
        ]
    },
    // --- PROJE 4 ---
    "4": {
        title: "Concrete Elements",
        description: "Material Research | Production: 2023",
        about: "Betonun ham ve brüt estetiğini, endüstriyel tasarım objelerine taşıyan deneysel bir çalışma. (Örnek: Bu seride, geleneksel kalıp yöntemlerinin dışına çıkılarak esnek kalıplama teknikleri araştırıldı...)",
        aboutSecondColumn: "Her bir parça, malzemenin donma sürecindeki doğal hareketlerini yansıtacak şekilde üretildi. (Örnek: Agrega yoğunluğu ve su oranları değiştirilerek farklı yüzey dokuları elde edildi...)",
        details: [
            { label: "Year", value: "2023" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Self Initiated" }, 
            { label: "Material", value: "Reinforced Concrete" }
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
        title: "Parametric Seating",
        description: "Furniture Design | Production: 2023",
        about: "İnsan ergonomisi ve dijital üretim tekniklerinin kesişim noktasında duran parametrik bir oturma birimi tasarımı. (Örnek: Bu tasarım, Grasshopper kullanılarak oluşturulan algoritmik bir altyapıya dayanmaktadır...)",
        aboutSecondColumn: "Ahşap katmanların CNC teknolojisi ile işlenmesi ve elle montajı, geleneksel zanaat ile dijital tasarımı birleştiriyor. (Örnek: Strüktürel bütünlük için kilit detayları özel olarak geliştirildi...)",
        details: [
            { label: "Year", value: "2023" },
            { label: "Location", value: "Izmir, TR" },
            { label: "Client", value: "Private Commission" }, 
            { label: "Material", value: "Plywood / Birch" }
        ],
        images: [
            { src: '/works/works5.10.png', alt: 'Main 5' },
            { src: '/works/works5.9.png', alt: 'Detail 5-1' },
            { src: '/works/works5.6.png', alt: 'Detail 5-2' },
            { src: '/works/works5.4.png', alt: 'Detail 5-3' },
            { src: '/works/works5.9.jpg', alt: 'Detail 5-4' },
            { src: '/works/works5.5.png', alt: 'Detail 5-5' },
            { src: '/works/works5.png', alt: 'Detail 5-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje5-uretim.jpg', 
                colSpan: 2, 
                caption: "CNC kesim sonrası parçaların birleştirilme süreci."
            },
            { 
                src: '/works/proje5-detay.jpg', 
                colSpan: 1, 
                caption: "Katmanların oluşturduğu dokusal detay."
            },
            { 
                src: '/works/proje5-teknik.jpg', 
                colSpan: 1, 
                caption: "Teknik çizim ve montaj şeması."
            },
            { 
                src: '/works/proje5-son.jpg', 
                colSpan: 2, 
                caption: "Ürünün mekandaki duruşu."
            }
        ]
    },
    // --- PROJE 6 ---
    "6": {
        title: "Luminous Series",
        description: "Lighting Design | Collection: 2022",
        about: "Işığın mekanla kurduğu ilişkiyi yeniden tanımlayan, minimal formlara sahip bir aydınlatma koleksiyonu. (Örnek: Bu seri, doğrudan aydınlatma yerine yansıyan ışığın oluşturduğu atmosferi merkeze alıyor...)",
        aboutSecondColumn: "Pirinç ve el üfleme camın birlikteliği, endüstriyel üretim teknikleriyle zanaatı bir araya getiriyor. (Örnek: Metal aksamlar CNC tornada işlenirken, cam parçalar geleneksel yöntemlerle şekillendirildi...)",
        details: [
            { label: "Year", value: "2022" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Brand Collaboration" }, 
            { label: "Material", value: "Brass & Glass" }
        ],
        images: [
            { src: '/works/proje6-ana.jpg', alt: 'Main 6' },
            { src: '/works/proje6-detay1.jpg', alt: 'Detail 6-1' },
            { src: '/works/proje6-detay2.jpg', alt: 'Detail 6-2' },
            { src: '/works/proje6-detay3.jpg', alt: 'Detail 6-3' },
            { src: '/works/proje6-detay4.jpg', alt: 'Detail 6-4' },
            { src: '/works/proje6-detay5.jpg', alt: 'Detail 6-5' },
            { src: '/works/proje6-detay6.jpg', alt: 'Detail 6-6' },
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
        title: "Modular Workstation",
        description: "Office System | Design: 2022",
        about: "Değişen ofis dinamiklerine ve hibrit çalışma modellerine uyum sağlayan, esnek bir çalışma istasyonu sistemi. (Örnek: Modüler yapısı sayesinde tekli kullanımdan çoklu çalışma gruplarına kadar ölçeklenebilir bir çözüm sunuyor...)",
        aboutSecondColumn: "Alüminyum ekstrüzyon profiller ve geri dönüştürülmüş PET paneller kullanılarak, hem hafif hem de akustik konfor sağlayan bir yapı kurgulandı. (Örnek: Bağlantı detayları, alet gerektirmeyen hızlı montaja olanak tanıyor...)",
        details: [
            { label: "Year", value: "2022" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Furniture Brand" }, 
            { label: "Role", value: "Industrial Design" }
        ],
        images: [
            { src: '/works/works7.png', alt: 'Main 7' },
            { src: '/works/works7.1.png', alt: 'Detail 7-1' },
            { src: '/works/works7.2.png', alt: 'Detail 7-2' },
            { src: '/works/works7.3.png', alt: 'Detail 7-3' },
            { src: '/works/works7.4.png', alt: 'Detail 7-4' },
            { src: '/works/works7.5.png', alt: 'Detail 7-5' },
            { src: '/works/works7.6.png', alt: 'Detail 7-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje7-render.jpg', 
                colSpan: 2, 
                caption: "Sistemenin açık ofis kurgusundaki görünümü."
            },
            { 
                src: '/works/proje7-detay.jpg', 
                colSpan: 1, 
                caption: "Bağlantı detayı ve kablo yönetimi."
            },
            { 
                src: '/works/proje7-akustik.jpg', 
                colSpan: 1, 
                caption: "Akustik panellerin doku detayı."
            },
            { 
                src: '/works/proje7-varyasyon.jpg', 
                colSpan: 2, 
                caption: "Farklı renk ve malzeme seçenekleri."
            }
        ]
    },
    // --- PROJE 8 ---
    "8": {
        title: "Ceramic Collection",
        description: "Craft & Design | Production: 2022",
        about: "Geleneksel seramik üretim tekniklerinin modern form arayışlarıyla yeniden yorumlandığı bir vazo ve obje koleksiyonu. (Örnek: Doğal formlardan ilham alan bu seri, çamurun plastikliğini vurgulayan organik hatlara sahiptir...)",
        aboutSecondColumn: "Sırlama aşamasında yapılan deneysel uygulamalar, her bir parçanın benzersiz bir dokuya ve renk geçişine sahip olmasını sağladı. (Örnek: Yüksek dereceli fırınlama teknikleriyle malzemenin dayanıklılığı artırıldı...)",
        details: [
            { label: "Year", value: "2022" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Private Collection" }, 
            { label: "Material", value: "Stoneware Clay" }
        ],
        images: [
            { src: '/works/works8.png', alt: 'Main 8' },
            { src: '/works/works8.1.png', alt: 'Detail 8-1' },
            { src: '/works/works8.6.png', alt: 'Detail 8-2' },
            { src: '/works/works8.4.png', alt: 'Detail 8-3' },
            { src: '/works/works8.5.png', alt: 'Detail 8-4' },
            { src: '/works/works8.3.png', alt: 'Detail 8-5' },
            { src: '/works/works8.7.png', alt: 'Detail 8-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje8-group.jpg', 
                colSpan: 2, 
                caption: "Koleksiyonun bir arada görünümü."
            },
            { 
                src: '/works/proje8-doku.jpg', 
                colSpan: 1, 
                caption: "Sır dokusu ve yüzey detayı."
            },
            { 
                src: '/works/proje8-process.jpg', 
                colSpan: 1, 
                caption: "Tornada şekillendirme süreci."
            },
            { 
                src: '/works/proje8-display.jpg', 
                colSpan: 2, 
                caption: "Mekanda sergileme örneği."
            }
        ]
    },
    // --- PROJE 9 ---
    "9": {
        title: "Urban Installation",
        description: "Public Art | Installation: 2021",
        about: "Kent meydanında geçici bir süre için kurgulanan, sosyal etkileşimi artırmayı hedefleyen interaktif bir enstalasyon. (Örnek: Ziyaretçilerin hareketlerine duyarlı sensörler aracılığıyla değişen ışık ve ses oyunları...)",
        aboutSecondColumn: "Hafif çelik strüktür üzerine gerilen yarı saydam tekstil yüzeyler, gündüz gölge oyunları yaratırken gece dijital bir tuvale dönüşüyor. (Örnek: Modüler yapısı sayesinde kurulum ve söküm işlemleri hızlıca tamamlandı...)",
        details: [
            { label: "Year", value: "2021" },
            { label: "Location", value: "Istanbul, TR" },
            { label: "Client", value: "Art Foundation" }, 
            { label: "Role", value: "Concept & Production" }
        ],
        images: [
            { src: '/works/works9.2.jpg', alt: 'Main 9' },
            { src: '/works/works9..jpg', alt: 'Detail 9-1' },
            { src: '/works/works9.6.jpg', alt: 'Detail 9-2' },
            { src: '/works/works9.11.png', alt: 'Detail 9-3' },
            { src: '/works/works9.4.jpg', alt: 'Detail 9-4' },
            { src: '/works/works9.10.png', alt: 'Detail 9-5' },
            { src: '/works/works9.8.jpg', alt: 'Detail 9-6' },
        ],
        extraImages: [
            { 
                src: '/works/proje9-gece.jpg', 
                colSpan: 2, 
                caption: "Enstalasyonun gece görünümü ve ışık efektleri."
            },
            { 
                src: '/works/proje9-detay.jpg', 
                colSpan: 1, 
                caption: "Strüktür ve tekstil birleşim detayı."
            },
            { 
                src: '/works/proje9-process.jpg', 
                colSpan: 1, 
                caption: "Atölye üretim aşaması."
            },
            { 
                src: '/works/proje9-interaction.jpg', 
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