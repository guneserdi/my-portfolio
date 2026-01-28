"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
    isAnyCardClicked,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: (e: React.MouseEvent, id: number) => void;
    isAnyCardClicked: boolean;
  }) => (
    <div
      // KRİTİK DÜZELTME: Event objesini ve kart ID'sini PortfolioHero'ya doğru sırayla iletiyoruz
      onClick={(e) => onClick(e, card.id)} 
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-700 ease-in-out cursor-pointer",
        // Hover durumu: Diğer kartları bulanıklaştırır
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-50",
        // Tıklama durumu: Seçilen kartı hafifçe büyütürken genel akışa hazırlar
        isAnyCardClicked && hovered === index && "scale-105 saturate-[1.2]" 
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0 transition-transform duration-1000"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-500",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type CardType = {
  id: number;
  title: string;
  src: string;
};

export function FocusCards({ cards, onCardClick }: { cards: CardType[], onCardClick: (e: React.MouseEvent, id: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isAnyCardClicked, setIsAnyCardClicked] = useState(false);

  const handleInternalClick = (e: React.MouseEvent, id: number) => {
    // Hata önleme: id parametresinin PortfolioHero'daki router.push'a doğru gitmesini garanti ediyoruz
    setIsAnyCardClicked(true); // Çıkış animasyonunu (fade-out/blur) tetikler
    onCardClick(e, id); // PortfolioHero'daki 800ms beklemeli yönlendirmeyi çalıştırır
  };

  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto md:px-8 w-full transition-all duration-1000",
      // Tıklama anında Works alanının tamamı "Back to Works" butonundaki gibi pürüzsüzce kaybolur
      isAnyCardClicked ? "opacity-0 scale-95 blur-xl pointer-events-none" : "opacity-100" 
    )}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={handleInternalClick}
          isAnyCardClicked={isAnyCardClicked}
        />
      ))}
    </div>
  );
}