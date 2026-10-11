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
    goTo: (page: number) => void;
    maxPage: number;
    LockLayout: (isActive: boolean) => void;
    setDisplayFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useNika({ setAcceuil, setLogoFanch, setTextColor, screenTiltTl, dominoTl, fallTl, fontsTlRef, bookRef, inputRef, goTo, maxPage, LockLayout, setDisplayFooter }: UseNikaProps) {
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [letterClassName, setLetterClassName] = React.useState("inline-block will-change-transform hover:animate-wiggle");

    const goToRef = useRef(goTo);
    const bgZoneRef = useRef<"yellow" | "white">("yellow");

    useEffect(() => { goToRef.current = goTo; }, [goTo]);

    const mainTlRef = useRef<gsap.core.Timeline | null>(null);


    const bookPages = maxPage + 1;
    const bookStart = 2.4;
    const bookEnd = 4.8;

    const toPageIndexFromTime = (time: number) => {
        const t = (time - bookStart) / (bookEnd - bookStart);
        const clamped = Math.min(1, Math.max(0, t));
        return Math.min(bookPages - 1, Math.floor(clamped * bookPages));
    };

    const setBackgroundZone = (zone: "yellow" | "white") => {
        if (bgZoneRef.current === zone) return;
        bgZoneRef.current = zone;

        if (zone === "yellow") {
            setAcceuil(Colors.Yellow);
            setTextColor(Colors.Black);
        } else {
            setAcceuil(Colors.White);
            setTextColor(Colors.Black);
        }
    };

    useEffect(() => {
        LockLayout(false);
        setDisplayFooter(false);
        if (setAcceuil) {
            setAcceuil(Colors.Yellow);
            setTextColor(Colors.Black);
        }
        if (setLogoFanch) {
            setLogoFanch(false);
        }
        return () => {
            LockLayout(true);
            setDisplayFooter(true);
        };
    }, [setAcceuil, setLogoFanch, setTextColor, LockLayout]);


    useEffect(() => {
        if (mainTlRef.current) return; 
        const wrapperEl = document.getElementById("global-wrapper");
        if (!wrapperEl || !screenTiltTl.current || !dominoTl.current || !fallTl.current || !fontsTlRef.current) return;

        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperEl,
                start: "top top",
                end: "+=6000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    if (self.progress > 0.01) {
                        setHasScrolled(true);
                    }

                    // Always aim at the page matching the scroll position: useNavigation
                    // queues the flips one by one, so fast scrolls never skip or desync pages.
                    const time = mainTl.time();
                    if (time < bookStart) {
                        setBackgroundZone("yellow");
                        goToRef.current(0);
                    } else if (time > bookEnd) {
                        setBackgroundZone("white");
                        goToRef.current(maxPage);
                    } else {
                        setBackgroundZone("white");
                        goToRef.current(toPageIndexFromTime(time));
                    }
                },
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
    }, [screenTiltTl, dominoTl, fallTl, fontsTlRef]);

    useEffect(() => {
        if (hasScrolled) {
            setLetterClassName("inline-block will-change-transform");
        } else {
            setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
        }
    }, [hasScrolled]);
    

    return {hasScrolled,letterClassName};
}