import type { Metadata } from 'next';
import RootHtml from '@/components/RootHtml';

export const metadata: Metadata = { title: '404 | Tapioo' };

// With one root layout per language there's no shared layout for 404s, so this page brings its own shell.
export default function GlobalNotFound() {
  return (
    <RootHtml lang="ar">
      <main className="policy notfound">
        <a className="logo big" href="/">tapi<span>oo</span></a>
        <h1>الصفحة دي مش موجودة</h1>
        <p className="lead">Page not found</p>
        <div className="cta-row">
          <a className="btn primary" href="/">الرئيسية</a>
          <a className="btn ghost" href="/en">Home (English)</a>
        </div>
      </main>
    </RootHtml>
  );
}
