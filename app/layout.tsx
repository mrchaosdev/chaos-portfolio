import type { Metadata } from "next";
import "./globals.css";
import "./cinematic.css";
import "./projects.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://chaos-portfolio-phi.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chaos — Web2 Products & Web3 Interfaces",
  description:
    "Selected Web2 and Web3 work by Chaos: fullstack product systems, onchain interfaces, AI research tools and design engineering.",
  openGraph: {
    title: "Chaos — A little chaos. A lot of craft.",
    description: "Onchain products, AI research tools and playful interfaces. Explore the projects and the code behind them.",
    images: [{ url: "/chaos-avatar-3d.png", alt: "Chaosdev — Light Studio" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
