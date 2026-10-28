// ============================================================
// Store config + product catalogue
// Edit CONFIG and prices before launch — current values are placeholders.
// ============================================================
import type { Lang } from './lang';

export const CONFIG = {
  whatsapp: '201000000000', // international format, no "+" (placeholder)
  email: 'hello@tapioo.com',
  // Flip these once the real values are in — the dev-only launch checklist reads them.
  draft: { prices: true, policies: true },
};

export const WHATSAPP_PLACEHOLDER = '201000000000';

export type IconName = 'review' | 'social' | 'chat' | 'app' | 'web' | 'calendar' | 'menu' | 'id';

type Copy = {
  name: string;
  label: string; // short text printed on the product art
  tag?: string;
  bestFor?: string; // one line used to compare the core tools
  desc: string;
  points?: string[];
};

export type Product = {
  id: string;
  cat: 'core' | 'connect';
  type: 'card' | 'stand' | 'sticker' | 'keychain' | 'bracelet';
  icon: IconName;
  stars?: boolean;
  ar: Copy;
  en: Copy;
  price: number;
  g: [string, string]; // body gradient
  a: string; // accent on the product
  tint: string; // background glow behind the product image
};

const CORE = { g: ['#0B1A33', '#1E3A66'] as [string, string], a: '#F5B301' };

