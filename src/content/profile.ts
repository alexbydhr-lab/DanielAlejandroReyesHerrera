type ValueArea = { title: string; description: string; icon: string };

export const profile = {
  name: 'Daniel Alejandro Reyes Herrera',
  shortName: 'Daniel Reyes',
  role: 'Estudiante de Contador Público',
  location: 'Durango, Dgo., México',
  email: 'alexbydhr@gmail.com',
  phone: '618-153-7373',
  availability: 'Disponibilidad de horario',
  headline: 'Contabilidad, operación y análisis financiero con enfoque práctico.',
  subheadline:
    'Estudiante de noveno semestre de Contador Público (FECA, UJED) con experiencia en registro contable, análisis de CFDI y mejora de procesos. Utilizo Excel, Power Query y Python para ordenar información y automatizar tareas contables.',
  heroEyebrow: 'ESTUDIANTE DE CONTADOR PÚBLICO',
  chips: ['Durango, México', 'Excel / CONTPAQi', 'Liderazgo operativo'],
  socials: {
    linkedin: '#', // TODO: agrega tu URL de LinkedIn
    github: '#', // TODO: agrega tu URL de GitHub si aplica
  },
  ctaPrimary: '/contacto',
  ctaSecondary: '#experiencia',
  ogImage: '/opengraph-image',
};

export const services = [
  {
    title: 'Contabilidad y registro',
    description: 'Captura contable, CFDI, conciliaciones y organización de información para reportes claros.',
    icon: 'receipt',
  },
  {
    title: 'Análisis financiero',
    description: 'Indicadores básicos, variaciones y síntesis de datos para decisiones con fundamento.',
    icon: 'chart',
  },
  {
    title: 'Control e inventarios',
    description: 'Seguimiento en hojas de cálculo, pedidos y existencias para evitar quiebres y pérdidas.',
    icon: 'box',
  },
  {
    title: 'Gestión operativa',
    description: 'Capacitación, estandarización de procesos y comunicación con equipos y dueños.',
    icon: 'compass',
  },
];

export const experience = [
  {
    company: 'Cafetería Cara Mia',
    role: 'Mesero y preparación de bebidas',
    period: 'Abril 2021 - Octubre 2023',
    bullets: [
      'Atención al cliente y bebidas especializadas con máquina de café.',
      'Cobros y caja manteniendo cortes claros.',
      'Apoyo en inventarios y control básico de insumos.',
    ],
  },
  {
    company: 'Cafetería Cara Mia',
    role: 'Gerente',
    period: 'Octubre 2023 - Agosto 2024',
    bullets: [
      'Coordinación y capacitación del equipo; estandarización de procesos diarios.',
      'Inventarios y pedidos en Excel, cierres de caja y seguimiento a variaciones.',
      'Enlace entre dueños y equipo, resolviendo problemas operativos rápidamente.',
    ],
    highlight: 'Enfoque en orden, comunicación clara y control diario.',
  },
  {
    company: 'CP Jenny Salazar',
    role: 'Auxiliar contable',
    period: 'Enero 2025 - Mayo 2025',
    bullets: [
      'Registro y captura contable; emisión de CFDI y manejo de plataformas SAT.',
      'Uso de CONTPAQi Contabilidad y Nóminas; organización de información financiera.',
      'Apoyo en conciliaciones y reportes básicos para supervisión.',
    ],
  },
  {
    company: 'Tang',
    role: 'Promotor',
    period: 'Junio 2025 - Presente',
    bullets: [
      'Promoción y venta directa con comunicación persuasiva.',
      'Cierre y trato con distintos perfiles de clientes.',
    ],
  },
  {
    company: 'Papelería PSA',
    role: 'Contabilidad y automatización',
    period: 'Abril 2026 - Presente',
    bullets: [
      'Elaboro papeles de trabajo para procesos de devolución de impuestos ante el SAT.',
      'Realizo registros contables, revisión y análisis de CFDI y documentación soporte.',
      'Analizo y proceso información mediante Excel y Power Query para facilitar cruces, depuración y control de datos.',
      'Desarrollo herramientas en Python para automatizar conciliaciones bancarias y simplificar procesos contables repetitivos.',
      'Identifico oportunidades de mejora y automatización para reducir trabajo manual y hacer más eficientes los procesos.',
    ],
  },
];

