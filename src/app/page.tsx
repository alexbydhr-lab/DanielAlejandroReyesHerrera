import { ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { ScrollExperienceTimeline } from '@/components/scroll-experience-timeline';
import '@/components/scroll-experience-timeline.css';
import { Hero } from '@/components/hero';
import { SkillsMarquee } from '@/components/skills-marquee';
import { ServiceGrid } from '@/components/service-grid';
import {
  skills,
  tools,
  languages,
  ctaFinal,
  education,
  educationHistory,
  certifications,
  impactAreas,
} from '@/content/profile';

const iconMap: Record<string, ReactNode> = {
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M4 19h16" />
      <path d="M7 17V9M12 17V5M17 17v-7" />
    </svg>
  ),
  process: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <rect x="2.5" y="9" width="5" height="5" rx="1" />
      <rect x="9.5" y="9" width="5" height="5" rx="1" />
      <rect x="16.5" y="9" width="5" height="5" rx="1" />
      <path d="M7.5 11.5h2M14.5 11.5h2" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M3 5h7v5H3zM14 14h7v5h-7zM10 7.5h4a3 3 0 0 1 3 3V14" />
      <path d="m14 11 3 3 3-3" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />

      <Container id="lo-que-hago" className="space-y-10">
        <SectionTitle
          eyebrow="Lo que hago"
          title="Apoyo contable y operativo con orden y claridad"
          subtitle="Combino registro contable, análisis financiero y automatización para convertir información dispersa en procesos claros y accionables."
        />
        <ServiceGrid />
      </Container>

      <Container id="impacto" className="space-y-8">
        <SectionTitle
          eyebrow="Áreas de impacto"
          title="Cómo puedo ayudarte"
          subtitle="Aplico herramientas contables, análisis de datos y mejora de procesos para convertir información dispersa en datos claros, útiles y fáciles de controlar."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impactAreas.map((area) => (
            <Card
              key={area.title}
              className="group space-y-2"
              interactive
            >
              <div className="flex items-center gap-3 text-lg">
                <span className="text-[--accent] transition-colors group-hover:text-[var(--heading)]">{iconMap[area.icon]}</span>
                <h3 className="text-base font-semibold text-[--foreground] transition-colors group-hover:text-[var(--heading)]">
                  {area.title}
                </h3>
              </div>
              <p className="text-sm text-[--muted] transition-colors group-hover:text-[var(--muted-strong)]">{area.description}</p>
            </Card>
          ))}
        </div>
      </Container>

      <ScrollExperienceTimeline />

      <Container id="habilidades" className="space-y-10">
        <SectionTitle eyebrow="Habilidades" title="Fortalezas" subtitle="Habilidades blandas y técnicas." />
        <SkillsMarquee skills={skills} />
      </Container>

      <Container id="herramientas" className="space-y-10">
        <SectionTitle eyebrow="Herramientas" title="Áreas y herramientas" subtitle="Niveles aproximados, en constante mejora." />
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <Card key={tool.name} className="space-y-3" interactive>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[--foreground]">{tool.name}</p>
                <span className="rounded-full bg-[--accent] px-3 py-1 text-xs font-semibold text-white">{tool.level}</span>
              </div>
              <p className="text-sm text-[--muted]">{tool.detail}</p>
              <div className="h-2 w-full rounded-full bg-[--surface]">
                <div
                  className="h-full rounded-full bg-[--accent]"
                  style={{ width: tool.level === 'Alto' ? '85%' : tool.level === 'Medio-alto' ? '70%' : '50%' }}
                />
              </div>
            </Card>
          ))}
        </div>
      </Container>

      <Container id="idiomas" className="space-y-8">
        <SectionTitle eyebrow="Idiomas" title="Comunicación" />
        <div className="grid gap-4 sm:grid-cols-3">
          {languages.map((lang) => (
            <Card key={lang.name} className="space-y-2" interactive>
              <p className="text-sm font-semibold text-[--foreground]">{lang.name}</p>
              <p className="text-sm text-[--muted]">{lang.level}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="space-y-6">
        <div className="portfolio-panel relative overflow-hidden rounded-[28px] p-8 text-[var(--foreground)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Contacto</p>
              <h3 className="text-2xl font-bold">{ctaFinal.title}</h3>
              <p className="text-sm text-[var(--muted)]">{ctaFinal.text}</p>
            </div>
            <Button
              href={ctaFinal.href}
              variant="primary"
            >
              {ctaFinal.button}
            </Button>
          </div>
        </div>

        <div className="portfolio-panel rounded-[24px] p-6 space-y-4">
          <SectionTitle
            eyebrow="Formación"
            title={education.school}
            subtitle={`${education.period} · ${education.detail}`}
            className="space-y-1"
          />
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-[--foreground] sm:text-4xl">{educationHistory[1]?.school}</h3>
            <p className="text-sm text-[--muted]">
              {educationHistory[1]?.period} · {educationHistory[1]?.detail}
            </p>
          </div>
        </div>

        <div className="portfolio-panel rounded-[24px] p-6 space-y-4">
          <SectionTitle
            eyebrow="Cursos y certificaciones"
            title={certifications[0]?.school}
            subtitle={`${certifications[0]?.period} · ${certifications[0]?.detail}`}
            className="space-y-1"
          />
          <Button href={certifications[0]?.href} variant="primary" className="w-fit">
            {certifications[0]?.button}
          </Button>
        </div>
      </Container>
    </div>
  );
}
