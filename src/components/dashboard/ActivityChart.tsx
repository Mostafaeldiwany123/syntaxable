"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useWeeklyCommitActivity } from "@/hooks/stats";
import { Loader2 } from "lucide-react";

export function ActivityChart() {
  const { data: activity, isLoading } = useWeeklyCommitActivity();

  const chartData = activity?.map(item => ({
    name: item.day_name,
    total: item.commit_count,
  }));

  const hasActivity = chartData && chartData.some(d => d.total > 0);

  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Your total commits over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {isLoading ? (
          <div className="h-[250px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : hasActivity ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">No commits this week. <br /> Start a project to see your activity!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}