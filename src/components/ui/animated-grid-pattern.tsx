'use client';

import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type AnimatedGridPatternProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number | string;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
};

type Square = { id: number; pos: [number, number] };

export const AnimatedGridPattern = ({
  width = 48,
  height = 48,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 36,
  className,
  maxOpacity = 0.4,
  duration = 4,
  repeatDelay = 0.6,
}: AnimatedGridPatternProps) => {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  const getPos = () => {
    if (!dimensions.width || !dimensions.height) {
      return [0, 0] as [number, number];
    }
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ] as [number, number];
  };

  const generateSquares = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));

  const updateSquarePosition = (idToUpdate: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) => (sq.id === idToUpdate ? { ...sq, pos: getPos() } : sq)),
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions.width, dimensions.height, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 h-full w-full fill-current stroke-current',
        className,
      )}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id: squareId }, index) => (
          <motion.rect
            key={`${squareX}-${squareY}-${index}`}
            width={width - 1}
            height={height - 1}
            x={squareX * width + 1}
            y={squareY * height + 1}
            fill="currentColor"
            strokeWidth="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.08,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => updateSquarePosition(squareId)}
          />
        ))}
      </svg>
    </svg>
  );
};
