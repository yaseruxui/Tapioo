import { productSVG } from '@/lib/productArt';
import { photoOf, type Product } from '@/lib/products';
import type { Lang } from '@/lib/lang';

/**
 * A product's catalog photo when there is one, otherwise the inline SVG illustration.
 * Hook-free, so it renders from both server and client components.
 * `display: contents` keeps the parent's layout untouched.
 */
export default function ProductArt({ product, variant, lang, eager }: { product: Product; variant: string; lang: Lang; eager?: boolean }) {
  const photo = photoOf(product.id);
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static, pre-sized webp files
      <img className="pphoto" src={photo} alt={product[lang].name} width={1024} height={1024}
        loading={eager ? 'eager' : 'lazy'} decoding="async" />
    );
  }
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: productSVG(product, variant, lang) }} />;
}
