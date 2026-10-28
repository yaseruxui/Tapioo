'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import ProductArt from '../ProductArt';
import AddToCart from '../cart/AddToCart';
import { useCart } from '../cart/CartProvider';

const CORE = PRODUCTS.filter(p => p.cat === 'core');

/**
 * The three core review tools side by side, so they read as a comparison.
 * On phones a segmented control shows one at a time.
 */
export default function Showcase() {
  const { t, lang, fmt } = useLang();
  const { openQuick } = useCart();
  const s = t.showcase;
  const [active, setActive] = useState(CORE[0].id);

  return (
    <section className="core" id="products">
      <header className="sec-head" data-reveal>
        <span className="eyebrow">{s.eyebrow}</span>
        <h2>{s.title}</h2>
        <p>{s.text}</p>
      </header>

      <div className="seg" role="tablist" aria-label={s.title}>
        {CORE.map(p => (
          <button key={p.id} type="button" role="tab" aria-selected={active === p.id} aria-controls={`core-${p.id}`}
            className={active === p.id ? 'on' : undefined} onClick={() => setActive(p.id)}>
            {s.pick[p.type as keyof typeof s.pick]}
          </button>
        ))}
      </div>

      <div className="core-grid">
        {CORE.map((p, i) => {
          const c = p[lang];
          return (
            <article key={p.id} id={`core-${p.id}`} data-product-id={p.id} data-reveal
              className={`core-card${active === p.id ? ' on' : ''}${i === 0 ? ' featured' : ''}`}>
              <button type="button" className="core-media" style={{ '--tint': p.tint } as React.CSSProperties}
                onClick={() => openQuick(p.id)} aria-label={`${t.connect.quick}: ${c.name}`}>
                {c.tag && <span className="badge">{c.tag}</span>}
                <ProductArt product={p} variant="show" lang={lang} />
              </button>
              <div className="core-info">
                <h3>{c.name}</h3>
                {c.bestFor && <p className="best-for">{c.bestFor}</p>}
                <ul>{c.points?.map(x => <li key={x}>{x}</li>)}</ul>
                <div className="core-foot">
                  <div className="price"><strong>{fmt(p.price)}</strong><small>{t.currency}</small></div>
                  <button type="button" className="pdetails" onClick={() => openQuick(p.id)}>{s.details}</button>
                </div>
                <AddToCart id={p.id} className="btn primary full">{s.add}</AddToCart>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
