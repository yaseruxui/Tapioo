'use client';

import { useEffect, useRef, useState } from 'react';
import { waLink } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { lockScroll, scrollToId } from '@/lib/scroll';
import { DOT_SECTIONS } from './ScrollUi';
import { WhatsAppIcon } from './Icons';

/**
 * Section menu for phones and tablets (the nav links are hidden below 1100px).
 * A native modal <dialog>, so focus stays inside and Escape closes it.
 */
export default function MobileMenu() {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    lockScroll(open);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <button type="button" className="icon-btn menu-btn" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      </button>

      <dialog ref={ref} className="menu" aria-label={t.nav.menu} onClose={() => setOpen(false)}
        onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="menu-inner">
          <div className="menu-head">
            <span className="logo">tapi<span>oo</span></span>
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={t.nav.closeMenu}>✕</button>
          </div>
          <nav className="menu-links">
            {DOT_SECTIONS.filter(id => id !== 'top').map(id => (
              <button key={id} type="button" onClick={() => go(id)}>{t.dots[id]}</button>
            ))}
          </nav>
          <div className="menu-cta">
            <button type="button" className="btn primary full" onClick={() => go('custom')}>{t.nav.custom}</button>
            <a className="btn ghost full" href={waLink(t.float.msg)} target="_blank" rel="noopener" data-track="menu">
              <WhatsAppIcon size={20} /> {t.float.label}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
