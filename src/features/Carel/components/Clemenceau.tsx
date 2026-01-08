import design_clemenceau from '../static/images/design_clemenceau.png';
import white_clemenceau from '../static/images/white_clemenceau.png';
import black_clemenceau from '../static/images/black_clemenceau.png';
import brown_clemenceau from '../static/images/brown_clemenceau.png';


export function ClemenceauLeftContent() {
    return (
        <div>
            <p className="text-black text-xl font-semibold tracking-tighter">L'inspiration:</p>
            <div className="h-px bg-black w-full" />
            <img src={design_clemenceau} alt="Design Clemenceau" className="w-1/2 h-auto translate-x-1/2 py-[10%]"/>
            <p className="text-black text-xs pt-1 px-1 pb-[2%]">
                <b className="font-bold tracking-tighter">Le Clémenceau a été la suite logique du Concorde.</b> Après ce premier projet, j’ai
                ressenti le besoin d’aller plus loin dans la réflexion autour du cabas, en imaginant un
                modèle capable de représenter la femme d’aujourd’hui... Active, mobile, et en
                constante adaptation au fil de la journée.
            </p>
            <p className="text-black text-xs pt-1 px-1 tracking-tighter">
                Le Clémenceau est le premier cabas que j’ai développé pour Carel, ce sac s’inscrit
                comme pour le concorde, dans une démarche créative où les formes graphiques
                rencontrent des lignes architecturales.
            </p>
        </div>
    );
}

export function ClemenceauRightContent() {
    return (
        <div>
            <p className="text-black text-xl font-semibold tracking-tighter">Versions de modèles:</p>
            <div className="h-px bg-black w-full" />
            <div className="flex flex-row gap-2 py-[10%]">
                <ColumnBags imageSrc={brown_clemenceau} description={`Chèvre velours -\nChocolat\nBijou «C» Platine`} price="450€"/>
                <ColumnBags imageSrc={black_clemenceau} description={"Cuir - Noir\nBijou «C» Argent"} price="435€"/>
                <ColumnBags imageSrc={white_clemenceau} description={"Cuir Grainé - Ivoire\nBijou «C» Platine"} price="435€"/>
            </div>
            <div className="flex flex-row justify-space-between px-2 gap-10">
                <div className="w-1/2">
                    <p className="text-black text-xl font-semibold tracking-tighter">Valeurs ajoutées:</p>
                    <div className="h-px bg-black w-full" />
                    <p className="text-black text-[10px] py-2 tracking-tighter">
                        Spacieux et souple, il peut se porter plié ou déplié
                        grâce à un système interne de pattes avec
                        boutons-pression.
                    </p>
                </div>
                <div className="w-1/2">
                    <p className="text-black text-xl font-semibold tracking-tighter">Fiche produit:</p>
                    <div className="h-px bg-black w-full" />
                    <p className="text-black text-[8px] whitespace-pre-line underline font-semibold py-2 tracking-tighter">
                        Taille pensée pour les ordinateurs portables
                    </p>
                    <p className="text-black text-[8px] whitespace-pre-line tracking-tighter">
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

interface ColumnBagsProps {
    imageSrc: string;
    description: string;
    price: string;
}
export function ColumnBags({imageSrc, description, price}: ColumnBagsProps){
    return (
        <div className="w-1/2 flex flex-col items-center">
            <img src={imageSrc} alt={imageSrc} className="w-full h-auto pb-2"/>
            <div className="flex flex-row items-top justify-between w-full px-2">
                <b className="text-black text-[8px] whitespace-pre-line tracking-tighter">
                    {description}
                </b>
                <p className="text-black text-[8px] tracking-tighter">{price}</p>
            </div>
        </div>
    );
}