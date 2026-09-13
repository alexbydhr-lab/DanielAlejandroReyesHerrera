import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { contactInfo, faq, profile } from '@/content/profile';
import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto',
  description: 'Contacta a Daniel Reyes para oportunidades profesionales, colaboración o apoyo en contabilidad, análisis y operación.',
  path: '/contacto',
});

export default function ContactoPage() {
  return (
    <div className="space-y-14 pb-16">
      <section className="border-b border-[--line] bg-transparent">
        <Container className="space-y-4 py-10">
          <SectionTitle title="Contacto" subtitle="¿Necesitas apoyo contable u operativo? Escríbeme." />
        </Container>
      </section>

      <Container className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <Card className="space-y-3" interactive>
          <p className="text-base font-semibold text-[--foreground]">Datos de contacto</p>
          <div className="space-y-2 text-sm text-[--muted]">
            <p>
              <span className="font-semibold text-[--foreground]">Email: </span>
              <a href={`mailto:${contactInfo.email}`} className="text-[--accent]">
                {contactInfo.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-[--foreground]">Teléfono: </span>
              <a href={`tel:${contactInfo.phone}`} className="text-[--accent]">
                {contactInfo.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold text-[--foreground]">Ubicación: </span>
              Durango, Dgo.
            </p>
            <p>
              <span className="font-semibold text-[--foreground]">Disponibilidad: </span>
              {contactInfo.availability}
            </p>
          </div>
        </Card>

        <Card className="space-y-4" interactive>
          <p className="text-base font-semibold text-[--foreground]">Escríbeme</p>
          <ContactForm />
        </Card>
      </Container>

      <Container className="space-y-6">
        <SectionTitle title="Preguntas frecuentes" />
        <div className="grid gap-4 md:grid-cols-3">
          {faq.map((item) => (
            <Card key={item.question} className="space-y-2" interactive>
              <p className="text-sm font-semibold text-[--foreground]">{item.question}</p>
              <p className="text-sm text-[--muted]">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
