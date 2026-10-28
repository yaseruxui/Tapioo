import { getDict } from '@/lib/dict';
import { basePath, type Lang } from '@/lib/lang';
import { CONFIG, PRODUCTS } from '@/lib/products';
import { SITE_URL } from '@/lib/site';
import { LangProvider } from '@/lib/i18n';
import { CartProvider } from './cart/CartProvider';
import CartDrawer from './cart/CartDrawer';
import ScrollEffects from './ScrollEffects';
import SmoothScroll from './SmoothScroll';
import QuickView from './QuickView';
import MobileBar from './MobileBar';
import FloatingWhatsApp from './FloatingWhatsApp';
import DevNotice from './DevNotice';
import { RatingChip, SideDots } from './ScrollUi';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Statement from './sections/Statement';
import Story from './sections/Story';
import Showcase from './sections/Showcase';
import ConnectGallery from './sections/ConnectGallery';
import Compare from './sections/Compare';
import CaseStudy from './sections/CaseStudy';
import Reviews from './sections/Reviews';
import Trust from './sections/Trust';
import Platform from './sections/Platform';
import CustomCta from './sections/CustomCta';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

/** Structured data so Google understands the business and the products with their prices. */
function JsonLd({ lang }: { lang: Lang }) {
  const url = `${SITE_URL}${basePath(lang)}/`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', name: 'Tapioo', url, email: CONFIG.email, areaServed: 'EG' },
      ...PRODUCTS.map(p => ({
        '@type': 'Product',
        name: p[lang].name,
        description: p[lang].desc,
        sku: p.id,
        brand: { '@type': 'Brand', name: 'Tapioo' },
        offers: { '@type': 'Offer', price: p.price, priceCurrency: 'EGP', availability: 'https://schema.org/InStock', url },
      })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export default function HomePage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const p = { t, lang };
  return (
    <LangProvider lang={lang} t={t}>
      <CartProvider>
        <Nav />
        <SideDots {...p} />
        <main>
          <Hero {...p} />
          <Marquee {...p} />
          <Statement {...p} />
          <Story />
          <Compare {...p} />
          <Showcase />
          <ConnectGallery />
          <CaseStudy {...p} />
          <Platform />
          <Reviews {...p} />
          <Trust {...p} />
          <Faq {...p} />
          <CustomCta {...p} />
        </main>
        <Footer {...p} />
        <RatingChip {...p} />
        <FloatingWhatsApp />
        <MobileBar />
        <QuickView />
        <CartDrawer />
        <ScrollEffects />
        <SmoothScroll />
        <DevNotice />
        <JsonLd lang={lang} />
      </CartProvider>
    </LangProvider>
  );
}
