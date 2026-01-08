import design_clemenceau from '../static/images/design_clemenceau.png';
import concorde_model1 from '../static/images/concorde/concorde_model1.png';
import concorde_model2 from '../static/images/concorde/concorde_model2.png';
import concorde_black from '../static/images/concorde/concorde_black.png';
import concorde_camel from '../static/images/concorde/concorde_camel.png';
import concorde_brown from '../static/images/concorde/concorde_brown.png';
import concorde_red from '../static/images/concorde/concorde_red.png';
import concorde_outline from '../static/images/concorde/concorde_outline.png';
import concorde_ads1 from '../static/images/concorde/concorde_ads1.png';
import concorde_ads2 from '../static/images/concorde/concorde_ads2.png';
import {ColumnBags} from './Clemenceau.tsx';

interface ConcordeLeftContentProps{
    page: number;
}
export function ConcordeLeftContent({page}: ConcordeLeftContentProps) {
    if(page === 0){
        return <ConcordeLeftContent1 />;
    } else {
        return <ConcordeLeftContent2 />;
    }
}

interface ConcordeRightContentProps{
    page: number;
}
export function ConcordeRightContent({page}: ConcordeRightContentProps) {
    if(page === 0){
        return <ConcordeRightContent1 />;
    } else {
        return <ConcordeRightContent2 />;
    }
}

function ConcordeLeftContent1() {
  return (
    <div>
      <p className="text-black text-xl font-semibold tracking-tighter">L’inspiration:</p>
      <div className="h-px bg-black w-full" />

      <img
        src={concorde_model1}
        alt="concorde model1"
        className="w-1/2 h-auto translate-x-1/2 pb-[5%] pt-[10%]"
      />
      <img
        src={concorde_model2}
        alt="concorde model2"
        className="w-1/2 h-auto translate-x-1/2 pb-[10%]"
      />

      <p className="text-black text-xs px-1 tracking-tighter pb-[5%]">
        Le Concorde est né d’une recherche très instinctive autour de formes géométriques
        pures. À cette période, j’étais obsédé par le design automobile des années 60 : ces
        carrosseries graphiques qui découpaient les volumes avec une précision presque
        sculpturale. J’ai eu envie de retranscrire cette sensation ce jeu de lignes nettes, ce
        mouvement figé dans un sac.
      </p>

      <p className="text-black text-xs px-1 font-semibold tracking-tighter">
        Ce sac est devenu l’expression de cette obsession, une forme simple en
        apparence, mais pensée comme un véritable objet de design, où chaque courbe
        et chaque angle raconte cette fascination pour l’esthétique automobile de
        l’époque.
      </p>
    </div>
  );
}

function ConcordeRightContent1() {
  return (
    <div>
      <p className="text-black text-xl font-semibold tracking-tighter">Versions de modèles:</p>
      <div className="h-px bg-black w-full" />

      <div className="flex flex-row gap-2 py-[20%]">
        <ColumnBags imageSrc={concorde_black} description={"Nappa -\nNoir\nBijou «C» Argent"} price="395€" />
        <ColumnBags imageSrc={concorde_brown} description={"Chèvre velours -\nChocolat\nBijou «C» Platine"} price="395€" />
        <ColumnBags imageSrc={concorde_red} description={"Nappa -\nIvoire & rouge\nBijou «C» Argent"} price="395€" />
        <ColumnBags imageSrc={concorde_camel} description={"Nappa - Ivoire,\n Noir & Camel\nDécoupe «C» Cuir"} price="395€" />
      </div>
      <div className="flex flex-row justify-space-between px-2 gap-10">
          <div className="w-1/2">
              <p className="text-black text-xm font-bold tracking-tighter">Valeurs ajoutées:</p>
              <div className="h-px bg-black w-full" />
              <p className="text-black text-[10px] py-2 tracking-tighter">
                  Son volume graphique évoque la vitesse et la
                  précision, tandis que sa bandoulière réglable assure
                  confort et liberté de mouvement.
              </p>
          </div>
          <div className="w-1/2">
              <p className="text-black text-xm font-bold tracking-tighter">Fiche produit:</p>
              <div className="h-px bg-black w-full" />
              <p className="text-black text-[8px] whitespace-pre-line underline font-semibold py-2 tracking-tighter">
                  Porté épaule.
              </p>
              <p className="text-black text-[8px] whitespace-pre-line tracking-tighter">
                  {`Détails :
                    - H 15 x L 34(base) - 22(dessus) x P 5 cm
                    - Empiècement en cuir rouge
                    - Fermeture à rabat intérieure aimantée
                    - Poche intérieure fermeture à glissière\n
                  FABRICATION ARTISANALE, DANS LE SUD DE L’ITALIE`}
              </p>
            </div>
        </div>  
    </div>
  );
}


function ConcordeLeftContent2() {
  return (
    <div>
      <p className="text-black text-xl font-semibold tracking-tighter">Caractèristique technique:</p>
      <div className="h-px bg-black w-full" />
      <img 
        src={concorde_outline} 
        alt="concorde outline" 
        className="w-full h-auto py-[10%]" 
      />
      <p className="text-black text-xs px-1 tracking-tighter">
        La découpe en <b>arc de cercle</b> ouvre au Concorde un large éventail de <b>combinaisons</b>
         de <b>matières</b> et de <b>couleurs</b>.
      </p>
    </div>
  );
}
function ConcordeRightContent2() {
  return (
    <div className="flex justify-between h-full">
      <div className="flex flex-col items-start justify-between h-full gap-4">
        <img
          src={concorde_ads1}
          alt="concorde ad 1"
          className="w-[70%] h-auto px-[5%]"
        />
        <img
          src={concorde_ads2}
          alt="concorde ad 2"
          className=" h-auto"
        />
      </div>
      <div className="flex items-center h-full">
        <img
          src={concorde_ads2}
          alt="concorde ad 2"
          className="h-auto pl-[15%]"
        />
      </div>
    </div>
  );
}
