import { describe, it, expect } from "vitest";
import { getMostActiveCompany, getSpillCountByCompany, getTotalCompanies, getTotalWaterCourses } from "../../lib/kpi-helpers";
import { NormalizedOverflow } from "@/lib/types/overflow";

const data = [
    {company: "Company 1", receivingWaterCourse: "River 1"},
    {company: "Company 2", receivingWaterCourse: "River 2"},
    {company: "Company 3", receivingWaterCourse: "River 3"},
    {company: "Company 3", receivingWaterCourse: "River 3"},
    {company: "Company 3", receivingWaterCourse: "River 3"},
    {company: "Company 4", receivingWaterCourse: "River 4"},
    {company: "Company 5", receivingWaterCourse: "River 5"},
] as NormalizedOverflow[];

describe("getTotalCompanies", () => {
    it("returns 0 for empty data", () => {
        expect(getTotalCompanies([])).toBe(0);
    });

    it("counts unique companies", () => {
        expect(getTotalCompanies(data)).toBe(5);
    });
});

describe("getTotalWaterCourses", () => {
    it("returns 0 for empty data", () => {
        expect(getTotalWaterCourses([])).toBe(0);
    });

    it("counts unique water courses", () => {
        expect(getTotalWaterCourses(data)).toBe(5);
    });
});

describe("getSpillCountByCompany", () => {
    it("should return the correct spill count by company", () => {
        expect(getSpillCountByCompany(data)).toEqual({
            "Company 1": 1,
            "Company 2": 1,
            "Company 3": 3,
            "Company 4": 1,
            "Company 5": 1,
        });
    });
});

describe("getMostActiveCompany", () => {
    it("should return the correct most active company", () => {
        expect(getMostActiveCompany(getSpillCountByCompany(data))).toEqual({
            company: "Company 3",
            count: 3,
        });
    });
});