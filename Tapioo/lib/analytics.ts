// Thin wrapper over GA4 (gtag) and Meta Pixel (fbq). Every call is a no-op
// until the IDs are set in .env.local — see components/Analytics.tsx.

type Item = { id: string; name: string; price: number; qty: number };

type Events = {
  view_item: { items: Item[] };
  add_to_cart: { items: Item[] };
  begin_checkout: { items: Item[] };
  contact: { location: string };
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const CURRENCY = 'EGP';
const value = (items: Item[]) => items.reduce((s, i) => s + i.price * i.qty, 0);
const gaItems = (items: Item[]) => items.map(i => ({ item_id: i.id, item_name: i.name, price: i.price, quantity: i.qty }));

export function track<E extends keyof Events>(event: E, data: Events[E]) {
  if (typeof window === 'undefined') return;
  const { gtag, fbq } = window;

  if (event === 'contact') {
    const { location } = data as Events['contact'];
    gtag?.('event', 'generate_lead', { method: 'whatsapp', location });
    fbq?.('track', 'Contact', { content_name: location });
    return;
  }

  const { items } = data as Events['add_to_cart'];
  const payload = { currency: CURRENCY, value: value(items) };
  const fb = { ...payload, content_ids: items.map(i => i.id), content_type: 'product' };
  gtag?.('event', event, { ...payload, items: gaItems(items) });
  if (event === 'view_item') fbq?.('track', 'ViewContent', fb);
  if (event === 'add_to_cart') fbq?.('track', 'AddToCart', fb);
  if (event === 'begin_checkout') fbq?.('track', 'InitiateCheckout', { ...fb, num_items: items.reduce((s, i) => s + i.qty, 0) });
}
