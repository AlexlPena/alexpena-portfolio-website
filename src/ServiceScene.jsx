import React,{useMemo,useRef} from 'react';
import {Canvas,extend,useThree} from '@react-three/fiber';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {CatmullRomCurve3,Vector3} from 'three';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
extend({RoundedBoxGeometry});gsap.registerPlugin(useGSAP);
const blue='#315e9b',light='#b5c9e0',white='#f7fafc',steel='#6e89aa';
function Block({position=[0,0,0],size=[1,1,.22],color=white,radius=.09,rotation=[0,0,0],children}){return <group position={position} rotation={rotation}><mesh castShadow receiveShadow><roundedBoxGeometry args={[...size,3,radius]}/><meshStandardMaterial color={color} roughness={.33} metalness={.05}/></mesh>{children}</group>}
function Rail({points,color=light,radius=.038}){const curve=useMemo(()=>new CatmullRomCurve3(points.map(p=>new Vector3(...p)),false,'centripetal'),[points]);return <mesh castShadow><tubeGeometry args={[curve,40,radius,8,false]}/><meshStandardMaterial color={color} roughness={.42} metalness={.1}/></mesh>}
function Check({position=[0,0,.2],scale=1,color=white}){return <group position={position} scale={scale}><Rail points={[[-.22,0,0],[-.07,-.14,0],[.24,.2,0]]} radius={.043} color={color}/></group>}
function Bars({position=[0,0,.15]}){return <group position={position}>{[.26,0,-.26].map((y,i)=><Block key={y} position={[i===2?-.12:0,y,0]} size={[i===2?.48:.72,.055,.035]} radius={.015} color={i===0?blue:light}/>)}</group>}
function Icon({kind}){if(kind==='check')return <Check/>;if(kind==='bars')return <Bars/>;if(kind==='grid')return <group position={[0,0,.17]}>{[-.16,.16].flatMap(x=>[-.16,.16].map(y=><Block key={x+':'+y} position={[x,y,0]} size={[.22,.22,.06]} color={blue} radius={.035}/>))}</group>;return <group position={[0,0,.19]}><mesh><torusGeometry args={[.22,.065,12,32]}/><meshStandardMaterial color={blue} roughness={.3}/></mesh><Block position={[.22,-.22,0]} rotation={[0,0,-.7]} size={[.08,.23,.06]} radius={.025} color={blue}/></group>}
function Workflow({moving,pulse}){return <>
 <Rail points={[[-1.8,0,.03],[-.9,0,.03],[.1,0,.03],[1.2,0,.03]]} radius={.055}/>
 <Block position={[-1.65,0,-.15]} size={[1.12,1.48,.25]} color={light}/>
 <group ref={moving} position={[-1.75,.13,.18]}><Block size={[1.05,1.4,.24]}><Bars position={[0,.08,.16]}/><Block position={[-.26,.48,.16]} size={[.2,.09,.04]} color={blue} radius={.02}/></Block></group>
 <Block position={[0,0,.12]} size={[.85,.85,.38]} color={blue}><Check position={[0,0,.24]} scale={.9}/></Block>
 <Block position={[1.6,-.12,-.12]} size={[1.2,1.5,.22]} color={light}/><Block position={[1.48,.02,.15]} size={[1.2,1.5,.25]}><Bars position={[0,-.25,.16]}/><Block position={[0,.4,.2]} size={[.75,.36,.1]} color={blue}><Check position={[0,0,.08]} scale={.5}/></Block></Block>
 <mesh ref={pulse} position={[-1,0,.1]}><sphereGeometry args={[.085,16,12]}/><meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={.15}/></mesh>
 </>}
const ports=[[-1.65,0],[1.65,0],[0,1.35],[0,-1.35]];
function Integration({moving,pulse}){return <>
 {ports.map(([x,y],i)=><React.Fragment key={i}><Rail points={[[x*.68,y*.64,0],[x*.5,y*.48,0],[x*.32,y*.32,0]]} radius={.06}/><Block position={[x,y,.04]} size={[.95,.85,.3]} color={i===3?light:white}><Icon kind={['bars','grid','search','bars'][i]}/></Block></React.Fragment>)}
 <group ref={moving}><Block size={[1,1,.5]} color={blue}><group position={[0,0,.3]}>{[-.18,.18].map(x=><Block key={x} position={[x,0,0]} size={[.13,.44,.09]} color={white} radius={.04}/>)}<Block size={[.47,.12,.09]} color={white} radius={.04}/></group></Block></group>
 <mesh ref={pulse} position={[-1.1,0,.06]}><sphereGeometry args={[.09,16,12]}/><meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={.15}/></mesh>
 </>}
