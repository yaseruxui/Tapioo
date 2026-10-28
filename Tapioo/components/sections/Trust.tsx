import type { SectionProps } from '@/lib/dict';
import { basePath } from '@/lib/lang';
import { Icon } from '../Icons';
import PaymentLogos from '../PaymentLogos';

/** Guarantees and accepted payment methods. */
export default function Trust({ t, lang }: SectionProps) {
  const tr = t.trust;
  const base = basePath(lang);
  return (
    <section className="trust" id="trust">
      <header className="sec-head" data-reveal>
        <span className="eyebrow">{tr.eyebrow}</span>
        <h2>{tr.title}</h2>
        <p>{tr.text}</p>
      </header>

      <div className="assure">
        {tr.assure.map(a => (
          <div className="as-item" key={a.title} data-reveal>
            <div className="as-ic"><Icon name={a.ic} /></div>
            <div>
              <h3>{a.title}</h3>
              <p>{a.text}{a.href && <> <a href={`${base}${a.href}`}>{a.link}</a></>}</p>
            </div>
          </div>
        ))}
      </div>

      <PaymentLogos label={tr.pay} cod={tr.cod} />
    </section>
  );
}
