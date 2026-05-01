"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NormalizedOverflow } from "@/lib/types/overflow"
import { formatDuration, getCompanyColour, getSpillCountByCompany, getTotalDurationByCompany, toFill } from "@/lib/utility-functions/helpers"

interface CompanySpillBreakdownProps {
  overflowData: NormalizedOverflow[];
}


export function CompanySpillBreakdown({overflowData} : CompanySpillBreakdownProps) {
  
  const chartData = Object.entries(getTotalDurationByCompany(overflowData))
  .map(([company, count]) => ({
    company, 
    count,
    fill: toFill(getCompanyColour(company))
  }))
  .sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total recorded duration of active spills per company</CardTitle>
        <CardDescription>Based on current active spill durations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-auto h-[260px]">
          <BarChart width={700} height={260} data={chartData} layout="vertical">
            <XAxis 
              type="number"
              hide
              />
            <YAxis dataKey="company" type="category" width={120}/>
            <Bar dataKey="count">
              <LabelList
                dataKey="count"
                position="right"
                formatter={(value) => {
                  const ms = typeof value === "number" ? value : Number(value ?? 0);
                  return formatDuration(ms);
                }}
              />
            </Bar>
          </BarChart>
        </div>
      </CardContent>
    </Card>
  )
}
