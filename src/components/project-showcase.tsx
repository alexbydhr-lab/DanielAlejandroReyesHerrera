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

type ProjectMetric = {
  value: string;
  label: string;
};

type ProjectShowcaseProps = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  metrics: ProjectMetric[];
  browserLabel: string;
  projectUrl: string;
  stages: ProjectStage[];
};

export const ProjectShowcase = ({
  slug,
  eyebrow,
  title,
  summary,
  metrics,
  browserLabel,
  projectUrl,
  stages,
}: ProjectShowcaseProps) => {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const titleId = `project-${slug}-title`;
  const panelId = `project-${slug}-stage-panel`;

  return (
    <section className="project-showcase" aria-labelledby={titleId}>
      <div className="project-showcase-head">
        <div>
          <p className="section-kicker">{eyebrow}</p>
          <h2 id={titleId}>{title}</h2>
        </div>
        <p>{summary}</p>
      </div>

      <div className="project-metrics" aria-label="Resultados del proyecto">
        {metrics.map((metric) => (
          <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>
        ))}
      </div>

      <div className="project-workspace">
        <div className="project-stage-nav" role="tablist" aria-label={`Etapas del proyecto ${title}`}>
          {stages.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={panelId}
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
            <span>{browserLabel}</span>
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

      <div id={panelId} className="project-stage-copy" role="tabpanel">
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
        <a href={projectUrl} target="_blank" rel="noreferrer">
          Visitar proyecto <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};
