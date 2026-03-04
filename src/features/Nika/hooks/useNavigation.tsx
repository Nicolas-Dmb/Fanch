import { useState, useCallback } from "react";

const PageIndex = {
  concorde: 1,
  clemenceau: 0,
  maroquinerie: 0,
  chaussures: 0,
  apc: 0,
  nika: 4,
} as const;

interface NavigationProps {
  page: string;
  nextPageAnimation: (isDone: () => void) => void;
  prevPageAnimation: (isDone: () => void) => void;
}

export default function useNavigation({
  page,
  nextPageAnimation,
  prevPageAnimation,
}: NavigationProps) {
  const maxPage = PageIndex[page as keyof typeof PageIndex] ?? 0;

  const [currentLeftPage, setCurrentLeftPage] = useState(0);
  const [currentRightPage, setCurrentRightPage] = useState(0);
  const [transitionLeftPage, setTransitionLeftPage] = useState(1);
  const [transitionRightPage, setTransitionRightPage] = useState(1);

  const haveNext = currentRightPage < maxPage;
  const havePrev = currentLeftPage > 0;

  const goNext = useCallback(() => {
    setCurrentRightPage((right) => {
      if (right >= maxPage) return right;

      setTransitionRightPage(currentRightPage);
      setTransitionLeftPage(currentLeftPage+1);

      nextPageAnimation(() => {
        setCurrentLeftPage(currentLeftPage+1);
      });

      return currentRightPage+1;
    });
  }, [maxPage, nextPageAnimation]);

  const goPrev = useCallback(() => {
    setCurrentLeftPage((left) => {
      if (left <= 0) return left;

      setTransitionLeftPage(currentLeftPage);
      setTransitionRightPage(currentRightPage-1);

      prevPageAnimation(() => {
        setCurrentRightPage(currentRightPage-1);
      });

      return currentLeftPage-1;
    });
  }, [prevPageAnimation]);

  const reset = useCallback(() => {
    setCurrentLeftPage(0);
    setCurrentRightPage(0);
    setTransitionLeftPage(1);
    setTransitionRightPage(1);
  }, []);

  return {
    currentLeftPage,
    currentRightPage,
    transitionLeftPage,
    transitionRightPage,
    goNext,
    goPrev,
    haveNext,
    havePrev,
    maxPage,
    reset
  };
}