'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

type StickyItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type StickyScrollProps = {
  content: StickyItem[];
  className?: string;
  contentClassName?: string;
};

export const StickyScroll = ({ content, className = '', contentClassName = '' }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end end'],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (cardLength <= 1) {
      setActiveCard(0);
      return;
    }
    const breakpoints = content.map((_, index) => index / (cardLength - 1));
    const closest = breakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - breakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    if (latest >= 0.98) {
      setActiveCard(cardLength - 1);
      return;
    }
    setActiveCard(closest);
  });

  return (
    <div
      ref={ref}
      className={clsx(
        'relative flex h-[34rem] w-full items-start gap-10 overflow-y-auto rounded-[28px] px-6 py-8 sm:px-8',
        className,
      )}
    >
      <div className="relative z-10 flex-1">
        {content.map((item, index) => (
          <div key={`${item.title}-${index}`} className="my-12 max-w-2xl">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-2xl font-black text-white"
            >
              {item.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCard === index ? 1 : 0.35 }}
              className="mt-4 text-sm text-white/80"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        <div className="h-10" />
      </div>

      <div
        className={clsx(
          'hidden lg:block h-72 w-[22rem] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-2xl sticky top-32',
          contentClassName,
        )}
      >
        <Image
          src={content[activeCard]?.image}
          alt={content[activeCard]?.imageAlt}
          width={640}
          height={480}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
