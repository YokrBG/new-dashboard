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
  { day: "Mon", conversations: 40 },
  { day: "Tue", conversations: 55 },
  { day: "Wed", conversations: 30 },
  { day: "Thu", conversations: 80 },
  { day: "Fri", conversations: 20 },
  { day: "Sat", conversations: 65 },
  { day: "Sun", conversations: 45 }
];

const chartConfig = {
  desktop: {
    label: "Conversations",
    color: "var(--primary)"
  }
} satisfies ChartConfig;

export function TotalConversationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-display text-3xl leading-6">1,200</div>
        <p className="text-muted-foreground mt-1.5 text-xs">
          <span className="text-green-500">+12%</span> from last week
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
            <Bar dataKey="conversations" fill="var(--color-desktop)" radius={5}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}