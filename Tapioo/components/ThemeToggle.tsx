'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'tapioo-theme';

/**
 * Light/dark switch. Where the View Transitions API exists, the new theme
 * spreads out as a circle from the button. The initial theme is set before
 * paint by the inline script in RootHtml.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next;
      setTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    };

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply();
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add('theme-vt');
    const vt = document.startViewTransition(() => flushSync(apply));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: 'cubic-bezier(.2, .75, .1, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    }, () => {}); // skipped (e.g. hidden tab): the theme is already applied, nothing to animate
    vt.finished.finally(() => root.classList.remove('theme-vt'));
  };

  return (
    <button type="button" className="icon-btn" aria-label={label} title={label} onClick={toggle}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
