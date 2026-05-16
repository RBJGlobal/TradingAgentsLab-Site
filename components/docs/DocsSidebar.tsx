import Link from 'next/link';
import type { DocMeta } from '@/lib/docs';

/**
 * Grouped sidebar for the docs section.
 *
 * We hand-curate the ordering and grouping for the published KB. The
 * `kbCategoryFor` map is small enough to live inline; the alternative
 * (front-matter in every .md) means the docs in the main app repo would
 * carry site-specific metadata, which we want to avoid.
 */

interface Props {
  docs: DocMeta[];
  activeSlug?: string;
}

const GROUPS: Array<{ name: string; slugs: string[] }> = [
  {
    name: 'Get started',
    slugs: ['getting-started', 'how-it-works', 'reading-the-debate'],
  },
  {
    name: 'Configure',
    slugs: [
      'configuring-llm-providers',
      'oauth',
      'local-llm',
      'data-providers',
      'cost-guard',
      'webhooks',
      'clawless-connector',
    ],
  },
  {
    name: 'Reference',
    slugs: [
      'crypto-tickers',
      'sentiment',
      'keyboard-shortcuts',
      'security-and-storage',
      'troubleshooting',
      'faq',
    ],
  },
];

export default function DocsSidebar({ docs, activeSlug }: Props) {
  // Build a slug → meta map so we can render in our curated order and
  // fall through to "Other" for anything new in the KB we haven't placed.
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const placedSlugs = new Set(GROUPS.flatMap((g) => g.slugs));
  const orphans = docs
    .filter((d) => !placedSlugs.has(d.slug))
    .map((d) => d.slug);

  const groups =
    orphans.length > 0
      ? [...GROUPS, { name: 'Other', slugs: orphans }]
      : GROUPS;

  return (
    <nav aria-label="Docs" className="space-y-8 text-sm">
      {groups.map((group) => (
        <div key={group.name}>
          <h3
            className="mb-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {group.name}
          </h3>
          <ul className="space-y-1.5">
            {group.slugs.map((slug) => {
              const doc = bySlug.get(slug);
              if (!doc) return null;
              const isActive = slug === activeSlug;
              return (
                <li key={slug}>
                  <Link
                    href={`/docs/${slug}/`}
                    className={`block rounded px-2 py-1.5 transition-colors ${
                      isActive
                        ? 'bg-[var(--color-accent-tint)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
