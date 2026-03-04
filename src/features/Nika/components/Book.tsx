import first_page from '../static/images/first_page.png';
import second_page from '../static/images/second_page.png';
import third_page from '../static/images/third_page.png';
import fourth_page from '../static/images/fourth_page.png';
import fifth_page from '../static/images/fifth_page.png';
import sixth_page from '../static/images/sixth_page.png';
import seventh_page from '../static/images/seventh_page.png';
import last_page from '../static/images/last_page.png';
import Header from "../../../components/Header.tsx";
import Footer from "../../../components/Footer.tsx";
import Colors from "../../../entities/Background.ts";

import React from 'react';
import { createPortal } from "react-dom";

interface BookProps {
  bookApi: {
    left: { containerRef: React.RefObject<HTMLDivElement> };
    right: { containerRef: React.RefObject<HTMLDivElement> };
    transitionLeft: { containerRef: React.RefObject<HTMLDivElement> };
    transitionRight: { containerRef: React.RefObject<HTMLDivElement> };
    currentLeftPage: number;
    currentRightPage: number;
    transitionLeftPage: number;
    transitionRightPage: number;
  };
}

const Book = React.forwardRef<HTMLDivElement, BookProps>(function Book({ bookApi }, ref) {
  const {
    left, right, transitionLeft, transitionRight,
    currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage
  } = bookApi;

  return createPortal(
    <div ref={ref} className="fixed inset-0 bg-white flex flex-col">
        <Header bgColor={Colors.White} textColor={Colors.Black} />

        <div
  className="
    flex-1 overflow-hidden flex items-center justify-center
    px-[4vw] md:px-[10vw]
    py-6 md:py-8
  "
  style={{ perspective: 1600, transformStyle: "preserve-3d" }}
>
  {/* Zone qui limite la hauteur du livre */}
  <div className="w-full max-w-[1200px] h-[55vh] md:h-[70vh]">
    <div className="flex h-full">
      {/* LEFT */}
      <div ref={left.containerRef} className="relative h-full w-1/2">
        <div className="absolute inset-0 flex items-center justify-end">
          <Routes side="left" currentPage={currentLeftPage} />
        </div>

        <div ref={transitionLeft.containerRef} className="absolute inset-0 flex items-center justify-end">
          <Routes side="left" currentPage={transitionLeftPage} />
        </div>
      </div>

      {/* RIGHT */}
      <div ref={right.containerRef} className="relative h-full w-1/2">
        <div className="absolute inset-0 flex items-center justify-start">
          <Routes side="right" currentPage={currentRightPage} />
        </div>

        <div ref={transitionRight.containerRef} className="absolute inset-0 flex items-center justify-start">
          <Routes side="right" currentPage={transitionRightPage} />
        </div>
      </div>
    </div>
  </div>
</div>
        <Footer bgColor={Colors.White} textColor={Colors.Black} logoFanch={false} />

    </div>    ,
    document.body
  );
});

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
  className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if(page === 2){
        return(
            <img
                src={fourth_page}
                alt="fourth page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if (page === 3){
        return(
            <img 
                src={sixth_page}
                alt="sixth page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if (page === 4){
        return(
            <img 
                src={last_page}
                alt="last page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    }
    return null;
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
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if(page === 1){
        return(
            <img
                src={third_page}
                alt="third page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if (page === 2){
        return(
            <img 
                src={fifth_page}
                alt="fifth page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if (page === 3){
        return(
            <img 
                src={seventh_page}
                alt="seventh page"
                className="block max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        );
    } if (page === 4){
        return(
            <></>
        );
    }
    return null;
}