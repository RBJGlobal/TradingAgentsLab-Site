/**
 * Persistent disclaimer ribbon at the very top of every page.
 *
 * Tier 1 of the locked three-tier disclaimer system (per
 * memory: project_disclaimer_language.md). Must be visible
 * BEFORE any product copy loads so it's never lost in scroll.
 *
 * Verbatim language locked — do not paraphrase.
 */
export default function DisclaimerBar() {
  return (
    <div
      role="region"
      aria-label="Disclaimer"
      className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-sunken)] py-2 text-center text-xs"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="text-[var(--color-text-muted)]">
        For educational and research purposes only — not investment advice.
      </span>
    </div>
  );
}
