import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const PATHS = ['', '/returns', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(path => {
    const languages = { ar: `${SITE_URL}${path || '/'}`, en: `${SITE_URL}/en${path}` };
    return [
      { url: languages.ar, changeFrequency: 'weekly', priority: path ? 0.3 : 1, alternates: { languages } },
      { url: languages.en, changeFrequency: 'weekly', priority: path ? 0.3 : 0.9, alternates: { languages } },
    ];
  });
}
