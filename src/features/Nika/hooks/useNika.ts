import React, { useRef, useEffect } from "react";
import Background from "../../../entities/Background.ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BackgroundColor = typeof Background[keyof typeof Background];

export default function useNika(setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>, setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>){
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [letterClassName, setLetterClassName] = React.useState("inline-block will-change-transform hover:animate-wiggle");
        
    const textRef = useRef<HTMLDivElement | null>(null);
    const nRef = useRef<HTMLParagraphElement | null>(null);
    const iRef = useRef<HTMLParagraphElement | null>(null);
    const kRef = useRef<HTMLParagraphElement | null>(null);
    const aRef = useRef<HTMLParagraphElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);

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
            const textEl = textRef.current;
            const nEl = nRef.current;
            const iEl = iRef.current;
            const kEl = kRef.current;
            const aEl = aRef.current;
            const inputEl = inputRef.current;
    
            if (!wrapperEl || !textEl || !nEl || !iEl || !kEl || !aEl || !inputEl) return;
    
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
                end: "+=4000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress >= 0.001 && !hasScrolled) {
                        setHasScrolled(true);
                    }
                },
            },
            });
    
            // PHASE 1 : tilt the screen && display input field
            const screenTiltTl = gsap.timeline();
            screenTiltTl.to(textEl, {
                xPercent: -100,
                ease: "none",
                duration: 1.3,
            });
    
            screenTiltTl.fromTo(inputEl, {
                position: "fixed",          
                left: "100vw", 
                top: "40vh",            
                yPercent: -83,              
            }, {
                left: "20vw",   
                ease: "power2.out",
                duration: 2.2,
            }, 0.0);
    
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
            dominoTl.to(iEl, { x:-60, rotate:48,  transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.42);
            dominoTl.to(nEl, { x:-30, rotate:55, transformOrigin: "bottom right", ease: "none", duration: 0.15 }, 0.44);
    
    
            // PHASE 3 : falling letters
            const fallTl = gsap.timeline();
    
            //  "a" falls first 
            fallTl.to(aEl, {y: "+=800",x: "-=200",rotate: "+=200",ease: "none",duration: 1.0,}, 0.0);
            fallTl.to(kEl, {rotate: "+=25", transformOrigin: "bottom right", ease: "none", duration: 0.2 }, 0.00); 
            fallTl.to(iEl, {x:"-=80",rotate:"+=13",  transformOrigin: "bottom right", ease: "none", duration: 0.2 }, 0.0);
            fallTl.to(nEl, {x:"-=50",rotate:"+=9",  transformOrigin: "bottom right", ease: "none", duration: 0.2 }, 0.0);
    
            // move other letters while "a" is falling 
            fallTl.to(kEl, {rotate: "+=30",ease: "none",duration: 0.17,}, 0.2);
            fallTl.to(iEl, {rotate: "-=1", transformOrigin: "bottom right", ease: "none", duration: 0.05 }, 0.2);
            fallTl.to(nEl, {rotate: "-=1", transformOrigin: "bottom right", ease: "none", duration: 0.05 }, 0.2);
            fallTl.to(iEl, {rotate: "+=25", transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.25);
            fallTl.to(nEl, {rotate: "+=15", transformOrigin: "bottom right", ease: "none", duration: 0.17 }, 0.25);
            fallTl.to(kEl, {rotate: "+=36",ease: "none", duration: 0.17,}, 0.37);
            fallTl.to(iEl, {rotate: "+=8",ease: "none", duration: 0.17,}, 0.42);
            fallTl.to(nEl, {rotate: "+=10",ease: "none", duration: 0.17,}, 0.42);
    
            // falling animations
            fallTl.to(kEl, {y: "+=800",x: "-=150",rotate: "+=180",ease: "none",transformOrigin: "bottom right", duration: 1.0,}, 0.54);
            fallTl.to(nEl, {x: "+=100",rotate: "+=100",ease: "none",transformOrigin: "bottom right",duration: 1}, 0.59);
            fallTl.to(iEl, {y: "+=200",x: "-=100",rotate: "+=140",ease: "none",duration: 1.0,}, 0.59);
            
            mainTl.add(screenTiltTl, 0.0);
            mainTl.add(dominoTl, 0.11);
            mainTl.add(fallTl, 0.71);
    
            return () => {
                mainTl.scrollTrigger?.kill();
                mainTl.kill();
            };
        }, [setHasScrolled, hasScrolled]);
    
        useEffect(() => {
            if (hasScrolled) {
                setLetterClassName("inline-block will-change-transform");
            } else {
                setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
            }
        }, [hasScrolled]);
    

    return {hasScrolled,letterClassName, textRef, nRef, iRef, kRef, aRef, inputRef };
}