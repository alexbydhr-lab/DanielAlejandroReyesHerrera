import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocationMap } from '@/components/ui/location-map';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { ProjectShowcase } from '@/components/project-showcase';
import { education, profile } from '@/content/profile';
import type { Metadata } from 'next';
import { createPageMetadata, SITE_URL } from '@/lib/seo';

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
  'Soy estudiante de Contador Público en la FECA (UJED), séptimo semestre. Me he desarrollado en operación y contabilidad, liderando equipos y manteniendo procesos claros.',
  'Disfruto organizar información, crear rutinas que faciliten el trabajo diario y comunicar hallazgos con un lenguaje simple.',
  'Mi enfoque combina orden operativo, registro contable y análisis práctico. Creo en la mejora continua y en documentar para que los equipos trabajen con claridad.',
  'Busco prácticas o roles junior donde pueda aportar estructura, aprender más de contabilidad y apoyar en decisiones con datos.',
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
    <div className="space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData).replace(/</g, '\\u003c') }}
      />
      <section className="relative overflow-hidden bg-transparent">
        <DottedSurface
          className="absolute inset-0 opacity-70"
          dotGap={24}
          dotRadius={2.1}
          maxOpacity={0.55}
          interactionRadius={160}
          strength={0.45}
        />
        <Container className="relative z-10 grid gap-8 py-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--accent]">Sobre mí</p>
            <h1 className="text-4xl font-black text-[--foreground]">Perfil y enfoque</h1>
            <p className="max-w-3xl text-lg text-[--muted]">
              Estudiante de Contador Público con experiencia en liderazgo operativo y registro contable. Me gusta mantener procesos ordenados y reportes claros.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end lg:-mt-36">
            <LocationMap location="Durango, Dgo." coordinates={`24°01'51.3"N 104°40'54.0"W`} />
          </div>
        </Container>
      </section>

      <Container className="space-y-10">
        <SectionTitle title="Mi historia" subtitle="Contabilidad, operación y análisis práctico." />
        <div className="portfolio-panel rounded-[28px] p-6 space-y-4">
          {paragraphs.map((p) => (
            <p key={p} className="text-base text-[--muted]">
              {p}
            </p>
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
