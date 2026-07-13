'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number };

export const MotionSystem = () => {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const root = document.documentElement;
    root.classList.add('motion-enabled');

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(
      '.section-title, main .card, main .portfolio-panel, .accounting-terminal, main > div > .max-w-6xl, main section:not(.portfolio-hero)',
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

    const tiltTargets = coarsePointer || reduceMotion ? [] : Array.from(
      document.querySelectorAll<HTMLElement>('.card, .portfolio-panel, .accounting-terminal, .resume-role-card, .portrait-frame, .location-motion-card'),
    );
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
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
      return () => {
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
      };
    });

    const pointerMove = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
      if (auraRef.current && !coarsePointer) {
        auraRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        auraRef.current.dataset.visible = 'true';
      }
    };
    const pointerLeave = () => { if (auraRef.current) auraRef.current.dataset.visible = 'false'; };
    window.addEventListener('pointermove', pointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', pointerLeave);

    const canvas = canvasRef.current;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    if (canvas && !reduceMotion) {
      const context = canvas.getContext('2d');
      if (context) {
        let width = 0;
        let height = 0;
        let particles: Particle[] = [];
        const resize = () => {
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          const count = Math.min(72, Math.max(28, Math.round(width / 23)));
          particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - .5) * .17,
            vy: (Math.random() - .5) * .17,
            radius: .5 + Math.random() * 1.15,
            alpha: .15 + Math.random() * .32,
          }));
        };
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(document.documentElement);
        const draw = () => {
          context.clearRect(0, 0, width, height);
          particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
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
              const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
              if (distance < 105) {
                context.beginPath();
                context.strokeStyle = `rgba(22, 136, 255, ${(1 - distance / 105) * .09})`;
                context.lineWidth = .6;
                context.moveTo(particle.x, particle.y);
                context.lineTo(other.x, other.y);
                context.stroke();
              }
            }
          });
          frame = requestAnimationFrame(draw);
        };
        draw();
      }
    }

    let cancelled = false;
    let destroyScrollMotion = () => { cancelled = true; };
    if (!reduceMotion) {
      const startScrollMotion = async () => {
        const [gsapModule, triggerModule, lenisModule] = await Promise.all([
          import('gsap'), import('gsap/ScrollTrigger'), import('lenis'),
        ]);
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        const Lenis = lenisModule.default;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .88, touchMultiplier: 1.05 });
        lenis.on('scroll', (event) => {
          ScrollTrigger.update();
          root.style.setProperty('--scroll-velocity', String(Math.min(1, Math.abs(event.velocity) / 18)));
        });
        const ticker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
        const gsapContext = gsap.context(() => {
          const hero = document.querySelector('.portfolio-hero');
          if (hero) {
            gsap.to('.hero-copy', { yPercent: -12, opacity: .55, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.05 } });
            gsap.to('.portrait-stage', { yPercent: 17, scale: .9, rotate: 1.8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } });
          }
          gsap.utils.toArray<HTMLElement>('.section-title').forEach((heading) => {
            const title = heading.querySelector('h2');
            if (title) gsap.fromTo(title,
              { y: 65, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0 0 100% 0)' },
              { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.out', scrollTrigger: { trigger: heading, start: 'top 84%', once: true } },
            );
          });
          gsap.utils.toArray<HTMLElement>('main .grid').forEach((grid) => {
            const children = Array.from(grid.children).filter((child) => !child.classList.contains('section-title'));
            if (children.length > 1) gsap.fromTo(children,
              { y: 66, opacity: 0, rotateY: 6 },
              { y: 0, opacity: 1, rotateY: 0, duration: .95, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: grid, start: 'top 84%', once: true } },
            );
          });
          gsap.utils.toArray<HTMLElement>('.portfolio-panel').forEach((panel, index) => {
            gsap.fromTo(panel, { x: index % 2 ? 35 : -35, opacity: 0 }, { x: 0, opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 86%', once: true } });
          });
        });
        ScrollTrigger.refresh();
        destroyScrollMotion = () => {
          gsapContext.revert();
          gsap.ticker.remove(ticker);
          lenis.destroy();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      };
      startScrollMotion();
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      tiltCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener('pointermove', pointerMove);
      document.documentElement.removeEventListener('mouseleave', pointerLeave);
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      destroyScrollMotion();
      root.classList.remove('motion-enabled');
    };
  }, [pathname]);

  return <>
    <canvas ref={canvasRef} className="ambient-particle-canvas" aria-hidden="true" />
    <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
    <div className="cinematic-vignette" aria-hidden="true" />
    <div className="chromatic-scanlines" aria-hidden="true" />
    <div className="scroll-energy" aria-hidden="true" />
  </>;
};
