'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
};

type DottedSurfaceProps = {
  className?: string;
  dotGap?: number;
  dotRadius?: number;
  dotColor?: string;
  maxOpacity?: number;
  interactionRadius?: number;
  strength?: number;
  backgroundColor?: string;
};

export const DottedSurface = ({
  className,
  dotGap = 26,
  dotRadius = 1.6,
  dotColor = 'rgb(11, 27, 61)',
  maxOpacity = 0.35,
  interactionRadius = 140,
  strength = 0.45,
  backgroundColor = 'transparent',
}: DottedSurfaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationRef = useRef<number | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const buildDots = (width: number, height: number) => {
      const dots: Dot[] = [];
      const offsetX = (width % dotGap) / 2;
      const offsetY = (height % dotGap) / 2;

      for (let y = offsetY; y <= height; y += dotGap) {
        for (let x = offsetX; x <= width; x += dotGap) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            radius: dotRadius,
            opacity: 0.1 + Math.random() * (maxOpacity - 0.1),
          });
        }
      }

      return dots;
    };

    const setupCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dotsRef.current = buildDots(width, height);
      drawFrame(width, height);
    };

    const drawFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.fillStyle = dotColor;
      const mouse = mouseRef.current;

      for (const dot of dotsRef.current) {
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < interactionRadius) {
            const force = (1 - distance / interactionRadius) * strength * interactionRadius;
            targetX += (dx / distance) * force;
            targetY += (dy / distance) * force;
          }
        }

        dot.x += (targetX - dot.x) * 0.08;
        dot.y += (targetY - dot.y) * 0.08;

        ctx.globalAlpha = dot.opacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (!canvas || !container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      drawFrame(width, height);
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationRef.current !== null) return;
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationRef.current === null) return;
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: null, y: null };
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      if (prefersReducedMotion || coarsePointer) return;
      if (inViewRef.current) {
        startAnimation();
      } else {
        stopAnimation();
      }
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    resizeObserver.observe(container);
    intersectionObserver.observe(container);

    setupCanvas();

    if (!prefersReducedMotion && !coarsePointer) {
      startAnimation();
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stopAnimation();
    };
  }, [backgroundColor, dotColor, dotGap, dotRadius, interactionRadius, maxOpacity, strength]);

  return (
    <div ref={containerRef} className={clsx('h-full w-full', className)}>
      <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
    </div>
  );
};
