"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  FilterKey,
  CRITERIA_FILTERS,
  KILL_FILTERS,
  PROSPECTS,
  countSurvivors,
} from "./prospectData";
import { type ProspectVisualState, getProspectState } from "./FinlandMap";

// Stage definitions:
// 0 = card 1.1 (search) — no filters
// 1 = card 1.2 (criteria) — criteria filters active
// 2 = card 1.3 (kill questions) — kill filters active
// 3 = card 1.4 (payoff) — all committed, one survivor

interface FunnelState {
  currentStage: number;
  activeFilters: Set<FilterKey>;
  committedFilters: Set<FilterKey>;
  survivingCount: number;
  totalCount: number;
  cascadeComplete: boolean;
  toggleFilter: (key: FilterKey) => void;
  setStage: (stage: number) => void;
  commitAndAdvance: () => void;
  commitCurrentFilters: (forStage: number) => void;
  undoCommit: (toStage: number) => void;
  reset: () => void;
  setCascadeComplete: (v: boolean) => void;
  getVisualState: (prospectId: number) => ProspectVisualState;
  getAvailableFilters: () => FilterKey[];
}

const FunnelContext = createContext<FunnelState | null>(null);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
    new Set()
  );
  const [committedFilters, setCommittedFilters] = useState<Set<FilterKey>>(
    new Set()
  );
  const [cascadeComplete, setCascadeComplete] = useState(false);

  // Track which filters were committed at each stage for undo
  const [stageCommits, setStageCommits] = useState<
    Record<number, FilterKey[]>
  >({});

  const toggleFilter = useCallback((key: FilterKey) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const setStage = useCallback((stage: number) => {
    setCurrentStage(stage);
  }, []);

  const commitCurrentFilters = useCallback((forStage: number) => {
    setStageCommits((prev) => ({
      ...prev,
      [forStage]: Array.from(activeFilters),
    }));
    setCommittedFilters((prev) => {
      const next = new Set(prev);
      for (const f of activeFilters) next.add(f);
      return next;
    });
    setActiveFilters(new Set());
  }, [activeFilters]);

  const commitAndAdvance = useCallback(() => {
    commitCurrentFilters(currentStage);
    setCurrentStage((s) => s + 1);
  }, [currentStage, commitCurrentFilters]);

  const undoCommit = useCallback(
    (toStage: number) => {
      // Remove all commits from stages > toStage
      const newCommitted = new Set<FilterKey>();
      const newStageCommits = { ...stageCommits };

      for (let s = 0; s < toStage; s++) {
        if (newStageCommits[s]) {
          for (const f of newStageCommits[s]) newCommitted.add(f);
        }
      }
      // Remove future stage commits
      for (let s = toStage; s <= 3; s++) {
        delete newStageCommits[s];
      }

      setStageCommits(newStageCommits);
      setCommittedFilters(newCommitted);
      setActiveFilters(new Set());
      setCurrentStage(toStage);
    },
    [stageCommits]
  );

  const reset = useCallback(() => {
    setCurrentStage(0);
    setActiveFilters(new Set());
    setCommittedFilters(new Set());
    setStageCommits({});
    setCascadeComplete(false);
  }, []);

  const allActiveAndCommitted = useMemo(() => {
    const all = new Set(committedFilters);
    for (const f of activeFilters) all.add(f);
    return all;
  }, [activeFilters, committedFilters]);

  const survivingCount = useMemo(
    () => countSurvivors(allActiveAndCommitted),
    [allActiveAndCommitted]
  );

  const getVisualState = useCallback(
    (prospectId: number): ProspectVisualState => {
      return getProspectState(
        prospectId,
        activeFilters,
        committedFilters,
        currentStage
      );
    },
    [activeFilters, committedFilters, currentStage]
  );

  const getAvailableFilters = useCallback((): FilterKey[] => {
    if (currentStage === 1) return CRITERIA_FILTERS;
    if (currentStage === 2) return KILL_FILTERS;
    return [];
  }, [currentStage]);

  const value: FunnelState = {
    currentStage,
    activeFilters,
    committedFilters,
    survivingCount,
    totalCount: PROSPECTS.length,
    cascadeComplete,
    toggleFilter,
    setStage,
    commitAndAdvance,
    commitCurrentFilters,
    undoCommit,
    reset,
    setCascadeComplete,
    getVisualState,
    getAvailableFilters,
  };

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
}

export function useFunnel(): FunnelState {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used within FunnelProvider");
  return ctx;
}
