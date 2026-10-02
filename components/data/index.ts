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
    name: "ProofPulse",
    type: "ONCHAIN RESEARCH",
    summary: "Follow the wallets. Question the signal. An investigation workspace that connects Nansen cohort flows to the evidence behind each conclusion.",
    stack: ["Next.js", "TypeScript", "Nansen API"],
    href: "https://github.com/mrchaosdev/proofpulse",
    live: "https://proofpulse-eta.vercel.app",
    image: "/projects/proofpulse.png",
    imageAlt: "ProofPulse live homepage with token investigation and separate direction, confidence and coordination signals",
    focus: "Data → evidence → a clearer decision",
    details: ["Cohort flows & wallet relationships", "Separate direction, confidence and risk", "Traceable evidence for every finding"],
    tone: "violet",
    visual: "swap",
    metric: "NANSEN API",
    featured: true,
  },
  {
    index: "02",
    name: "ChaosPay",
    type: "WEB3 / PAYMENTS",
    summary: "Wallet-native USDC payments on Arc, with shareable payment links, QR checkout and receipts you can verify onchain.",
    stack: ["Next.js", "wagmi", "RainbowKit"],
    href: "https://github.com/mrchaosdev/arc-payment",
    live: "https://www.chaospayment.xyz/",
    image: "/projects/chaospay.png",
    imageAlt: "ChaosPay live homepage showing the USDC settlement path and a sample payment request",
    focus: "From payment request to proof of settlement",
    details: ["Payment links & QR checkout", "Wallet signing & receipts"],
    tone: "cyan",
    visual: "mint",
    metric: "USDC / ARC",
  },
  {
    index: "03",
    name: "Chaos Market AI",
    type: "AI / MARKET RESEARCH",
    summary: "Market data first, interpretation second. An agent workspace with indicators calculated in code and an inspectable execution trace.",
    stack: ["Next.js", "AI SDK", "PostgreSQL"],
    href: "https://github.com/mrchaosdev/chaos-market-ai",
    live: "https://agen-ai-wmxi.vercel.app",
    image: "/projects/market-ai.png",
    imageAlt: "Chaos Market AI live dashboard with candlestick chart, calculated indicators and signal evidence",
    focus: "Read-only research, with the evidence attached",
    details: ["Binance market data & indicators", "Inspectable agent execution"],
    tone: "pink",
    visual: "radar",
    metric: "READ-ONLY AGENT",
  },
  {
    index: "04",
    name: "Chaos UI",
    type: "DESIGN ENGINEERING",
    summary: "My own collection of React components, backgrounds and motion experiments. Explore the preview, inspect the source and compose an interface.",
    stack: ["React", "Motion", "GSAP"],
    href: "https://github.com/mrchaosdev/React",
    live: "https://reactui-gray.vercel.app",
    image: "/projects/chaos-ui.png",
    imageAlt: "Chaos UI live component library with motion previews and a component gallery",
    focus: "Small experiments. Reusable building blocks.",
    details: ["Components, sections & templates", "Interactive previews & source"],
    tone: "lime",
    visual: "dashboard",
    metric: "COMPONENT LIBRARY",
  },
  {
    index: "05",
    name: "Dlicom Attack",
    type: "GAME / INTERACTIVE",
    summary: "A browser auto-battle roguelite. Build your Dili, draft skills and fight through four chapters of a corrupted social network.",
    stack: ["React", "Phaser 3", "Zustand"],
    href: "https://github.com/mrchaosdev/Dlicom-go",
    live: "https://dlicom-attack.vercel.app",
    image: "/projects/dlicom.png",
    imageAlt: "Dlicom Attack live game homepage featuring Dili and the first playable chapter",
    focus: "A small hero with unreasonable firepower",
    details: ["Skill drafting & seeded combat", "Four playable chapters"],
    tone: "violet",
    visual: "game",
    metric: "BROWSER GAME",
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
