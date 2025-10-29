
const Colors = {
  Yellow: '#f6e820',
  Black: '#000000',
  White: '#ffffff',
  Grey: '#1D1D1B',
} as const;

export default Colors;

type ColorType = typeof Colors[keyof typeof Colors];
export { ColorType };