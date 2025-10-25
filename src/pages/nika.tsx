import Background from "../entities/Background.ts";
import FallingLetter from "../features/Nika/components/FallingLetter.tsx";
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
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
  const textEl = textRef.current;
  const wrapperEl = document.getElementById("nika-wrapper");
  if (!textEl || !wrapperEl) return;

  gsap.set(textEl, {
    yPercent: -5,
    xPercent: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperEl,
      start: "top top",
      end: "+=1000",
      scrub: 1,
      pin: true, 
    },
  });

  tl.to(textEl, {
    xPercent: -100,
    ease: "none",
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}, []);
  return (
    <section
      ref={sectionRef}
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
          transition-all
          duration-300
          will-change-transform
        "
      >
        <FallingLetter char="N" />
        <FallingLetter char="i" />
        <FallingLetter char="k" />
        <FallingLetter char="a" />
      </div>
    </section>
  );
}
