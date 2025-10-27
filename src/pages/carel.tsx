"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "../entities/Background.ts";
import StorageSVG from "../features/Carel/components/Storage.tsx";

type BackgroundColor = typeof Background[keyof typeof Background];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
}

gsap.registerPlugin(ScrollTrigger);

export default function Carel({ setAcceuil, setLogoFanch }: carelProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<SVGGElement | null>(null);
  const drawerRef = useRef<SVGGElement | null>(null);

  // fond noir + pas de logo
  useEffect(() => {
    setAcceuil(Background.Black);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // état initial = tiroir fermé
      // 1. le cadre du haut est invisible
      gsap.set(frameRef.current, {
        opacity: 0,
      });

      // 2. le tiroir est en position "fermée"
      gsap.set(drawerRef.current, {
        y: 0,
      });

      // timeline liée au scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=4000",
          scrub: true,
          markers: true,
        },
      })
        // le tiroir descend
        .to(drawerRef.current, {
          y: 80, // ajuste la valeur selon l'ouverture
          ease: "none",
        })
        // les montants + barre du haut apparaissent
        .to(
          frameRef.current,
          {
            opacity: 1,
            ease: "none",
          },
          "<" // "<" = en même temps que le mouvement du tiroir
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-[200vh] bg-black text-white">
      {/* wrapper juste pour que ScrollTrigger sache où regarder */}
      <div
        ref={wrapperRef}
        className="w-full h-screen flex items-center justify-center"
      >
        <StorageSVG
          frameRef={(el) => (frameRef.current = el)}
          drawerRef={(el) => (drawerRef.current = el)}
        />
      </div>
    </section>
  );
}
