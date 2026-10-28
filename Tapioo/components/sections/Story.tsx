'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { scrollToY } from '@/lib/scroll';
import NfcIcon from '../NfcIcon';
import { GoogleReview, IosNote, LockScreen, MapsPlace, SafariPage } from '../PhoneScreens';

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * "How it works" — scroll-driven: the section pins and each slice of scroll moves to the next step,
 * from the payment to the review on Google Maps. The active step's bar fills with the scroll
 * (`--sp`), and clicking a step scrolls to it. With reduced motion the section doesn't pin and
 * clicks switch steps directly.
 */
export default function Story() {
  const { t: { story: s }, fmt } = useLang();
  const n = s.steps.length;
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      const f = clamp(-r.top / Math.max(1, total)) * n;
      const i = Math.min(n - 1, Math.floor(f));
      el.style.setProperty('--sp', (i === n - 1 ? clamp((f - i) * 1.25) : f - i).toFixed(3));
      setStep(i);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [n]);

  // Clicking a step scrolls to the middle of its slice (or just switches, with reduced motion).
  const pick = (i: number) => {
    const el = ref.current;
    if (!el || reduced.current) { setStep(i); return; }
    const total = el.offsetHeight - innerHeight;
    scrollToY(el.getBoundingClientRect().top + scrollY + ((i + 0.5) / n) * total);
  };
  const screen = (i: number) => `sscr${i === step ? ' active' : ''}${i < step ? ' past' : ''}`;

  return (
    <section className="story" id="how" ref={ref}>
      <div className="story-pin">
        <div className="story-copy">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2>{s.title1}<br />{s.title2pre}<em>{s.title2em}</em></h2>
          <ol className="steps">
            {s.steps.map((st, i) => (
              <li key={i} className={i === step ? 'active' : undefined}>
                <button type="button" onClick={() => pick(i)} aria-current={i === step ? 'step' : undefined}>
                  <b>{fmt(i + 1, 2)}</b>
                  <span><span className="st-title">{st.title}</span><span className="st-text">{st.text}</span></span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="story-stage" aria-hidden="true">
          <div className={`story-device${step === 1 ? ' tap' : ''}`}>
            <div className="phone">
              <div className="screen">
                {/* payment notification → card tap + NFC notification → Tapioo page → Google review sheet → Google Maps */}
                <div className={screen(0)}>
                  <LockScreen date={s.lockDate}><IosNote icon="bank" title={s.payTitle} body={s.payBody} time={s.now} /></LockScreen>
                </div>
                <div className={`${screen(1)} s2`}>
                  <LockScreen date={s.lockDate}><IosNote icon="nfc" title={s.nfcTitle} body={s.nfcBody} time={s.now} /></LockScreen>
                </div>
                <div className={screen(2)}><SafariPage s={s} /></div>
                <div className={screen(3)}><GoogleReview s={s} play={step === 3} /></div>
                <div className={screen(4)}><MapsPlace s={s} /></div>
              </div>
            </div>
            {/* the Tapioo card floats beside the phone; in step 2 it straightens up and taps it */}
            <div className="ripple r1" /><div className="ripple r2" /><div className="ripple r3" />
            <div className="story-card">
              <div className="card-float">
                <div className="card-face">
                  <div className="cf-top">
                    <span className="cf-logo">tapi<b>oo</b></span>
                    <NfcIcon size={30} />
                  </div>
                  <div className="cf-mid">
                    <div className="cf-stars">★★★★★</div>
                    <div className="cf-title">{s.cardTitle}</div>
                    <div className="cf-sub">{s.cardSub}</div>
                  </div>
                  <div className="cf-chip" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
