import type { Metadata } from 'next';
import Link from 'next/link';
import AgentFlow from '@/components/home/AgentFlow';
import DiligenceTicker from '@/components/home/DiligenceTicker';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = {
  // Home-only meta description, kept near ~155 chars so it does not truncate in
  // search results. The richer site-wide SITE_DESCRIPTION still feeds the OG /
  // Twitter card (no length limit there), so only the SERP snippet is trimmed.
  description:
    'Free, open-source desktop research lab where multi-agent LLMs run institutional-grade diligence on any ticker. Educational use only, not investment advice.',
  alternates: { canonical: '/' },
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'macOS, Linux, Windows',
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      license: 'https://www.gnu.org/licenses/agpl-3.0.html',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      // Publisher stays the parent company, referenced by its canonical @id so it
      // resolves into the family parent graph (matches whisprdesk-website). The full
      // RBJ Global node is defined as parentOrganization on the TAL Organization below.
      publisher: { '@id': 'https://rbjglobal.com/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://tradingagentslab.ai/#organization',
      name: 'Trading Agents Lab',
      url: 'https://tradingagentslab.ai/',
      parentOrganization: {
        '@type': 'Organization',
        '@id': 'https://rbjglobal.com/#organization',
        name: 'RBJ Global LLC',
        url: 'https://rbjglobal.com/',
        // Parent's Wikidata item (Q140383605, live 2026-06-30). Carried inline on
        // every product page per family precedent (iLoveMD) so each TAL page has a
        // direct parent -> Wikidata resolution link while rbjglobal.com's own
        // canonical node is not yet pushed with the QID.
        sameAs: ['https://www.wikidata.org/wiki/Q140383605'],
      },
      sameAs: [
        'https://www.linkedin.com/company/117584287',
        'https://github.com/RBJGlobal/TradingAgentsLab',
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <Hero />
      <DiligenceSection />
      <CapabilitiesSection />
      <FlowSection />
      <ChannelsSection />
      <PostureSection />
      <CTASection />
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge fade-up">v1 · open source · free forever</span>
          <h1
            className="fade-up mt-8 tracking-tight"
            style={{ animationDelay: '60ms' }}
          >
            <span
              className="block text-base font-medium text-[var(--color-text-muted)] md:text-lg"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Trading Agents Lab
            </span>
            <span className="mt-3 block text-4xl md:text-6xl">
              Multi-agent
              <br />
              <span className="text-[var(--color-accent)]">Diligence</span> on
              any ticker.
            </span>
          </h1>
          <p
            className="fade-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]"
            style={{ animationDelay: '120ms' }}
          >
            Trading Agents Lab is a free, open-source desktop research lab.
            Twelve specialised AI agents (analysts, researchers, a trader,
            risk seats) independently study a stock, debate from opposing
            angles, and converge on a committee assessment you can read end
            to end.
          </p>
          <div
            className="fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: '180ms' }}
          >
            <Link href="/download/" className="btn-primary">
              <ChevronRight />
              Download for macOS
            </Link>
            <Link href="/tour/" className="btn-secondary">
              <ChevronRight />
              See it running
            </Link>
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubMark />
              Read the source
            </a>
          </div>
          <p
            className="fade-up mt-6 text-xs text-[var(--color-text-muted)]"
            style={{
              fontFamily: 'var(--font-mono)',
              animationDelay: '240ms',
            }}
          >
            macOS · Windows · Linux · BYO LLM key or run locally
          </p>
          <p
            className="fade-up mt-4 text-sm text-[var(--color-text-muted)]"
            style={{ animationDelay: '300ms' }}
          >
            Coming from the open-source project?{' '}
            <Link href="/tradingagents-desktop/" className="prose-link">
              Run TradingAgents as a desktop app
            </Link>
            .
          </p>
        </div>

        <div
          className="fade-up mt-20"
          style={{ animationDelay: '300ms' }}
        >
          <DiligenceTicker />
        </div>
      </div>
    </section>
  );
}

/* ─── The Diligence ────────────────────────────────────────────── */

function DiligenceSection() {
  return (
    <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="badge">The Diligence</span>
            <h2 className="mt-6 text-3xl md:text-4xl">
              The process is the product.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Most AI trading tools give you a single answer with no idea how
              it got there. We do the opposite.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              A Diligence is a structured deliberation between independent AI
              specialists. Each agent reads the same facts, plays a different
              role, and writes their view. Researchers argue bull vs bear. A
              trader proposes a position. Risk seats critique it from three
              orthogonal angles. A portfolio manager makes the call.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              You read the entire transcript. You see the disagreement. You
              decide whether the reasoning is sound, long before you decide
              whether to act on it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/how-it-works/" className="btn-secondary">
                See the full process →
              </Link>
              <Link
                href="/docs/reading-the-debate/"
                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                How to read a transcript
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between border-b border-[var(--color-border-muted)] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-buy)] pulse-dot" />
                <span
                  className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Diligence · NVDA · live
                </span>
              </div>
              <span
                className="text-xs text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                phase 3 / 4
              </span>
            </div>

            <ul className="mt-4 space-y-3 text-sm">
              <TranscriptLine
                role="market_analyst"
                tone="amber"
                text="Last close $211.50, +19% over 24 sessions. Volume cooling vs 60d avg."
              />
              <TranscriptLine
                role="news_analyst"
                tone="amber"
                text="Catalyst: GTC keynote framing Blackwell shipments ahead of guidance."
              />
              <TranscriptLine
                role="bull_researcher"
                tone="green"
                text="Hyperscaler capex still front-loaded; consensus underwrites Q2."
              />
              <TranscriptLine
                role="bear_researcher"
                tone="red"
                text="Customer concentration is real, top 4 = 40% of DC revenue."
              />
              <TranscriptLine
                role="trader"
                tone="amber"
                text="Proposing 0.5% sizing into a partial; let earnings re-rate confirm."
              />
              <TranscriptLine
                role="risk_aggressive"
                tone="green"
                text="Asymmetric, capex cycle lasts longer than current multiple implies."
              />
              <TranscriptLine
                role="risk_conservative"
                tone="red"
                text="Position size assumes thesis right; halve it pending guidance."
              />
            </ul>

            <div className="mt-5 rounded border border-[var(--color-accent-tint)] bg-[var(--color-accent-tint)] p-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  portfolio_manager · committee assessment
                </span>
                <span
                  className="text-xs text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  conviction 0.62
                </span>
              </div>
              <p
                className="mt-2 text-lg font-semibold text-[var(--color-hold)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Neutral · bull 54 / bear 46 · moderate risk
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TranscriptLine({
  role,
  tone,
  text,
}: {
  role: string;
  tone: 'amber' | 'green' | 'red';
  text: string;
}) {
  const toneColor =
    tone === 'green'
      ? 'var(--color-buy)'
      : tone === 'red'
        ? 'var(--color-sell)'
        : 'var(--color-accent)';

  return (
    <li
      className="border-l-2 pl-3 text-[var(--color-text-secondary)]"
      style={{ borderColor: toneColor }}
    >
      <span
        className="mr-2 text-xs"
        style={{ fontFamily: 'var(--font-mono)', color: toneColor }}
      >
        {role}
      </span>
      <span>{text}</span>
    </li>
  );
}

/* ─── Capabilities (3-up) ─────────────────────────────────────── */

function CapabilitiesSection() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">capabilities</span>
          <h2 className="mt-6 text-3xl md:text-4xl">
            Built for serious research, not signal-chasing.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Capability
            title="Bring your own LLM"
            mono="OpenAI · Anthropic · OpenRouter · Gemini · xAI · MiniMax · local"
            body="Use your existing API key with the provider you trust, or run entirely on-device with Ollama. No keys are stored on our servers. There are no servers."
          />
          <Capability
            title="Real market data"
            mono="yfinance · Alpaca · headlines · sentiment"
            body="Quotes, multi-day price action, news, and crowd sentiment (StockTwits + Reddit) feed every agent's reasoning. Equities, ETFs, crypto, and indices all routable."
          />
          <Capability
            title="Spend that you can prove"
            mono="cost-guard · per-token math · OAuth-aware"
            body="A Cost Guard reserves spend before each run, enforces daily and weekly caps, and shows a live $0.0034 → $0.05 tick during the debate. Subscription and local-LLM runs cost zero, and the UI says so."
          />
          <Capability
            title="The full transcript"
            mono="phase chips · agent-by-agent · copy markdown"
            body="Every Diligence is rendered live with phase progress, agent labels, and color-coded reasoning. Save the markdown; replay it later from History."
          />
          <Capability
            title="Outbound webhooks"
            mono="telegram · slack · discord · generic JSON + HMAC"
            body="When a debate finishes, push the assessment to Telegram, Slack, Discord, or your own endpoint. Wire that endpoint however you like, on your terms. We never see what you do with it."
          />
          <Capability
            title="Zero app telemetry"
            mono="no telemetry · no accounts · no install ping"
            body="The desktop app makes no network calls beyond the providers you configure. The marketing site you're reading uses one privacy-first, cookieless counter to see how many people visit; it sets no cookies and does not identify you."
          />
        </div>
      </div>
    </section>
  );
}

