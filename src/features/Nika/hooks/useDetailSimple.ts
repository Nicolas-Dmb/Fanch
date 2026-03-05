import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function useDetailSimple() {
  const left = { containerRef: useRef<HTMLDivElement>(null) };
  const right = { containerRef: useRef<HTMLDivElement>(null) };
  const transitionLeft = { containerRef: useRef<HTMLDivElement>(null) };
  const transitionRight = { containerRef: useRef<HTMLDivElement>(null) };

  useLayoutEffect(() => {
    const rightEl = right.containerRef.current;
    const leftEl = left.containerRef.current;
    const tr = transitionRight.containerRef.current;
    const tl = transitionLeft.containerRef.current;
    if (!rightEl || !leftEl || !tr || !tl) return;

    gsap.set(tr, { autoAlpha: 0, rotateY: 0, transformOrigin: "left center", transformStyle: "preserve-3d", backfaceVisibility: "hidden" });
    gsap.set(tl, { autoAlpha: 0, rotateY: 90, transformOrigin: "right center", transformStyle: "preserve-3d", backfaceVisibility: "hidden" });
  }, []);

  const nextPageAnimation = (isDone: () => void) => {
    const rightEl = transitionRight.containerRef.current;
    const leftEl = transitionLeft.containerRef.current;
    if (!rightEl || !leftEl) return;

    gsap.killTweensOf([rightEl, leftEl]);
    gsap.set(leftEl, { rotateY: 90, transformOrigin: "right center" });
    gsap.set(rightEl, { rotateY: 0, transformOrigin: "left center" });
    gsap.set([rightEl, leftEl], { autoAlpha: 1 });

    gsap.timeline()
      .to(rightEl, { rotateY: -90, duration: 0.5, ease: "power3.in" }, 0)
      .to(leftEl, { rotateY: 0, duration: 0.5, ease: "power3.out" }, 0.5)
      .set([rightEl, leftEl], { autoAlpha: 0 }, 1)
      .add(() => isDone?.(), 1.0);
  };

  const prevPageAnimation = (isDone: () => void) => {
    const rightEl = transitionRight.containerRef.current;
    const leftEl = transitionLeft.containerRef.current;
    if (!rightEl || !leftEl) return;

    gsap.killTweensOf([rightEl, leftEl]);
    gsap.set(rightEl, { rotateY: -90, transformOrigin: "left center" });
    gsap.set(leftEl, { rotateY: 0, transformOrigin: "right center" });
    gsap.set([rightEl, leftEl], { autoAlpha: 1 });

    gsap.timeline()
      .to(leftEl, { rotateY: 90, duration: 0.5, ease: "power3.in" }, 0)
      .to(rightEl, { rotateY: 0, duration: 0.5, ease: "power3.out" }, 0.5)
      .set([rightEl, leftEl], { autoAlpha: 0 }, 1.0)
      .add(() => isDone?.(), 1.0);
  };

  return { left, right, transitionLeft, transitionRight, nextPageAnimation, prevPageAnimation };
}