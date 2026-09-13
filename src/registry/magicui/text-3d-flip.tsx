'use client';

import { motion, type Transition } from 'framer-motion';
import clsx from 'clsx';

type Text3DFlipProps = {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: 'top' | 'bottom';
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
  transition?: Transition;
};

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = 'top',
  staggerDuration = .03,
  staggerFrom = 'first',
  transition = { type: 'spring', damping: 25, stiffness: 160 },
}: Text3DFlipProps) {
  const characters = Array.from(children);
  const getOrder = (index: number) => {
    if (staggerFrom === 'last') return characters.length - index - 1;
    if (staggerFrom === 'center') return Math.abs(index - (characters.length - 1) / 2);
    return index;
  };
  const direction = rotateDirection === 'top' ? -1 : 1;

  return (
    <motion.span
      className={clsx('text-3d-flip', className)}
      initial="rest"
      whileHover="flip"
      whileFocus="flip"
      tabIndex={0}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span className="text-3d-flip-visual" aria-hidden="true">
        {characters.map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            className="text-3d-flip-letter"
            custom={getOrder(index)}
            variants={{
              rest: { rotateX: 0 },
              flip: (order: number) => ({
                rotateX: direction * 90,
                transition: { ...transition, delay: order * staggerDuration },
              }),
            }}
          >
            <span className={clsx('text-3d-flip-face text-3d-flip-front', textClassName)}>
              {character === ' ' ? '\u00a0' : character}
            </span>
            <span
              className={clsx('text-3d-flip-face text-3d-flip-back', flipTextClassName)}
              style={{ transform: `rotateX(${direction * -90}deg) translateZ(.02em)` }}
            >
              {character === ' ' ? '\u00a0' : character}
            </span>
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
