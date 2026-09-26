import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectShowcase } from '@/components/project-showcase';
import { education, profile } from '@/content/profile';
import { tecmiappStages } from '@/content/tecmiapp';
import type { Metadata } from 'next';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import './sobre-mi.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Sobre mí',
  description: 'Conoce la trayectoria, formación, valores y proyectos de Daniel Reyes, estudiante de Contador Público en Durango.',
  path: '/sobre-mi',
});

const profilePageData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/sobre-mi/#profile-page`,
  url: `${SITE_URL}/sobre-mi`,
  name: `Sobre mí | ${profile.name}`,
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: profile.role,
    description: profile.subheadline,
  },
};

const paragraphs = [
  'Comencé mi experiencia profesional en áreas operativas, donde aprendí sobre atención al cliente, organización de equipos y mejora de procesos. Con el tiempo orienté mi desarrollo hacia la contabilidad y el análisis de información.',
  'Actualmente trabajo como auxiliar contable, participando en registros contables, análisis de CFDI y elaboración de papeles de trabajo para procesos fiscales. También utilizo Excel, Power Query y Python para analizar información y automatizar tareas.',
  'Me interesa especialmente encontrar formas de simplificar procesos repetitivos y convertir grandes cantidades de información en datos más claros y fáciles de revisar.',
];

const professionalSummary = [
  'Auxiliar contable',
  '9.º semestre',
  'Durango, Dgo.',
  'Excel · Power Query · Python',
];

const valores = [
  { title: 'Responsabilidad', text: 'Cumplir con tiempos y mantener la información confiable.' },
  { title: 'Mejora continua', text: 'Afinar procesos, checklists y reportes para trabajar mejor cada día.' },
  { title: 'Trabajo colaborativo', text: 'Comunicación clara con equipos, dueños y clientes.' },
  { title: 'Comunicación', text: 'Síntesis simple para que todos sepan qué hacer y cuándo.' },
];

const projectStages = [
  {
    shortTitle: 'Plataforma institucional',
    title: 'FEUD · Sitio web institucional',
    description:
      'Durante todo el año 2025 tuve la oportunidad de desarrollar, junto con mi compañero Julio, la página web de la FEUD, un proyecto que representó nuestro primer trabajo de gran escala y uno de los mayores retos a nivel profesional y personal. Desde el inicio, este proyecto nos exigió asumir una gran responsabilidad, ya que la plataforma debía responder a necesidades reales de la comunidad universitaria y funcionar de manera estable, clara y eficiente.',
    image: '/feud.png',
    imageAlt: 'Página web FEUD - vista principal',
  },
  {
    shortTitle: 'Automatización',
    title: 'Retos técnicos y automatización',
    description:
      'A lo largo del desarrollo nos enfrentamos a diversos desafíos de programación. Entre los más importantes estuvo la correcta implementación y conexión de formularios, así como la integración de aplicaciones de terceros para el envío automático de correos electrónicos, procesos que requerían precisión, pruebas constantes y solución de errores en tiempo real. Cada obstáculo nos llevó a profundizar en el funcionamiento de distintas herramientas y a mejorar nuestra capacidad para analizar y resolver problemas técnicos.',
    image: '/feud-2.png',
    imageAlt: 'Página web FEUD - formularios y módulos',
  },
  {
    shortTitle: 'Impacto y crecimiento',
    title: 'Sanity, impacto y crecimiento',
    description:
      'Otro de los grandes retos fue mantener toda la información del sitio actualizada mediante el uso de la plataforma Sanity. Aprender a trabajar con este sistema implicó adaptarnos a nuevas dinámicas de gestión de contenido, estructurar correctamente la información y asegurar que los cambios se reflejaran de forma inmediata y correcta en la página. A pesar de las dificultades, el proyecto fue altamente exitoso: más de 5,000 personas pudieron realizar el trámite de su descuento de manera digital, lo que evidenció el impacto directo y positivo de nuestro trabajo. En conjunto, esta experiencia fue profundamente enriquecedora y sentó las bases para futuros proyectos más ambiciosos.',
    image: '/feud-3.png',
    imageAlt: 'Página web FEUD - vista de resultados',
  },
];

const portfolioStages = [
  {
    shortTitle: 'Identidad profesional',
    title: 'Una portada con narrativa visual propia',
    description:
      'El portafolio presenta mi perfil contable y operativo mediante una dirección visual azul, una jerarquía tipográfica clara y una portada diseñada para comunicar orden, precisión y personalidad desde el primer contacto.',
    image: '/portfolio-home.png',
    imageAlt: 'Portada del portafolio profesional de Daniel Reyes',
  },
  {
    shortTitle: 'Historia y proyectos',
    title: 'Contenido profesional convertido en experiencia',
    description:
      'La sección Sobre mí combina información personal, formación y proyectos reales con módulos interactivos, profundidad visual y animaciones suaves. El objetivo fue conservar toda la información y hacerla más clara, memorable y fácil de explorar.',
    image: '/portfolio-about.png',
    imageAlt: 'Sección Sobre mí del portafolio profesional',
  },
  {
    shortTitle: 'CV interactivo',
    title: 'Un currículum que se puede recorrer',
    description:
      'La experiencia se completa con una línea temporal, comparador de procesos y carruseles de habilidades. Cada elemento transforma el currículum tradicional en una demostración visual de capacidades, manteniendo acceso directo al documento descargable.',
    image: '/portfolio-cv.png',
    imageAlt: 'Currículum interactivo dentro del portafolio',
  },
];

