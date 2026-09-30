"use client";

import { Diagram } from "@/components/diagram";

export function BackupDiagram() {
  return (
    <Diagram
      nodes={[
        {
          id: "srv",
          type: "frame",
          position: { x: 0, y: 0 },
          style: { width: 300, height: 250 },
          data: { label: "Server with the data" },
        },
        {
          id: "data",
          parentId: "srv",
          position: { x: 30, y: 45 },
          data: {
            label: "db-orders",
            sub: "database or app data",
            icon: "Database",
            art: "database",
          },
        },
        {
          id: "age",
          parentId: "srv",
          position: { x: 30, y: 155 },
          data: {
            label: "age",
            sub: "compress and encrypt",
            icon: "Lock",
            art: "key",
            accent: true,
          },
        },
        {
          id: "s3",
          position: { x: 440, y: 45 },
          data: {
            label: "S3 bucket",
            sub: "AWS, R2, B2, MinIO",
            icon: "Cloud",
          },
        },
        {
          id: "folder",
          position: { x: 440, y: 155 },
          data: {
            label: "Another server",
            sub: "a folder on its disk",
            icon: "HardDrive",
          },
        },
      ]}
      edges={[
        {
          id: "e1",
          source: "data",
          target: "age",
          sourceHandle: "b",
          targetHandle: "t",
        },
        {
          id: "e2",
          source: "age",
          target: "s3",
          sourceHandle: "r",
          targetHandle: "l",
          label: "encrypted",
          variant: "flow",
        },
        {
          id: "e3",
          source: "age",
          target: "folder",
          sourceHandle: "r",
          targetHandle: "l",
          variant: "flow",
        },
      ]}
    />
  );
}
