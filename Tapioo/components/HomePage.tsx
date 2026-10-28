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
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Shop from './sections/Shop';
import Steps from './sections/Steps';
import Reviews from './sections/Reviews';
import Trust from './sections/Trust';
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
        <main>
          <Hero {...p} />
          <Shop />
          <Steps {...p} />
          <Reviews {...p} />
          <Trust {...p} />
          <CustomCta {...p} />
          <Faq {...p} />
        </main>
        <Footer {...p} />
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
