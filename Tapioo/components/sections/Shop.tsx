'use client';

import { useState } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import ProductArt from '../ProductArt';
import AddToCart from '../cart/AddToCart';
import { useCart } from '../cart/CartProvider';

type Tab = 'all' | Product['type'];
const TABS: Tab[] = ['all', 'stand', 'card', 'sticker', 'keychain', 'bracelet'];

/** The whole catalogue as one grid, core review tools first, filtered by product type. */
export default function Shop() {
  const { t, lang, fmt } = useLang();
  const { openQuick } = useCart();
  const s = t.shop;
  const [tab, setTab] = useState<Tab>('all');
  const items = tab === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === tab);
  const count = (k: Tab) => (k === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.type === k).length);

  return (
    <section className="shop" id="shop">
      <header className="shop-head">
        <h2>{s.title}</h2>
        <p>{s.text}</p>
      </header>

      <div className="shop-tabs" role="tablist" aria-label={s.title}>
        {TABS.map(k => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} aria-controls="shop-grid"
            className={tab === k ? 'on' : undefined} onClick={() => setTab(k)}>
            {s.tabs[k]} <small>{fmt(count(k))}</small>
          </button>
        ))}
      </div>

      <div className="shop-grid" id="shop-grid" role="tabpanel">
        {items.map(p => {
          const c = p[lang];
          return (
            <article className="scard" key={p.id} data-product-id={p.id}>
              <button type="button" className="scard-img" style={{ '--tint': p.tint } as React.CSSProperties}
                onClick={() => openQuick(p.id)} aria-label={`${s.details}: ${c.name}`}>
                {c.tag && <span className="scard-tag">{c.tag}</span>}
                <ProductArt product={p} variant="card" lang={lang} />
              </button>
              <div className="scard-body">
                <h3><button type="button" onClick={() => openQuick(p.id)}>{c.name}</button></h3>
                <p>{c.desc}</p>
                <div className="scard-foot">
                  <div className="price"><strong>{fmt(p.price)}</strong> <small>{t.currency}</small></div>
                  <AddToCart id={p.id} className="btn primary small" label={s.addLabel + c.name}>{s.add}</AddToCart>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
