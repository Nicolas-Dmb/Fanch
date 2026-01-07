import { useLayoutEffect } from "react";
import gsap from "gsap";
import { useContainedImageInsets } from "./useContainsImage.tsx";

export default function useDetail() {
  const INSETS = { top: 8, right: 10, bottom: 8, left: 12 };
  const left = useContainedImageInsets(INSETS, "right");

  const INSETS_RIGHT = { ...INSETS, left: INSETS.right, right: INSETS.left };
  const right = useContainedImageInsets(INSETS_RIGHT, "left");

  // navigation animation
  useLayoutEffect(() => {
    const rightEl = right.containerRef.current;
    const leftEl = left.containerRef.current;
    const wrapperEl = document.getElementById("global-wrapper");

    if (!rightEl || !leftEl || !wrapperEl) return;
    

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
  }, [left.containerRef, right.containerRef]);

  const nextPageAnimation = () => {
    const rightEl = right.pageWrapRef.current;
    const leftEl = left.pageWrapRef.current;

    if (!rightEl) return;

    gsap.set(leftEl, { rotateY: 90, transformOrigin: "right center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to({}, { duration: 0.75 });
      
      tl.to(
        rightEl,
        { rotateY: -90, transformOrigin: "left center", duration: 1.2, ease: "power3.in" },
        0
      );

      tl.to(
        leftEl,
        { rotateY: 0, transformOrigin: "right center", duration: 1.2, ease: "power3.out" },
        1.2
      );

    }, []);

    return () => ctx.revert();
  };

  const prevPageAnimation = () => {
    const rightEl = right.pageWrapRef.current;
    const leftEl = left.pageWrapRef.current;

    if (!rightEl) return;

    gsap.set(rightEl, { rotateY: -90, transformOrigin: "left center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to({}, { duration: 0.75 });
      
      tl.to(
        leftEl,
        { rotateY: 90, transformOrigin: "right center", duration: 1.2, ease: "power3.in" },
        0
      );

      tl.to(
        rightEl,
        { rotateY: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out" },
        1.2
      );

    }, []);

    return () => ctx.revert();
  };

  return { left, right, nextPageAnimation, prevPageAnimation }; 
}
