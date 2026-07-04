import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Run TradingAgents as a desktop app',
  description:
    'Open-source desktop app for the TradingAgents multi-agent framework. Run the full agent debate on any ticker on Mac, Windows, or Linux, no Python setup.',
  alternates: { canonical: '/tradingagents-desktop/' },
};

export default function TradingAgentsDesktop() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">for TradingAgents users</span>
          <h1 className="mt-6 text-4xl md:text-5xl">
            Run TradingAgents as a desktop app.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            TradingAgents, the open-source multi-agent framework from{' '}
            <a
              href="https://github.com/TauricResearch/TradingAgents"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              TauricResearch
            </a>
            , runs from the command line and expects a Python environment.
            Trading Agents Lab is an open-source desktop application built on
            the same multi-agent approach, packaged for macOS, Windows, and
            Linux. You download it, point it at a model, and read a full
            diligence debate end to end. No virtualenv, no pip, no notebook.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/download/" className="btn-primary">
              Download for macOS
            </Link>
            <Link href="/tour/" className="btn-secondary">
              See it running
            </Link>
          </div>
          <p
            className="mt-6 text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            macOS · Windows · Linux · BYO LLM key or run locally · AGPL-3.0
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">What stays, what the desktop adds.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The agent architecture is the same idea you came for: specialised
              analysts and researchers study a stock, a trader and risk seats
              debate from opposing angles, and the run converges on a
              recommendation you can read in full. The desktop app layers a
              usable experience on top.
            </p>
            <ul className="mt-8 space-y-4">
              <Add label="No Python setup">
                Install a signed desktop build instead of cloning a repo and
                managing a Python environment.
              </Add>
              <Add label="Bring your own model, or run local">
                OpenAI, Anthropic, OpenRouter, Google Gemini, xAI Grok, and
                MiniMax via your own key, or run fully offline through{' '}
                <Link href="/docs/local-llm/" className="prose-link">
                  Ollama and LM Studio
                </Link>
                .
              </Add>
              <Add label="Use a ChatGPT subscription, no per-token billing">
                Sign in with{' '}
                <Link href="/docs/oauth/" className="prose-link">
                  ChatGPT OAuth
                </Link>{' '}
                to power debates from your existing plan instead of paying the
                API per token.
              </Add>
              <Add label="Read the debate">
                Every analyst argument, rebuttal, and the final call are laid
                out so you can follow the reasoning, not just the verdict. See{' '}
                <Link href="/docs/reading-the-debate/" className="prose-link">
                  Reading the debate
                </Link>
                .
              </Add>
              <Add label="Local-only by design">
                No accounts, no telemetry. Keys live in your OS keychain and
                runs are stored on your machine. See{' '}
                <Link href="/security/" className="prose-link">
                  Security and privacy
                </Link>
                .
              </Add>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">Getting started.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Three docs cover the path from download to your first run:
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <DocLink
                href="/docs/getting-started/"
                title="Getting started"
                detail="Install, pick a provider, run your first diligence on any ticker."
              />
              <DocLink
                href="/docs/local-llm/"
                title="Local models"
                detail="Run offline with Ollama or LM Studio, no API key and no per-token cost."
              />
              <DocLink
                href="/docs/oauth/"
                title="ChatGPT OAuth"
                detail="Power debates from your paid ChatGPT plan instead of the per-token API."
              />
            </div>
            <p className="mt-8 text-sm text-[var(--color-text-muted)]">
              New to the agent model itself? Start with{' '}
              <Link href="/docs/how-it-works/" className="prose-link">
                How it works
              </Link>
              , then browse the full{' '}
              <Link href="/docs/" className="prose-link">
                documentation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl">Open source, like the project it builds on.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Trading Agents Lab is a fork of TradingAgents, released under
              AGPL-3.0. The full source is open to inspection, and you are free
              to study it, run it, and build on it under the same license.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/RBJGlobal/TradingAgentsLab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Read our source
              </a>
              <a
                href="https://github.com/TauricResearch/TradingAgents"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                The upstream project
              </a>
            </div>
            <p className="mt-8 text-xs text-[var(--color-text-muted)]">
              For educational and research purposes only, not investment advice.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function Add({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="rounded border border-[var(--color-border-muted)] bg-[var(--color-bg-card)] p-5">
      <div
        className="text-sm text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </p>
    </li>
  );
}

function DocLink({
  href,
  title,
  detail,
}: {
  href: string;
  title: string;
  detail: string;
}) {
  return (
    <Link href={href} className="card flex flex-col">
      <h3 className="text-base">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{detail}</p>
    </Link>
  );
}
