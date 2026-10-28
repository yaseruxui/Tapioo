import PolicyPage from '@/components/PolicyPage';
import { getDict } from '@/lib/dict';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('en', '/returns', getDict('en').policies.returns.title);

export default function Page() {
  return <PolicyPage lang="en" kind="returns" />;
}
