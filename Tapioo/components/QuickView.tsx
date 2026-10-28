'use client';

import { useEffect, useRef, useState } from 'react';
import { getProduct, waLink } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import ProductArt from './ProductArt';
import AssureLine from './AssureLine';
import { useCart } from './cart/CartProvider';

/** Product quick view in a native <dialog> — focus trap, Escape and backdrop come for free. */
export default function QuickView() {
  const { quick, closeQuick, add } = useCart();
  const { t, lang, fmt } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [qty, setQty] = useState(1);
  const p = quick ? getProduct(quick) : undefined;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) { setQty(1); d.showModal(); }
    if (!p && d.open) d.close();
  }, [p]);

  const pc = p?.[lang];
  const features = pc?.points ?? (p ? t.types[p.type] : []);

  return (
    <dialog ref={ref} className="qv" onClose={closeQuick} aria-label={pc?.name}
      onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}>
      {p && pc && (
        <div className="qv-inner" data-lenis-prevent>
          <button type="button" className="qv-close" onClick={() => ref.current?.close()} aria-label={t.quick.close}>✕</button>
          <div className="qv-media" style={{ '--tint': p.tint } as React.CSSProperties}>
            {pc.tag && <span className="badge">{pc.tag}</span>}
            <ProductArt product={p} variant="qv" lang={lang} />
          </div>
          <div className="qv-info">
            <h3>{pc.name}</h3>
            <p>{pc.desc}</p>
            <small className="qv-label">{t.quick.features}</small>
            <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
            <div className="price"><strong>{fmt(p.price)}</strong><small>{t.currency}</small></div>
            <div className="qv-buy">
              <div className="qty" aria-label={t.quick.qty}>
                <button type="button" onClick={() => setQty(q => q + 1)} aria-label={t.cart.inc}>+</button>
                <span>{fmt(qty)}</span>
                <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label={t.cart.dec}>−</button>
              </div>
              <button type="button" className="btn primary" onClick={() => { add(p.id, qty); ref.current?.close(); }}>
                {t.showcase.add} · {fmt(p.price * qty)} {t.currency}
              </button>
            </div>
            <a className="qv-ask" href={waLink(t.showcase.askMsg + pc.name)} target="_blank" rel="noopener" data-track="quickview">{t.showcase.ask}</a>
            <AssureLine items={t.assure} />
          </div>
        </div>
      )}
    </dialog>
  );
}
