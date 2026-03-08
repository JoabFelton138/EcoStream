import { NextResponse } from "next/server";
import { OVERFLOW_URLS } from "@/lib/config/urls";
import { NormalizedOverflow, RawArcGISResponse, RawOverflowFeature } from "@/lib/types/overflow";

const fetchSource = async (OVERFLOW_URLS: string[]) => {
    const settled = await Promise.allSettled(
        OVERFLOW_URLS.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed request: ${response.status}`);
            return (await response.json()) as RawArcGISResponse
        })
    );
    return settled;
}

const flattenData = (settled: PromiseSettledResult<RawArcGISResponse>[]) => {
    return settled.flatMap((result) => {
        if (result.status !== "fulfilled") return [];
        return Array.isArray(result.value.features) ? result.value.features : [];
    });
}

const toIso = (value: number | string | null | undefined) => {
    if (value == null || value === "") return null;
    const date = typeof value === "number" ? new Date(value) : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const normaliseData = (data: RawOverflowFeature[]): NormalizedOverflow[] => {
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

export async function GET() {
    const settled = await fetchSource(OVERFLOW_URLS);
    const data = flattenData(settled);
    const normalisedData = normaliseData(data);
    return NextResponse.json(normalisedData);
}