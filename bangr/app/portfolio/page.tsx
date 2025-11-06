"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react";
import { usePositions } from "@/contexts/PositionsContext";
import { useWallet } from "@/contexts/WalletContext";

// Keep fake resolved markets for now (since we don't track resolved markets yet)
const resolvedMarkets = [
  {
    username: "cristiano",
    displayName: "Cristiano",
    tweetText: "SIUUUUUU! What a goal tonight...",
    outcome: "YES",
    invested: 50,
    payout: 115,
    profit: 65,
    result: "won",
  },
  {
    username: "rihanna",
    displayName: "Rihanna",
    tweetText: "Super Bowl halftime show rehearsals...",
    outcome: "NO",
    invested: 75,
    payout: 0,
    profit: -75,
    result: "lost",
  },
];

export default function PortfolioPage() {
  const { positions, getTotalInvested, getTotalValue, getTotalProfitLoss } = usePositions();
  const { address, disconnect } = useWallet();

  // Calculate totals from real positions
  const totalInvested = getTotalInvested();
  const totalCurrentValue = getTotalValue();
  const totalProfitLoss = getTotalProfitLoss();
  const totalProfitLossPercent = totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(1) : '0.0';

  const resolvedProfit = resolvedMarkets.reduce((sum: number, m: any) => sum + m.profit, 0);
  const allTimeProfit = totalProfitLoss + resolvedProfit;
  const allTimePercent = totalInvested > 0 ? (((allTimeProfit + totalInvested) / totalInvested - 1) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-pink-400 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 border-4 border-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-4 border-blue-400 rotate-12"></div>
      </div>

      {/* Header */}
      <header className="border-b-6 border-black bg-gradient-to-r from-yellow-400 to-orange-500 sticky top-0 z-50 shadow-[0_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="px-4 py-2 bg-white text-black rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2" style={{ fontWeight: 700 }}>
                  <ArrowLeft className="w-5 h-5" strokeWidth={3} />
                  Back
                </button>
              </Link>
              <div className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="w-7 h-7 text-black" strokeWidth={3} />
              </div>
              <h1 className="text-black text-2xl" style={{ fontWeight: 700 }}>My Portfolio</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-black" style={{ fontWeight: 700 }}>{address.slice(0, 6)}...{address.slice(-4)}</span>
              </div>
              <button
                onClick={disconnect}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                style={{ fontWeight: 700 }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Value */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="text-black/70 mb-2" style={{ fontWeight: 600 }}>Portfolio Value</div>
            <div className="text-black text-4xl mb-2" style={{ fontWeight: 700 }}>${totalCurrentValue.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-black" strokeWidth={3} />
              <span className="text-black" style={{ fontWeight: 600 }}>
                {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)} ({totalProfitLossPercent}%)
              </span>
            </div>
          </div>

          {/* Total Invested */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="text-black/70 mb-2" style={{ fontWeight: 600 }}>Total Invested</div>
            <div className="text-black text-4xl mb-2" style={{ fontWeight: 700 }}>${totalInvested.toFixed(2)}</div>
            <div className="text-black" style={{ fontWeight: 600 }}>
              Across {positions.length} active markets
            </div>
          </div>

          {/* All-Time P&L */}
          <div className={`bg-gradient-to-br ${allTimeProfit >= 0 ? 'from-yellow-400 to-orange-500' : 'from-red-400 to-red-500'} rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}>
            <div className="text-black/70 mb-2" style={{ fontWeight: 600 }}>All-Time P&L</div>
            <div className="text-black text-4xl mb-2" style={{ fontWeight: 700 }}>
              {allTimeProfit >= 0 ? '+' : ''}${allTimeProfit.toFixed(2)}
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

        {/* Active Positions */}
        <div className="mb-8">
          <h2 className="text-white text-2xl mb-6" style={{ fontWeight: 700, textShadow: '2px 2px 0 #000' }}>
            Active Positions ({positions.length})
          </h2>

          {positions.length === 0 ? (
            <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>No Active Positions</h3>
              <p className="text-black/60 mb-6" style={{ fontWeight: 500 }}>
                Start trading to see your positions here!
              </p>
              <Link href="/">
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ fontWeight: 700 }}>
                  Browse Markets
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {positions.map((position) => {
                const currentValue = (position.shares * position.currentPrice) / 100;
                const profitLoss = currentValue - position.invested;
                const profitLossPercent = ((profitLoss / position.invested) * 100).toFixed(1);
                const isWinning = profitLoss >= 0;

                return (
                  <div
                    key={position.id}
                    className={`${position.color} rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Market Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                            {position.username[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white" style={{
                                fontWeight: 700,
                                textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
                              }}>{position.displayName}</span>
                              <span className="text-black/70">@{position.username}</span>
                            </div>
                            <p className="text-black" style={{ fontWeight: 500 }}>{position.marketTitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <div className={`px-4 py-2 rounded-full border-3 border-black ${position.outcome === 'YES' ? 'bg-green-400' : 'bg-red-400'}`}>
                            <span className="text-black" style={{ fontWeight: 700 }}>{position.outcome} {position.shares.toFixed(2)} shares</span>
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
                      <div className="bg-white rounded-xl border-3 border-black p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
                            <span className="text-black/60" style={{ fontWeight: 600 }}>Invested</span>
                            <span className="text-black" style={{ fontWeight: 700 }}>${position.invested.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
                            <span className="text-black/60" style={{ fontWeight: 600 }}>Current Value</span>
                            <span className="text-black" style={{ fontWeight: 700 }}>${currentValue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-black/60" style={{ fontWeight: 600 }}>P&L</span>
                            <div className="flex items-center gap-2">
                              {isWinning ? (
                                <TrendingUp className="w-4 h-4 text-green-600" strokeWidth={3} />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" strokeWidth={3} />
                              )}
                              <span className={`${isWinning ? 'text-green-600' : 'text-red-600'}`} style={{ fontWeight: 700 }}>
                                {isWinning ? '+' : ''}${profitLoss.toFixed(2)} ({profitLossPercent}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Resolved Markets */}
        <div>
          <h2 className="text-white text-2xl mb-6" style={{ fontWeight: 700, textShadow: '2px 2px 0 #000' }}>
            Resolved Markets ({resolvedMarkets.length})
          </h2>

          <div className="space-y-4">
            {resolvedMarkets.map((market, i) => {
              const isWon = market.result === "won";

              return (
                <div
                  key={i}
                  className={`${isWon ? 'bg-green-400' : 'bg-red-400'} rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Market Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                          {market.username[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white" style={{
                              fontWeight: 700,
                              textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
                            }}>{market.displayName}</span>
                            <span className="text-black/70">@{market.username}</span>
                          </div>
                          <p className="text-black" style={{ fontWeight: 500 }}>{market.tweetText}</p>
                        </div>
                      </div>

                      <div className="inline-flex px-4 py-2 rounded-full border-3 border-black bg-white">
                        <span className="text-black" style={{ fontWeight: 700 }}>
                          {isWon ? '✓ Won' : '✗ Lost'} - {market.outcome} Outcome
                        </span>
                      </div>
                    </div>

                    {/* Right: Result Stats */}
                    <div className="bg-white rounded-xl border-3 border-black p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
                          <span className="text-black/60" style={{ fontWeight: 600 }}>Invested</span>
                          <span className="text-black" style={{ fontWeight: 700 }}>${market.invested.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
                          <span className="text-black/60" style={{ fontWeight: 600 }}>Payout</span>
                          <span className="text-black" style={{ fontWeight: 700 }}>${market.payout.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-black/60" style={{ fontWeight: 600 }}>Profit/Loss</span>
                          <span className={`${isWon ? 'text-green-600' : 'text-red-600'}`} style={{ fontWeight: 700 }}>
                            {isWon ? '+' : ''}${market.profit.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
