'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocMeta, DocSet } from '@/lib/docs';

/**
 * Grouped sidebar for the docs section.
 *
 * Marked `'use client'` so we can read `usePathname()` and highlight the
 * currently-active doc. The parent layout passes the doc list (filesystem
 * read at build time), and we derive the active slug from the pathname , 
 * keeps the layout itself a Server Component while letting the sidebar
 * react to navigation.
 *
 * The docs come in two sets (Lite app, Pro app). The sidebar lists the set
 * in the current path (the Lite set on the /docs/ landing) and opens with
 * the Lite/Pro switch. On a doc page the switch goes to the same slug in the
 * other set when that page exists, otherwise to the other set's index.
 */

interface Props {
  docsBySet: Record<DocSet, DocMeta[]>;
}

const SET_ORDER: DocSet[] = ['lite', 'pro'];
const SET_LABELS: Record<DocSet, string> = { lite: 'Lite app', pro: 'Pro app' };

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
      'pro',
    ],
  },
];

function parsePathname(pathname: string | null): {
  set?: DocSet;
  slug?: string;
} {
  if (!pathname) return {};
  // /docs/pro/getting-started/ → { set: "pro", slug: "getting-started" }
  // /docs/lite/ → { set: "lite" }
  const m = pathname.match(/^\/docs\/(lite|pro)(?:\/([a-z0-9-]+))?\/?$/i);
  if (!m) return {};
  return { set: m[1].toLowerCase() as DocSet, slug: m[2] };
}

export default function DocsSidebar({ docsBySet }: Props) {
  const pathname = usePathname();
  const { set: pathSet, slug: activeSlug } = parsePathname(pathname);
  const set: DocSet = pathSet ?? 'lite';
  const docs = docsBySet[set];

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

  const switchHref = (target: DocSet) => {
    if (activeSlug && docsBySet[target].some((d) => d.slug === activeSlug)) {
      return `/docs/${target}/${activeSlug}/`;
    }
    return `/docs/${target}/`;
  };

  return (
    <nav aria-label="Docs" className="space-y-8 text-sm">
      <div
        role="group"
        aria-label="Choose the docs for your app"
        data-testid="docs-set-switch"
        className="grid grid-cols-2 gap-1 rounded border border-[var(--color-border-muted)] p-1"
      >
        {SET_ORDER.map((target) => {
          const isActive = pathSet === target;
          return (
            <Link
              key={target}
              href={switchHref(target)}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded px-2 py-1.5 text-center transition-colors ${
                isActive
                  ? 'bg-[var(--color-accent-tint)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {SET_LABELS[target]}
            </Link>
          );
        })}
      </div>
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
                    href={`/docs/${set}/${slug}/`}
                    aria-current={isActive ? 'page' : undefined}
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
