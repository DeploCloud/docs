"use client";

import "@xyflow/react/dist/style.css";
import { useEffect, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";
import { icons, Maximize2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { ART, type ArtName } from "@/components/diagram-art";

export type DiagramNodeData = {
  label: string;
  sub?: string;
  icon?: keyof typeof icons;
  accent?: boolean;
  art?: ArtName;
};

const SIDES = [
  ["t", Position.Top],
  ["r", Position.Right],
  ["b", Position.Bottom],
  ["l", Position.Left],
] as const;

function Box({ data }: NodeProps<Node<DiagramNodeData>>) {
  const Icon = data.icon ? icons[data.icon] : null;
  return (
    <div
      className={`flex min-h-[70px] w-[240px] items-center gap-3 rounded-xl border bg-fd-secondary px-3 py-2.5 shadow-lg ${data.accent ? "diagram-accent border-blue-400/50" : "border-fd-foreground/15"}`}
    >
      {data.art
        ? ART[data.art]
        : Icon && (
            <Icon
              className={`size-4 shrink-0 ${data.accent ? "text-blue-400" : "text-fd-muted-foreground"}`}
            />
          )}
      <div className="leading-tight">
        <div className="text-sm font-medium text-fd-foreground">
          {data.label}
        </div>
        {data.sub && (
          <div className="mt-0.5 text-xs text-fd-muted-foreground">
            {data.sub}
          </div>
        )}
      </div>
      {SIDES.map(([id, pos]) => (
        <span key={id}>
          <Handle
            id={id}
            type="source"
            position={pos}
            className="diagram-handle"
          />
          <Handle
            id={id}
            type="target"
            position={pos}
            className="diagram-handle"
          />
        </span>
      ))}
    </div>
  );
}

function Frame({ data }: NodeProps<Node<DiagramNodeData>>) {
  return (
    <div className="size-full rounded-2xl border border-dashed border-fd-foreground/15 bg-fd-card">
      <div className="px-3.5 pt-2.5 text-xs uppercase tracking-wide text-fd-muted-foreground">
        {data.label}
      </div>
    </div>
  );
}

const nodeTypes = { box: Box, frame: Frame };

export type DiagramEdge = Edge & { variant?: "flow" | "never" | "plain" };

function styleEdge({ variant = "plain", ...edge }: DiagramEdge): Edge {
  const never = variant === "never";
  const color = never
    ? "var(--color-fd-error)"
    : variant === "flow"
      ? "var(--color-blue-400)"
      : "var(--color-fd-muted-foreground)";
  return {
    type: "smoothstep",
    animated: variant === "flow",
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
    labelStyle: {
      fill: never ? color : "var(--color-fd-foreground)",
      fontSize: 12,
    },
    labelBgStyle: { fill: "var(--color-fd-background)" },
    labelBgPadding: [6, 3],
    labelBgBorderRadius: 6,
    ...edge,
    style: {
      stroke: color,
      strokeWidth: 1.5,
      strokeDasharray: never ? "5 5" : undefined,
      ...edge.style,
    },
  };
}

// From the declared layout, not measured nodes, so the box has its final size on first paint.
function aspectOf(nodes: Node<DiagramNodeData>[]) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const n of nodes) {
    const parent = n.parentId ? byId.get(n.parentId) : undefined;
    const x = n.position.x + (parent?.position.x ?? 0);
    const y = n.position.y + (parent?.position.y ?? 0);
    const w = Number(n.style?.width ?? 240);
    const h = Number(n.style?.height ?? 70);
    [x0, y0, x1, y1] = [
      Math.min(x0, x),
      Math.min(y0, y),
      Math.max(x1, x + w),
      Math.max(y1, y + h),
    ];
  }
  return (x1 - x0 + 120) / (y1 - y0 + 120);
}

function Flow({
  nodes,
  edges,
  interactive,
}: {
  nodes: Node<DiagramNodeData>[];
  edges: DiagramEdge[];
  interactive: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<ReactFlowInstance<
    Node<DiagramNodeData>,
    Edge
  > | null>(null);

  useEffect(() => {
    if (!flow || !box.current) return;
    const ro = new ResizeObserver(() => flow.fitView(FIT));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [flow]);

  return (
    <div ref={box} className="size-full">
      <ReactFlow
        nodes={nodes.map((n) => ({ type: "box", ...n }))}
        edges={edges.map(styleEdge)}
        nodeTypes={nodeTypes}
        onInit={setFlow}
        fitView
        fitViewOptions={FIT}
        minZoom={0.1}
        maxZoom={2.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={interactive}
        zoomOnScroll={interactive}
        zoomOnPinch={interactive}
        zoomOnDoubleClick={interactive}
        preventScrolling={interactive}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={18}
          size={1.6}
          color="color-mix(in srgb, var(--color-fd-foreground) 26%, transparent)"
        />
        {interactive && (
          <Controls
            showInteractive={false}
            fitViewOptions={FIT}
            position="bottom-right"
            orientation="horizontal"
          />
        )}
      </ReactFlow>
    </div>
  );
}

const FIT = { padding: 0.08, maxZoom: 1.25 };

export function Diagram({
  nodes,
  edges,
}: {
  nodes: Node<DiagramNodeData>[];
  edges: DiagramEdge[];
}) {
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [full]);

  return (
    <div className="not-prose diagram group relative my-6">
      <div className="overflow-x-auto rounded-xl border bg-fd-card">
        <div className="min-w-[720px]" style={{ aspectRatio: aspectOf(nodes) }}>
          <Flow nodes={nodes} edges={edges} interactive={false} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFull(true)}
        aria-label="Open the diagram full screen"
        className={`${buttonVariants({ color: "secondary", size: "icon-sm" })} absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100`}
      >
        <Maximize2 />
      </button>
      {full &&
        createPortal(
          <div
            role="dialog"
            aria-modal
            aria-label="Diagram"
            className="not-prose diagram fixed inset-0 z-[100] bg-fd-card"
          >
            <Flow nodes={nodes} edges={edges} interactive />
            <button
              type="button"
              onClick={() => setFull(false)}
              aria-label="Close"
              autoFocus
              className={`${buttonVariants({ color: "secondary", size: "icon-sm" })} absolute top-4 right-4 z-10`}
            >
              <X />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
