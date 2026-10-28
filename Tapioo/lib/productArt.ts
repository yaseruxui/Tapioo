// ============================================================
// Lightweight product illustrations — hand-built SVG, a few KB each.
// Swap for real product photos later by changing <ProductArt />.
// ============================================================
import type { IconName, Product } from './products';
import type { Lang } from './lang';

const ART: Record<Lang, { tap: string; tapScan: string }> = {
  ar: { tap: 'قرّب موبايلك هنا', tapScan: 'قرّب موبايلك أو امسح الكود' },
  en: { tap: 'Tap your phone here', tapScan: 'Tap or scan the code' },
};

const ICONS: Record<IconName, (c: string) => string> = {
  review: c => `<path d="M0-26c-11 0-20 9-20 20 0 15 20 34 20 34s20-19 20-34c0-11-9-20-20-20z" fill="${c}"/><circle cy="-6" r="7" fill="#fff" opacity=".9"/>`,
  social: c => `<rect x="-20" y="-20" width="40" height="40" rx="12" fill="none" stroke="${c}" stroke-width="5"/><circle r="9" fill="none" stroke="${c}" stroke-width="5"/><circle cx="11" cy="-11" r="3" fill="${c}"/>`,
  chat: c => `<path d="M0-22a22 22 0 1 1-11 41l-13 4 4-12A22 22 0 0 1 0-22z" fill="${c}"/><circle cx="-8" r="3" fill="#0006"/><circle r="3" fill="#0006"/><circle cx="8" r="3" fill="#0006"/>`,
  app: c => `<rect x="-14" y="-24" width="28" height="48" rx="6" fill="none" stroke="${c}" stroke-width="5"/><path d="M0-10v16M-7 0l7 7 7-7" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  web: c => `<circle r="22" fill="none" stroke="${c}" stroke-width="4.5"/><ellipse rx="9" ry="22" fill="none" stroke="${c}" stroke-width="4"/><path d="M-22 0h44M-18-11h36M-18 11h36" stroke="${c}" stroke-width="3.5"/>`,
  calendar: c => `<rect x="-22" y="-18" width="44" height="40" rx="7" fill="none" stroke="${c}" stroke-width="4.5"/><path d="M-22-6h44M-11-24v10M11-24v10" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/><circle cx="-10" cy="6" r="3.5" fill="${c}"/><circle cx="2" cy="6" r="3.5" fill="${c}"/><circle cx="-10" cy="14" r="3.5" fill="${c}"/>`,
  menu: c => `<path d="M-15-22v16a6 6 0 0 0 12 0v-16M-9-22v44M13-22c-7 4-9 12-9 20h9v24" stroke="${c}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  id: c => `<circle cy="-10" r="10" fill="${c}"/><path d="M-20 22c0-12 9-20 20-20s20 8 20 20z" fill="${c}"/>`,
};

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

function star(x: number, y: number, r: number, fill: string) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1);
  }
  return `<path d="${d}Z" fill="${fill}"/>`;
}
const starRow = (cx: number, cy: number, r: number, gap: number, fill: string) =>
  [-2, -1, 0, 1, 2].map(i => star(cx + i * gap, cy, r, fill)).join('');

const nfc = (x: number, y: number, c: string, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"><path d="M0-8a10 10 0 0 1 0 16"/><path d="M6-14a18 18 0 0 1 0 28"/><path d="M12-20a26 26 0 0 1 0 40"/></g>`;

function qr(x: number, y: number, s: number, seed: number, c: string) {
  const n = 9, cell = s / n;
  let h = seed % 233280;
  const rnd = () => (h = (h * 9301 + 49297) % 233280) / 233280;
  let out = `<rect x="${x - 4}" y="${y - 4}" width="${s + 8}" height="${s + 8}" rx="5" fill="#fff"/>`;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const finder = (i < 3 && j < 3) || (i < 3 && j > 5) || (i > 5 && j < 3);
    if (!finder && rnd() > 0.5) out += `<rect x="${(x + j * cell).toFixed(1)}" y="${(y + i * cell).toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}" fill="${c}"/>`;
  }
  ([[0, 0], [0, 6], [6, 0]] as const).forEach(([i, j]) => {
    const fx = x + j * cell, fy = y + i * cell;
    out += `<rect x="${(fx + cell * 0.45).toFixed(1)}" y="${(fy + cell * 0.45).toFixed(1)}" width="${(cell * 2.1).toFixed(1)}" height="${(cell * 2.1).toFixed(1)}" fill="none" stroke="${c}" stroke-width="${(cell * 0.9).toFixed(1)}"/><rect x="${(fx + cell * 1.1).toFixed(1)}" y="${(fy + cell * 1.1).toFixed(1)}" width="${(cell * 0.8).toFixed(1)}" height="${(cell * 0.8).toFixed(1)}" fill="${c}"/>`;
  });
  return out;
}

const FONT = 'style="font-family:var(--f-display)"';
const txt = (x: number, y: number, size: number, fill: string, s: string, weight = 700) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="middle">${s}</text>`;
const logo = (x: number, y: number, size: number, fill: string) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="800" fill="${fill}" text-anchor="middle" direction="ltr">tapi<tspan fill="#60A5FA">oo</tspan></text>`;

