import { useLayoutEffect, useRef } from "react";

type Insets = { top: number; right: number; bottom: number; left: number }; // en %

export function useBgImg(insets: Insets) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!container || !img || !overlay) return;

    const compute = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      const ox = (cw - dw) / 2;
      const oy = (ch - dh) / 2;

      const left = ox + dw * (insets.left / 100);
      const top = oy + dh * (insets.top / 100);
      const right = ox + dw * (1 - insets.right / 100);
      const bottom = oy + dh * (1 - insets.bottom / 100);

      overlay.style.left = `${left}px`;
      overlay.style.top = `${top}px`;
      overlay.style.width = `${right - left}px`;
      overlay.style.height = `${bottom - top}px`;
    };

    // attendre que l’image soit chargée
    if (img.complete) compute();
    else img.addEventListener("load", compute, { once: true });

    const ro = new ResizeObserver(compute);
    ro.observe(container);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [insets.top, insets.right, insets.bottom, insets.left]);

  return { containerRef, imgRef, overlayRef };
}
