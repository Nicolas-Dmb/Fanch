import { useLayoutEffect } from "react";
import gsap from "gsap";
import { useContainedImageInsets } from "../../Carel/hooks/useContainsImage.tsx";

export default function useDetail() {
  const INSETS = { top: 8, right: 10, bottom: 8, left: 10 };
  const left = useContainedImageInsets(INSETS, "right");
  const transitionLeft = useContainedImageInsets(INSETS, "right");

  const INSETS_RIGHT = { ...INSETS, left: INSETS.right, right: INSETS.left };
  const right = useContainedImageInsets(INSETS_RIGHT, "left");
  const transitionRight = useContainedImageInsets(INSETS_RIGHT, "left");

  // navigation animation
  useLayoutEffect(() => {
    const rightEl = right.containerRef.current;
    const leftEl = left.containerRef.current;
    const transitionRightEl = transitionRight.containerRef.current;
    const transitionLeftEl = transitionLeft.containerRef.current;
    const wrapperEl = document.getElementById("global-wrapper");

    if (!rightEl || !leftEl || !wrapperEl || !transitionRightEl || !transitionLeftEl) return;
    
    gsap.set(transitionRightEl, {
      autoAlpha: 0,
      rotateY: 0,
      transformOrigin: "left center",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });

    gsap.set(transitionLeftEl, {
      autoAlpha: 0,
      rotateY: 90,
      transformOrigin: "right center",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });
    const ctx = gsap.context(() => {
      gsap.set(wrapperEl, { opacity: 0});

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to({}, { duration: 0.15 });

      tl.to(wrapperEl, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);

      const tl2 = gsap.timeline({ defaults: { ease: "power2.inOut" } });



      tl2.fromTo(
        leftEl,
          { rotateY: 90 },
          { rotateY: 0, transformOrigin: "right center", duration: 1.2, ease: "power3.out" },
        0
      );
      
      tl2.fromTo(
        rightEl,
          { rotateY: -90 },
          { rotateY: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out" },
        0
      );

    }, []);

    return () => ctx.revert();
  }, [left.containerRef, right.containerRef, transitionLeft.containerRef, transitionRight.containerRef]);

  const nextPageAnimation = (isDone: () => void) => {
    const rightEl = transitionRight.containerRef.current;
    const leftEl = transitionLeft.containerRef.current;

    if (!rightEl || !leftEl) return;

    gsap.killTweensOf([rightEl, leftEl]);

    gsap.set(leftEl, { rotateY: 90, transformOrigin: "right center" });
    gsap.set(rightEl, { rotateY: 0, transformOrigin: "left center" });
    gsap.set([rightEl, leftEl], { autoAlpha: 1 });

    gsap.timeline({
      defaults: { ease: "power2.inOut" },
    })
    .to(rightEl, { rotateY: -90, duration: 0.7, ease: "power3.in" }, 0)
    .to(leftEl, { rotateY: 0, duration: 0.7, ease: "power3.out" }, 0.7)
    .add(() => isDone?.(), 1.3)
    .to([rightEl, leftEl], { autoAlpha: 0, duration:0}, 1.4);
  };

  const prevPageAnimation = (isDone: () => void) => {
    const rightEl = transitionRight.containerRef.current;
    const leftEl = transitionLeft.containerRef.current;

    if (!rightEl || !leftEl) return;

    gsap.killTweensOf([rightEl, leftEl]);

    gsap.set(rightEl, { rotateY: -90, transformOrigin: "left center" });
    gsap.set(leftEl, { rotateY: 0, transformOrigin: "right center" });
    gsap.set([rightEl, leftEl], { autoAlpha: 1 });

    gsap.timeline({
      defaults: { ease: "power2.inOut" },
    })
    .to(leftEl, { rotateY: 90, duration: 0.7, ease: "power3.in" }, 0)
    .to(rightEl, { rotateY: 0, duration: 0.7, ease: "power3.out" }, 0.7)
    .add(() => isDone?.(), 1.3)
    .to([rightEl, leftEl], { autoAlpha: 0, duration:0}, 1.4);
  };

  return { left, right, transitionLeft, transitionRight, nextPageAnimation, prevPageAnimation }; 
}
