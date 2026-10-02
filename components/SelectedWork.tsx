import Image from "next/image";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { web2Projects, web3Projects, contactLinks } from "@/components/data";

export default function SelectedWork({ dark }: { dark: boolean }) {
  const projects = dark ? web3Projects : web2Projects;

  return (
    <section className={`selected-work wrap section-space ${dark ? "web3-work" : "web2-work"}`} id="work">
      <div className="section-eyebrow"><span>01 / {dark ? "WEB3 WORK" : "WEB2 WORK"}</span><span>{dark ? "CHAIN STATE, MADE LEGIBLE" : "REAL PRODUCTS, SHIPPED FOR REAL USERS"}</span></div>
      <div className="studio-section-heading">
        <h2>{dark ? <>Protocol to product.<br /><span className="headline-accent">Onchain and usable.</span></> : <>Strategy to screen.<br /><span className="headline-accent">Built to perform.</span></>}</h2>
        <p>{dark ? "Research, payments and market intelligence built around verifiable state." : "A launch platform, a component system and an enterprise product experience."}</p>
      </div>
      <div className="project-collection">
        {projects.map((project,i)=>(
          <article className={`project-story ${i===0?"project-spotlight":""}`} key={project.name}>
            <a className="project-screen" href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live project`}>
              <div className="project-browser" aria-hidden="true"><span className="browser-dots"><i/><i/><i/></span><span>{new URL(project.live).hostname}</span><ArrowUpRight size={14}/></div>
              <div className="project-capture"><Image src={project.image} alt={project.imageAlt} width={1440} height={1000} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 680px"/><span className="project-visit">Open project <ArrowUpRight size={18}/></span></div>
            </a>
            <div className="project-story-body">
              <div className="project-kicker"><span>{project.type}</span><span>/{project.index}</span></div>
              <h3><a href={project.live} target="_blank" rel="noreferrer">{project.name}<ArrowUpRight size={24}/></a></h3>
              <strong className="project-focus">{project.focus}</strong>
              <p>{project.summary}</p>
              {i===0&&<ul className="project-details">{project.details.map(detail=><li key={detail}><ArrowRight size={14}/>{detail}</li>)}</ul>}
              <div className="project-technologies">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
              <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>Open project<ArrowUpRight size={16}/></a>{project.href&&<a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}><Github size={15}/>Source code</a>}</div>
            </div>
          </article>
        ))}
      </div>
      <a className="repo-index" href={contactLinks.github} target="_blank" rel="noreferrer"><span><Github size={21}/><span>{dark ? "More onchain experiments are in the making." : "The work continues beyond these three builds."}<small>{dark ? "Follow the protocols, research and next iterations." : "Follow the product experiments and reusable systems."}</small></span></span><span>@mrchaosdev <ArrowUpRight size={20}/></span></a>
    </section>
  );
}
