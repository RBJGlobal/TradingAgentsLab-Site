import Link from 'next/link';

const NAV = [
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/docs/', label: 'Docs' },
  { href: '/about/', label: 'About' },
  { href: '/security/', label: 'Security' },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-default)] bg-[var(--color-bg-base-translucent)] backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Trading Agents Lab — home"
        >
          <Logo />
          <span
            className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Trading Agents Lab
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/download/" className="btn-primary">
            Download
          </Link>
        </nav>

        {/* Mobile — links collapse to a download CTA; full nav lives in
            footer for now. Keeps the mobile header from getting cluttered. */}
        <div className="md:hidden">
          <Link href="/download/" className="btn-primary">
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Amber compass rose — mirrors the desktop app icon */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M16 4 L18 16 L16 28 L14 16 Z"
        fill="var(--color-accent)"
      />
      <path
        d="M4 16 L16 14 L28 16 L16 18 Z"
        fill="var(--color-accent)"
        opacity="0.55"
      />
      <circle cx="16" cy="16" r="1.4" fill="var(--color-bg-base)" />
    </svg>
  );
}
