import { getDict } from '@/lib/dict';
import { basePath, type Lang } from '@/lib/lang';
import { CONFIG, waLink } from '@/lib/products';

/** Returns / privacy policy page, in either language. */
export default function PolicyPage({ lang, kind }: { lang: Lang; kind: 'returns' | 'privacy' }) {
  const t = getDict(lang);
  const doc = t.policies[kind];
  const home = basePath(lang) || '/';
  const other = lang === 'ar' ? `/en/${kind}` : `/${kind}`;
  return (
    <>
      <header className="nav scrolled">
        <a className="logo" href={home} aria-label="Tapioo">tapi<span>oo</span></a>
        <div className="nav-actions">
          <a className="icon-btn lang-btn" href={other} hrefLang={lang === 'ar' ? 'en' : 'ar'} aria-label={t.nav.langLabel}>{t.nav.langSwitch}</a>
          <a className="btn small ghost" href={home}>{t.policies.back}</a>
        </div>
      </header>
      <main className="policy">
        <h1>{doc.title}</h1>
        <small className="policy-date">{t.policies.updated}</small>
        <p className="lead">{doc.intro}</p>
        {doc.sections.map(s => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
        <p className="policy-contact">
          {t.policies.contact} <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> ·{' '}
          <a href={waLink(t.footer.hello)} target="_blank" rel="noopener" data-track="policy">{t.footer.whatsapp}</a>
        </p>
      </main>
    </>
  );
}
