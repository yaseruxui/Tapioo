/** Compact reassurance row ("Cash on delivery · 1-year warranty · …") shown next to buy buttons. */
export default function AssureLine({ items }: { items: string[] }) {
  return (
    <ul className="assure-line">
      {items.map(x => <li key={x}>{x}</li>)}
    </ul>
  );
}
