import { GridDef, FrameData } from "../entities/shapes.ts";
import useTetris from "../hooks/useTetris.ts";

type TetrisBoardProps = {
  grid: GridDef;      
  frame: FrameData;  
  pixelWidth: number;       
  pixelHeight: number;
  onCellClick?: (link: string) => void;
};

export default function TetrisBoard({
  grid,
  frame,
  pixelWidth,
  pixelHeight,
  onCellClick,
}: TetrisBoardProps) {

  const { boardMap, cellSize, boardStyle, handleClickCell } = useTetris({
    grid,
    frame,
    pixelWidth,
    pixelHeight,
    onCellClick,
  });

  
  return (
    <div className="w-full h-full flex items-end justify-center overflow-hidden relative">
    <div style={boardStyle}>
      {boardMap.map((row, rIdx) =>
        row.map((sq, cIdx) => {
          const hasLetter = !!sq?.letter && sq.letter !== "";

          const inLeftPadding = cIdx < 4;
          const inRightPadding = cIdx >= grid.cols - 4;
          const inSpawnTop = rIdx < 4;
          const isClickable = !!sq?.link && !inLeftPadding && !inRightPadding && !inSpawnTop;

          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className="flex items-center justify-center text-black font-bold select-none border border-black"
              style={{
                fontSize: cellSize * 0.6,
                lineHeight: 1,
                cursor: isClickable ? "pointer" : "default",
                backgroundColor: sq ? "white" : "transparent",
              }}
              onClick={() => handleClickCell(sq || null, rIdx, cIdx)}
            >
              {hasLetter ? sq!.letter : ""}
            </div>
          );
        })
      )}
    </div>
  </div>
  );
}
