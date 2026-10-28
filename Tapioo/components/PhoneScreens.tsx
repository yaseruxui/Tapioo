'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/lib/dict';

/*
 * Phone screens drawn to look like the real thing: the iOS lock screen and notifications,
 * Safari, and Google Maps' review sheet and place page (used by "How it works").
 * Everything inside is sized in cqw (the phone's screen is a size container), so the screens
 * scale with the mockup.
 */

const STAR = 'M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z';

/** Google-yellow star rating as text, e.g. ★★★★☆ (a span, so the site's `em` colours don't apply). */
const Stars = ({ n = 5 }: { n?: number }) => <span className="gstars">{'★'.repeat(n)}<i>{'★'.repeat(5 - n)}</i></span>;

/**
 * Types `text` out character by character (emoji-safe) once `play` turns on, after `delay` ms,
 * with a blinking caret. Shows `placeholder` until the first character lands; resets when `play` goes off.
 */
function Typewriter({ text, placeholder, play, delay = 700, speed = 55 }: {
  text: string; placeholder: string; play: boolean; delay?: number; speed?: number;
}) {
  const chars = Array.from(text);
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!play) return;
    let i = 0, timer: ReturnType<typeof setTimeout>;
    const tick = () => { i += 1; setN(i); if (i < chars.length) timer = setTimeout(tick, speed); };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [play, text, delay, speed, chars.length]);

  return n === 0
    ? <span className="g-ph">{placeholder}{play && <i className="caret" />}</span>
    : <span className="g-typed">{chars.slice(0, n).join('')}<i className="caret" /></span>;
}

/** iOS status bar. `time` shows the clock (iOS hides it on the lock screen). */
export function StatusBar({ time = false }: { time?: boolean }) {
  return (
    <div className="sbar" aria-hidden="true">
      <span>{time ? '9:41' : ''}</span>
      <span className="sbar-icons">
        <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0L8 11.5zM3.5 6.9a6.4 6.4 0 0 1 9 0l-1.4 1.4a4.4 4.4 0 0 0-6.2 0L3.5 6.9zM1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.4 1.4a7.6 7.6 0 0 0-10.8 0L1.2 4.6z" /></svg>
        <svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="18" height="8" rx="1.6" /><rect x="24.5" y="4" width="1.8" height="4" rx=".9" opacity=".4" /></svg>
      </span>
    </div>
  );
}

const HomeIndicator = () => <span className="home-ind" aria-hidden="true" />;

/** iOS lock screen: date over the clock, optional notifications, flashlight + camera. */
export function LockScreen({ date, children }: { date: string; children?: React.ReactNode }) {
  return (
    <div className="ios-lock">
      <StatusBar />
      <div className="lock">
        <span className="lock-date">{date}</span>
        <b className="lock-time">9:41</b>
      </div>
      <div className="lock-notes">{children}</div>
      <div className="lock-foot" aria-hidden="true">
        <i><svg viewBox="0 0 24 24"><path d="M8 3h8l-1.5 5v12h-5V8L8 3z" /></svg></i>
        <i><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg></i>
      </div>
      <HomeIndicator />
    </div>
  );
}

const NOTE_ICONS = {
  bank: <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18" /></svg>,
  nfc: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M14.8 9.2l-1.9 4.7-4.7 1.9 1.9-4.7z" /></svg>,
};

/** iOS notification: app icon, bold title, time, body. */
export function IosNote({ icon, title, body, time }: { icon: keyof typeof NOTE_ICONS; title: string; body: string; time: string }) {
  return (
    <div className="ios-note">
      <span className={`note-ic ${icon}`}>{NOTE_ICONS[icon]}</span>
      <div className="note-txt">
        <div className="note-top"><b>{title}</b><small>{time}</small></div>
        <p>{body}</p>
      </div>
    </div>
  );
}

/**
 * Google Maps "rate and review" sheet. While `play` is on, the stars fill, the text appears,
 * Post turns blue, then the "posted" snackbar slides up.
 */
