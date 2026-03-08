import { NormalizedOverflow } from "@/lib/types/overflow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface KpiCardsProps {
    overflowData: NormalizedOverflow[];
}

const getTotalCompanies = (overflowData: NormalizedOverflow[]) => 
    new Set(overflowData.map((item) => item.company)).size;

const getTotalWaterCourses = (overflowData: NormalizedOverflow[]) => new Set(
    overflowData
      .map((item) => item.receivingWaterCourse?.trim().toLowerCase())
  ).size;


export const KpiCards = ({ overflowData }: KpiCardsProps) => {

    const dataObj = [
        {
            title: "Total Active Spills",
            value: overflowData.length,
        },
        {
            title: "Number of Companies Dumping",
            value: getTotalCompanies(overflowData),
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
            value: getTotalWaterCourses(overflowData),
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