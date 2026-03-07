import { useRef, useEffect } from "react";
import gsap from "gsap";
import {useNavigate} from "react-router-dom"

export default function useFolders() {
    const concordeRef = useRef<HTMLImageElement | null>(null);
    const bossaRef = useRef<HTMLImageElement | null>(null);
    const maroquinerieRef = useRef<HTMLImageElement | null>(null);
    const chaussuresRef = useRef<HTMLImageElement | null>(null);
    const alesiaRef = useRef<HTMLImageElement | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);
    const StorageRef = useRef<HTMLImageElement | null>(null);
    const closeFoldersRef = useRef<HTMLImageElement | null>(null);
    const currentRef = useRef<HTMLImageElement | null>(null);
    const clemenceauRef = useRef<HTMLImageElement | null>(null);
    const accessoiresLabelRef = useRef<HTMLImageElement | null>(null);
    const accessoiresRef = useRef<HTMLImageElement | null>(null);
    const miniClemenceauRef = useRef<HTMLImageElement | null>(null);
    const madeleineRef = useRef<HTMLImageElement | null>(null);
    const madeleineBrodeeRef = useRef<HTMLImageElement | null>(null);
    const maddieRef = useRef<HTMLImageElement | null>(null);
    const mabillonRef = useRef<HTMLImageElement | null>(null);
    const elyseeRef = useRef<HTMLImageElement | null>(null);

    const navigate = useNavigate()


    const isReady = useRef(false);
    const baseY = useRef<WeakMap<HTMLElement, number>>(new WeakMap());
    const cleanupsRef = useRef<Array<() => void>>([]);
    
    type AlphaCanvas = { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };

    const alphaMaps = useRef<Map<HTMLImageElement, AlphaCanvas>>(new Map());

    const LIFT = 18;

    useEffect(() => {
        const isDesktopNow = window.innerWidth >= 1024;
        const yresponsive = isDesktopNow ? 1 : 0.20;

        const footerEl = document.getElementById("footer");
        const storage = StorageRef.current;
        const concorde = concordeRef.current;
        const bossa = bossaRef.current;
        const alesia = alesiaRef.current;
        const maroquinerie = maroquinerieRef.current;
        const chaussures = chaussuresRef.current;
        const closeFolders = closeFoldersRef.current;
        const clemenceau = clemenceauRef.current;
        const accessoiresLabel = accessoiresLabelRef.current;
        const accessoires = accessoiresRef.current;
        const miniClem = miniClemenceauRef.current;
        const madeleine = madeleineRef.current;
        const madeleineBrodee = madeleineBrodeeRef.current;
        const maddie = maddieRef.current;
        const mabillon = mabillonRef.current;
        const elysee = elyseeRef.current;

        if (!footerEl || !storage || !concorde || !bossa || !alesia || !maroquinerie || !chaussures || !closeFolders || !clemenceau || !accessoiresLabel || !accessoires || !miniClem || !madeleine || !madeleineBrodee || !maddie || !mabillon || !elysee) return;

        // Reset opacity on wrapper when go back from Carel subpage
        const wrapperEl = document.getElementById("global-wrapper");
        if (wrapperEl) gsap.set(wrapperEl, { opacity: 1, clearProps: "opacity" });

        isReady.current = false;
        cleanupsRef.current.forEach((fn) => fn());
        cleanupsRef.current = [];

        const prev = _footerStyle(footerEl);

        const ctx = gsap.context(() => {
            
            const all = [storage, concorde, bossa, alesia, chaussures, maroquinerie, closeFolders, clemenceau, accessoiresLabel, accessoires, miniClem, madeleine, madeleineBrodee, maddie, mabillon, elysee];
            const folderelements = [concorde, bossa, alesia, chaussures, maroquinerie, clemenceau, accessoiresLabel, accessoires, miniClem, madeleine, madeleineBrodee, maddie, mabillon, elysee];

            _setGsapDefaults({ concorde, chaussures, bossa, maroquinerie, alesia, closeFolders, storage, all, folderelements, clemenceau, accessoiresLabel, accessoires, miniClem, madeleine, madeleineBrodee, maddie, mabillon, elysee, isDesktop: isDesktopNow, yresponsive });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            
            // 1) Entry animation
            tl.to(storage, { y: 400 * yresponsive, width: isDesktopNow ? "80vw" : "100vw", duration: 1 }, 0);
            tl.to(closeFolders, { y: 330 * yresponsive, width: isDesktopNow ? "75vw" : "100vw", duration: 1 }, 0);

            // 2) replace folders
            tl.to(closeFolders, {opacity:0, duration:0}, 1);
            tl.to(folderelements, {opacity:1, duration:0},1);

            // 3) staggered rise
            var mobileExpansion = isDesktopNow ? 0 : 80;
            const coef = isDesktopNow ? 0 : 40;
            const timelineMobile = isDesktopNow ? 1 : 1.5;
            tl.to(accessoiresLabel, { y: (290 - mobileExpansion) * yresponsive, duration: 0.4 }, 1*timelineMobile);
            mobileExpansion += coef;
            tl.to(accessoires, { y: (300 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.04*timelineMobile);
            mobileExpansion += coef;
            tl.to(chaussures, { y: (240 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.08*timelineMobile);
            mobileExpansion += coef;
            tl.to(bossa, { y: (280 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.12*timelineMobile);
            mobileExpansion += coef;
            tl.to(maroquinerie, { y: (250 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.16*timelineMobile);
            mobileExpansion += coef;
            tl.to(concorde, { y: (270 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.20*timelineMobile);
            mobileExpansion += coef;
            tl.to(clemenceau, { y: (260 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.24*timelineMobile);
            mobileExpansion += coef;
            tl.to(miniClem, { y: (250 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.28*timelineMobile);
            mobileExpansion += coef;
            tl.to(alesia, { y: (235 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.32*timelineMobile);
            mobileExpansion += coef;
            tl.to(madeleine, { y: (230 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.36*timelineMobile);
            mobileExpansion += coef;
            tl.to(maddie, { y: (220 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.40*timelineMobile);
            mobileExpansion += coef;
            tl.to(madeleineBrodee, { y: (200 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.44*timelineMobile);
            mobileExpansion += coef;
            tl.to(elysee, { y: (185 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.48*timelineMobile);
            mobileExpansion += coef;
            tl.to(mabillon, { y: (170 - mobileExpansion) * yresponsive, duration: 0.4 }, 1.52*timelineMobile);

            tl.eventCallback("onComplete", () => {
                _setupFolderInteractions(isDesktopNow);
            });

        }, windowRef);

        return () => {
            cleanupsRef.current.forEach((fn) => fn());
            cleanupsRef.current = [];
            ctx.revert();
            _footerStyleRestore(footerEl, prev);
        };
    }, []);

    // Navigation and animation when clicking on a folder
    function handleClick(folder: string) {
        isReady.current = false;
        const wrapperEl = document.getElementById("global-wrapper");

        if (!wrapperEl) return;

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
             navigate(`/carel/${folder}`);
            },
        });

        // 2/ fade out wrapper
        tl.to(wrapperEl, { opacity:0, duration: 0.8, ease: "power2.in" }, 0);

        // 3/ (optional) small hold of 0.1s
        tl.to({}, { duration: 0.1 }, ">");
    }

    // Setup folder hover and click interactions
    function _setupFolderInteractions(isDesktopNow: boolean) {
        isReady.current = true;

        const a = accessoiresRef.current!;
        const alabel = accessoiresLabelRef.current!;
        const concorde = concordeRef.current!;
        const b = bossaRef.current!;
        const al = alesiaRef.current!;
        const m = maroquinerieRef.current!;
        const ch = chaussuresRef.current!;
        const clem = clemenceauRef.current!;
        const miniClem = miniClemenceauRef.current!;
        const madeleine = madeleineRef.current!;
        const maddie = maddieRef.current!;
        const madeleineBrodee = madeleineBrodeeRef.current!;
        const elysee = elyseeRef.current!;
        const mabillon = mabillonRef.current!;


        [a, alabel, concorde, ch, b, m, al, clem, miniClem, madeleine, maddie, madeleineBrodee, elysee, mabillon].forEach((el) => baseY.current.set(el, gsap.getProperty(el, "y") as number));

        _prepareAlpha(a);
        _prepareAlpha(alabel);
        _prepareAlpha(concorde);
        _prepareAlpha(b);
        _prepareAlpha(al);
        _prepareAlpha(m);
        _prepareAlpha(ch);
        _prepareAlpha(clem);
        _prepareAlpha(miniClem);
        _prepareAlpha(madeleine);
        _prepareAlpha(maddie);
        _prepareAlpha(madeleineBrodee);
        _prepareAlpha(elysee);
        _prepareAlpha(mabillon);
        
        const ORDER = [alabel, a, ch, b, m, concorde,clem, miniClem, al, madeleine, maddie, madeleineBrodee, elysee, mabillon]; 


        const target = windowRef.current!;
        const handleMove = (e: MouseEvent) => _onMove(e, ORDER, isDesktopNow);
        const handleLeave = () => _onLeave();
        const handleClick = () => _onClick();

        target.addEventListener("mousemove", handleMove);
        target.addEventListener("mouseleave", handleLeave);
        target.addEventListener("click", handleClick);

        cleanupsRef.current.push(() => {
            target.removeEventListener("mousemove", handleMove);
            target.removeEventListener("mouseleave", handleLeave);
            target.removeEventListener("click", handleClick);
        });
    }

    const _onMove = (e: MouseEvent, ORDER: HTMLImageElement[], isDesktopNow: boolean) => {
        if (!isReady.current) return;

        let hit: HTMLImageElement | null = null;
        for (const img of ORDER) {
            if (!alphaMaps.current.has(img)) continue;
            if (_alphaAtPointer(img, e) > 10) { hit = img; break; }
        }

        if (hit !== currentRef.current) {
            if (currentRef.current && isDesktopNow) _liftOff(currentRef.current);
            if (hit && isDesktopNow) _liftOn(hit);
            currentRef.current = hit;
        }
    };

    const _onClick = () => {
        const el = currentRef.current;
        if (!el) return;

        const folderName = el.dataset.folder ?? el.alt.toLowerCase();
        handleClick(folderName);
    };

    const _onLeave = () => {
        if (currentRef.current) _liftOff(currentRef.current);
        currentRef.current = null;
    };
    // Lift folder up on hover
    const _liftOn = (el: HTMLElement | null) => {
        if (!isReady.current || !el) return;
        const y0 = baseY.current.get(el);
        if (y0 === undefined) return;

        gsap.to(el, { y: y0 - LIFT, duration: 0.18, ease: "power2.out", overwrite: "auto" });
    };

    // Lower folder back to base position
    const _liftOff = (el: HTMLElement | null) => {
        if (!isReady.current || !el) return;
        const y0 = baseY.current.get(el);
        if (y0 === undefined) return;

        gsap.to(el, { y: y0, duration: 0.22, ease: "power2.out", overwrite: "auto" });
    };

    // Prepare alpha map for an image
    const _prepareAlpha = (img: HTMLImageElement) => {
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

    // Get alpha value at pointer position
    const _alphaAtPointer = (img: HTMLImageElement, e: MouseEvent) => {
        const entry = alphaMaps.current.get(img);
        if (!entry) return 0;

        const r = img.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return 0;

        const x = Math.floor(((e.clientX - r.left) / r.width) * img.naturalWidth);
        const y = Math.floor(((e.clientY - r.top) / r.height) * img.naturalHeight);

        if (x < 0 || y < 0 || x >= img.naturalWidth || y >= img.naturalHeight) return 0;

        return entry.ctx.getImageData(x, y, 1, 1).data[3];
    };


    return {
        windowRef,
        concordeRef,
        bossaRef,
        alesiaRef,
        StorageRef,
        closeFoldersRef, 
        maroquinerieRef,
        chaussuresRef,
        clemenceauRef,
        accessoiresLabelRef, 
        accessoiresRef,
        miniClemenceauRef, 
        madeleineRef, 
        madeleineBrodeeRef, 
        maddieRef, 
        mabillonRef, 
        elyseeRef
    };
}


function _footerStyle(footerEl:HTMLElement){
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
        return prev;
}

function _footerStyleRestore(footerEl:HTMLElement, prev: any){
    footerEl.style.position = prev.position;
    footerEl.style.zIndex = prev.zIndex;
    footerEl.style.bottom = prev.bottom;
    footerEl.style.left = prev.left;
    footerEl.style.right = prev.right;
    footerEl.style.width = prev.width;
    footerEl.style.height = prev.height;
}

interface GsapDefaults {
    concorde: HTMLImageElement;
    chaussures: HTMLImageElement;
    bossa: HTMLImageElement;
    maroquinerie: HTMLImageElement;
    alesia: HTMLImageElement;
    closeFolders: HTMLImageElement;
    storage: HTMLImageElement;
    clemenceau: HTMLImageElement;
    accessoiresLabel: HTMLImageElement;
    accessoires: HTMLImageElement;
    miniClem: HTMLImageElement;
    madeleine: HTMLImageElement;
    madeleineBrodee: HTMLImageElement;
    maddie: HTMLImageElement;
    mabillon: HTMLImageElement;
    elysee: HTMLImageElement;
    all: HTMLImageElement[];
    folderelements: HTMLImageElement[];
    isDesktop: boolean;
    yresponsive: number;
}

function _setGsapDefaults({ concorde, chaussures, bossa, maroquinerie, alesia, closeFolders, storage, clemenceau, all, folderelements, accessoiresLabel, accessoires, miniClem, madeleine, madeleineBrodee, maddie, mabillon, elysee, isDesktop, yresponsive }: GsapDefaults) { 
    gsap.set(storage, { zIndex: 120 });
    gsap.set(accessoiresLabel, { zIndex: 115 });
    gsap.set(accessoires, { zIndex: 110 });
    gsap.set(chaussures, { zIndex: 100 });
    gsap.set(bossa, { zIndex: 90 });
    gsap.set(maroquinerie, { zIndex: 80 });
    gsap.set(concorde, { zIndex: 70 });
    gsap.set(clemenceau, { zIndex: 60 });
    gsap.set(miniClem, { zIndex: 50 });
    gsap.set(alesia, { zIndex: 40 });
    gsap.set(madeleine, { zIndex: 30 });
    gsap.set(maddie, { zIndex: 25 });
    gsap.set(madeleineBrodee, { zIndex: 20 });    
    gsap.set(elysee, { zIndex: 15 });
    gsap.set(mabillon, { zIndex: 10 });
    gsap.set(closeFolders, { zIndex: 55 });
    gsap.set(all, {
        position: "fixed",
        left: "50%",
        top: "80vh",
        xPercent: -50,
        yPercent: -100,
        willChange: "transform",
        force3D: true,
        backfaceVisibility: "hidden",
        transformPerspective: 1000,
    });
    gsap.set(folderelements, { opacity: 0, y: 330* yresponsive, width: isDesktop ? "75vw" : "100vw" });
    gsap.set(maroquinerie,{y: 320* yresponsive});
    gsap.set(closeFolders, {width: "35vw", y: -80});
    gsap.set(storage, { y: -60, width:"35vw"});
}
