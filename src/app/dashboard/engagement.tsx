'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
    views: {
        label: 'Views',
        color: 'hsl(var(--foreground))',
    },
} satisfies ChartConfig;

export default function Engagement({
    chartData,
}: {
    chartData:
        | {
              week: string;
              views: number;
          }[]
        | null;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Post engagement</CardTitle>
                <CardDescription>
                    Showing engagements for the last week
                </CardDescription>
            </CardHeader>
            <CardContent>
                {chartData ? (
                    <ChartContainer
                        config={chartConfig}
                        className="w-full xl:w-[680px] lg:h-[270px] 2xl:h-[350px] 2xl:w-[880px]"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="week"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <defs>
                                <linearGradient
                                    id="fillViews"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-views)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-views)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

                            <Area
                                dataKey="views"
                                type="natural"
                                fill="url(#fillViews)"
                                fillOpacity={0.4}
                                stroke="var(--color-views)"
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <Skeleton className="w-full xl:w-[680px] lg:h-[270px] 2xl:h-[350px] 2xl:w-[880px]" />
                )}
            </CardContent>
        </Card>
    );
}
