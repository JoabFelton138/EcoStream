import { NormalizedOverflow } from "@/lib/types/overflow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getTotalCompanies, getTotalWaterCourses, getMostActiveCompany, getSpillCountByCompany, getLongestSpill, formatDuration } from "@/lib/kpi/kpi-helpers";
import { InfoPopover } from "../shared/info-popover";

interface KpiCardsProps {
    overflowData: NormalizedOverflow[];
}

type KpiCard = {
    id: string;
    title: string;
    displayValue: string | number;
    description?: string
}

export const KpiCards = ({ overflowData }: KpiCardsProps) => {

    const totalCompanies = getTotalCompanies(overflowData);
    const totalWaterCourses = getTotalWaterCourses(overflowData);
    const spillCountByCompany = getSpillCountByCompany(overflowData);
    const mostActiveSpills = getMostActiveCompany(spillCountByCompany);
    const longestSpill = getLongestSpill(overflowData);
    const formattedDuration = longestSpill ? formatDuration(longestSpill.durationMs) : "-";

    const cards: KpiCard[] = [
        {
            id: "total_spills",
            title: "Total Active Spills",
            displayValue: overflowData.length,
        },
        {
            id: "companies_dumping",
            title: "Number of Companies Dumping",
            displayValue: totalCompanies,
        },
        {
            id: "most_active_company",
            title: "Company With Highest Number of Spills",
            displayValue: mostActiveSpills.company ?? "-",
            description: `${mostActiveSpills.count} Active Spills`,

        },
        {
            id: "dry_weather_spills",
            title: "Dry Weather Spills",
            displayValue: "0",
        },
        {
            id: "longest_active_spill",
            title: "Longest Active Spill",
            displayValue: longestSpill ? `At last monitoring update: ${formattedDuration}` : "-",
            description: longestSpill ? `${longestSpill.receivingWaterCourse} - ${longestSpill.company}` : "-",
        },
        {
            id: "number_of_rivers_polluted",
            title: "Number of Rivers Polluted",
            displayValue: totalWaterCourses,
        }
    ]
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card) => (
                <Card key={card.id}>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>{card.title}</CardTitle>
                            <InfoPopover title={card.id} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{card.displayValue}</p>
                        {card.description &&  <p>{card.description}</p>}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}