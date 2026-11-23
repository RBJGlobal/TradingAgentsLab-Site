import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DOC_SETS,
  DOC_SET_LABELS,
  getAllDocs,
  isDocSet,
  type DocSet,
} from '@/lib/docs';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

interface Props {
  params: Promise<{ set: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_SETS.map((set) => ({ set }));
}

const SET_COPY: Record<
  DocSet,
  { title: string; description: string; heading: string; intro: string }
> = {
  lite: {
    title: 'Lite app documentation',
    description:
      'Documentation for Trading Agents Lab, the Lite app for quick analysis: install, configure, and read a full agent debate.',
    heading: 'Lite app docs.',
    intro:
      'Everything you need to install, configure, and reason about Trading Agents Lab, the Lite app for quick analysis: a full agent debate in about a minute. The same documentation that ships inside the desktop app’s Help menu.',
  },
  pro: {
    title: 'Pro app documentation',
    description:
      'Documentation for Trading Agents Lab Pro, the desktop app for full-depth diligence: install, configure, and read a full research run.',
    heading: 'Pro app docs.',
    intro:
      'Everything you need to install, configure, and reason about Trading Agents Lab Pro, the desktop app for full-depth diligence: the upstream project’s complete research pipeline, with live tool calls and multi-round debates. Written for the signed macOS download.',
  },
};

// Topic clusters group each set into reading paths and give each high-traffic
// doc descriptive, contextual links from a single hub. Slugs are the source of
// truth from `content/docs/<set>/` (synced from the product repos); a slug a
// set does not have is skipped, and any doc not listed here still appears
// under "More guides", so new synced docs are never dropped.
const CLUSTERS: {
  title: string;
  blurb: Record<DocSet, string>;
  slugs: string[];
}[] = [
  {
    title: 'Start here',
    blurb: {
      lite: 'Install the desktop app, run your first diligence, and learn to read what the agents produce.',
      pro: 'Install the desktop app, run your first analysis, and learn to read what the agents produce.',
    },
    slugs: ['getting-started', 'how-it-works', 'reading-the-debate'],
  },
  {
    title: 'Models & providers',
    blurb: {
      lite: 'Pick a model, run local with Ollama or LM Studio, use a ChatGPT plan via OAuth, and keep token cost in check.',
      pro: 'Pick a model, run local with Ollama or LM Studio, use a ChatGPT plan via OAuth, and keep token cost in check.',
    },
    slugs: ['configuring-llm-providers', 'local-llm', 'oauth', 'cost-guard'],
  },
  {
    title: 'Data & markets',
    blurb: {
      lite: 'Wire up market data, run any ticker including crypto, and fold sentiment into the debate.',
      pro: 'Wire up market data, run any ticker including crypto, and fold sentiment into the debate.',
    },
    slugs: ['data-providers', 'crypto-tickers', 'sentiment'],
  },
  {
    title: 'Connect & automate',
    blurb: {
      lite: 'Push results to webhooks and move faster with keyboard shortcuts.',
      pro: 'Push results to webhooks and move faster with keyboard shortcuts.',
    },
    slugs: ['webhooks', 'keyboard-shortcuts'],
  },
  {
    title: 'Operate',
    blurb: {
      lite: 'Where your keys and runs live, how to fix common issues, answers to frequent questions, and what the Pro app adds.',
      pro: 'Where your keys and runs live, how to fix common issues, and answers to frequent questions.',
    },
    slugs: ['security-and-storage', 'troubleshooting', 'faq', 'pro'],
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { set } = await params;
  if (!isDocSet(set)) return { title: 'Not found' };
  return {
    title: SET_COPY[set].title,
    description: SET_COPY[set].description,
    alternates: { canonical: `/docs/${set}/` },
  };
}

export default async function DocsSetIndex({ params }: Props) {
  const { set } = await params;
  if (!isDocSet(set)) notFound();
  const copy = SET_COPY[set];

  const docs = getAllDocs(set);
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const claimed = new Set(CLUSTERS.flatMap((c) => c.slugs));
  const leftovers = docs.filter((d) => !claimed.has(d.slug));

  const sections = [
    ...CLUSTERS.map((c) => ({
      title: c.title,
      blurb: c.blurb[set],
      docs: c.slugs.map((s) => bySlug.get(s)).filter(Boolean),
    })),
    ...(leftovers.length
      ? [{ title: 'More guides', blurb: '', docs: leftovers }]
      : []),
  ].filter((section) => section.docs.length > 0);

  const docsUrl = `${SITE_URL}/docs/`;
  const setUrl = `${SITE_URL}/docs/${set}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: copy.title,
        description: copy.description,
        url: setUrl,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: `${DOC_SET_LABELS[set]} docs`,
            item: setUrl,
          },
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
      <div className="mb-6">
        <Link
          href="/docs/"
          className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← documentation home
        </Link>
      </div>
      <span className="badge">documentation</span>
      <h1 className="mt-4 text-4xl">{copy.heading}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
        {copy.intro}
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
                  href={`/docs/${set}/${doc!.slug}/`}
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
                      /docs/{set}/{doc!.slug}
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
