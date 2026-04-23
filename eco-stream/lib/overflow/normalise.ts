import { NormalizedOverflow, RawOverflowFeature } from "../types/overflow";

export const toIso = (value: number | string | null | undefined) => {
    if (value == null || value === "") return null;
    const date = typeof value === "number" ? new Date(value) : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const normaliseData = (data: RawOverflowFeature[]): NormalizedOverflow[] => {
    const normalisedData = data.map((feature) => {
        const a = feature.attributes;
        const id = String(a.Id ?? a.id ?? "").trim();
        const company = String(a.Company ?? a.company ?? "").trim().toLowerCase();
        const receivingWaterCourse = String(
            a.ReceivingWaterCourse ?? a.receivingWaterCourse ?? "")
            .trim().toLowerCase();
        
        const latitude = Number(a.Latitude ?? a.latitude);
        const longitude = Number(a.Longitude ?? a.longitude);
        const latestRaw = a.LatestEventStart ?? a.latestEventStart;
        const lastRaw = a.LastUpdated ?? a.lastUpdated;

        return{
            id, 
            company, 
            receivingWaterCourse, 
            latitude, 
            longitude, 
            latestEventStart: toIso(latestRaw), 
            lastUpdated: toIso(lastRaw),
            geometry: feature.geometry,
        }
    });
    return normalisedData;
}