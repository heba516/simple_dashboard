"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui";

const chartData = [
  { date: "2025-07-17", desktop: 120, mobile: 80 },
  { date: "2025-07-18", desktop: 200, mobile: 110 },
  { date: "2025-07-19", desktop: 150, mobile: 130 },
  { date: "2025-07-20", desktop: 180, mobile: 90 },
  { date: "2025-07-21", desktop: 220, mobile: 160 },
  { date: "2025-07-22", desktop: 230, mobile: 170 },
  { date: "2025-07-23", desktop: 270, mobile: 210 },
  { date: "2025-07-24", desktop: 100, mobile: 70 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DailySales() {
  return (
    <Card className="md:max-h-[400px]">
      <CardHeader>
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>July 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="md:max-h-[300px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="#2b7fff"
              strokeWidth={2}
              dot={{
                fill: "#2b7fff",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
