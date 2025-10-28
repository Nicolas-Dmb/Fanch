import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useFonts() {
  const thinRef = useRef<HTMLParagraphElement | null>(null);
  const regularRef = useRef<HTMLParagraphElement | null>(null);
  const boldRef = useRef<HTMLParagraphElement | null>(null);

  const fontsTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const thinEl = thinRef.current;
    const regEl = regularRef.current;
    const boldEl = boldRef.current;

    if (!thinEl || !regEl || !boldEl) return;

    // état initial (par sécurité)
    gsap.set(thinEl,   { opacity: 1 });
    gsap.set(regEl,    { opacity: 0 });
    gsap.set(boldEl,   { opacity: 0 });

    const tl = gsap.timeline();
    fontsTlRef.current = tl;

    // Phase 1: Thin -> Regular
    tl.to(thinEl, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0.0);

    tl.to(regEl, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }, 0.0);

    // Phase 2: Regular -> Bold
    tl.to(regEl, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0.6);

    tl.to(boldEl, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }, 0.6);

  }, []);

  return { fontsTlRef, thinRef, regularRef, boldRef };
}
