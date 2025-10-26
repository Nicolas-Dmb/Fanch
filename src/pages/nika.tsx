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

    // reset
    gsap.set(textEl, { yPercent: -5, xPercent: 0, rotate: 0 });
    gsap.set([nEl, iEl, kEl, aEl], {
      rotate: 0,
      x: 0,
      y: 0,
      transformOrigin: "bottom left",
    });

    // === 1️⃣ TIMELINE PRINCIPALE CONTROLE PAR LE SCROLL ===
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperEl,
        start: "top top",
        end: "+=5000", // long scroll
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true,
      },
    });

    // === 2️⃣ PHASE 1: rotation globale de l’écran ===
    const screenTiltTl = gsap.timeline();
    screenTiltTl.to(textEl, {
      xPercent: -70,
      ease: "none",
      duration: 0.4,
    });

    // === 3️⃣ PHASE 2: effet domino sur les lettres ===
    const dominoTl = gsap.timeline();
    dominoTl.to(nEl, { rotate: 20, y: -150, ease: "none", duration: 0.15 }, 0);
    dominoTl.to(iEl, { rotate: 30, x: 10, y:-35, ease: "none", duration: 0.15 }, 0.1);
    dominoTl.to(kEl, { rotate: 50, x: 60,y:-250, ease: "none", duration: 0.15 }, 0.15);
    dominoTl.to(aEl, { rotate: 90, x: 80, ease: "none", duration: 0.15 }, 0.21);

    const fallTl = gsap.timeline();
    fallTl.to(aEl, {
      y: 600,
      x: -300,
      ease: "none",
      duration: 0.6,
    }, 0);
    fallTl.to(kEl, {
      y: 1000,
      x: -180,
      rotate: "+=300",
      ease: "none",
      duration: 0.62,
    }, 0);
    fallTl.to(iEl, {
      y:300,
      x: -300,
      rotate: "+=200",
      ease: "none",
      duration: 0.8,
    }, 0);

    // === 5️⃣ SUPERPOSITION DES 3 PHASES ===
    mainTl.add(screenTiltTl, 0.0); // commence direct
    mainTl.add(dominoTl, 0.11);    // débute un peu après
    mainTl.add(fallTl, 0.38);       // la chute se déclenche pendant la rotation

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
        <p ref={nRef} className="inline-block will-change-transform">N</p>
        <p ref={iRef} className="inline-block will-change-transform">i</p>
        <p ref={kRef} className="inline-block will-change-transform">k</p>
        <p ref={aRef} className="inline-block will-change-transform">a</p>
      </div>
    </section>
  );
}
