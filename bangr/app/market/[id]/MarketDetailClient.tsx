"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Repeat2, Heart, Eye, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TradingModal } from "@/components/TradingModal";
import { useWallet } from "@/contexts/WalletContext";

// Generate fake price history data
function generatePriceHistory(currentPrice: number) {
  const data = [];
  let price = 50; // Start at 50%

  for (let i = 0; i < 24; i++) {
    // Gradually move toward current price with some randomness
    const target = currentPrice;
    price = price + (target - price) * 0.1 + (Math.random() - 0.5) * 3;
    price = Math.max(5, Math.min(95, price)); // Keep between 5-95%

    data.push({
      time: `${i}h`,
      yes: Math.round(price),
      no: Math.round(100 - price),
    });
  }

  return data;
}

// Fake top holders data
const fakeHolders = {
  yes: [
    { name: "CryptoWhale", shares: 18692, avatar: "🐋" },
    { name: "DiamondHands", shares: 16478, avatar: "💎" },
    { name: "MoonBoy", shares: 13907, avatar: "🌙" },
    { name: "HODLer", shares: 12166, avatar: "🚀" },
    { name: "BullMarket", shares: 9431, avatar: "🐂" },
  ],
  no: [
    { name: "BearWhale", shares: 79213, avatar: "🐻" },
    { name: "Skeptic", shares: 20156, avatar: "🤔" },
    { name: "Realist", shares: 10064, avatar: "📊" },
    { name: "Contrarian", shares: 7524, avatar: "🎯" },
    { name: "Doubter", shares: 6683, avatar: "❓" },
  ],
};

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function MarketDetailClient({ market }: { market: any }) {
  const [priceHistory, setPriceHistory] = useState(generatePriceHistory(market.yesPrice));
  const [activeTab, setActiveTab] = useState<"chart" | "holders">("chart");
  const [tradingModalOpen, setTradingModalOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO">("YES");
  const { isConnected, address, connect, disconnect } = useWallet();

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(generatePriceHistory(market.yesPrice + (Math.random() - 0.5) * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [market.yesPrice]);

  const handleTradeClick = (outcome: "YES" | "NO") => {
    setSelectedOutcome(outcome);
    setTradingModalOpen(true);
  };

  const formattedTarget = formatViews(market.targetViews);
  const formattedCurrent = formatViews(market.currentViews);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-pink-400 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 border-4 border-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-4 border-blue-400 rotate-12"></div>
      </div>

      {/* Header - Same as homepage */}
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
              <h1 className="text-black text-2xl" style={{ fontWeight: 700 }}>Bangr</h1>
            </div>

            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <Link href="/portfolio">
                    <button className="px-4 py-3 bg-white text-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ fontWeight: 700 }}>
                      Portfolio
                    </button>
                  </Link>
                  <button
                    onClick={disconnect}
                    className="px-4 py-3 bg-white text-black rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    style={{ fontWeight: 700 }}
                  >
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </button>
                </>
              ) : (
                <button
                  onClick={connect}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ fontWeight: 700 }}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tweet + Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tweet Card */}
            <div className={`${market.color} rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}>
              {/* User Info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white text-xl" style={{ fontWeight: 700 }}>
                  {market.username[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg" style={{
                      fontWeight: 700,
                      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 2px 2px 0 #000'
                    }}>{market.displayName}</span>
                    <span className="text-black/70">@{market.username}</span>
                  </div>
                  <span className="text-black/70">{market.timeAgo}</span>
                </div>
              </div>

              {/* Tweet Text */}
              <div className="bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-4">
                <p className="text-black text-lg" style={{ fontWeight: 500 }}>
                  {market.tweetText}
                </p>
              </div>

              {/* Tweet Image */}
              {market.tweetImage && (
                <div className="mb-4">
                  <img
                    src={market.tweetImage}
                    alt="Tweet"
                    className="w-full rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-black">
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(market.comments)}</span>
                </div>
                <div className="flex items-center gap-1 text-black">
                  <Repeat2 className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(market.retweets)}</span>
                </div>
                <div className="flex items-center gap-1 text-black">
                  <Heart className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(market.likes)}</span>
                </div>
                <div className="flex items-center gap-1 text-black">
                  <Eye className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm" style={{ fontWeight: 600 }}>{formattedCurrent}</span>
                </div>
              </div>
            </div>

            {/* Market Question */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-black text-2xl" style={{ fontWeight: 700 }}>
                  Will this hit <span className="text-white" style={{
                    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
                  }}>{formattedTarget}</span> views in 24h?
                </h2>
              </div>
              <div className="flex items-center gap-2 text-black">
                <Clock className="w-5 h-5" strokeWidth={3} />
                <span style={{ fontWeight: 600 }}>{market.timeRemaining} remaining</span>
              </div>
            </div>

            {/* Chart or Top Holders Tabs */}
            <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b-3 border-black">
                <button
                  onClick={() => setActiveTab("chart")}
                  className={`flex-1 px-6 py-4 text-center transition-colors ${
                    activeTab === "chart"
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-black/60 hover:bg-gray-50"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  📊 Price Chart
                </button>
                <button
                  onClick={() => setActiveTab("holders")}
                  className={`flex-1 px-6 py-4 text-center transition-colors border-l-3 border-black ${
                    activeTab === "holders"
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-black/60 hover:bg-gray-50"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  👥 Top Holders
                </button>
              </div>

              {/* Chart Tab Content */}
              {activeTab === "chart" && (
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-400 border-2 border-black rounded"></div>
                        <span className="text-black" style={{ fontWeight: 600 }}>YES {market.yesPrice}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-400 border-2 border-black rounded"></div>
                        <span className="text-black" style={{ fontWeight: 600 }}>NO {market.noPrice}%</span>
                      </div>
                    </div>
                    <div className="text-black/60" style={{ fontWeight: 600 }}>
                      Volume: {market.volume}
                    </div>
                  </div>

                  {/* Recharts Line Chart */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />
                      <XAxis
                        dataKey="time"
                        stroke="#000"
                        style={{ fontWeight: 600 }}
                      />
                      <YAxis
                        stroke="#000"
                        style={{ fontWeight: 600 }}
                        domain={[0, 100]}
                        ticks={[0, 25, 50, 75, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "3px solid black",
                          borderRadius: "8px",
                          fontWeight: 600,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="yes"
                        stroke="#4ade80"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="no"
                        stroke="#f87171"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Top Holders Tab Content */}
              {activeTab === "holders" && (
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* YES Holders */}
                    <div>
                      <h3 className="text-black mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                        <div className="w-6 h-6 bg-green-400 border-2 border-black rounded"></div>
                        YES Holders
                      </h3>
                      <div className="space-y-2">
                        {fakeHolders.yes.map((holder, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-black"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{holder.avatar}</span>
                              <span className="text-black" style={{ fontWeight: 600 }}>
                                {holder.name}
                              </span>
                            </div>
                            <span className="text-green-600" style={{ fontWeight: 700 }}>
                              {formatNumber(holder.shares)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* NO Holders */}
                    <div>
                      <h3 className="text-black mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                        <div className="w-6 h-6 bg-red-400 border-2 border-black rounded"></div>
                        NO Holders
                      </h3>
                      <div className="space-y-2">
                        {fakeHolders.no.map((holder, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-black"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{holder.avatar}</span>
                              <span className="text-black" style={{ fontWeight: 600 }}>
                                {holder.name}
                              </span>
                            </div>
                            <span className="text-red-600" style={{ fontWeight: 700 }}>
                              {formatNumber(holder.shares)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            {/* YES/NO Prices */}
            <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <h3 className="text-black mb-4 text-center" style={{ fontWeight: 700 }}>
                Current Prices
              </h3>

              {/* YES Button */}
              <button
                onClick={() => handleTradeClick("YES")}
                className="w-full bg-green-400 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all p-4 mb-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-black text-lg" style={{ fontWeight: 700 }}>YES</span>
                  <span className="text-black text-2xl" style={{ fontWeight: 700 }}>{market.yesPrice}%</span>
                </div>
              </button>

              {/* NO Button */}
              <button
                onClick={() => handleTradeClick("NO")}
                className="w-full bg-red-400 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-black text-lg" style={{ fontWeight: 700 }}>NO</span>
                  <span className="text-black text-2xl" style={{ fontWeight: 700 }}>{market.noPrice}%</span>
                </div>
              </button>
            </div>

            {/* Market Stats */}
            <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <h3 className="text-black mb-4" style={{ fontWeight: 700 }}>Market Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                  <span className="text-black/60" style={{ fontWeight: 600 }}>Volume</span>
                  <span className="text-black" style={{ fontWeight: 700 }}>{market.volume}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                  <span className="text-black/60" style={{ fontWeight: 600 }}>Current Views</span>
                  <span className="text-black" style={{ fontWeight: 700 }}>{formattedCurrent}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                  <span className="text-black/60" style={{ fontWeight: 600 }}>Target Views</span>
                  <span className="text-black" style={{ fontWeight: 700 }}>{formattedTarget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/60" style={{ fontWeight: 600 }}>Time Left</span>
                  <span className="text-black" style={{ fontWeight: 700 }}>{market.timeRemaining}</span>
                </div>
              </div>
            </div>

            {/* Related Markets */}
            <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <h3 className="text-black mb-4" style={{ fontWeight: 700 }}>Related Markets</h3>
              <div className="space-y-2 text-sm">
                <Link href="/market/2">
                  <div className="p-3 bg-orange-100 rounded-xl border-2 border-black hover:bg-orange-200 transition-colors cursor-pointer">
                    <p className="text-black truncate" style={{ fontWeight: 600 }}>
                      MrBeast giveaway - 170M views?
                    </p>
                    <p className="text-black/60 text-xs">YES 82%</p>
                  </div>
                </Link>
                <Link href="/market/3">
                  <div className="p-3 bg-purple-100 rounded-xl border-2 border-black hover:bg-purple-200 transition-colors cursor-pointer">
                    <p className="text-black truncate" style={{ fontWeight: 600 }}>
                      Taylor Swift album - 300M views?
                    </p>
                    <p className="text-black/60 text-xs">YES 91%</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trading Modal */}
      <TradingModal
        isOpen={tradingModalOpen}
        onClose={() => setTradingModalOpen(false)}
        marketId={market.id}
        marketTitle={`Will this hit ${formattedTarget} views in 24h?`}
        outcome={selectedOutcome}
        currentPrice={selectedOutcome === "YES" ? market.yesPrice : market.noPrice}
        username={market.username}
        displayName={market.displayName}
        color={market.color}
      />
    </div>
  );
}
