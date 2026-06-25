import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chaosdev — Fullstack & Web3 Engineer",
  description:
    "Portfolio of Chaosdev — fullstack and Web3 engineer building useful, expressive digital products.",
  openGraph: {
    title: "Chaosdev — Beyond the interface",
    description: "Fullstack systems, Web3 products, and motion-led experiences.",
    images: ["/chaos-avatar.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
