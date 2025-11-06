import { useState } from "react";
import { X, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { Input } from "./ui/input";

interface BuySharesModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: string;
  side: "YES" | "NO";
  currentPrice: number;
  onBuy: (shares: number, side: "YES" | "NO") => void;
}

export function BuySharesModal({
  isOpen,
  onClose,
  marketId,
  side,
  currentPrice,
  onBuy,
}: BuySharesModalProps) {
  const [shares, setShares] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const sharesNum = parseFloat(shares) || 0;
  const totalCost = sharesNum * currentPrice;
  const slippage = 0.02; // 2% slippage
  const estimatedCost = totalCost * (1 + slippage);
  const minPayout = sharesNum * 0.96; // After 4% fees

  const handleBuy = async () => {
    if (sharesNum <= 0) return;
    setIsLoading(true);
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      onBuy(sharesNum, side);
      onClose();
      setShares("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl border-6 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
            Buy {side} Shares
          </h2>
          <p className="text-gray-600">
            Current price: <span className="font-bold">${currentPrice.toFixed(2)}</span> per share
          </p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="block text-sm mb-2" style={{ fontWeight: 500 }}>
            Number of Shares
          </label>
          <Input
            type="number"
            placeholder="0"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="h-14 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-2xl text-center"
            style={{ fontWeight: 700 }}
          />
        </div>

        {/* Transaction Details */}
        {sharesNum > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-3 border-black">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cost per share:</span>
                <span className="font-bold">${currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total cost:</span>
                <span className="font-bold">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Platform fee (4%):</span>
                <span className="text-gray-600">-${(totalCost * 0.04).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Creator fee (1%):</span>
                <span className="text-gray-600">-${(totalCost * 0.01).toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Max payout if {side} wins:</span>
                  <span className="text-lg font-bold text-green-600">
                    ${minPayout.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Slippage warning: Price may change by up to 2% during execution. Estimated cost: <span className="font-bold">${estimatedCost.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Gasless Badge */}
        <div className="mb-4 flex items-center justify-center gap-2 p-2 bg-green-100 border-2 border-green-400 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-800" style={{ fontWeight: 600 }}>
            Gasless transaction via Biconomy Account Abstraction
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
            style={{ fontWeight: 600 }}
          >
            Cancel
          </button>
          <button
            onClick={handleBuy}
            disabled={sharesNum <= 0 || isLoading}
            className={`flex-1 px-6 py-4 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              side === "YES"
                ? "bg-gradient-to-r from-teal-400 to-green-400 text-white"
                : "bg-gradient-to-r from-red-400 to-pink-400 text-white"
            }`}
            style={{ fontWeight: 700 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Buy ${side} 🚀`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


