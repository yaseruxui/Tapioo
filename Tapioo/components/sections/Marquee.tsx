import type { SectionProps } from '@/lib/dict';

/**
 * Strip under the hero listing the business types Tapioo is made for.
 * ScrollEffects speeds it up and skews it with scroll velocity.
 */
export default function Marquee({ t }: SectionProps) {
  const m = t.marquee;
  return (
    <div className="marquee" aria-label={m.label}>
      <div className="marquee-track">
        {[...m.items, ...m.items, ...m.items].map((b, i) => <span key={i} aria-hidden={i >= m.items.length}>{b}</span>)}
      </div>
    </div>
  );
}
