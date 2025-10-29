import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Colors from "../entities/Background.ts";
import Storage from '../features/Carel/static/images/storage.svg';

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}

gsap.registerPlugin(ScrollTrigger);

export default function Carel({ setAcceuil, setLogoFanch, setTextColor }: carelProps) {
  const StorageRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  // fond noir + pas de logo
  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch, setTextColor]);

  useEffect(() => {
    const wrapperEl = document.getElementById("nika-wrapper");
    const storageEl = StorageRef.current;
    const windowEl = windowRef.current;

    if (!wrapperEl || !storageEl || !windowEl ) return;

    const mainTl = gsap.timeline({
          scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "+=4000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: true,
      },
    });


    const screenTl = gsap.timeline();

    screenTl.fromTo(storageEl, {
        position: "fixed",                   
        opacity: 0.0,
        top: "49vh",           
    }, {
        top: "85vh",
        ease: "power2.out",
        duration: 1,
    }, 0.0);

    screenTl.to(storageEl, {
        opacity:1
    }, 0.1);


    
    mainTl.add(screenTl, 0.0);

  return () => {
        mainTl.scrollTrigger?.kill();
        mainTl.kill();
    };
  }, []);

  return (
    <section className="w-full min-h-[200vh] bg-black text-white">
      <div
        ref={windowRef}
        className="w-full h-screen flex items-center justify-center"
      >
        <img
        ref={StorageRef}
        src={Storage}
        alt="Storage SVG"
        className="w-[90vw] h-auto z-[0]"
      />
      </div>
    </section>
  );
}
