// features/Carel/components/StorageSVG.tsx
"use client";

import { forwardRef } from "react";

interface StorageSVGProps {
  frameRef: (el: SVGGElement | null) => void;
  drawerRef: (el: SVGGElement | null) => void;
}

const StorageSVG = forwardRef<SVGSVGElement, StorageSVGProps>(
  ({ frameRef, drawerRef }, svgRef) => {
    return (
      <svg
        ref={svgRef}
        // garde exactement le viewBox de TON svg
        viewBox="0 0 1440 900"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1}
        className="w-[60vw] h-auto"
      >
        {/* Groupe du TIROIR BAS = ce qui glisse vers le bas au scroll */}
        <g ref={drawerRef}>
          {/* <<< mets ici tous les éléments qui forment :
                - la barre horizontale juste au-dessus du tiroir
                - le trapèze du tiroir
                - le bas du tiroir
              En gros, la partie que tu vois déjà dès le début (fermée) >>> */}

          {/* exemple : */}
          {/* <path d="M ... Z" /> */}
          {/* <line x1="..." y1="..." x2="..." y2="..." /> */}
        </g>

        {/* Groupe du CADRE HAUT (les 2 montants verticaux + le bord du haut)
            = ce qui DOIT être invisible au début puis apparaître */}
        <g ref={frameRef}>
          {/* <<< mets ici UNIQUEMENT :
                - les deux lignes verticales qui montent très haut
                - la longue ligne horizontale du haut
              Celles qu’on ne doit PAS voir tiroir fermé >>> */}

          {/* exemple : */}
          {/* <line x1="..." y1="..." x2="..." y2="..." /> */}
          {/* <line x1="..." y1="..." x2="..." y2="..." /> */}
          {/* <line x1="..." y1="..." x2="..." y2="..." /> */}
        </g>
      </svg>
    );
  }
);

StorageSVG.displayName = "StorageSVG";

export default StorageSVG;
