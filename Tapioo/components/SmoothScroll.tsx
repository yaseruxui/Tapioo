'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '@/lib/scroll';

/**
 * Inertial smooth scrolling. Lenis drives the real window scroll,
 * so ScrollEffects' scroll listeners keep working unchanged.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -70 }, // keep in-page links smooth and clear of the fixed nav
    });
    setLenis(lenis);
    return () => { setLenis(null); lenis.destroy(); };
  }, []);

  return null;
}
