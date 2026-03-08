export interface RawOverflowAttributes {
    Id?: string;
    id?: string;
    Company?: string;
    company?: string;
    Latitude?: number;
    latitude?: number;
    Longitude?: number;
    longitude?: number;
    ReceivingWaterCourse?: string;
    receivingWaterCourse?: string;
    LatestEventStart?: number | string | null;
    latestEventStart?: number | string | null;
    LastUpdated?: number | string | null;
    lastUpdated?: number | string | null;
};

export interface RawOverflowFeature {
    attributes: RawOverflowAttributes;
    geometry: OverflowGeometry;
};

export interface RawArcGISResponse {
    features?: RawOverflowFeature[];
};


interface OverflowGeometry {
    x: number;
    y: number;
}

export interface NormalizedOverflow {
    id: string;
    company: string;
    latitude: number;
    longitude: number;
    receivingWaterCourse: string;
    latestEventStart: string | null;
    lastUpdated: string | null;
    geometry: OverflowGeometry;
}