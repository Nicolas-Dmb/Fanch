// useFonts.ts
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useFonts() {
  const thinRef = useRef<HTMLElement | null>(null);
  const regularRef = useRef<HTMLElement | null>(null);
  const boldRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null); 

  const fontsTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const thinEl = thinRef.current;
    const regEl  = regularRef.current;
    const boldEl = boldRef.current;
    const inputEl = inputRef.current;

    if (!thinEl || !regEl || !boldEl || !inputEl) return;

    // états init
    gsap.set(thinEl,  { opacity: 1 });
    gsap.set(regEl,   { opacity: 0 });
    gsap.set(boldEl,  { opacity: 0 });
    gsap.set(inputEl, { autoAlpha: 0 }); 

    const tl = gsap.timeline();
    fontsTlRef.current = tl;

    tl.to(thinEl, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.0);
    tl.to(regEl,  { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.0);

    tl.to(regEl,  { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.6);
    tl.to(boldEl, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.6);

    tl.to(inputEl, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 1.2);
  }, []);

  return { fontsTlRef, thinRef, regularRef, boldRef, inputRef };
}