export function GoogleReview({ s, play }: { s: Dict['story']; play: boolean }) {
  return (
    <div className={`g-review${play ? ' play' : ''}`}>
      <StatusBar time />
      <div className="g-bar">
        <span className="g-x" aria-hidden="true">✕</span>
        <b>{s.place}</b>
        <span className="g-post">{s.gPost}</span>
      </div>
      <div className="g-user">
        <span className="g-avatar">{s.reviewer.charAt(0)}</span>
        <div><b>{s.reviewer}</b><small>{s.gPublic} ⓘ</small></div>
      </div>
      <div className="g-stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(i => <svg key={i} viewBox="0 0 24 24"><path d={STAR} /></svg>)}
      </div>
      <div className="g-text">
        <Typewriter text={s.reviewText} placeholder={s.gPlaceholder} play={play} />
      </div>
      <div className="g-photos">
        <svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
        {s.gPhotos}
      </div>
      <div className="g-snack">{s.gSnack}</div>
      <HomeIndicator />
    </div>
  );
}

/** The Tapioo smart page, open in Safari (content + bottom address bar). */
export function SafariPage({ s }: { s: Dict['story'] }) {
  return (
    <div className="safari">
      <StatusBar time />
      <div className="web">
        <div className="web-head">
          <span className="web-logo" aria-hidden="true">☕</span>
          <b>{s.place}</b>
          <small>{s.category}</small>
        </div>
        <p className="web-q">{s.q}</p>
        <div className="web-opt good">😍<span>{s.faces[0]}</span></div>
        <div className="web-opt">🙂<span>{s.faces[1]}</span></div>
        <div className="web-opt">😕<span>{s.faces[2]}</span></div>
        <small className="web-note">{s.note}</small>
        <span className="web-brand">tapi<b>oo</b></span>
      </div>
      <div className="safari-bar">
        <span className="aa">AA</span>
        <span className="url"><svg viewBox="0 0 24 24"><rect x="6" y="10" width="12" height="10" rx="2" /><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" /></svg>{s.url.split('/')[0]}</span>
        <svg className="reload" viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-2-4.9M19 4v4h-4" /></svg>
      </div>
      <div className="safari-tools" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
        <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        <svg viewBox="0 0 24 24"><path d="M12 3v12M8 7l4-4 4 4M5 12v8h14v-8" /></svg>
        <svg viewBox="0 0 24 24"><path d="M5 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H5zM19 5h-4a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h4z" /></svg>
        <svg viewBox="0 0 24 24"><rect x="4" y="7" width="12" height="12" rx="2" /><path d="M8 4h10a2 2 0 0 1 2 2v10" /></svg>
      </div>
      <HomeIndicator />
    </div>
  );
}

/** Google Maps place page: map with the pin, then the bottom sheet with the new review on top. */
export function MapsPlace({ s }: { s: Dict['story'] }) {
  return (
    <div className="gmap">
      <div className="gmap-map" aria-hidden="true">
        <span className="gm-search">{s.place}</span>
        <i className="gm-pin" />
      </div>
      <StatusBar time />
      <div className="gmap-sheet">
        <span className="grab" aria-hidden="true" />
        <b className="gm-name">{s.place}</b>
        {/* the count ticks from 412 to 413 as the new review lands */}
        <div className="gm-rate">
          <strong>{s.rating}</strong><Stars />
          <small className="gm-count"><span className="before">{s.countBefore}</span><span className="after">{s.count}</span></small>
        </div>
        <small className="gm-meta">{s.category} · <span className="gm-open">{s.open}</span> · {s.closes}</small>
        <div className="gm-actions">
          {s.actions.map((a, i) => <span key={a} className={i === 0 ? 'primary' : undefined}>{a}</span>)}
        </div>
        <div className="gm-reviews">
          {/* the visitor's review slides in on top of the existing ones, highlighted */}
          <div className="gm-new-wrap"><div>
            <div className="gm-review mine">
              <span className="g-avatar">{s.reviewer.charAt(0)}</span>
              <div>
                <div className="gm-rv-top"><b>{s.reviewer}</b><span className="gm-new">{s.posted}</span></div>
                <div className="gm-rv-meta"><Stars /><small>{s.ago}</small></div>
                <p>{s.reviewText}</p>
              </div>
            </div>
          </div></div>
          {s.oldReviews.map((r, i) => (
            <div className="gm-review" key={r.name}>
              <span className={`g-avatar c${i}`}>{r.name.charAt(0)}</span>
              <div>
                <div className="gm-rv-top"><b>{r.name}</b></div>
                <div className="gm-rv-meta"><Stars n={r.stars} /><small>{r.ago}</small></div>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}
