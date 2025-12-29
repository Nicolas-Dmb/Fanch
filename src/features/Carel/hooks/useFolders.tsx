import { useRef, useEffect } from "react";
import gsap from "gsap";
import {useNavigate} from "react-router-dom"


export default function useFolders() {
    const concordeRef = useRef<HTMLImageElement | null>(null);
    const apcRef = useRef<HTMLImageElement | null>(null);
    const alesiaRef = useRef<HTMLImageElement | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);
    const StorageRef = useRef<HTMLImageElement | null>(null);
    const defaultRef = useRef<HTMLImageElement | null>(null);
    const navigate = useNavigate()


    const isReady = useRef(false);
    const baseY = useRef<WeakMap<HTMLElement, number>>(new WeakMap());
    const cleanupsRef = useRef<Array<() => void>>([]);
    
    type AlphaCanvas = { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };

    const alphaMaps = useRef<Map<HTMLImageElement, AlphaCanvas>>(new Map());

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


    const LIFT = 18;

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
        gsap.set(storage, { zIndex: 70 });
        gsap.set(concorde, { zIndex: 60 });
        gsap.set(apc, { zIndex: 40 });
        gsap.set(alesia, { zIndex: 20 });

        const all = [storage, concorde, apc, alesia];

        gsap.set(all, {
            position: "fixed",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            willChange: "transform",
        });

        gsap.set(defaultRef.current, {
            position: "fixed",
            left: "50%",
            xPercent: -50,
            bottom: -window.innerHeight*1.5,
        });

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

        [c, a, al].forEach((el) => baseY.current.set(el, gsap.getProperty(el, "y") as number));

        prepareAlpha(c);
        prepareAlpha(a);
        prepareAlpha(al);

        const ORDER = [c, a, al]; 

        let current: HTMLImageElement | null = null;

        const onMove = (e: MouseEvent) => {
            if (!isReady.current) return;

            let hit: HTMLImageElement | null = null;

            for (const img of ORDER) {
            if (!alphaMaps.current.has(img)) continue; 
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

    function handleClick(folder: string) {
        const storage = StorageRef.current;
        const concorde = concordeRef.current;
        const apc = apcRef.current;
        const alesia = alesiaRef.current;
        const defaultFolder = defaultRef.current;
        const wrapperEl = document.getElementById("global-wrapper");

        if (!storage || !concorde || !apc || !alesia || !defaultFolder  || !windowRef.current || !wrapperEl) return;

        if (!isReady.current) return; // évite multi-clic pendant anim
        isReady.current = false;

        const all = [storage, concorde, apc, alesia];

        // Important: on tue les tweens en cours (hover etc.)
        gsap.killTweensOf(all);
        gsap.killTweensOf(defaultFolder);

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
             navigate(`/carel/${folder}`);
            // exemple:
            // navigate(`/projects/${folder}`)
            },
        });

        // 1) Exit scene: tout descend
        tl.to(all, { y: "+=800", duration: 0.8, ease: "power2.in" }, 0);

        // option: fais monter le "defaultFolder" (si tu veux qu'il parte vers le haut)
        tl.to(defaultFolder, { y: "-=800", opacity: 0, duration: 0.8, ease: "power2.in" }, 0);
        tl.to(wrapperEl, { opacity:0, duration: 0.8, ease: "power2.in" }, 0);

        // 3) (facultatif) petit hold de 0.1s
        tl.to({}, { duration: 0.1 }, ">");

        // 4) Wipe sort (si tu restes sur la même page et tu changes juste de scène)
        // Si tu navigues vers une autre route, fais plutôt l'animation inverse dans la page suivante.
    }



    return {
        windowRef,
        concordeRef,
        apcRef,
        alesiaRef,
        StorageRef,
        handleClick,
        defaultRef,
    };
}