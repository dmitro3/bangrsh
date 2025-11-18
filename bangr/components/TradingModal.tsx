"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { Toast } from "./Toast";
import confetti from "canvas-confetti";

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: number;
  marketTitle: string;
  outcome: "YES" | "NO";
  currentPrice: number;
  username: string;
  displayName: string;
  color: string;
}

export function TradingModal({
  isOpen,
  onClose,
  marketId,
  marketTitle,
  outcome,
  currentPrice,
  username,
  displayName,
  color,
}: TradingModalProps) {
  const { balance, isConnected, spendBalance } = useWallet();
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const shares = numAmount > 0 ? (numAmount / currentPrice) * 100 : 0;
  const priceImpact = numAmount > 500 ? ((numAmount - 500) / 500) * 2 : 0;
  const finalPrice = currentPrice + priceImpact;
  const avgPrice = numAmount > 0 ? (numAmount / shares) * 100 : currentPrice;

  const handleTrade = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (numAmount > balance) {
      alert("Insufficient balance");
      return;
    }

    setIsProcessing(true);

    // Simulate transaction
    setTimeout(() => {
      // Spend balance
      const success = spendBalance(numAmount);

      if (success) {
        // Note: This component is deprecated - use TradeWidget instead
        // Position tracking is handled by blockchain state

        // Fire confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: outcome === "YES" ? ["#4ade80", "#22c55e", "#16a34a"] : ["#f87171", "#ef4444", "#dc2626"],
        });

        // Show toast
        setToastMessage(`Successfully bought ${shares.toFixed(2)} ${outcome} shares for $${numAmount.toFixed(2)}!`);
        setShowToast(true);

        setIsProcessing(false);
        setAmount("");
        onClose();
      } else {
        alert("Transaction failed");
        setIsProcessing(false);
      }
    }, 2000);
  };

  const outcomeColor = outcome === "YES" ? "from-green-400 to-green-500" : "from-red-400 to-red-500";
  const outcomeColorSolid = outcome === "YES" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
        {/* Header */}
        <div className={`bg-gradient-to-br ${outcomeColor} p-6 rounded-t-xl border-b-6 border-black relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-lg border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-sm font-bold text-black mb-2">BUY {outcome} SHARES</div>
          <div className="text-xs text-black/80 pr-12">{marketTitle}</div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold mb-2">Amount (USDC)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border-4 border-black text-lg font-bold focus:outline-none focus:ring-4 focus:ring-purple-400"
                step="0.01"
                min="0"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                USDC
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Available: ${balance.toFixed(2)} USDC
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[10, 25, 50, 100].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="px-3 py-2 bg-gray-100 rounded-lg border-3 border-black hover:bg-gray-200 hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all text-sm font-bold"
              >
                ${quickAmount}
              </button>
            ))}
          </div>

          {/* Trade Details */}
          {numAmount > 0 && (
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl border-4 border-black space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold">Shares</span>
                <span className="font-bold">{shares.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold">Avg Price</span>
                <span className="font-bold">{avgPrice.toFixed(2)}¢</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold">Price Impact</span>
                <span className={`font-bold ${priceImpact > 5 ? 'text-red-600' : 'text-green-600'}`}>
                  {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
                </span>
              </div>
              <div className="border-t-3 border-black pt-2 mt-2 flex justify-between">
                <span className="font-bold">Total Cost</span>
                <span className="font-bold text-lg">${numAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Warning */}
          {priceImpact > 5 && (
            <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-3">
              <div className="text-xs font-bold text-yellow-800">
                ⚠️ High price impact! Consider splitting your order.
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleTrade}
            disabled={!isConnected || numAmount <= 0 || numAmount > balance || isProcessing}
            className={`w-full py-4 rounded-xl border-4 border-black font-bold text-white text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${outcomeColorSolid}`}
          >
            {isProcessing ? "Processing..." : !isConnected ? "Connect Wallet" : `Buy ${outcome} Shares`}
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
