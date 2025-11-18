import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioStatsProps {
  totalCurrentValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: string;
  totalCapital: number;
  totalInvested: number;
  totalLocked: number;
  allTimeProfit: number;
  allTimePercent: string;
}

export function PortfolioStats({
  totalCurrentValue,
  totalProfitLoss,
  totalProfitLossPercent,
  totalCapital,
  totalInvested,
  totalLocked,
  allTimeProfit,
  allTimePercent,
}: PortfolioStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Value */}
      <div className="bg-white nb-border nb-shadow">
        <div className="px-4 py-2 border-b-2 border-black bg-green-300 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide">Portfolio value</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-black text-3xl" style={{ fontWeight: 700 }}>
            ${totalCurrentValue.toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-black" strokeWidth={3} />
            <span className="text-black" style={{ fontWeight: 600 }}>
              {totalProfitLoss >= 0 ? "+" : ""}${totalProfitLoss.toFixed(2)} ({totalProfitLossPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Total Capital */}
      <div className="bg-white nb-border nb-shadow">
        <div className="px-4 py-2 border-b-2 border-black bg-blue-300 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide">Total capital</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-black text-3xl" style={{ fontWeight: 700 }}>
            ${totalCapital.toFixed(2)}
          </div>
          <div className="text-black text-sm" style={{ fontWeight: 600 }}>
            ${totalInvested.toFixed(2)} in positions + ${totalLocked.toFixed(2)} pending
          </div>
        </div>
      </div>

      {/* All-Time P&L */}
      <div className="bg-white nb-border nb-shadow">
        <div
          className={`px-4 py-2 border-b-2 border-black flex items-center justify-between ${
            allTimeProfit >= 0 ? "bg-yellow-300" : "bg-red-300"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wide">All-time P&amp;L</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-black text-3xl mb-1" style={{ fontWeight: 700 }}>
            {allTimeProfit >= 0 ? "+" : ""}${allTimeProfit.toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            {allTimeProfit >= 0 ? (
              <TrendingUp className="w-5 h-5 text-black" strokeWidth={3} />
            ) : (
              <TrendingDown className="w-5 h-5 text-black" strokeWidth={3} />
            )}
            <span className="text-black" style={{ fontWeight: 600 }}>
              {allTimePercent}% return
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
