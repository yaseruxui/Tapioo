import Script from 'next/script';
import { Alexandria, IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';
import type { Lang } from '@/lib/lang';
import Analytics from './Analytics';
import '@/app/globals.css';

const arDisplay = Alexandria({ subsets: ['arabic', 'latin'], weight: ['300', '400', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const arBody = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['300', '400', '500', '600'], variable: '--font-body', display: 'swap' });
const enFont = Manrope({ subsets: ['latin'], variable: '--font-en', display: 'swap' });

// Before first paint: apply the saved theme (no flash), and flag low-end devices
// (≤4 GB RAM or ≤4 cores, or Data Saver on) as "lite" so heavy effects are skipped.
const PREPAINT = `try{var d=document.documentElement,t=localStorage.getItem('tapioo-theme');
d.dataset.theme=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
var n=navigator,c=n.connection;if((n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(c&&c.saveData))d.classList.add('lite');}catch(e){}`;

/** The <html> shell shared by the Arabic (/) and English (/en) root layouts. */
export default function RootHtml({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const fonts = lang === 'ar' ? `${arDisplay.variable} ${arBody.variable}` : enFont.variable;
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} data-theme="dark" className={fonts} suppressHydrationWarning>
      <head>
        <Script id="prepaint" strategy="beforeInteractive">{PREPAINT}</Script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
