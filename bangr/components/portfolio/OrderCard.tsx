import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";

interface Order {
  orderId: number;
  marketId: number;
  outcome: string;
  shares: number;
  pricePerShare: number;
  totalCost: number;
}

interface OrderCardProps {
  order: Order;
  marketTitle: string;
  username: string;
  displayName: string;
}

export function OrderCard({ order, marketTitle, username, displayName }: OrderCardProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 nb-pattern-dots nb-border nb-shadow p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Market Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white"
              style={{ fontWeight: 700 }}
            >
              {username[0].toUpperCase()}
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
                  {displayName}
                </span>
                <span className="text-black/70">@{username}</span>
              </div>
              <p className="text-black" style={{ fontWeight: 500 }}>
                {marketTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-3 border-black bg-white">
              <Clock className="w-4 h-4" strokeWidth={3} />
              <span className="text-black" style={{ fontWeight: 700 }}>
                Pending
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-full border-3 border-black ${
                order.outcome === "YES" ? "bg-green-400" : "bg-red-400"
              }`}
            >
              <span className="text-black" style={{ fontWeight: 700 }}>
                {order.outcome} @ ${order.pricePerShare.toFixed(2)}
              </span>
            </div>
            <Link href={`/market/${order.marketId}`}>
              <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl border-2 border-black hover:bg-gray-100 transition-colors">
                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                <span style={{ fontWeight: 600 }}>View Market</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Order Stats */}
        <div className="bg-white nb-border text-xs">
          <div className="px-3 py-1 border-b border-black bg-neutral-100 flex items-center justify-between">
            <span className="font-semibold uppercase tracking-wide text-[10px] text-black/70">
              Order summary
            </span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-black/10">
              <span className="text-black/60 font-semibold">Shares</span>
              <span className="text-black font-bold text-sm">
                {order.shares.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-black/10">
              <span className="text-black/60 font-semibold">Price per share</span>
              <span className="text-black font-bold text-sm">
                ${order.pricePerShare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black/60 font-semibold">USDC locked</span>
              <span className="text-black font-bold text-sm">
                ${order.totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
