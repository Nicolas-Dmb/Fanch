import Background from "../entities/Background.ts";
import useNika from "../features/Nika/hooks/useNika.ts";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect } from "react";

type BackgroundColor = typeof Background[keyof typeof Background];

interface NikaProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
}

gsap.registerPlugin(ScrollTrigger);

export default function Nika({ setAcceuil, setLogoFanch }: NikaProps) {
  useNika(setAcceuil, setLogoFanch);

  const textRef = useRef<HTMLDivElement | null>(null);
  const nRef = useRef<HTMLParagraphElement | null>(null);
  const iRef = useRef<HTMLParagraphElement | null>(null);
  const kRef = useRef<HTMLParagraphElement | null>(null);
  const aRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
  const wrapperEl = document.getElementById("nika-wrapper");
  const textEl = textRef.current;
  const nEl = nRef.current;
  const iEl = iRef.current;
  const kEl = kRef.current;
  const aEl = aRef.current;

  if (!wrapperEl || !textEl || !nEl || !iEl || !kEl || !aEl) return;

  gsap.set(textEl, { yPercent: -5, xPercent: 0, rotate: 0 });
  gsap.set([nEl, iEl, kEl, aEl], {
    rotate: 0,
    x: 0,
    y: 0,
    transformOrigin: "bottom left",
  });

  const mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperEl,
      start: "top top",
      end: "+=5000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });

  // PHASE 1 : tilt the screen
  const screenTiltTl = gsap.timeline();
  screenTiltTl.to(textEl, {
    xPercent: -70,
    ease: "none",
    duration: 0.5,
  });

  // PHASE 2 : domino effect on letters
  const dominoTl = gsap.timeline();
  // Hit i first
  dominoTl.to(nEl, { rotate: 14, transformOrigin: "bottom right", ease: "none", duration: 0.13 }, 0);

  // Hit k 
  dominoTl.to(iEl, { rotate: 13, transformOrigin: "bottom right", ease: "none", duration: 0.08 }, 0.13);
  dominoTl.to(nEl, { rotate: 25, transformOrigin: "bottom right", ease: "none", duration: 0.08 }, 0.13);

  // Hit a 
  dominoTl.to(kEl, { rotate: 19.2, transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.21);
  dominoTl.to(iEl, { rotate: 30, transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.21);
  dominoTl.to(nEl, { rotate: 40, transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.21);

  // all rotate a bit more 
  dominoTl.to(aEl, { rotate: 30, transformOrigin: "bottom right", ease: "none", duration: 0.21 }, 0.38);
  dominoTl.to(kEl, { rotate: 40, transformOrigin: "bottom right", ease: "none", duration: 0.19 }, 0.40);
  dominoTl.to(iEl, { x:-60, rotate:45,  transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.42);


  // PHASE 3 : falling letters
  const fallTl = gsap.timeline();

  //  a falls first 
  fallTl.to(aEl, {y: "+=800",x: "-=200",rotate: "+=200",ease: "none",duration: 1.0,}, 0.0);
  fallTl.to(kEl, {rotate: "+=25", transformOrigin: "bottom right", ease: "none", duration: 0.2 }, 0.00); 
  fallTl.to(iEl, {x:"-=80",rotate:"+=13",  transformOrigin: "bottom right", ease: "none", duration: 0.2 }, 0.0);

  // the "k" falls 
  fallTl.to(kEl, {y: "+=800",x: "-=150",rotate: 25,ease: "none",duration: 1,}, 0.2);
  fallTl.to(iEl, {x:"-=50",rotate: "+=17", transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.20);

  // the "i" falls
  fallTl.to(iEl, {y: "+=800",x: "-=100",rotate: 40,ease: "none",duration: 1,}, 0.4);

  mainTl.add(screenTiltTl, 0.0);
  mainTl.add(dominoTl, 0.11);
  mainTl.add(fallTl, 0.71);

  return () => {
    mainTl.scrollTrigger?.kill();
    mainTl.kill();
  };
}, []);


  return (
    <section
      className="
        bg-[#f6e820]
        font-perso
        h-full
        w-full
        relative
        overflow-hidden
        flex
        flex-col
        items-center
        justify-end
      "
    >
      <div
        ref={textRef}
        className="
          text-[35vw] md:text-[50vw]
          leading-[0.78]
          font-normal
          text-black
          select-none
          will-change-transform
          z-[999]
          relative
        "
      >
        <p ref={nRef} style={{
                transition: "transform 0.6s ease-out",
            }}className="inline-block will-change-transform">N</p>
        <p ref={iRef} style={{
                transition: "transform 0.6s ease-out",
            }}className="inline-block will-change-transform">i</p>
        <p ref={kRef} style={{
                transition: "transform 0.6s ease-out",
            }}className="inline-block will-change-transform">k</p>
        <p ref={aRef} style={{
                transition: "transform 0.6s ease-out",
            }}className="inline-block will-change-transform">a</p>
      </div>
    </section>
  );
}
