import { productSVG } from '@/lib/productArt';
import type { Product } from '@/lib/products';
import type { Lang } from '@/lib/lang';

/**
 * Inline SVG illustration of a product. Hook-free, so it renders from both server and client components.
 * `display: contents` keeps the parent's layout untouched.
 */
export default function ProductArt({ product, variant, lang }: { product: Product; variant: string; lang: Lang }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: productSVG(product, variant, lang) }} />;
}
