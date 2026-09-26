import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { profile, heroImage, experience } from '@/content/profile';

export const Hero = () => (
  <section className="portfolio-hero">
    <div className="hero-copy">
      <p className="tech-kicker">Perfil profesional · Durango, México</p>
      <h1>
        Orden para los datos.<br />
        Claridad para <span>decidir.</span>
      </h1>
      <p className="hero-role">{profile.role}</p>
      <p className="hero-description">{profile.subheadline}</p>
      <div className="hero-actions">
        <Button href="/contacto">Hablemos <span aria-hidden="true">→</span></Button>
        <Button href="#experiencia" variant="secondary">Ver experiencia</Button>
      </div>
      <div className="hero-metrics">
        <div><strong>{String(experience.length).padStart(2, '0')}</strong><span>roles profesionales</span></div>
        <div><strong>C1</strong><span>nivel de inglés</span></div>
        <div><strong>9º</strong><span>semestre FECA</span></div>
      </div>
    </div>

    <div className="portrait-stage">
      <div className="portrait-system">
        <div className="portrait-frame">
          <Image src={heroImage} alt={`Retrato de ${profile.name}`} fill sizes="(max-width: 850px) 76vw, 520px" className="portrait-image" priority />
        </div>
      </div>
      <div className="availability-chip"><i /> {profile.availability}</div>
    </div>
  </section>
);
