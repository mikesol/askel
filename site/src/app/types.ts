export type CardSkin = "dark" | "stark" | "depth" | "glass";
export type SpringPreset = "snappy" | "smooth" | "heavy";

export interface CardData {
  id: number;
  segment: number;
  segmentLabel: string;
  hasVerticalReveal: boolean;
}

export interface DeckConfig {
  skin: CardSkin;
  spring: SpringPreset;
  showProgress: boolean;
}
