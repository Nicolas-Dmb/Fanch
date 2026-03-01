
const Colors = {
  Yellow: '#f6e820',
  Black: '#000000',
  White: '#ffffff',
} as const;

export default Colors;

type ColorType = typeof Colors[keyof typeof Colors];
export { ColorType };