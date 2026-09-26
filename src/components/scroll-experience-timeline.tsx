'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { experience, profile } from '@/content/profile';
import { experienceTools } from '@/content/experience-tools';

type Experience = (typeof experience)[number];

const number = (value: number) => String(value).padStart(2, '0');
const year = (period: string) => period.match(/\d{4}/)?.[0] ?? period;

function ExperienceContent({ item, index }: { item: Experience; index: number }) {
  const tools = experienceTools[item.role] ?? [];
  const isCurrent = item.period.includes('Presente');

  return (
    <article className="scroll-experience-content">
      <div className="scroll-experience-role">
        <p className="scroll-experience-overline">{number(index + 1)} / {item.company}</p>
        <h3>{item.role}</h3>
        <div className="scroll-experience-meta">
          <span>{item.period}</span>
          <span>{profile.location}</span>
          {isCurrent ? <span className="scroll-experience-current-badge">Actual</span> : null}
        </div>
        <p className="scroll-experience-description">{item.bullets[0]}</p>
        {'highlight' in item && item.highlight ? <p className="scroll-experience-highlight">{item.highlight}</p> : null}
      </div>

      <div className="scroll-experience-skills">
        <p className="scroll-experience-overline">Habilidades y contribuciones</p>
        <ul>
          {item.bullets.slice(1).map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        {tools.length > 0 ? (
          <div className="scroll-experience-tools" aria-label="Herramientas y capacidades">
            {tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ScrollExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let frame = 0;
    let currentIndex = 0;
    let headerHeight = 0;
    let distance = 1;
    const desktop = window.matchMedia('(min-width: 901px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)');
    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const traveled = headerHeight - section.getBoundingClientRect().top - section.clientTop;
      const pin = traveled < 0 ? 'before' : traveled > distance ? 'after' : 'active';
      if (sticky.dataset.pin !== pin) sticky.dataset.pin = pin;
      const progress = Math.max(0, Math.min(1, traveled / distance));
      const lineProgress = Math.min(1, progress * experience.length / Math.max(1, experience.length - 1));

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${lineProgress})`;

      let nextIndex = Math.min(experience.length - 1, Math.floor(progress * experience.length));
      const boundaryOffset = 8 / distance;
      if (nextIndex === currentIndex + 1 && progress < nextIndex / experience.length + boundaryOffset) {
        nextIndex = currentIndex;
      } else if (nextIndex === currentIndex - 1 && progress > currentIndex / experience.length - boundaryOffset) {
        nextIndex = currentIndex;
      }
      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      if (!desktop.matches) {
        delete sticky.dataset.pin;
        return;
      }
      headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;
      const bounds = section.getBoundingClientRect();
      sticky.style.setProperty('--timeline-left', `${bounds.left + section.clientLeft}px`);
      sticky.style.setProperty('--timeline-width', `${section.clientWidth}px`);
      distance = Math.max(1, section.clientHeight - sticky.offsetHeight);
      schedule();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    desktop.addEventListener('change', measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      desktop.removeEventListener('change', measure);
    };
  }, []);

  const jumpTo = useCallback((index: number) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;
    const distance = Math.max(1, section.clientHeight - sticky.offsetHeight);
    const start = window.scrollY + section.getBoundingClientRect().top + section.clientTop - headerHeight;
    window.scrollTo({
      top: start + distance * index / experience.length + (index > 0 ? 16 : 0),
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="scroll-experience"
      aria-label="Trayectoria profesional"
      style={{
        '--experience-scroll-height': `${(experience.length + 1) * 100}svh`,
        '--experience-count': experience.length,
        '--experience-line-inset': `${50 / experience.length}%`,
      } as CSSProperties}
    >
      <div ref={stickyRef} className="scroll-experience-sticky">
        <div className="scroll-experience-heading">
          <div>
            <p className="scroll-experience-eyebrow">Experiencia</p>
            <h2>Trayectoria</h2>
            <p className="scroll-experience-subtitle">Roles en operación, liderazgo y soporte contable.</p>
          </div>
          <div className="scroll-experience-counter" aria-label={`Experiencia ${activeIndex + 1} de ${experience.length}`}>
            <strong>{number(activeIndex + 1)}</strong><span>/ {number(experience.length)}</span>
          </div>
        </div>

        <div className="scroll-experience-track" aria-label="Etapas de la trayectoria profesional">
          <div className="scroll-experience-line" aria-hidden="true"><span ref={progressRef} /></div>
          <ol>
            {experience.map((item, index) => (
              <li key={`${item.company}-${item.role}`}>
                <button
                  type="button"
                  className={index === activeIndex ? 'is-active' : index < activeIndex ? 'is-complete' : ''}
                  aria-current={index === activeIndex ? 'step' : undefined}
                  aria-label={`Ir a la experiencia ${index + 1}: ${item.role} en ${item.company}`}
                  onClick={() => jumpTo(index)}
                >
                  <span className="scroll-experience-year">{year(item.period)}</span>
                  <span className="scroll-experience-node" aria-hidden="true" />
                  <span className="scroll-experience-company">{item.company}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="scroll-experience-current" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : .24, ease: 'easeOut' }}
            >
              <ExperienceContent item={experience[activeIndex]} index={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="scroll-experience-mobile">
        <div className="scroll-experience-mobile-heading">
          <p className="scroll-experience-eyebrow">Experiencia</p>
          <h2>Trayectoria</h2>
          <p>Roles en operación, liderazgo y soporte contable.</p>
        </div>
        <ol>
          {experience.map((item, index) => (
            <li key={`${item.company}-${item.role}`}>
              <div className="scroll-experience-mobile-marker"><span>{number(index + 1)} / {number(experience.length)}</span><b>{year(item.period)}</b></div>
              <ExperienceContent item={item} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
