'use client';

import { ArrowUpRight } from "lucide-react";
import { StackIcon } from "../ui/StackIcon";
import ProjectVisual from "../ui/ProjectVisual";
import { projects, contactLinks } from "../data";

export default function Work() {
  return (
    <section className="work section-shell" id="work">
      <div className="section-index" data-reveal><span>02</span><span>SELECTED BUILDS</span></div>
      <div className="section-heading" data-reveal>
        <h2>Proof of translation.</h2>
        <p>A selected mix of Web2 systems, Web3 flows, AI and realtime products — built to make complex tech feel usable.</p>
      </div>
      <div className="project-bento">
        {projects.map((project) => (
          <a className={`project-card ${project.tone}${project.featured ? " featured" : ""}`} href={project.href} target="_blank" rel="noreferrer" key={project.name} data-reveal>
            <div className="project-card-top">
              <span>{project.index}</span>
              <small>{project.type}</small>
              <ArrowUpRight />
            </div>
            <div className="project-visual" aria-hidden="true">
              <ProjectVisual type={project.visual} />
            </div>
            <div className="project-card-body">
              <span className="project-metric">{project.metric}</span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="project-stack">{project.stack.map((item) => <span key={item}><StackIcon name={item} />{item}</span>)}</div>
            </div>
          </a>
        ))}
      </div>
      <a className="text-link" href={contactLinks.github} target="_blank" rel="noreferrer" data-reveal>View GitHub profile <ArrowUpRight /></a>
    </section>
  );
}
