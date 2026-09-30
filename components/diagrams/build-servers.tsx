"use client";

import { Diagram } from "@/components/diagram";

export function BuildServerDiagram() {
  return (
    <Diagram
      nodes={[
        {
          id: "builder",
          position: { x: 0, y: 0 },
          data: {
            label: "Build server",
            sub: "Build only role",
            icon: "Hammer",
            art: "terminal",
            accent: true,
          },
        },
        {
          id: "cp",
          position: { x: 340, y: 0 },
          data: {
            label: "Control plane",
            sub: "relays the image",
            icon: "LayoutDashboard",
            art: "dashboard",
          },
        },
        {
          id: "target",
          position: { x: 680, y: 0 },
          data: {
            label: "App server",
            sub: "runs the app",
            icon: "Server",
            art: "containers",
          },
        },
      ]}
      edges={[
        {
          id: "e1",
          source: "builder",
          target: "cp",
          sourceHandle: "r",
          targetHandle: "l",
          label: "image",
          variant: "flow",
        },
        {
          id: "e2",
          source: "cp",
          target: "target",
          sourceHandle: "r",
          targetHandle: "l",
          label: "image",
          variant: "flow",
        },
      ]}
    />
  );
}