function Capability({
  title,
  mono,
  body,
}: {
  title: string;
  mono: string;
  body: string;
}) {
  return (
    <div className="card flex flex-col">
      <h3 className="text-lg">{title}</h3>
      <p
        className="mt-2 text-xs text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {mono}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {body}
      </p>
    </div>
  );
}

/* ─── Flow ─────────────────────────────────────────────────────── */

function FlowSection() {
  return (
    <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">the flow</span>
          <h2 className="mt-6 text-3xl md:text-4xl">
            Twelve agents. Four phases. One transcript.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The same pipeline every research desk runs informally, codified,
            paralleled, and made visible.
          </p>
        </div>
        <div className="mt-16">
          <AgentFlow />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/flow/" className="btn-primary">
            <ChevronRight />
            See the flow live
          </Link>
          <Link href="/how-it-works/" className="btn-secondary">
            Deep dive: how a Diligence is built →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Channels (Telegram) ──────────────────────────────────────── */
//
// Marketing the bidirectional Telegram bot. The differentiator vs the
// upstream Python terminal: you trigger a Diligence on your phone, the
// laptop runs the debate, the assessment lands back in the chat. Short
// 2-column callout; deep dive lives on /tour#channels.

function ChannelsSection() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="badge">on your phone</span>
            <h2 className="mt-6 text-3xl md:text-4xl">
              Run a Diligence from anywhere.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Configure once on the desktop. After that, message your
              own Telegram bot a ticker like <code>NVDA</code> and the
              debate runs on your laptop. The committee assessment lands
              back in the chat. Useful when you&apos;re at work, on a walk,
              or anywhere away from where you set the app up.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The bot connects outbound to Telegram, so nothing on your
              machine is exposed to the internet. Allowlist gates who
              can trigger a run. Per-chat daily spend cap blocks
              token-drain abuse if your bot token ever leaks.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tour/#channels" className="btn-primary">
                <ChevronRight />
                See the Telegram flow
              </Link>
              <Link href="/docs/" className="btn-secondary">
                Documentation
              </Link>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-sunken)] shadow-2xl shadow-black/40">
              {/* Plain img to match the rest of the tour page; output is
                  Next.js export with images.unoptimized. */}
              <img
                src="/screenshots/telegram-ready.png"
                alt="Telegram chat with the Trading Agents Lab bot showing the welcome message 'Trading Agents Lab is ready' and the persistent two-by-two reply keyboard with Full debate mode, Summary mode, Current mode, and Help buttons."
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </div>
            <p
              className="mt-3 text-center text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Telegram · ready with reply keyboard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Posture ─────────────────────────────────────────────────── */

