/**
 * Canonical agent metadata for the interactive flow diagram.
 *
 * Mirrors the actual `engine/live_debate.py` agent definitions so the
 * marketing visual stays honest about what the product does. If the
 * engine adds, removes, or renames an agent, this file is the single
 * place to update on the site side.
 */

export type Phase = 'analysts' | 'researchers' | 'trader' | 'risk';

export interface AgentSpec {
  id: string;
  name: string;        // Display name, human-friendly
  role: string;        // snake_case role as it appears in the transcript
  phase: Phase;
  focus: string;       // One-line tagline
  detail: string;      // 2-3 sentence panel copy
  reads: string;       // What this agent's input is
  produces: string;    // What it outputs into the transcript
}

export const PHASES: { id: Phase; n: string; name: string; tagline: string }[] = [
  {
    id: 'analysts',
    n: '01',
    name: 'Analysts',
    tagline: 'Four perspectives, in parallel.',
  },
  {
    id: 'researchers',
    n: '02',
    name: 'Researchers',
    tagline: 'Argue both sides. A manager picks a lean.',
  },
  {
    id: 'trader',
    n: '03',
    name: 'Trader',
    tagline: 'Concrete plan: entry, size, stop.',
  },
  {
    id: 'risk',
    n: '04',
    name: 'Risk + Assessment',
    tagline: 'Three risk seats weigh in. PM closes.',
  },
];

export const AGENTS: AgentSpec[] = [
  // ── Phase 01 — Analysts (parallel) ─────────────────────────────────
  {
    id: 'technical_analyst',
    name: 'Technical Analyst',
    role: 'technical_analyst',
    phase: 'analysts',
    focus: 'Price action, momentum, support and resistance',
    detail:
      'Reads the price history and volume for the ticker and identifies the most decision-relevant technical setup in 3 to 5 sentences. Trend, momentum, key levels, volume confirmation.',
    reads: 'Quote summary, OHLCV history',
    produces: 'Technical read with key levels',
  },
  {
    id: 'fundamental_analyst',
    name: 'Fundamental Analyst',
    role: 'fundamental_analyst',
    phase: 'analysts',
    focus: 'Earnings, balance sheet, valuation, moat',
    detail:
      'For equities, looks at earnings, balance sheet health, valuation multiples, and competitive moat. For crypto, focuses on tokenomics, on-chain activity, network economics.',
    reads: 'Ticker, asset class, current price',
    produces: 'Fundamental view tied to the setup',
  },
  {
    id: 'news_analyst',
    name: 'News Analyst',
    role: 'news_analyst',
    phase: 'analysts',
    focus: 'Catalysts vs noise in the recent headlines',
    detail:
      'Reads the headline feed for this ticker. In 3 to 5 sentences, identifies any catalysts that materially affect the trade, separates signal from noise, and flags what useful news is missing from the available set.',
    reads: 'Yahoo Finance + Alpaca News API headlines',
    produces: 'Catalyst summary and signal gaps',
  },
  {
    id: 'sentiment_analyst',
    name: 'Sentiment Analyst',
    role: 'sentiment_analyst',
    phase: 'analysts',
    focus: 'Social positioning, StockTwits and Reddit',
    detail:
      'When social data is present, grounds the assessment in actual messages. Quotes a bullish/bearish ratio, names where conviction is loudest, flags when tone diverges from the price action. When social data is absent, says so plainly.',
    reads: 'StockTwits + Reddit blocks',
    produces: 'Sentiment read with divergence calls',
  },

  // ── Phase 02 — Researchers (debate) ────────────────────────────────
  {
    id: 'bull_researcher',
    name: 'Bull Researcher',
    role: 'bull_researcher',
    phase: 'researchers',
    focus: 'Strongest long case',
    detail:
      'Makes the strongest defensible long case in 3 to 5 sentences, anchored on the analyst output. Does not hedge. Does not list. Argues.',
    reads: 'All four analyst messages',
    produces: 'Long thesis',
  },
  {
    id: 'bear_researcher',
    name: 'Bear Researcher',
    role: 'bear_researcher',
    phase: 'researchers',
    focus: 'Strongest short or avoid case',
    detail:
      'Makes the strongest defensible short-or-avoid case in 3 to 5 sentences, anchored on the same data. Does not hedge. Argues against the long thesis.',
    reads: 'All four analyst messages + the bull case',
    produces: 'Short or avoid thesis',
  },
  {
    id: 'research_manager',
    name: 'Research Manager',
    role: 'research_manager',
    phase: 'researchers',
    focus: 'Weigh asymmetry, set a lean',
    detail:
      'Hears both researchers. Weighs which side carries the better risk-adjusted argument for the next few trading sessions and states a directional lean. The lean becomes the trader\'s starting point.',
    reads: 'Bull case + bear case + the analyst transcript',
    produces: 'Directional lean',
  },

  // ── Phase 03 — Trader ──────────────────────────────────────────────
  {
    id: 'trader',
    name: 'Trader',
    role: 'trader',
    phase: 'trader',
    focus: 'Concrete plan: entry, size, stop',
    detail:
      'Reads everything above. Produces a concrete trade plan in 3 to 5 sentences: enter or not, size posture (small / standard / sized up), and a defined-risk stop level if entering. If not entering, explains why staying out is the better-argued course.',
    reads: 'Full analyst + researcher transcript',
    produces: 'Trade plan with rationale',
  },

  // ── Phase 04 — Risk committee + Portfolio Manager ──────────────────
  {
    id: 'risk_aggressive',
    name: 'Risk (Aggressive)',
    role: 'risk_aggressive',
    phase: 'risk',
    focus: 'What is the team risking by being too cautious?',
    detail:
      'The opportunistic risk seat. In 2 to 3 sentences, argues for the more aggressive course of action and names what the team risks by being too defensive.',
    reads: 'Trader plan + full transcript',
    produces: 'Upside-bias risk argument',
  },
  {
    id: 'risk_conservative',
    name: 'Risk (Conservative)',
    role: 'risk_conservative',
    phase: 'risk',
    focus: 'What is the team risking by being too aggressive?',
    detail:
      'The defensive risk seat. In 2 to 3 sentences, argues for the more cautious course of action and names what the team risks by being too opportunistic.',
    reads: 'Trader plan + full transcript',
    produces: 'Downside-bias risk argument',
  },
  {
    id: 'risk_neutral',
    name: 'Risk (Neutral)',
    role: 'risk_neutral',
    phase: 'risk',
    focus: 'The middle path. What is the lowest-regret action?',
    detail:
      'The neutral risk seat. In 2 to 3 sentences, names the lowest-regret course given both risk arguments. Often the pull toward a neutral stance.',
    reads: 'Aggressive + conservative arguments',
    produces: 'Middle-path framing',
  },
  {
    id: 'portfolio_manager',
    name: 'Portfolio Manager',
    role: 'portfolio_manager',
    phase: 'risk',
    focus: 'Committee assessment: stance, conviction, thesis strengths',
    detail:
      'Hears the full transcript and the three risk seats. Produces the committee assessment: an analytical stance (Bullish through Bearish), a conviction score, bull and bear thesis strengths, a risk level, and a one-paragraph reasoning that ties the inputs together. This is what the user sees in the app and on Telegram.',
    reads: 'Everything above',
    produces: 'Committee assessment with stance, conviction, thesis strengths, risk level',
  },
];
