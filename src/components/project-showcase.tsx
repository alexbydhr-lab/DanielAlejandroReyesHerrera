'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type ProjectStage = {
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const ProjectShowcase = ({ stages }: { stages: ProjectStage[] }) => {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section className="project-showcase" aria-labelledby="project-title">
      <div className="project-showcase-head">
        <div>
          <p className="section-kicker">Caso de estudio · 2025</p>
          <h2 id="project-title">FEUD: tecnología con impacto universitario.</h2>
        </div>
        <p>
          Un proyecto digital de gran escala construido en equipo: diseño,
          desarrollo, automatización y gestión de contenido para resolver una
          necesidad real de la comunidad estudiantil.
        </p>
      </div>

      <div className="project-metrics" aria-label="Resultados del proyecto">
        <div><strong>5,000+</strong><span>trámites digitales</span></div>
        <div><strong>2025</strong><span>año de desarrollo</span></div>
        <div><strong>03</strong><span>capas del proyecto</span></div>
        <div><strong>LIVE</strong><span>producto publicado</span></div>
      </div>

      <div className="project-workspace">
        <div className="project-stage-nav" role="tablist" aria-label="Etapas del proyecto FEUD">
          {stages.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="project-stage-panel"
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{item.shortTitle}</strong><small>{item.title}</small></div>
              <i aria-hidden="true">→</i>
            </button>
          ))}
        </div>

        <div className="project-browser">
          <div className="browser-bar" aria-hidden="true">
            <div><i /><i /><i /></div>
            <span>feud.com.mx</span>
            <b>↗</b>
          </div>
          <div className="browser-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.image}
                initial={{ opacity: 0, scale: 1.025, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: .985, y: -10 }}
                transition={{ duration: .48, ease: [0.2, .8, .2, 1] }}
                className="browser-image"
              >
                <Image src={stage.image} alt={stage.imageAlt} fill sizes="(max-width: 900px) 100vw, 760px" />
              </motion.div>
            </AnimatePresence>
            <div className="browser-scan" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div id="project-stage-panel" className="project-stage-copy" role="tabpanel">
        <div><span>ETAPA / {String(active + 1).padStart(2, '0')}</span><strong>{stage.title}</strong></div>
        <AnimatePresence mode="wait">
          <motion.p
            key={stage.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .34 }}
          >
            {stage.description}
          </motion.p>
        </AnimatePresence>
        <a href="https://www.feud.com.mx" target="_blank" rel="noreferrer">
          Visitar proyecto <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};
