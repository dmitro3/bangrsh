"use client";

import Link from "next/link";
import { METRIC_CONFIG, type MetricType } from "@/lib/utils/marketMetrics";
import { formatViews } from "@/lib/utils/formatting";

interface RelatedMarketsProps {
  markets: any[];
  currentMarketId: number;
  isLoading: boolean;
  metricTypeMap: MetricType[];
}

export function RelatedMarkets({ markets, currentMarketId, isLoading, metricTypeMap }: RelatedMarketsProps) {
  return (
    <div className="bg-white nb-pattern-dots nb-border nb-shadow p-4 space-y-3">
      <h3 className="text-sm font-bold flex items-center justify-between">
        <span>Other Twitter markets</span>
        <span className="text-[10px] font-mono text-neutral-500">
          {isLoading ? "Loading..." : `${markets.length} shown`}
        </span>
      </h3>
      <div className="space-y-2 text-xs">
        {markets.length === 0 && !isLoading && (
          <p className="text-neutral-500 text-[11px]">
            No other markets yet – create one from the home page.
          </p>
        )}
        {markets.map((m: any, index: number) => {
          const id = Number(m.id ?? m.index);
          const metricIndex = Number(m.metric ?? 0);
          const metricKey = metricTypeMap[metricIndex] || "views";
          const cfg = METRIC_CONFIG[metricKey];
          const author = m.authorHandle || "unknown";
          const target = formatViews(Number(m.targetValue ?? 0));
          return (
            <Link
              key={`${id}-${index}`}
              href={`/market/${id}`}
              className="block nb-border bg-white hover:bg-yellow-50 transition p-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="text-[11px] font-semibold truncate">@{author}</p>
                  <p className="text-[11px] text-neutral-600 truncate">
                    Will this hit <span className="font-bold">{target}</span> {cfg.label}?
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full nb-border flex items-center justify-center text-lg"
                  style={{ backgroundColor: cfg.chartColor }}
                >
                  {cfg.emoji}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
