import { NormalizedOverflow } from "@/lib/types/overflow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getTotalCompanies, getTotalWaterCourses, getMostActiveCompany, getSpillCountByCompany } from "@/lib/kpi-helpers";

interface KpiCardsProps {
    overflowData: NormalizedOverflow[];
}

export const KpiCards = ({ overflowData }: KpiCardsProps) => {

    const totalCompanies = getTotalCompanies(overflowData);
    const totalWaterCourses = getTotalWaterCourses(overflowData);
    const spillCountByCompany = getSpillCountByCompany(overflowData);
    const mostActiveSpills = getMostActiveCompany(spillCountByCompany);

    const dataObj = [
        {
            title: "Total Active Spills",
            value: overflowData.length,
        },
        {
            title: "Number of Companies Dumping",
            value: totalCompanies,
        },
        {
            title: "Company With Highest Number of Spills",
            value: mostActiveSpills,
        },
        {
            title: "Dry Weather Spills",
            value: "",
        },
        {
            title: "Longest Active Spill",
            value: ""
        },
        {
            title: "Number of Rivers Polluted",
            value: totalWaterCourses,
        }
    ]
    
    return (
        <div className="grid grid-cols-3 gap-4">
            {dataObj.map((obj, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{obj.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            {typeof obj.value === "object" 
                                ? `${obj.value.company}: ${obj.value.count} Active Spills`
                                : obj.value}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}