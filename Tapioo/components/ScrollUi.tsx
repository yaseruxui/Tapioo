import type { SectionProps } from '@/lib/dict';
import { makeFmt } from '@/lib/lang';

export const DOT_SECTIONS = ['top', 'how', 'compare', 'products', 'connect', 'trust', 'platform', 'faq'] as const;

/** Side navigation dots (desktop). ScrollEffects marks the active one. */
export function SideDots({ t }: SectionProps) {
  return (
    <nav className="dots" aria-label={t.nav.sections}>
      {DOT_SECTIONS.map(id => (
        <a key={id} href={`#${id}`} data-dot={id}><span>{t.dots[id]}</span></a>
      ))}
    </nav>
  );
}

/** Rating chip that climbs from 3.9 to 4.8 as the visitor scrolls — the page's story in one number. */
export function RatingChip({ t, lang }: SectionProps) {
  return (
    <div className="rchip" id="rchip" aria-hidden="true">
      <span className="rchip-star">★</span>
      <b id="rchipVal">{makeFmt(lang)(3.9, 1, 1)}</b>
      <small>{t.chip.label}</small>
      <i><span id="rchipBar" /></i>
    </div>
  );
}
