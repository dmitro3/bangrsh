"use client";

import { Sparkles } from "lucide-react";
import { METRIC_CONFIG, type MetricType } from "@/lib/utils/marketMetrics";
import { MOCK_TWEET_MARKETS } from "@/lib/constants/mockMarketData";
import { formatViews } from "@/lib/utils/formatting";

interface MarketSnapshotProps {
  marketId: number;
  activeMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
}

export function MarketSnapshot({
  marketId,
  activeMetric,
  onMetricChange,
}: MarketSnapshotProps) {
  return (
    <div className="space-y-4">
      {/* Bangr Odds */}
      <div className="bg-gradient-to-br from-yellow-300 to-orange-400 nb-border nb-shadow p-4 flex flex-col gap-3 text-black">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <div className="leading-tight">
              <p className="font-pixel text-xs uppercase">Bangr Odds</p>
              <p className="text-xs text-black/80">
                Snapshot of where traders are leaning right now.
              </p>
            </div>
          </div>
          <span className="px-2 py-1 nb-border bg-black/10 text-[10px] font-mono uppercase">
            Demo Pricing
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 text-center">
          <div className="flex-1 nb-border bg-white/70 py-2">
            <p className="text-[11px] font-semibold text-black/70">YES</p>
            <p className="font-pixel text-2xl leading-none">52%</p>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-pixel bg-yellow-200">
            VS
          </div>
          <div className="flex-1 nb-border bg-white/70 py-2">
            <p className="text-[11px] font-semibold text-black/70">NO</p>
            <p className="font-pixel text-2xl leading-none">48%</p>
          </div>
        </div>
        <div className="h-2 nb-border bg-black/10 overflow-hidden">
          <div className="h-full w-[52%] bg-green-400 float-left" />
          <div className="h-full w-[48%] bg-red-400 float-right" />
        </div>
      </div>

      {/* Market Snapshot */}
      <div className="bg-white nb-pattern-dots nb-border nb-shadow p-4 space-y-3">
        <h3 className="text-sm flex items-center justify-between">
          <span className="font-pixel text-[11px] uppercase tracking-wide">
            Market Snapshot
          </span>
          <span className="text-xs font-pixel bg-yellow-300 px-2 py-1 nb-border">
            #{marketId}
          </span>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {Object.entries(MOCK_TWEET_MARKETS).map(([metric, data]) => {
            const cfg = METRIC_CONFIG[metric as MetricType];
            const Icon = cfg.icon;
            const isActive = activeMetric === metric;
            return (
              <button
                key={metric}
                onClick={() => onMetricChange(metric as MetricType)}
                className={`text-left px-3 py-2 nb-border flex flex-col gap-1 transition-all ${
                  isActive ? "bg-white" : "bg-neutral-50 hover:bg-neutral-100"
                }`}
                style={isActive ? { borderColor: cfg.chartColor } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                    <Icon className="w-3 h-3" /> {cfg.label}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500">
                    Vol ${data.volume}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-xs">
                    {formatViews(data.currentValue)} / {formatViews(data.targetValue)}
                  </span>
                  <span className="text-[10px] text-neutral-600">
                    {Math.round((data.currentValue / data.targetValue) * 100)}% to goal
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
