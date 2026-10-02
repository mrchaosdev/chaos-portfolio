import Image from "next/image";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { projects, contactLinks } from "@/components/data";

export default function SelectedWork() {
  return (
    <section className="selected-work wrap section-space" id="work">
      <div className="section-eyebrow"><span>01 / SELECTED WORK</span><span>BUILT, SHIPPED & STILL EVOLVING</span></div>
      <div className="studio-section-heading"><h2>Out of my head.<br /><span className="headline-accent">Into your browser.</span></h2><p>Onchain tools, AI research, a component library and a game. Different ideas, built to be used.</p></div>
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
              <p>{project.summary}</p>
              {i===0&&<ul className="project-details">{project.details.map(detail=><li key={detail}><ArrowRight size={14}/>{detail}</li>)}</ul>}
              <div className="project-technologies">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
              <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>{project.visual==="game"?"Play the game":"Open project"}<ArrowUpRight size={16}/></a><a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}><Github size={15}/>Source code</a></div>
            </div>
          </article>
        ))}
      </div>
      <a className="repo-index" href={contactLinks.github} target="_blank" rel="noreferrer"><span><Github size={21}/><span>There&apos;s more in the making.<small>Follow the code, experiments and next iterations.</small></span></span><span>@mrchaosdev <ArrowUpRight size={20}/></span></a>
    </section>
  );
}
