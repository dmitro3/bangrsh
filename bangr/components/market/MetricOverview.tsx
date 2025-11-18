"use client";

import { METRIC_CONFIG, type MetricType } from "@/lib/utils/marketMetrics";
import { formatViews } from "@/lib/utils/formatting";

interface MetricOverviewProps {
  currentValue: number;
  targetValue: number;
  formattedTarget: string;
  timeRemaining: string;
  activeMetric: MetricType;
}

export function MetricOverview({
  currentValue,
  targetValue,
  formattedTarget,
  timeRemaining,
  activeMetric,
}: MetricOverviewProps) {
  const metricConfig = METRIC_CONFIG[activeMetric];
  const progress = (currentValue / targetValue) * 100;

  return (
    <div className="bg-white nb-border nb-shadow">
      <div
        className="flex items-center justify-between px-4 py-2 border-b-2 border-black"
        style={{ backgroundColor: metricConfig.chartColor, color: "#000" }}
      >
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="font-pixel uppercase tracking-wide">Tweet metric overview</span>
        </div>
        <span className="px-2 py-1 nb-border bg-white/80 text-[10px] uppercase tracking-wide flex items-center gap-1">
          {metricConfig.emoji} {metricConfig.label.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between">
            <dt className="text-neutral-600">Current {metricConfig.label}</dt>
            <dd className="font-bold">{formatViews(currentValue)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-600">Target {metricConfig.label}</dt>
            <dd className="font-bold">{formattedTarget}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-neutral-600">Progress to target</dt>
            <dd className="font-bold">{Math.round(progress)}%</dd>
          </div>
          <div className="h-2 nb-border bg-neutral-100 overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${Math.min(100, progress)}%`,
                backgroundColor: metricConfig.chartColor,
              }}
            />
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-600">Market Volume (all orders)</dt>
            <dd className="font-bold">$0</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-600">Time Left</dt>
            <dd className="font-bold">{timeRemaining}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
