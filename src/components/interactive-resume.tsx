'use client';

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  highlight?: string;
};

const roleTools: Record<string, string[]> = {
  'Mesero y preparación de bebidas': ['Caja', 'Inventarios', 'Servicio al cliente'],
  Gerente: ['Excel', 'Cierres de caja', 'Capacitación', 'Control operativo'],
  'Auxiliar contable': ['CONTPAQi', 'SAT', 'CFDI', 'Nóminas'],
  Promotor: ['Venta directa', 'Comunicación', 'Cierre comercial'],
};

const extractYear = (period: string) => period.match(/\d{4}/)?.[0] ?? period;

export const InteractiveResume = ({ experiences }: { experiences: ExperienceItem[] }) => {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateHeight = () => setHeight(timeline.getBoundingClientRect().height);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(timeline);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 12%', 'end 52%'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 78, damping: 25, mass: .42 });
  const lineHeight = useTransform(smoothProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(smoothProgress, [0, 0.08], [0, 1]);

  return (
    <section ref={containerRef} className="resume-experience" aria-labelledby="resume-experience-title">
      <div className="resume-heading">
        <div><p className="section-kicker">Trayectoria interactiva</p><h2 id="resume-experience-title">Experiencia que evoluciona con cada rol.</h2></div>
        <p>La línea se activa a medida que avanzas. Selecciona cada etapa para descubrir responsabilidades, logros y herramientas utilizadas.</p>
      </div>

      <div className="journey-timeline">
        <div ref={timelineRef} className="journey-measure">
          {experiences.map((experience, index) => {
              const active = selected === index;
              return (
                <div
                  id={`resume-role-${index}`}
                  key={`${experience.role}-${experience.company}`}
                  className="journey-entry"
                >
                  <div className="journey-year">
                    <div className={`journey-node ${active ? 'is-active' : ''}`} aria-hidden="true"><i /></div>
                    <h3>{extractYear(experience.period)}</h3>
                    <small>{experience.period}</small>
                  </div>

                  <div className="journey-content">
                    <div className="journey-mobile-period" aria-hidden="true">
                      <strong>{extractYear(experience.period)}</strong><span>{experience.period}</span>
                    </div>
                    <motion.article
                      className={`journey-card ${active ? 'is-active' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.24 }}
                      transition={{ duration: .58, delay: index * .04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        type="button"
                        className="journey-card-trigger"
                        aria-expanded={active}
                        aria-controls={`resume-details-${index}`}
                        onClick={() => setSelected(active ? -1 : index)}
                      >
                        <span className="journey-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="journey-role-copy">
                          <small>{experience.company}</small>
                          <strong>{experience.role}</strong>
                          <em>{experience.bullets[0]}</em>
                        </span>
                        <span className="journey-toggle" aria-hidden="true">{active ? '−' : '+'}</span>
                      </button>

                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.div
                            id={`resume-details-${index}`}
                            className="journey-details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: .5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="journey-achievements">
                              <span>RESPONSABILIDADES / LOGROS</span>
                              <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                              {experience.highlight && <blockquote>{experience.highlight}</blockquote>}
                            </div>
                            <div className="journey-toolkit">
                              <span>HERRAMIENTAS / CAPACIDADES</span>
                              <div>{(roleTools[experience.role] ?? []).map((tool) => <b key={tool}>{tool}</b>)}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  </div>
                </div>
              );
            })}

          <div style={{ height }} className="journey-line" aria-hidden="true">
            <motion.i style={{ height: lineHeight, opacity: lineOpacity }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const BeforeAfterComparison = () => {
  const [position, setPosition] = useState(52);
  return (
    <section className="process-comparison" aria-labelledby="comparison-title">
      <div className="comparison-heading">
        <div><p className="section-kicker">Antes / después</p><h2 id="comparison-title">De información dispersa a decisiones claras.</h2></div>
        <p>Arrastra el control para comparar un proceso sin estructura frente a una operación organizada y medible.</p>
      </div>
      <div className="comparison-shell">
        <div className="comparison-scene comparison-after">
          <div className="comparison-label"><span>DESPUÉS</span><strong>Control estructurado</strong></div>
          <div className="clean-dashboard" aria-hidden="true">
            <div><span>CONCILIACIÓN</span><b>100%</b><i /></div>
            <div><span>INVENTARIO</span><b>ACTIVO</b><i /></div>
            <div><span>REPORTE</span><b>LISTO</b><i /></div>
          </div>
          <ul><li>Registros conciliados</li><li>Variaciones identificadas</li><li>Reporte listo para decidir</li></ul>
        </div>
        <div className="comparison-scene comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <div className="comparison-label"><span>ANTES</span><strong>Información dispersa</strong></div>
          <div className="messy-documents" aria-hidden="true"><i /><i /><i /><i /></div>
          <ul><li>Archivos sin conciliar</li><li>Inventario sin seguimiento</li><li>Decisiones con información tardía</li></ul>
        </div>
        <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span>↔</span></div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Comparar proceso antes y después"
        />
      </div>
    </section>
  );
};
