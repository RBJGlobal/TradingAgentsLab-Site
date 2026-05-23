import Link from 'next/link';
import type { Metadata } from 'next';

interface ProductCardProps {
  name: string;
  href?: string;
  tagline: string;
  description: string;
  /** Marks the current product so visitors get a "you are here" cue. */
  hereLabel?: boolean;
}

function ProductCard({
  name,
  href,
  tagline,
  description,
  hereLabel,
}: ProductCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg text-[var(--color-text-primary)]">{name}</h4>
        {hereLabel ? (
          <span
            className="shrink-0 rounded border border-[var(--color-accent)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            you are here
          </span>
        ) : null}
      </div>
      <p
        className="mt-1 text-xs text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card block"
      >
        {content}
      </a>
    );
  }

  return <div className="card">{content}</div>;
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Trading Agents Lab provides a high-quality, professional-grade tool purely for educational purposes. Free, open-source, AGPL-3.0.',
  alternates: { canonical: '/about/' },
};

export default function About() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">about</span>
          <h1 className="mt-6 text-4xl md:text-5xl">Why this exists.</h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab provides a high-quality, professional-grade
            tool purely for educational purposes. We do not force user
            adoption and we do not provide trading tools. We provide a
            free resource for analysis and learning.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            It is built and maintained by{' '}
            <a
              href="https://rbjglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              RBJ Global
            </a>
            , an independent software studio building practical AI tools.
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
            This is the most important sentence on this page:
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
            </a>{' '}
           , a free, open AI-education platform. Students can read the
            source to learn how to design real multi-agent LLM systems
            that ship.
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
            We don&apos;t collect user data because we don&apos;t have a
            business that requires it. There are no analytics SDKs, no
            telemetry beacons, no error-reporting services, no install
            pings, no accounts, no email collection.{' '}
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
            Trading Agents Lab is part of a small portfolio of
            independent, single-purpose, privacy-first software built by
            RBJ Global.
          </p>

          {/* Parent company callout, visually emphasised with the
              accent tint to mark hierarchy at a glance. */}
          <div className="mt-10 rounded border border-[var(--color-accent-tint)] bg-[var(--color-accent-tint)] p-6">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              parent company
            </span>
            <h3 className="mt-2 text-2xl">
              <a
                href="https://rbjglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              >
                RBJ Global
              </a>
            </h3>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              An independent software studio building practical AI tools
              that respect your time, your money, and your privacy.
            </p>
          </div>

          {/* Visual connector between parent and products, short
              vertical line with a "products" chip at the midpoint. */}
          <div className="mt-2 flex flex-col items-center" aria-hidden="true">
            <div className="h-6 w-px bg-[var(--color-border-strong)]" />
            <span
              className="my-1 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              products
            </span>
            <div className="h-6 w-px bg-[var(--color-border-strong)]" />
          </div>

          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProductCard
              name="Trading Agents Lab"
              tagline="AI-driven Diligence on any ticker."
              description="Multi-agent LLM research lab. Free, open-source, AGPL-3.0."
              hereLabel
            />
            <ProductCard
              name="Clawless"
              href="https://clawless.ai"
              tagline="An operating system for AI."
              description="The host platform that Trading Agents Lab optionally connects to as the standalone trading companion."
            />
            <ProductCard
              name="WhisprDesk"
              href="https://whisprdesk.com"
              tagline="Privacy-first Mac dictation."
              description="No cloud, no transcripts leaving the device."
            />
            <ProductCard
              name="Clawdemy"
              href="https://clawdemy.org"
              tagline="Free AI literacy for the worried generalist."
              description="AI education built for people who fear being left behind, not the curious developer."
            />
          </div>
        </div>
      </section>
    </article>
  );
}
