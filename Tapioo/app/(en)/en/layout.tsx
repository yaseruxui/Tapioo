import RootHtml from '@/components/RootHtml';
import { pageMetadata, VIEWPORT } from '@/lib/site';

export const metadata = pageMetadata('en');
export const viewport = VIEWPORT;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
