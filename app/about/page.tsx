import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Trading Agents Lab provides a high-quality, professional-grade tool purely for educational purposes. Free, open-source, AGPL-3.0.',
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
            adoption and we do not provide trading tools — we provide a
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
          <h2 className="text-3xl">Positioning — analysis, not execution.</h2>
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
            on a user&apos;s behalf — not via paper-trading suites that
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
            — a free, open AI-education platform. Students can read the
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
              href="https://github.com/jaysidd/TradingAgentsLab"
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
          <h2 className="text-3xl">Business model — free, no monetisation.</h2>
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
            Trading Agents Lab is part of a small family of independent,
            single-purpose, privacy-first software:
          </p>
          <ul className="mt-6 space-y-4">
            <li>
              <strong className="text-[var(--color-text-primary)]">
                <a
                  href="https://clawless.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Clawless
                </a>
              </strong>{' '}
              — operating system for AI. Trading Agents Lab is the{' '}
              <em>standalone trading companion for Clawless</em>; it works
              perfectly on its own and connects optionally.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                <a
                  href="https://whisperdesk.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  WhisperDesk
                </a>
              </strong>{' '}
              — privacy-first Mac dictation. No cloud, no transcripts
              leaving the device.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                <a
                  href="https://clawdemy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Clawdemy
                </a>
              </strong>{' '}
              — free AI education for the worried generalist.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                <a
                  href="https://rbjglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  RBJ Global
                </a>
              </strong>{' '}
              — the studio behind the family.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
