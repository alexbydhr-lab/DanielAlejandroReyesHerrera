import { ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { TimelineItem } from '@/components/timeline-item';
import { Hero } from '@/components/hero';
import { AccountingTerminal } from '@/components/accounting-terminal';
import { SkillsMarquee } from '@/components/skills-marquee';
import {
  services,
  experience,
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
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M3.5 7.5 12 3l8.5 4.5V17L12 21l-8.5-4Z" />
      <path d="M12 3v18M3.5 7.5 12 12l8.5-4.5" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11Z" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M4 9h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
      <path d="M9 12h6" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 20c1.8-3.3 5-5 8-5s6.2 1.7 8 5" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M12 20s-6.5-4.4-8.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 8.5 6.6C18.5 15.6 12 20 12 20Z" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
      <path d="M4 7V6a2 2 0 0 1 2-2h10" />
      <path d="M16 13h4" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />

      <Container id="lo-que-hago" className="space-y-10">
        <div className="services-intro">
          <SectionTitle
            eyebrow="Lo que hago"
            title="Apoyo contable y operativo con orden y claridad"
            subtitle="Combino registro contable, análisis financiero y gestión operativa para mantener la información clara y accionable."
          />
          <AccountingTerminal />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group flex flex-col gap-3"
              interactive
            >
              <div className="text-[--accent] transition-colors group-hover:text-white">{iconMap[service.icon]}</div>
              <p className="text-base font-semibold text-[--foreground] transition-colors group-hover:text-white">
                {service.title}
              </p>
              <p className="text-sm text-[--muted] transition-colors group-hover:text-white/80">{service.description}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container id="impacto" className="space-y-8">
        <SectionTitle
          eyebrow="Áreas de impacto"
          title="Cómo puedo ayudarte"
          subtitle="Soporte contable, operativo y de comunicación para que la información fluya."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impactAreas.map((area) => (
            <Card
              key={area.title}
              className="group space-y-2"
              interactive
            >
              <div className="flex items-center gap-3 text-lg">
                <span className="text-[--accent] transition-colors group-hover:text-white">{iconMap[area.icon]}</span>
                <p className="text-base font-semibold text-[--foreground] transition-colors group-hover:text-white">
                  {area.title}
                </p>
              </div>
              <p className="text-sm text-[--muted] transition-colors group-hover:text-white/80">{area.description}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container id="experiencia" className="space-y-8">
        <SectionTitle eyebrow="Experiencia" title="Trayectoria" subtitle="Roles en operación, liderazgo y soporte contable." />
        <div className="portfolio-panel rounded-[28px] p-6 space-y-6">
          {experience.map((exp, idx) => (
            <TimelineItem
              key={exp.role + exp.company}
              title={exp.role}
              subtitle={exp.company}
              period={exp.period}
              highlight={exp.highlight}
              first={idx === 0}
              last={idx === experience.length - 1}
            >
              <ul className="space-y-1">
                {exp.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </div>
      </Container>

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
        <div className="portfolio-panel relative overflow-hidden rounded-[28px] p-8 text-white shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Contacto</p>
              <h3 className="text-2xl font-bold">{ctaFinal.title}</h3>
              <p className="text-sm text-white/80">{ctaFinal.text}</p>
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
