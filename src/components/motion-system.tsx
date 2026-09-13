'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const MotionSystem = () => {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const scrollEnergyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopMedia = window.matchMedia('(min-width: 851px) and (pointer: fine)');
    const desktopEffects = !reduceMotion && desktopMedia.matches;
    const root = document.documentElement;
    root.classList.add('motion-enabled');

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(
      '.section-title, main .card, main .portfolio-panel, .accounting-terminal, .project-showcase, .resume-experience, .process-comparison',
    ));
    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: '0px 0px -8%', threshold: .08 },
    );
    revealTargets.forEach((element) => observer.observe(element));

    const animatedRegions = Array.from(document.querySelectorAll<HTMLElement>(
      '.portfolio-hero, .project-showcase, .location-map-card',
    ));
    const effectsObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle('effects-paused', !entry.isIntersecting);
      }),
      { rootMargin: '100px 0px', threshold: 0 },
    );
    animatedRegions.forEach((element) => effectsObserver.observe(element));

    const tiltTargets = desktopEffects ? Array.from(
      document.querySelectorAll<HTMLElement>('.interactive-card, .accounting-terminal, .portrait-frame, .location-motion-card'),
    ) : [];
    const tiltCleanups = tiltTargets.map((element) => {
      element.classList.add('motion-tilt');
      let tiltFrame = 0;
      let pointerX = 0;
      let pointerY = 0;
      const move = (event: PointerEvent) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        element.classList.remove('is-settling');
        if (tiltFrame) return;
        tiltFrame = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const x = (pointerX - rect.left) / rect.width - .5;
          const y = (pointerY - rect.top) / rect.height - .5;
          element.style.setProperty('--tilt-x', `${-y * 5.5}deg`);
          element.style.setProperty('--tilt-y', `${x * 7}deg`);
          element.style.setProperty('--shine-x', `${(x + .5) * 100}%`);
          element.style.setProperty('--shine-y', `${(y + .5) * 100}%`);
          tiltFrame = 0;
        });
      };
      const leave = () => {
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
        element.classList.add('is-settling');
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      };
      element.addEventListener('pointermove', move, { passive: true });
      element.addEventListener('pointerleave', leave);
      return () => {
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
      };
    });

    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const pointerMove = (event: PointerEvent) => {
      if (!desktopMedia.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        const aura = auraRef.current;
        if (aura) {
          aura.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
          aura.dataset.visible = 'true';
        }
        pointerFrame = 0;
      });
    };
    const pointerLeave = () => {
      if (auraRef.current) auraRef.current.dataset.visible = 'false';
    };
    if (desktopEffects) {
      window.addEventListener('pointermove', pointerMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', pointerLeave);
    }

    const canvas = canvasRef.current;
    let canvasFrame = 0;
    let resizeFrame = 0;
    let lastDrawTime = 0;
    let resizeCanvas = () => {};
    let handleVisibility = () => {};
    if (canvas && desktopEffects) {
      const context = canvas.getContext('2d');
      if (context) {
        let width = 0;
        let height = 0;
        let particles: Particle[] = [];

        resizeCanvas = () => {
          if (resizeFrame) return;
          resizeFrame = requestAnimationFrame(() => {
            resizeFrame = 0;
            if (!desktopMedia.matches) {
              if (canvasFrame) cancelAnimationFrame(canvasFrame);
              canvasFrame = 0;
              return;
            }
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            const count = Math.min(60, Math.max(26, Math.round(width / 27)));
            particles = Array.from({ length: count }, () => ({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - .5) * .17,
              vy: (Math.random() - .5) * .17,
              radius: .5 + Math.random() * 1.15,
              alpha: .15 + Math.random() * .32,
            }));
            if (!canvasFrame) {
              lastDrawTime = 0;
              canvasFrame = requestAnimationFrame(draw);
            }
          });
        };

        const draw = (time: number) => {
          canvasFrame = 0;
          if (document.hidden) return;
          const elapsed = lastDrawTime ? time - lastDrawTime : 1000 / 30;
          if (elapsed < 1000 / 30) {
            canvasFrame = requestAnimationFrame(draw);
            return;
          }
          lastDrawTime = time;
          const movementScale = clamp(elapsed / (1000 / 60), .5, 2.5);
          context.clearRect(0, 0, width, height);
          particles.forEach((particle, index) => {
            particle.x += particle.vx * movementScale;
            particle.y += particle.vy * movementScale;
            if (particle.x < -10) particle.x = width + 10;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = height + 10;
            if (particle.y > height + 10) particle.y = -10;
            context.beginPath();
            context.fillStyle = `rgba(69, 200, 255, ${particle.alpha})`;
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
            for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
              const other = particles[otherIndex];
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distanceSquared = dx * dx + dy * dy;
              if (distanceSquared < 11025) {
                const strength = (1 - Math.sqrt(distanceSquared) / 105) * .09;
                context.beginPath();
                context.strokeStyle = `rgba(22, 136, 255, ${strength})`;
                context.lineWidth = .6;
                context.moveTo(particle.x, particle.y);
                context.lineTo(other.x, other.y);
                context.stroke();
              }
            }
          });
          canvasFrame = requestAnimationFrame(draw);
        };

        const startCanvas = () => {
          if (!canvasFrame && !document.hidden) {
            lastDrawTime = 0;
            canvasFrame = requestAnimationFrame(draw);
          }
        };
        handleVisibility = () => {
          if (document.hidden) {
            if (canvasFrame) cancelAnimationFrame(canvasFrame);
            canvasFrame = 0;
          } else {
            startCanvas();
          }
        };

        resizeCanvas();
        startCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);
      }
    }

    let scrollFrame = 0;
    let velocityTimer = 0;
    let previousY = window.scrollY;
    let previousTime = performance.now();
    const hero = document.querySelector<HTMLElement>('.portfolio-hero');
    const heroCopy = hero?.querySelector<HTMLElement>('.hero-copy');
    const portrait = hero?.querySelector<HTMLElement>('.portrait-stage');
    let heroCopyTravel = (heroCopy?.offsetHeight ?? 0) * -.12;
    let portraitTravel = (portrait?.offsetHeight ?? 0) * .17;
    const updateHeroMeasures = () => {
      heroCopyTravel = (heroCopy?.offsetHeight ?? 0) * -.12;
      portraitTravel = (portrait?.offsetHeight ?? 0) * .17;
    };

    const setScrollVelocity = (velocity: number) => {
      const value = String(velocity);
      scanlinesRef.current?.style.setProperty('--scroll-velocity', value);
      scrollEnergyRef.current?.style.setProperty('--scroll-velocity', value);
    };
    const updateScrollEffects = () => {
      scrollFrame = 0;
      if (!desktopMedia.matches) return;
      const now = performance.now();
      const currentY = window.scrollY;
      const elapsed = Math.max(16, now - previousTime);
      const velocity = clamp(Math.abs(currentY - previousY) / elapsed * 3.2, 0, 1);
      setScrollVelocity(velocity);
      previousY = currentY;
      previousTime = now;

      if (hero && heroCopy && portrait) {
        const rect = hero.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
        heroCopy.style.transform = `translate3d(0, ${progress * heroCopyTravel}px, 0)`;
        heroCopy.style.opacity = String(1 - progress * .45);
        portrait.style.transform = `translate3d(0, ${progress * portraitTravel}px, 0) scale(${1 - progress * .1}) rotate(${progress * 1.8}deg)`;
      }

      window.clearTimeout(velocityTimer);
      velocityTimer = window.setTimeout(() => setScrollVelocity(0), 120);
    };
    const scroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
    };
    if (desktopEffects) {
      updateScrollEffects();
      window.addEventListener('scroll', scroll, { passive: true });
      window.addEventListener('resize', updateHeroMeasures, { passive: true });
    }

    return () => {
      observer.disconnect();
      effectsObserver.disconnect();
      animatedRegions.forEach((element) => element.classList.remove('effects-paused'));
      tiltCleanups.forEach((cleanup) => cleanup());
      if (desktopEffects) {
        window.removeEventListener('pointermove', pointerMove);
        document.documentElement.removeEventListener('mouseleave', pointerLeave);
        window.removeEventListener('scroll', scroll);
        window.removeEventListener('resize', updateHeroMeasures);
      }
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (canvasFrame) cancelAnimationFrame(canvasFrame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.clearTimeout(velocityTimer);
      heroCopy?.removeAttribute('style');
      portrait?.removeAttribute('style');
      root.classList.remove('motion-enabled');
    };
  }, [pathname]);

  return <>
    <canvas ref={canvasRef} className="ambient-particle-canvas" aria-hidden="true" />
    <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
    <div className="cinematic-vignette" aria-hidden="true" />
    <div ref={scanlinesRef} className="chromatic-scanlines" aria-hidden="true" />
    <div ref={scrollEnergyRef} className="scroll-energy" aria-hidden="true" />
  </>;
};
