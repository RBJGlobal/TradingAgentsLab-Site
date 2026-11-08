import Link from 'next/link';
import type { Metadata } from 'next';
import { pageGraphJsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Trading Agents Lab is a carefully built analysis tool, made purely for educational purposes. Free, open-source, AGPL-3.0.',
  alternates: { canonical: '/about/' },
};

export default function About() {
  const jsonLd = pageGraphJsonLd({
    path: '/about/',
    name: 'About',
    description: String(metadata.description), pageType: 'AboutPage',
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section">
        <div className="container-prose">
          <span className="badge">about</span>
          <h1 className="mt-6 text-4xl md:text-5xl">Why this exists.</h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is a carefully built analysis tool, made
            purely for educational purposes. We do not force user
            adoption and we do not provide trading tools. We provide a
            free resource for analysis and learning.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The codebase is a fork of{' '}
            <a
              href="https://github.com/TauricResearch/TradingAgents"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Tauric Research&apos;s TradingAgents
            </a>{' '}
            with substantial extensions for desktop use, cost discipline,
            paper-trading-only data adapters, and outbound webhooks.
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">Positioning, analysis, not execution.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            If you read one sentence on this page, make it this one:
          </p>
          <p
            className="mt-4 rounded border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-tint)] px-6 py-5 text-lg"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Trading Agents Lab is an analysis tool, not an execution
            platform.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The product empowers users with multi-agent LLM analysis to
            make their own trading decisions. It does not execute trades
            on a user&apos;s behalf, not via paper-trading suites that
            look like real trading apps, not via a hidden feature flag,
            not via a future patch.
          </p>
          <ul className="mt-6 space-y-3 text-[var(--color-text-secondary)]">
            <li>
              <strong className="text-[var(--color-text-primary)]">
                No live-trading execution code, ever.
              </strong>{' '}
              Not in the engine, not in the UI, not in distribution builds.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                No full trading suite.
              </strong>{' '}
              No stop-loss management, no sell-order workflow, no order
              routing.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                Defence in depth via endpoint hard-coding.
              </strong>{' '}
              Where the app connects to Alpaca, it connects only to
              paper-trading and data endpoints. Live keys for the live
              endpoint simply have nowhere to go in our code.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                External brokerage via webhooks, on your terms.
              </strong>{' '}
              When a debate finishes, the result can be pushed to your
              own endpoint, which you wire to your own broker on your own
              authorised account.
            </li>
          </ul>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            This is a regulatory firewall, not a temporary scope cut.
            When execution code does not exist in our repository, there
            is structurally nothing to regulate as a trading platform.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <h2 className="text-3xl">A teaching artifact for Clawdemy.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab doubles as a practical case study for{' '}
            <a
              href="https://clawdemy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Clawdemy.org
            </a>
            , a free, open AI-education platform. Students can read the
            source to learn how to design real multi-agent LLM systems
            that ship.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            That case study is now a full course. Clawdemy&apos;s Track
            25,{' '}
            <a
              href="https://clawdemy.org/tracks/ai-agent-teams/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Anatomy of an AI Agent Team
            </a>
            , is dedicated to the TradingAgents framework this app is
            built on. Eight lessons walk the system role by role: why
            one AI becomes many, how an analyst fetches its own data,
            the bull and the bear, the trader, the risk gate,
            orchestration, and memory. The capstone puts you inside a
            real run in Trading Agents Lab itself. If you want to
            understand what happens under the hood before or after you
            download, start there.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            We optimise for readable code over clever code. Decisions
            that surprise a reader carry a comment explaining the why,
            not just the what. The whole system is meant to be
            understood, forked, and improved on.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            If you&apos;re a student, researcher, or educator using this
            as a teaching reference, we&apos;d love to hear from you.
            File an issue on{' '}
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              GitHub
            </a>{' '}
            and tell us what you&apos;re building.
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">Business model: free, no monetisation.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Free. Open source. AGPL-3.0. No subscription, no paywall, no
            premium tier, no enterprise upsell.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            We collect no personal data because we don&apos;t have a
            business that requires it. The marketing site uses one cookieless
            visit counter and nothing else; the desktop app has no telemetry,
            no error-reporting services, no install pings, no accounts, and no
            email collection.{' '}
            <Link href="/security/" className="prose-link">
              Read the security posture →
            </Link>
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            If monetisation is ever considered in the future, the change
            in business model is itself the regulatory inflection point
            and we will engage securities counsel before shipping
            anything.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <h2 className="text-3xl">Family.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab has sibling products from the same
            company. See them all on the{' '}
            <Link href="/family/" className="prose-link">
              family page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">The company behind it.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            RBJ Global LLC builds a family of independent products, and
            much of the work is for awareness and education. Trading
            Agents Lab is part of that: a working multi-agent system that
            anyone can download, read and learn from.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <h2 className="text-3xl">From the founder.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            I learn by examining working systems, and Trading Agents Lab
            gives others that opportunity. Its agents provide a concrete
            way to study how multiple AI roles approach research and
            analysis. Readers can inspect the methods, question the
            outputs and make their own judgments.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            AI is changing many kinds of work. I want people to have open
            examples that help them understand its strengths and limits.
            Trading Agents Lab is one way to explore those ideas in a
            market-research setting. Start small, study what happens, and
            keep learning.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Junaid (Jay) Siddiqi, Founder, RBJ Global LLC &middot;{' '}
            <a
              href="https://www.linkedin.com/in/junaidsiddiqi"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
