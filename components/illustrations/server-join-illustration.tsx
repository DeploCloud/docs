import type { SVGProps } from "react";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

/**
 * A server enrolling: four beats (token, certificate signing request,
 * pin, online) along the path into the box, which carries the Deplo
 * mark once it has joined the fleet. Widened into a rectangular frame
 * to match the horizontal beat, instead of a tall empty square. The
 * last beat sits in fd-success, the moment the server is trusted.
 * Static.
 */
export function ServerJoinIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="16" y1="50" x2="140" y2="50" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      <rect x="140" y="22" width="60" height="56" rx="8" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <g transform="translate(156,36) scale(0.0831)" className="fill-fd-primary">
        <path d={DEPLO_MARK_PATH} />
      </g>

      <circle cx="32" cy="50" r="5" className="fill-fd-primary" />
      <circle cx="64" cy="50" r="5" className="fill-fd-primary" />
      <circle cx="96" cy="50" r="5" className="fill-fd-primary" />
      <circle cx="128" cy="50" r="5" className="fill-fd-success" />
    </svg>
  );
}
