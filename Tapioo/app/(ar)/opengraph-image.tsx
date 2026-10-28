import { ogImage, OG_SIZE } from '@/components/OgImage';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Tapioo — Google reviews in a single tap';

export default function Image() {
  return ogImage();
}
