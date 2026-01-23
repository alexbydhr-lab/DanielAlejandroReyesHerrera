'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
};

type TextParticleProps = {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleColor?: string;
  particleDensity?: number;
  backgroundColor?: string;
  className?: string;
};

export const TextParticle = ({
  text,
  fontSize = 64,
  fontFamily = 'Inter, system-ui, sans-serif',
  particleSize = 2,
  particleColor = '#0b2f70',
  particleDensity = 8,
  backgroundColor = 'transparent',
  className = '',
}: TextParticleProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initText = () => {
      const cssWidth = canvas.offsetWidth;
      const cssHeight = canvas.offsetHeight;
      canvas.width = cssWidth;
      canvas.height = cssHeight;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxWidth = cssWidth * 0.92;
      const maxHeight = cssHeight * 0.75;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const measured = ctx.measureText(text);
      const widthScale = measured.width ? Math.min(1, maxWidth / measured.width) : 1;
      const heightScale = Math.min(1, maxHeight / fontSize);
      const fittedFontSize = Math.floor(fontSize * Math.min(widthScale, heightScale));
      ctx.font = `${fittedFontSize}px ${fontFamily}`;

      const x = cssWidth / 2;
      const y = cssHeight / 2;
      ctx.fillText(text, x, y);

      const textCoordinates = ctx.getImageData(0, 0, cssWidth, cssHeight);
      const newParticles: Particle[] = [];

      for (let py = 0; py < textCoordinates.height; py += particleDensity) {
        for (let px = 0; px < textCoordinates.width; px += particleDensity) {
          const index = (py * textCoordinates.width + px) * 4;
          const alpha = textCoordinates.data[index + 3];
          if (alpha > 128) {
            newParticles.push({
              x: px,
              y: py,
              size: particleSize,
              baseX: px,
              baseY: py,
              density: Math.random() * 30 + 1,
              color: particleColor,
            });
          }
        }
      }

      setParticles(newParticles);
      ctx.clearRect(0, 0, cssWidth, cssHeight);
    };

    const handleResize = () => initText();
    window.addEventListener('resize', handleResize);
    initText();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, fontSize, fontFamily, particleSize, particleColor, particleDensity]);

  useEffect(() => {
    if (particles.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((particle) => {
        let dx = 0;
        let dy = 0;
        let distance = 0;
        let forceDirectionX = 0;
        let forceDirectionY = 0;

        if (mouse.x !== null && mouse.y !== null) {
          dx = mouse.x - particle.x;
          dy = mouse.y - particle.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            forceDirectionX = (dx / distance) * 3;
            forceDirectionY = (dy / distance) * 3;
          }
        }

        const moveX = forceDirectionX + (particle.baseX - particle.x) * 0.05;
        const moveY = forceDirectionY + (particle.baseY - particle.y) * 0.05;

        particle.x += moveX;
        particle.y += moveY;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mouse, backgroundColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: null, y: null });
  };

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};
