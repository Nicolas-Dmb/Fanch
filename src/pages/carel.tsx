import { useRef, useEffect } from "react"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import Colors from "../entities/Background.ts"; 
import Storage from '../features/Carel/static/images/storage.png'; 
import Alesia from '../features/Carel/static/images/alesia.png'; 
import APC from '../features/Carel/static/images/apc.png';
import Concorde from '../features/Carel/static/images/concorde.png'; 

type BackgroundColor = typeof Colors[keyof typeof Colors]; 
interface carelProps { 
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>; 
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>; 
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>; 
} gsap.registerPlugin(ScrollTrigger); 

export default function Carel({ setAcceuil, setLogoFanch, setTextColor }: carelProps) { 
  const StorageRef = useRef<HTMLImageElement | null>(null); 
  const windowRef = useRef<HTMLDivElement | null>(null); 
  const concordeRef = useRef<HTMLImageElement | null>(null); 
  const apcRef = useRef<HTMLImageElement | null>(null); 
  const alesiaRef = useRef<HTMLImageElement | null>(null); 
  const isReady = useRef(false); 
  const baseY = useRef<WeakMap<HTMLElement, number>>(new WeakMap()); 
  
  const LIFT = 18; const liftOn = (el: HTMLImageElement | null) => { 
    if (!isReady.current || !el) return; 
    const y0 = baseY.current.get(el); 
    
    if (y0 === undefined) return; 
    gsap.to(el, { 
      y: y0 - LIFT, 
      duration: 0.18, 
      ease: "power2.out", 
      overwrite: "auto", 
    }); 
  }; 
  
  const liftOff = (el: HTMLImageElement | null) => { 
    if (!isReady.current || !el) return; 
    const y0 = baseY.current.get(el); 
    
    if (y0 === undefined) return; 
    gsap.to(el, { y: y0, duration: 0.22, ease: "power2.out", overwrite: "auto", }); 
  }; 
    
  
  useEffect(() => { 
    setAcceuil(Colors.Black); 
    setTextColor(Colors.White); 
    setLogoFanch(false); }, 
  [setAcceuil, setLogoFanch, setTextColor]); 
  
  useEffect(() => { 
    const wrapperEl = document.getElementById("nika-wrapper"); 
    const footerEl = document.getElementById("footer"); 
    const storageEl = StorageRef.current; const windowEl = windowRef.current; 
    
    if (!concordeRef.current || !apcRef.current || !alesiaRef.current || !wrapperEl || !storageEl || !windowEl || !footerEl) return; 
    
    gsap.set(StorageRef.current, { zIndex: 70 }); 
    gsap.set(concordeRef.current, { zIndex: 60 }); 
    gsap.set(apcRef.current, { zIndex: 40 }); 
    gsap.set(alesiaRef.current, { zIndex: 20 }); 
    
    const prev = { 
      position: footerEl.style.position, 
      zIndex: footerEl.style.zIndex, 
      bottom: footerEl.style.bottom, 
      left: footerEl.style.left, 
      right: footerEl.style.right, 
      width: footerEl.style.width, 
      height: footerEl.style.height, 
    }; 
    
    footerEl.style.position = "fixed"; 
    footerEl.style.zIndex = "9999"; 
    footerEl.style.bottom = "-20px"; 
    footerEl.style.height = "5em"; 
    footerEl.style.left = "0"; 
    footerEl.style.right = "0"; 
    footerEl.style.width = "100%"; 
    
    const ctx = gsap.context(() => { 
      const storage = storageEl; 
      const concorde = concordeRef.current!; 
      const apc = apcRef.current!; 
      const alesia = alesiaRef.current!; 
      const all = [storage, concorde, apc, alesia]; 
      
      gsap.set(all, { 
        position: "fixed", 
        left: "50%", 
        top: "50%", 
        xPercent: -50, 
        yPercent: -50, 
        willChange: "transform", 
      }); 
      
      gsap.set(storage, { 
        y: 0, 
        width: "35vw" 
      }); 
      
      gsap.set([concorde, apc, alesia], { 
        y: -40, 
        width: "30vw" 
      }); 
      
      const tl = gsap.timeline({ 
        defaults: { ease: "power2.out" } }); 
        tl.to(storage, { 
          y: 400, 
          width: "80vw", 
          duration: 1 
    }, 0); 
          
    tl.to([concorde, apc, alesia], { 
      y: 300, 
      width: "75vw", 
      duration: 1 
    }, 0); 
    
    tl.to(concorde, { 
      y: 270, 
      duration: 0.5 
    }, 0.5); 
    
    tl.to(apc, { 
      y: 245, 
      duration: 0.5 
    }, 0.55); 
    
    tl.to(alesia, { 
      y: 220, 
      duration: 0.5 
    }, 0.6); 
    
    tl.eventCallback("onComplete", () => { 
      isReady.current = true; 
      [concorde, apc, alesia].forEach((el) => { 
        baseY.current.set(el, gsap.getProperty(el, "y") as number); 
      }); }); 
    }, windowRef); 
    return () => { 
      ctx.revert(); 
      footerEl.style.position = prev.position; 
      footerEl.style.zIndex = prev.zIndex; 
      footerEl.style.bottom = prev.bottom; 
      footerEl.style.left = prev.left; 
      footerEl.style.right = prev.right; 
      footerEl.style.width = prev.width; 
      footerEl.style.height = prev.height; 
    }; 
  },[]); 
        
  return ( 
  <div ref={windowRef} className="w-full h-screen relative overflow-hidden "> 
    <img ref={StorageRef} src={Storage} alt="Storage" className="absolute w-[70vw] h-auto" /> 
    <img ref={concordeRef} src={Concorde} alt="Concorde" className="absolute w-[70vw] h-auto cursor-pointer pointer-events-auto" 
    onMouseEnter={() => liftOn(concordeRef.current)} onMouseLeave={() => liftOff(concordeRef.current)}/> 
    
    <img ref={apcRef} src={APC} alt="APC" className="absolute w-[70vw] h-auto cursor-pointer pointer-events-auto" 
    onMouseEnter={() => liftOn(apcRef.current)} onMouseLeave={() => liftOff(apcRef.current)}/> 
    
    <img ref={alesiaRef} src={Alesia} alt="Alesia" className="absolute w-[70vw] h-auto cursor-pointer pointer-events-auto" 
    onMouseEnter={() => liftOn(alesiaRef.current)} onMouseLeave={() => liftOff(alesiaRef.current)}/> </div> 
  ); 
}
