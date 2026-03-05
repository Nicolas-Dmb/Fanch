import { useCallback, useReducer, useRef } from "react";

interface NavigationProps {
  nextPageAnimation: (isDone: () => void) => void;
  prevPageAnimation: (isDone: () => void) => void;
}

const maxPage = 4;

type State = {
  currentLeftPage: number;
  currentRightPage: number;
  transitionLeftPage: number;
  transitionRightPage: number;
  pendingLeft: number | null;
  pendingRight: number | null;
  isAnimating: boolean;
  isTransitionArmed: boolean;
};

type Action =
  | { type: "NEXT_START"; maxPage: number }
  | { type: "NEXT_END" }
  | { type: "PREV_START" }
  | { type: "PREV_END" }
  | { type: "RESET" }
  | { type: "CLOSE" };

const initialState: State = {
  currentLeftPage: 0,
  currentRightPage: 0,
  transitionLeftPage: 1,
  transitionRightPage: 1,
  pendingLeft: null,
  pendingRight: null,
  isAnimating: false,
  isTransitionArmed: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_START": {
      if (state.currentRightPage >= action.maxPage) return state;

      const nextRight = state.currentRightPage + 1;
      const nextLeft = state.currentLeftPage + 1;

      return {
        ...state,
        transitionRightPage: state.currentRightPage,
        transitionLeftPage: nextLeft,
        currentRightPage: nextRight,
        pendingLeft: nextLeft,
        isAnimating: true,
        isTransitionArmed: true,
      };
    }

    case "NEXT_END": {
      if (!state.isAnimating || state.pendingLeft === null) {
        return { ...state, isAnimating: false, isTransitionArmed: false };
      }
      return {
        ...state,
        currentLeftPage: state.pendingLeft,
        pendingLeft: null,
        isAnimating: false,
        isTransitionArmed: false,
      };
    }

    case "PREV_START": {
      if (state.currentLeftPage <= 0) return state;

      const prevLeft = state.currentLeftPage - 1;
      const prevRight = state.currentRightPage - 1;

      return {
        ...state,
        transitionLeftPage: state.currentLeftPage,
        transitionRightPage: prevRight,
        currentLeftPage: prevLeft,
        pendingRight: prevRight,
        isAnimating: true,
        isTransitionArmed: true,
      };
    }

    case "PREV_END": {
      if (!state.isAnimating || state.pendingRight === null) {
        return { ...state, isAnimating: false, isTransitionArmed: false };
      }
      return {
        ...state,
        currentRightPage: state.pendingRight,
        pendingRight: null,
        isAnimating: false,
        isTransitionArmed: false,
      };
    }

    case "RESET":
      return { ...initialState };

    case "CLOSE":
      return {
        ...state,
        pendingLeft: null,
        pendingRight: null,
        currentRightPage: maxPage,
        currentLeftPage: maxPage,
        isAnimating: false,
        isTransitionArmed: false,
      };

    default:
      return state;
  }
}

export default function useNavigation({ nextPageAnimation, prevPageAnimation }: NavigationProps) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const animGuardRef = useRef(false);

  const currentIndexRef = useRef(0);

  const targetRef = useRef<number | null>(null);

  const haveNext = state.currentRightPage < maxPage;
  const havePrev = state.currentLeftPage > 0;

  const stepToTarget = useCallback(() => {
    const t = targetRef.current;
    if (t === null) return;
    if (animGuardRef.current) return;

    const cur = currentIndexRef.current;

    if (cur === t) {
      targetRef.current = null;
      return;
    }

    if (t > cur) {
      animGuardRef.current = true;
      dispatch({ type: "NEXT_START", maxPage });
      currentIndexRef.current = cur + 1; 

      requestAnimationFrame(() => {
        nextPageAnimation(() => {
          dispatch({ type: "NEXT_END" });
          animGuardRef.current = false;
          requestAnimationFrame(stepToTarget);
        });
      });
    } else {
      animGuardRef.current = true;
      dispatch({ type: "PREV_START" });
      currentIndexRef.current = cur - 1; 

      requestAnimationFrame(() => {
        prevPageAnimation(() => {
          dispatch({ type: "PREV_END" });
          animGuardRef.current = false;
          requestAnimationFrame(stepToTarget);
        });
      });
    }
  }, [maxPage, nextPageAnimation, prevPageAnimation]);

  const goTo = useCallback((target: number) => {
    const clamped = Math.max(0, Math.min(maxPage, target));
    targetRef.current = clamped;
    stepToTarget();
  }, [maxPage, stepToTarget]);

  const goNext = useCallback(() => {
    goTo(currentIndexRef.current + 1);
  }, [goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndexRef.current - 1);
  }, [goTo]);

  const reset = useCallback(() => {
    animGuardRef.current = false;
    targetRef.current = null;
    currentIndexRef.current = 0;
    dispatch({ type: "RESET" });
  }, []);

  const close = useCallback(() => {
    animGuardRef.current = false;
    targetRef.current = null;
    dispatch({ type: "CLOSE" });
  }, []);

  return {
    ...state,
    goNext,
    goPrev,
    goTo, 
    haveNext,
    havePrev,
    maxPage,
    reset,
    close,
  };
}