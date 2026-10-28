'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Dict } from './dict';
import { basePath, makeFmt, type Lang } from './lang';

export type { Lang };

/**
 * The language comes from the route (`/` or `/en`), so the server already renders
 * the right copy; the provider only hands the current dictionary to client components.
 */
const Ctx = createContext<{ lang: Lang; t: Dict } | null>(null);

export function LangProvider({ lang, t, children }: { lang: Lang; t: Dict; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, t }), [lang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return { ...ctx, fmt: makeFmt(ctx.lang), base: basePath(ctx.lang) };
}
