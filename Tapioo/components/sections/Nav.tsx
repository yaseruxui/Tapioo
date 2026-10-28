'use client';

import CartButton from '../cart/CartButton';
import ThemeToggle from '../ThemeToggle';
import MobileMenu from '../MobileMenu';
import { useLang } from '@/lib/i18n';

export default function Nav() {
  const { t, lang } = useLang();
  const target = lang === 'ar' ? '/en' : '/';

  // Switching language keeps the visitor on the section they were reading.
  const switchLang = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const current = sections.filter(s => s.getBoundingClientRect().top <= innerHeight * 0.4).pop();
    if (current && current.id !== 'top') {
      e.preventDefault();
      location.href = `${target}#${current.id}`;
    }
  };

  return (
    <>
      <header className="nav" id="nav">
        <a className="logo" href="#top" aria-label="Tapioo">tapi<span>oo</span></a>
        <nav className="links">
          {t.nav.links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="btn small ghost hide-sm" href="#custom">{t.nav.custom}</a>
          <a className="icon-btn lang-btn" href={target} hrefLang={lang === 'ar' ? 'en' : 'ar'} onClick={switchLang}
            aria-label={t.nav.langLabel} title={t.nav.langLabel}>
            {t.nav.langSwitch}
          </a>
          <ThemeToggle label={t.nav.themeLabel} />
          <CartButton />
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
