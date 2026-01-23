'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { LanguageToggle } from './ui/language-toggle';
import clsx from 'clsx';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/cv', label: 'CV' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const activeSection = useScrollSpy(['lo-que-hago', 'impacto', 'experiencia', 'habilidades', 'herramientas', 'idiomas', 'contacto']);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = links.findIndex((link) => link.href === pathname);

  const moveIndicatorTo = (idx: number) => {
    const navEl = navRef.current;
    const linkEl = linkRefs.current[idx];
    if (!navEl || !linkEl) {
      return;
    }
    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      visible: true,
    });
  };

  useEffect(() => {
    if (activeIndex >= 0) {
      moveIndicatorTo(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      const idx = hoveredIndex ?? activeIndex;
      if (idx >= 0) {
        moveIndicatorTo(idx);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, hoveredIndex]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-black text-[--foreground]">
          Daniel Reyes
        </Link>
        <nav
          className="relative hidden items-center gap-2 md:flex"
          ref={navRef}
          onMouseLeave={() => {
            setHoveredIndex(null);
            if (activeIndex >= 0) {
              moveIndicatorTo(activeIndex);
            }
          }}
        >
          <span
            className={clsx(
              'pointer-events-none absolute inset-y-1 rounded-full bg-[#0b2f70] transition-all duration-300 ease-out',
              indicator.visible ? 'opacity-100' : 'opacity-0',
            )}
            style={{ left: indicator.left, width: indicator.width }}
            aria-hidden
          />
          {links.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[idx] = el;
              }}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                moveIndicatorTo(idx);
              }}
              onFocus={() => {
                setHoveredIndex(idx);
                moveIndicatorTo(idx);
              }}
              className={clsx(
                'relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:!text-white',
                (hoveredIndex === idx || (hoveredIndex === null && activeIndex === idx)) ? '!text-white' : 'text-[--muted]',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Button href="/contacto" variant="primary" className="px-4 py-2 text-sm">
            Hablemos
          </Button>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full bg-black/5 px-3 py-2 text-sm font-semibold text-[--foreground] transition-transform hover:-translate-y-0.5 md:hidden"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-black/5',
                  pathname === link.href ? 'text-[--accent]' : 'text-[--muted]',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contacto" variant="primary" className="w-full justify-center">
              Hablemos
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
