"use client"

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useWeeklyCommitActivity } from "@/hooks/stats";
import { usePracticeProgress } from "@/hooks/practice";
import { format, subDays, isSameDay } from "date-fns";

export function ActivityChart() {
  const { data: activity, isLoading: isLoadingActivity } = useWeeklyCommitActivity();
  const { data: practiceProgress, isLoading: isLoadingPractice } = usePracticeProgress();

  const isLoading = isLoadingActivity || isLoadingPractice;

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStr = format(date, 'EEE');

      const activityForDay = activity?.find(a =>
        a.day_name.trim().substring(0, 3).toLowerCase() === dayStr.toLowerCase()
      );

      const practiceCount = practiceProgress?.filter(p =>
        isSameDay(new Date(p.completed_at), date)
      ).length || 0;

      data.push({
        name: dayStr,
        commits: activityForDay ? activityForDay.commit_count : 0,
        practice: practiceCount,
      });
    }
    return data;
  }, [activity, practiceProgress]);

  const hasActivity = chartData.some(d => d.commits > 0 || d.practice > 0);

  return (
    <Card className="bg-secondary/20 border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-bold">
          Activity
        </CardTitle>
        <CardDescription className="mt-1">
          Your commits and practice progress this week.
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-0 pb-4 pr-4 pt-6">
        {isLoading ? (
          <div className="h-[250px] flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading chart...</span>
          </div>
        ) : hasActivity ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                allowDecimals={false}
                dx={-10}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary)/0.05)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  padding: '8px 12px'
                }}
                itemStyle={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'hsl(var(--foreground))'
                }}
                labelStyle={{
                  fontSize: '12px',
                  color: 'hsl(var(--muted-foreground))',
                  marginBottom: '4px'
                }}
              />
              <Legend
                content={({ payload }) => (
                  <div className="flex justify-center items-center gap-6 w-full pl-10 pt-2 opacity-80">
                    {payload?.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-[11px] font-medium text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar
                name="Commits"
                dataKey="commits"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                name="Solved"
                dataKey="practice"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">O_O</span>
            </div>
            <p className="text-sm text-muted-foreground w-[200px]">
              No activity this week. <br /> Start a project or practice!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}