export default function SobreMiPage() {
  return (
    <div className="about-page space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData).replace(/</g, '\\u003c') }}
      />
      <section className="about-intro">
        <Container className="about-intro-layout">
          <div className="about-intro-copy">
            <p className="about-eyebrow">Sobre mí</p>
            <h1>Perfil y enfoque</h1>
            <p className="about-intro-description">
              Estudiante de Contador Público y auxiliar contable, con experiencia en registros contables, análisis de CFDI, conciliaciones y papeles de trabajo fiscales. Me interesa mejorar procesos mediante Excel, Power Query, Python y automatización.
            </p>
          </div>
          <aside className="profile-ledger" aria-labelledby="profile-ledger-title">
            <div className="profile-ledger-header">
              <span>Ficha profesional</span>
              <span>01 / 04</span>
            </div>
            <h2 id="profile-ledger-title">Actualmente</h2>
            <ol className="profile-ledger-list">
              {professionalSummary.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </Container>
      </section>

      <Container className="about-story">
        <SectionTitle title="Mi historia" />
        <div className="portfolio-panel about-story-copy">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>

      <Container className="space-y-8">
        <SectionTitle title="Formación" />
        <Card className="space-y-2" interactive>
          <p className="text-base font-semibold text-[--foreground]">{education.school}</p>
          <p className="text-sm text-[--muted]">{education.period} · {education.detail}</p>
        </Card>
      </Container>

      <Container className="space-y-8">
        <SectionTitle title="Valores de trabajo" />
        <div className="grid gap-4 sm:grid-cols-2">
          {valores.map((item) => (
            <Card key={item.title} className="space-y-2" interactive>
              <p className="text-base font-semibold text-[--foreground]">{item.title}</p>
              <p className="text-sm text-[--muted]">{item.text}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container id="proyectos" className="space-y-10">
        <ProjectShowcase
          slug="feud"
          eyebrow="Caso de estudio · 2025"
          title="FEUD: tecnología con impacto universitario."
          summary="Un proyecto digital de gran escala construido en equipo: diseño, desarrollo, automatización y gestión de contenido para resolver una necesidad real de la comunidad estudiantil."
          metrics={[
            { value: '5,000+', label: 'trámites digitales' },
            { value: '2025', label: 'año de desarrollo' },
            { value: '03', label: 'capas del proyecto' },
            { value: 'LIVE', label: 'producto publicado' },
          ]}
          browserLabel="feud.com.mx"
          projectUrl="https://www.feud.com.mx"
          stages={projectStages}
        />
        <div id="tecmiapp">
          <ProjectShowcase
            slug="tecmiapp"
            eyebrow="Proyecto académico · Finanzas personales"
            title="Tecmiapp: tus finanzas, con inteligencia artificial."
            summary="Una aplicación que desarrollé para un proyecto académico y conecté con n8n: movimientos, presupuestos, tarjetas con recordatorios de pago, análisis y consultas con IA sobre tus propias finanzas, además de panorama y noticias financieras."
            metrics={[
              { value: 'IA', label: 'consultas financieras' },
              { value: 'n8n', label: 'integración del asistente' },
              { value: 'Control', label: 'movimientos y presupuestos' },
              { value: 'Tarjetas', label: 'recordatorios y análisis' },
            ]}
            browserLabel="studio-phi-teal.vercel.app"
            projectUrl="https://studio-phi-teal.vercel.app/dashboard"
            stages={tecmiappStages}
          />
        </div>
        <ProjectShowcase
          slug="portfolio"
          eyebrow="Proyecto personal · 2026"
          title="Daniel Reyes: un portafolio que también demuestra."
          summary="Una experiencia web diseñada para presentar mi perfil, trayectoria y capacidades con el mismo cuidado que aplico al orden de la información: clara, interactiva y completamente adaptable."
          metrics={[
            { value: '03', label: 'experiencias principales' },
            { value: '100%', label: 'diseño adaptable' },
            { value: 'LIVE', label: 'despliegue activo' },
            { value: '01', label: 'identidad unificada' },
          ]}
          browserLabel="danielreyes.vercel.app"
          projectUrl="https://danielreyes.vercel.app"
          stages={portfolioStages}
        />
      </Container>

      <Container>
        <Card className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--accent]">Próximo paso</p>
            <p className="text-base font-semibold text-[--foreground]">¿Te gustaría revisar mi CV o hablar?</p>
          </div>
          <div className="flex gap-3">
            <Button href="/contacto">Contactar</Button>
            <Button href="/cv" variant="secondary">
              Ver CV
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
