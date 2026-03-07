export interface OverflowAttributes {
    Id: string;
    Company: string;
    Latitude: number;
    Longitude: number;
    ReceivingWaterCourse: string;
    LatestEventStart: number;
    LastUpdated: number;
}

export interface OverflowGeometry {
    x: number;
    y: number;
}

export interface OverflowFeature {
    attributes: OverflowAttributes;
    geometry: OverflowGeometry;
}

export interface ArcGISResponse {
    features: OverflowFeature[];
}