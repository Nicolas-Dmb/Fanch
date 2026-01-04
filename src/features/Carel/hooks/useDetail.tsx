import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function useDetail() {

  useLayoutEffect(() => {
    const wrapperEl = document.getElementById("global-wrapper");
    if (!wrapperEl) return;

    const ctx = gsap.context(() => {
      // 👇 INVERSE du click : tu arrives avec wrapper à 0
      gsap.set(wrapperEl, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      // petit "hold" pour que le flash blanc existe vraiment
      tl.to({}, { duration: 0.15 });

      // 👇 fade-in wrapper (inverse de ton tl.to(wrapperEl, {opacity:0}))
      tl.to(wrapperEl, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);

    }, []);

    return () => ctx.revert();
  }, []);

  return { };
}
