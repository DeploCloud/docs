import "./global.css";
import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ClipboardFallback } from "@/components/clipboard-fallback";
import { DocsRootProvider } from "@/components/docs-root-provider";
import Script from "next/script";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Deplo Docs",
    default: "Deplo Docs",
  },
  description: "Documentation for Deplo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} ${funnelSans.variable} selection:bg-white/10`}
      suppressHydrationWarning
    >
      <Script
        src="https://stats.deplo.build/api/script.js"
        data-site-id="92b1aeff6a32"
        strategy="afterInteractive"
      />
      <body className="flex min-h-screen flex-col font-sans">
        <DocsRootProvider>
          <ScrollToTop />
          <ClipboardFallback />
          {children}
        </DocsRootProvider>
      </body>
    </html>
  );
}
