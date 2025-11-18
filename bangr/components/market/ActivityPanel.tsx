"use client";

import { useState } from "react";
import { type MetricType } from "@/lib/utils/marketMetrics";

interface ActivityData {
  user: string;
  action: string;
}

interface HolderData {
  user: string;
  shares: number;
}

interface ActivityPanelProps {
  activityData: ActivityData[];
  holdersData: HolderData[];
  activeMetric: MetricType;
}

export function ActivityPanel({ activityData, holdersData, activeMetric }: ActivityPanelProps) {
  const [detailTab, setDetailTab] = useState<"flow" | "holders">("flow");

  return (
    <div className="bg-white nb-border nb-shadow">
      <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-neutral-900 text-white">
        <span className="text-xs font-pixel uppercase tracking-wide">Activity &amp; holders</span>
        <span className="text-[10px] font-mono text-neutral-300">
          {activeMetric.toUpperCase()}
        </span>
      </div>

      <div className="p-4">
        <div className="inline-flex gap-2 mb-3 text-[11px] font-semibold uppercase tracking-wide">
          <button
            onClick={() => setDetailTab("flow")}
            className={`nb-button px-4 py-2 ${
              detailTab === "flow" ? "bg-yellow-400 text-black" : "bg-white text-black"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setDetailTab("holders")}
            className={`nb-button px-4 py-2 ${
              detailTab === "holders" ? "bg-yellow-400 text-black" : "bg-white text-black"
            }`}
          >
            Top holders
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {detailTab === "flow" && (
            <div>
              <h4 className="font-semibold mb-1">Recent orders</h4>
              <div className="space-y-1">
                {activityData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-dashed border-neutral-200 py-1 last:border-b-0"
                  >
                    <span className="font-mono text-[11px]">{item.user}</span>
                    <span className="font-semibold">{item.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailTab === "holders" && (
            <div>
              <h4 className="font-semibold mb-1">Largest positions</h4>
              <div className="space-y-1">
                {holdersData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-dashed border-neutral-200 py-1 last:border-b-0"
                  >
                    <span className="font-mono text-[11px]">{item.user}</span>
                    <span className="font-semibold">
                      {item.shares} <span className="text-neutral-500">shares</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
