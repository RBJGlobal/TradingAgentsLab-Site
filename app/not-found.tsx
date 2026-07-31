import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'The page you are looking for does not exist on tradingagentslab.ai.',
};

export default function NotFound() {
  return (
    <article>
      <section className="section">
        <div className="container-prose text-center">
          <span className="badge">404</span>
          <h1 className="mt-6 text-4xl md:text-5xl">Page not found.</h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The page you are looking for does not exist. The URL may be out
            of date, or the page may have moved.
          </p>
          <p className="mt-8">
            <Link href="/" className="prose-link">
              Back to home
            </Link>
            <span className="mx-3 text-[var(--color-text-muted)]">·</span>
            <Link href="/docs/" className="prose-link">
              Browse the docs
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
