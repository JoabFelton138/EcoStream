import { NormalizedOverflow } from "./types/overflow";

export const getTotalCompanies = (overflowData: NormalizedOverflow[]) => 
    new Set(overflowData.map((item) => item.company)).size;

export const getTotalWaterCourses = (overflowData: NormalizedOverflow[]) => new Set(
    overflowData
      .map((item) => item.receivingWaterCourse?.trim().toLowerCase())
  ).size;

export const getSpillCountByCompany = (overflowData: NormalizedOverflow[]) => {
    return overflowData.reduce<Record<string, number>>((acc, item) => {
        acc[item.company] = (acc[item.company] ?? 0) + 1;
        return acc;
    }, {});
}

export const getMostActiveCompany = (spillCountByCompany: Record<string, number>) => {
    
    const result = spillCountByCompany;
    let mostActiveCompany: string | null = null;
    let spillCount = 0;

    for (const [company, count] of Object.entries(result)) {
        if (count > spillCount) {
            spillCount = count;
            mostActiveCompany = company;
        }
    }

    return {company: mostActiveCompany, count: spillCount};
}