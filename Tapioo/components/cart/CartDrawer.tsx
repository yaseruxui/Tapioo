'use client';

import { useEffect, useRef } from 'react';
import { getProduct, waLink } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { scrollToId } from '@/lib/scroll';
import ProductArt from '../ProductArt';
import AssureLine from '../AssureLine';
import { BUNDLE_TOAST, cartItems, useCart } from './CartProvider';

export default function CartDrawer() {
  const { cart, count, total, isOpen, close, change, toast } = useCart();
  const { t, lang, fmt } = useLang();
  const c = t.cart, cur = t.currency;
  const ids = Object.keys(cart).filter(id => getProduct(id));
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<Element | null>(null);

  // Keep keyboard focus inside the drawer while it's open, and put it back afterwards.
  useEffect(() => {
    const outside = document.querySelectorAll<HTMLElement>('body > *:not(.drawer):not(.overlay):not(.toast)');
    if (isOpen) {
      returnFocus.current = document.activeElement;
      outside.forEach(el => el.setAttribute('inert', ''));
      closeBtn.current?.focus();
    } else {
      outside.forEach(el => el.removeAttribute('inert'));
      (returnFocus.current as HTMLElement | null)?.focus?.();
    }
  }, [isOpen]);

  const checkout = () => {
    if (!ids.length) return;
    const lines = ids.map(id => {
      const p = getProduct(id)!;
      return `• ${p[lang].name} × ${cart[id]} = ${fmt(cart[id] * p.price)} ${cur}`;
    });
    const msg = `${c.msgHead}\n${lines.join('\n')}\n\n${c.msgTotal}: ${fmt(total)} ${cur}`;
    track('begin_checkout', { items: cartItems(cart) });
    window.open(waLink(msg), '_blank', 'noopener');
  };

  // Empty cart: close and take the visitor to the products.
  const browse = () => {
    close();
    scrollToId('products');
  };

  const toastText = toast === BUNDLE_TOAST ? c.bundleAdded : toast ? `${c.added}${getProduct(toast)?.[lang].name ?? ''}` : '';

  return (
    <>
      <div className={`overlay${isOpen ? ' open' : ''}`} onClick={close} />
      <aside className={`drawer${isOpen ? ' open' : ''}`} aria-label={c.title} aria-hidden={!isOpen} inert={!isOpen} role="dialog" aria-modal="true">
        <div className="drawer-head">
          <h3>{c.title}</h3>
          <button ref={closeBtn} type="button" onClick={close} aria-label={c.close}>✕</button>
        </div>
        <div className="drawer-body" data-lenis-prevent>
          {ids.length === 0 && (
            <div className="empty">
              <p>{c.empty}</p>
              <button type="button" className="btn ghost" onClick={browse}>{c.browse}</button>
            </div>
          )}
          {ids.map(id => {
            const p = getProduct(id)!;
            return (
              <div className="citem" key={id}>
                <div className="thumb" style={{ '--tint': p.tint } as React.CSSProperties}>
                  <ProductArt product={p} variant="cart" lang={lang} />
                </div>
                <div>
                  <h4>{p[lang].name}</h4>
                  <small>{fmt(p.price)} {cur}</small>
                  <button type="button" className="citem-remove" onClick={() => change(id, -cart[id])}>{c.remove}</button>
                </div>
                <div className="qty">
                  <button type="button" onClick={() => change(id, 1)} aria-label={c.inc}>+</button>
                  <span>{fmt(cart[id])}</span>
                  <button type="button" onClick={() => change(id, -1)} aria-label={c.dec}>−</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="drawer-foot">
          <div className="total"><span>{c.total}</span><strong>{fmt(total)} {cur}</strong></div>
          <button type="button" className="btn primary full" onClick={checkout} disabled={!count} style={{ opacity: count ? 1 : 0.4 }}>
            {c.order}
          </button>
          {count > 0 && <button type="button" className="continue" onClick={close}>{c.continue}</button>}
          <AssureLine items={t.assure} />
          <small>{c.note}</small>
        </div>
      </aside>
      <div className={`toast${toast ? ' show' : ''}`} role="status">{toastText}</div>
    </>
  );
}
