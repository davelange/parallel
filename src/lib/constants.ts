export const BLOCK_QTY = 15;
export const SPEED = 0.3;
export const EDGE_X = 15;
export const EDGE_Y = 9;
export const EDGE_Z = 20;
export const SNAP_DURATION = 70;

export enum COLOR {
  white = "#f8f1ed",
  gray = "#171717",
  green = "#00524e",
  violet = "#c4b2f6",
  pistachio = "#dedb7b",
  pink = "#fcd5db",
  orange = "#ed7a5f",
}

export const PALLETES = [
  {
    background: COLOR.gray,
    text: COLOR.orange,
    textSecondary: COLOR.white,
    edges: COLOR.pistachio,
    emissive: COLOR.orange,
    light: COLOR.white,
  },
  {
    background: COLOR.pistachio,
    text: COLOR.green,
    textSecondary: COLOR.green,
    edges: COLOR.green,
    emissive: COLOR.white,
    light: COLOR.pink,
  },
  {
    background: COLOR.green,
    text: COLOR.violet,
    textSecondary: COLOR.violet,
    edges: COLOR.green,
    emissive: COLOR.pistachio,
    light: COLOR.violet,
  },
];
