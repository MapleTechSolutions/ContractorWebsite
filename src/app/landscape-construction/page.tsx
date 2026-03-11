import type { Metadata } from "next";
import LandscapeConstruction from "@/components/LandscapeConstruction";

export const metadata: Metadata = {
  title: "Landscape Construction Services | Big Country Landscaping",
  description:
    "Professional landscape construction in Saskatoon and Saskatchewan — hardscaping, softscaping, grading, irrigation, design, and seasonal cleanup. Licensed, insured, WCB compliant.",
  keywords: [
    "landscape construction Saskatoon",
    "hardscaping Saskatoon",
    "softscaping Saskatoon",
    "paving stone patio Saskatoon",
    "retaining wall Saskatchewan",
    "sod installation Saskatoon",
    "lot grading Saskatoon",
    "irrigation system Saskatoon",
  ],
};

export default function LandscapeConstructionPage() {
  return <LandscapeConstruction />;
}
