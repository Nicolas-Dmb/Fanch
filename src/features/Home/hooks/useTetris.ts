import React, { useMemo, useCallback } from "react";
import { SquareData, GridDef, FrameData} from "../entities/shapes.ts";

type useTetrisProps = {  
  grid: GridDef;  
  pixelWidth: number;       
  pixelHeight: number;
  onCellClick?: (link: string) => void;
  frame: FrameData;  
};

export default function useTetris({pixelWidth, pixelHeight, onCellClick, grid, frame}:useTetrisProps) {
  const colsVisible = grid.cols - 8;
  const rowsVisible = grid.rows - 4;

  const cellSize = useMemo(() => {
    if (pixelWidth === 0 || pixelHeight === 0) return 0;
    const cellW = pixelWidth / colsVisible;
    const cellH = pixelHeight / rowsVisible;
    return Math.floor(Math.min(cellW, cellH));
  }, [pixelWidth, pixelHeight, colsVisible, rowsVisible]);

  const boardWidth = cellSize * grid.cols;
  const boardHeight = cellSize * grid.rows;

  const boardMap: (SquareData | null)[][] = useMemo(() => {
    const map: (SquareData | null)[][] = Array.from(
      { length: grid.rows },
      () => Array.from({ length: grid.cols }, () => null)
    );

    frame.shapes.forEach(shape => {
      shape.squares.forEach(sq => {
        const { r, c } = sq;
        if (
          r >= 0 &&
          r < grid.rows &&
          c >= 0 &&
          c < grid.cols
        ) {
          map[r][c] = sq;
        }
      });
    });

    return map;
  }, [grid, frame]);

  const handleClickCell = useCallback(
    (sq: SquareData | null, r: number, c: number) => {
      if (!sq) return;

      const inLeftPadding = c < 4;
      const inRightPadding = c >= grid.cols - 4;
      const inSpawnTop = r < 4;

      if (inLeftPadding || inRightPadding || inSpawnTop) {
        return;
      }

      if (!sq.link || !onCellClick) return;
      onCellClick(sq.link);
    },
    [onCellClick, grid.cols]
  );

  const boardStyle: React.CSSProperties = {
    width: boardWidth,
    height: boardHeight,
    display: "grid",
    gridTemplateColumns: `repeat(${grid.cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${grid.rows}, ${cellSize}px)`,
    backgroundColor: "black",
    position: "relative",
  };

  return { boardMap, cellSize, boardStyle, handleClickCell };
}