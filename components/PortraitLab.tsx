"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type Mode = "portrait" | "clay" | "wire";
type Actions = { mode: (mode: Mode) => void; depth: (value: number) => void; angle: (degrees: number) => void; download: () => Promise<void> };

export default function PortraitLab() {
  const host = useRef<HTMLDivElement>(null);
  const actions = useRef<Actions | null>(null);
  const [status, setStatus] = useState("loading");
  const [mode, setMode] = useState<Mode>("portrait");
  const [depth, setDepth] = useState(1);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true }); }
    catch { queueMicrotask(() => setStatus("error")); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-label", "Chân dung phù điêu 3D, kéo chuột để xoay");
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3,3,2.6,-2.6,.1,30);
    camera.position.set(0,0,8);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minAzimuthAngle = -Math.PI / 6;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minPolarAngle = Math.PI / 2 - .16;
    controls.maxPolarAngle = Math.PI / 2 + .16;
    controls.rotateSpeed = .55;
    const ambient = new THREE.HemisphereLight(0xffffff,0x8b699d,2);
    const key = new THREE.DirectionalLight(0xffffff,3);
    key.position.set(-3,5,6);
    const rim = new THREE.DirectionalLight(0x9b75ee,1.7);
    rim.position.set(4,1,2);
    scene.add(ambient,key,rim);
    let disposed = false;
    let geometry: THREE.BufferGeometry | undefined;
    let texture: THREE.Texture | undefined;
    let materials: THREE.Material[] = [];
    const render = () => { if (!disposed) renderer.render(scene,camera); };
    controls.addEventListener("change",render);
    const resize = () => {
      const {width,height} = mount.getBoundingClientRect();
      renderer.setSize(width,height);
      const halfHeight = width / height < .8 ? 3.25 : 2.65;
      camera.top = halfHeight; camera.bottom = -halfHeight;
      camera.left = -halfHeight * width / height; camera.right = -camera.left;
      camera.updateProjectionMatrix(); render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    const loadImage = (src:string) => new Promise<HTMLImageElement>((resolve,reject) => { const image = new window.Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; });
    const pixels = (image:HTMLImageElement,width:number,height:number) => {
      const canvas = document.createElement("canvas"); canvas.width=width; canvas.height=height;
      const context = canvas.getContext("2d",{willReadFrequently:true})!;
      context.drawImage(image,0,0,width,height);
      return context.getImageData(0,0,width,height).data;
    };
    Promise.all([loadImage("/chaos-avatar-cutout.png"),loadImage("/chaos-avatar-depth.png")]).then(([portrait,depthImage]) => {
      if(disposed) return;
      const cols=224, rows=280, width=cols+1,height=rows+1;
      const color=pixels(portrait,width,height), heights=pixels(depthImage,width,height);
      const vertices:number[]=[],uv:number[]=[],indices:number[]=[],baseDepth:number[]=[];
      // The generated estimate has uncertain edge pixels. Reconstruct missing
      // samples and smooth the mesh itself before computing normals.
      let surface=Float32Array.from({length:width*height},(_,i)=>heights[i*4]/255);
      for(let y=0;y<height;y++) for(let x=0;x<width;x++) {
        const i=y*width+x;
        if(surface[i]>.22 || color[i*4+3]<50) continue;
        let sum=0,weight=0;
        for(let dy=-8;dy<=8;dy++) for(let dx=-8;dx<=8;dx++) {
          const xx=x+dx,yy=y+dy;
          if(xx<0||xx>=width||yy<0||yy>=height) continue;
          const value=heights[(yy*width+xx)*4]/255;
          if(value>.22) {const w=1/(1+dx*dx+dy*dy);sum+=value*w;weight+=w;}
        }
        surface[i]=weight?sum/weight:.4;
      }
      for(let pass=0;pass<18;pass++) {
        const next=surface.slice();
        for(let y=1;y<rows;y++) for(let x=1;x<cols;x++) {
          const i=y*width+x;
          if(color[i*4+3]<50) continue;
          let sum=surface[i]*2,weight=2;
          for(const j of [i-1,i+1,i-width,i+width]) if(color[j*4+3]>50) {sum+=surface[j];weight++;}
          next[i]=sum/weight;
        }
        surface=next;
      }
      for(let y=0;y<=rows;y++) for(let x=0;x<=cols;x++) {
        const i=y*width+x;
        // Depth is geometry data; source RGB remains the untouched portrait texture.
        const z=(surface[i]-.45)*1.15;
        vertices.push((x/cols-.5)*3.2,(.5-y/rows)*4,z);
        baseDepth.push(z); uv.push(x/cols,1-y/rows);
      }
      const opaque = (i:number) => color[i*4+3]>160;
      for(let y=0;y<rows;y++) for(let x=0;x<cols;x++) {
        const a=y*width+x,b=a+1,c=a+width,d=c+1;
        if(opaque(a)&&opaque(c)&&opaque(b)) indices.push(a,c,b);
        if(opaque(b)&&opaque(c)&&opaque(d)) indices.push(b,c,d);
      }
      geometry=new THREE.BufferGeometry();
      geometry.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));
      geometry.setAttribute("uv",new THREE.Float32BufferAttribute(uv,2));
      geometry.setIndex(indices); geometry.computeVertexNormals();
      texture=new THREE.Texture(portrait); texture.colorSpace=THREE.SRGBColorSpace; texture.needsUpdate=true;
      texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
      const photo=new THREE.MeshBasicMaterial({map:texture,alphaTest:.5,side:THREE.DoubleSide});
      const clay=new THREE.MeshStandardMaterial({color:0xd3bdec,roughness:.65,side:THREE.DoubleSide});
      const wire=new THREE.MeshBasicMaterial({color:0x7956a6,wireframe:true,side:THREE.DoubleSide});
      materials=[photo,clay,wire];
      const mesh=new THREE.Mesh<THREE.BufferGeometry,THREE.Material>(geometry,photo); mesh.name="Chaos portrait relief"; scene.add(mesh);
      actions.current={
        mode(value) { mesh.material=value==="portrait"?photo:value==="clay"?clay:wire; render(); },
        depth(value) { const positions=geometry!.getAttribute("position"); baseDepth.forEach((z,i)=>positions.setZ(i,z*value)); positions.needsUpdate=true; geometry!.computeVertexNormals(); geometry!.computeBoundingSphere(); render(); },
        angle(degrees) { const theta=THREE.MathUtils.degToRad(degrees); camera.position.set(Math.sin(theta)*8,0,Math.cos(theta)*8); controls.update(); render(); },
        async download() {
          const {GLTFExporter}=await import("three/addons/exporters/GLTFExporter.js");
          const exported=mesh.clone(); exported.material=photo;
          const output=await new GLTFExporter().parseAsync(exported,{binary:true});
          const blob=new Blob([output as ArrayBuffer],{type:"model/gltf-binary"});
          const url=URL.createObjectURL(blob),link=document.createElement("a");
          link.href=url; link.download="chaos-portrait-relief.glb"; link.click();
          setTimeout(()=>URL.revokeObjectURL(url),1000);
        },
      };
      setStatus("ready"); resize();
    }).catch(()=>{if(!disposed)setStatus("error");});
    return()=>{disposed=true;actions.current=null;observer.disconnect();controls.dispose();geometry?.dispose();texture?.dispose();materials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();};
  },[]);

  return <section className="lab-viewer" aria-label="Bản thử chân dung 3D">
    <div ref={host} className="lab-canvas" data-status={status} />
    {status==="loading"&&<p className="lab-status" role="status">Đang dựng chiều sâu…</p>}
    {status==="error"&&<><Image className="lab-error-image" src="/chaos-avatar-cutout.png" alt="Avatar Chaos" fill sizes="80vw"/><p className="lab-status" role="status">Không tải được bản thử 3D trên trình duyệt này.</p></>}
    <div className="lab-modes">{([["portrait","Chân dung"],["clay","Xem khối"],["wire","Lưới"]] as const).map(([value,label])=><button key={value} aria-pressed={mode===value} disabled={status!=="ready"} onClick={()=>{setMode(value);actions.current?.mode(value);}}>{label}</button>)}</div>
    <div className="lab-actions">
      <div><button disabled={status!=="ready"} onClick={()=>actions.current?.angle(-25)}>↶ Trái</button><button disabled={status!=="ready"} onClick={()=>actions.current?.angle(0)}>Chính diện</button><button disabled={status!=="ready"} onClick={()=>actions.current?.angle(25)}>Phải ↷</button></div>
      <label>Độ nổi <input aria-label="Độ nổi" type="range" min="0" max="1.5" step=".05" value={depth} disabled={status!=="ready"} onChange={e=>{const value=Number(e.target.value);setDepth(value);actions.current?.depth(value);}}/></label>
      <button disabled={status!=="ready"||saving} onClick={async()=>{setSaving(true);setMessage("");try{await actions.current?.download();}catch{setMessage("Chưa xuất được GLB. Bạn thử lại nhé.");}finally{setSaving(false);}}}>{saving?"Đang xuất…":"Tải mô hình .glb ↓"}</button>
    </div>
    {message&&<p className="lab-status" role="status">{message}</p>}
  </section>;
}
