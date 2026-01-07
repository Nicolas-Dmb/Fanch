import React, { useEffect } from 'react';
import Colors from '../../../entities/Background.ts';
import useDetail from '../hooks/useDetail.tsx';
import { useParams } from 'react-router-dom';
import useNavigation from '../hooks/useNavigation.tsx';

import open_folder from '../static/images/open_folder.png';
import page from '../static/images/page.png';
import back_arrow from '../static/images/back_arrow.png';

// Detail Components
import { ClemenceauLeftContent, ClemenceauRightContent } from './Clemenceau.tsx';
import { ConcordeLeftContent, ConcordeRightContent } from './Concorde.tsx';

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface CarelDetailProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}

export default function CarelDetail({
  setAcceuil,
  setLogoFanch,
  setTextColor,
}: CarelDetailProps) {
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        setAcceuil(Colors.Black);
        setTextColor(Colors.White);
        setLogoFanch(false); 
    }, [setAcceuil, setLogoFanch, setTextColor]);

    const { left, right, nextPageAnimation, prevPageAnimation } = useDetail();
    const { currentPage, goNext, goPrev, haveNext } = useNavigation( {page: name || "", nextPageAnimation, prevPageAnimation} );

    return (
        <div className="absolute w-full h-full bg-black overflow-hidden z-999999">
        <div className="h-full flex items-center justify-center">
            <div className="relative h-full w-[92vw] max-w-[1400px] py-6">
            <img
                src={back_arrow}
                alt="Back"
                className="absolute top-10 left-0 h-9 w-auto cursor-pointer z-50"
                onClick={() => goPrev()}
            />
            {haveNext && (
                <img
                src={back_arrow}
                alt="Next"
                className="absolute top-10 right-0 h-9 w-auto cursor-pointer z-50 scale-x-[-1]"
                onClick={() => goNext()}
            />
            )}

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full h-full flex items-stretch justify-center" style={{ perspective: 1600, transformStyle: "preserve-3d" }}>
                    {/* Left Content */}
                    <div ref={left.containerRef} className="relative h-full w-1/2 page">
                        <img
                            src={open_folder}
                            alt="folder left"
                            className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none"
                        />
                        <div className="absolute inset-0" ref={left.pageWrapRef}>
                            <img
                                ref={left.pageImgRef}
                                src={page}
                                alt="page left"
                                className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none"
                            />
                            <div ref={left.overlayRef} className="absolute overflow-auto">
                                {
                                    <LeftRoutes side="left" pageName={name || ""} currentPage={currentPage} />
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div ref={right.containerRef} className="relative h-full w-1/2 page">
                        <img
                            src={open_folder}
                            alt="folder right"
                            className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none scale-x-[-1]"
                        />
                        <div className="absolute inset-0" ref={right.pageWrapRef}>
                            <img
                                ref={right.pageImgRef}
                                src={page}
                                alt="page right"
                                className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none scale-x-[-1]"
                            />
                            <div ref={right.overlayRef} className="absolute overflow-auto">
                                {
                                    <LeftRoutes side="right" pageName={name || ""} currentPage={currentPage} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

interface RoutesProps {
    side: 'left' | 'right';
    pageName: string;
    currentPage: number;
}
function LeftRoutes({side, pageName, currentPage}: RoutesProps) {
    switch (pageName) {
        case 'clemenceau':
            return side === 'left' ? <ClemenceauLeftContent /> : <ClemenceauRightContent />;
        case 'concorde':
            return side === 'left' ? <ConcordeLeftContent page={currentPage} /> : <ConcordeRightContent page={currentPage} />;
        default:
            return <div></div>;
    }
}