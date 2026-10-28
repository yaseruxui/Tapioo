'use client';

import { useEffect } from 'react';
import { useLang } from '@/lib/i18n';
import { LOCALE } from '@/lib/lang';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * All scroll-driven motion for the page, in one rAF-throttled scroll handler:
 * nav state, word-by-word statement, rating chip, side dots — plus a velocity-aware marquee, reveals, counters and chart bars.
 *
 * Where the browser supports CSS scroll-driven animations, reveals, parallax and the
 * progress bar run in CSS (off the main thread) and the JS versions below are skipped.
 * With prefers-reduced-motion, everything settles into its final state instead of animating.
 * On low-end devices (html.lite, set in RootHtml) the marquee falls back to a plain CSS loop.
 */
export default function ScrollEffects() {
  const { lang } = useLang();

  useEffect(() => {
    const locale = LOCALE[lang];
    const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = (s: string) => [...document.querySelectorAll<HTMLElement>(s)];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cssTimeline = CSS.supports('animation-timeline: view()');
    const num = (n: number, dec: number) => n.toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec });

    const nav = $('#nav');
    const hero = $('.hero');
    const statement = $('#statement'), words = $$('#statementText .w');
    const chip = $('#rchip'), chipVal = $('#rchipVal'), chipBar = $('#rchipBar');
    const dots = $$('[data-dot]').map(d => [d, document.getElementById(d.dataset.dot!)] as const).filter(([, el]) => el) as [HTMLElement, HTMLElement][];

    let parallax: HTMLElement[] = [];
    let vh = innerHeight, lastDot = -1, lastChip = '', navY = scrollY;
    const wordP = words.map(() => -1);

    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.bottom > -100 && r.top < vh + 100;
    };

    // Reduced motion: show every scroll scene in its final state, once.
    if (reduced) {
      words.forEach(w => w.style.setProperty('--p', '1'));
    }

    function update() {
      const y = scrollY;
      const docH = document.documentElement.scrollHeight - vh;
      nav?.classList.toggle('scrolled', y > 40);
      // hide the nav on scroll down, show it on scroll up (once past the hero area); ignore tiny moves
      if (Math.abs(y - navY) > 6) {
        nav?.classList.toggle('nav-hidden', y > navY && y > 120);
        navY = y;
      }

      if (!reduced) {
        // statement — not pinned: words fade in as the paragraph rises from 85% to 25% of the viewport
        if (statement && inView(statement)) {
          const top = statement.getBoundingClientRect().top;
          const lit = clamp((vh * 0.85 - top) / (vh * 0.6)) * (words.length + 2);
          words.forEach((w, i) => {
            const p = Math.round(clamp((lit - i) / 2.5) * 100) / 100;
            if (p !== wordP[i]) { w.style.setProperty('--p', String(p)); wordP[i] = p; }
          });
        }
      }

      // rating chip — climbs from 3.9 to 4.8 between the end of the hero and the end of the page
      if (chip && chipVal && chipBar) {
        const start = hero ? hero.offsetHeight - vh * 0.5 : vh;
        const k = clamp((y - start) / Math.max(1, docH * 0.92 - start));
        chip.classList.toggle('show', y > start);
        const txt = num(3.9 + 0.9 * k, 1);
        if (txt !== lastChip) { chipVal.textContent = txt; lastChip = txt; }
        chipBar.style.transform = `scaleX(${k})`;
      }

      // side dots — the last section whose top has passed 45% of the viewport
      let active = 0;
      dots.forEach(([, el], i) => { if (el.getBoundingClientRect().top <= vh * 0.45) active = i; });
      if (active !== lastDot) {
        dots.forEach(([d], i) => d.classList.toggle('on', i === active));
        lastDot = active;
      }

      // parallax fallback — measure the parent so our own transform doesn't feed back
      if (!cssTimeline && !reduced) {
        parallax.forEach(el => {
          const r = el.parentElement!.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          el.style.transform = `translateY(${(r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed!)}px)`;
        });
      }
    }

    function measure() {
      vh = innerHeight;
      parallax = $$('[data-speed]');
      update();
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    // Re-measure whenever the page height changes (fonts, tabs, images…).
    let roRaf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(roRaf); roRaf = requestAnimationFrame(measure); });
    ro.observe(document.body);
    measure();

    // marquee — drifts on its own, speeds up and leans with scroll velocity; paused off-screen
    const mq = $('.marquee-track');
    let mqRaf = 0, mqOn = false, mqX = 0, lastY = scrollY, vel = 0;
    let mio: IntersectionObserver | undefined;
    const lite = document.documentElement.classList.contains('lite');
    if (mq && !reduced && !lite) {
      mq.style.animation = 'none';
      const loop = () => {
        const dy = scrollY - lastY;
        lastY = scrollY;
        vel += (dy - vel) * 0.12;
        const unit = mq.scrollWidth / 3; // the items are rendered three times
        mqX -= 0.8 + Math.min(Math.abs(vel) * 0.35, 14);
        if (mqX <= -unit) mqX += unit;
        mq.style.transform = `translate3d(${mqX}px, 0, 0) skewX(${clamp(-vel * 0.25, -10, 10)}deg)`;
        mqRaf = mqOn ? requestAnimationFrame(loop) : 0;
      };
      mio = new IntersectionObserver(([en]) => {
        mqOn = en.isIntersecting;
        if (mqOn && !mqRaf) { lastY = scrollY; mqRaf = requestAnimationFrame(loop); }
      });
      mio.observe(mq.parentElement!);
    }

    // reveal on view — CSS scroll timelines handle this where supported
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    }), { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    if (!cssTimeline) $$('[data-reveal]').forEach(el => io.observe(el));

    // counters (from `data-from`, default 0, to `data-count`) + chart bars
    const countUp = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.count!), from = parseFloat(el.dataset.from || '0'), dec = Number(el.dataset.dec || 0);
      if (reduced) { el.textContent = num(to, dec); return; }
      const t0 = performance.now();
      const step = (now: number) => {
        const k = ease(clamp((now - t0) / 1600));
        el.textContent = num(from + (to - from) * k, dec);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      if (el.dataset.count !== undefined) countUp(el);
      else el.classList.add('in');
      cio.unobserve(el);
    }), { threshold: 0.4 });
    $$('[data-count]').forEach(el => cio.observe(el));
    const bars = $('#bars');
    if (bars) cio.observe(bars);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', measure);
      ro.disconnect();
      mio?.disconnect();
      cancelAnimationFrame(mqRaf);
      io.disconnect();
      cio.disconnect();
    };
  }, [lang]);

  return null;
}
