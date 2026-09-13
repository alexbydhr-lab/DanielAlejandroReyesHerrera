import Link from 'next/link';
import { contactInfo, profile } from '@/content/profile';
import Text3DFlip from '@/registry/magicui/text-3d-flip';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="portfolio-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="portfolio-brand footer-brand">
            <span className="brand-mark" aria-hidden="true"><i /></span>
            <span><b>DANIEL</b> <strong>REYES</strong></span>
          </Link>
          <p>Contabilidad, operación y análisis financiero con enfoque práctico.</p>
        </div>
        <div>
          <span className="footer-kicker">Navegación</span>
          <Link href="/sobre-mi">Sobre mí</Link>
          <Link href="/#experiencia">Experiencia</Link>
          <Link href="/cv">Currículum</Link>
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
        transition={{ type: 'spring', damping: 25, stiffness: 160 }}
      >
        DANIEL REYES
      </Text3DFlip>
      <div className="footer-bottom"><span>© {year} {profile.name}</span><span>Disponible para oportunidades profesionales</span></div>
    </footer>
  );
};
