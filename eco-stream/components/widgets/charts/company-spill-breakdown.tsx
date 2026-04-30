"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
} from "@/components/ui/chart"
import { NormalizedOverflow } from "@/lib/types/overflow"
import { getMostActiveCompany, getSpillCountByCompany } from "@/lib/utility-functions/helpers"

interface CompanySpillBreakdownProps {
  overflowData: NormalizedOverflow[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function CompanySpillBreakdown({overflowData} : CompanySpillBreakdownProps) {
  
  const spillCountByCompany = getSpillCountByCompany(overflowData);
  const {count: maxSpillCount} = getMostActiveCompany(spillCountByCompany);
  const chartData = Object.entries(spillCountByCompany)
  .map(([company, count]) => ({company, count}))
  .sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Spill Breakdown</CardTitle>
        <CardDescription>Shows the number of spills by company</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-auto h-[260px]">
          <BarChart width={700} height={260} data={chartData} layout="vertical">
            <XAxis type="number" allowDecimals={false} domain={[0, maxSpillCount]}/>
            <YAxis dataKey="company" type="category" width={120}/>
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Based on current discharge activity
        </div>
      </CardFooter>
    </Card>
  )
}
