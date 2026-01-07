import React, { useEffect } from 'react';
import Colors from '../../../entities/Background.ts';
import useDetail from '../hooks/useDetail.tsx';
import { useParams } from 'react-router-dom';
import useNavigation from '../hooks/useNavigation.tsx';

import open_folder from '../static/images/open_folder.png';
import back_arrow from '../static/images/back_arrow.png';
import design_clemenceau from '../static/images/design_clemenceau.png';
import white_clemenceau from '../static/images/white_clemenceau.png';
import black_clemenceau from '../static/images/black_clemenceau.png';
import brown_clemenceau from '../static/images/brown_clemenceau.png';

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

    const { left, right } = useDetail();
    const { currentPage, goNext, goPrev, haveNext } = useNavigation( {page: name || ""} );

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
                <div className="w-full h-full flex items-stretch justify-center scene">
                    {/* Left Content */}
                    <div ref={left.containerRef} className="relative h-full w-1/2">
                        <img
                            ref={left.imgRef}
                            src={open_folder}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none"
                        />
                        <div ref={left.overlayRef} className="absolute overflow-auto page">
                            {name === 'clemenceau' && (
                                <ClemenceauLeftContent/>
                            )}
                            {name === 'concorde' && (
                                <ClemenceauLeftContent/>
                            )}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div ref={right.containerRef} className="relative h-full w-1/2 page">
                        <img
                            ref={right.imgRef}
                            src={open_folder}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain object-right pointer-events-none scale-x-[-1]"
                        />
                        <div ref={right.overlayRef} className="absolute overflow-auto">
                            {name === 'clemenceau' && (
                                <ClemenceauRightContent/>
                            )}
                            {name === 'concorde' && (
                                <ClemenceauRightContent/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

function ClemenceauLeftContent() {
    return (
        <div>
            <p className="text-black text-xl font-semibold">L'inspiration:</p>
            <div className="h-px bg-black w-full" />
            <img src={design_clemenceau} alt="Design Clemenceau" className="w-1/2 h-auto translate-x-1/2 py-[10%]"/>
            <p className="text-black text-xs pt-1 px-1 pb-[2%]">
                <b className="font-bold">Le Clémenceau a été la suite logique du Concorde.</b> Après ce premier projet, j’ai
                ressenti le besoin d’aller plus loin dans la réflexion autour du cabas, en imaginant un
                modèle capable de représenter la femme d’aujourd’hui... Active, mobile, et en
                constante adaptation au fil de la journée.
            </p>
            <p className="text-black text-xs pt-1 px-1">
                Le Clémenceau est le premier cabas que j’ai développé pour Carel, ce sac s’inscrit
                comme pour le concorde, dans une démarche créative où les formes graphiques
                rencontrent des lignes architecturales.
            </p>
        </div>
    );
}

function ClemenceauRightContent() {
    return (
        <div>
            <p className="text-black text-xl font-semibold">Versions de modèles:</p>
            <div className="h-px bg-black w-full" />
            <div className="flex flex-row gap-2 py-[10%]">
                <ClemenceauColumnBags imageSrc={brown_clemenceau} description={`Chèvre velours -\nChocolat\nBijou «C» Platine`} price="450€"/>
                <ClemenceauColumnBags imageSrc={black_clemenceau} description={"Cuir - Noir\nBijou «C» Argent"} price="435€"/>
                <ClemenceauColumnBags imageSrc={white_clemenceau} description={"Cuir Grainé - Ivoire\nBijou «C» Platine"} price="435€"/>
            </div>
            <div className="flex flex-row justify-space-between px-2 gap-10">
                <div className="w-1/2">
                    <p className="text-black text-xl font-semibold">Valeurs ajoutées:</p>
                    <div className="h-px bg-black w-full" />
                    <p className="text-black text-[10px] py-2">
                        Spacieux et souple, il peut se porter plié ou déplié
                        grâce à un système interne de pattes avec
                        boutons-pression.`
                    </p>
                </div>
                <div className="w-1/2">
                    <p className="text-black text-xl font-semibold">Fiche produit:</p>
                    <div className="h-px bg-black w-full" />
                    <p className="text-black text-[8px] whitespace-pre-line underline font-semibold py-2">
                        Taille pensée pour les ordinateurs portables
                    </p>
                    <p className="text-black text-[8px] whitespace-pre-line">
                        {`Détails :
                        - H 32 x L 36(base) - 52(dessus) x P 14 cm
                        - Bijou C métal argent ou platine
                        - Fermeture à rabat aimantée
                        - Poche intérieure fermeture à glissière
                        - Poche intérieure plate\n
                        FABRICATION ARTISANALE, DANS LE SUD DE L’ITALIE`}
                    </p>
                </div>
            </div>  
        </div>
    );
}

interface ClemenceauColumnBagsProps {
    imageSrc: string;
    description: string;
    price: string;
}
function ClemenceauColumnBags({imageSrc, description, price}: ClemenceauColumnBagsProps){
    return (
        <div className="w-1/2 flex flex-col items-center">
            <img src={imageSrc} alt={imageSrc} className="w-full h-auto pb-2"/>
            <div className="flex flex-row items-top justify-between w-full px-2">
                <b className="text-black text-[8px] whitespace-pre-line">
                    {description}
                </b>
                <p className="text-black text-[8px]">{price}</p>
            </div>
        </div>
    );
}