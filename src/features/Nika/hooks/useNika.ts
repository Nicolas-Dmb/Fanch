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

    const isAnimatingRef = useRef(false);
    const lastTargetPageRef = useRef<number>(0);

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
        const bookEl = bookRef?.current;
        const inputEl = inputRef?.current;

        if (!wrapperEl||!screenTiltTl.current || !dominoTl.current || !fallTl.current || !fontsTlRef.current) return;

        const BOOK_START = 0.78;
        const BOOK_END = 0.92;

        const mainTl = gsap.timeline({
            scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: "+=7000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const p = self.progress;

                if (p >= 0.001 && !hasScrolled) setHasScrolled(true);

                if (bookEl) gsap.set(bookEl, { autoAlpha: p >= BOOK_START && p <= BOOK_END ? 1 : 0 });
                if (inputEl) gsap.set(inputEl, { autoAlpha: p > BOOK_END ? 1 : 0 });

                if (p < BOOK_START || p > BOOK_END) return;

                const local = (p - BOOK_START) / (BOOK_END - BOOK_START);
                const target = Math.round(local * maxPage);

                if (target === lastTargetPageRef.current) return;
                if (isAnimatingRef.current) return;

                isAnimatingRef.current = true;

                const done = () => {
                    isAnimatingRef.current = false;
                };

                if (target > lastTargetPageRef.current) {
                    goNext();
                    gsap.delayedCall(1.45, done);
                } else {
                    goPrev();
                    gsap.delayedCall(1.45, done);
                }

                lastTargetPageRef.current = target;
                },
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
    }, [setHasScrolled, hasScrolled, screenTiltTl, dominoTl, fallTl, fontsTlRef, bookRef, inputRef, goNext, goPrev, maxPage]);

    useEffect(() => {
        if (hasScrolled) {
            setLetterClassName("inline-block will-change-transform");
        } else {
            setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
        }
    }, [hasScrolled]);
    

    return {hasScrolled,letterClassName};
}