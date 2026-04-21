import { describe, it, expect } from "vitest";
import { formatDuration, 
        getMostActiveCompany, 
        getSpillCountByCompany, 
        getTotalCompanies, 
        getTotalWaterCourses,
        calculateDuration,
        getLongestSpill
     } from "../../lib/kpi-helpers";
import { NormalizedOverflow } from "@/lib/types/overflow";

const mockData: NormalizedOverflow[] = [
    {
      "id": "TWL00454",
      "company": "thames water",
      "receivingWaterCourse": "winterbourne stream",
      "latitude": 51.445832420733744,
      "longitude": -1.3459669929339224,
      "latestEventStart": "2026-04-20T15:15:00.000Z",
      "lastUpdated": "2026-04-21T10:38:44.833Z",
      "geometry": {
        "x": -149832.3602779579,
        "y": 6700538.463126707
      }
    },
    {
      "id": "TWL00435",
      "company": "thames water",
      "receivingWaterCourse": "cripsey brook",
      "latitude": 51.735923648546795,
      "longitude": 0.18538964856180828,
      "latestEventStart": "2026-04-21T09:15:00.000Z",
      "lastUpdated": "2026-04-21T10:38:44.835Z",
      "geometry": {
        "x": 20637.48127624444,
        "y": 6752517.183842554
      }
    },
    {
      "id": "UUP01955",
      "company": "united utilities",
      "receivingWaterCourse": "town beck",
      "latitude": 54.1939383858558,
      "longitude": -3.0869417950021,
      "latestEventStart": "2026-04-21T03:52:47.700Z",
      "lastUpdated": "2026-04-21T10:35:18.494Z",
      "geometry": {
        "x": -343636.788728107,
        "y": 7206971.799130829
      }
    },
    {
      "id": "UUP01548",
      "company": "united utilities",
      "receivingWaterCourse": "dyan beck",
      "latitude": 54.5914620509691,
      "longitude": -3.5132081244785,
      "latestEventStart": "2026-04-15T00:44:00.000Z",
      "lastUpdated": "2026-04-21T10:35:18.494Z",
      "geometry": {
        "x": -391088.5394677412,
        "y": 7282977.550203693
      }
    },
    {
      "id": "YWS01637",
      "company": "yorkshire water",
      "receivingWaterCourse": "lady beck (culverted)",
      "latitude": 53.804758,
      "longitude": -1.531969,
      "latestEventStart": "2026-04-21T02:16:03.000Z",
      "lastUpdated": "2026-04-21T10:19:31.537Z",
      "geometry": {
        "x": -170538.0089910805,
        "y": 7133266.168214025
      }
    },
    {
      "id": "YWS00628",
      "company": "yorkshire water",
      "receivingWaterCourse": "totty beck, tributary of river calder",
      "latitude": 53.618828,
      "longitude": -1.507132,
      "latestEventStart": "2026-04-21T09:05:41.000Z",
      "lastUpdated": "2026-04-21T10:19:31.537Z",
      "geometry": {
        "x": -167773.16679824796,
        "y": 7098294.8568147095
      }
    },
    {
      "id": "SWS00496",
      "company": "southern water",
      "receivingWaterCourse": "lavant",
      "latitude": 50.8639178156989,
      "longitude": -0.773808786873301,
      "latestEventStart": "2026-04-01T09:26:04.000Z",
      "lastUpdated": "2026-04-07T09:10:00.460Z",
      "geometry": {
        "x": -86140.00012609662,
        "y": 6597257.568939877
      }
    }
  ];

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