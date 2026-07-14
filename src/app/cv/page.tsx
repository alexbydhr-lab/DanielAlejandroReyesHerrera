import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { education, experience, profile, skills } from '@/content/profile';
import type { Metadata } from 'next';
import { BeforeAfterComparison, InteractiveResume } from '@/components/interactive-resume';
import { SkillsMarquee } from '@/components/skills-marquee';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'CV interactivo',
  description: 'Currículum interactivo de Daniel Reyes: experiencia contable y operativa, formación, habilidades y CV disponible para descargar.',
  path: '/cv',
});

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

      <Container><InteractiveResume experiences={experience} /></Container>

      <Container><BeforeAfterComparison /></Container>

      <Container className="space-y-6">
        <SectionTitle title="Habilidades" />
        <SkillsMarquee skills={skills} />
      </Container>
    </div>
  );
}
