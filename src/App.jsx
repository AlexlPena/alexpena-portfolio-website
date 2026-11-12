import React,{useEffect,useRef,useState,lazy,Suspense} from 'react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ChevronRight,Menu,X,ArrowUpRight} from 'lucide-react';
import {Wordmark,About,WorkflowStudio,Services,PromptWorkshop} from './Studio';
import Closing from './Closing';
import usePageMotion from './usePageMotion';
import {applyPastelCube} from './pastel-cube';
const Spline=lazy(()=>import('@splinetool/react-spline'));
gsap.registerPlugin(useGSAP);
const contact='mailto:alex@alexpena.dev';
function Header(){
 const [mobile,setMobile]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>20);const key=e=>{if(e.key==='Escape')setMobile(false)};window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('keydown',key);return()=>{window.removeEventListener('scroll',scroll);document.removeEventListener('keydown',key)}},[]);
 useEffect(()=>{document.body.style.overflow=mobile?'hidden':'';return()=>{document.body.style.overflow=''}},[mobile]);
 const links=[['What I do','#services'],['Workflows','#workflows'],['Training','#training'],['About me','#about']];
 return <header className={`header ${scrolled?'scrolled':''} ${mobile?'mobile-active':''}`}><div className="nav-inner container"><a href="/home" aria-label="Alex Pena home"><Wordmark/></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href])=><a key={label} href={href}>{label}</a>)}</nav><div className="nav-actions"><a className="button small" href={contact}>Discuss your project<ArrowUpRight size={15}/></a></div><button className="mobile-toggle" aria-label={mobile?'Close main menu':'Open main menu'} aria-expanded={mobile} onClick={()=>setMobile(!mobile)}>{mobile?<X size={22}/>:<Menu size={22}/>}</button></div>{mobile&&<nav className="mobile-menu" aria-label="Mobile navigation" onClick={e=>{if(e.target.closest('a'))setMobile(false)}}>{links.map(([label,href])=><a className="mobile-menu-row" key={label} href={href}>{label}<ArrowUpRight size={18}/></a>)}<a className="button" href={contact}>Discuss your project</a></nav>}</header>
}
function Hero(){
 const ref=useRef(null),cube=useRef(null);const[loaded,setLoaded]=useState(false);
 useGSAP(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;gsap.from('.hero-copy',{y:24,opacity:0,duration:1.3,ease:'power2.out'});gsap.from('.hero-visual',{scale:.88,opacity:0,duration:1.5,ease:'power2.inOut'});},{scope:ref});
 useEffect(()=>{if(!loaded)return;const resize=()=>cube.current?.setZoom(window.innerWidth<1024?.4:.85);resize();window.addEventListener('resize',resize);const io=new IntersectionObserver(([entry])=>{if(cube.current)cube.current.renderMode=entry.isIntersecting?'auto':'manual'});io.observe(ref.current);return()=>{io.disconnect();window.removeEventListener('resize',resize)}},[loaded]);
 return <section className="hero" ref={ref}><div className="hero-inner container"><div className="hero-copy"><a className="announcement" href={'#about'}>AI automation & integration for your business<ChevronRight size={13}/></a><h1>Less busywork.<br/>More business.</h1><div className="hero-motto">I build with AI. And it works at scale.</div><p>I’m Alex Pena. I help business owners automate repetitive work, connect their tools, and train their teams to use AI with confidence.</p><div className="hero-actions"><a className="button" href={contact}>Discuss your project</a><a className="text-link" href={'#workflows'}>See a workflow in action</a></div><div className="hero-assurance"><span>One point of contact</span><span>Built around your tools</span><span>Clear handover</span></div></div><div className="hero-visual" aria-label="Animated modular cube"><div className={'cube-loading '+(loaded?'hidden':'')} aria-hidden="true"/><Suspense fallback={null}><Spline scene="/assets/cube.splinecode" renderOnDemand={false} onLoad={app=>{if(applyPastelCube(app)){cube.current=app;setLoaded(true)}}}/></Suspense></div></div></section>
}
const tools=['ChatGPT','Claude','n8n','Jira','Figma','Notion','Google Workspace','Microsoft 365','Salesforce','Slack'];
function Tools(){return <div className="studio-tools container"><p>Connected to the tools<br/>you already work with.</p><div>{tools.map(name=><span key={name}>{name}</span>)}</div></div>}
export default function App(){const root=useRef(null);usePageMotion(root);return <><Header/><main ref={root}><Hero/><About/><Services/><Tools/><WorkflowStudio/><PromptWorkshop/><Closing/></main></>}
