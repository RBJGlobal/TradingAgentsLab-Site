/**
 * DiligenceTicker — purely decorative ticker row, terminal-style.
 *
 * Renders as static CSS only — no client JS — so it doesn't violate the
 * "zero JS-runtime tracking" posture or harm Core Web Vitals. The marquee
 * scroll uses prefers-reduced-motion to disable for accessibility.
 */

const SYMBOLS = [
  { sym: 'NVDA', mv: '+1.84%', tone: 'up' },
  { sym: 'TSLA', mv: '-0.42%', tone: 'down' },
  { sym: 'AAPL', mv: '+0.27%', tone: 'up' },
  { sym: 'BTC-USD', mv: '+2.11%', tone: 'up' },
  { sym: 'MSFT', mv: '+0.55%', tone: 'up' },
  { sym: 'AMZN', mv: '-0.18%', tone: 'down' },
  { sym: 'META', mv: '+1.02%', tone: 'up' },
  { sym: 'GOOGL', mv: '+0.34%', tone: 'up' },
  { sym: 'ETH-USD', mv: '+1.47%', tone: 'up' },
  { sym: 'SPY', mv: '+0.11%', tone: 'up' },
] as const;

export default function DiligenceTicker() {
  // Repeat twice so the marquee loop has no visible gap.
  const items = [...SYMBOLS, ...SYMBOLS];

  return (
    <div
      className="relative overflow-hidden rounded border border-[var(--color-border-default)] bg-[var(--color-bg-sunken)]"
      style={{ padding: '12px 0' }}
      aria-hidden="true"
    >
      <div className="flex animate-[marquee_50s_linear_infinite] whitespace-nowrap">
        {items.map((item, idx) => (
          <div
            key={`${item.sym}-${idx}`}
            className="mx-6 flex items-center gap-3 text-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-[var(--color-text-muted)]">{item.sym}</span>
            <span
              style={{
                color:
                  item.tone === 'up'
                    ? 'var(--color-buy)'
                    : 'var(--color-sell)',
              }}
            >
              {item.mv}
            </span>
            <span className="text-[var(--color-text-dim)]">·</span>
          </div>
        ))}
      </div>

      {/* Gradient masks to fade the edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg-sunken), transparent)',
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
