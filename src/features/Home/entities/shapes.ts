
type SquareData = {
  r: number;
  c: number; 
  letter?: string;
  link?: string;
};

type ShapeData = {
  id: string;
  shapeType: string; 
  shapeDirection: string; 
  squares: SquareData[];
};

type FrameData = {
  time: number;
  shapes: ShapeData[];
};

type GridDef = {
  rows: number;
  cols: number;
};

export { SquareData, FrameData, GridDef };