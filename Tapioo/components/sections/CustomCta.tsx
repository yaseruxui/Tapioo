import { waLink } from '@/lib/products';
import type { SectionProps } from '@/lib/dict';

export default function CustomCta({ t }: SectionProps) {
  const c = t.custom;
  return (
    <section className="custom" id="custom">
      <div className="custom-orbs" aria-hidden="true"><i /><i /><i /></div>
      <div className="custom-inner" data-reveal>
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.title1}<br />{c.title2}</h2>
          <p>{c.text}</p>
        </div>
        <a className="btn light" href={waLink(c.msg)} target="_blank" rel="noopener" data-track="custom">{c.cta}</a>
      </div>
    </section>
  );
}
