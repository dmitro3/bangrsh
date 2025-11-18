"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { useUserPositions } from "@/lib/hooks/useUserPositions";
import { useUserOrders } from "@/lib/hooks/useUserOrders";
import { useWallet } from "@/contexts/WalletContext";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PositionCard } from "@/components/portfolio/PositionCard";
import { OrderCard } from "@/components/portfolio/OrderCard";
import { EmptyState } from "@/components/portfolio/EmptyState";
import { ResolvedPositionCard } from "@/components/portfolio/ResolvedPositionCard";

export default function PortfolioPage() {
  const { positions, isLoading, getTotalInvested, getTotalValue, getTotalProfitLoss, refetch } = useUserPositions();
  const { orders, isLoading: ordersLoading, getTotalLocked } = useUserOrders();
  const { address, disconnect } = useWallet();

  // Separate active and resolved positions
  const activePositions = positions.filter(p => p.status === 0); // PENDING
  const resolvedPositions = positions.filter(p => p.status !== 0); // RESOLVED_YES, RESOLVED_NO, RESOLVED_INVALID

  // Calculate totals from active positions only
  const totalInvested = getTotalInvested();
  const totalCurrentValue = getTotalValue();
  const totalProfitLoss = getTotalProfitLoss();
  const totalProfitLossPercent = totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(1) : '0.0';

  // Add locked USDC in pending orders
  const totalLocked = getTotalLocked();
  const totalCapital = totalInvested + totalLocked; // Total capital deployed

  const resolvedProfit = 0; // TODO: Calculate from resolved positions
  const allTimeProfit = totalProfitLoss + resolvedProfit;
  const allTimePercent =
    totalCapital > 0 ? ((allTimeProfit / totalCapital) * 100).toFixed(1) : "0.0";
  const [portfolioTab, setPortfolioTab] = useState<"positions" | "orders">("positions");

  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="nb-button bg-white text-black px-4 py-2 flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to markets
              </button>
            </Link>
            <div className="px-3 py-1 nb-border bg-yellow-300 font-pixel text-xs uppercase tracking-wide">
              Portfolio
            </div>
          </div>
          {address && (
            <button
              onClick={disconnect}
              className="nb-button bg-red-500 text-white px-4 py-2 text-xs"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Portfolio Summary Cards */}
        <PortfolioStats
          totalCurrentValue={totalCurrentValue}
          totalProfitLoss={totalProfitLoss}
          totalProfitLossPercent={totalProfitLossPercent}
          totalCapital={totalCapital}
          totalInvested={totalInvested}
          totalLocked={totalLocked}
          allTimeProfit={allTimeProfit}
          allTimePercent={allTimePercent}
        />

        {/* Main portfolio body */}
        <section className="space-y-6">
          {/* Positions / Orders container (Polymarket-style tabs) */}
          <div className="bg-white nb-border nb-shadow">
            <div className="px-4 py-2 border-b-2 border-black bg-neutral-900 text-white flex items-center justify-between">
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wide">
                My markets
          </h2>
              <div className="inline-flex gap-2 text-[11px] font-semibold uppercase tracking-wide">
                <button
                  onClick={() => setPortfolioTab("positions")}
                  className={`nb-button px-3 py-1 ${
                    portfolioTab === "positions"
                      ? "bg-yellow-300 text-black"
                      : "bg-white text-black"
                  }`}
                >
                  Positions ({activePositions.length})
                </button>
                <button
                  onClick={() => setPortfolioTab("orders")}
                  className={`nb-button px-3 py-1 ${
                    portfolioTab === "orders"
                      ? "bg-yellow-300 text-black"
                      : "bg-white text-black"
                  }`}
                >
                  Open orders ({orders.length})
                </button>
              </div>
            </div>

            <div className="p-4">
              {portfolioTab === "positions" ? (
                isLoading ? (
                  <EmptyState type="loading-positions" />
                ) : activePositions.length === 0 ? (
                  <EmptyState type="no-positions" />
                ) : (
                  <div className="space-y-4 max-h-[480px] overflow-y-auto no-scrollbar pr-1">
                    {activePositions.map((position) => (
                      <PositionCard
                        key={`${position.marketId}-${position.outcome}`}
                        position={position}
                      />
                    ))}
                  </div>
                )
              ) : ordersLoading ? (
                <EmptyState type="loading-orders" />
              ) : orders.length === 0 ? (
                <EmptyState type="no-orders" />
              ) : (
                <div className="space-y-4 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
                  {orders.map((order) => {
                    const market = positions.find((p) => p.marketId === order.marketId);
                    const marketTitle =
                      market?.marketTitle || `Market #${order.marketId}`;
                    const username = market?.username || "unknown";
                    const displayName = market?.displayName || "Unknown";

                    return (
                      <OrderCard
                        key={order.orderId}
                        order={order}
                        marketTitle={marketTitle}
                        username={username}
                        displayName={displayName}
                      />
                    );
                  })}
                </div>
          )}
            </div>
        </div>

        {/* Resolved Markets */}
          <div className="space-y-4 mt-6 lg:col-span-2">
            <div className="bg-white nb-border nb-shadow">
              <div className="px-4 py-2 border-b-2 border-black bg-neutral-200 flex items-center justify-between">
                <h2 className="text-xs md:text-sm font-bold uppercase tracking-wide">
                  Resolved markets ({resolvedPositions.length})
          </h2>
              </div>
              <div className="p-4">
                {resolvedPositions.length === 0 ? (
                  <EmptyState type="no-resolved" />
                ) : (
                  <div className="space-y-4">
                    {resolvedPositions.map((position) => (
                      <ResolvedPositionCard
                        key={`${position.marketId}-${position.outcome}`}
                        position={position}
                        onRedeem={refetch}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
