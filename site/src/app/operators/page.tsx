import { AudiencePage } from "../components/AudiencePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Operators — Askel Ventures",
  description:
    "Build something that lasts. Lead an Askel portfolio company with real ownership and meaningful impact.",
};

export default function OperatorsPage() {
  return <AudiencePage sectionKey="operators" />;
}
