import type { Metadata, Viewport } from 'next';
import { getDict } from './dict';
import { basePath, type Lang } from './lang';

/** Set NEXT_PUBLIC_SITE_URL in production; it feeds canonical URLs, hreflang, the sitemap and OG tags. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tapioo.com').replace(/\/$/, '');

export const VIEWPORT: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F8FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1220' },
  ],
};

/** Metadata for a page that exists in both languages at `path` (e.g. '' or '/returns'). */
export function pageMetadata(lang: Lang, path = '', title?: string): Metadata {
  const { meta } = getDict(lang);
  const arUrl = path || '/';
  const enUrl = `/en${path}`;
  const url = `${basePath(lang)}${path}` || '/';
  const fullTitle = title ? `${title} | Tapioo` : meta.title;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: meta.description,
    alternates: { canonical: url, languages: { ar: arUrl, en: enUrl, 'x-default': arUrl } },
    openGraph: {
      type: 'website',
      siteName: 'Tapioo',
      title: fullTitle,
      description: meta.description,
      url,
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: lang === 'ar' ? 'en_US' : 'ar_EG',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: meta.description },
  };
}
