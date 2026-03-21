"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metric } from "@/lib/types"

type MetricsChartProps = {
  title: string
  data: Metric[]
}

export function MetricsChart({ title, data }: MetricsChartProps) {
  const chartData = data.map((d) => ({
    period: d.period,
    value: d.value,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 10% 88%)" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 12 }}
                stroke="hsl(160 5% 45%)"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160 5% 45%)" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="hsl(160 84% 39%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
