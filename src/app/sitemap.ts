import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/sobre-mi', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/cv', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/contacto', changeFrequency: 'yearly' as const, priority: 0.7 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
