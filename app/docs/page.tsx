import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllDocs } from '@/lib/docs';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Comprehensive documentation for Trading Agents Lab, multi-agent LLM trading research, end to end.',
  alternates: { canonical: '/docs/' },
};

// Topic clusters group the knowledge base into reading paths and give each
// high-traffic doc descriptive, contextual links from a single hub. Slugs are
// the source of truth from `content/docs/` (synced from the product repo); any
// doc not listed here still appears under "More guides", so new synced docs are
// never dropped.
const CLUSTERS: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: 'Start here',
    blurb:
      'Install the desktop app, run your first diligence, and learn to read what the agents produce.',
    slugs: ['getting-started', 'how-it-works', 'reading-the-debate'],
  },
  {
    title: 'Models & providers',
    blurb:
      'Pick a model, run local with Ollama or LM Studio, use a ChatGPT plan via OAuth, and keep token cost in check.',
    slugs: ['configuring-llm-providers', 'local-llm', 'oauth', 'cost-guard'],
  },
  {
    title: 'Data & markets',
    blurb:
      'Wire up market data, run any ticker including crypto, and fold sentiment into the debate.',
    slugs: ['data-providers', 'crypto-tickers', 'sentiment'],
  },
  {
    title: 'Connect & automate',
    blurb:
      'Push results to webhooks, connect the Clawless desktop agent, and move faster with shortcuts.',
    slugs: ['webhooks', 'clawless-connector', 'keyboard-shortcuts'],
  },
  {
    title: 'Operate',
    blurb:
      'Where your keys and runs live, how to fix common issues, and answers to frequent questions.',
    slugs: ['security-and-storage', 'troubleshooting', 'faq'],
  },
];

export default function DocsIndex() {
  const docs = getAllDocs();
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const claimed = new Set(CLUSTERS.flatMap((c) => c.slugs));
  const leftovers = docs.filter((d) => !claimed.has(d.slug));

  const sections = [
    ...CLUSTERS.map((c) => ({
      title: c.title,
      blurb: c.blurb,
      docs: c.slugs.map((s) => bySlug.get(s)).filter(Boolean),
    })),
    ...(leftovers.length
      ? [{ title: 'More guides', blurb: '', docs: leftovers }]
      : []),
  ];

  // The /docs index is a listing, not an article, so CollectionPage (not
  // TechArticle) is the right type here; pair it with a BreadcrumbList so the
  // hub itself carries schema (it previously had none).
  const docsUrl = `${SITE_URL}/docs/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Documentation',
        description:
          'Comprehensive documentation for Trading Agents Lab, multi-agent LLM trading research, end to end.',
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
        Everything you need to install, configure, and reason about Trading
        Agents Lab. The same documentation that ships inside the desktop
        app&apos;s Help menu, published here so anyone can learn from it,
        not just users.
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
        <Link href="/docs/how-it-works/" className="prose-link">
          How it works
        </Link>{' '}
        and{' '}
        <Link href="/docs/reading-the-debate/" className="prose-link">
          Reading the debate
        </Link>
        .
      </p>

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl">{section.title}</h2>
            {section.blurb ? (
              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
                {section.blurb}
              </p>
            ) : null}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {section.docs.map((doc) => (
                <Link
                  key={doc!.slug}
                  href={`/docs/${doc!.slug}/`}
                  className="card flex flex-col"
                >
                  <h3 className="text-lg">{doc!.title}</h3>
                  {doc!.description ? (
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {doc!.description}
                    </p>
                  ) : (
                    <p
                      className="mt-2 text-xs text-[var(--color-text-muted)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      /docs/{doc!.slug}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
