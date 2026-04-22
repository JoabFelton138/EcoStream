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
        const mockFetch = vi.fn();
        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => ({features: []}),
        });

        const response = await GET();
        expect(response.status).toBe(200);
    });
});