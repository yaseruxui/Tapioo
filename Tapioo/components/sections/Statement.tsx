import type { SectionProps } from '@/lib/dict';

/** Big statement whose words fade in gradually as you scroll (ScrollEffects drives `--p` per word). */
export default function Statement({ t }: SectionProps) {
  const s = t.statement;
  const words = s.text.split(/\s+/);
  return (
    <section className="statement" id="statement">
      <div className="statement-pin">
        <p id="statementText">
          {words.map((w, i) => (
            <span key={i}>
              <span className={`w${s.hl.includes(w) ? ' hl' : ''}`}>{w}</span>{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
