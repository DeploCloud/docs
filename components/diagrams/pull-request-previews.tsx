"use client";

import { Diagram } from "@/components/diagram";

export function PreviewSourcesDiagram() {
  return (
    <Diagram
      nodes={[
        {
          id: "own",
          position: { x: 0, y: 0 },
          data: {
            label: "Pull request #42",
            sub: "from your repository",
            icon: "GitPullRequest",
            art: "git",
          },
        },
        {
          id: "stack",
          position: { x: 340, y: 0 },
          data: {
            label: "Preview stack",
            sub: "deplo-blog__pr-42",
            icon: "Container",
            art: "containers",
            accent: true,
          },
        },
        {
          id: "url",
          position: { x: 680, y: 0 },
          data: {
            label: "blog-pr-42",
            sub: "the preview URL",
            icon: "Globe",
          },
        },
        {
          id: "fork",
          position: { x: 0, y: 170 },
          data: {
            label: "Pull request #43",
            sub: "from a fork",
            icon: "GitFork",
            art: "git",
          },
        },
        {
          id: "approve",
          position: { x: 340, y: 170 },
          data: {
            label: "Needs approval",
            sub: "manage_previews",
            icon: "UserCheck",
          },
        },
      ]}
      edges={[
        {
          id: "e1",
          source: "own",
          target: "stack",
          sourceHandle: "r",
          targetHandle: "l",
          label: "app variables",
          variant: "flow",
        },
        {
          id: "e2",
          source: "stack",
          target: "url",
          sourceHandle: "r",
          targetHandle: "l",
          variant: "flow",
        },
        {
          id: "e3",
          source: "fork",
          target: "approve",
          sourceHandle: "r",
          targetHandle: "l",
        },
        {
          id: "e4",
          source: "approve",
          target: "stack",
          sourceHandle: "t",
          targetHandle: "b",
          label: "only preview overrides",
        },
      ]}
    />
  );
}
