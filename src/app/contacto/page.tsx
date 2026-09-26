import { Container } from '@/components/ui/container';
import './contacto.css';
import { contactInfo, faq } from '@/content/profile';
import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto',
  description: 'Contacta a Daniel Reyes para oportunidades profesionales, colaboración o apoyo en contabilidad, análisis y operación.',
  path: '/contacto',
});

type ContactIconName = 'email' | 'phone' | 'location' | 'arrow';

function ContactIcon({ name }: { name: ContactIconName }) {
  const paths: Record<ContactIconName, React.ReactNode> = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M7.2 3.4 9.4 8l-2.1 1.8c1.1 2.5 2.9 4.3 5.4 5.4l1.8-2.1 4.6 2.2-.8 4c-.2 1-1.1 1.7-2.1 1.7C8.9 20.5 3.5 15.1 3 7.8c-.1-1 .6-1.9 1.6-2.1l2.6-.5Z" />,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
  };

  return <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function ContactoPage() {
  const contactMethods = [
    { label: 'Correo', value: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: 'email' as const },
    { label: 'Teléfono', value: contactInfo.phone, href: `tel:${contactInfo.phone}`, icon: 'phone' as const },
    { label: 'Ubicación', value: contactInfo.location, icon: 'location' as const },
  ];

  return (
    <div className="contact-page pb-20">
      <section className="contact-hero">
        <Container className="contact-hero-layout">
          <div className="contact-hero-copy">
            <p className="section-kicker">Contacto / Canal abierto</p>
            <h1>
              Hablemos de lo que necesitas <span>poner en orden.</span>
            </h1>
            <p>
              Si buscas apoyo contable, financiero u operativo, cuéntame el contexto. Podemos convertirlo en información clara y un siguiente paso concreto.
            </p>
          </div>

          <div className="contact-signal" aria-hidden="true">
            <div className="contact-signal-orbit orbit-a" />
            <div className="contact-signal-orbit orbit-b" />
            <span className="contact-signal-node node-a" />
            <span className="contact-signal-node node-b" />
            <div className="contact-signal-card">
              <span><i /> DISPONIBLE PARA COLABORAR</span>
              <strong>Canal directo</strong>
              <small>Durango, México · Horario flexible</small>
              <b>DR / CONTACT_01</b>
            </div>
          </div>
        </Container>
      </section>

      <Container className="contact-workspace">
        <aside className="contact-directory" aria-labelledby="contact-methods-title">
          <div className="contact-panel-heading">
            <span>01 / DATOS</span>
            <h2 id="contact-methods-title">Elige cómo contactarme</h2>
            <p>Usa el medio que te resulte más cómodo. El correo abre un mensaje directo y el formulario te ayuda a estructurarlo.</p>
          </div>

          <div className="contact-methods">
            {contactMethods.map((method) => {
              const content = (
                <>
                  <span className="contact-method-icon"><ContactIcon name={method.icon} /></span>
                  <span>
                    <small>{method.label}</small>
                    <strong>{method.value}</strong>
                  </span>
                  {method.href && <span className="contact-method-arrow"><ContactIcon name="arrow" /></span>}
                </>
              );

              return method.href ? (
                <a key={method.label} className="contact-method" href={method.href}>{content}</a>
              ) : (
                <div key={method.label} className="contact-method">{content}</div>
              );
            })}
          </div>

          <div className="contact-availability">
            <span className="contact-availability-pulse" />
            <div>
              <small>Disponibilidad actual</small>
              <strong>{contactInfo.availability}</strong>
            </div>
          </div>
        </aside>

        <section className="contact-form-panel" aria-labelledby="contact-form-title">
          <div className="contact-panel-heading">
            <span>02 / MENSAJE</span>
            <h2 id="contact-form-title">Cuéntame sobre tu proyecto</h2>
            <p>Con unas líneas es suficiente para empezar. El mensaje se preparará en tu aplicación de correo.</p>
          </div>
          <ContactForm />
        </section>
      </Container>

      <Container className="contact-faq-section">
        <div className="contact-faq-heading">
          <div>
            <p className="section-kicker">Antes de escribir</p>
            <h2>Preguntas frecuentes</h2>
          </div>
          <p>Información rápida sobre el tipo de colaboración y la forma de contacto.</p>
        </div>
        <div className="contact-faq-grid">
          {faq.map((item, index) => (
            <article key={item.question} className="contact-faq-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
