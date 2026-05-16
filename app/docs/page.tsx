import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllDocs } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Comprehensive documentation for Trading Agents Lab — multi-agent LLM trading research, end to end.',
};

export default function DocsIndex() {
  const docs = getAllDocs();

  return (
    <article>
      <span className="badge">documentation</span>
      <h1 className="mt-4 text-4xl">Read the source.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
        Everything you need to install, configure, and reason about Trading
        Agents Lab. The same documentation that ships inside the desktop
        app&apos;s Help menu — published here so anyone can learn from it,
        not just users.
      </p>

      <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-muted)]">
        Designed as a teaching artifact for{' '}
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

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}/`}
            className="card flex flex-col"
          >
            <h2 className="text-lg">{doc.title}</h2>
            {doc.description ? (
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {doc.description}
              </p>
            ) : (
              <p
                className="mt-2 text-xs text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                /docs/{doc.slug}
              </p>
            )}
          </Link>
        ))}
      </div>
    </article>
  );
}
