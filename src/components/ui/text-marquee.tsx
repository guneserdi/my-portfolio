'use client';

import { useRef, useEffect, forwardRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import { cn } from '@/lib/utils';

interface TextMarqueeProps {
  children: string;
  baseVelocity: number;
  className?: string; // Yazım hatası düzeltildi: clasname -> className
  scrollDependent?: boolean;
  delay?: number;
}

const TextMarquee = forwardRef<HTMLDivElement, TextMarqueeProps>(({
  children,
  baseVelocity = -5,
  className,
  scrollDependent = false,
  delay = 0,
}, ref) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasStarted.current = true;
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useAnimationFrame((t, delta) => {
    if (!hasStarted.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className='overflow-hidden whitespace-nowrap flex flex-nowrap py-2'>
      <motion.div
        className='flex whitespace-nowrap gap-12 flex-nowrap'
        style={{ x }}
      >
       {/* Kesintisiz döngü için içeriği tekrarlıyoruz */}
        {/* DEĞİŞİKLİK: text-4xl -> text-2xl VE md:text-6xl -> md:text-4xl yapıldı */}
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        <span 
          className={cn(`block text-2xl md:text-4xl font-bold uppercase opacity-80`, className)} 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {children}
        </span>
        
      </motion.div>
    </div>
  );
});

TextMarquee.displayName = 'TextMarquee';

export default TextMarquee;