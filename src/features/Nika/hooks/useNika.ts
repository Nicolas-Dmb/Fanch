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

    const goNextRef = useRef(goNext);
    const goPrevRef = useRef(goPrev);
    const currentPageRef = useRef(currentPage);

    useEffect(() => { goNextRef.current = goNext; }, [goNext]);
    useEffect(() => { goPrevRef.current = goPrev; }, [goPrev]);
    useEffect(() => { currentPageRef.current = currentPage; }, [currentPage]);

    const mainTlRef = useRef<gsap.core.Timeline | null>(null);


    const bookPages = 4;
    const bookStart = 2.6;
    const bookEnd = 3.6;

    const lastPageRef = useRef<number>(-1);

    const toPageIndexFromTime = (time: number) => {
        const t = (time - bookStart) / (bookEnd - bookStart);
        const clamped = Math.min(1, Math.max(0, t));
        return Math.min(bookPages - 1, Math.floor(clamped * bookPages));
    };

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
        if (mainTlRef.current) return; 
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
                onUpdate: (self) => {
                    if (self.progress > 0.01 && !hasScrolled) {
                        setHasScrolled(true);
                    }

                    const time = mainTl.time();
                    const pageIndex = toPageIndexFromTime(time);

                    if (pageIndex !== lastPageRef.current) {
                        const prev = lastPageRef.current;
                        lastPageRef.current = pageIndex;

                        if (prev !== -1 && time >= bookStart && time <= bookEnd) {
                            console.log(`Book page: ${prev} -> ${pageIndex}`);
                            if (pageIndex > prev) goNextRef.current();
                            else goPrevRef.current();
                        }
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