import { CaseStudyPage } from "../components/CaseStudyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Melers Oy — Case Study — Askel Ventures",
  description:
    "How we acquired a 30-year-old laundry business in Turku, Finland. From first contact to close in under 100 days.",
};

export default function CaseStudy() {
  return <CaseStudyPage />;
}
