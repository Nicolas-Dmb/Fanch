import React, { useEffect, useRef } from "react";
import Colors from "../../../entities/Background.ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface UseNikaProps {
    setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
    setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
    screenTiltTl: React.MutableRefObject<gsap.core.Timeline | null>;
    dominoTl: React.MutableRefObject<gsap.core.Timeline | null>;
    fallTl: React.MutableRefObject<gsap.core.Timeline | null>;
    fontsTlRef: React.MutableRefObject<gsap.core.Timeline | null>;
    setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
    bookRef : React.MutableRefObject<HTMLElement | null>
    inputRef : React.MutableRefObject<HTMLDivElement | null>;
    goNext: () => void;
    goPrev: () => void;
    currentPage: number;
    maxPage: number;
}

export default function useNika({ setAcceuil, setLogoFanch, setTextColor, screenTiltTl, dominoTl, fallTl, fontsTlRef, bookRef, inputRef, goNext, goPrev, currentPage, maxPage }: UseNikaProps) {
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [letterClassName, setLetterClassName] = React.useState("inline-block will-change-transform hover:animate-wiggle");

    useEffect(() => {
        if (setAcceuil) {
            setAcceuil(Colors.Yellow);
            setTextColor(Colors.Black);
        }
        if (setLogoFanch) {
            setLogoFanch(false);
        }
    }, [setAcceuil, setLogoFanch, setTextColor]);


    useEffect(() => {
        const wrapperEl = document.getElementById("global-wrapper");
        if (!wrapperEl || !screenTiltTl.current || !dominoTl.current || !fallTl.current || !fontsTlRef.current) return;

        const mainTl = gsap.timeline({
            scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: "+=7000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {},
            },
        });

        mainTl.add(screenTiltTl.current, 0.0);
        mainTl.add(dominoTl.current, 0.11);
        mainTl.add(fallTl.current, 0.71);
        mainTl.add(fontsTlRef.current, 2.2);

        return () => {
            mainTl.scrollTrigger?.kill();
            mainTl.kill();
        };
    }, [screenTiltTl, dominoTl, fallTl, fontsTlRef, bookRef, inputRef, goNext, goPrev, maxPage]);

    useEffect(() => {
        if (hasScrolled) {
            setLetterClassName("inline-block will-change-transform");
        } else {
            setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
        }
    }, [hasScrolled]);
    

    return {hasScrolled,letterClassName};
}