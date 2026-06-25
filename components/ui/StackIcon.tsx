'use client';

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiDotnet, SiEthereum, SiGreensock, SiI18Next, SiIpfs,
  SiNextdotjs, SiNodedotjs, SiOpenai, SiPostgresql, SiPython, SiReact,
  SiSocketdotio, SiSolidity, SiTailwindcss, SiThreedotjs, SiTypescript,
  SiVercel, SiWagmi, SiWalletconnect, SiWebgl,
} from "react-icons/si";
import type { LogoLoopItem } from "../LogoLoop";

export function getTechIcon(name: string): { Icon: IconType; color: string } {
  const n = name.toLowerCase();
  if (n.includes("next")) return { Icon: SiNextdotjs, color: "#ffffff" };
  if (n.includes("react")) return { Icon: SiReact, color: "#61dafb" };
  if (n.includes("type")) return { Icon: SiTypescript, color: "#3178c6" };
  if (n.includes(".net") || n.includes("dotnet")) return { Icon: SiDotnet, color: "#8b5cf6" };
  if (n.includes("postgres") || n.includes("sql")) return { Icon: SiPostgresql, color: "#4169e1" };
  if (n.includes("node")) return { Icon: SiNodedotjs, color: "#5fa04e" };
  if (n.includes("tailwind")) return { Icon: SiTailwindcss, color: "#06b6d4" };
  if (n.includes("vercel")) return { Icon: SiVercel, color: "#ffffff" };
  if (n.includes("wagmi")) return { Icon: SiWagmi, color: "#ffffff" };
  if (n.includes("wallet")) return { Icon: SiWalletconnect, color: "#3b99fc" };
  if (n.includes("ethereum") || n === "eth") return { Icon: SiEthereum, color: "#8ea2ff" };
  if (n.includes("solidity")) return { Icon: SiSolidity, color: "#d8d8d8" };
  if (n.includes("ipfs")) return { Icon: SiIpfs, color: "#65c2cb" };
  if (n.includes("python")) return { Icon: SiPython, color: "#ffd43b" };
  if (n.includes("socket") || n.includes("realtime")) return { Icon: SiSocketdotio, color: "#ffffff" };
  if (n.includes("i18")) return { Icon: SiI18Next, color: "#26a69a" };
  if (n.includes("gsap") || n.includes("green")) return { Icon: SiGreensock, color: "#88ce02" };
  if (n.includes("three")) return { Icon: SiThreedotjs, color: "#ffffff" };
  if (n.includes("webgl")) return { Icon: SiWebgl, color: "#e34f26" };
  if (n.includes("ai") || n.includes("openai")) return { Icon: SiOpenai, color: "#74aa9c" };
  return { Icon: SiReact, color: "#61dafb" };
}

export function StackIcon({ name }: { name: string }) {
  const { Icon, color } = getTechIcon(name);
  return <Icon className="tech-icon" style={{ "--tech-color": color } as CSSProperties} aria-hidden="true" focusable="false" />;
}

export function makeLogoItems(names: string[]): LogoLoopItem[] {
  return names.map(name => ({
    node: <StackIcon name={name} />,
    title: name,
  }));
}
