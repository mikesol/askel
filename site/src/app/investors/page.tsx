import { AudiencePage } from "../components/AudiencePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Investors — Askel Ventures",
  description:
    "Patient capital, lasting returns. Curated opportunities in sustainable Nordic companies with strong fundamentals.",
};

export default function InvestorsPage() {
  return <AudiencePage sectionKey="investors" />;
}
