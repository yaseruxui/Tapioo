import type { SectionProps } from '@/lib/dict';
import { TRUST, showTrustStories } from '@/lib/trust';

/** Owners' testimonials. Swipeable row on phones. */
export default function Reviews({ t, lang }: SectionProps) {
  if (!showTrustStories) return null;
  const r = t.reviews;
  return (
    <section className="reviews" id="reviews">
      <header className="sec-head" data-reveal>
        <span className="eyebrow">{r.eyebrow}</span>
        <h2>{r.title}</h2>
      </header>
      {!TRUST.ready && <p className="sample-note">⚠ {t.sample}</p>}
      <div className="quotes">
        {TRUST.testimonials.map(q => {
          const c = q[lang];
          return (
            <figure className="quote" key={c.name} data-reveal>
              <div className="qstars" aria-label="5/5">★★★★★</div>
              <blockquote>{c.quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{c.name.replace(/^د\.\s*|^Dr\.\s*/, '').charAt(0)}</span>
                <div><b>{c.name}</b><small>{c.role}</small></div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
