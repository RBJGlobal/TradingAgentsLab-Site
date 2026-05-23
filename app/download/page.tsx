import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Install Trading Agents Lab on macOS. Free, open-source, AGPL-3.0.',
  alternates: { canonical: '/download/' },
};

export default function Download() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">download</span>
          <h1 className="mt-6 text-4xl md:text-5xl">
            Run a Diligence in two minutes.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is a desktop application. It runs the AI
            agents on your machine (with your keys, or against your local
            Ollama), it stores everything locally, and it never phones
            home.
          </p>

          <div className="mt-12 rounded border border-[var(--color-accent-tint)] bg-[var(--color-accent-tint)] p-6">
            <div
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Heads up
            </div>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Pre-built installers are not yet available. The macOS DMG
              ships once code-signing &amp; notarisation are in place
              (gated on Apple Developer Program registration). In the
              meantime, you can build from source in a few minutes. It
              runs identically on macOS, Linux, and Windows once you
              have Node and Python on hand.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">Build from source</h2>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Requires <strong>Node 20+</strong> and <strong>Python 3.13</strong>.
          </p>

          <Step n="1" title="Clone the repository">
            <Code>
              git clone https://github.com/RBJGlobal/TradingAgentsLab.git
              {'\n'}cd TradingAgentsLab
            </Code>
          </Step>

          <Step n="2" title="Install the desktop dependencies">
            <Code>npm --prefix desktop install</Code>
          </Step>

          <Step n="3" title="Set up the Python engine">
            <Code>
              python3.13 -m venv engine/.venv{'\n'}engine/.venv/bin/pip install -r engine/requirements.txt
            </Code>
          </Step>

          <Step n="4" title="Run the dev stack">
            <Code>npm --prefix desktop run dev</Code>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              The Electron window opens, the engine sidecar starts in
              the background, and the status strip flips to{' '}
              <span style={{ color: 'var(--color-buy)' }}>● Running</span>{' '}
              within a couple of seconds.
            </p>
          </Step>

          <Step n="5" title="Configure a provider">
            <p className="text-[var(--color-text-secondary)]">
              Open Settings → LLM Providers. Paste a key (OpenAI,
              Anthropic, OpenRouter, or Google Gemini), or set the
              app to use a local Ollama model. Then go to Analyze, type
              a ticker like <code className="rounded bg-[var(--color-bg-sunken)] px-2 py-0.5 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>NVDA</code>, and run.
            </p>
            <Link href="/docs/getting-started/" className="mt-4 inline-block prose-link">
              Step-by-step walkthrough →
            </Link>
          </Step>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <h2 className="text-3xl">When the DMG ships</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Subscribe to{' '}
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              GitHub releases
            </a>{' '}
            on the main repository. That&apos;s where signed installers
            for macOS will be published the moment they&apos;re ready.
            We&apos;ll also link them directly from this page.
          </p>
        </div>
      </section>
    </article>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-l-2 border-[var(--color-accent)] pl-6">
      <div className="flex items-baseline gap-3">
        <span
          className="text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          step_{n}
        </span>
        <h3 className="text-lg">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre
      className="overflow-x-auto rounded border border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)] p-4 text-sm"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <code>{children}</code>
    </pre>
  );
}
