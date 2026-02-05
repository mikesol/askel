"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FilterKey } from "./prospectData";

interface KillDetailModalProps {
  open: boolean;
  onClose: () => void;
  activeFilters: Set<FilterKey>;
}

interface KillDetail {
  title: string;
  question: string;
  why: string;
  melers: string;
}

const KILL_DETAILS: Partial<Record<FilterKey, KillDetail>> = {
  exitPath: {
    title: "Exit Path",
    question: "How could we exit in 3\u20135 years?",
    why: "Every acquisition needs a clear way out. We look for businesses where at least one realistic exit route exists\u2014sale to an industry competitor, a strategic buyer attracted by tech-enhanced operations, or the next search fund entrepreneur. If we can\u2019t articulate how we\u2019d sell, we don\u2019t buy.",
    melers: "Validated during DD: a competitor made an identical offer to the seller, proving real buyer demand. Multiple exit paths confirmed\u2014industry consolidator, PE roll-up, or next searcher.",
  },
  capitalGain: {
    title: "\u20ac100k+ Gain",
    question: "Capital gain on exit min. \u20ac100,000 per owner?",
    why: "With three partners and outside investors, the numbers have to work for everyone. We model a full DCF for every prospect. If the projected per-owner return doesn\u2019t clear \u20ac100k, the risk-reward ratio isn\u2019t there.",
    melers: "The financial model projected a 39% IRR and 5.03\u00d7 equity multiple. Per-owner gain: ~\u20ac483,600\u2014nearly 5\u00d7 the minimum threshold. Driven by stripping \u20ac40k+ in personal expenses to reveal true profitability.",
  },
  techUpside: {
    title: "Tech Upside",
    question: "Can we implement tech solutions that make operations faster?",
    why: "We specifically target businesses run on intuition and paper. If the owner can\u2019t write an email, that\u2019s not a weakness\u2014it\u2019s an opportunity. Basic digitalization (CRM, financial tracking, process automation) creates value that wasn\u2019t priced into the deal.",
    melers: "The previous owner had no spreadsheets, no email, no financial tracking\u2014just a bank account and 30 years of intuition. Post-acquisition: Trello automation, digital invoicing, video training library, and structured onboarding systems.",
  },
  timeCommitment: {
    title: "5h/week Max",
    question: "Can we run this business with max 5 hours a week?",
    why: "We\u2019re building a portfolio, not buying ourselves a job. Every acquisition must be operable through a hired manager with minimal owner oversight. If the business can\u2019t run without us in the building, it\u2019s not scalable across a portfolio.",
    melers: "Hired a dedicated operator (palvelup\u00e4\u00e4llikk\u00f6) to handle daily operations, customer feedback, and team coordination. Standardized contracts for all roles. \u20ac100k/year management fee funds the professional management layer at the holding level.",
  },
};

export function KillDetailModal({
  open,
  onClose,
  activeFilters,
}: KillDetailModalProps) {
  const activeKills = Array.from(activeFilters).filter(
    (f) => f in KILL_DETAILS
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-[85] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 p-6"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white/80 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-6">
              Kill Questions
            </h2>

            <div className="space-y-6">
              {activeKills.map((key) => {
                const detail = KILL_DETAILS[key];
                if (!detail) return null;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[16px] text-white font-medium">
                      {detail.question}
                    </h3>
                    <p className="text-[13px] text-white/60 leading-relaxed">
                      {detail.why}
                    </p>
                    <div className="pl-3 border-l border-white/10">
                      <p className="text-[12px] text-white/40 uppercase tracking-wider mb-1">
                        Melers
                      </p>
                      <p className="text-[13px] text-white/50 leading-relaxed">
                        {detail.melers}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
