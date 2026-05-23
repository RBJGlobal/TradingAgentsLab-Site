import Link from 'next/link';
import type { Metadata } from 'next';
import AgentFlow from '@/components/home/AgentFlow';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'A Diligence is a four-phase deliberation between twelve specialised AI agents. Here is exactly what each one does, and how their disagreement becomes a single decision.',
  alternates: { canonical: '/how-it-works/' },
};

export default function HowItWorks() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">how it works</span>
          <h1 className="mt-6 text-4xl md:text-5xl">
            One ticker. Twelve specialists. Four phases.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            A Diligence is not one prompt answered by one model. It is a
            structured sequence of independent agents, each with their
            own role, their own facts to look at first, and their own
            instruction to disagree with the others when it matters.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The result is a transcript you can read, audit, and learn
            from, not a black-box score. Below is the full pipeline as it
            ships in{' '}
            <Link href="/docs/how-it-works/" className="prose-link">
              the codebase today
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-wide">
          <AgentFlow />
        </div>
      </section>

      <section className="section">
        <div className="container-prose space-y-12">
          <Phase
            n="01"
            name="Analysts"
            summary="Each analyst pulls live data from a single domain and writes what they see."
            agents={[
              {
                role: 'market_analyst',
                what:
                  'Reads last price, multi-day price action, volume vs the 60-day average, and the recent range. Pulls from yfinance by default, or from Alpaca when keys are configured.',
              },
              {
                role: 'news_analyst',
                what:
                  'Surfaces recent headlines about the ticker. Headlines flow into the transcript with source attribution so the reader can verify upstream.',
              },
              {
                role: 'fundamental_analyst',
                what:
                  'Asset-class-aware context, equities get earnings/valuation framing, crypto gets supply/macro framing. Never asserts numbers it cannot ground.',
              },
              {
                role: 'sentiment_analyst',
                what:
                  'Aggregates retail sentiment from StockTwits + the relevant subreddit (asset-class routed). Quantifies bullish vs bearish lean and notes message volume vs baseline.',
              },
            ]}
          />

          <Phase
            n="02"
            name="Researchers"
            summary="Two researchers argue against each other; a manager arbitrates."
            agents={[
              {
                role: 'bull_researcher',
                what:
                  'Builds the strongest case to own the ticker. Synthesises the analysts, surfaces catalysts, and addresses the most likely counter-arguments before they are raised.',
              },
              {
                role: 'bear_researcher',
                what:
                  'Builds the strongest case against. Looks for confirmation bias in the bull thesis. Will name specific things that would falsify the trade.',
              },
              {
                role: 'research_manager',
                what:
                  'Reads both, weighs the evidence, and writes a synthesis that names which arguments are load-bearing and which are noise.',
              },
            ]}
          />

          <Phase
            n="03"
            name="Trader"
            summary="A single agent proposes a specific position, not just a direction."
            agents={[
              {
                role: 'trader',
                what:
                  'Takes the research synthesis and writes a concrete proposal: action (BUY/SELL/HOLD), conviction, target sizing as a percentage of a hypothetical portfolio, and an entry plan. This is the only phase that proposes a number.',
              },
            ]}
          />

          <Phase
            n="04"
            name="Risk"
            summary="Three risk seats stress-test the proposal from opposing angles, and a portfolio manager makes the final call."
            agents={[
              {
                role: 'risk_aggressive',
                what:
                  'Argues the proposed sizing is too small for the asymmetry on offer. Bias: upside under-pricing.',
              },
              {
                role: 'risk_conservative',
                what:
                  'Argues the position assumes the thesis is right and ignores tail risk. Bias: downside under-pricing.',
              },
              {
                role: 'risk_neutral',
                what:
                  'Holds the line between the two. Bias: the median path is most likely.',
              },
              {
                role: 'portfolio_manager',
                what:
                  'Reads all three risk seats plus the trader proposal and makes the final call. The decision card the user sees comes from this agent and carries a confidence score (0.0, 1.0).',
              },
            ]}
          />
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <span className="badge">what the user sees</span>
          <h2 className="mt-6 text-3xl">A streaming transcript, not a popup.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Each agent renders into the UI the moment they finish writing.
            You watch the debate build. A phase progress strip shows which
            phase is running and how many agents have spoken. A running
            cost meter shows token spend tick up.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            When the portfolio manager writes the final call, a decision
            card materialises beneath the transcript with the action, the
            confidence, and a one-paragraph rationale. You can copy the
            entire transcript as Markdown, or replay it later from the
            History page.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            If you&apos;ve configured webhooks, the decision is also
            pushed to your endpoint of choice (Telegram, Slack, Discord,
            or your own JSON receiver with HMAC verification) the moment
            it lands.
          </p>
          <div className="mt-8">
            <Link href="/docs/reading-the-debate/" className="btn-secondary">
              How to read a transcript →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <span className="badge">honest about ai</span>
          <h2 className="mt-6 text-3xl">
            What the system cannot do, by design.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            A Diligence does not predict the market. It does not guarantee
            outcomes. It is not investment advice. Agents are LLMs and can
            be confidently wrong; the entire point of running twelve of
            them is to make the disagreement visible to you, the reader.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab will not place a trade for you. It does not
            ship broker integrations. If you decide to act on the analysis,
            you do so on your own authorised brokerage account, via your
            own credentials, with your own responsibility.{' '}
            <Link href="/about/" className="prose-link">
              Read our positioning →
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}

function Phase({
  n,
  name,
  summary,
  agents,
}: {
  n: string;
  name: string;
  summary: string;
  agents: Array<{ role: string; what: string }>;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3">
        <span
          className="text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          phase_{n}
        </span>
        <h2 className="text-2xl">{name}</h2>
      </div>
      <p className="mt-3 text-[var(--color-text-secondary)]">{summary}</p>
      <ul className="mt-6 space-y-5">
        {agents.map((a) => (
          <li
            key={a.role}
            className="border-l-2 border-[var(--color-accent)] pl-4"
          >
            <span
              className="text-sm text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {a.role}
            </span>
            <p className="mt-1.5 text-[var(--color-text-secondary)]">
              {a.what}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
