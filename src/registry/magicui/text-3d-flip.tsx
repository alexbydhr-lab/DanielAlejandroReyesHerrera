import type { CSSProperties } from 'react';
import clsx from 'clsx';

type Text3DFlipProps = {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: 'top' | 'bottom';
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
};

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = 'top',
  staggerDuration = .03,
  staggerFrom = 'first',
}: Text3DFlipProps) {
  const characters = Array.from(children);
  const getOrder = (index: number) => {
    if (staggerFrom === 'last') return characters.length - index - 1;
    if (staggerFrom === 'center') return Math.abs(index - (characters.length - 1) / 2);
    return index;
  };
  const direction = rotateDirection === 'top' ? -90 : 90;

  return (
    <span
      className={clsx('text-3d-flip', className)}
      tabIndex={0}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span className="text-3d-flip-visual" aria-hidden="true">
        {characters.map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="text-3d-flip-letter"
            style={{
              '--flip-angle': `${direction}deg`,
              '--flip-delay': `${getOrder(index) * staggerDuration}s`,
            } as CSSProperties}
          >
            <span className={clsx('text-3d-flip-face text-3d-flip-front', textClassName)}>
              {character === ' ' ? '\u00a0' : character}
            </span>
            <span
              className={clsx('text-3d-flip-face text-3d-flip-back', flipTextClassName)}
              style={{ transform: `rotateX(${-direction}deg) translateZ(.02em)` }}
            >
              {character === ' ' ? '\u00a0' : character}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
