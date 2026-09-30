"use client";

import { Diagram } from "@/components/diagram";

export function HierarchyDiagram() {
  return (
    <Diagram
      nodes={[
        {
          id: "top",
          type: "frame",
          position: { x: 0, y: 0 },
          style: { width: 300, height: 150 },
          data: { label: "Team top level" },
        },
        {
          id: "blog",
          parentId: "top",
          position: { x: 30, y: 45 },
          data: { label: "blog", sub: "an App", icon: "Box" },
        },
        {
          id: "folder",
          type: "frame",
          position: { x: 340, y: 0 },
          style: { width: 300, height: 150 },
          data: { label: "Folder: Marketing" },
        },
        {
          id: "landing",
          parentId: "folder",
          position: { x: 30, y: 45 },
          data: {
            label: "landing, docs",
            sub: "Apps in a folder",
            icon: "FolderOpen",
          },
        },
        {
          id: "project",
          type: "frame",
          position: { x: 680, y: 0 },
          style: { width: 300, height: 265 },
          data: { label: "Project: Shop" },
        },
        {
          id: "prod",
          parentId: "project",
          position: { x: 30, y: 45 },
          data: {
            label: "Production",
            sub: "api, worker, db",
            icon: "Layers",
            accent: true,
          },
        },
        {
          id: "dev",
          parentId: "project",
          position: { x: 30, y: 170 },
          data: {
            label: "Development",
            sub: "api, worker, db",
            icon: "Layers",
          },
        },
      ]}
      edges={[
        {
          id: "e1",
          source: "prod",
          target: "dev",
          sourceHandle: "b",
          targetHandle: "t",
          label: "isolated networks",
          variant: "never",
        },
      ]}
    />
  );
}
