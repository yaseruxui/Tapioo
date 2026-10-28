'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Reports every WhatsApp link click as a lead, labelled by the link's `data-track`. */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (a) track('contact', { location: a.dataset.track || 'link' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
