import type { SectionProps } from '@/lib/dict';
import { makeFmt } from '@/lib/lang';

/** How it works, in three plain steps. */
export default function Steps({ t, lang }: SectionProps) {
  const s = t.steps;
  const fmt = makeFmt(lang);
  return (
    <section className="how3" id="how">
      <h2>{s.title}</h2>
      <ol>
        {s.items.map((it, i) => (
          <li key={it.title}>
            <span className="step-n">{fmt(i + 1)}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
