import type { SectionProps } from '@/lib/dict';
import { makeFmt } from '@/lib/lang';
import { getProduct, PRODUCTS } from '@/lib/products';
import ProductArt from '../ProductArt';

// Price anchor: the cheapest core review tool.
const FROM = Math.min(...PRODUCTS.filter(p => p.cat === 'core').map(p => p.price));
const STAND = getProduct('rev-stand')!;
const CARD = getProduct('rev-card')!;
const STICKER = getProduct('rev-sticker')!;

/** Hero: the promise and the price on one side, the three core review tools photographed on the other. */
export default function Hero({ t, lang }: SectionProps) {
  const h = t.hero;
  const fmt = makeFmt(lang);
  return (
    <section className="hero2" id="top">
      <div className="hero2-copy">
        <h1>{h.title1}<br /><em>{h.title2}</em></h1>
        <p>{h.text}</p>
        <div className="cta-row">
          <a className="btn primary" href="#shop">{h.tools}</a>
          <a className="btn ghost" href="#how">{h.how}</a>
        </div>
        <p className="hero2-price">{h.from} <b>{fmt(FROM)} {t.currency}</b></p>
        <ul className="hero-points">
          {h.points.map(p => <li key={p}>{p}</li>)}
        </ul>
      </div>

      <div className="hero2-media">
        <div className="hm-main"><ProductArt product={STAND} variant="hero" lang={lang} eager /></div>
        <div className="hm-side">
          <div><ProductArt product={CARD} variant="hero" lang={lang} eager /></div>
          <div><ProductArt product={STICKER} variant="hero" lang={lang} eager /></div>
        </div>
      </div>
    </section>
  );
}
