'use client';

import { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    }[];
    extraImagesAfterText?: string; 
    extraImagesTwo?: {
        src: string;
        caption?: string;
    }[];
    extraImagesTwoAfterText?: string;
}> = {
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
            { src: '/works/w1/w1.jpg', alt: 'Main 1' },
            { src: '/works/w1/w1.1.jpg', alt: 'Detail 1-1' },
            { src: '/works/w1/w1.2.jpg', alt: 'Detail 1-2' },
            { src: '/works/w1/w1.3.png', alt: 'Detail 1-3' },
            { src: '/works/w1/w1.6.jpg', alt: 'Detail 1-4' },
            { src: '/works/w1/w1.20.jpg', alt: 'Detail 1-5' },
            { src: '/works/w1/w1.4.jpg', alt: 'Detail 1-6' },
        ],
        extraImages: [
            { src: '/works/w1/w1.20.jpg', },
            { src: '/works/w1/w1.1.jpg', },
            { src: '/works/w1/w1.jpg', },
            { src: '/works/w1/w1.1.1.jpg', },
            { src: '/works/w1/w1.24.jpg', },
            { src: '/works/w1/w1.2.jpg', },
            { src: '/works/w1/w1.24.jpg', },
            { src: '/works/w1/w1.6.jpg', },
            { src: '/works/w1/w1.23.jpg', },
            { src: '/works/w1/w1.25.jpg', },
            { src: '/works/w1/w1.26.jpg', },
            { src: '/works/w1/w1.22.jpg', }
            
        ],
        extraImagesAfterText: "Beyond the structure, I led both the site coordination and the detailed design work. Working directly with craftsmen, I directed the fabrication of custom architectural and interior elements to ensure the concept met reality.",
        extraImagesTwo: [
            { src: '/works/w1/w1.21.jpg', },
            { src: '/works/w1/w1.10.png', },
            { src: '/works/w1/w1.11.png', },
            { src: '/works/w1/w1.12.png', },
            { src: '/works/w1/w1.13.png', },
            { src: '/works/w1/w1.14.png', },
            { src: '/works/w1/w1.15.png', },
            { src: '/works/w1/w1.16.png', },
            { src: '/works/w1/w1.17.png', },
            { src: '/works/w1/w1.18.png', },
            { src: '/works/w1/w1.19.png', }
        ],
        extraImagesTwoAfterText: `Key productions included:
- Brass Details: Custom-engineered door handles, sliding door systems, pivot mirrors, and decorative features like rain chains and sculpted finials.
- Stonework: Travertine sinks with support systems and carved mirror frames. We used Grasshopper to generate a parametric “kaşıklama” pattern, merging digital precision with traditional stone.
- Lighting & Furniture: I managed the prototyping of custom wall appliqués within the team and coordinated the furniture production workshops.

The project relied on blending local materials; wood, stone, brass, and concrete, with digital tools. This approach reduced waste, accelerated the workflow, and delivered a high level of craftsmanship.`
        
    },
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
            { src: '/works/w2/w2.JPG', },
            { src: '/works/w2/w2.1.png', },
            { src: '/works/w2/w2.2.jpg', },
            { src: '/works/w2/w2.3.png', },
            { src: '/works/w2/w2.4.jpg', },
            { src: '/works/w2/w2.5.png', },
            { src: '/works/w2/w2.6.png', }
        ],
        extraImagesAfterText: `To ensure long-term stability under tidal movement and saltwater exposure, the rehabilitation required a precise, material-focused execution:
- Concrete & Foundations: We inspected the underwater foundations and repaired areas damaged by saltwater erosion to restore solid footing.
- Timber Treatment: Existing timber piles and decking were treated with marine-grade impregnation. I opted for selective replacement, changing only the parts where structural integrity was compromised, rather than wasting material.
- Steel & Stabilization: All steel connections were renewed with corrosion-resistant fasteners. We also introduced additional bracing to stabilize the entire structure against the constant motion of the Bosphorus.`,
        
    },
    "3": {
        title: <>Söğüt – History and Nature Encounter <br /> Architectural Competition Awarded Purchase Prize</>,
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
           { src: '/works/w3/w3.jpg', },
           { src: '/works/w3/w3.1.jpg', },
           { src: '/works/w3/w3.2.png', },
           { src: '/works/w3/w3.3.jpg', },
           { src: '/works/w3/w3.4.jpg', },
           { src: '/works/w3/w3.5.jpeg', },
           { src: '/works/w3/w3.6.jpeg', }

        ],
        extraImagesAfterText: `While the project was conceptual, my role was to ground it in reality. I focused on the technical feasibility of the design through rigorous material research and prototyping.
- Feasibility Testing: I tested key design elements at scale to ensure they could actually be built without losing the aesthetic intent.
- Integration: I worked to integrate these physical requirements into the architectural concept. This process ensured that the proposal wasn't just visually striking, but functionally sound and ready for potential construction.
For further details on the competition entry and visuals, you can visit : Arkitera Purchase Prize Project`,
       
    },
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
            { src: '/works/w4/w4.png', alt: 'Main 4' },
            { src: '/works/w4/w4.1.png', alt: 'Detail 4-1' },
            { src: '/works/w4/w4.2.png', alt: 'Detail 4-2' },
            { src: '/works/w4/w4.5.png', alt: 'Detail 4-3' },
            { src: '/works/w4/w4.4.png', alt: 'Detail 4-4' },
            { src: '/works/w4/w4.3.png', alt: 'Detail 4-5' },
            { src: '/works/w4/w4.6.png', alt: 'Detail 4-6' },
        ],
        extraImages: [
            { src: '/works/w4/w4.png', },
            { src: '/works/w4/w4.1.png', },
            { src: '/works/w4/w4.2.png', },
            { src: '/works/w4/w4.3.png', },
            { src: '/works/w4/w4.4.png', },
            { src: '/works/w4/w4.5.png', },
            { src: '/works/w4/w4.6.png', }
        ],
        extraImagesAfterText: `Working with concrete requires balancing raw aesthetics with precise engineering. I develop detailed technical solutions to address the specific challenges of wet areas:
- Functional Engineering: I calculate and cast precise surface slopes for proper water drainage and ensure all surfaces meet strict hygiene standards.
- System Integration: The designs are engineered to accommodate complex plumbing requirements, seamlessly integrating both concealed and visible plumbing systems into the concrete form.
- Fabrication Control: From technical detailing to the final seal, I oversee the process to guarantee durability, precision, and design consistency in every single application.`,
        extraImagesTwo: [
            { src: '/works/w4/w4.png', },
            { src: '/works/w4/w4.1.png', }
        ]
    },
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
            { src: '/works/w5/w5.1.png', alt: 'Detail 5-1' },
            { src: '/works/w5/w5.2.png', alt: 'Detail 5-2' },
            { src: '/works/w5/w5.4.png', alt: 'Detail 5-3' },
            { src: '/works/w5/w5.3.png', alt: 'Detail 5-4' },
            { src: '/works/w5/w5.5.png', alt: 'Detail 5-5' },
            { src: '/works/w5/w5.6.png', alt: 'Detail 5-6' },
        ],
        extraImages: [
            { src: '/works/w5/w5.png', },
            { src: '/works/w5/w5.1.png', },
            { src: '/works/w5/w5.2.png', },
            { src: '/works/w5/w5.3.png', },
            { src: '/works/w5/w5.4.png', },
            { src: '/works/w5/w5.5.png', },
            { src: '/works/w5/w5.6.png', }

        ],
        extraImagesAfterText: `To ensure precision and functionality, I was hands-on at every stage of the manufacturing process. The project required specific technical solutions to work effectively:
- Material Versatility: I developed the production process to support various surface textures, including terrazzo and multiple concrete mixes. This allows the sconce to adapt to different interior styles.
- Custom Mounting System: I designed a specific two-part mounting mechanism made from laser-cut aluminum. This system solves the practical challenges: it secures the heavy fixture to the wall while allowing easy access for installation and bulb replacement.
- Production Logic: I created the molds and supervised the casting to ensure that every unit—whether a prototype or part of a large batch—maintained the same surface finish and form precision.`,
        
    },
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
            { src: '/works/w6/w6.png', },
            { src: '/works/w6/w6.1.png', },
            { src: '/works/w6/w6.2.png', },
            { src: '/works/w6/w6.3.png', },
            { src: '/works/w6/w6.4.png', },
            { src: '/works/w6/w6.5.png', },
            { src: '/works/w6/w6.6.png', }
        ],
        extraImagesAfterText: `Over the years, I developed different production methods to solve specific problems like weight and texture. I don't stick to one technique; I use what works best for the project:
- Solid & Terrazzo: For durability and texture, I use custom cement mixes or terrazzo composites, casting them in diverse molds to get unique forms.
- Lightweight Composites: Sometimes solid concrete is too heavy. In those cases, I build MDF structures and finish them with microcement coatings. It looks like concrete but works better for larger volumes.
- Metal & Finish: I also combine these with metal frames, using manual surface scraping to create distinct textures.
It’s all about testing the limits of the material to see how far I can push the fabrication process.`,
       
    },
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
            { src: '/works/w7/w7.png', },
            { src: '/works/w7/w7.1.png', },
            { src: '/works/w7/w7.2.png', },
            { src: '/works/w7/w7.3.png', },
            { src: '/works/w7/w7.5.1.jpg', },
            { src: '/works/w7/w7.5.png', },
            { src: '/works/w7/w7.6.jpeg', }
        ],
        extraImagesAfterText: `This wasn't just about fabrication; it was a computational logic puzzle. I used Rhino and Grasshopper to rationalize the complex forms into a buildable system:
- Computational Logic: I used parametric modeling to define an interlocking cassette structure. The software calculated the exact number of panels and their assembly sequence.
- Production Management: I oversaw the hands-on fabrication at the workshop. My job was to guide the craftsmen using data from the digital model, ensuring the artist’s intent was preserved in every curve and joint.
It’s a perfect example of how I combine analog craftsmanship with computational design systems.`,
        extraImagesTwo: [
            { src: '/works/w7/w7.5.1.jpg', },
            { src: '/works/w7/w7.5.png', }
        ],
        extraImagesTwoAfterText: `For press coverage and further details:
- Argonotlar: Kulac sergisinden ilhamla bir yüzücü güncesi
- Hayy Acik Alan: Kulac, Asli Ozdoyuran
- Artfulliving: Asli Ozdoyuran'in -Kulac- sergisi`
    },
    "8": {
        title: <>Also Your Wound, Rosa – Installation, 17th Istanbul Biennial<br />Cement Mixed Sculpture Installation</>,
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
            { src: '/works/w8/w8.1.1.png', alt: 'Detail 8-1' },
            { src: '/works/w8/w8.2.png', alt: 'Detail 8-2' },
            { src: '/works/w8/w8.3.png', alt: 'Detail 8-3' },
            { src: '/works/w8/w8.4.png', alt: 'Detail 8-4' },
            { src: '/works/w8/w8.5.png', alt: 'Detail 8-5' },
            { src: '/works/w8/w8.6.png', alt: 'Detail 8-6' },
        ],
        extraImages: [
            { src: '/works/w8/w8.1.png', },
            { src: '/works/w8/w8.1.1.png', },
            { src: '/works/w8/w8.2.png', },
            { src: '/works/w8/w8.3.png', },
            { src: '/works/w8/w8.4.png', },
            { src: '/works/w8/w8.5.png', },
            { src: '/works/w8/w8.6.png', }
        ],
        extraImagesAfterText: `I handled the project from the first calculation to the final installation. The process required strict coordination:
- Production Management: I carried out quantity surveying and procurement, ensuring we had exactly what we needed. Overseeing the casting and finishing of three tons of concrete meant there was no room for error.
- Logistics & Performance: The job didn't end at the workshop. I managed the transportation and installation logistics, handled the after-care, and even participated in the performative aspects of the exhibition.
- Circular Design: We integrated sustainability directly into the workflow. Instead of throwing away the casting molds, we transformed them into packaging and storage units for the sculptures, minimizing waste.`,
        extraImagesTwo: [
            { src: '/works/w8/w8.1.png', },
            { src: '/works/w8/w8.1.1.png', }
        ],
        extraImagesTwoAfterText: `For more details on the biennial and this project:
- Also Your Wound, Rosa – Border-Less
- Pelin Uran – Also Your Wound Rosa`
    },
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
            { src: '/works/w9/w9.png', alt: 'Main 9' },
            { src: '/works/w9/w9.1.png', alt: 'Detail 9-1' },
            { src: '/works/w9/w9.2.png', alt: 'Detail 9-2' },
            { src: '/works/w9/w9.3.png', alt: 'Detail 9-3' },
            { src: '/works/w9/w9.4.png', alt: 'Detail 9-4' },
            { src: '/works/w9/w9.5.png', alt: 'Detail 9-5' },
            { src: '/works/w9/w9.6.png', alt: 'Detail 9-6' },
        ],
        extraImagesAfterText: `This project required a unique balance of material science and preservation engineering. I had to solve two major problems:
- Structural Durability: I developed a fabrication method to cast long, slender cement panels that were strong enough to hold their own weight without cracking.
- The "No-Drill" Solution: The installation site was the historic Sultan Han staircase. Drilling holes was out of the question. To solve this, I devised a custom double-compression mounting method. This system used tension to securely fix the panels to the stone walls without any drilling or impact damage.
The solution proved itself: the panels survived an entire winter outdoors, structurally intact and visually perfect. Combining material innovation with preservation sensitivity made this one of the most rewarding projects I’ve worked on.`,
        extraImages: [
            { src: '/works/w9/w9.png', },
            { src: '/works/w9/w9.1.png', },
            { src: '/works/w9/w9.2.png', },
            { src: '/works/w9/w9.3.png', },
            { src: '/works/w9/w9.4.png', },
            { src: '/works/w9/w9.5.png', },
            { src: '/works/w9/w9.6.png', },
        ],
        
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
    
    // --- SLIDER STATE'LERİ ---
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentSlideIndexTwo, setCurrentSlideIndexTwo] = useState(0);

    // --- PAUSE STATE'LERİ ---
    const [isPaused, setIsPaused] = useState(false);
    const [isPausedTwo, setIsPausedTwo] = useState(false);

    // --- SLIDER 1 OTOMATİK AKIŞ (3 Saniye) ---
    useEffect(() => {
        if (!projectData?.extraImages || projectData.extraImages.length <= 1 || isPaused) return;
        const timer = setInterval(() => setCurrentSlideIndex((prev) => (prev + 1) % projectData.extraImages!.length), 3000);
        return () => clearInterval(timer);
    }, [projectData?.extraImages, isPaused]);

    // --- SLIDER 2 OTOMATİK AKIŞ (3 Saniye) ---
    useEffect(() => {
        if (!projectData?.extraImagesTwo || projectData.extraImagesTwo.length <= 1 || isPausedTwo) return;
        const timer = setInterval(() => setCurrentSlideIndexTwo((prev) => (prev + 1) % projectData.extraImagesTwo!.length), 3000);
        return () => clearInterval(timer);
    }, [projectData?.extraImagesTwo, isPausedTwo]);

    const nextSlide = () => projectData?.extraImages && setCurrentSlideIndex((prev) => (prev + 1) % projectData.extraImages!.length);
    const prevSlide = () => projectData?.extraImages && setCurrentSlideIndex((prev) => (prev - 1 + projectData.extraImages!.length) % projectData.extraImages!.length);
    const nextSlideTwo = () => projectData?.extraImagesTwo && setCurrentSlideIndexTwo((prev) => (prev + 1) % projectData.extraImagesTwo!.length);
    const prevSlideTwo = () => projectData?.extraImagesTwo && setCurrentSlideIndexTwo((prev) => (prev - 1 + projectData.extraImagesTwo!.length) % projectData.extraImagesTwo!.length);

    useLayoutEffect(() => {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") { setIsDark(true); document.documentElement.classList.add("dark"); }
        else { setIsDark(false); document.documentElement.classList.remove("dark"); }
        const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true, touchMultiplier: 2 } as any);
        function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault(); setIsExiting(true);
        setTimeout(() => router.push('/#works'), 600);
    };

    const renderFormattedText = (text: string) => {
        return text.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('-')) {
                return (
                    <span key={index} className="flex gap-2 mt-2">
                        <span className="text-[#0082c8]">•</span>
                        <span>{trimmedLine.substring(1).trim()}</span>
                    </span>
                );
            }
            return <span key={index} className="block mt-4">{line}</span>;
        });
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
            initial={{ opacity: 0 }} animate={{ opacity: (!isExiting) ? 1 : 0 }} transition={{ duration: 1.0 }}
            className="min-h-screen w-full transition-colors duration-300 pb-20"
            style={{ backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)", color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)" }}
        >
            <a href="/#works" onClick={handleBackClick} className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#0082c8] hover:opacity-80">
                <ArrowLeft size={24} /> <span style={{ fontFamily: "'Fira Code', monospace" }}>WORKS</span>
            </a>

            {/* BAŞLIK */}
            <div className="relative flex h-[50vh] items-center justify-center">
                <div aria-hidden="true" className={cn('pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full blur-[30px]')}
                    style={{ background: `radial-gradient(ellipse at center, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent 50%)` }}
                />
                <div className="text-center z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>{projectData.title}</h1>
                    <p className="opacity-60 font-light" style={{ fontFamily: "'Antic', sans-serif" }}>{projectData.description}</p>
                </div>
            </div>

            <ZoomParallax images={projectData.images} />
            
            <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">
                {/* 1. Proje Hakkında (Başlık Eklendi) */}
                <div>
                    <h3 className="text-2xl font-bold mb-12 text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>
                        About the Project
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 leading-relaxed text-lg opacity-80" style={{ fontFamily: "'Antic', sans-serif" }}>
                        <div><p>{projectData.about}</p></div>
                        <div>{projectData.aboutSecondColumn && <p>{projectData.aboutSecondColumn}</p>}</div>
                    </div>
                </div>

                {/* 2. Künye Bilgileri */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {projectData.details.map((detail, index) => (
                        <div key={index} className="space-y-2">
                            <span className="block text-sm opacity-50 uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>{detail.label}</span>
                            <span className="block text-lg font-medium" style={{ fontFamily: "'Fira Code', monospace" }}>{detail.value}</span>
                        </div>
                    ))}
                </div>

                {/* SLIDER 1 */}
                {projectData.extraImages && projectData.extraImages.length > 0 && (
                    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16 mt-16">
                        <h3 className="text-2xl font-bold mb-12 text-[#0082c8]" style={{ fontFamily: "'Fira Code', monospace" }}>Project Details</h3>
                        <div 
                            className="relative group max-w-4xl mx-auto"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 aspect-[16/10]">
                                <AnimatePresence mode="wait">
                                    <motion.img key={currentSlideIndex} src={projectData.extraImages[currentSlideIndex].src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full object-cover" />
                                </AnimatePresence>
                                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronRight size={28} /></button>
                                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronLeft size={28} /></button>
                            </div>

                            <div className="mt-4 flex justify-end text-sm opacity-40 font-mono" style={{ fontFamily: "'Fira Code', monospace" }}>
                                {String(currentSlideIndex + 1).padStart(2, '0')} / {String(projectData.extraImages.length).padStart(2, '0')}
                            </div>

                            {projectData.extraImagesAfterText && (
                                <div className="mt-6 max-w-3xl border-l-2 border-[#0082c8] pl-6 opacity-70" style={{ fontFamily: "'Antic', sans-serif" }}>
                                    {renderFormattedText(projectData.extraImagesAfterText)}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SLIDER 2 */}
                {projectData.extraImagesTwo && projectData.extraImagesTwo.length > 0 && (
                    <div className="pt-16 mt-16">
                        <div 
                            className="relative group max-w-4xl mx-auto"
                            onMouseEnter={() => setIsPausedTwo(true)}
                            onMouseLeave={() => setIsPausedTwo(false)}
                        >
                            <div className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 aspect-[16/10]">
                                <AnimatePresence mode="wait">
                                    <motion.img key={currentSlideIndexTwo} src={projectData.extraImagesTwo[currentSlideIndexTwo].src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full object-cover" />
                                </AnimatePresence>
                                <button onClick={nextSlideTwo} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronRight size={28} /></button>
                                <button onClick={prevSlideTwo} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronLeft size={28} /></button>
                            </div>

                            <div className="mt-4 flex justify-end text-sm opacity-40 font-mono" style={{ fontFamily: "'Fira Code', monospace" }}>
                                {String(currentSlideIndexTwo + 1).padStart(2, '0')} / {String(projectData.extraImagesTwo.length).padStart(2, '0')}
                            </div>

                            {projectData.extraImagesTwoAfterText && (
                                <div className="mt-6 max-w-3xl border-l-2 border-[#0082c8] pl-6 opacity-70" style={{ fontFamily: "'Antic', sans-serif" }}>
                                    {renderFormattedText(projectData.extraImagesTwoAfterText)}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.main>
    );
}