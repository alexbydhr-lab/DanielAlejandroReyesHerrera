'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(1);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 72%', 'end 42%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .5 });

  const focusRole = (index: number) => {
    setSelected(index);
    document.getElementById(`resume-role-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="resume-experience" aria-labelledby="resume-experience-title">
      <div className="resume-heading">
        <div><p className="section-kicker">Trayectoria interactiva</p><h2 id="resume-experience-title">Experiencia que evoluciona con cada rol.</h2></div>
        <p>Recorre la línea temporal y selecciona una etapa para consultar responsabilidades, logros y herramientas utilizadas.</p>
      </div>

      <div ref={timelineRef} className="resume-layout">
        <aside className="resume-years" aria-label="Periodos de experiencia">
          <span>PERIODO</span>
          {experiences.map((experience, index) => (
            <button key={`${experience.role}-${experience.period}`} type="button" className={selected === index ? 'active' : ''} onClick={() => focusRole(index)}>
              <strong>{extractYear(experience.period)}</strong><small>{String(index + 1).padStart(2, '0')}</small>
            </button>
          ))}
        </aside>

        <div className="resume-timeline">
          <div className="resume-line" aria-hidden="true"><motion.i style={{ scaleY: progress }} /></div>
          {experiences.map((experience, index) => {
            const active = selected === index;
            return (
              <article
                id={`resume-role-${index}`}
                key={`${experience.role}-${experience.company}`}
                className={`resume-role-card ${active ? 'is-active' : ''}`}
                onClick={() => setSelected(index)}
              >
                <button type="button" aria-expanded={active} aria-controls={`resume-details-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><small>{experience.period}</small><h3>{experience.role}</h3><p>{experience.company}</p></div>
                  <i aria-hidden="true">{active ? '−' : '+'}</i>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      id={`resume-details-${index}`}
                      className="resume-role-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .45, ease: [0.2, .8, .2, 1] }}
                    >
                      <div className="resume-achievements">
                        <span>RESPONSABILIDADES / LOGROS</span>
                        <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                        {experience.highlight && <blockquote>{experience.highlight}</blockquote>}
                      </div>
                      <div className="resume-toolkit">
                        <span>HERRAMIENTAS / CAPACIDADES</span>
                        <div>{(roleTools[experience.role] ?? []).map((tool) => <b key={tool}>{tool}</b>)}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
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
