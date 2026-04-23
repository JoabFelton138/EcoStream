import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";
import { OVERFLOW_URLS } from "@/lib/config/urls";

describe("GET /api/overflows", () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it("should return 200", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => ({features: []}),
        });

        const response = await GET();
        expect(response.status).toBe(200);
    });

    it("returns normalised overflow data", async () => {
          mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                features: [
                  {
                    attributes: {
                      Id: " ABC123 ",
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
              })
        });

        const response = await GET();
        const body = await response.json();
        expect(body[0]).toEqual({
            id: "ABC123",
            company: "thames water",
            receivingWaterCourse: "river thames",
            latitude: 51.5,
            longitude: -0.1,
            latestEventStart: "2026-04-20T10:00:00.000Z",
            lastUpdated: "2026-04-21T10:00:00.000Z",
            geometry: { x: 1, y: 2 },
        });
    });

    it("should call fetch for each URL in OVERFLOW_URLS", async () => {
        const urls = OVERFLOW_URLS;

        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => ({features: []}),
        });

        await GET();
        expect(mockFetch).toHaveBeenCalledTimes(urls.length);
        for (const url of urls) {
            expect(mockFetch).toHaveBeenCalledWith(url);
        }
    });
});