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
}

export default function useNavigation({page}: NavigationProps) {
    const maxPage = PageIndex[page as keyof typeof PageIndex] || 0;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const haveNext = currentPage < maxPage;
    const havePrev = currentPage > 0;
    const navigate = useNavigate()

    const goNext = () => {
        if (haveNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goPrev = () => {
        if (havePrev) {
            setCurrentPage(currentPage - 1);
        }else{
            navigate("/carel");
        }
    };

    return { currentPage, goNext, goPrev, haveNext };

    
}