export const education = {
  school: 'Universidad Juárez del Estado de Durango (FECA, UJED)',
  period: '2022 - Presente',
  detail: 'Estudiante de noveno semestre de Contador Público.',
  values: ['Responsabilidad', 'Mejora continua', 'Trabajo colaborativo', 'Comunicación clara'],
};

export const educationHistory = [
  {
    school: 'Universidad Juárez del Estado de Durango (FECA, UJED)',
    period: '2022 - Presente',
    detail: 'Estudiante de noveno semestre de Contador Público.',
  },
  {
    school: 'Centro de Bachillerato Tecnológico Industrial y de Servicios 89',
    period: '2019 - 2022',
    detail: 'Técnico en contabilidad egresado.',
  },
];

export const certifications = [
  {
    school: 'Instituto canadiense de idiomas modernos',
    period: '2019 - 2024',
    detail: 'Inglés C1',
    href: '/certificados/ingles-c1.pdf',
    button: 'Descargar certificado',
  },
];

export const skills = [
  'Comunicación clara y efectiva',
  'Liderazgo y coordinación de equipos',
  'Trabajo en equipo y colaboración',
  'Trabajo bajo presión',
  'Registro y control de información contable',
  'Control de inventarios',
  'Análisis de datos financieros',
  'Análisis y mejora de procesos',
  'Uso de Adobe Illustrator',
];

export const tools = [
  { name: 'Excel / Hojas de cálculo', level: 'Alto', detail: 'Dashboards, tablas dinámicas, control de inventarios.' },
  { name: 'Contabilidad / SAT / CFDI', level: 'Alto', detail: 'Registro, emisión de comprobantes, cumplimiento con supervisión.' },
  { name: 'Análisis financiero', level: 'Medio-alto', detail: 'Variaciones, tendencias y resúmenes ejecutivos.' },
  { name: 'Desarrollo web básico', level: 'Básico', detail: 'Automatizaciones sencillas y sitios informativos.' },
];

export const impactAreas: ValueArea[] = [
  {
    title: 'Control contable',
    description: 'Organización y revisión de información contable, conciliaciones bancarias, CFDI, comprobantes y seguimiento de registros para mantener datos claros y ordenados.',
    icon: 'receipt',
  },
  {
    title: 'Análisis de información',
    description: 'Transformación de datos financieros y operativos en reportes que faciliten la interpretación de resultados y la toma de decisiones.',
    icon: 'chart',
  },
  {
    title: 'Organización de procesos',
    description: 'Identificación de tareas repetitivas, controles innecesarios y oportunidades de mejora para hacer más eficientes los procesos administrativos y contables.',
    icon: 'process',
  },
  {
    title: 'Automatización',
    description: 'Uso de Excel, Python y herramientas digitales para reducir trabajo manual, procesar grandes cantidades de información y disminuir errores repetitivos.',
    icon: 'automation',
  },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Intermedio (C1)' },
  { name: 'Francés', level: 'Básico (A2+)' },
];

export const contactInfo = {
  email: profile.email,
  phone: profile.phone,
  location: 'Durango, Dgo.',
  availability: profile.availability,
};

export const faq = [
  {
    question: '¿En qué puedo ayudarte?',
    answer: 'Apoyo en registro contable, control operativo, inventarios y reportes claros para la toma de decisiones.',
  },
  {
    question: '¿Qué tipo de oportunidades busco?',
    answer: 'Prácticas o roles junior en contabilidad, finanzas u operación donde pueda aprender y aportar orden.',
  },
  {
    question: '¿Tiempo de respuesta?',
    answer: 'Normalmente dentro de 24 horas en días hábiles.',
  },
];

export const ctaFinal = {
  title: '¿Necesitas apoyo contable u operativo?',
  text: 'Hablemos y revisemos cómo puedo ayudarte con registro, control o reportes claros.',
  button: 'Escríbeme',
  href: '/contacto',
};

export const heroImage = '/profile-2.png'; // placeholder, reemplaza con tu foto en /public/profile-2.png
