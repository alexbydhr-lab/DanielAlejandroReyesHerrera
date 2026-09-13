import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { profile } from '@/content/profile';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageShell } from '@/components/page-shell';
import { MotionSystem } from '@/components/motion-system';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.shortName}`,
  },
  description: profile.subheadline,
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  category: 'Portafolio profesional',
  keywords: [
    profile.name,
    'Daniel Reyes contador',
    'Contador Público Durango',
    'Estudiante de Contador Público',
    'Contabilidad',
    'Análisis financiero',
    'CONTPAQi',
    'Portafolio profesional',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: `${profile.name} | ${profile.role}`,
    description: profile.subheadline,
    url: '/',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.role}`,
    description: profile.subheadline,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: profile.subheadline,
      inLanguage: 'es-MX',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: profile.name,
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      jobTitle: profile.role,
      description: profile.subheadline,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Durango',
        addressRegion: 'Durango',
        addressCountry: 'MX',
      },
      knowsAbout: ['Contabilidad', 'CFDI', 'CONTPAQi', 'Análisis financiero', 'Control de inventarios', 'Gestión operativa'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <MotionSystem />
        <Navbar />
        <PageShell>{children}</PageShell>
        <Footer />
      </body>
    </html>
  );
}
