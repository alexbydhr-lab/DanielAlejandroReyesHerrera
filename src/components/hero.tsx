import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { profile, heroImage } from '@/content/profile';

export const Hero = () => (
  <section className="portfolio-hero">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-stars" aria-hidden="true"><i /><i /><i /></div>
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
        <div><strong>04</strong><span>roles profesionales</span></div>
        <div><strong>C1</strong><span>nivel de inglés</span></div>
        <div><strong>7º</strong><span>semestre FECA</span></div>
      </div>
    </div>

    <div className="portrait-stage">
      <div className="portrait-aura" aria-hidden="true" />
      <div className="portrait-system">
        <div className="portrait-orbit orbit-one" aria-hidden="true" />
        <div className="portrait-orbit orbit-two" aria-hidden="true" />
        <div className="portrait-echo" aria-hidden="true">
          <Image src={heroImage} alt="" fill sizes="(max-width: 850px) 70vw, 480px" />
        </div>
        <div className="portrait-backplate" aria-hidden="true"><span>IDENTIDAD / 001</span><i /></div>
        <div className="portrait-frame">
          <Image src={heroImage} alt={`Retrato de ${profile.name}`} fill sizes="(max-width: 850px) 76vw, 520px" className="portrait-image" priority />
          <div className="portrait-gridlines" aria-hidden="true" />
          <div className="portrait-scan" aria-hidden="true" />
          <div className="portrait-corners" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="portrait-frame-data" aria-hidden="true">
            <span>DRH / PROFILE</span><b>24°01&apos;N</b>
          </div>
        </div>
        <div className="portrait-index" aria-hidden="true"><span>01</span><i /><small>PROFESSIONAL<br />IDENTITY</small></div>
      </div>
      <div className="portrait-label label-top"><span>PERFIL ACTIVO</span><strong>DANIEL / 001</strong></div>
      <div className="portrait-label label-bottom"><span>ENFOQUE</span><strong>CONTABLE · OPERATIVO</strong></div>
      <div className="availability-chip"><i /> {profile.availability}</div>
    </div>
  </section>
);
