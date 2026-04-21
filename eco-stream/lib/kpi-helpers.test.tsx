import { describe, it, expect } from "vitest";
import { formatDuration, 
        getMostActiveCompany, 
        getSpillCountByCompany, 
        getTotalCompanies, 
        getTotalWaterCourses,
        calculateDuration,
        getLongestSpill
     } from "./kpi-helpers";
     import { mockData } from "../test/mockData";

describe("getTotalCompanies", () => {
    it("returns 0 for empty data", () => {
        expect(getTotalCompanies([])).toBe(0);
    });

    it("counts unique companies", () => {
        expect(getTotalCompanies(mockData)).toBe(4);
    });
});

describe("getTotalWaterCourses", () => {
    it("returns 0 for empty data", () => {
        expect(getTotalWaterCourses([])).toBe(0);
    });

    it("counts unique water courses", () => {
        expect(getTotalWaterCourses(mockData)).toBe(7);
    });
});

describe("getSpillCountByCompany", () => {
    it("should return the correct spill count by company", () => {
        expect(getSpillCountByCompany(mockData)).toEqual({
            "southern water": 1,
            "thames water": 2,
            "united utilities": 2,
            "yorkshire water": 2,
        });
    });
});

describe("getMostActiveCompany", () => {
    it("should return the correct most active company", () => {
        expect(getMostActiveCompany(getSpillCountByCompany(mockData))).toEqual({
            company: "thames water",
            count: 2,
        });
    });
});

describe("formatDuration", () => {
    it("should format minutes correctly", () => {
        expect(formatDuration(0)).toBe("0m");
        expect(formatDuration(60000)).toBe("1m");
    });
    it("should format hours correctly", () => {
        expect(formatDuration(3600000)).toBe("1h 0m");
        expect(formatDuration(7500000)).toBe("2h 5m");
    });
    it("should format days correctly", () => {
        expect(formatDuration(86400000)).toBe("1d 0h 0m");
    });
});

describe("calculateDuration", () => {
    it("should return timestamp along with details of the longest spill", () => {
        expect(calculateDuration(mockData)).toEqual({
            longestDuration: 553878494, 
            longestSpill: {
                company: "united utilities",
                geometry: {
                    x: -391088.5394677412,
                    y: 7282977.550203693,
                },
                id: "UUP01548",
                lastUpdated: "2026-04-21T10:35:18.494Z",
                latestEventStart: "2026-04-15T00:44:00.000Z",
                latitude: 54.5914620509691,
                longitude: -3.5132081244785,
                receivingWaterCourse: "dyan beck",
        }});
    }); 
});

describe("getLongestSpill", () => {
    it("should return the details of the longest spill", () => {
        expect(getLongestSpill(mockData)).toEqual({
            company: "united utilities",
            receivingWaterCourse: "dyan beck",
            startedAt: "2026-04-15T00:44:00.000Z",
            durationMs: 553878494,
        });
    });
});