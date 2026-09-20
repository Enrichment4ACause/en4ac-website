import React, {useState} from 'react';
import {ArrowUpRight, ArrowRight, X, Menu, Code2, PenTool, Microscope, Wrench} from 'lucide-react';
import '../styles.css';
const join='https://forms.gle/BU9ed6iPKSm2iHud6';
type DeviceKind = 'switch' | 'joystick' | 'connect';
interface Project {
  name: string;
  type: string;
  text: string;
  description: string;
  skills: string;
  icon: DeviceKind;
}
interface JoinButtonProps {
  label?: string;
  placement?: 'header' | 'footer';
}
interface ModalProps {
  title: string;
  children: React.ReactNode;
  close: () => void;
}
const projects: Project[]=[{name:'Low Profile Switch',type:'Electronics',text:'A low-force switch that makes devices easier to activate for people with limited strength or range of motion.',description:'Students print the housing, assemble and wire the switch, then test it for reliable activation. The finished device can connect to switch-accessible technology and give its user a simpler way to interact with it.',skills:'Circuits, assembly, testing',icon:'switch'},{name:'Oak Compact Joystick',type:'Engineering',text:'A compact joystick that gives adaptive gamers another way to control movement.',description:'Students assemble the electronics and 3D-printed housing, choose a topper, and test the finished joystick. It can connect to an Xbox Adaptive Controller or compatible hub for use as a thumbstick, mouse, or game controller.',skills:'Wiring, CAD, adaptive gaming',icon:'joystick'},{name:'Connect Board',type:'Engineering',text:'A stable surface that keeps switches, joysticks, and other assistive controls where a user needs them.',description:'Students build a low-profile, non-slip board with hook-and-loop mounting. The board folds for transport and can hold several assistive devices securely on a table or tray.',skills:'3D printing, assembly, assistive technology',icon:'connect'}];
function Logo(){return <a className="logo" href="/" aria-label="Enrichment For A Cause home"><img className="brand-logo" src="/images/en4ac-logo.svg" alt="" width="54" height="54"/><span>en4ac</span></a>}
function JoinButton({label='Join the club',placement='header'}: JoinButtonProps){
  const [expanded,setExpanded]=useState(false);
  const trigger=React.useRef<HTMLButtonElement>(null);
  const discord=React.useRef<HTMLAnchorElement>(null);
  const optionsId=React.useId();
  React.useEffect(()=>{
    if(!expanded)return;
    discord.current?.focus({preventScroll:true});
  },[expanded]);
  const close=()=>{setExpanded(false);requestAnimationFrame(()=>trigger.current?.focus({preventScroll:true}))};
  return <div className={`join-split join-split-${placement}${expanded?' is-expanded':''}`} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();close()}}}>
    <button ref={trigger} className="button nav-join" aria-hidden={expanded} tabIndex={expanded?-1:0} aria-expanded={expanded} aria-controls={optionsId} onClick={()=>setExpanded(true)}>{label}</button>
    {expanded&&<div className="join-options" id={optionsId} role="group" aria-label={label}>
      <a ref={discord} className="join-option join-discord" href="https://discord.gg/DMuy3Atmmc" target="_blank" rel="noreferrer" aria-label="Join our Discord" title="Join our Discord"><svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.994 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.334-.955 2.42-2.157 2.42Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.42-2.157 2.42Z"/></svg><span className="join-tooltip" aria-hidden="true">Discord</span></a>
      <a className="join-option join-register" href={join} target="_blank" rel="noreferrer" aria-label="Complete your registration" title="Complete your registration"><img className="google-forms-icon" src="/images/google-forms-logo.png" width="28" height="28" alt=""/><span className="join-tooltip" aria-hidden="true">Registration</span></a>
    </div>}
  </div>
}
function Header(){let[open,setOpen]=useState(false);return <header className="header"><Logo/><nav className={open?'nav open':'nav'} aria-label="Main navigation"><a href="#about" onClick={()=>setOpen(false)}>Our purpose</a><a href="#projects" onClick={()=>setOpen(false)}>The projects</a><a href="#get-involved" onClick={()=>setOpen(false)}>For nonprofits</a></nav><JoinButton/><button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>}
function Device({kind}: {kind: DeviceKind}){const photos: Record<DeviceKind, [string, string]>={switch:['mmc-switch-cutout.png','Yellow 3D-printed Low Profile Switch'],joystick:['mmc-joystick.png','Green and brown Oak Compact Joystick with its connecting cable'],connect:['mmc-connect-board.jpg','Connect Board holding three assistive switches in place']};const [file,alt]=photos[kind];return <div className={`mmc-photo mmc-photo-${kind}`}><img src={`/images/${file}`} alt={alt}/></div>}
function ProjectCards(){let[selected,setSelected]=useState<Project | null>(null);return <><div className="project-grid">{projects.map((p,i)=><button className={`project-card project-${i}`} key={p.name} onClick={()=>setSelected(p)}><div className="project-visual"><Device kind={p.icon}/></div><div className="project-info"><h3>{p.name}<ArrowUpRight size={21}/></h3><p>{p.text}</p></div></button>)}</div>{selected&&<Modal close={()=>setSelected(null)} title={selected.name}><p>{selected.description}</p><p><strong>Explore:</strong> {selected.skills}</p><p>Choose a team of four, with a project manager, tech lead, ideator, and communications leader.</p><a className="button" href={join} target="_blank" rel="noreferrer">Complete your member profile <ArrowUpRight size={18}/></a></Modal>}</>}
function Modal({title,children,close}: ModalProps){const ref=React.useRef<HTMLDialogElement>(null);React.useEffect(()=>{const prior=document.activeElement;ref.current?.showModal();document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';if(prior instanceof HTMLElement)prior.focus()}},[]);return <dialog ref={ref} className="modal" onCancel={close} onClick={e=>{if(e.target===ref.current)close()}}><button className="modal-close" onClick={close} aria-label="Close project details"><X/></button><small>Makers Making Change</small><h2>{title}</h2>{children}</dialog>}
function SectionProjects(){return <section className="projects-section section" id="projects"><div className="section-heading"><div><h2>Makers Making Change projects</h2></div></div><ProjectCards/></section>}
function About(){return <section className="about-section section" id="about"><div><span className="section-note">This is Enrichment For A Cause</span><h2>Your skills have<br/>somewhere to go.</h2></div><div><p className="about-lead">Nonprofits have important work to do. Students have ideas, curiosity, and the drive to help. We bring them together.</p><p>We take on projects that small nonprofit teams may not have the time or resources to do. You get real experience, a team to learn with, and work that matters beyond the classroom.</p><div className="skill-tags"><span><Code2 size={17}/> Technology</span><span><PenTool size={17}/> Design & media</span><span><Microscope size={17}/> Research</span><span><Wrench size={17}/> Engineering</span></div></div></section>}
function CaseStudy(){return <section className="case-study section"><img src="/images/makewater-kit.jpg" alt="MakeWater coding kit with a blue enclosure, micro:bit, water container, and connecting cables" loading="lazy"/><div><h2>MakeWater<br/>Coding Kit.</h2><p>Our students designed a circuit board, wrote code to interpret light readings, and built a CAD enclosure to help gauge water pollution.</p><p>MakeWater accepted the work and is exploring improvements to its appearance and marketability.</p></div></section>}
function EanesStudy(){return <section className="case-study eanes-study section"><div><img className="eanes-logo" src="/images/eanes-isd-logo.png" alt="Eanes Independent School District"/><h2>Accessible Giant<br/>Connect Four.</h2><p>For Eanes Assistive Technology, our students are designing an oversized Connect Four game that more students can reach, handle, and enjoy together.</p><p>The team is planning the board, pieces, and materials, then will build and test a classroom-ready version with Eanes staff.</p></div><img src="/images/eanes-connect-four.jpg" alt="A young child reaching up to place a large disc in a child-height Connect Four board" loading="lazy"/></section>}
function ProjectStudies(){return <><CaseStudy/><EanesStudy/></>}
function Footer(){return <><section className="join-section section" id="get-involved"><div><h2>Let’s put your<br/>ideas to work.</h2><JoinButton label="Join En4AC" placement="footer"/></div><div className="nonprofit"><h3>Have a project for us?</h3><p>Tell us what your nonprofit needs. We’ll talk about the skills, scope, and student team that could help.</p><a className="nonprofit-email" href="mailto:enrichment4acause@gmail.com">enrichment4acause@gmail.com</a></div></section><footer><Logo/><span className="footer-instagram">Instagram</span><a href="mailto:enrichment4acause@gmail.com">Get in touch</a><span className="copyright">© {new Date().getFullYear()} En4AC</span></footer></>}
function ClubStats(){
  const [progress,setProgress]=useState(0);
  React.useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const start=performance.now();
    const tick=(now: number)=>{const elapsed=Math.min((now-start)/1600,1);setProgress(1-Math.pow(1-elapsed,3));if(elapsed<1)frame=requestAnimationFrame(tick)};
    const onPreference=()=>{if(reduced.matches){cancelAnimationFrame(frame);setProgress(1)}};
    if(reduced.matches)setProgress(1);else frame=requestAnimationFrame(tick);
    reduced.addEventListener('change',onPreference);
    return()=>{cancelAnimationFrame(frame);reduced.removeEventListener('change',onPreference)};
  },[]);
  return <section className="club-stats" aria-label="Our club in numbers">
    <div className="club-stat" aria-label="60 plus members"><strong aria-hidden="true">{Math.round(60*progress)}+</strong><span aria-hidden="true">members</span></div>
    <div className="club-stat" aria-label="100 plus volunteer hours"><strong aria-hidden="true">{Math.round(100*progress)}+</strong><span aria-hidden="true">volunteer hours</span></div>
    <div className="club-stat" aria-label="3 schools"><strong aria-hidden="true">{Math.round(3*progress)}</strong><span aria-hidden="true">schools</span></div>
  </section>
}
function One(){return <><section className="hero-one section"><div className="hero-copy"><h1>What we make<br/>opens doors<br/>for others.</h1><p>We’re students using our skills to support nonprofits and create more opportunities for the people they serve. Together, we build, design, and solve real problems in our community.</p><div className="hero-actions"><a className="text-link" href="#projects">See what we’re making <ArrowRight size={18}/></a></div><div className="hero-footnote"><span className="tiny-faces partner-marks"><span className="partner-mark"><img src="/images/makewater-symbol.png" alt="MakeWater"/></span><span className="partner-mark"><img src="/images/mmc-gear.svg" alt="Makers Making Change"/></span><span className="partner-mark partner-mark-eanes"><img src="/images/eanes-mark.png" alt="Eanes Assistive Technology"/></span></span><p>Organizations we’re working with</p></div></div><div className="workshop-collage"><div className="collage-orbit"/><div className="photo-main"><img src="/images/club-building.png" alt="En4AC members assembling electronics together around classroom tables"/></div><div className="circuit-photo"><img src="/images/club-meeting.png" alt="En4AC members working in small groups during a club meeting"/></div><div className="yellow-note"><span className="drawn-star">✳</span>Made by students.<br/>Opening doors.</div></div></section><ClubStats/><About/><SectionProjects/><ProjectStudies/><Footer/></>}
export default function Site(){return <div className="site theme-one"><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><One/></main></div>}
