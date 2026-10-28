import type { SectionProps } from '@/lib/dict';
import { makeFmt } from '@/lib/lang';
import { TRUST, showTrustStories } from '@/lib/trust';

/** One customer's story: before → after metrics, what happened, and the owner's words. */
export default function CaseStudy({ t, lang }: SectionProps) {
  if (!showTrustStories) return null;
  const r = t.results;
  const cs = TRUST.caseStudy;
  const fmt = makeFmt(lang);
  const rating = cs.metrics.find(m => m.key === 'rating')!;
  const story = cs.story[lang];
  const quote = cs.quote[lang];
  const title = r.title
    .replace('{from}', fmt(rating.before, 1, 1))
    .replace('{to}', fmt(rating.after, 1, 1))
    .replace('{m}', fmt(cs.months));

  return (
    <section className="case-study" id="results">
      {!TRUST.ready && <p className="sample-note">⚠ {t.sample}</p>}
      <div className="cs-card" data-reveal>
        <div className="cs-head">
          <span className="eyebrow">{r.eyebrow}</span>
          <h2>{title}</h2>
          <p className="cs-place"><b>{cs.place[lang]}</b> · {cs.area[lang]}</p>
          <p className="cs-tools"><small>{r.tools}</small> {cs.tools[lang]}</p>
        </div>

        <div className="cs-metrics">
          {cs.metrics.map(m => (
            <div className="cs-metric" key={m.key}>
              <small>{r.metrics[m.key]}</small>
              <div className="cs-nums">
                <span className="cs-before"><i>{r.before}</i>{fmt(m.before, 1, m.dec)}</span>
                <span className="cs-arrow" aria-hidden="true" />
                <span className="cs-after"><i>{r.after}</i><strong>{fmt(m.after, 1, m.dec)}</strong></span>
              </div>
            </div>
          ))}
        </div>

        <div className="cs-story">
          <div><h3>{r.challenge}</h3><p>{story.challenge}</p></div>
          <div><h3>{r.solution}</h3><p>{story.solution}</p></div>
          <div><h3>{r.result}</h3><p>{story.result}</p></div>
        </div>

        <figure className="cs-quote">
          <blockquote>{quote.quote}</blockquote>
          <figcaption><b>{quote.name}</b> · {quote.role}</figcaption>
        </figure>
      </div>
    </section>
  );
}
