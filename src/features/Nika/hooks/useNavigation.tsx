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

      const nextRight = right + 1;

      setTransitionRightPage(right);
      setTransitionLeftPage((left) => left + 1);

      nextPageAnimation(() => {
        setCurrentLeftPage((left) => Math.min(left + 1, maxPage));
      });

      return nextRight;
    });
  }, [maxPage, nextPageAnimation]);

  const goPrev = useCallback(() => {
    setCurrentLeftPage((left) => {
      if (left <= 0) return left;

      const nextLeft = left - 1;

      setTransitionLeftPage(left);
      setTransitionRightPage((right) => Math.max(right - 1, 0));

      prevPageAnimation(() => {
        setCurrentRightPage((right) => Math.max(right - 1, 0));
      });

      return nextLeft;
    });
  }, [prevPageAnimation]);

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
  };
}