export default interface Icon {
  font: string;
  name: string;
  codepoint: string;
  category: string | undefined;
  tags: string[];
  popularity: number;
}
