"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { FeedbackIllustration } from "@/components/feedback-illustration";

export function PageFeedback() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border bg-fd-card p-6 text-center text-fd-card-foreground">
      <FeedbackIllustration />
      {vote === null ? (
        <>
          <p className="text-sm text-fd-muted-foreground">Did this page help you?</p>
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
        <p className="text-sm text-fd-muted-foreground">
          {vote === "up"
            ? "Thanks for the feedback!"
            : "Thanks, we'll use this to improve the page."}
        </p>
      )}
    </div>
  );
}
