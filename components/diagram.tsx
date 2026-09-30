"use client";

import "@xyflow/react/dist/style.css";
import { useEffect, useRef, useState } from "react";
import {
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
import { icons } from "lucide-react";

export type DiagramNodeData = {
  label: string;
  sub?: string;
  icon?: keyof typeof icons;
  accent?: boolean;
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
      className={`flex w-[220px] items-center gap-2.5 rounded-xl border bg-fd-card px-3.5 py-2.5 shadow-lg ${data.accent ? "diagram-accent border-blue-400/50" : "border-fd-foreground/15"}`}
    >
      {Icon && (
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
    <div className="size-full rounded-2xl border border-dashed border-fd-foreground/15 bg-fd-foreground/[0.02]">
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
    const w = Number(n.style?.width ?? 220);
    const h = Number(n.style?.height ?? 60);
    [x0, y0, x1, y1] = [
      Math.min(x0, x),
      Math.min(y0, y),
      Math.max(x1, x + w),
      Math.max(y1, y + h),
    ];
  }
  return (x1 - x0 + 120) / (y1 - y0 + 180);
}

export function Diagram({
  nodes,
  edges,
}: {
  nodes: Node<DiagramNodeData>[];
  edges: DiagramEdge[];
}) {
  const box = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [flow, setFlow] = useState<ReactFlowInstance<
    Node<DiagramNodeData>,
    Edge
  > | null>(null);
  const aspect = aspectOf(nodes);

  // Drag-to-pan only with a mouse: on touch it would swallow the page scroll.
  useEffect(() => {
    setFinePointer(matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!flow || !box.current) return;
    const ro = new ResizeObserver(() => flow.fitView({ padding: 0.08 }));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [flow]);

  return (
    <div className="not-prose diagram my-6 overflow-x-auto rounded-xl border bg-fd-background">
      <div ref={box} className="min-w-[720px]" style={{ aspectRatio: aspect }}>
        <ReactFlow
          nodes={nodes.map((n) => ({ type: "box", ...n }))}
          edges={edges.map(styleEdge)}
          nodeTypes={nodeTypes}
          onInit={setFlow}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.1}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={finePointer}
          zoomOnScroll={false}
          zoomOnPinch
          zoomOnDoubleClick
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Controls
            showInteractive={false}
            fitViewOptions={{ padding: 0.08 }}
            position="bottom-right"
            orientation="horizontal"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
