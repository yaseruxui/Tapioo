'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProduct } from '@/lib/products';
import { track } from '@/lib/analytics';
import { lockScroll } from '@/lib/scroll';

type Cart = Record<string, number>;

export const BUNDLE_TOAST = '__bundle';

type CartCtx = {
  cart: Cart;
  count: number;
  total: number;
  isOpen: boolean;
  bump: number; // increments on every add — drives the cart-button animation
  toast: string | null; // a product id, or BUNDLE_TOAST
  quick: string | null; // product shown in the quick-view dialog
  add: (id: string, qty?: number) => void;
  addMany: (ids: readonly string[]) => void;
  change: (id: string, delta: number) => void;
  open: () => void;
  close: () => void;
  openQuick: (id: string) => void;
  closeQuick: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = 'tapioo-cart';

const item = (id: string, qty: number) => {
  const p = getProduct(id);
  return p ? [{ id, name: p.en.name, price: p.price, qty }] : [];
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [isOpen, setOpen] = useState(false);
  const [quick, setQuick] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const loaded = useRef(false);

  // Browser storage is a convenience only — the page works without it.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') setCart(saved);
    } catch { /* ignore */ }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart]);

  // Overlays pause page scrolling; Escape closes the drawer (the quick-view dialog handles its own).
  useEffect(() => { lockScroll(isOpen || !!quick); }, [isOpen, quick]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const notify = useCallback((msg: string) => {
    setBump(b => b + 1);
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + qty }));
    notify(id);
    track('add_to_cart', { items: item(id, qty) });
  }, [notify]);

  const addMany = useCallback((ids: readonly string[]) => {
    setCart(c => ids.reduce((next, id) => ({ ...next, [id]: (next[id] || 0) + 1 }), c));
    notify(BUNDLE_TOAST);
    track('add_to_cart', { items: ids.flatMap(id => item(id, 1)) });
  }, [notify]);

  const change = useCallback((id: string, delta: number) => {
    setCart(c => {
      const next = { ...c, [id]: (c[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const openQuick = useCallback((id: string) => {
    setQuick(id);
    track('view_item', { items: item(id, 1) });
  }, []);

  const value = useMemo<CartCtx>(() => {
    const ids = Object.keys(cart).filter(id => getProduct(id));
    return {
      cart,
      count: ids.reduce((s, id) => s + cart[id], 0),
      total: ids.reduce((s, id) => s + cart[id] * getProduct(id)!.price, 0),
      isOpen, bump, toast, quick, add, addMany, change, openQuick,
      open: () => setOpen(true),
      close: () => setOpen(false),
      closeQuick: () => setQuick(null),
    };
  }, [cart, isOpen, bump, toast, quick, add, addMany, change, openQuick]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

/** Cart lines in the shape analytics expects. */
export const cartItems = (cart: Cart) => Object.keys(cart).flatMap(id => item(id, cart[id]));