function PostureSection() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="badge">posture</span>
            <h2 className="mt-6 text-3xl md:text-4xl">
              Analysis, not execution.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Trading Agents Lab will never place a trade on your behalf , 
              not via paper trading, not via a hidden flag, not even if you
              ask it to. We build the analysis layer; you keep the brokerage
              relationship.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              This isn&apos;t a temporary scope choice. It&apos;s a deliberate
              regulatory firewall: when execution code never exists in our
              repository, there is structurally nothing for the SEC to
              regulate as a trading platform. You bridge the analysis to your
              authorised broker via a webhook on your terms.
            </p>
            <Link
              href="/about/"
              className="mt-6 inline-block text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Read our positioning →
            </Link>
          </div>

          <div className="space-y-3">
            <PostureRow ok>Free and open-source · AGPL-3.0</PostureRow>
            <PostureRow ok>No accounts, no email, no install ping</PostureRow>
            <PostureRow ok>Your LLM key never leaves your machine</PostureRow>
            <PostureRow ok>Source code is the spec, read it</PostureRow>
            <PostureRow ok>Locked to data and paper endpoints</PostureRow>
            <PostureRow>No live-trading code, ever</PostureRow>
            <PostureRow>No broker integrations shipped</PostureRow>
            <PostureRow>No subscription, no premium tier</PostureRow>
            <PostureRow>No telemetry, no tracking, no ads</PostureRow>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostureRow({
  ok,
  children,
}: {
  /** true = green check, false/omitted = red x. */
  ok?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-[var(--color-border-muted)] py-3">
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
    </div>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section border-t border-[var(--color-border-muted)]">
      <div className="container-wide">
        <div className="card mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">
            Run your first Diligence in two minutes.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Download the macOS app, paste an LLM key (or point it at a local
            Ollama model), type a ticker. The transcript writes itself in
            front of you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/download/" className="btn-primary">
              <ChevronRight />
              Download
            </Link>
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubMark />
              GitHub
            </a>
            <Link href="/docs/getting-started/" className="btn-secondary">
              Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Inline icons ─────────────────────────────────────────────── */

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}
