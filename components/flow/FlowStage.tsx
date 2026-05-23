import type { ReactNode } from 'react';

/**
 * Branded "stage" wrapper for React Flow charts.
 *
 * Four layers, back to front: a dark layered radial-gradient background with
 * an amber glow in the upper-left, a faint engineered grid masked to fade at
 * the edges, a large faint logo watermark bleeding off the top-right corner,
 * and a brand lockup pinned top-left. The chart renders as children on top.
 *
 * This is the TAL-amber translation of the RBJ Global family pattern (the
 * same treatment ClaudeLink uses on its mesh viz) so the charts read as one
 * product line. Palette mirrors the site theme: amber #f0a830 over the dark
 * #0d1117 / #090c10 surfaces. Sizes scale down on mobile so the watermark and
 * lockup don't crowd the nodes on a narrow panel.
 */
export default function FlowStage({
  children,
  mobile = false,
  height,
}: {
  children: ReactNode;
  mobile?: boolean;
  height?: number;
}) {
  const h = height ?? (mobile ? 460 : 620);
  const watermarkSize = mobile ? 220 : 440;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: h,
        borderRadius: 16,
        border: '1px solid rgba(240, 168, 48, 0.18)',
        boxShadow: '0 30px 80px -24px rgba(240, 168, 48, 0.22)',
        background:
          'radial-gradient(52% 44% at 16% 12%, rgba(240,168,48,0.16) 0%, transparent 62%),' +
          ' radial-gradient(110% 80% at 50% 14%, #1a2230 0%, #121821 40%, #0d1117 76%, #090c10 100%)',
      }}
    >
      {/* Engineered grid lines, radially masked so they fade at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(240,168,48,0.06) 1px, transparent 1px),' +
            ' linear-gradient(90deg, rgba(240,168,48,0.06) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(78% 78% at 50% 42%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(78% 78% at 50% 42%, #000 30%, transparent 100%)',
        }}
      />

      {/* Large faint logo watermark, bleeding off the top-right corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ right: mobile ? -40 : -64, top: mobile ? -56 : -80, opacity: 0.06 }}
      >
        <StageLogo size={watermarkSize} />
      </div>

      {/* Brand lockup pinned top-left, above the chart. */}
      <div
        className="pointer-events-none absolute z-20 flex items-center"
        style={{ left: mobile ? 16 : 24, top: mobile ? 14 : 18, gap: 9 }}
      >
        <StageLogo size={mobile ? 22 : 26} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: mobile ? 12 : 15,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Trading Agents Lab
        </span>
      </div>

      {children}
    </div>
  );
}

/**
 * The mark, scalable. Same geometry as the Navbar logo (amber compass on
 * dark) but hard-coded hexes rather than CSS vars so the watermark renders
 * identically inside the static-export prerender (the SVG <pattern>/var path
 * is fragile under export — see reference notes).
 */
function StageLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#f0a830" strokeWidth="1.5" opacity="0.7" />
      <path d="M16 4 L18 16 L16 28 L14 16 Z" fill="#f0a830" />
      <path d="M4 16 L16 14 L28 16 L16 18 Z" fill="#f0a830" opacity="0.55" />
      <circle cx="16" cy="16" r="1.4" fill="#0d1117" />
    </svg>
  );
}
