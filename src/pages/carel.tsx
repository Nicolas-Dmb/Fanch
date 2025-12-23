import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Colors from "../entities/Background.ts";
import Storage from '../features/Carel/static/images/storage.png';
import Alesia from '../features/Carel/static/images/alesia.png';
import APC from '../features/Carel/static/images/apc.png';
import Concorde from '../features/Carel/static/images/concorde.png';
import BagPage from '../features/Carel/static/images/page_maroquinerie.png'; 
import ShoesPage from '../features/Carel/static/images/page_shoes.png';




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
  const concordeRef = useRef<HTMLImageElement | null>(null);
  const shoesRef = useRef<HTMLImageElement | null>(null);
  const apcRef = useRef<HTMLImageElement | null>(null);
  const bagRef = useRef<HTMLImageElement | null>(null);
  const alesiaRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch, setTextColor]);

  useEffect(() => {
    const wrapperEl = document.getElementById("nika-wrapper");
    const footerEl = document.getElementById("footer");
    const storageEl = StorageRef.current;
    const windowEl = windowRef.current;

    if (!concordeRef.current || !shoesRef.current || !apcRef.current || !bagRef.current || !alesiaRef.current || !wrapperEl || !storageEl || !windowEl || !footerEl) return;

    gsap.set(StorageRef.current, { zIndex: 70 });
    gsap.set(concordeRef.current, { zIndex: 60 });
    gsap.set(shoesRef.current, { zIndex: 50 });
    gsap.set(apcRef.current, { zIndex: 40 });
    gsap.set(bagRef.current, { zIndex: 30 });
    gsap.set(alesiaRef.current, { zIndex: 20 });


    //FOOTER FIXE 
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

    const all = [
      storageEl,
      concordeRef.current,
      apcRef.current,
      alesiaRef.current,
    ];
    gsap.set(bagRef.current,{
      position: "fixed",
      left: "25%",
      top: "50%",
      xPercent: -25,
      yPercent: -50,
    })
    gsap.set(shoesRef.current,{
      position: "fixed",
      left: "65%",
      top: "50%",
      xPercent: -65,
      yPercent: -50,
    })

    gsap.set(all, {
      position: "fixed",
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    // ANIMATIONS GSAP
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
    const displayFolderTl = gsap.timeline();

    // Open Storage animation
    screenTl.fromTo(storageEl,
      { y: 0, width: "40vw" },
      { y: 250, width: "60vw", ease: "power2.out", duration: 1 },
      0
    );

    // paquet sort du storage (tous ensemble)
    screenTl.fromTo(
      [concordeRef.current, apcRef.current, alesiaRef.current],
      { y: -20, width: "25vw" },
      { y: 220, width: "55vw", ease: "power2.out", duration: 1 },
      0
    );

    screenTl.fromTo(
      [bagRef.current, shoesRef.current],
      { opacity:0, y:50, x: 50, width: "5vw" },
      { opacity:0, y:120, x: 50, width: "10vw", ease: "power2.out", duration: 1 },
      0
    );

    screenTl.fromTo(
      [bagRef.current, shoesRef.current],
      { opacity:0},
      { opacity:1, duration:1},
      0.3
    );

    // Display folders animation
    gsap.set(bagRef.current,{
      opacity:1,
    })
    displayFolderTl.to(concordeRef.current, { y: 190 }, 0.0);
    displayFolderTl.to(shoesRef.current,    { y: 20  }, 0.2);
    displayFolderTl.to(apcRef.current,      { y: 165  }, 0.4);
    displayFolderTl.to(bagRef.current,      { y: 15  }, 0.6);
    displayFolderTl.to(alesiaRef.current,   { y: 140 }, 0.8);
      
    mainTl.add(screenTl, 0.0);
    mainTl.add(displayFolderTl, 0.8);

  return () => {
        mainTl.scrollTrigger?.kill();
        mainTl.kill();

        footerEl.style.position = prev.position;
        footerEl.style.zIndex = prev.zIndex;
        footerEl.style.bottom = prev.bottom;
        footerEl.style.left = prev.left;
        footerEl.style.right = prev.right;
        footerEl.style.width = prev.width;
        footerEl.style.height = prev.height;
    };
  }, []);

  return (
    <div ref={windowRef} className="w-full h-screen relative overflow-hidden ">
      <img
        ref={StorageRef}
        src={Storage}
        alt="Storage"
        className="absolute w-[70vw] h-auto"
      />
      <img ref={concordeRef} src={Concorde} alt="Concorde" className="absolute w-[70vw] h-auto"/>
      <img ref={shoesRef} src={ShoesPage} alt="Shoes" className="absolute  w-[70vw] h-auto"/>
      <img ref={apcRef} src={APC} alt="APC" className="absolute  w-[70vw] h-auto"/>
      <img ref={bagRef} src={BagPage} alt="Bag" className="absolute  w-[70vw] h-auto"/>
      <img ref={alesiaRef} src={Alesia} alt="Alesia" className="absolute  w-[70vw] h-auto"/>
    </div>
  );
}
