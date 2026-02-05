import { CITIES } from "./cityCoords";

// Seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type FilterKey =
  // Criteria filters (stage 1 — card 1.2)
  | "revenue500k"
  | "margins20"
  | "serviceIndustry"
  | "ownerOperated"
  | "scalable"
  | "domesticMarket"
  | "stableRevenue"
  // Kill question filters (stage 2 — card 1.3)
  | "exitPath"
  | "capitalGain"
  | "techUpside"
  | "timeCommitment";

export const CRITERIA_FILTERS: FilterKey[] = [
  "revenue500k",
  "margins20",
  "serviceIndustry",
  "ownerOperated",
  "scalable",
  "domesticMarket",
  "stableRevenue",
];

export const KILL_FILTERS: FilterKey[] = [
  "exitPath",
  "capitalGain",
  "techUpside",
  "timeCommitment",
];

export const FILTER_LABELS: Record<FilterKey, string> = {
  revenue500k: "€500k+ rev",
  margins20: "20%+ margins",
  serviceIndustry: "Service industry",
  ownerOperated: "Owner-operated",
  scalable: "Scalable",
  domesticMarket: "Domestic market",
  stableRevenue: "Stable revenue",
  exitPath: "Exit path",
  capitalGain: "€100k+ gain",
  techUpside: "Tech upside",
  timeCommitment: "5h/week max",
};

export interface Prospect {
  id: number;
  city: string;
  lat: number;
  lon: number;
  filters: Record<FilterKey, boolean>;
  isMelers: boolean;
}

// Generate 94 prospects with deterministic seeded randomness
// Funnel shape: 94 → ~15 (pass all criteria) → ~4 (pass all kill) → 1 (Melers)
function generateProspects(): Prospect[] {
  const rand = mulberry32(42);
  const prospects: Prospect[] = [];

  // Weight cities toward southern Finland (first 15 cities get more prospects)
  const cityWeights = CITIES.map((_, i) => (i < 15 ? 4 : i < 22 ? 2 : 1));
  const totalWeight = cityWeights.reduce((a, b) => a + b, 0);

  function pickCity() {
    let r = rand() * totalWeight;
    for (let i = 0; i < CITIES.length; i++) {
      r -= cityWeights[i];
      if (r <= 0) return CITIES[i];
    }
    return CITIES[0];
  }

  // Add slight random jitter to coordinates so dots don't stack exactly
  function jitter(value: number, amount: number) {
    return value + (rand() - 0.5) * amount;
  }

  // Pre-decide which prospects pass criteria vs kill questions
  // We want ~15 to pass all criteria and ~4 to pass all kill questions
  // Melers (id 0) passes everything

  for (let i = 0; i < 94; i++) {
    const city = i === 0 ? CITIES[3] : pickCity(); // Melers is in Turku (index 3)
    const isMelers = i === 0;

    // Base pass rates for criteria filters — tuned so ~15% pass all 7
    // Each filter has ~75% pass rate → 0.75^7 ≈ 13.3%
    const criteriaPassRate = 0.75;
    // Kill question pass rates — tuned so ~25% of criteria survivors pass all 4
    // Each filter has ~72% pass rate → 0.72^4 ≈ 26.9%
    const killPassRate = 0.72;

    const filters: Record<FilterKey, boolean> = {} as Record<FilterKey, boolean>;

    if (isMelers) {
      // Melers passes everything
      for (const key of [...CRITERIA_FILTERS, ...KILL_FILTERS]) {
        filters[key] = true;
      }
    } else {
      for (const key of CRITERIA_FILTERS) {
        filters[key] = rand() < criteriaPassRate;
      }
      for (const key of KILL_FILTERS) {
        filters[key] = rand() < killPassRate;
      }
    }

    prospects.push({
      id: i,
      city: city.name,
      lat: isMelers ? city.lat : jitter(city.lat, 0.3),
      lon: isMelers ? city.lon : jitter(city.lon, 0.6),
      filters,
      isMelers,
    });
  }

  return prospects;
}

export const PROSPECTS = generateProspects();

// Pre-computed counts for verification
export const TOTAL_PROSPECTS = PROSPECTS.length; // 94

export function countSurvivors(activeFilters: Set<FilterKey>): number {
  if (activeFilters.size === 0) return TOTAL_PROSPECTS;
  return PROSPECTS.filter((p) =>
    Array.from(activeFilters).every((f) => p.filters[f])
  ).length;
}

export function getProspectPassesFilters(
  prospect: Prospect,
  filters: Set<FilterKey>
): boolean {
  return Array.from(filters).every((f) => prospect.filters[f]);
}
