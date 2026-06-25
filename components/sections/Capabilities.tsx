'use client';

import type { CSSProperties } from "react";
import { Cpu, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { StackIcon } from "../ui/StackIcon";
import { capabilities, skillNodes } from "../data";

export default function Capabilities() {
  return (
    <section className="capabilities section-shell" id="services">
      <div className="section-index" data-reveal><span>03</span><span>CAPABILITIES</span></div>
      <div className="capabilities-lab">
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, code, title, body, signal }) => (
            <article className="capability-card" key={title} data-reveal>
              <div className="cap-card-head">
                <div className="cap-icon"><Icon /></div>
                <span>{code}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
              <strong>{signal}</strong>
            </article>
          ))}
        </div>
        <div className="skill-orbit" data-reveal aria-label="Technology orbit">
          <div className="skill-ring ring-a" />
          <div className="skill-ring ring-b" />
          <div className="skill-core">
            <Cpu />
            <span>CHAOS CORE</span>
          </div>
          {skillNodes.map((node) => (
            <span className="skill-node" style={{ "--x": node.x, "--y": node.y } as CSSProperties} key={node.label}>
              <StackIcon name={node.icon} />
              <b>{node.label}</b>
            </span>
          ))}
        </div>
      </div>
      <div className="principles" data-reveal>
        <span><Zap /> WEB2 CLARITY</span>
        <span><ShieldCheck /> SECURITY-MINDED</span>
        <span><Sparkles /> WEB3 FEELING</span>
      </div>
    </section>
  );
}
