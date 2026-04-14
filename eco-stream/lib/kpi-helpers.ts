import { NormalizedOverflow } from "./types/overflow";

interface KpiCardsProps {
    overflowData: NormalizedOverflow[];
}

export const getTotalCompanies = (overflowData: NormalizedOverflow[]) => 
    new Set(overflowData.map((item) => item.company)).size;

export const getTotalWaterCourses = (overflowData: NormalizedOverflow[]) => new Set(
    overflowData
      .map((item) => item.receivingWaterCourse?.trim().toLowerCase())
  ).size;