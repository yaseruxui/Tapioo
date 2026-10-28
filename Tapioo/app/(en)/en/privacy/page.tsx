import PolicyPage from '@/components/PolicyPage';
import { getDict } from '@/lib/dict';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('en', '/privacy', getDict('en').policies.privacy.title);

export default function Page() {
  return <PolicyPage lang="en" kind="privacy" />;
}