/** `variant` keeps gradient ids unique (and deterministic for SSR) when the same product renders twice. */
export function productSVG(p: Product, variant: string, lang: Lang) {
  const c = p[lang], art = ART[lang];
  const uid = `${p.id}-${variant}`, a = p.a, ic = ICONS[p.icon](a);
  const defs = `<defs>
    <linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.g[1]}"/><stop offset="1" stop-color="${p.g[0]}"/></linearGradient>
    <linearGradient id="s-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="f-${uid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>`;
  const open = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${c.name}">${defs}`;

  if (p.type === 'card') {
    return `${open}
      <ellipse cx="200" cy="258" rx="140" ry="14" fill="#000" opacity=".3" filter="url(#f-${uid})"/>
      <g transform="translate(200 142) rotate(-7)">
        <rect x="-135" y="-85" width="270" height="170" rx="18" fill="url(#g-${uid})"/>
        <rect x="-135" y="-85" width="270" height="170" rx="18" fill="url(#s-${uid})"/>
        <rect x="-134.5" y="-84.5" width="269" height="169" rx="17.5" fill="none" stroke="${a}" stroke-opacity=".4"/>
        <g transform="translate(82 -8) scale(1.1)">${ic}</g>
        ${txt(-32, p.stars ? -6 : 4, 21, '#fff', c.label)}
        ${p.stars ? starRow(-32, 22, 8.5, 21, a) : txt(-32, 30, 12, a, art.tap, 400)}
        ${nfc(-112, -54, a, 0.75)}
        ${logo(-92, 66, 15, '#fff')}
        <rect x="70" y="46" width="34" height="24" rx="5" fill="${a}" opacity=".75"/>
      </g></svg>`;
  }

  if (p.type === 'stand') {
    return `${open}
      <ellipse cx="200" cy="272" rx="126" ry="12" fill="#000" opacity=".3" filter="url(#f-${uid})"/>
      <path d="M94 252 H306 L294 272 H106 Z" fill="${p.g[0]}"/>
      <rect x="94" y="240" width="212" height="15" rx="5" fill="${p.g[1]}"/>
      <rect x="112" y="18" width="176" height="228" rx="16" fill="url(#g-${uid})"/>
      <path d="M112 34 Q112 18 128 18 H214 L146 246 H128 Q112 246 112 230 Z" fill="#fff" opacity=".07"/>
      <rect x="112.5" y="18.5" width="175" height="227" rx="15.5" fill="none" stroke="${a}" stroke-opacity=".35"/>
      <g transform="translate(200 66)">${ic}</g>
      ${txt(200, 122, 17, '#fff', c.label)}
      ${p.stars ? starRow(200, 142, 7, 17, a) : txt(200, 144, 10, a, art.tapScan, 400)}
      ${qr(172, 162, 56, hash(p.id), p.g[0])}
      ${nfc(250, 190, a, 0.6)}
      ${logo(200, 238, 11, '#fff')}
    </svg>`;
  }

  if (p.type === 'keychain') {
    return `${open}
      <ellipse cx="200" cy="274" rx="80" ry="10" fill="#000" opacity=".28" filter="url(#f-${uid})"/>
      <circle cx="200" cy="44" r="30" fill="none" stroke="#c9d2de" stroke-width="7"/>
      <circle cx="200" cy="44" r="30" fill="none" stroke="#fff" stroke-width="2" stroke-opacity=".6"/>
      <rect x="192" y="70" width="16" height="26" rx="5" fill="#aab6c6"/>
      <g transform="rotate(-6 200 180)">
        <rect x="130" y="92" width="140" height="176" rx="44" fill="url(#g-${uid})"/>
        <rect x="130" y="92" width="140" height="176" rx="44" fill="url(#s-${uid})"/>
        <rect x="130.5" y="92.5" width="139" height="175" rx="43.5" fill="none" stroke="${a}" stroke-opacity=".4"/>
        <circle cx="200" cy="112" r="8" fill="#0B1220" opacity=".55"/>
        <g transform="translate(200 158) scale(.8)">${ic}</g>
        ${txt(200, 212, 15, '#fff', c.label)}
        ${nfc(186, 236, a, 0.45)}
        ${logo(212, 254, 10, '#fff')}
      </g>
    </svg>`;
  }

  if (p.type === 'bracelet') {
    return `${open}
      <ellipse cx="200" cy="262" rx="150" ry="14" fill="#000" opacity=".28" filter="url(#f-${uid})"/>
      <ellipse cx="200" cy="170" rx="150" ry="62" fill="none" stroke="${p.g[0]}" stroke-width="30"/>
      <path d="M50 170 A150 62 0 0 0 350 170" fill="none" stroke="url(#g-${uid})" stroke-width="30"/>
      <path d="M62 186 A140 52 0 0 0 338 186" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="4"/>
      <rect x="138" y="190" width="124" height="68" rx="20" fill="url(#g-${uid})" stroke="${a}" stroke-opacity=".55" stroke-width="2"/>
      <rect x="138" y="190" width="124" height="68" rx="20" fill="url(#s-${uid})"/>
      <g transform="translate(168 224) scale(.55)">${ic}</g>
      ${txt(222, 222, 12, '#fff', c.label)}
      ${logo(222, 244, 10, '#fff')}
    </svg>`;
  }

  // sticker
  return `${open}
    <ellipse cx="200" cy="266" rx="110" ry="11" fill="#000" opacity=".28" filter="url(#f-${uid})"/>
    <circle cx="200" cy="146" r="112" fill="#fff"/>
    <circle cx="200" cy="146" r="101" fill="url(#g-${uid})"/>
    <circle cx="200" cy="146" r="101" fill="url(#s-${uid})"/>
    <circle cx="200" cy="146" r="90" fill="none" stroke="${a}" stroke-opacity=".3" stroke-dasharray="3 6"/>
    <g transform="translate(200 102) scale(.95)">${ic}</g>
    ${txt(200, 158, 18, '#fff', c.label)}
    ${p.stars ? starRow(200, 180, 7, 17, a) : ''}
    ${logo(200, 214, 12, '#fff')}
    <path d="M278 214 Q300 206 306 184 Q284 190 278 214Z" fill="#e9e3d8"/>
  </svg>`;
}
