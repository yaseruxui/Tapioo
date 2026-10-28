// Language primitives shared by server and client code.

export type Lang = 'ar' | 'en';

// Latin digits (0-9) in both languages — `nu-latn` keeps Arabic formatting with English numerals.
export const LOCALE: Record<Lang, string> = { ar: 'ar-EG-u-nu-latn', en: 'en-US' };

/** URL prefix for a language: Arabic lives at `/`, English at `/en`. */
export const basePath = (lang: Lang) => (lang === 'ar' ? '' : '/en');

/** Localized number formatter: `fmt(n, pad, decimals)`. */
export const makeFmt = (lang: Lang) => (n: number, pad = 1, dec = 0) =>
  n.toLocaleString(LOCALE[lang], { minimumIntegerDigits: pad, minimumFractionDigits: dec, maximumFractionDigits: dec });
