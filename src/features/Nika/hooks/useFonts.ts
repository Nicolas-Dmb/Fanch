// useFonts.ts
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useFonts() {
  const thinRef = useRef<HTMLElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null); 

  const fontsTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const thinEl = thinRef.current;
    const bookEl = bookRef.current;
    const inputEl = inputRef.current;

    if (!thinEl || !bookEl || !inputEl) return;

    // états init
    gsap.set(thinEl,  { opacity: 1 });
    gsap.set(bookEl,  { autoAlpha: 0 });
    gsap.set(inputEl, { autoAlpha: 0 }); 

    const tl = gsap.timeline();
    fontsTlRef.current = tl;

    tl.to(thinEl, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.0);
    tl.to(bookEl, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0.0);

    tl.to(bookEl, { autoAlpha: 0, duration: 0.8, ease: "power2.out" }, 1.0);
    tl.to(inputEl, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 1.2);
  }, []);

  return { fontsTlRef, thinRef, bookRef, inputRef };
}
