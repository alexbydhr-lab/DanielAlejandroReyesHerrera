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
    let canvasWidth = 0;
    let canvasHeight = 0;

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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvasWidth = width;
      canvasHeight = height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
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
      let isMoving = false;

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

        const moveX = (targetX - dot.x) * 0.08;
        const moveY = (targetY - dot.y) * 0.08;
        dot.x += moveX;
        dot.y += moveY;
        if (Math.abs(moveX) > .02 || Math.abs(moveY) > .02) isMoving = true;

        ctx.globalAlpha = dot.opacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      return isMoving;
    };

    const animate = () => {
      if (!canvas || !container) return;
      const isMoving = drawFrame(canvasWidth, canvasHeight);
      animationRef.current = isMoving && inViewRef.current
        ? window.requestAnimationFrame(animate)
        : null;
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
        if (inViewRef.current && !prefersReducedMotion && !coarsePointer) startAnimation();
      } else {
        mouseRef.current = { x: null, y: null };
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: null, y: null };
      if (inViewRef.current && !prefersReducedMotion && !coarsePointer) startAnimation();
    };

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupCanvas, 140);
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      if (prefersReducedMotion || coarsePointer) return;
      if (inViewRef.current) {
        drawFrame(canvasWidth, canvasHeight);
      } else {
        stopAnimation();
      }
    });

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    resizeObserver.observe(container);
    intersectionObserver.observe(container);

    setupCanvas();

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.clearTimeout(resizeTimer);
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
