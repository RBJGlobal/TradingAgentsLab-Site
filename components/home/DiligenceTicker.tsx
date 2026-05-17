/**
 * DiligenceTicker, decorative ticker row, terminal-style.
 *
 * Renders the universe of symbols a Diligence can run on, NOT live prices.
 * We deliberately do not emit numeric percentage moves: this is a
 * regulator-aware site that says "we don't predict the market" and showing
 * fake percentages, even labelled as decorative, is exactly the AI-washing
 * surface the SEC flagged in 2026. Symbol + an "illustrative" marker only.
 *
 * Marquee uses CSS animation only, no client JS, no client state. The
 * prefers-reduced-motion media block in globals.css disables the animation
 * for users who request it.
 */

const SYMBOLS = [
  'NVDA',
  'TSLA',
  'AAPL',
  'BTC-USD',
  'MSFT',
  'AMZN',
  'META',
  'GOOGL',
  'ETH-USD',
  'SPY',
] as const;

export default function DiligenceTicker() {
  // Repeat twice so the marquee loop has no visible gap.
  const items = [...SYMBOLS, ...SYMBOLS];

  return (
    <div
      className="relative overflow-hidden rounded border border-[var(--color-border-default)] bg-[var(--color-bg-sunken)]"
      role="img"
      aria-label="A sample of tickers Trading Agents Lab can run a Diligence on, illustrative, not live data."
      style={{ padding: '12px 0' }}
    >
      {/* Small "illustrative" label on the left so even sighted users
          who don't read the aria-label understand this is decorative. */}
      <div
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        sample · illustrative
      </div>

      <div
        className="flex animate-[marquee_50s_linear_infinite] whitespace-nowrap pl-40"
        aria-hidden="true"
      >
        {items.map((sym, idx) => (
          <div
            key={`${sym}-${idx}`}
            className="mx-5 flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-[var(--color-text-secondary)]">{sym}</span>
            <span className="text-[var(--color-text-dim)]">·</span>
          </div>
        ))}
      </div>

      {/* Gradient masks to fade the edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg-sunken) 50%, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background:
            'linear-gradient(-90deg, var(--color-bg-sunken), transparent)',
        }}
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="marquee"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
