"use client";

import { Clock, TrendingUp } from "lucide-react";
import { METRIC_CONFIG, type MetricType } from "@/lib/utils/marketMetrics";
import { formatViews } from "@/lib/utils/formatting";

interface MarketHeroProps {
  marketId: number;
  username: string;
  displayName: string;
  tweetText: string;
  avatarUrl?: string | null;
  formattedTarget: string;
  currentValue: number;
  timeRemaining: string;
  activeMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
}

export function MarketHero({
  marketId,
  username,
  displayName,
  tweetText,
  avatarUrl,
  formattedTarget,
  currentValue,
  timeRemaining,
  activeMetric,
  onMetricChange,
}: MarketHeroProps) {
  const metricConfig = METRIC_CONFIG[activeMetric];

  return (
    <div className="bg-yellow-200 nb-pattern-dots nb-border nb-shadow relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-yellow-300/60 blur-2xl pointer-events-none" />
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-black text-yellow-300 font-pixel text-[10px] uppercase tracking-[0.2em] nb-border">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Twitter Market · 24h Window
          </span>
          <span className="hidden md:inline-flex px-3 py-1 bg-white/80 nb-border text-[11px] font-mono">
            #{marketId.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white nb-border overflow-hidden flex items-center justify-center text-xl font-bold">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{username[0]?.toUpperCase() || "?"}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-black font-bold text-lg">{displayName}</span>
              <span className="text-neutral-600">@{username}</span>
            </div>
            <p className="text-black/80 text-sm line-clamp-3">{tweetText}</p>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-black mb-4 font-pixel leading-snug">
          Will this hit{" "}
          <span className="text-white text-shadow-black inline-block">
            {formattedTarget}
          </span>{" "}
          <span className={`${metricConfig.textColor} font-pixel`}>
            {metricConfig.label.toUpperCase()}
          </span>{" "}
          in 24h?
        </h1>

        {/* Metric summary pills */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs md:text-sm">
          <div className="nb-border bg-yellow-100 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wide">Time Left</span>
            </div>
            <span className="font-bold">{timeRemaining}</span>
          </div>
          <div className="nb-border bg-neutral-100 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wide">Target</span>
            </div>
            <span className="font-bold">{formattedTarget}</span>
          </div>
          <div className="nb-border bg-neutral-100 px-3 py-2 flex items-center justify-between">
            <span className="font-bold uppercase tracking-wide">Current {metricConfig.label}</span>
            <span className="font-bold">{formatViews(currentValue)}</span>
          </div>
          <div className="nb-border bg-neutral-100 px-3 py-2 flex items-center justify-between">
            <span className="font-bold uppercase tracking-wide">Volume</span>
            <span className="font-bold">$0</span>
          </div>
        </div>
      </div>

      {/* Metric tabs */}
      <div className="border-t-2 border-black bg-neutral-900 text-white">
        <div className="flex">
          {Object.entries(METRIC_CONFIG).map(([metric, config]) => {
            const isActive = activeMetric === metric;
            const Icon = config.icon;
            return (
              <button
                key={metric}
                onClick={() => onMetricChange(metric as MetricType)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs md:text-sm font-bold border-r-2 border-black transition-all ${
                  isActive ? "text-black" : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
                style={isActive ? { backgroundColor: config.chartColor } : undefined}
              >
                <Icon className="w-4 h-4" />
                <span className="uppercase tracking-wide">{config.label}</span>
              </button>
            );
          })}
        </div>
        <div className="bg-yellow-400 nb-scanlines border-t-2 border-black px-4 py-3 text-center">
          <p className="font-pixel text-[11px] md:text-xs text-black">
            You&apos;re trading on{" "}
            <span className="text-white text-shadow-black font-normal">
              {activeMetric.toUpperCase()}
            </span>{" "}
            hitting{" "}
            <span className="text-white text-shadow-black font-normal">
              {formattedTarget}
            </span>{" "}
            in 24h.
          </p>
        </div>
      </div>
    </div>
  );
}
