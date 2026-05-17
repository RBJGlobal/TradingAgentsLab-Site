/**
 * AgentFlow, visual representation of the four-phase Diligence pipeline.
 *
 * Pure SSR (no client state, no animation hooks). Renders four columns:
 *   Analysts → Researchers → Trader → Risk → Decision
 *
 * Mirrors the actual `engine/live_debate.py` agent sequence so the marketing
 * surface stays honest about what the product does.
 */

const PHASES = [
  {
    n: '01',
    name: 'Analysts',
    agents: [
      { role: 'market_analyst', focus: 'price action · volume' },
      { role: 'news_analyst', focus: 'recent headlines' },
      { role: 'fundamental_analyst', focus: 'metrics · context' },
      { role: 'sentiment_analyst', focus: 'social signal' },
    ],
  },
  {
    n: '02',
    name: 'Researchers',
    agents: [
      { role: 'bull_researcher', focus: 'thesis for' },
      { role: 'bear_researcher', focus: 'thesis against' },
      { role: 'research_manager', focus: 'arbitrates' },
    ],
  },
  {
    n: '03',
    name: 'Trader',
    agents: [{ role: 'trader', focus: 'proposes position' }],
  },
  {
    n: '04',
    name: 'Risk',
    agents: [
      { role: 'risk_aggressive', focus: 'upside view' },
      { role: 'risk_conservative', focus: 'downside view' },
      { role: 'risk_neutral', focus: 'middle path' },
      { role: 'portfolio_manager', focus: 'final call' },
    ],
  },
] as const;

export default function AgentFlow() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {PHASES.map((phase, i) => (
          <div key={phase.name} className="relative">
            {/* Connector arrow, only between columns on md+ */}
            {i < PHASES.length - 1 && (
              <div className="absolute -right-3 top-12 hidden h-px w-6 bg-[var(--color-border-strong)] md:block">
                <span
                  className="absolute -top-1 -right-1 h-2 w-2 rotate-45 border-r border-t"
                  style={{ borderColor: 'var(--color-border-strong)' }}
                />
              </div>
            )}

            <div className="card h-full">
              <div className="flex items-baseline justify-between">
                <span
                  className="text-xs text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  phase_{phase.n}
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              </div>
              <h3
                className="mt-3 text-lg"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {phase.name}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {phase.agents.map((agent) => (
                  <li
                    key={agent.role}
                    className="border-l-2 pl-3 text-xs"
                    style={{
                      borderColor: 'var(--color-border-default)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <div className="text-[var(--color-text-secondary)]">
                      {agent.role}
                    </div>
                    <div className="text-[var(--color-text-muted)]">
                      {agent.focus}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
