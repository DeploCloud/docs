"use client";

import { Diagram } from "@/components/diagram";

export function IsolationDiagram() {
  return (
    <Diagram
      nodes={[
        {
          id: "traefik",
          position: { x: 230, y: -170 },
          data: {
            label: "deplo-traefik",
            sub: "joins every network",
            icon: "Waypoints",
            art: "router",
            accent: true,
          },
        },
        {
          id: "prod",
          type: "frame",
          position: { x: 0, y: 0 },
          style: { width: 300, height: 250 },
          data: { label: "deplo-env Production" },
        },
        {
          id: "web",
          parentId: "prod",
          position: { x: 30, y: 45 },
          data: {
            label: "web",
            sub: "Shop / Production",
            icon: "Box",
            accent: true,
          },
        },
        {
          id: "db",
          parentId: "prod",
          position: { x: 30, y: 155 },
          data: {
            label: "db-orders",
            sub: "managed database",
            icon: "Database",
          },
        },
        {
          id: "stg",
          type: "frame",
          position: { x: 460, y: 0 },
          style: { width: 300, height: 150 },
          data: { label: "deplo-env Staging" },
        },
        {
          id: "stgweb",
          parentId: "stg",
          position: { x: 30, y: 45 },
          data: { label: "web", sub: "Shop / Staging", icon: "Box" },
        },
      ]}
      edges={[
        {
          id: "e1",
          source: "web",
          target: "db",
          sourceHandle: "b",
          targetHandle: "t",
          label: "by name",
          variant: "flow",
        },
        {
          id: "e2",
          source: "web",
          target: "stgweb",
          sourceHandle: "r",
          targetHandle: "l",
          label: "never by name",
          variant: "never",
        },
        {
          id: "e3",
          source: "traefik",
          target: "web",
          sourceHandle: "l",
          targetHandle: "t",
        },
        {
          id: "e4",
          source: "traefik",
          target: "stgweb",
          sourceHandle: "r",
          targetHandle: "t",
        },
      ]}
    />
  );
}
