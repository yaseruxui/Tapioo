import PolicyPage from '@/components/PolicyPage';
import { getDict } from '@/lib/dict';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('ar', '/returns', getDict('ar').policies.returns.title);

export default function Page() {
  return <PolicyPage lang="ar" kind="returns" />;
}
