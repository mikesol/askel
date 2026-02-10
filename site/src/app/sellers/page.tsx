import { AudiencePage } from "../components/AudiencePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Sellers — Askel Ventures",
  description:
    "Your legacy, preserved. Fair terms and a commitment to protect what you've built.",
};

export default function SellersPage() {
  return <AudiencePage sectionKey="owners" />;
}
