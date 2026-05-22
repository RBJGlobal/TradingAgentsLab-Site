'use client';

/**
 * Interactive Diligence flow.
 *
 * Built on React Flow (@xyflow/react) plus a small Play-the-debate
 * controller. Twelve agent nodes in four phase swim lanes, animated
 * edges between phases, click any node for a side-panel detail view.
 *
 * Brand: warm amber (#f0a830) accent on dark base, monospace headers.
 * Mobile: React Flow's native pan + zoom; the side panel becomes a
 * full-width bottom sheet under md.
 *
 * This is a prototype on /flow. Once the founder signs off it can
 * replace the static `AgentFlow` on the homepage and/or land on
 * /how-it-works.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AGENTS, PHASES, type AgentSpec, type Phase } from './agents';

// ─── Layout constants ──────────────────────────────────────────────
//
// React Flow uses absolute pixel positions. We compute these once,
// then let RF handle pan/zoom from there. Coordinates picked so each
// phase column has clear vertical breathing room and connecting edges
// don't crash into adjacent nodes.

const COL_X: Record<Phase, number> = {
  analysts: 0,
  researchers: 360,
  trader: 720,
  risk: 1080,
};

const NODE_W = 260;
const NODE_H = 88;
const ROW_GAP = 28;
// Vertical padding above each column's top node where the phase header
// sits. Per-column because columns have different node counts (4 vs 3
// vs 1 vs 4); a fixed COL_HEADER_Y would collide with the analyst /
// risk columns' top nodes. Picked 110px to give the 3-line header
// (badge / name / tagline) clear separation from the first node.
const HEADER_PAD_Y = 110;

function buildPositions() {
  const positions: Record<string, { x: number; y: number }> = {};
  const headers: Record<Phase, { x: number; y: number }> = {} as Record<
    Phase,
    { x: number; y: number }
  >;
  for (const phase of PHASES) {
    const agentsInPhase = AGENTS.filter((a) => a.phase === phase.id);
    const totalH = agentsInPhase.length * NODE_H + (agentsInPhase.length - 1) * ROW_GAP;
    const startY = -totalH / 2;
    agentsInPhase.forEach((agent, i) => {
      positions[agent.id] = {
        x: COL_X[phase.id],
        y: startY + i * (NODE_H + ROW_GAP),
      };
    });
    headers[phase.id] = {
      x: COL_X[phase.id],
      y: startY - HEADER_PAD_Y,
    };
  }
  return { positions, headers };
}

const { positions: POSITIONS, headers: HEADER_POSITIONS } = buildPositions();

// ─── Custom node ───────────────────────────────────────────────────

interface AgentNodeData extends Record<string, unknown> {
  agent: AgentSpec;
  active: boolean;
  played: boolean;
  onSelect: (id: string) => void;
  selected: boolean;
}

function AgentNode({ data }: NodeProps<Node<AgentNodeData>>) {
  const { agent, active, played, onSelect, selected } = data;

  const ringColor = active
    ? 'var(--color-accent)'
    : selected
      ? 'var(--color-accent-hover)'
      : played
        ? 'var(--color-accent-dim)'
        : 'var(--color-border-default)';

  const glow = active
    ? '0 0 28px var(--color-accent-glow), 0 0 12px var(--color-accent-glow)'
    : selected
      ? '0 0 14px var(--color-accent-glow)'
      : 'none';

  return (
    <div
      onClick={() => onSelect(agent.id)}
      style={{
        width: NODE_W,
        minHeight: NODE_H,
        background: 'var(--color-bg-card)',
        border: `1px solid ${ringColor}`,
        borderRadius: 6,
        padding: '10px 14px',
        cursor: 'pointer',
        transition: 'border-color 240ms ease, box-shadow 240ms ease, transform 200ms ease',
        boxShadow: glow,
        transform: active ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'var(--color-accent-dim)', width: 6, height: 6, border: 'none' }}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: active
            ? 'var(--color-accent)'
            : played
              ? 'var(--color-accent-dim)'
              : 'var(--color-text-muted)',
          marginBottom: 4,
        }}
      >
        {agent.role}
      </div>
      <div
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        {agent.name}
      </div>
      <div
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 11,
          lineHeight: 1.45,
        }}
      >
        {agent.focus}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'var(--color-accent-dim)', width: 6, height: 6, border: 'none' }}
      />
    </div>
  );
}

const nodeTypes = { agent: AgentNode };

// ─── Edges between phases ──────────────────────────────────────────
//
// We connect every agent in phase N to every agent in phase N+1. That
// reflects what live_debate.py actually does: each next agent reads
// the full prior transcript. Visually busy on first render but feels
// honest about the data flow.

function buildEdges(): Edge[] {
  const edges: Edge[] = [];
  const phasesByIndex = PHASES.map((p) => p.id);
  for (let i = 0; i < phasesByIndex.length - 1; i++) {
    const fromPhase = phasesByIndex[i];
    const toPhase = phasesByIndex[i + 1];
    const fromAgents = AGENTS.filter((a) => a.phase === fromPhase);
    const toAgents = AGENTS.filter((a) => a.phase === toPhase);
    for (const f of fromAgents) {
      for (const t of toAgents) {
        edges.push({
          id: `${f.id}->${t.id}`,
          source: f.id,
          target: t.id,
          animated: false,
          style: {
            stroke: 'var(--color-border-default)',
            strokeWidth: 1,
            opacity: 0.55,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'var(--color-border-strong)',
            width: 12,
            height: 12,
          },
        });
      }
    }
  }
  return edges;
}

// Edges that connect FROM a played-or-active node get highlighted in
// amber. We mutate edges per-tick in the play loop.
function edgesHighlightedFrom(activeId: string | null, playedIds: Set<string>) {
  const baseEdges = buildEdges();
  return baseEdges.map((edge) => {
    const fromActive = activeId === edge.source;
    const fromPlayed = playedIds.has(edge.source);
    if (fromActive) {
      return {
        ...edge,
        animated: true,
        style: {
          stroke: 'var(--color-accent)',
          strokeWidth: 1.5,
          opacity: 1,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'var(--color-accent)',
          width: 12,
          height: 12,
        },
      };
    }
    if (fromPlayed) {
      return {
        ...edge,
        style: {
          stroke: 'var(--color-accent-dim)',
          strokeWidth: 1,
          opacity: 0.85,
        },
      };
    }
    return edge;
  });
}

// ─── Phase header (non-interactive label nodes) ────────────────────

function PhaseHeader({ data }: NodeProps<Node<{ n: string; name: string; tagline: string }>>) {
  const { n, name, tagline } = data;
  return (
    <div style={{ pointerEvents: 'none', width: NODE_W }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--color-accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        phase_{n}
      </div>
      <div style={{ color: 'var(--color-text-primary)', fontSize: 18, marginTop: 4 }}>
        {name}
      </div>
      <div
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 12,
          marginTop: 4,
          lineHeight: 1.4,
        }}
      >
        {tagline}
      </div>
    </div>
  );
}

const nodeTypesAll = { agent: AgentNode, phaseHeader: PhaseHeader };

// ─── The component ─────────────────────────────────────────────────

// Animation timing (ms). Tuned for "watchable but not slow".
const STEP_MS = 700;        // dwell per agent
const START_DELAY_MS = 600; // initial pause so user notices the static layout
const LOOP_PAUSE_MS = 1800; // hold the final state before restarting

export default function InteractiveAgentFlow() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  // Default ON: the flow loops automatically when the page renders.
  // The Pause button toggles this to false, Resume flips it back.
  const [isPlaying, setIsPlaying] = useState(true);

  // Mobile detection. On phones the chart is wider than the viewport
  // even at the desktop minZoom of 0.4 (1340px chart / 375px screen =
  // needs ~0.25 to fit). We unlock pan + pinch + double-tap zoom and
  // lower minZoom so fitView can actually do its job. Desktop stays
  // locked exactly as before per founder's "diagram is a visual, not
  // a workspace" call.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const onSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // Play-the-debate: walks agents in transcript order, lighting each
  // one as it "runs", then loops back to the start after a brief
  // pause holding the final state. Tied to `isPlaying` so the Pause
  // button cleanly halts the loop without leaving timers running.
  const playOrder = useMemo(
    () => AGENTS.map((a) => a.id),
    [],
  );

  useEffect(() => {
    if (!isPlaying) return;
    let cancelled = false;
    let timer: number | null = null;
    let i = 0;

    const clearTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const tick = () => {
      if (cancelled) return;
      if (i >= playOrder.length) {
        // End of one pass. Hold the final state briefly, then loop.
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setPlayedIds(new Set());
          setActiveId(null);
          i = 0;
          timer = window.setTimeout(tick, START_DELAY_MS);
        }, LOOP_PAUSE_MS);
        return;
      }
      const id = playOrder[i];
      setActiveId(id);
      setPlayedIds((prev) => {
        const next = new Set(prev);
        if (i > 0) next.add(playOrder[i - 1]);
        return next;
      });
      i += 1;
      timer = window.setTimeout(tick, STEP_MS);
    };

    // First-frame state: clean board, then start.
    setPlayedIds(new Set());
    setActiveId(null);
    timer = window.setTimeout(tick, START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [isPlaying, playOrder]);

  const onTogglePlay = useCallback(() => {
    if (isPlaying) {
      // Pause: keep current state visible.
      setIsPlaying(false);
    } else {
      // Resume: rewind so the next loop starts clean.
      setActiveId(null);
      setPlayedIds(new Set());
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const nodes: Node[] = useMemo(() => {
    const agentNodes: Node[] = AGENTS.map((agent) => ({
      id: agent.id,
      type: 'agent',
      position: POSITIONS[agent.id],
      data: {
        agent,
        active: activeId === agent.id,
        played: playedIds.has(agent.id),
        selected: selectedId === agent.id,
        onSelect,
      } satisfies AgentNodeData,
      draggable: false,
    }));
    const phaseHeaderNodes: Node[] = PHASES.map((p) => ({
      id: `phase-header-${p.id}`,
      type: 'phaseHeader',
      position: HEADER_POSITIONS[p.id],
      data: { n: p.n, name: p.name, tagline: p.tagline },
      draggable: false,
      selectable: false,
    }));
    return [...phaseHeaderNodes, ...agentNodes];
  }, [activeId, playedIds, selectedId, onSelect]);

  const edges = useMemo(
    () => edgesHighlightedFrom(activeId, playedIds),
    [activeId, playedIds],
  );

  const selectedAgent = useMemo(
    () => (selectedId ? AGENTS.find((a) => a.id === selectedId) ?? null : null),
    [selectedId],
  );

  const playedCount = playedIds.size + (activeId ? 1 : 0);
  const interactionHint = isMobile
    ? 'drag · pinch to zoom · tap to inspect'
    : 'click any agent for details';
  const statusText = isPlaying
    ? `streaming · ${playedCount} / ${AGENTS.length} agents`
    : `paused · ${playedCount} / ${AGENTS.length} agents · ${interactionHint}`;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {statusText}
        </span>
        <button
          type="button"
          onClick={onTogglePlay}
          className="btn-secondary"
          aria-label={isPlaying ? 'Pause the flow' : 'Resume the flow'}
        >
          {isPlaying ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div
        style={{
          position: 'relative',
          height: isMobile ? 460 : 620,
          background: 'var(--color-bg-sunken)',
          border: '1px solid var(--color-border-muted)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          // `key` forces RF to remount on viewport mode change so its
          // internal fitView recomputes against the new container size
          // and gesture set. Without it, switching desktop -> mobile in
          // dev tools left the camera stuck at the old zoom.
          key={isMobile ? 'mobile' : 'desktop'}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypesAll}
          fitView
          // On mobile we clamp the initial fit at zoom >= 0.55 so the
          // chart opens at readable text size and overflows the viewport
          // sideways. Users pan right with their thumb through the
          // phases. Fitting the whole 1340px chart into a 375px screen
          // would render labels at ~2px — illegible. Desktop fits whole
          // chart at 0.4-0.45 which is fine on a wide screen.
          fitViewOptions={
            isMobile
              ? { padding: 0.06, minZoom: 0.55, maxZoom: 1.4 }
              : { padding: 0.12 }
          }
          // Global zoom range. Mobile bottom of 0.22 lets the user pinch
          // out to see the whole chart at once if they want overview.
          minZoom={isMobile ? 0.22 : 0.4}
          maxZoom={1.4}
          proOptions={{ hideAttribution: true }}
          // Desktop: fully locked, "diagram is a visual not a workspace".
          // Mobile: pan + pinch-zoom + double-tap zoom enabled so users
          // can actually navigate it on a small vertical screen. Node
          // dragging stays off everywhere (the layout is meaningful).
          panOnDrag={isMobile}
          panOnScroll={false}
          zoomOnScroll={isMobile}
          zoomOnPinch={isMobile}
          zoomOnDoubleClick={isMobile}
          preventScrolling={isMobile}
          nodesConnectable={false}
          nodesDraggable={false}
          elementsSelectable
          onPaneClick={() => setSelectedId(null)}
        >
          <Background
            gap={28}
            size={1}
            color="rgba(240, 168, 48, 0.10)"
          />
        </ReactFlow>

        {selectedAgent ? (
          <AgentDetailPanel
            agent={selectedAgent}
            onClose={() => setSelectedId(null)}
          />
        ) : null}
      </div>

      <p
        style={{
          marginTop: 14,
          fontSize: 12,
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
        }}
      >
        Each next agent reads the full prior transcript. Same shape as the
        engine's live debate orchestrator. Illustrative, not advice.
      </p>
    </div>
  );
}

// ─── Detail panel ──────────────────────────────────────────────────

function AgentDetailPanel({
  agent,
  onClose,
}: {
  agent: AgentSpec;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(420px, 100%)',
        background: 'var(--color-bg-card)',
        borderLeft: '1px solid var(--color-border-strong)',
        padding: '24px 26px',
        overflowY: 'auto',
        boxShadow: '-12px 0 28px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-accent)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}
        >
          {agent.role}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-default)',
            color: 'var(--color-text-secondary)',
            borderRadius: 4,
            padding: '2px 8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
          }}
        >
          esc
        </button>
      </div>
      <h3 style={{ marginTop: 6, fontSize: 22, color: 'var(--color-text-primary)' }}>
        {agent.name}
      </h3>
      <p
        style={{
          color: 'var(--color-accent)',
          fontSize: 13,
          marginTop: 4,
          fontFamily: 'var(--font-mono)',
        }}
      >
        {agent.focus}
      </p>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: 14,
          lineHeight: 1.6,
          marginTop: 16,
        }}
      >
        {agent.detail}
      </p>

      <div style={{ marginTop: 22, display: 'grid', gap: 14 }}>
        <FieldRow label="reads" value={agent.reads} />
        <FieldRow label="produces" value={agent.produces} />
        <FieldRow label="phase" value={agent.phase} />
      </div>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 13,
          marginTop: 3,
          lineHeight: 1.5,
        }}
      >
        {value}
      </div>
    </div>
  );
}
