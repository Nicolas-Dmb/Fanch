import React,{useEffect} from 'react';
import Colors from '../../../entities/Background.ts';
import useDetail from '../hooks/useDetail.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import open_folder from '../static/images/open_folder.png';
import back_arrow from '../static/images/back_arrow.png';
import { useBgImg } from '../hooks/useBgImg.tsx';

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
    const navigate = useNavigate()
    useDetail();

    useEffect(() => {
        setAcceuil(Colors.Black);
        setTextColor(Colors.White);
        setLogoFanch(false); 
    }, [setAcceuil, setLogoFanch, setTextColor]);

    const INSETS = { top: 14, right: 10, bottom: 12, left: 12 };
    const left = useBgImg(INSETS);

    // pour la page droite (miroir) : swap left/right
    const rightInsets = { ...INSETS, left: INSETS.right, right: INSETS.left };
    const right = useBgImg(rightInsets);

    const text =
    "Eh, toi, là ! Je tiens à t’envoyer ce petit mot, cette petite carte, et cette grosse pensée, afin de te remercier pour ta venue lors de mon anniversaire. Tu nous as fait rire toute la journée, et tu as bien contribué à ce que cette journée soit parfaite ! Alors un grand merci, et je compte sur toi l’année prochaine !";

    return (
        <div className="w-full h-full bg-black overflow-hidden">
        <div className="h-full flex items-center justify-center">
            <div className="relative h-full w-[92vw] max-w-[1400px] py-6">
            <img
                src={back_arrow}
                alt="Back"
                className="absolute top-0 left-0 h-9 w-auto cursor-pointer z-50"
                onClick={() => navigate("/carel")}
            />

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full h-full flex items-stretch justify-center">
                {/* PAGE GAUCHE */}
                <div ref={left.containerRef} className="relative h-full w-1/2">
                    <img ref={left.imgRef} src={open_folder} alt="Open folder left" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    <div ref={left.overlayRef} className="absolute overflow-auto">
                        ton contenu
                    </div>
                </div>

                {/* PAGE DROITE */}
                <div ref={right.containerRef} className="relative h-full w-1/2">
                    <img ref={right.imgRef} alt="Open folder right" src={open_folder} className="absolute inset-0 w-full h-full object-contain pointer-events-none scale-x-[-1]" />
                    <div ref={right.overlayRef} className="absolute overflow-auto">
                        {/* si tu mirrors l'image, ton contenu reste normal (pas besoin de re-mirror ici) */}
                        ton contenu
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