export const PRODUCTS: Product[] = [
  // ---------- Google Maps review tools (core) ----------
  {
    id: 'rev-card', cat: 'core', type: 'card', icon: 'review', stars: true,
    ar: {
      name: 'كارت تقييم جوجل ماب', label: 'قيّمنا على جوجل', tag: 'الأكثر طلباً', bestFor: 'للكاشير أو الويتر مع الفاتورة',
      desc: 'كارت فاخر في إيد الكاشير أو الويتر — العميل يقرّب موبايله ويقيّمك في ثانية.',
      points: ['مقاس كارت البنك — يتشال في الجيب', 'NFC + QR احتياطي لكل الموبايلات', 'طباعة مطفية مقاومة للخدش'],
    },
    en: {
      name: 'Google Maps Review Card', label: 'Review us on Google', tag: 'Best seller', bestFor: 'For cashiers and waiters, with the bill',
      desc: 'A premium card for your cashier or waiter — customers tap their phone and review you in a second.',
      points: ['Bank-card size — fits any pocket', 'NFC + QR backup for every phone', 'Scratch-resistant matte print'],
    },
    price: 450, ...CORE, tint: '#1e3a66',
  },
  {
    id: 'rev-stand', cat: 'core', type: 'stand', icon: 'review', stars: true,
    ar: {
      name: 'ستاند تقييم جوجل ماب', label: 'قيّمنا على جوجل', tag: 'للكاونتر', bestFor: 'للكاونتر والريسبشن — شغال 24 ساعة',
      desc: 'ستاند أنيق يتحط على الكاونتر أو الريسبشن، شغال 24 ساعة من غير ما حد يفكّر العميل.',
      points: ['أكريليك فاخر بقاعدة ثابتة', 'NFC + QR على نفس الستاند', 'مناسب للكاشير والترابيزات'],
    },
    en: {
      name: 'Google Maps Review Stand', label: 'Review us on Google', tag: 'For the counter', bestFor: 'For counters and reception — works 24/7',
      desc: 'An elegant stand for your counter or reception, working 24/7 without anyone reminding customers.',
      points: ['Premium acrylic with a stable base', 'NFC + QR on the same stand', 'Great for cashiers and tables'],
    },
    price: 850, ...CORE, tint: '#1d4ed8',
  },
  {
    id: 'rev-sticker', cat: 'core', type: 'sticker', icon: 'review', stars: true,
    ar: {
      name: 'ستيكر تقييم جوجل ماب', label: 'قيّمنا على جوجل', tag: 'الأوفر', bestFor: 'للترابيزات والأبواب — أوفر طريقة تغطي المكان',
      desc: 'يتلزق على الباب أو الفاترينة أو كل ترابيزة — أوفر طريقة تغطي بيها المكان كله.',
      points: ['لاصق قوي مقاوم للمية', 'يتلزق على أي سطح ناعم', 'مثالي للترابيزات والمنيو'],
    },
    en: {
      name: 'Google Maps Review Sticker', label: 'Review us on Google', tag: 'Best value', bestFor: 'For tables and doors — the cheapest way to cover your place',
      desc: 'Stick it on the door, the window or every table — the most affordable way to cover your whole place.',
      points: ['Strong, water-resistant adhesive', 'Sticks to any smooth surface', 'Perfect for tables and menus'],
    },
    price: 300, ...CORE, tint: '#0e7490',
  },

  // ---------- Connect & engagement tools ----------
  { id: 'wa-stand', cat: 'connect', type: 'stand', icon: 'chat',
    ar: { name: 'ستاند واتساب', label: 'كلّمنا واتساب', desc: 'العميل يفتح شات معاك على طول من غير ما يحفظ رقمك.' },
    en: { name: 'WhatsApp Stand', label: 'Chat on WhatsApp', desc: 'Customers open a chat with you instantly, without saving your number.' },
    price: 850, g: ['#0E6B3A', '#1FAF5A'], a: '#E8FFF1', tint: '#bfe8cf' },
  { id: 'social-stand', cat: 'connect', type: 'stand', icon: 'social',
    ar: { name: 'ستاند السوشيال ميديا', label: 'تابعنا', desc: 'كل حساباتك في لمسة — زوّد متابعينك وهو لسه في المكان.' },
    en: { name: 'Social Media Stand', label: 'Follow us', desc: 'All your accounts in one tap — grow followers while they are still in your place.' },
    price: 850, g: ['#6D28D9', '#DB2777'], a: '#FFE4F2', tint: '#ecc9e6' },
  { id: 'menu-stand', cat: 'connect', type: 'stand', icon: 'menu',
    ar: { name: 'ستاند المنيو الديجيتال', label: 'المنيو', desc: 'المنيو يفتح على الموبايل فوراً — من غير ورق ولا طباعة كل شوية.' },
    en: { name: 'Digital Menu Stand', label: 'Menu', desc: 'Your menu opens on their phone instantly — no paper, no reprinting.' },
    price: 800, g: ['#7F1D1D', '#C2410C'], a: '#FFE9DC', tint: '#f1cdb8' },
  { id: 'booking-stand', cat: 'connect', type: 'stand', icon: 'calendar',
    ar: { name: 'ستاند حجز المواعيد', label: 'احجز معادك', desc: 'للعيادات والصالونات — العميل يحجز زيارته الجاية قبل ما يمشي.' },
    en: { name: 'Booking Stand', label: 'Book a visit', desc: 'For clinics and salons — customers book their next visit before leaving.' },
    price: 850, g: ['#92400E', '#D97706'], a: '#FFF3DC', tint: '#f1ddb4' },
  { id: 'app-stand', cat: 'connect', type: 'stand', icon: 'app',
    ar: { name: 'ستاند تحميل التطبيق', label: 'حمّل التطبيق', desc: 'يوجّه العميل لـ App Store أو Google Play حسب نوع موبايله.' },
    en: { name: 'App Download Stand', label: 'Get our app', desc: 'Sends customers to the App Store or Google Play based on their phone.' },
    price: 950, g: ['#1E3A8A', '#2563EB'], a: '#E3ECFF', tint: '#c3d3f3' },
  { id: 'web-stand', cat: 'connect', type: 'stand', icon: 'web',
    ar: { name: 'ستاند الموقع الإلكتروني', label: 'زور موقعنا', desc: 'توجيه فوري لموقعك أو متجرك الإلكتروني بلمسة.' },
    en: { name: 'Website Stand', label: 'Visit our site', desc: 'Instantly send customers to your website or online store with a tap.' },
    price: 950, g: ['#115E59', '#0D9488'], a: '#DDFBF6', tint: '#bfe4de' },
  { id: 'wa-card', cat: 'connect', type: 'card', icon: 'chat',
    ar: { name: 'كارت واتساب', label: 'كلّمنا واتساب', desc: 'كارت يتحط مع الأوردر أو الشنطة — وتفضل على تواصل مع عميلك.' },
    en: { name: 'WhatsApp Card', label: 'Chat on WhatsApp', desc: 'A card that ships with the order or bag — stay in touch with your customer.' },
    price: 450, g: ['#0E6B3A', '#1FAF5A'], a: '#E8FFF1', tint: '#bfe8cf' },
  { id: 'social-card', cat: 'connect', type: 'card', icon: 'social',
    ar: { name: 'كارت السوشيال ميديا', label: 'تابعنا', desc: 'بطاقة ذكية تزوّد متابعينك بسهولة على كل المنصات.' },
    en: { name: 'Social Media Card', label: 'Follow us', desc: 'A smart card that grows your followers on every platform.' },
    price: 450, g: ['#6D28D9', '#DB2777'], a: '#FFE4F2', tint: '#ecc9e6' },
  { id: 'biz-card', cat: 'connect', type: 'card', icon: 'id',
    ar: { name: 'كارت البيزنس الذكي', label: 'بياناتي كلها هنا', desc: 'كارت شخصي يشارك رقمك وإيميلك وحساباتك بلمسة — مش هتطبع كروت تاني.' },
    en: { name: 'Smart Business Card', label: 'All my details', desc: 'A personal card that shares your number, email and accounts in a tap — no more printing.' },
    price: 500, g: ['#0B1A33', '#1E3A66'], a: '#9CC3FF', tint: '#c7d6ee' },
  { id: 'wa-sticker', cat: 'connect', type: 'sticker', icon: 'chat',
    ar: { name: 'ستيكر واتساب', label: 'كلّمنا واتساب', desc: 'يتلزق على الباب أو الكاونتر — العميل يفتح شات معاك بلمسة.' },
    en: { name: 'WhatsApp Sticker', label: 'Chat on WhatsApp', desc: 'Stick it on the door or counter — customers open a chat with a tap.' },
    price: 250, g: ['#0E6B3A', '#1FAF5A'], a: '#E8FFF1', tint: '#bfe8cf' },
  { id: 'social-sticker', cat: 'connect', type: 'sticker', icon: 'social',
    ar: { name: 'ستيكر السوشيال ميديا', label: 'تابعنا', desc: 'على كل ترابيزة — العميل يتابع حساباتك وهو قاعد.' },
    en: { name: 'Social Media Sticker', label: 'Follow us', desc: 'On every table — customers follow your accounts while seated.' },
    price: 250, g: ['#6D28D9', '#DB2777'], a: '#FFE4F2', tint: '#ecc9e6' },
  { id: 'menu-sticker', cat: 'connect', type: 'sticker', icon: 'menu',
    ar: { name: 'ستيكر المنيو الديجيتال', label: 'المنيو', desc: 'ستيكر على الترابيزة يفتح المنيو على الموبايل فوراً.' },
    en: { name: 'Digital Menu Sticker', label: 'Menu', desc: 'A table sticker that opens your menu on their phone instantly.' },
    price: 220, g: ['#7F1D1D', '#C2410C'], a: '#FFE9DC', tint: '#f1cdb8' },
  { id: 'biz-keychain', cat: 'connect', type: 'keychain', icon: 'id',
    ar: { name: 'ميدالية البيزنس الذكية', label: 'بياناتي', desc: 'معاك في مفاتيحك — شارك رقمك وحساباتك بلمسة في أي مكان.' },
    en: { name: 'Smart Business Keychain', label: 'My details', desc: 'On your keys — share your number and accounts with a tap, anywhere.' },
    price: 350, g: ['#0B1A33', '#1E3A66'], a: '#9CC3FF', tint: '#c7d6ee' },
  { id: 'social-keychain', cat: 'connect', type: 'keychain', icon: 'social',
    ar: { name: 'ميدالية السوشيال ميديا', label: 'تابعني', desc: 'هدية لعملائك أو لفريقك — كل حساباتك في ميدالية.' },
    en: { name: 'Social Media Keychain', label: 'Follow me', desc: 'A gift for customers or your team — all your accounts on a keychain.' },
    price: 350, g: ['#6D28D9', '#DB2777'], a: '#FFE4F2', tint: '#ecc9e6' },
  { id: 'biz-bracelet', cat: 'connect', type: 'bracelet', icon: 'id',
    ar: { name: 'أسورة البيزنس الذكية', label: 'بياناتي', desc: 'أسورة سيليكون مقاومة للمية — شارك بياناتك بلمسة من إيدك.' },
    en: { name: 'Smart Business Bracelet', label: 'My details', desc: 'A water-resistant silicone band — share your details with a tap of your wrist.' },
    price: 400, g: ['#0B1A33', '#1E3A66'], a: '#9CC3FF', tint: '#c7d6ee' },
  { id: 'social-bracelet', cat: 'connect', type: 'bracelet', icon: 'social',
    ar: { name: 'أسورة السوشيال ميديا', label: 'تابعني', desc: 'مثالية للمدربين والفعاليات — حساباتك على إيدك دايماً.' },
    en: { name: 'Social Media Bracelet', label: 'Follow me', desc: 'Perfect for trainers and events — your accounts always on your wrist.' },
    price: 400, g: ['#6D28D9', '#DB2777'], a: '#FFE4F2', tint: '#ecc9e6' },
];

// ---------- helpers ----------
export const waLink = (text: string) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
export const getProduct = (id: string) => PRODUCTS.find(p => p.id === id);
export const copy = (p: Product, lang: Lang) => p[lang];
