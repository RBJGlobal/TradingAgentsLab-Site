import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & privacy',
  description:
    'Trading Agents Lab does not collect user data. No analytics, no telemetry, no accounts. Keys are stored locally in the OS keychain.',
  alternates: { canonical: '/security/' },
};

export default function Security() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">security & privacy</span>
          <h1 className="mt-6 text-4xl md:text-5xl">
            We don&apos;t know you&apos;re here.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is built around a single privacy assumption:
            if we don&apos;t need the data, we don&apos;t collect it.
            Because the product has no business model that requires user
            data, we have built no machinery to capture, store, or
            transmit it.
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">What we don&apos;t do.</h2>
            <ul className="mt-6 space-y-3">
              <Row no>
                No analytics SDKs (no Google Analytics, no Plausible, no
                Fathom, no Cloudflare Web Analytics, even though we host
                on Cloudflare Pages)
              </Row>
              <Row no>No telemetry beacons or remote error reporting</Row>
              <Row no>
                No accounts, no email collection, no sign-up flow at all
              </Row>
              <Row no>No install ping, no update ping, no usage tracking</Row>
              <Row no>
                No cookies (the marketing site uses zero; the desktop app
                uses local storage on disk for preferences only)
              </Row>
              <Row no>
                No third-party scripts on this marketing site (only Google
                Fonts, served via Next.js&apos;s self-hosted font pipeline
                so the request stays on this domain)
              </Row>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">What we do, and where it stays.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The desktop app makes outbound network calls, but only to
              providers you have explicitly configured. Every call goes
              directly from your machine to the provider; we have no
              servers in between, because we have no servers at all.
            </p>

            <div className="mt-8 space-y-4">
              <NetworkCall
                target="Your configured LLM provider"
                detail="OpenAI · Anthropic · OpenRouter · Google Gemini · xAI Grok · MiniMax · or your local Ollama / LM Studio. API key lives in your OS keychain via Electron safeStorage. Never transits any server we control."
              />
              <NetworkCall
                target="Your configured data provider"
                detail="Yahoo Finance (default, no key needed) or Alpaca (your key, locked to data + paper endpoints only)."
              />
              <NetworkCall
                target="Outbound webhooks you configured"
                detail="If you set up Telegram, Slack, Discord, or a custom JSON receiver, the debate result is POSTed to that endpoint. URLs treated as secrets, never logged, never echoed into the persisted History."
              />
              <NetworkCall
                target="OpenRouter courtesy headers"
                detail="If you use OpenRouter, our adapter sends two HTTP headers (HTTP-Referer + X-Title) so they can attribute traffic. Their telemetry, our courtesy. Disabling this is a one-line change you can make in your fork."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">Local storage.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              All persistent state lives on your machine:
            </p>
            <ul className="mt-6 space-y-3 text-[var(--color-text-secondary)]">
              <li>
                <code className="rounded bg-[var(--color-bg-sunken)] px-2 py-0.5 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                  secrets.json
                </code>{' '}
               , encrypted via OS-native primitives (macOS Keychain,
                Windows DPAPI, Linux libsecret). Holds your LLM keys,
                Alpaca keys, webhook URLs.
              </li>
              <li>
                <code className="rounded bg-[var(--color-bg-sunken)] px-2 py-0.5 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                  sessions.db
                </code>{' '}
               , SQLite database of your previous Diligence runs. Lives
                under your user data directory. Delete it at any time and
                the app re-creates an empty one.
              </li>
              <li>
                Local preferences (window size, theme mode, last-used
                provider) via standard{' '}
                <code className="rounded bg-[var(--color-bg-sunken)] px-2 py-0.5 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                  localStorage
                </code>
                .
              </li>
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Settings → About inside the desktop app shows the absolute
              path to each of these files, so you can back them up,
              inspect them, or move them between machines.{' '}
              <Link href="/docs/security-and-storage/" className="prose-link">
                Read the full storage doc →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">Source is the spec.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              AGPL-3.0 means the entire codebase is open to inspection.
              You don&apos;t need to trust our copy on this page, read
              the source.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/RBJGlobal/TradingAgentsLab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open the repository
              </a>
              <a
                href="https://github.com/RBJGlobal/TradingAgentsLab/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Read AGPL-3.0
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Row({
  ok,
  no,
  children,
}: {
  ok?: boolean;
  no?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 border-b border-[var(--color-border-muted)] py-3">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        style={{
          backgroundColor: ok
            ? 'rgba(63, 185, 80, 0.15)'
            : 'rgba(248, 81, 73, 0.12)',
          color: ok ? 'var(--color-buy)' : 'var(--color-sell)',
        }}
      >
        {ok ? '✓' : '×'}
      </span>
      <span className="text-[var(--color-text-secondary)]">{children}</span>
    </li>
  );
}

function NetworkCall({
  target,
  detail,
}: {
  target: string;
  detail: string;
}) {
  return (
    <div className="rounded border border-[var(--color-border-muted)] bg-[var(--color-bg-card)] p-5">
      <div
        className="text-sm text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        → {target}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {detail}
      </p>
    </div>
  );
}
