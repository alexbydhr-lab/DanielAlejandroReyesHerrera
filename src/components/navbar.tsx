'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/content/profile';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/#experiencia', label: 'Experiencia' },
  { href: '/sobre-mi#proyectos', label: 'Proyectos' },
  { href: '/contacto', label: 'Contacto' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    let latestY = previousY;
    let frame = 0;
    let directionTravel = 0;
    let previousDirection = 0;
    const update = () => {
      latestY = window.scrollY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const delta = latestY - previousY;
        const direction = Math.sign(delta);
        setIsScrolled(latestY > 18);
        if (latestY <= 18) {
          setIsCompact(false);
          directionTravel = 0;
        } else if (direction !== 0) {
          directionTravel = direction === previousDirection ? directionTravel + Math.abs(delta) : Math.abs(delta);
          if (directionTravel >= 14) {
            setIsCompact(direction > 0);
            directionTravel = 0;
          }
          previousDirection = direction;
        }
        previousY = latestY;
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('mobile-menu-open', open);
    return () => document.documentElement.classList.remove('mobile-menu-open');
  }, [open]);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  return (
    <header ref={headerRef} className={`portfolio-header ${isScrolled ? 'is-scrolled' : ''} ${isCompact && !open ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="portfolio-menu-backdrop"
        aria-label="Cerrar navegación"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
      <div className="portfolio-nav-shell">
        <Link href="/" className="portfolio-brand" aria-label={`${profile.shortName}, inicio`} onClick={() => setOpen(false)}>
          <span><b>DANIEL</b> <strong>REYES</strong></span>
        </Link>

        <button
          type="button"
          className="portfolio-menu-toggle"
          aria-expanded={open}
          aria-controls="portfolio-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Cerrar navegación' : 'Abrir navegación'}</span>
          <span className="portfolio-menu-label" aria-hidden="true">{open ? 'Cerrar' : 'Menú'}</span>
          <span className="portfolio-menu-icon" aria-hidden="true"><i /><i /></span>
        </button>

        <nav id="portfolio-navigation" className={`portfolio-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          <div className="mobile-nav-meta" aria-hidden="true"><span>Navegación</span><b>Portafolio / 2026</b></div>
          <div className="portfolio-nav-links">
            {links.map((link, index) => {
              const [route, hash = ''] = link.href.split('#');
              const active = !hash && pathname === route;
              return (
                <Link key={link.href} href={link.href} className={active ? 'active' : ''} onClick={() => setOpen(false)}>
                  <span className="nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="nav-label">{link.label}</span>
                  <span className="nav-arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
          <Link className="portfolio-nav-cta" href="/cv" onClick={() => setOpen(false)}>
            CV interactivo <span aria-hidden="true">→</span>
          </Link>
          <div className="mobile-nav-status" aria-hidden="true"><i /><span>Disponible para oportunidades</span></div>
        </nav>
      </div>
    </header>
  );
};
