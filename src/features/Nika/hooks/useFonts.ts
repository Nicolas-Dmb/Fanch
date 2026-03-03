import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function useFonts() {
  const thinRef = useRef<HTMLElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const fontsTlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const thinEl = thinRef.current;
    const bookEl = bookRef.current;
    const inputEl = inputRef.current;
    if (!thinEl || !bookEl || !inputEl) return;

    const ctx = gsap.context(() => {
      gsap.set(thinEl, { autoAlpha: 1 });
      gsap.set(bookEl, { autoAlpha: 0 });
      gsap.set(inputEl, { autoAlpha: 0 });

      fontsTlRef.current = gsap.timeline()
        .to(thinEl, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to(bookEl, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
        .to(inputEl, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 2.2);
    });

    return () => {
      fontsTlRef.current?.kill();
      fontsTlRef.current = null;
      ctx.revert();
    };
  }, []);

  return { fontsTlRef, thinRef, bookRef, inputRef };
}
