'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';
import { useCart } from './CartProvider';
import { CartIcon } from '../Icons';

export default function CartButton() {
  const { count, bump, open } = useCart();
  const { t, fmt } = useLang();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !bump) return;
    el.classList.remove('bump');
    void el.offsetWidth; // restart the animation
    el.classList.add('bump');
  }, [bump]);

  return (
    <button ref={ref} type="button" className="cart-btn" aria-label={t.nav.cart} onClick={open}>
      <CartIcon />
      <b className={`cart-count${count ? ' has' : ''}`}>{fmt(count)}</b>
    </button>
  );
}
