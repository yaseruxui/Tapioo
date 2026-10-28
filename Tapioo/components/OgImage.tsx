import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Social share card (1200×630). Latin text only: the OG renderer has no Arabic font
 * bundled — swap in a designed PNG at app/(ar)/opengraph-image.png for an Arabic card.
 */
export function ogImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg, #0A1220 0%, #0F1A2E 55%, #1E3A66 100%)', color: '#E8EEF7', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
          tapi<span style={{ color: '#60A5FA' }}>oo</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <svg key={i} width="44" height="44" viewBox="0 0 24 24"><path fill="#F5B301" d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z" /></svg>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>Google reviews in a single tap.</div>
          <div style={{ display: 'flex', fontSize: 30, color: '#93A3BA' }}>Smart NFC & QR cards and stands · Made in Egypt</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
