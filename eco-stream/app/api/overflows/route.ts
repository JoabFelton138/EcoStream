import { NextResponse } from "next/server";
import { OVERFLOW_URLS } from "@/lib/config/urls";
import { ArcGISResponse } from "@/lib/types/overflow";

export async function GET() {
    const settled = await Promise.allSettled(
        OVERFLOW_URLS.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed request: ${response.status}`);
            return (await response.json()) as ArcGISResponse
        })
    );
    
    const data = settled.flatMap((result) => {
        if (result.status !== "fulfilled") return [];
        return Array.isArray(result.value.features) ? result.value.features : [];
    });

    const withIsoTimestamps = data.map((feature) => ({
        ...feature,
        attributes: {
            ...feature.attributes,
            LatestEventStart: feature.attributes.LatestEventStart 
            ? new Date(feature.attributes.LatestEventStart).toISOString() 
            : null,
            LastUpdated: feature.attributes.LastUpdated 
            ? new Date(feature.attributes.LastUpdated).toISOString() 
            : null,
        }
    }))

    return NextResponse.json(withIsoTimestamps);
}