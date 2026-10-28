// ============================================================
// Social proof. The entries below are SAMPLES for layout only.
// Replace them with real customers (with their permission), then set `ready: true`.
// While `ready` is false they render in development only — never in production.
// ============================================================

type Copy = { quote: string; name: string; role: string };
type Bi<T> = { ar: T; en: T };

export const TRUST = {
  ready: false,

  testimonials: [
    {
      ar: { quote: 'من أول شهر التقييمات بقت 3 أضعاف، والعملاء بقوا يقولولنا "لقيناكم على جوجل".', name: 'أحمد س.', role: 'صاحب كافيه · المعادي' },
      en: { quote: 'Reviews tripled in the first month, and customers now tell us "we found you on Google".', name: 'Ahmed S.', role: 'Café owner · Maadi' },
    },
    {
      ar: { quote: 'الستاند شكله شيك على الريسبشن، والفلترة لحقتنا من كذا تقييم سلبي قبل ما يتنشر.', name: 'د. منى ع.', role: 'عيادة أسنان · مدينة نصر' },
      en: { quote: 'The stand looks great at reception, and the filter caught several negative reviews before they went public.', name: 'Dr. Mona A.', role: 'Dental clinic · Nasr City' },
    },
    {
      ar: { quote: 'ركّبنا ستيكرات على كل ترابيزة في الفرعين، وبنتابع الاتنين من لوحة واحدة.', name: 'كريم م.', role: 'مدير مطعم · الإسكندرية' },
      en: { quote: 'We put stickers on every table in both branches and track them from one dashboard.', name: 'Karim M.', role: 'Restaurant manager · Alexandria' },
    },
  ] as Bi<Copy>[],

  caseStudy: {
    place: { ar: 'كافيه النيل', en: 'Nile Café' },
    area: { ar: 'كافيه · المعادي، القاهرة', en: 'Café · Maadi, Cairo' },
    months: 3,
    tools: { ar: 'ستاند على الكاونتر + ستيكرات على 12 ترابيزة', en: 'A counter stand + stickers on 12 tables' },
    // `dec` = decimals shown; `after` only metrics have before: null
    metrics: [
      { key: 'rating', before: 3.9, after: 4.7, dec: 1 },
      { key: 'reviews', before: 48, after: 310, dec: 0 },
      { key: 'resolved', before: 0, after: 27, dec: 0 },
    ] as { key: 'rating' | 'reviews' | 'resolved'; before: number; after: number; dec: number }[],
    story: {
      ar: {
        challenge: 'قهوة ممتازة وتقييم 3.9 — لأن اللي بيقيّم غالباً هو العميل الزعلان، والمبسوط بيمشي من غير ما يكتب حاجة.',
        solution: 'ستاند على الكاونتر وستيكر على كل ترابيزة، والويترز بيقولوا جملة واحدة مع الفاتورة: "لو عجبك قرّب موبايلك هنا".',
        result: 'في 3 شهور التقييم بقى 4.7 من 310 تقييم، و27 شكوى وصلت لصاحب المكان واتحلّت قبل ما تتنشر.',
      },
      en: {
        challenge: 'Great coffee and a 3.9 rating — because the people reviewing were mostly unhappy customers; happy ones left without writing anything.',
        solution: 'A stand on the counter and a sticker on every table, plus one line from the waiters with the bill: "If you enjoyed it, tap your phone here."',
        result: 'In 3 months the rating reached 4.7 across 310 reviews, and 27 complaints reached the owner and were resolved before going public.',
      },
    } as Bi<{ challenge: string; solution: string; result: string }>,
    quote: {
      ar: { quote: 'أول مرة أحس إن تقييمنا على جوجل شبه المكان فعلاً.', name: 'أحمد س.', role: 'صاحب كافيه النيل' },
      en: { quote: 'For the first time our Google rating actually looks like our place.', name: 'Ahmed S.', role: 'Owner, Nile Café' },
    } as Bi<Copy>,
  },
};

/** Samples show while developing so the layout can be reviewed; real data shows everywhere. */
export const showTrustStories = TRUST.ready || process.env.NODE_ENV !== 'production';
