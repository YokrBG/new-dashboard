"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", clients: 20 },
  { month: "Feb", clients: 35 },
  { month: "Mar", clients: 25 },
  { month: "Apr", clients: 40 },
  { month: "May", clients: 30 },
  { month: "Jun", clients: 45 }
];

const chartConfig = {
  desktop: {
    label: "Clients",
    color: "var(--primary)"
  }
} satisfies ChartConfig;

export function ActiveClientsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-display text-3xl leading-6">220</div>
        <p className="text-muted-foreground mt-1.5 text-xs">
          <span className="text-green-500">+5%</span> from last month
        </p>
        <ChartContainer className="mt-6 h-[100px] w-full" config={chartConfig}>
          <BarChart
            margin={{
              top: 22,
              right: 0,
              left: 0
            }}
            accessibilityLayer
            data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="clients" fill="var(--color-desktop)" radius={5}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}