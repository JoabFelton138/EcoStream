import { getCompanyColour, getSpillCountByCompany } from "@/lib/utility-functions/helpers";
import { NormalizedOverflow } from "@/lib/types/overflow";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";


interface ActiveCompanyPillsProps {
    overflowData: NormalizedOverflow[];
}

export const ActiveCompanyPills = ({overflowData} : ActiveCompanyPillsProps) => {

    const spillCountByCompany = getSpillCountByCompany(overflowData);
    const pillData = Object.entries(spillCountByCompany)
    .map(([company, count]) => ({company, count}));
    
    return (
        <div className="flex flex-wrap gap-2">
            <h2 className="text-lg font-bold">Active Companies</h2>
            {pillData.map((b) => (
                <Badge 
                    key={b.company} 
                    variant="default" 
                    className={cn(getCompanyColour(b.company), "text-sm font-medium text-white")}>
                    {b.company}: {b.count} {b.count > 1 ? "Spills" : "Spill"}
                </Badge>
            ))}
        </div>
    );
};