import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Trading Agents Lab collects zero user data. No analytics, no telemetry, no accounts. This page explains the full posture.',
};

export default function PrivacyPolicy() {
  return (
    <article className="container-prose section">
      <span className="badge">legal · privacy</span>
      <h1 className="mt-6 text-4xl">Privacy Policy</h1>
      <p
        className="mt-3 text-xs text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Last updated: 2026-05-16
      </p>

      <div className="docs-prose mt-10">
        <h2>The short version.</h2>
        <p>
          Trading Agents Lab does not collect, store, or transmit any
          personal data. We have no servers that you talk to. We have
          no accounts, no email collection, no analytics, no telemetry,
          and no install pings. When you use the desktop application,
          the only outbound network calls go directly from your machine
          to the providers <em>you</em> configure.
        </p>

        <h2>What this policy covers.</h2>
        <p>
          This Privacy Policy covers (a) the marketing website at{' '}
          <code>tradingagentslab.com</code> (and any aliases), and (b) the
          desktop application Trading Agents Lab distributed via{' '}
          <a
            href="https://github.com/jaysidd/TradingAgentsLab"
            target="_blank"
            rel="noopener noreferrer"
          >
            our GitHub repository
          </a>
          .
        </p>

        <h2>The marketing website.</h2>
        <p>
          This site is a static export served from Cloudflare Pages. It
          uses:
        </p>
        <ul>
          <li>
            <strong>No analytics.</strong> No Google Analytics, no
            Plausible, no Fathom, no Cloudflare Web Analytics. (Cloudflare
            edge-level request logs may exist on Cloudflare&apos;s side
            per their standard infrastructure — we do not access them and
            we have not enabled any analytics product on top of them.)
          </li>
          <li>
            <strong>No cookies.</strong> The site sets zero cookies.
          </li>
          <li>
            <strong>No third-party scripts.</strong> The only external
            asset is Google Fonts, which Next.js serves via its
            self-hosted font pipeline so the request stays on this domain
            at build time.
          </li>
          <li>
            <strong>No forms.</strong> There is nothing to fill in. There
            is no newsletter, no contact form, no signup.
          </li>
        </ul>

        <h2>The desktop application.</h2>
        <p>
          The application runs on your machine. Outbound network calls
          are limited to providers you explicitly configure:
        </p>
        <ul>
          <li>
            <strong>Your LLM provider</strong> — OpenAI, Anthropic,
            OpenRouter, Google Gemini, or a local model via Ollama / LM
            Studio. The API key lives in your operating system&apos;s
            keychain (macOS Keychain, Windows DPAPI, Linux libsecret)
            via Electron&apos;s <code>safeStorage</code> API. The key
            never transits any server we control because we do not
            operate any servers.
          </li>
          <li>
            <strong>Your data provider</strong> — Yahoo Finance (default,
            no key needed) and Alpaca (if you configure keys; locked to
            data and paper-trading endpoints only).
          </li>
          <li>
            <strong>Webhook receivers you configured</strong> — when a
            Diligence completes, the application POSTs the result to the
            URLs you set in Settings → Webhooks. URLs are treated as
            secrets: never logged, never echoed into the persisted
            History.
          </li>
          <li>
            <strong>OpenRouter courtesy headers</strong> — if you use
            OpenRouter as your LLM provider, our adapter sends two HTTP
            headers (<code>HTTP-Referer</code> and <code>X-Title</code>)
            so OpenRouter can attribute traffic. This is their telemetry,
            our courtesy. Disabling it is a one-line code change in your
            fork.
          </li>
        </ul>

        <h2>What we store on your machine.</h2>
        <ul>
          <li>
            <code>secrets.json</code> — encrypted via OS keychain
            primitives. Holds API keys, webhook URLs, and similar
            credentials.
          </li>
          <li>
            <code>sessions.db</code> — SQLite database of your previous
            Diligence runs. Local-only.
          </li>
          <li>
            Local preferences (window size, last-used provider, sort
            order) in standard <code>localStorage</code>.
          </li>
        </ul>
        <p>
          You can delete any of these files at any time; the application
          recreates an empty version on next launch. Settings → About in
          the app shows the absolute path to each.
        </p>

        <h2>Children.</h2>
        <p>
          Trading Agents Lab is not directed to children under 13 and we
          do not knowingly collect personal information from anyone
          because we do not collect personal information from anyone at
          all.
        </p>

        <h2>Changes to this policy.</h2>
        <p>
          We will update the &quot;Last updated&quot; date above when
          this policy changes. The full revision history is available in
          our public GitHub repository — every change is in the git log.
        </p>

        <h2>Contact.</h2>
        <p>
          Privacy questions, security disclosures, or anything you think
          we should know: open an issue on{' '}
          <a
            href="https://github.com/jaysidd/TradingAgentsLab/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            our GitHub repository
          </a>
          .
        </p>

        <hr />

        <p className="text-sm text-[var(--color-text-muted)]">
          See also:{' '}
          <Link href="/legal/disclaimer/" className="prose-link">
            Disclaimer
          </Link>{' '}
          ·{' '}
          <Link href="/legal/terms/" className="prose-link">
            Terms of Use
          </Link>{' '}
          ·{' '}
          <Link href="/security/" className="prose-link">
            Security &amp; Privacy posture
          </Link>
        </p>
      </div>
    </article>
  );
}
