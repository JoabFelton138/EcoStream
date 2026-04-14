import { NormalizedOverflow } from "@/lib/types/overflow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getTotalCompanies, getTotalWaterCourses } from "@/lib/kpi-helpers";

interface KpiCardsProps {
    overflowData: NormalizedOverflow[];
}

export const KpiCards = ({ overflowData }: KpiCardsProps) => {

    const totalCompanies = getTotalCompanies(overflowData);
    const totalWaterCourses = getTotalWaterCourses(overflowData);

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
                        <p>{obj.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}