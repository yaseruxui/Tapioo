'use client';

import { useEffect, useState } from 'react';
import { getProduct, waLink } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from './cart/CartProvider';
import { CartIcon, WhatsAppIcon } from './Icons';

/**
 * Sticky bottom bar on phones: shows the product you're looking at with an Add button,
 * or — once the cart has items — the cart total with an Order button.
 * While the bar is up it carries the WhatsApp shortcut, so the floating button steps aside.
 */
export default function MobileBar() {
  const { t, lang, fmt } = useLang();
  const { count, total, add, open, isOpen, quick } = useCart();
  const [active, setActive] = useState<string | null>(null);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const rows = [...document.querySelectorAll<HTMLElement>('[data-product-id]')];
    const visible = new Set<Element>();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setActive(rows.find(r => visible.has(r))?.dataset.productId ?? null);
    }, { rootMargin: '-30% 0px -30% 0px' });
    rows.forEach(r => io.observe(r));

    const onScroll = () => setPast(scrollY > innerHeight * 0.9);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, []);

  const p = active ? getProduct(active) : undefined;
  const show = !isOpen && !quick && (!!p || (past && count > 0));

  // Lets the floating buttons sit above the bar.
  useEffect(() => { document.documentElement.classList.toggle('has-bar', show); }, [show]);

  return (
    <div className={`mbar${show ? ' show' : ''}`} aria-hidden={!show} inert={!show}>
      <a className="mbar-wa" href={waLink(t.float.msg)} target="_blank" rel="noopener" aria-label={t.float.label} data-track="mobile-bar">
        <WhatsAppIcon size={20} />
      </a>
      {p ? (
        <>
          <div className="mbar-info">
            <b>{p[lang].name}</b>
            <span>{fmt(p.price)} {t.currency}</span>
          </div>
          {count > 0 && (
            <button type="button" className="mbar-cart" onClick={open} aria-label={t.nav.cart}>
              <CartIcon size={18} />
              <i>{fmt(count)}</i>
            </button>
          )}
          <button type="button" className="btn primary small" onClick={() => add(p.id)}>{t.bar.add}</button>
        </>
      ) : (
        <>
          <div className="mbar-info">
            <b>{fmt(count)} {t.bar.items}</b>
            <span>{fmt(total)} {t.currency}</span>
          </div>
          <button type="button" className="btn primary small" onClick={open}>{t.bar.order}</button>
        </>
      )}
    </div>
  );
}
