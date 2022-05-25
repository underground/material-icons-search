export interface Font {
  font: string,
  label: string,
  url: string,
}

export interface Icon {
  font: string;
  name: string;
  codepoint: string;
  category: string | undefined;
  tags: string[];
  popularity: number;
}

export const FONTS = ["filled", "outlined", "rounded", "twoTone", "sharp"]
export interface FontType = typeof FONTS[number]
