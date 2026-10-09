import { Star } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";

const REPO = "DeploCloud/deplo";

async function getStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

const formatStars = (count: number) =>
  count < 1000 ? String(count) : `${Math.round(count / 100) / 10}k`.replace(/\.0k$/, "k");

/** The star count next to the GitHub mark, as in deplo.build's header and footer. */
export async function GithubBadge({ bare = false }: { bare?: boolean }) {
  const stars = await getStars();
  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`interact flex items-center gap-2 text-sm text-white ${bare ? "px-2" : "rounded-full border border-white/15 bg-black px-3 py-1.5"}`}
    >
      <GithubIcon className="size-4" />
      <span>{stars === null ? "-" : formatStars(stars)}</span>
      <Star className="size-4 fill-yellow-400 text-yellow-400" />
    </a>
  );
}
