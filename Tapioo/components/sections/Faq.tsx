import type { SectionProps } from '@/lib/dict';

export default function Faq({ t }: SectionProps) {
  const f = t.faq;
  return (
    <section className="faq" id="faq">
      <header className="sec-head" data-reveal>
        <span className="eyebrow">{f.eyebrow}</span>
        <h2>{f.title}</h2>
      </header>
      <div className="faq-list">
        {f.items.map((x, i) => (
          <details key={i} data-reveal>
            <summary>{x.q}</summary>
            <p>{x.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
