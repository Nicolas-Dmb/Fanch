import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageIndex = {
    concorde: 1,
    clemenceau: 0,
    maroquinerie: 0, 
    chaussures: 0,
    apc: 0,
    nika: 4
};

interface NavigationProps{
    page: string;
    nextPageAnimation: (isDone: () => void) => void;
    prevPageAnimation: (isDone: () => void) => void;
}

export default function useNavigation({page, nextPageAnimation, prevPageAnimation}: NavigationProps) {
    const maxPage = PageIndex[page as keyof typeof PageIndex] || 0;
    const [currentLeftPage, setCurrentLeftPage] = useState<number>(0);
    const [currentRightPage, setCurrentRightPage] = useState<number>(0);
    const [transitionLeftPage, setTransitionLeftPage] = useState<number>(1);
    const [transitionRightPage, setTransitionRightPage] = useState<number>(1);
    const haveNext = currentRightPage < maxPage;
    const havePrev = currentLeftPage > 0;
    const navigate = useNavigate()

    const goNext = () => {
        setTransitionRightPage(currentRightPage); 
        setTransitionLeftPage(currentLeftPage + 1);
        setCurrentRightPage(currentRightPage + 1);
        if (haveNext) {
            nextPageAnimation(
                () => {
                    setCurrentLeftPage(transitionLeftPage);
                }
            );
        }
    };

    const goPrev = () => {
        setTransitionLeftPage(currentLeftPage);
        setCurrentLeftPage(currentLeftPage - 1);
        setTransitionRightPage(currentRightPage - 1);
        if (havePrev) {
            prevPageAnimation(
                () => {
                    setCurrentRightPage(transitionRightPage);
                }
            );
        }else{
            navigate(-1);
        }
    };

    return { currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage, goNext, goPrev, haveNext };

    
}