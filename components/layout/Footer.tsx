import Link from 'next/link';

// TradingAgentsLab-specific LinkedIn company page.
const LINKEDIN_URL = 'https://www.linkedin.com/company/117584287/';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/', label: 'Overview' },
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/download/', label: 'Download' },
      {
        href: 'https://github.com/RBJGlobal/TradingAgentsLab',
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
    // Collapsed per family-wide /family rollout (2026-05-18). Footer used
    // to enumerate every sibling; now it points to the dedicated /family
    // page, which carries the JSON-LD parent + subOrganization graph and
    // the full per-sibling descriptions. One internal link, no parent
    // flag needed, no per-sibling enumeration to keep in sync across
    // sites.
    links: [
      { href: '/family/', label: 'Part of the RBJ Global family →' },
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
                {col.links.map((link) => {
                  const isParent = 'parent' in link && link.parent;
                  return (
                    <li
                      key={link.href}
                      className={
                        isParent
                          ? 'mb-3 border-b border-[var(--color-border-muted)] pb-3'
                          : ''
                      }
                    >
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          <span>{link.label}</span>
                          {isParent ? (
                            <span
                              className="rounded border border-[var(--color-accent-tint)] bg-[var(--color-accent-tint)] px-1.5 py-px text-[9px] uppercase tracking-widest text-[var(--color-accent)]"
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              parent
                            </span>
                          ) : null}
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
                  );
                })}
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
            <div className="flex items-center gap-5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on LinkedIn. Opens LinkedIn in a new tab."
                data-testid="footer-linkedin-link"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <LinkedInMark />
                <span>LinkedIn</span>
              </a>
              <p
                className="text-xs text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                No analytics · No tracking · No accounts
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
