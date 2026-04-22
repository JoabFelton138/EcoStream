import { mockData } from "../../test/mockData";
import { describe, expect, it } from "vitest";
import { KpiCards } from "./kpi-cards";
import { render, screen } from "@testing-library/react";

describe("KpiCards", () => {
    it("should render the KPI cards with computed values", () => {
        render(<KpiCards overflowData={mockData} />)
        expect(screen.getByText('Total Active Spills')).toBeInTheDocument();
        expect(screen.getAllByText('7')).toHaveLength(2);

        expect(screen.getByText('Number of Companies Dumping')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        
        expect(screen.getByText('Company With Highest Number of Spills')).toBeInTheDocument();
        expect(screen.getByText('thames water')).toBeInTheDocument();
        expect(screen.getByText('2 Active Spills')).toBeInTheDocument();
        
        expect(screen.getByText('Dry Weather Spills')).toBeInTheDocument();
        
        expect(screen.getByText('Longest Active Spill')).toBeInTheDocument();
        expect(screen.getByText('At last monitoring update: 6d 9h 51m')).toBeInTheDocument();
        expect(screen.getByText('dyan beck - united utilities')).toBeInTheDocument();
        
        expect(screen.getByText('Number of Rivers Polluted')).toBeInTheDocument();
    });
});