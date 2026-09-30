"use client";

import { Diagram } from "@/components/diagram";

export function PartsDiagram() {
  return (
    <Diagram
      nodes={[
        { id: "you", position: { x: 0, y: 0 }, data: { label: "You", sub: "dashboard, API", icon: "User" } },
        { id: "cp", position: { x: 320, y: 0 }, data: { label: "Control plane", sub: "decides", icon: "LayoutDashboard" } },
        { id: "srv", type: "frame", position: { x: 640, y: -45 }, style: { width: 600, height: 150 }, data: { label: "Every server" } },
        { id: "agent", parentId: "srv", position: { x: 30, y: 45 }, data: { label: "deplo-agent", sub: "executes", icon: "Cpu" } },
        { id: "docker", parentId: "srv", position: { x: 350, y: 45 }, data: { label: "Docker", sub: "containers, volumes", icon: "Container" } },
      ]}
      edges={[
        { id: "e1", source: "you", target: "cp", sourceHandle: "r", targetHandle: "l", label: "HTTPS" },
        { id: "e2", source: "cp", target: "agent", sourceHandle: "r", targetHandle: "l", label: "mTLS", variant: "flow" },
        { id: "e3", source: "agent", target: "docker", sourceHandle: "r", targetHandle: "l", variant: "flow" },
        { id: "e4", source: "cp", target: "docker", sourceHandle: "b", targetHandle: "b", label: "never directly", variant: "never" },
      ]}
    />
  );
}

export function TraefikDiagram() {
  return (
    <Diagram
      nodes={[
        { id: "le", position: { x: 340, y: -110 }, data: { label: "Let's Encrypt", sub: "certificates", icon: "ShieldCheck" } },
        { id: "web", position: { x: 0, y: 60 }, data: { label: "Visitors", sub: "ports 80 and 443", icon: "Globe" } },
        { id: "traefik", position: { x: 340, y: 60 }, data: { label: "deplo-traefik", sub: "routes, TLS", icon: "Waypoints" } },
        { id: "a", position: { x: 680, y: 0 }, data: { label: "blog", sub: "blog.example.com", icon: "Box" } },
        { id: "b", position: { x: 680, y: 120 }, data: { label: "api", sub: "api.example.com", icon: "Box" } },
        { id: "agent", position: { x: 340, y: 230 }, data: { label: "deplo-agent", sub: "writes the rules", icon: "Cpu" } },
      ]}
      edges={[
        { id: "e1", source: "web", target: "traefik", sourceHandle: "r", targetHandle: "l", variant: "flow" },
        { id: "e2", source: "traefik", target: "a", sourceHandle: "r", targetHandle: "l", variant: "flow" },
        { id: "e3", source: "traefik", target: "b", sourceHandle: "r", targetHandle: "l", variant: "flow" },
        { id: "e4", source: "le", target: "traefik", sourceHandle: "b", targetHandle: "t", label: "renewed by Traefik" },
        { id: "e5", source: "agent", target: "traefik", sourceHandle: "t", targetHandle: "b", label: "routing rules" },
      ]}
    />
  );
}

export function DataDiagram() {
  return (
    <Diagram
      nodes={[
        { id: "cpf", type: "frame", position: { x: 0, y: 0 }, style: { width: 280, height: 220 }, data: { label: "Control plane" } },
        { id: "cp", parentId: "cpf", position: { x: 30, y: 45 }, data: { label: "Dashboard and API", icon: "LayoutDashboard" } },
        { id: "pg", parentId: "cpf", position: { x: 30, y: 135 }, data: { label: "Postgres", sub: "apps, teams, secrets", icon: "Database" } },
        { id: "srvf", type: "frame", position: { x: 400, y: 0 }, style: { width: 280, height: 220 }, data: { label: "Your servers" } },
        { id: "agent", parentId: "srvf", position: { x: 30, y: 45 }, data: { label: "deplo-agent", icon: "Cpu" } },
        { id: "vol", parentId: "srvf", position: { x: 30, y: 135 }, data: { label: "Docker volumes", sub: "your app data", icon: "HardDrive" } },
        { id: "dest", position: { x: 800, y: 135 }, data: { label: "Backup destination", sub: "another server", icon: "Archive" } },
      ]}
      edges={[
        { id: "e1", source: "cp", target: "pg", sourceHandle: "b", targetHandle: "t" },
        { id: "e2", source: "agent", target: "vol", sourceHandle: "b", targetHandle: "t" },
        { id: "e3", source: "cp", target: "agent", sourceHandle: "r", targetHandle: "l", label: "mTLS", variant: "flow" },
        { id: "e4", source: "vol", target: "dest", sourceHandle: "r", targetHandle: "l", label: "encrypted backup", variant: "flow" },
      ]}
    />
  );
}

export function SecretsDiagram() {
  return (
    <Diagram
      nodes={[
        { id: "you", position: { x: 0, y: 0 }, data: { label: "You", sub: "set a secret", icon: "User" } },
        { id: "cp", position: { x: 340, y: 0 }, data: { label: "Control plane", sub: "decrypts at deploy", icon: "KeyRound" } },
        { id: "pg", position: { x: 680, y: 0 }, data: { label: "Postgres", sub: "encrypted at rest", icon: "Database" } },
        { id: "agent", position: { x: 340, y: 160 }, data: { label: "deplo-agent", sub: "never holds the key", icon: "Cpu" } },
        { id: "app", position: { x: 680, y: 160 }, data: { label: "Your container", sub: "gets the values", icon: "Box" } },
      ]}
      edges={[
        { id: "e1", source: "you", target: "cp", sourceHandle: "r", targetHandle: "l", label: "write-only" },
        { id: "e2", source: "cp", target: "pg", sourceHandle: "r", targetHandle: "l", label: "DEPLO_SECRET" },
        { id: "e3", source: "cp", target: "agent", sourceHandle: "b", targetHandle: "t", label: "mTLS", variant: "flow" },
        { id: "e4", source: "agent", target: "app", sourceHandle: "r", targetHandle: "l", variant: "flow" },
        { id: "e5", source: "cp", target: "you", sourceHandle: "b", targetHandle: "b", label: "never read back", variant: "never" },
      ]}
    />
  );
}
