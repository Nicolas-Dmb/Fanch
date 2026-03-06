import React, { useEffect, useRef } from "react";
import Colors from "../../../entities/Background.ts";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface UseNikaProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  screenTiltTl: React.MutableRefObject<gsap.core.Timeline | null>;
  dominoTl: React.MutableRefObject<gsap.core.Timeline | null>;
  fallTl: React.MutableRefObject<gsap.core.Timeline | null>;
  fontsTlRef: React.MutableRefObject<gsap.core.Timeline | null>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  bookRef: React.MutableRefObject<HTMLElement | null>;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  goNext: () => void;
  goPrev: () => void;
  reset: () => void;
  close: () => void;
  currentPage: number;
  maxPage: number;
}

export default function useNika({
  setAcceuil,
  setLogoFanch,
  setTextColor,
  screenTiltTl,
  dominoTl,
  fallTl,
  fontsTlRef,
  bookRef,
  inputRef,
  goNext,
  goPrev,
  currentPage,
  maxPage,
  reset,
  close,
}: UseNikaProps) {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [letterClassName, setLetterClassName] = React.useState(
    "inline-block will-change-transform hover:animate-wiggle"
  );

  const goNextRef = useRef(goNext);
  const goPrevRef = useRef(goPrev);
  const currentPageRef = useRef(currentPage);

  const mainTlRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const targetProgressRef = useRef(0);
  const lastFlipTsRef = useRef(0);
  const lastPageRef = useRef<number>(-1);

  const bookPages = maxPage + 1;
  const bookStart = 2.4;
  const bookEnd = 4.8;

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  useEffect(() => {
    goPrevRef.current = goPrev;
  }, [goPrev]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const toPageIndexFromTime = (time: number) => {
    const t = (time - bookStart) / (bookEnd - bookStart);
    const clamped = Math.min(1, Math.max(0, t));
    return Math.min(bookPages - 1, Math.floor(clamped * bookPages));
  };

  useEffect(() => {
    setAcceuil(Colors.Yellow);
    setTextColor(Colors.Black);
    setLogoFanch(false);

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
    };
  }, [setAcceuil, setLogoFanch, setTextColor]);

  useEffect(() => {
    if (mainTlRef.current) return;
    if (
      !screenTiltTl.current ||
      !dominoTl.current ||
      !fallTl.current ||
      !fontsTlRef.current
    ) {
      return;
    }

    const mainTl = gsap.timeline({ paused: true });

    mainTl.add(screenTiltTl.current, 0.0);
    mainTl.add(dominoTl.current, 0.11);
    mainTl.add(fallTl.current, 0.71);
    mainTl.add(fontsTlRef.current, 2.2);

    mainTlRef.current = mainTl;

    const syncBookLikeBefore = () => {
      if (mainTl.progress() > 0.01 && !hasScrolled) {
        setHasScrolled(true);
      }

      const time = mainTl.time();
      const pageIndex = toPageIndexFromTime(time);

      if (pageIndex !== lastPageRef.current) {
        const now = Date.now();
        if (now - lastFlipTsRef.current < 250) return;

        lastFlipTsRef.current = now;
        const prev = lastPageRef.current;
        lastPageRef.current = pageIndex;

        if (prev !== -1 && time >= bookStart && time <= bookEnd) {
          if (pageIndex > prev) {
            goNextRef.current();
          } else {
            goPrevRef.current();
          }
        } else if (pageIndex === bookPages - 1 && time > bookEnd) {
          reset();
        }
      }

      if (time < bookStart) {
        lastPageRef.current = 0;
        reset();
      }

      if (time > bookEnd) {
        lastPageRef.current = bookPages - 1;
        close();
      }
    };

    const animateToProgress = (nextProgress: number) => {
      const clamped = gsap.utils.clamp(0, 1, nextProgress);
      targetProgressRef.current = clamped;

      tweenRef.current?.kill();

      tweenRef.current = gsap.to(mainTl, {
        progress: clamped,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: syncBookLikeBefore,
        onComplete: syncBookLikeBefore,
      });
    };

    const getSensitivity = () => (window.innerWidth < 768 ? 0.00075 : 0.00045);

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      preventDefault: true,
      lockAxis: true,
      tolerance: 6,
      dragMinimum: 4,
      onChangeY: (self) => {
        const delta = self.deltaY * getSensitivity();
        animateToProgress(targetProgressRef.current + delta);
      },
    });

    observerRef.current = observer;

    syncBookLikeBefore();

    return () => {
      observerRef.current?.kill();
      observerRef.current = null;

      tweenRef.current?.kill();
      tweenRef.current = null;

      mainTl.kill();
      mainTlRef.current = null;
    };
  }, [
    screenTiltTl,
    dominoTl,
    fallTl,
    fontsTlRef,
    hasScrolled,
    bookPages,
    reset,
    close,
  ]);

  useEffect(() => {
    if (hasScrolled) {
      setLetterClassName("inline-block will-change-transform");
    } else {
      setLetterClassName("inline-block will-change-transform hover:animate-wiggle");
    }
  }, [hasScrolled]);

  return { hasScrolled, letterClassName };
}