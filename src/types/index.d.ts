export interface Font {
  font: string,
  label: string,
  url: string,
}

export interface Icon {
  font: string;
  name: string;
  version: number | undefined;
  codepoint: string;
  unsupported_families: string[];
  categories: string[];
  tags: string[];
  sizes_px: number[];
  popularity: number;
}

export type FontType = 'filled' | 'round' | 'sharp'
