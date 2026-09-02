import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="deplo-aurora pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[55vh] overflow-hidden">
        <span className="deplo-blob" />
        <span className="deplo-blob" />
        <span className="deplo-blob" />
      </div>

      <span className="font-display text-9xl leading-none font-bold tracking-tighter sm:text-[10rem] md:text-[12rem]">
        404
      </span>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="max-w-md text-fd-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link
        href="/"
        className="cursor-pointer rounded-md bg-white px-5 py-2.5 font-medium text-black transition duration-300 focus:outline-hidden active:opacity-100 lg:hover:opacity-80"
      >
        Back to docs
      </Link>
    </div>
  );
}
