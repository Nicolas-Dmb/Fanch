import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageIndex = {
    concorde: 1,
    clemenceau: 0,
    maroquinerie: 0, 
    chaussures: 0,
    apc: 0,
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

        if (haveNext) {
            setTransitionRightPage(currentRightPage); 
            setTransitionLeftPage(currentLeftPage + 1);
            nextPageAnimation(
                () => {
                    setCurrentLeftPage(p => p + 1);
                    setCurrentRightPage(p => p + 1);
                }
            );
        }
    };

    const goPrev = () => {
        if (havePrev) {
            setTransitionLeftPage(currentLeftPage);
            setCurrentLeftPage(currentLeftPage - 1);
            setTransitionRightPage(currentRightPage - 1);
            prevPageAnimation(
                () => {
                    setCurrentRightPage(transitionRightPage);
                }
            );
        }else{
            navigate("/carel");
        }
    };

    return { currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage, goNext, goPrev, haveNext };

    
}