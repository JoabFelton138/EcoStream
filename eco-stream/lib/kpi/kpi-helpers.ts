import { NormalizedOverflow } from "../types/overflow";

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
};

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
};

export const formatDuration = (durationMs: number) => {
    const totalMinutes = Math.floor(durationMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

export const calculateDuration = (candidateSpills: NormalizedOverflow[]) => {
    let longestSpill = candidateSpills[0];
    let longestDuration = 0;

    for (const item of candidateSpills) {
        const start = new Date(item.latestEventStart as string).getTime();
        const end = new Date(item.lastUpdated as string).getTime();
        const duration = end - start;

        if (duration > longestDuration) {
            longestDuration = duration;
            longestSpill = item;
        }
    }
    return {longestSpill, longestDuration};
};

export const getLongestSpill = (overflowData: NormalizedOverflow[]) => {

    const candidateSpills = overflowData.filter((item) => item.latestEventStart);
    const {longestSpill, longestDuration} = calculateDuration(candidateSpills);
    const startedAt = new Date(longestSpill.latestEventStart as string);

    return {
        company: longestSpill.company,
        receivingWaterCourse: longestSpill.receivingWaterCourse,
        startedAt: startedAt.toISOString(),
        durationMs: longestDuration,
    };
};
