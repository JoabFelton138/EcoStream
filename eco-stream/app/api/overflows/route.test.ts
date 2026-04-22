import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

describe("GET /api/overflows", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it("should return 200", async () => {

        const mockArcGisResponse = {
            features: [
              {
                attributes: {
                  Id: "ABC123",
                  Company: "Thames Water",
                  ReceivingWaterCourse: " River Thames ",
                  Latitude: 51.5,
                  Longitude: -0.1,
                  LatestEventStart: "2026-04-20T10:00:00.000Z",
                  LastUpdated: "2026-04-21T10:00:00.000Z",
                },
                geometry: { x: 1, y: 2 },
              },
            ],
        };

        const mockFetch = vi.fn();
        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => mockArcGisResponse,
        });

        const response = await GET();
        expect(response.status).toBe(200);
    });
});