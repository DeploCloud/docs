import "./global.css";
import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { DocsRootProvider } from "@/components/docs-root-provider";

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
      <body className="flex min-h-screen flex-col font-sans">
        <DocsRootProvider>
          <ScrollToTop />
          {children}
        </DocsRootProvider>
      </body>
    </html>
  );
}
