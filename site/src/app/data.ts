import { CardData } from "./types";

export const CARDS: CardData[] = [
  // Segment 0: Act 1 — The Funnel
  { id: 0, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false, cardType: "act1-search" },
  { id: 1, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false, cardType: "act1-criteria" },
  { id: 2, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false, cardType: "act1-kill" },
  { id: 3, segment: 0, segmentLabel: "Act 1", hasVerticalReveal: false, cardType: "act1-payoff" },
  // Segment 1: Act 2 — The Factory Floor
  { id: 4, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false, cardType: "act2-public" },
  { id: 5, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false, cardType: "act2-seller" },
  { id: 6, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false, cardType: "act2-evaluation" },
  { id: 7, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false, cardType: "act2-audit" },
  { id: 8, segment: 1, segmentLabel: "Act 2", hasVerticalReveal: false, cardType: "act2-price" },
  // Segment 2: Act 3
  { id: 9, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: false },
  { id: 10, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: false },
  { id: 11, segment: 2, segmentLabel: "Act 3", hasVerticalReveal: true },
];

export const SEGMENTS = [
  { label: "Act 1", count: 4 },
  { label: "Act 2", count: 5 },
  { label: "Act 3", count: 3 },
];
