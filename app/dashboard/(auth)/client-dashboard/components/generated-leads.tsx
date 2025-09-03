"use client";

import { Dot, Line, LineChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
  { source: "chat", leads: 100, fill: "var(--color-leads)" },
  { source: "email", leads: 150, fill: "var(--color-leads)" },
  { source: "ads", leads: 80, fill: "var(--color-leads)" },
  { source: "other", leads: 120, fill: "var(--color-leads)" }
];

const chartConfig = {
  leads: {
    label: "Leads",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig;

export function GeneratedLeadsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-display text-3xl leading-6">350</div>
        <p className="text-muted-foreground mt-1.5 text-xs">
          <span className="text-green-600">+8%</span> from last week
        </p>
        <ChartContainer className="mt-4 h-[100px] w-full" config={chartConfig}>
          <LineChart
            data={chartData}
            accessibilityLayer
            margin={{
              top: 8,
              right: 8,
              left: 8
            }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" nameKey="leads" hideLabel />}
            />
            <Line
              dataKey="leads"
              stroke="var(--color-leads)"
              strokeWidth={2}
              dot={({ payload, ...props }) => (
                <Dot
                  key={payload.source}
                  r={5}
                  cx={props.cx}
                  cy={props.cy}
                  fill="var(--background)"
                  stroke={payload.fill}
                />
              )}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}