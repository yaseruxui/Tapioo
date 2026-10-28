'use client';

import { useLang } from '@/lib/i18n';
import { useState } from 'react';

// Bar heights for the dashboard preview
const HEIGHTS = [34, 42, 48, 61, 74, 88, 96];

/**
 * Platform features as a selectable list: picking one highlights the part of the
 * dashboard it's about (filter → complaint, AI → reply, branches → chart, link → destination).
 * On phones the list collapses to chips with only the active description shown.
 */
export default function Platform() {
  const { t, fmt } = useLang();
  const p = t.platform;
  const [focus, setFocus] = useState(0);

  return (
    <section className="platform" id="platform">
      <div className="plat-grid">
        <div className="plat-copy">
          <div data-reveal>
            <span className="eyebrow">{p.eyebrow}</span>
            <h2>{p.title1}<br /><em>{p.title2}</em></h2>
          </div>
          <div className="plat-list" role="tablist" aria-label={p.eyebrow} data-reveal>
            {p.features.map((f, i) => (
              <button key={i} type="button" role="tab" aria-selected={focus === i} className={focus === i ? 'on' : undefined} onClick={() => setFocus(i)}>
                <i>{fmt(i + 1, 2)}</i>
                <span><b>{f.title}</b><small>{f.text}</small></span>
              </button>
            ))}
          </div>
          <p className="plat-active" aria-live="polite">{p.features[focus].text}</p>
        </div>

        <div className="dash-wrap">
          <div className="dash" data-reveal data-focus={focus}>
            <div className="dash-head"><span className="cf-logo">tapi<b>oo</b></span><small>{p.dash}</small></div>
            <div className="kpis">
              <div><small>{p.kpi[0]}</small><strong><span data-count="4.8" data-dec="1">0</span> ★</strong><em>{p.kpiNote[0]}</em></div>
              <div><small>{p.kpi[1]}</small><strong data-count="312">0</strong><em>{p.kpiNote[1]}</em></div>
              <div><small>{p.kpi[2]}</small><strong data-count="27">0</strong><em>{p.kpiNote[2]}</em></div>
            </div>
            <div className="bars" id="bars">
              {p.months.map((m, i) => (
                <div key={i} className={i === p.months.length - 1 ? 'hot' : undefined} style={{ '--h': `${HEIGHTS[i]}%` } as React.CSSProperties}>
                  <span>{m}</span>
                </div>
              ))}
            </div>
            <div className="feed">
              <div className="fitem warn">
                <b>{p.warnHead}</b>
                <p>{p.warnText}</p>
                <small>{p.warnNote}</small>
              </div>
              <div className="fitem ai">
                <b>{p.aiHead}</b>
                <p>{p.aiText}</p>
              </div>
              <div className="fitem dest">
                <span>🔗 {p.dest} <b>{p.destVal}</b></span>
                <em>{p.destChange}</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
