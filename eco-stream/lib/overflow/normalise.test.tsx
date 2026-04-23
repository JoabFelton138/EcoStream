import { describe, expect, it } from "vitest";
import { normaliseData, toIso } from "./normalise";
import { RawOverflowFeature } from "../types/overflow";

describe("toIso helpers", () => {
    it("returns null for null or undefined values", () => {
        expect(toIso(null)).toBeNull()
        expect(toIso(undefined)).toBeNull();
    });
    it("returns null for invalid date", () => {
        expect(toIso("not-a-date")).toBeNull();
    });
});

describe("normaliseData Helpers", () => {
    it("normalises a feature with PascalCase attributes", () => {
        const input: RawOverflowFeature[] = [{
            attributes: {
                Id: " ABC123 ",
                Company: "Thames Water",
                ReceivingWaterCourse: " River Thames ",
                Latitude: 51.5,
                Longitude: -0.1,
                LatestEventStart: "2026-04-20T10:00:00.000Z",
                LastUpdated: "2026-04-21T10:00:00.000Z",
            },
            geometry: {
                x: 1,
                y: 2,
            },
        }];
        expect(normaliseData(input)).toEqual([
            {
                id: "ABC123",
                company: "thames water",
                receivingWaterCourse: "river thames",
                latitude: 51.5,
                longitude: -0.1,
                latestEventStart: "2026-04-20T10:00:00.000Z",
                lastUpdated: "2026-04-21T10:00:00.000Z",
                geometry: { x: 1, y: 2 },
            }
        ]);
    });

    it("falls back when id / company / watercourse are missing", () => {
        const input: RawOverflowFeature[] = [{
            attributes: {
                LatestEventStart: null,
                LastUpdated: undefined,
            },
            geometry: { x: 1, y: 2 },
        }];
        expect(normaliseData(input)[0]).toMatchObject({
            id: "",
            company: "",
            receivingWaterCourse: "",
            latestEventStart: null,
            lastUpdated: null,
            geometry: { x: 1, y: 2 },
        });
    });

});