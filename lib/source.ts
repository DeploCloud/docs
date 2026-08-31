import { createElement, Fragment } from "react";
import { icons, FlaskConical } from "lucide-react";
import { loader } from "fumadocs-core/source";
import { visit } from "fumadocs-core/page-tree";
import { docs } from "@/.source/server";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

// Pages documenting a feature still in beta: flagged in the sidebar with a
// trailing flask icon. Keep in sync with the beta Callout on each page.
const BETA_PAGES = new Set([
  "/getting-started/install",
  "/guides/server/container-registries",
  "/guides/server/cleanup",
  "/advanced/build-servers",
  "/guides/mcp-server",
]);

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon === "DeploMark") {
      return createElement(
        "svg",
        { viewBox: "0 0 337 337", fill: "currentColor", "aria-hidden": true },
        createElement("path", { d: DEPLO_MARK_PATH }),
      );
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

visit(source.pageTree, (node) => {
  if (node.type === "page" && BETA_PAGES.has(node.url)) {
    node.name = createElement(
      Fragment,
      null,
      node.name,
      createElement(FlaskConical, {
        className:
          "ms-1.5 inline size-3.5 shrink-0 align-text-bottom text-fd-muted-foreground",
        "aria-hidden": true,
      }),
    );
  }
});
