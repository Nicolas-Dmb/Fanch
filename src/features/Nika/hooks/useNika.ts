import React, { useEffect } from "react";
import Background from "../../../entities/Background.ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BackgroundColor = typeof Background[keyof typeof Background];

interface UseNikaProps {
    setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
    setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
    screenTiltTl: React.MutableRefObject<gsap.core.Timeline | null>;
    dominoTl: React.MutableRefObject<gsap.core.Timeline | null>;
    fallTl: React.MutableRefObject<gsap.core.Timeline | null>;
    fontsTlRef: React.MutableRefObject<gsap.core.Timeline | null>;
}

export default function useNika({ setAcceuil, setLogoFanch, screenTiltTl, dominoTl, fallTl, fontsTlRef }: UseNikaProps) {
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [letterClassName, setLetterClassName] = React.useState("inline-block will-change-transform hover:animate-wiggle");

    useEffect(() => {
        if (setAcceuil) {
            setAcceuil(Background.Yellow);
        }
        if (setLogoFanch) {
            setLogoFanch(false);
        }
    }, [setAcceuil, setLogoFanch]);


    useEffect(() => {
        const wrapperEl = document.getElementById("nika-wrapper");

        if (!wrapperEl||!screenTiltTl.current || !dominoTl.current || !fallTl.current || !fontsTlRef.current) return;

        const mainTl = gsap.timeline({
            scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: "+=7000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                if (progress >= 0.001 && !hasScrolled) {
                    setHasScrolled(true);
                }
            },
            markers:true,
        },
        });
        
        // Domino
        mainTl.add(screenTiltTl.current, 0.0);
        mainTl.add(dominoTl.current, 0.11);
        mainTl.add(fallTl.current, 0.71);
        // Fonts
        mainTl.add(fontsTlRef.current, 2.2);

        return () => {
            mainTl.scrollTrigger?.kill();
            mainTl.kill();
        };
    }, [setHasScrolled, hasScrolled, screenTiltTl, dominoTl, fallTl, fontsTlRef]);

    useEffect(() => {
        if (hasScrolled) {
            setLetterClassName("inline-block will-change-transform");
        } else {
            setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
        }
    }, [hasScrolled]);
    

    return {hasScrolled,letterClassName};
}