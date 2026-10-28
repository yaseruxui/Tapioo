import type Lenis from 'lenis';

// The single Lenis instance, so overlays (cart, quick view) can pause page scrolling.
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { lenis = l; };

/**
 * Smooth-scrolls to a section, clearing the fixed nav. Callers are overlays that just closed,
 * so it resumes scrolling itself rather than waiting for their unlock effect to run.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  document.documentElement.classList.remove('locked');
  if (lenis) { lenis.start(); lenis.scrollTo(el, { offset: -70 }); }
  else el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', `#${id}`);
}

/** Smooth-scrolls the page to an absolute Y position. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

export function lockScroll(on: boolean) {
  if (on) lenis?.stop(); else lenis?.start();
  document.documentElement.classList.toggle('locked', on); // fallback when Lenis is off (reduced motion)
}
