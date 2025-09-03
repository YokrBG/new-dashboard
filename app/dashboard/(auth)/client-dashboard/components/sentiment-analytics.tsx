"use client";

import { Pie, PieChart, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
  { sentiment: "Positive", value: 70, fill: "var(--color-positive)" },
  { sentiment: "Neutral", value: 20, fill: "var(--color-neutral)" },
  { sentiment: "Negative", value: 10, fill: "var(--color-negative)" }
];

const chartConfig = {
  positive: { label: "Positive", color: "var(--chart-1)" },
  neutral: { label: "Neutral", color: "var(--chart-2)" },
  negative: { label: "Negative", color: "var(--chart-3)" }
} satisfies ChartConfig;

export function SentimentAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="mx-auto h-[150px] w-[150px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="sentiment" innerRadius={30} strokeWidth={5}>
              {chartData.map((entry) => (
                <Cell key={entry.sentiment} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}