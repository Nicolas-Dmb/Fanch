import design_clemenceau from '../static/images/design_clemenceau.png';


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
    <div className="space-y-3">
      <p className="text-black text-xl font-semibold">L’inspiration</p>
      <div className="h-px bg-black w-full" />

      <img
        src={design_clemenceau}
        alt="Design Clemenceau"
        className="w-1/2 h-auto translate-x-1/2 py-[10%]"
      />

      <p className="text-black text-xs px-1">
        <b className="font-bold">
          Le Concorde est né d’un besoin de simplicité radicale.
        </b>{" "}
        À l’origine, il s’agissait de créer un sac capable d’accompagner une
        journée entière sans jamais contraindre le mouvement. Une forme pure,
        presque évidente, pensée comme une extension du corps.
      </p>

      <p className="text-black text-xs px-1">
        Inspiré par l’architecture moderniste et les lignes fonctionnelles des
        années 60, le Concorde assume une géométrie franche, équilibrée par la
        souplesse du cuir. Chaque détail a été réduit à l’essentiel.
      </p>

      <p className="text-black text-xs px-1">
        Ce projet marque le point de départ d’une réflexion plus large autour du
        cabas contemporain : un objet utilitaire, mais porteur d’élégance et de
        caractère.
      </p>
    </div>
  );
}

function ConcordeRightContent1() {
  return (
    <div className="space-y-4">
      <p className="text-black text-xl font-semibold">Versions & usages</p>
      <div className="h-px bg-black w-full" />

      <div className="flex flex-row px-2 gap-10">
        <div className="w-1/2 space-y-2">
          <p className="text-black text-sm font-semibold">Valeurs ajoutées</p>
          <div className="h-px bg-black w-full" />

          <p className="text-black text-[10px]">
            Pensé pour s’adapter à différents moments de la journée, le Concorde
            peut se porter plié ou déplié grâce à un système discret de pattes
            internes avec boutons-pression.
          </p>

          <p className="text-black text-[10px]">
            Son volume généreux permet d’accueillir aussi bien des documents A4
            qu’un ordinateur portable, sans compromettre la ligne du sac.
          </p>
        </div>

        <div className="w-1/2 space-y-2">
          <p className="text-black text-sm font-semibold">Fiche produit</p>
          <div className="h-px bg-black w-full" />

          <p className="text-black text-[8px] underline font-semibold">
            Cabas Concorde
          </p>

          <p className="text-black text-[8px] whitespace-pre-line">
{`Détails :
– Hauteur : 32 cm
– Largeur : 36 cm (base) / 52 cm (haut)
– Profondeur : 14 cm
– Bijou « C » en métal argenté ou platine
– Fermeture à rabat aimantée
– Poche intérieure zippée
– Poche plate intérieure

Fabrication artisanale
Sud de l’Italie`}
          </p>
        </div>
      </div>
    </div>
  );
}


function ConcordeLeftContent2() {
  return (
    <div className="space-y-3">
      <p className="text-black text-xl font-semibold">Processus de création</p>
      <div className="h-px bg-black w-full" />

      <p className="text-black text-xs px-1">
        Le développement du Concorde s’est articulé autour de nombreux prototypes,
        chacun explorant une variation de proportions, de portés et de volumes.
      </p>

      <p className="text-black text-xs px-1">
        Le choix des cuirs a fait l’objet d’une attention particulière : souplesse,
        résistance et patine dans le temps ont été des critères déterminants.
      </p>

      <p className="text-black text-xs px-1">
        Chaque couture, chaque tranche est pensée pour durer, dans une logique de
        sobriété et de fonctionnalité.
      </p>
    </div>
  );
}
function ConcordeRightContent2() {
  return (
    <div className="space-y-4">
      <p className="text-black text-xl font-semibold">Détails techniques</p>
      <div className="h-px bg-black w-full" />

      <p className="text-black text-[10px] px-2">
        Le Concorde repose sur une structure souple renforcée par des zones
        stratégiques, garantissant un maintien optimal sans rigidifier la forme.
      </p>

      <p className="text-black text-[10px] px-2">
        Les anses ont été dessinées pour offrir un confort maximal, que le sac
        soit porté à l’épaule ou à la main.
      </p>

      <p className="text-black text-[10px] px-2">
        Chaque pièce est assemblée à la main, selon un savoir-faire traditionnel,
        garantissant une finition irréprochable.
      </p>
    </div>
  );
}
