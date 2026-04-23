import { NextResponse } from "next/server";
import { OVERFLOW_URLS } from "@/lib/config/urls";
import { RawArcGISResponse } from "@/lib/types/overflow";
import { normaliseData } from "@/lib/overflow/normalise";

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

export async function GET() {
    const settled = await fetchSource(OVERFLOW_URLS);
    const data = flattenData(settled);
    const normalisedData = normaliseData(data);
    return NextResponse.json(normalisedData);
}