import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/utils/cn";
import type { HourlyPrediction } from "@/types/hourlyPredictions";
import { getQualityInfo } from "@/utils/qualityUtils";

interface NO2ChartProps {
  predictions: HourlyPrediction[];
  className?: string;
}

function getQualityColor(quality: string): string {
  return getQualityInfo(quality).color;
}

/**
 * Custom tooltip for the chart
 */
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{
    payload: {
      concentration: number;
      quality: string;
    };
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border">
        <p className="font-semibold">{`Hour: ${label}`}</p>
        <p className="text-sm">{`Concentration: ${data.concentration.toFixed(2)} µg/m³`}</p>
        <p className="text-sm text-muted-foreground">{`Quality: ${data.quality}`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Bar chart showing NO2 concentration per hour using Recharts
 * Bar colors change according to air quality
 */
export function NO2Chart({ predictions, className }: NO2ChartProps) {
  const chartData = useMemo(() => {
    if (!predictions || predictions.length === 0) return [];

    return predictions.map((prediction) => {
      const concentration =
        prediction.concentracoes["NO2(Dióxido de Nitrogênio) - µg/m3"] || 0;
      const hour = prediction.data_hora.split(" ")[1]?.substring(0, 5) || "";

      return {
        hour,
        concentration,
        quality: prediction.qualidade,
        color: getQualityColor(prediction.qualidade),
      };
    });
  }, [predictions]);

  if (chartData.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        No data available to display
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-foreground">
        NO₂ Concentration per Hour
      </h3>

      <div className="bg-muted/30 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'µg/m³',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="concentration"
              radius={[4, 4, 0, 0]}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Quality Legend */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#22c55e" }} />
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#eab308" }} />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#f97316" }} />
              <span>Poor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
              <span>Very Poor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#a855f7" }} />
              <span>Terrible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
