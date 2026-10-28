import type { SectionProps } from '@/lib/dict';
import { makeFmt } from '@/lib/lang';
import { getProduct, PRODUCTS } from '@/lib/products';
import ProductArt from '../ProductArt';

// Price anchor: the cheapest core review tool.
const FROM = Math.min(...PRODUCTS.filter(p => p.cat === 'core').map(p => p.price));
const STAND = getProduct('rev-stand')!;

/**
 * Hero: the promise on one side, the result on the other — the stand, a Google Maps card whose
 * rating climbs (ScrollEffects counts `data-count` up from `data-from`), and a fresh 5-star review.
 * The step-by-step phone flow lives in "How it works".
 */
export default function Hero({ t, lang }: SectionProps) {
  const h = t.hero;
  const fmt = makeFmt(lang);
  return (
    <section className="hero" id="top">
      <div className="hero-pin">
        <div className="glow g1" /><div className="glow g2" />

        <div className="hero-copy" id="heroCopy">
          <span className="eyebrow"><i className="dot" /> {h.eyebrow}</span>
          <h1>{h.title1}<br /><em>{h.title2}</em></h1>
          <p>{h.text}</p>
          <div className="cta-row">
            <a className="btn primary" href="#products">{h.shop}</a>
            <a className="btn ghost" href="#how">{h.how}</a>
            <span className="hero-price">{h.from} <b>{fmt(FROM)} {t.currency}</b></span>
          </div>
          <ul className="hero-points">
            {h.points.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="hs-product"><ProductArt product={STAND} variant="hero" lang={lang} /></div>

          <div className="hs-place">
            <div className="hs-top">
              <i className="hs-pin" />
              <div><b>{h.place}</b><small>{h.placeType} · {h.onMaps}</small></div>
            </div>
            <div className="hs-rating">
              <strong data-count="4.8" data-from="3.9" data-dec="1">{fmt(3.9, 1, 1)}</strong>
              <span className="hs-stars">★★★★★</span>
              <small>(<span data-count="412" data-from="48">{fmt(48)}</span>)</small>
            </div>
            <div className="hs-delta">↑ {h.delta}</div>
          </div>

          <div className="hs-review">
            <span className="hs-avatar">{h.gUser.charAt(0)}</span>
            <div>
              <div className="hs-rv-top"><b>{h.gUser}</b><span className="gstars">★★★★★</span></div>
              <p>{h.review}</p>
              <small>{h.ago}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
