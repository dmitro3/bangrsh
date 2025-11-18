import Link from "next/link";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

interface Position {
  marketId: number;
  outcome: string;
  shares: number;
  invested: number;
  currentValue: number;
  username: string;
  displayName: string;
  marketTitle: string;
  metric?: number;
}

interface PositionCardProps {
  position: Position;
}

export function PositionCard({ position }: PositionCardProps) {
  const profitLoss = position.currentValue - position.invested;
  const profitLossPercent =
    position.invested > 0 ? ((profitLoss / position.invested) * 100).toFixed(1) : "0.0";
  const isWinning = profitLoss >= 0;

  // Metric-based accent color (0=views,1=likes,2=retweets,3=replies)
  const metricIndex = position.metric ?? 0;
  const metricCardColors = ["bg-blue-100", "bg-pink-100", "bg-green-100", "bg-purple-100"];
  const metricAccent = metricCardColors[metricIndex] || "bg-blue-100";

  return (
    <div
      className={`${metricAccent} nb-pattern-dots nb-border nb-shadow p-5`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Market Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white"
              style={{ fontWeight: 700 }}
            >
              {position.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-white"
                  style={{
                    fontWeight: 700,
                    textShadow:
                      "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                  }}
                >
                  {position.displayName}
                </span>
                <span className="text-black/70">@{position.username}</span>
              </div>
              <p className="text-black" style={{ fontWeight: 500 }}>
                {position.marketTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div
              className={`px-4 py-2 rounded-full border-3 border-black ${
                position.outcome === "YES" ? "bg-green-400" : "bg-red-400"
              }`}
            >
              <span className="text-black" style={{ fontWeight: 700 }}>
                {position.outcome} {position.shares.toFixed(2)} shares
              </span>
            </div>
            <Link href={`/market/${position.marketId}`}>
              <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl border-2 border-black hover:bg-gray-100 transition-colors">
                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                <span style={{ fontWeight: 600 }}>View Market</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Position Stats */}
        <div className="bg-white nb-border text-xs">
          <div className="px-3 py-1 border-b border-black bg-neutral-100 flex items-center justify-between">
            <span className="font-semibold uppercase tracking-wide text-[10px] text-black/70">
              Position summary
            </span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-black/10">
              <span className="text-black/60 font-semibold">Invested</span>
              <span className="text-black font-bold text-sm">
                ${position.invested.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-black/10">
              <span className="text-black/60 font-semibold">Current value</span>
              <span className="text-black font-bold text-sm">
                ${position.currentValue.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black/60 font-semibold">P&amp;L</span>
              <div className="flex items-center gap-2">
                {isWinning ? (
                  <TrendingUp className="w-4 h-4 text-green-600" strokeWidth={3} />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" strokeWidth={3} />
                )}
                <span
                  className={`${
                    isWinning ? "text-green-600" : "text-red-600"
                  } font-bold text-sm`}
                >
                  {isWinning ? "+" : ""}${profitLoss.toFixed(2)} ({profitLossPercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