function Training({moving,pulse}){return <>
 <Block position={[-1.35,0,0]} size={[1.3,1.8,.24]}><Bars position={[0,.25,.16]}/><Block position={[-.12,-.45,.16]} size={[.5,.12,.04]} color={light} radius={.03}/></Block>
 <Rail points={[[-.7,-.45,0],[-.45,-.75,0],[0,-.85,0],[.5,-.65,0],[.75,-.4,0]]} radius={.055}/>
 <Block position={[1.38,-.13,-.2]} size={[1.4,1.85,.25]} color={steel}/><Block position={[1.25,-.04,0]} size={[1.4,1.85,.23]} color={light}/>
 <group ref={moving} position={[1.1,.12,.23]}><Block size={[1.4,1.85,.25]}><Block position={[-.52,0,.15]} size={[.1,1.65,.06]} radius={.025} color={blue}/><Bars position={[.07,.2,.17]}/><Block position={[.1,-.49,.18]} size={[.72,.27,.05]} color={light} radius={.04}/></Block></group>
 <group ref={pulse} position={[1.7,-.7,.55]}><mesh castShadow rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.32,.32,.13,48]}/><meshStandardMaterial color={blue} roughness={.3}/></mesh><Check position={[0,0,.1]} scale={.8}/></group>
 </>}
function Composition({type,visible,reduced,replay}){
 const moving=useRef(),pulse=useRef();const invalidate=useThree(s=>s.invalidate);const played=useRef(false);
 useGSAP(()=>{if(!visible||!moving.current||!pulse.current)return;invalidate();if(reduced)return;if(played.current&&replay===0)return;played.current=true;
 const tl=gsap.timeline({onUpdate:invalidate,onComplete:invalidate});
 if(type===0){tl.from(moving.current.position,{x:-2.15,y:.55,z:.6,duration:1.1,ease:'power3.out'}).fromTo(pulse.current.position,{x:-1.05},{x:1.0,duration:1.8,ease:'power2.inOut'},.6).to(pulse.current.scale,{x:0,y:0,z:0,duration:.25},2.35);}
 if(type===1){tl.from(moving.current.scale,{x:.7,y:.7,z:.7,duration:.9,ease:'power3.out'}).fromTo(pulse.current.position,{x:-1.12,y:0},{x:-.55,y:0,duration:.8},.4).set(pulse.current.position,{x:.55,y:0}).to(pulse.current.position,{x:1.12,duration:.8}).to(pulse.current.scale,{x:0,y:0,z:0,duration:.25});}
 if(type===2){tl.from(moving.current.position,{x:.6,y:.6,z:.9,duration:1.2,ease:'power3.out'}).from(pulse.current.scale,{x:0,y:0,z:0,duration:.6,ease:'back.out(1.4)'},.9);}
 },{dependencies:[visible,reduced,replay],revertOnUpdate:true});
 return <><ambientLight intensity={1.1}/><directionalLight position={[-3,5,7]} intensity={2.6} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-normalBias={.025}/><directionalLight position={[4,-1,3]} intensity={1}/><group rotation={[-.2,-.28,-.06]}>{type===0?<Workflow moving={moving} pulse={pulse}/>:type===1?<Integration moving={moving} pulse={pulse}/>:<Training moving={moving} pulse={pulse}/>}<mesh position={[0,0,-.48]} receiveShadow><planeGeometry args={[30,30]}/><shadowMaterial transparent opacity={.08}/></mesh></group></>
}
export default function ServiceScene(props){return <Canvas camera={{position:[0,0,8],fov:28}} dpr={[1,1.5]} frameloop="demand" shadows="percentage" gl={{antialias:true,alpha:true}} fallback={<span>3D preview unavailable</span>}><Composition {...props}/></Canvas>}

