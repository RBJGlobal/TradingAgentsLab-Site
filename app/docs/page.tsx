import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

const DESCRIPTION =
  'Documentation for Trading Agents Lab and Trading Agents Lab Pro, multi-agent LLM trading research, end to end.';

export const metadata: Metadata = {
  title: 'Documentation',
  description: DESCRIPTION,
  alternates: { canonical: '/docs/' },
};

// The docs come in two sets, one per desktop app. This landing page points
// to each set's index; the sets themselves live at /docs/lite/ and /docs/pro/.
const SETS = [
  {
    href: '/docs/lite/',
    title: 'Lite app docs',
    app: 'Trading Agents Lab',
    blurb:
      'For quick analysis: a full agent debate in about a minute. Install, configure, and learn to read the debate.',
    start: '/docs/lite/getting-started/',
  },
  {
    href: '/docs/pro/',
    title: 'Pro app docs',
    app: 'Trading Agents Lab Pro',
    blurb:
      'For full-depth diligence: the upstream project’s complete research pipeline, with live tool calls and multi-round debates. Written for the signed macOS download.',
    start: '/docs/pro/getting-started/',
  },
];

export default function DocsIndex() {
  // The /docs landing is a listing, not an article, so CollectionPage (not
  // TechArticle) is the right type here, paired with a BreadcrumbList.
  const docsUrl = `${SITE_URL}/docs/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Documentation',
        description: DESCRIPTION,
        url: docsUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Documentation', item: docsUrl },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <span className="badge">documentation</span>
      <h1 className="mt-4 text-4xl">Read the source.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
        Trading Agents Lab comes as two desktop apps, and each has its own
        documentation. Both apps are free and open source under AGPL-3.0;
        the difference is depth, time, and what a run consumes. The docs are
        published here so anyone can learn from them, not just users.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {SETS.map((s) => (
          <div key={s.href} className="card flex flex-col">
            <span
              className="text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.app}
            </span>
            <h2 className="mt-1 text-2xl">
              <Link href={s.href} className="hover:text-[var(--color-accent)]">
                {s.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {s.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href={s.href} className="prose-link">
                All {s.title.replace(' docs', '')} docs
              </Link>
              <Link href={s.start} className="prose-link">
                Getting started
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-[var(--color-text-muted)]">
        Not sure which app you have, or which to start with? See{' '}
        <Link href="/docs/lite/pro/" className="prose-link">
          what the Pro app adds
        </Link>{' '}
        or compare both on the{' '}
        <Link href="/download/" className="prose-link">
          download page
        </Link>
        .
      </p>

      <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-muted)]">
        Coming from the open-source project?{' '}
        <Link href="/tradingagents-desktop/" className="prose-link">
          Run TradingAgents as a desktop app
        </Link>
        . Designed as a teaching artifact for{' '}
        <a
          href="https://clawdemy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link"
        >
          Clawdemy
        </a>{' '}
        and other AI-education programs. If you&apos;re here to understand
        agentic systems, start with{' '}
        <Link href="/docs/lite/how-it-works/" className="prose-link">
          How it works
        </Link>{' '}
        and{' '}
        <Link href="/docs/lite/reading-the-debate/" className="prose-link">
          Reading the debate
        </Link>
        .
      </p>
    </article>
  );
}
