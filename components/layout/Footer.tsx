import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/', label: 'Overview' },
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/download/', label: 'Download' },
      {
        href: 'https://github.com/jaysidd/TradingAgentsLab',
        label: 'GitHub',
        external: true,
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/docs/', label: 'Documentation' },
      { href: '/docs/getting-started/', label: 'Getting started' },
      { href: '/docs/how-it-works/', label: 'How it works (deep dive)' },
      { href: '/docs/reading-the-debate/', label: 'Reading a Diligence run' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { href: '/security/', label: 'Security & privacy' },
      { href: '/about/', label: 'About' },
      { href: '/legal/disclaimer/', label: 'Disclaimer' },
      { href: '/legal/privacy/', label: 'Privacy policy' },
      { href: '/legal/terms/', label: 'Terms of use' },
    ],
  },
  {
    title: 'Family',
    links: [
      { href: 'https://clawless.ai', label: 'Clawless', external: true },
      { href: 'https://clawdemy.org', label: 'Clawdemy', external: true },
      { href: 'https://whisperdesk.ai', label: 'WhisperDesk', external: true },
      { href: 'https://rbjglobal.com', label: 'RBJ Global', external: true },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border-default)] bg-[var(--color-bg-sunken)]">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-4 text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-border-muted)] pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p
              className="text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              © {new Date().getFullYear()} Trading Agents Lab. AGPL-3.0
              licensed. Forked from{' '}
              <a
                href="https://github.com/TauricResearch/TradingAgents"
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link"
              >
                Tauric Research/TradingAgents
              </a>{' '}
              (Apache-2.0).
            </p>
            <p
              className="text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              No analytics · No tracking · No accounts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
