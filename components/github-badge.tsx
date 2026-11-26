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

function formatStars(count: number) {
  if (count < 1000) return String(count);
  const value = count / 1000;
  return `${value >= 10 ? Math.round(value) : Math.round(value * 10) / 10}k`;
}

// deplo.build's "Show stars from" (Header in its CMS): below it the badge just says GitHub.
const STARS_FROM = 500;

/** The star count next to the GitHub mark, as in deplo.build's footer. */
export async function GithubBadge() {
  const stars = await getStars();
  const count = stars !== null && stars >= STARS_FROM ? stars : null;
  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="interact flex items-center gap-2 rounded-full border border-white/15 bg-black px-3 py-1.5 text-sm text-white"
    >
      <GithubIcon className="size-4" />
      {count === null ? (
        <span>GitHub</span>
      ) : (
        <>
          <span>{formatStars(count)}</span>
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
        </>
      )}
    </a>
  );
}
