export default function NfcIcon({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
      <path d="M18 16a12 12 0 0 1 0 16" />
      <path d="M25 10a20 20 0 0 1 0 28" />
      <path d="M32 4a28 28 0 0 1 0 40" />
    </svg>
  );
}
