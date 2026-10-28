import { CONFIG, waLink } from '@/lib/products';
import type { SectionProps } from '@/lib/dict';
import { basePath } from '@/lib/lang';

export default function Footer({ t, lang }: SectionProps) {
  const f = t.footer;
  const base = basePath(lang);
  const href = (h: string) => (h.startsWith('/') ? `${base}${h}` : h); // page links get the language prefix
  return (
    <footer className="footer">
      <div className="foot-top">
        <div className="foot-brand">
          <a className="logo big" href="#top">tapi<span>oo</span></a>
          <p>{f.about}</p>
        </div>
        <div className="foot-col">
          <h4>{f.shop}</h4>
          {f.shopLinks.map(([h, l]) => <a key={l} href={href(h)}>{l}</a>)}
        </div>
        <div className="foot-col">
          <h4>{f.company}</h4>
          {f.companyLinks.map(([h, l]) => <a key={l} href={href(h)}>{l}</a>)}
        </div>
        <div className="foot-col">
          <h4>{f.contact}</h4>
          <a href={waLink(f.hello)} target="_blank" rel="noopener" data-track="footer">{f.whatsapp}</a>
          <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        </div>
      </div>
      <div className="foot-bottom"><span>{f.rights}</span></div>
    </footer>
  );
}
