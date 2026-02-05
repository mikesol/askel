import { CardData } from "./types";

export const CARDS: CardData[] = [
  // Segment 0: 4 cards
  { id: 0, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false },
  { id: 1, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false },
  { id: 2, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: true },
  { id: 3, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false },
  // Segment 1: 3 cards
  { id: 4, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false },
  { id: 5, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: true },
  { id: 6, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false },
  // Segment 2: 3 cards
  { id: 7, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: false },
  { id: 8, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: false },
  { id: 9, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: true },
];

export const SEGMENTS = [
  { label: "Act 1", count: 4 },
  { label: "Act 2", count: 3 },
  { label: "Act 3", count: 3 },
];
