'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const MotionSystem = () => {
  const pathname = usePathname();

  useEffect(() => {
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

    return () => {
      observer.disconnect();
      effectsObserver.disconnect();
      animatedRegions.forEach((element) => element.classList.remove('effects-paused'));
      root.classList.remove('motion-enabled');
    };
  }, [pathname]);

  return null;
};
