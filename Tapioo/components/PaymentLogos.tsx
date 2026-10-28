import fs from 'node:fs';
import path from 'node:path';
import { Icon } from './Icons';

/**
 * Accepted payment methods. Official logos are read from /public/payments/
 * (instapay.svg|png, vodafone-cash.svg|png); until a file is there, its name shows as text.
 */
const BRANDS = [
  { id: 'instapay', name: 'InstaPay' },
  { id: 'vodafone-cash', name: 'Vodafone Cash' },
];

export function logoFile(id: string) {
  for (const ext of ['svg', 'png', 'webp']) {
    const rel = `/payments/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return null;
}

export const missingPaymentLogos = () => BRANDS.filter(b => !logoFile(b.id)).map(b => b.name);

export default function PaymentLogos({ label, cod }: { label: string; cod: string }) {
  return (
    <div className="pay" data-reveal>
      <small>{label}</small>
      <div className="pay-row">
        <span className="pay-tile cod"><Icon name="cash" size={22} /> {cod}</span>
        {BRANDS.map(b => {
          const src = logoFile(b.id);
          return (
            <span className="pay-tile" key={b.id}>
              {src ? <img src={src} alt={b.name} height={28} /> : b.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
