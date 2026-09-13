'use client';

import { useState } from 'react';
import { Marquee } from '@/registry/magicui/marquee';

const getCategory = (skill: string) => {
  if (/contable|financier|inventario/i.test(skill)) return 'Técnica / financiera';
  if (/Adobe|web/i.test(skill)) return 'Herramienta digital';
  if (/liderazgo|equipo|comunicación/i.test(skill)) return 'Colaboración';
  return 'Capacidad profesional';
};

export const SkillsMarquee = ({ skills }: { skills: string[] }) => {
  const [hovered, setHovered] = useState<{ skill: string; row: 'a' | 'b' } | null>(null);
  const midpoint = Math.ceil(skills.length / 2);
  // Marquee creates the second copy required for the infinite loop.
  // Keeping only one source set here prevents repeated cards from receiving
  // the focus treatment at the same time.
  const firstRow = skills.slice(0, midpoint);
  const secondRow = skills.slice(midpoint);

  const renderCard = (skill: string, index: number, row: 'a' | 'b') => (
    <article
      key={`${row}-${skill}-${index}`}
      className={`skill-marquee-card ${hovered?.skill === skill && hovered.row === row ? 'is-focused' : hovered?.row === row ? 'is-muted' : ''}`}
      tabIndex={0}
      onMouseEnter={() => setHovered({ skill, row })}
      onFocus={() => setHovered({ skill, row })}
      onBlur={() => setHovered(null)}
    >
      <div><span>{String((skills.indexOf(skill) + 1)).padStart(2, '0')}</span><i /></div>
      <small>{getCategory(skill)}</small>
      <strong>{skill}</strong>
      <b>CAPACIDAD <span aria-hidden="true">↗</span></b>
    </article>
  );

  return (
    <div className="skills-marquee-shell" onMouseLeave={() => setHovered(null)}>
      <Marquee pauseOnHover className={`skills-marquee-row marquee-row-one ${hovered?.row === 'a' ? 'row-is-focused' : ''}`}>
        {firstRow.map((skill, index) => renderCard(skill, index, 'a'))}
      </Marquee>
      <Marquee reverse pauseOnHover className={`skills-marquee-row marquee-row-two ${hovered?.row === 'b' ? 'row-is-focused' : ''}`}>
        {secondRow.map((skill, index) => renderCard(skill, index, 'b'))}
      </Marquee>
      <div className="marquee-fade marquee-fade-left" aria-hidden="true" />
      <div className="marquee-fade marquee-fade-right" aria-hidden="true" />
    </div>
  );
};
