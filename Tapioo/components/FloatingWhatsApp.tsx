'use client';

import { useEffect, useState } from 'react';
import { waLink } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from './cart/CartProvider';
import { WhatsAppIcon } from './Icons';

/** Floating WhatsApp button — appears after the first scroll, hides behind overlays. */
export default function FloatingWhatsApp() {
  const { t } = useLang();
  const { isOpen, quick } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 300);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const show = scrolled && !isOpen && !quick;
  return (
    <a className={`wa-float${show ? ' show' : ''}`} href={waLink(t.float.msg)} target="_blank" rel="noopener"
      aria-label={t.float.label} tabIndex={show ? 0 : -1} data-track="float">
      <span className="wa-bubble" aria-hidden="true">{t.float.bubble}</span>
      <WhatsAppIcon />
    </a>
  );
}
