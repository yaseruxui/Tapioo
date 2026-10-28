import type { SectionProps } from '@/lib/dict';

/** "Before vs with Tapioo", side by side, then the key numbers. Product facts only — no sample data. */
export default function Compare({ t }: SectionProps) {
  const c = t.compare;
  return (
    <section className="compare" id="compare">
      <header className="sec-head" data-reveal>
        <span className="eyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
      </header>

      <div className="cmp" data-reveal>
        <div className="cmp-col before">
          <h3><span aria-hidden="true">✕</span> {c.before}</h3>
          <ul>
            {c.rows.map(r => <li key={r.label}><small>{r.label}</small>{r.before}</li>)}
          </ul>
        </div>
        <div className="cmp-col after">
          <h3><span aria-hidden="true">✓</span> {c.after}</h3>
          <ul>
            {c.rows.map(r => <li key={r.label}><small>{r.label}</small>{r.after}</li>)}
          </ul>
        </div>
      </div>

      <div className="cmp-stats" data-reveal>
        {c.stats.map(st => (
          <div key={st.unit}>
            <strong><span data-count={st.n}>0</span> <em>{st.unit}</em></strong>
            <small>{st.text}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
