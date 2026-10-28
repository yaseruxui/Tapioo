'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { PRODUCTS, type Product } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import ProductArt from '../ProductArt';
import AddToCart from '../cart/AddToCart';
import { useCart } from '../cart/CartProvider';

type Tab = 'all' | Product['type'];
const TABS: Tab[] = ['all', 'stand', 'card', 'sticker', 'keychain', 'bracelet'];
const ALL = PRODUCTS.filter(p => p.cat === 'connect');
// Goals come from each product's icon (chat → WhatsApp, social, menu, …), in catalogue order.
const GOALS = [...new Set(ALL.map(p => p.icon))];

/** Runs a DOM update inside a View Transition when available, so cards glide instead of jumping. */
function withTransition(update: () => void) {
  const root = document.documentElement;
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }
  root.classList.add('tabs-vt');
  const vt = document.startViewTransition(() => flushSync(update));
  vt.ready.catch(() => {}); // skipped transitions (e.g. hidden tab) are fine — the update still applies
  vt.finished.finally(() => root.classList.remove('tabs-vt'));
}

/**
 * Connect & engagement tools: tabs filter by product type, a goal dropdown narrows by purpose
 * (WhatsApp, menu, bookings…), and the cards sit in one swipeable row.
 */
export default function ConnectGallery() {
  const { t, lang, fmt } = useLang();
  const { openQuick } = useCart();
  const c = t.connect;
  const [tab, setTab] = useState<Tab>('all');
  const [goal, setGoal] = useState<string>('all');
  const tabsRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const byGoal = goal === 'all' ? ALL : ALL.filter(p => p.icon === goal);
  const count = (k: Tab) => (k === 'all' ? byGoal.length : byGoal.filter(p => p.type === k).length);
  const items = tab === 'all' ? byGoal : byGoal.filter(p => p.type === tab);

  // Slide the highlight under the active tab (tabs may wrap onto two rows on phones).
  useLayoutEffect(() => {
    const place = () => {
      const btn = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      const ind = indRef.current;
      if (!btn || !ind) return;
      ind.style.width = `${btn.offsetWidth}px`;
      ind.style.height = `${btn.offsetHeight}px`;
      ind.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
    };
    place();
    addEventListener('resize', place);
    return () => removeEventListener('resize', place);
  }, [tab, goal]);

  // Track whether the row can scroll further, to show or hide the arrows.
  const readEdges = () => {
    const row = rowRef.current;
    if (!row) return;
    const x = Math.abs(row.scrollLeft); // negative in RTL
    setEdge({ start: x < 4, end: x + row.clientWidth >= row.scrollWidth - 4 });
  };
  useLayoutEffect(() => {
    rowRef.current?.scrollTo({ left: 0 });
    readEdges();
  }, [tab, goal]);

  // One "page" forward or back; in RTL, forward is towards negative scrollLeft.
  const page = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const rtl = getComputedStyle(row).direction === 'rtl' ? -1 : 1;
    row.scrollBy({ left: dir * rtl * row.clientWidth * 0.85, behavior: 'smooth' });
  };

  const select = (k: Tab) => { if (k !== tab) withTransition(() => setTab(k)); };
  const pickGoal = (g: string) => withTransition(() => setGoal(g));

  // Arrow keys move between tabs (roving tabindex); in RTL the arrows follow the visual order.
  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const dir = lang === 'ar' && Math.abs(step) === 1 ? -1 : 1;
    const enabled = TABS.filter(k => k === tab || count(k) > 0); // skip tabs the goal filter emptied
    const at = Math.min(enabled.length - 1, Math.max(0, enabled.indexOf(tab) + step * dir));
    const i = TABS.indexOf(enabled[at]);
    select(TABS[i]);
    tabsRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[i]?.focus();
  };

  return (
    <section className="connect" id="connect">
      <div className="h-head" data-reveal>
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.title1}<br />{c.title2}</h2>
        </div>
        <p>{c.text}</p>
      </div>

      <div className="tabs" role="tablist" ref={tabsRef} onKeyDown={onKey}>
        <span className="tab-ind" ref={indRef} aria-hidden="true" />
        {TABS.map(k => (
          <button key={k} type="button" role="tab" id={`tab-${k}`} aria-selected={tab === k} aria-controls="connect-panel"
            tabIndex={tab === k ? 0 : -1} className={tab === k ? 'on' : undefined} onClick={() => select(k)}
            disabled={k !== tab && count(k) === 0}>
            {c.tabs[k]} <small>{fmt(count(k))}</small>
          </button>
        ))}
      </div>

      <label className="goal">
        <span>{c.goal}</span>
        <select value={goal} onChange={e => pickGoal(e.target.value)}>
          <option value="all">{c.goals.all}</option>
          {GOALS.map(g => <option key={g} value={g}>{c.goals[g]}</option>)}
        </select>
      </label>

      {items.length === 0 && (
        <p className="row-empty">{c.empty} <button type="button" onClick={() => pickGoal('all')}>{c.reset}</button></p>
      )}

      <div className={`prow-wrap${edge.start ? ' at-start' : ''}${edge.end ? ' at-end' : ''}`}>
        <div className="prow" id="connect-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} ref={rowRef} onScroll={readEdges}>
          {items.map(p => {
            const pc = p[lang];
            return (
              <article className="pcard" key={p.id} style={{ '--vt': `pc-${p.id}` } as React.CSSProperties}>
                <button type="button" className="pimg" style={{ '--tint': p.tint } as React.CSSProperties}
                  onClick={() => openQuick(p.id)} aria-label={`${c.quick}: ${pc.name}`}>
                  <ProductArt product={p} variant="card" lang={lang} />
                  <span className="qv-hint" aria-hidden="true">{c.quick}</span>
                </button>
                <h3>{pc.name}</h3>
                <p>{pc.desc}</p>
                <button type="button" className="pdetails" onClick={() => openQuick(p.id)}>{c.details}</button>
                <div className="pfoot">
                  <div className="price"><strong>{fmt(p.price)}</strong><small>{t.currency}</small></div>
                  <AddToCart id={p.id} className="btn primary small add" label={c.addLabel + pc.name}>{c.add}</AddToCart>
                </div>
              </article>
            );
          })}
        </div>
        <button type="button" className="row-arrow prev" onClick={() => page(-1)} aria-label={c.prev} disabled={edge.start}>‹</button>
        <button type="button" className="row-arrow next" onClick={() => page(1)} aria-label={c.next} disabled={edge.end}>›</button>
      </div>
    </section>
  );
}
