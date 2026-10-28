import { CONFIG, WHATSAPP_PLACEHOLDER } from '@/lib/products';
import { TRUST } from '@/lib/trust';
import { missingPaymentLogos } from './PaymentLogos';

/** Launch checklist — visible in development only, lists everything still using placeholder data. */
export default function DevNotice() {
  if (process.env.NODE_ENV === 'production') return null;

  const logos = missingPaymentLogos();
  const todo = [
    logos.length > 0 && `لوجوهات الدفع ناقصة (${logos.join('، ')}) — public/payments/`,
    CONFIG.whatsapp === WHATSAPP_PLACEHOLDER && 'رقم الواتساب مؤقت — lib/products.ts',
    CONFIG.draft.prices && 'الأسعار مؤقتة — lib/products.ts',
    CONFIG.draft.policies && 'صفحات السياسات مسودة محتاجة مراجعة — lib/dict.ts',
    !TRUST.ready && 'آراء العملاء تجريبية — lib/trust.ts',
    !process.env.NEXT_PUBLIC_GA_ID && !process.env.NEXT_PUBLIC_META_PIXEL_ID && 'التتبع مش متفعّل — .env.local',
    !process.env.NEXT_PUBLIC_SITE_URL && 'دومين الموقع مش متحدد — NEXT_PUBLIC_SITE_URL',
  ].filter(Boolean) as string[];

  if (!todo.length) return null;
  return (
    <details className="devnote" dir="rtl">
      <summary>⚠ {todo.length} قبل الإطلاق</summary>
      <ul>{todo.map(x => <li key={x}>{x}</li>)}</ul>
      <small>بيظهر في وضع التطوير بس</small>
    </details>
  );
}
