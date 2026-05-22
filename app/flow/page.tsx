import type { Metadata } from 'next';
import InteractiveAgentFlow from '@/components/flow/InteractiveAgentFlow';

// The component itself carries `'use client'`; Next.js draws the
// boundary automatically so we can import it from a Server Component
// page without `dynamic`.

export const metadata: Metadata = {
  title: 'The flow',
  description:
    'Interactive walkthrough of the twelve-agent Diligence pipeline. Click any agent to see what it reads and what it produces, or press Play to watch the debate flow phase by phase.',
};

export default function FlowPage() {
  return (
    <article>
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge">the flow</span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              Twelve agents. Four phases.
              <br />
              <span className="text-[var(--color-accent)]">One transcript.</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The same pipeline a research desk runs informally, codified
              and made visible. Each next agent reads the full prior
              transcript before adding its own view, so the final
              decision is built on every prior step. Click any node to
              see what it reads and what it adds, or press Play to
              watch the debate stream through.
            </p>
          </div>

          <div className="mt-14">
            <InteractiveAgentFlow />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-prose">
          <p
            className="text-xs leading-relaxed text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Mirrors `engine/live_debate.py` in the open-source codebase.
            The visualization is illustrative; what the engine actually
            does is run real LLM calls through these agents and stream
            the transcript into the app or your Telegram bot. Output is
            educational only. Not investment advice.
          </p>
        </div>
      </section>
    </article>
  );
}
