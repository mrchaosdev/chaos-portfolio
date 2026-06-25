import { SiDotnet, SiWalletconnect, SiReact } from "react-icons/si";
import type { IconType } from "react-icons";

export const contactLinks = {
  github: "https://github.com/mrchaosdev",
  x: "https://x.com/Chaos_dev_",
  email: "mrchaos235@gmail.com",
};

export const bootLines = [
  "sync.identity / CHAOSDEV",
  "load.module / WEB2_FULLSTACK",
  "load.module / WEB3_FRONTEND",
  "translate.protocol / CHAIN_TO_PRODUCT",
  "signal.acquired / BRAND_READY",
];

export const protocolProps = [
  { name: "stack", value: '"Next.js / React / .NET / wagmi"', tone: "cyan" },
  { name: "status", value: '"available"', tone: "lime" },
  { name: "mode", value: '"web3 -> web2 translation"', tone: "pink" },
];

export const projects = [
  {
    index: "01",
    name: "ChaosSwap",
    type: "DEFI / AI ROUTING",
    summary: "A Web3 trading flow shaped like a familiar Web2 product: readable routing, wallet state and risk signals.",
    stack: ["React", "wagmi", "TypeScript", "Ethereum", "AI"],
    href: "https://github.com/TuanChao/swap-auto-ai",
    tone: "violet",
    visual: "swap",
    metric: "15+ CHAINS",
    featured: true,
  },
  {
    index: "02",
    name: "NFT AI Mint",
    type: "WEB3 / CREATIVE AI",
    summary: "Prompt-to-mint UX that hides the rough edges of storage, metadata and wallet confirmation.",
    stack: ["Next.js", "wagmi", "IPFS", "Ethereum", "AI"],
    href: "https://github.com/TuanChao/Nft-AI-mint",
    tone: "cyan",
    visual: "mint",
    metric: "PROMPT -> MINT",
  },
  {
    index: "03",
    name: "Roma Security",
    type: "CYBERSECURITY / MULTI-AGENT",
    summary: "Realtime security interface for detection, simulation and AI-assisted response.",
    stack: ["React", "Python", "AI", "Socket.IO"],
    href: "https://github.com/TuanChao/Roma-Security-cyber",
    tone: "pink",
    visual: "radar",
    metric: "5 AGENTS",
  },
  {
    index: "04",
    name: "ZWCAD Vietnam",
    type: "FULLSTACK / ENTERPRISE",
    summary: "A Web2 product site and admin system with typed UI, API structure and business-ready content flow.",
    stack: ["React", ".NET 8", "PostgreSQL", "i18next"],
    href: "https://github.com/TuanChao/landingPage",
    tone: "lime",
    visual: "dashboard",
    metric: "API + CMS",
  },
];

export type Capability = { icon: IconType; code: string; title: string; body: string; signal: string; };

export const capabilities: Capability[] = [
  {
    icon: SiDotnet,
    code: "01 / WEB2 CORE",
    title: "Fullstack Web2 systems",
    body: "Product interfaces backed by .NET APIs, PostgreSQL data models, admin flows and the boring stability real users need.",
    signal: "DATABASE -> API -> UI",
  },
  {
    icon: SiWalletconnect,
    code: "02 / WEB3 FRONTEND",
    title: "On-chain UX",
    body: "Wallet flows, swaps, NFT products and protocol dashboards translated into clear screens and confident actions.",
    signal: "CHAIN -> ACTION",
  },
  {
    icon: SiReact,
    code: "03 / CHAOS LAYER",
    title: "Web3 to Web2 translation",
    body: "I turn crypto-native complexity into interfaces that feel familiar, fast and trustworthy for Web2 users.",
    signal: "PROTOCOL -> PRODUCT",
  },
];

export const skillNodes = [
  { label: "NEXT", icon: "Next.js", x: "50%", y: "6%" },
  { label: "REACT", icon: "React", x: "78%", y: "14%" },
  { label: "TS", icon: "TypeScript", x: "94%", y: "38%" },
  { label: "WAGMI", icon: "wagmi", x: "92%", y: "63%" },
  { label: "ETH", icon: "Ethereum", x: "72%", y: "87%" },
  { label: ".NET", icon: ".NET 8", x: "50%", y: "94%" },
  { label: "SQL", icon: "PostgreSQL", x: "28%", y: "87%" },
  { label: "GSAP", icon: "GSAP", x: "8%", y: "63%" },
  { label: "IPFS", icon: "IPFS", x: "6%", y: "38%" },
  { label: "AI", icon: "AI", x: "22%", y: "14%" },
];

export const langLoopItems = ["TYPESCRIPT", ".NET 8", "SOLIDITY", "NODE.JS", "PYTHON"];

export const libLoopItems = [
  "NEXT.JS", "REACT", "POSTGRESQL", "TAILWIND", "VERCEL",
  "WAGMI", "ETHEREUM", "IPFS", "WALLETCONNECT", "GSAP", "WEBGL", "THREE.JS", "AI",
];

export const themeWorlds = [
  {
    eyebrow: "WEB3 / DARK THEME",
    title: "Protocol-native chaos",
    body: "Wallets, contracts, tokens, chain state and ownership logic live here. Powerful, but too raw for most users.",
    stack: ["wagmi", "Ethereum", "Solidity", "IPFS"],
    mode: "web3",
  },
  {
    eyebrow: "WEB2 / LIGHT THEME",
    title: "Product-native clarity",
    body: "Dashboards, admin flows, APIs and clean interfaces live here. Familiar patterns, fast decisions, lower friction.",
    stack: [".NET 8", "PostgreSQL", "Vercel", "i18next"],
    mode: "web2",
  },
];

export const bridgeStack = ["Next.js", "React", "TypeScript", "GSAP"];
