import first_page from '../static/images/first_page.png';
import second_page from '../static/images/second_page.png';
import third_page from '../static/images/third_page.png';
import fourth_page from '../static/images/fourth_page.png';
import fifth_page from '../static/images/fifth_page.png';
import sixth_page from '../static/images/sixth_page.png';
import seventh_page from '../static/images/seventh_page.png';
import last_page from '../static/images/last_page.png';
import React from 'react';
import { createPortal } from "react-dom";


interface BookProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  bookApi: {
    left: any;
    right: any;
    transitionLeft: any;
    transitionRight: any;
    currentLeftPage: number;
    currentRightPage: number;
    transitionLeftPage: number;
    transitionRightPage: number;
  };
}

const Book = React.forwardRef<HTMLDivElement, BookProps>(function Book({ bookApi }, ref) {
    //const { left, right, transitionLeft, transitionRight, nextPageAnimation, prevPageAnimation} = useDetail();
    //const { currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage, goPrev, goNext} = useNavigation({nextPageAnimation, prevPageAnimation});
    const {
        left, right, transitionLeft, transitionRight,
        currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage
    } = bookApi;
    
    return createPortal(
        <div ref={ref} className="h-full w-full bg-[#ffffff] flex items-center justify-center">
            <div className="w-full h-full flex items-stretch justify-center" style={{ perspective: 1600, transformStyle: "preserve-3d" }}>
                {/* Left Content */}
                <div ref={left.containerRef} className="relative h-full w-1/2 page">
                    <div ref={left.overlayRef} className="absolute overflow-auto">
                        {
                            <Routes side="left" currentPage={currentLeftPage} />
                        }
                    </div>
                    {/* Transition Page */}
                    <div className="absolute inset-0" ref={transitionLeft.containerRef}>
                        <div ref={transitionLeft.overlayRef} className="absolute overflow-auto">
                            {
                                <Routes side="left" currentPage={transitionLeftPage} />
                            }
                        </div>
                    </div>
                </div>
                {/* Right Content */}
                <div ref={right.containerRef} className="relative h-full w-1/2 page">
                    <div ref={right.overlayRef} className="absolute overflow-auto">
                        {
                            <Routes side="right" currentPage={currentRightPage} />
                        }
                    </div>
                    {/* Transition Page */}
                    <div className="absolute inset-0" ref={transitionRight.containerRef}>
                        <div ref={transitionRight.overlayRef} className="absolute overflow-auto">
                            {
                                <Routes side="right" currentPage={transitionRightPage} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>,    document.body
    )
}
);

export default Book;

interface RoutesProps {
    side: 'left' | 'right';
    currentPage: number;
}
function Routes({side, currentPage}: RoutesProps) {
        return side === 'left' ? <BookLeftContent page={currentPage} /> : <BookRightContent page={currentPage} />;

}


interface BookLeftContentProps{
    page: number;
}
export function BookLeftContent({page}: BookLeftContentProps) {
    if(page === 0){
        return(
            <></>
        );
    }
    if(page === 1){
        return(
            <img
                src={second_page}
                alt="second page"
            />
        );
    } if(page === 2){
        return(
            <img
                src={fourth_page}
                alt="fourth page"
            />
        );
    } if (page === 3){
        return(
            <img 
                src={sixth_page}
                alt="sixth page"
            />
        );
    } if (page === 4){
        return(
            <img 
                src={last_page}
                alt="last page"
            />
        );
    }
}

interface BookRightContentProps{
    page: number;
}
export function BookRightContent({page}: BookRightContentProps) {
    if(page === 0){
        return(
            <img
                src={first_page}
                alt="first page"
            />
        );
    } if(page === 1){
        return(
            <img
                src={third_page}
                alt="third page"
            />
        );
    } if (page === 2){
        return(
            <img 
                src={fifth_page}
                alt="fifth page"
            />
        );
    } if (page === 3){
        return(
            <img 
                src={seventh_page}
                alt="seventh page"
            />
        );
    } if (page === 4){
        return(
            <></>
        );
    }

}