import type { Metadata } from 'next';
import { profile } from '@/content/profile';

export const SITE_URL = 'https://danielreyes.vercel.app';
export const SITE_NAME = `${profile.name} · Portafolio profesional`;

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | '/';
};

export const createPageMetadata = ({ title, description, path }: PageMetadata): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: path,
    siteName: SITE_NAME,
    title: `${title} | ${profile.shortName}`,
    description,
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Daniel Reyes · Contabilidad, operación y análisis financiero',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${profile.shortName}`,
    description,
    images: [{
      url: '/twitter-image',
      width: 1200,
      height: 630,
      alt: 'Daniel Reyes · Contabilidad, operación y análisis financiero',
    }],
  },
});
