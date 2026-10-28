'use client';

import { useCart } from './CartProvider';

export default function AddToCart({ id, className, label, children }: {
  id: string;
  className: string;
  label?: string;
  children: React.ReactNode;
}) {
  const { add } = useCart();
  return (
    <button type="button" className={className} aria-label={label} onClick={() => add(id)}>
      {children}
    </button>
  );
}
