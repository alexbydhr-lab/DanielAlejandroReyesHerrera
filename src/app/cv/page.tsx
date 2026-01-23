import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { education, experience, profile, skills } from '@/content/profile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `CV | ${profile.name}`,
  description: 'Resumen de CV listo para descargar.',
};

export default function CvPage() {
  return (
    <div className="space-y-12 pb-16">
      <Container className="space-y-3 py-10">
        <SectionTitle title="CV" subtitle="Resumen visual de mi experiencia y formación." />
        <Button href="/cv.pdf" variant="primary" className="w-fit">
          Descargar PDF
        </Button>
      </Container>

      <Container className="grid gap-6 lg:grid-cols-[1fr,0.6fr]">
        <Card className="space-y-3" interactive>
          <p className="text-lg font-bold text-[--foreground]">{profile.name}</p>
          <p className="text-sm text-[--muted]">{profile.role}</p>
          <p className="text-sm text-[--muted]">{profile.location}</p>
          <p className="text-sm text-[--muted]">{profile.email} · {profile.phone}</p>
          <p className="text-sm text-[--muted]">{profile.subheadline}</p>
        </Card>

        <Card className="space-y-2" interactive>
          <p className="text-base font-semibold text-[--foreground]">Formación</p>
          <p className="text-sm text-[--muted]">{education.school}</p>
          <p className="text-sm text-[--muted]">{education.period}</p>
          <p className="text-sm text-[--muted]">{education.detail}</p>
        </Card>
      </Container>

      <Container className="space-y-6">
        <SectionTitle title="Experiencia" />
        <div className="grid gap-4">
          {experience.map((exp) => (
            <Card key={exp.role + exp.company} className="space-y-2" interactive>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[--foreground]">{exp.role}</p>
                <span className="text-sm text-[--muted]">· {exp.company}</span>
              </div>
              <p className="text-xs text-[--muted]">{exp.period}</p>
              <ul className="space-y-1 text-sm text-[--muted]">
                {exp.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="space-y-6">
        <SectionTitle title="Habilidades" />
        <Card className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full bg-[--surface] px-3 py-1 text-sm font-semibold text-[--foreground]">
              {skill}
            </span>
          ))}
        </Card>
      </Container>
    </div>
  );
}
