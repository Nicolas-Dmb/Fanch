import { useCallback, useReducer, useRef } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const PageIndex = {
    concorde: 1,
    clemenceau: 0,
    maroquinerie: 0, 
    chaussures: 0,
    apc: 0,
};


interface NavigationProps {
    page: string;
    nextPageAnimation: (isDone: () => void) => void;
    prevPageAnimation: (isDone: () => void) => void;
}

type State = {
    currentLeftPage: number;
    currentRightPage: number;
    transitionLeftPage: number;
    transitionRightPage: number;
    pendingLeft: number | null;
    pendingRight: number | null;
    isAnimating: boolean;
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
};

function reducer( state: State, action: Action): State {
    switch (action.type) {
        case "NEXT_START": {
        if (state.currentRightPage >= action.maxPage) return state;

        const nextRight = state.currentRightPage + 1;
        const nextLeft = nextRight;

        return {
            ...state,
            transitionRightPage: state.currentRightPage,
            transitionLeftPage: nextLeft,
            currentRightPage: nextRight,
            pendingLeft: nextLeft,
            isAnimating: true,
        };
        }

        case "NEXT_END": {
        if (!state.isAnimating || state.pendingLeft === null) {
            return { ...state, isAnimating: false };
        }
        return {
            ...state,
            currentLeftPage: state.pendingLeft,
            pendingLeft: null,
            isAnimating: false,
        };
        }

        case "PREV_START": {
        if (state.currentLeftPage <= 0) return state;

        const prevLeft = state.currentLeftPage - 1;
        const prevRight = prevLeft;

        return {
            ...state,
            transitionLeftPage: state.currentLeftPage,
            transitionRightPage: prevRight,
            currentLeftPage: prevLeft,
            pendingRight: prevRight,
            isAnimating: true,
        };
        }

        case "PREV_END": {
            if (!state.isAnimating || state.pendingRight === null) {
                return { ...state, isAnimating: false };
            }
            return {
                ...state,
                currentRightPage: state.pendingRight,
                pendingRight: null,
                isAnimating: false,
            };
        }

        default:
        return state;
    }
}

export default function useNavigation({page, nextPageAnimation, prevPageAnimation }: NavigationProps) {
    const maxPage = PageIndex[page as keyof typeof PageIndex] ?? 0;

    const [state, dispatch] = useReducer(reducer, initialState);

    const animGuardRef = useRef(false);

    const currentIndexRef = useRef(0);

    const targetRef = useRef<number | null>(null);

    const navigate = useNavigate()

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

        flushSync(() => {
            dispatch({ type: "NEXT_START", maxPage });
        });

        currentIndexRef.current = cur + 1;

        nextPageAnimation(() => {
            flushSync(() => {
            dispatch({ type: "NEXT_END" });
            });
            animGuardRef.current = false;
            requestAnimationFrame(stepToTarget);
        });

        } else {
        animGuardRef.current = true;

        flushSync(() => {
            dispatch({ type: "PREV_START" });
        });

        currentIndexRef.current = cur - 1;

        prevPageAnimation(() => {
            flushSync(() => {
            dispatch({ type: "PREV_END" });
            });
            animGuardRef.current = false;
            requestAnimationFrame(stepToTarget);
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
        if (!havePrev) {
            navigate(-1);
            return;
        };
        goTo(currentIndexRef.current - 1);
    }, [goTo]);

    return {
        ...state,
        goNext,
        goPrev,
        goTo, 
        haveNext,
        havePrev,
        maxPage,
    };
}