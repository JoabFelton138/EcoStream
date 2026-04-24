import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";
import { mockData } from "@/test/mockData";

describe("dashboard page", () => {
    const mockFetch = vi.fn();
    
    beforeEach(() => {
        vi.stubGlobal("fetch", mockFetch);
    });
    
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });
    
    it("should display error message when fetch fails", async() => {
        mockFetch.mockRejectedValue(new Error("network error"));
        render(<Home/>);
        expect(screen.getByText("Loading ....")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Error: network error")).toBeInTheDocument();
        });
    });

    it("should throw error when fetch returns non-ok status", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: async() => ({})
        });
        render(<Home/>);
        await waitFor(() => {
            expect(screen.getByText("Error: 404")).toBeInTheDocument();
        });
    });

    it("shows unknown error message when rejection is not an Error", async () => {
        mockFetch.mockRejectedValue(200);
        render(<Home/>);
        await waitFor(() => {
            expect(screen.getByText("Error: An unknown error occurred")).toBeInTheDocument();
        });
    });

    it("should display content on successful fetch", async() => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async() => mockData,
        });
        render(<Home/>);
        await waitFor(() => {
            expect(screen.getByText("Total Active Spills")).toBeInTheDocument();
        });
    });
});