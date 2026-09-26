import Link from 'next/link';
import { contactInfo, profile } from '@/content/profile';
import Text3DFlip from '@/registry/magicui/text-3d-flip';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="portfolio-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" prefetch={false} className="portfolio-brand footer-brand">
            <span><b>DANIEL</b> <strong>REYES</strong></span>
          </Link>
          <p>Contabilidad, operación y análisis financiero con enfoque práctico.</p>
        </div>
        <div>
          <span className="footer-kicker">Navegación</span>
          <Link href="/sobre-mi" prefetch={false}>Sobre mí</Link>
          <Link href="/#experiencia" prefetch={false}>Experiencia</Link>
          <Link href="/cv" prefetch={false}>Currículum</Link>
        </div>
        <div>
          <span className="footer-kicker">Contacto</span>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          <span>{contactInfo.location}</span>
        </div>
      </div>
      <Text3DFlip
        className="footer-signature"
        textClassName="footer-flip-front"
        flipTextClassName="footer-flip-back"
        rotateDirection="top"
        staggerDuration={0.03}
        staggerFrom="first"
      >
        DANIEL REYES
      </Text3DFlip>
      <div className="footer-bottom"><span>© {year} {profile.name}</span><span>Disponible para oportunidades profesionales</span></div>
    </footer>
  );
};
