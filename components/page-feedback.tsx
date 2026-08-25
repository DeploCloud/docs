"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

export function PageFeedback() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-8 flex flex-row flex-wrap items-center justify-between gap-4 border-t pt-4 text-sm text-fd-muted-foreground">
      {vote === null ? (
        <>
          <p>Did this page help you?</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Yes, this page helped"
              onClick={() => setVote("up")}
              className={buttonVariants({ color: "outline", size: "icon-sm" })}
            >
              <ThumbsUp className="size-4" />
            </button>
            <button
              type="button"
              aria-label="No, this page didn't help"
              onClick={() => setVote("down")}
              className={buttonVariants({ color: "outline", size: "icon-sm" })}
            >
              <ThumbsDown className="size-4" />
            </button>
          </div>
        </>
      ) : (
        <p>
          {vote === "up"
            ? "Thanks for the feedback!"
            : "Thanks, we'll use this to improve the page."}
        </p>
      )}
    </div>
  );
}
