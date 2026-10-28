# Tapioo — متجر أدوات التقييم الذكية (Next.js)

## التشغيل
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # نسخة الإنتاج
```

## أهم الملفات اللي هتعدّلها
| الملف | فيه إيه |
|---|---|
| `lib/products.ts` | رقم الواتساب، الإيميل، العملة، وكل المنتجات والأسعار |
| `lib/productArt.ts` | رسومات المنتجات (SVG خفيفة) — بدّلها بصور حقيقية بعدين |
| `components/sections/*` | كل سكشن في الصفحة لوحده (Hero, Story, Showcase, …) |
| `components/ScrollEffects.tsx` | كل حركات السكرول |
| `components/cart/*` | السلة — الطلب بيتبعت على واتساب |
| `app/globals.css` | الألوان والتصميم (المتغيرات أول الملف) |

## قبل الإطلاق
- غيّر `CONFIG.whatsapp` في `lib/products.ts` (حالياً رقم تجريبي).
- راجع الأسعار (كلها أرقام مبدئية بالجنيه).
- راجع إجابات الأسئلة الشائعة عن الدفع والشحن في `components/sections/Faq.tsx`.
