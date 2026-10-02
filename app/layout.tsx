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
  title: "Chaos — Web3, AI & Creative Development",
  description:
    "Selected work by Chaos: ProofPulse, ChaosPay, Chaos Market AI, Chaos UI and Dlicom Attack. Onchain products, AI research tools and playful interfaces.",
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
