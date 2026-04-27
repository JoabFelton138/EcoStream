import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";
import { OVERFLOW_URLS } from "@/lib/config/urls";
import { screen, waitFor } from "@testing-library/react";

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

    it("ignores fulfilled responses with non-array features", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => ({features: undefined})
        });

        const response = await GET();
        const body = await response.json();
        expect(body).toEqual([]);
    });

    it("skips rejected source results", async () => {
        const feature = {
            attributes: {
                Id: "ABC123",
                Company: "Umbrella Corporation",
                ReceivingWaterCourse: "Circular River",
                Latitude: 51.5,
                Longitude: -0.1,
                LatestEventStart: "2026-04-20T10:00:00.000Z",
                LastUpdated: "2026-04-21T10:00:00.000Z",
            },
            geometry: { x: 1, y: 2 },
        };

        mockFetch
            .mockRejectedValueOnce(new Error("network error"))
            .mockResolvedValue({
                ok: true,
                json: async() => ({features: [feature]})
            });
        
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].id).toBe("ABC123");

    });

    it("returns empty array when all upstream responses are non-ok", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: async() => ({})
        });
        const response = await GET();
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body).toEqual([]);
    });
});