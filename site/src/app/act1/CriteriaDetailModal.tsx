"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FilterKey } from "./prospectData";

interface CriteriaDetailModalProps {
  open: boolean;
  onClose: () => void;
  activeFilters: Set<FilterKey>;
}

interface CriteriaDetail {
  title: string;
  items: string[];
  why: string;
  melers: string;
}

const CRITERIA_DETAILS: Partial<Record<FilterKey, CriteriaDetail>> = {
  ddValidation: {
    title: "Initial Validation",
    items: [
      "Company min. 5 years old",
      "Profit \u2265\u20ac100,000/year",
      "Min. 3 employees",
    ],
    why: "The initial gate. Before spending any time on due diligence, a prospect must clear three hard thresholds. Five years proves the business model works. \u20ac100k profit ensures there\u2019s enough margin to service debt and pay management. Three employees means it\u2019s a real operation, not a freelancer with a company name.",
    melers: "Melers had been operating for over 30 years with stable profitability. Adjusted profit of \u20ac130,000/year (after stripping out personal expenses the owner ran through the business). Four employees plus the two owners.",
  },
  ddFinancial: {
    title: "Financial DD",
    items: [
      "Cost structure clear, top 3 expenses known",
      "3 years of financial statements reviewed",
      "Detailed P&L and balance sheet analyzed",
      "Monthly cashflow mapped",
      "Seasonal variation understood",
    ],
    why: "We request three years of financials and go through every line. The goal is to understand the real cost structure\u2014not what the accountant shows, but what the business actually needs to run. Many owner-operated businesses hide personal expenses in the P&L. Finding them is where the value creation starts.",
    melers: "The financial audit was literal: \u201Cwe went through every single row on their bank account.\u201D No spreadsheets existed\u2014just a bank account and a good accountant. Stripped \u20ac40,000+ in annual personal expenses to reveal true EBITDA of \u20ac141,880.",
  },
  ddMarket: {
    title: "Market DD",
    items: [
      "Top 3 local competitors identified",
      "AI/tech usage in industry mapped",
      "Customer register size known",
      "Customer register transfers with sale",
      "Target customer profile and market size understood",
      "International competitor benchmarks found",
    ],
    why: "We need to know who the customers are, whether they\u2019ll stay, and what the competitive landscape looks like. The customer register transferring with the sale is critical\u2014without it, you\u2019re buying equipment, not a business. We also look at how the industry uses technology internationally, because that\u2019s where our edge comes from.",
    melers: "49 B2B customers with the top 10 accounting for 70% of B2B revenue. Customer contracts confirmed transferable. A competitor made an identical offer during negotiations\u2014validating market demand for the business.",
  },
  ddTeam: {
    title: "Team DD",
    items: [
      "On-site visit completed",
      "Staff interviewed individually",
      "Owner interviewed with structured template",
      "Recruitment needs and role KPIs defined",
    ],
    why: "You can\u2019t understand a service business from a spreadsheet. We visit the site, interview every employee separately, and use a structured owner interview template. The goal: understand who actually runs the operation day-to-day, what happens when the owner leaves, and what roles we\u2019ll need to hire.",
    melers: "Site visits in Turku confirmed operations. Staff interviews revealed a capable team. Key insight: the owner had run everything on intuition for 30 years with no formal systems\u2014meaning a hired operator with basic processes could maintain and improve performance.",
  },
  ddSellerTerms: {
    title: "Seller Terms",
    items: [
      "Seller retention period agreed",
      "Post-obligation consulting terms defined",
      "Knowledge transfer plan created",
      "Letter of Intent drafted",
    ],
    why: "The transition period is where deals succeed or fail. We need the seller to stay long enough to transfer relationships and tacit knowledge, but we also need clear terms on consulting after the formal obligation ends. The LOI locks in the commercial terms before we invest in deep due diligence.",
    melers: "The seller had a competing offer from an industry player at the same price. Won the deal on personal connection and transition plan. Knowledge transfer structured via Trello board with documented processes for every operational role.",
  },
};

export function CriteriaDetailModal({
  open,
  onClose,
  activeFilters,
}: CriteriaDetailModalProps) {
  const activeCriteria = Array.from(activeFilters).filter(
    (f) => f in CRITERIA_DETAILS
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-[85] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 p-6"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
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
              Due Diligence Checklist
            </h2>

            <div className="space-y-6">
              {activeCriteria.map((key) => {
                const detail = CRITERIA_DETAILS[key];
                if (!detail) return null;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[16px] text-white font-medium">
                      {detail.title}
                    </h3>
                    <ul className="space-y-1 pl-4">
                      {detail.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-[12px] text-white/50 leading-relaxed list-disc"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
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
