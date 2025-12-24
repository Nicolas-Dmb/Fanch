import { useRef, useEffect } from "react";
import gsap from "gsap";
import Colors from "../entities/Background.ts";
import Storage from "../features/Carel/static/images/storage.png";
import Alesia from "../features/Carel/static/images/alesia.png";
import APC from "../features/Carel/static/images/apc.png";
import Concorde from "../features/Carel/static/images/concorde.png";

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}

export default function Carel({ setAcceuil, setLogoFanch, setTextColor }: carelProps) {
  const StorageRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const concordeRef = useRef<HTMLImageElement | null>(null);
  const apcRef = useRef<HTMLImageElement | null>(null);
  const alesiaRef = useRef<HTMLImageElement | null>(null);

  const isReady = useRef(false);
  const baseY = useRef<WeakMap<HTMLElement, number>>(new WeakMap());
  const cleanupsRef = useRef<Array<() => void>>([]);
  type AlphaCanvas = { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };

  const alphaMaps = useRef<Map<HTMLImageElement, AlphaCanvas>>(new Map());


  const LIFT = 18;

  const liftOn = (el: HTMLElement | null) => {
    if (!isReady.current || !el) return;
    const y0 = baseY.current.get(el);
    if (y0 === undefined) return;

    gsap.to(el, { y: y0 - LIFT, duration: 0.18, ease: "power2.out", overwrite: "auto" });
  };

  const liftOff = (el: HTMLElement | null) => {
    if (!isReady.current || !el) return;
    const y0 = baseY.current.get(el);
    if (y0 === undefined) return;

    gsap.to(el, { y: y0, duration: 0.22, ease: "power2.out", overwrite: "auto" });
  };

  const prepareAlpha = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const draw = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      alphaMaps.current.set(img, { canvas, ctx });
    };

    if (img.complete && img.naturalWidth > 0) draw();
    else img.addEventListener("load", draw, { once: true });
  };

  const alphaAtPointer = (img: HTMLImageElement, e: MouseEvent) => {
    const entry = alphaMaps.current.get(img);
    if (!entry) return 0;

    const r = img.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return 0;

    const x = Math.floor(((e.clientX - r.left) / r.width) * img.naturalWidth);
    const y = Math.floor(((e.clientY - r.top) / r.height) * img.naturalHeight);

    if (x < 0 || y < 0 || x >= img.naturalWidth || y >= img.naturalHeight) return 0;

    return entry.ctx.getImageData(x, y, 1, 1).data[3];
  };

  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch, setTextColor]);

  useEffect(() => {
    const footerEl = document.getElementById("footer");
    const storage = StorageRef.current;
    const concorde = concordeRef.current;
    const apc = apcRef.current;
    const alesia = alesiaRef.current;

    if (!footerEl || !storage || !concorde || !apc || !alesia) return;

    isReady.current = false;
    cleanupsRef.current.forEach((fn) => fn());
    cleanupsRef.current = [];

    // save footer styles
    const prev = {
      position: footerEl.style.position,
      zIndex: footerEl.style.zIndex,
      bottom: footerEl.style.bottom,
      left: footerEl.style.left,
      right: footerEl.style.right,
      width: footerEl.style.width,
      height: footerEl.style.height,
    };

    footerEl.style.position = "fixed";
    footerEl.style.zIndex = "9999";
    footerEl.style.bottom = "-20px";
    footerEl.style.height = "5em";
    footerEl.style.left = "0";
    footerEl.style.right = "0";
    footerEl.style.width = "100%";

    const ctx = gsap.context(() => {
      // z-index
      gsap.set(storage, { zIndex: 70 });
      gsap.set(concorde, { zIndex: 60 });
      gsap.set(apc, { zIndex: 40 });
      gsap.set(alesia, { zIndex: 20 });

      const all = [storage, concorde, apc, alesia];

      // center everything in fixed coords
      gsap.set(all, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        willChange: "transform",
      });

      // initial
      gsap.set(storage, { y: 0, width: "35vw" });
      gsap.set([concorde, apc, alesia], { y: -40, width: "30vw" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(storage, { y: 400, width: "80vw", duration: 1 }, 0);
      tl.to([concorde, apc, alesia], { y: 300, width: "75vw", duration: 1 }, 0);

      tl.to(concorde, { y: 270, duration: 0.4 }, 1.0);
      tl.to(apc, { y: 245, duration: 0.4 }, 1.08);
      tl.to(alesia, { y: 220, duration: 0.4 }, 1.16);

      tl.eventCallback("onComplete", () => {
      isReady.current = true;

      const c = concordeRef.current!;
      const a = apcRef.current!;
      const al = alesiaRef.current!;

      // base Y pour hover ABSOLU
      [c, a, al].forEach((el) => baseY.current.set(el, gsap.getProperty(el, "y") as number));

      // prépare les canvases alpha
      prepareAlpha(c);
      prepareAlpha(a);
      prepareAlpha(al);

      const ORDER = [c, a, al]; // top -> bottom (en accord avec tes z-index)

      let current: HTMLImageElement | null = null;

      const onMove = (e: MouseEvent) => {
        if (!isReady.current) return;

        let hit: HTMLImageElement | null = null;

        for (const img of ORDER) {
          if (!alphaMaps.current.has(img)) continue; // canvas pas prêt (image pas chargée)
          const alpha = alphaAtPointer(img, e);
          if (alpha > 10) { hit = img; break; }
        }

        if (hit !== current) {
          if (current) liftOff(current);
          if (hit) liftOn(hit);
          current = hit;
        }
      };

      const onLeave = () => {
        if (current) liftOff(current);
        current = null;
      };

      // écoute sur le conteneur plutôt que sur l'image
      const target = windowRef.current!;
      target.addEventListener("mousemove", onMove);
      target.addEventListener("mouseleave", onLeave);

      cleanupsRef.current.push(() => {
        target.removeEventListener("mousemove", onMove);
        target.removeEventListener("mouseleave", onLeave);
      });
    });

    }, windowRef);

    return () => {
      cleanupsRef.current.forEach((fn) => fn());
      cleanupsRef.current = [];
      ctx.revert();

      footerEl.style.position = prev.position;
      footerEl.style.zIndex = prev.zIndex;
      footerEl.style.bottom = prev.bottom;
      footerEl.style.left = prev.left;
      footerEl.style.right = prev.right;
      footerEl.style.width = prev.width;
      footerEl.style.height = prev.height;
    };
  }, []);

  return (
    <div ref={windowRef} className="w-full h-screen relative overflow-hidden">
      <img ref={StorageRef} src={Storage} alt="Storage" className="absolute w-[70vw] h-auto" />
      <img ref={concordeRef} src={Concorde} alt="Concorde" className="absolute w-[70vw] h-auto" />
      <img ref={apcRef} src={APC} alt="APC" className="absolute w-[70vw] h-auto" />
      <img ref={alesiaRef} src={Alesia} alt="Alesia" className="absolute w-[70vw] h-auto" />
    </div>
  );
}
