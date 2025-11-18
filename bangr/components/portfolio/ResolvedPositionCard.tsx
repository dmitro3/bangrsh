import { RedeemButton } from "@/components/RedeemButton";

interface ResolvedPosition {
  marketId: number;
  outcome: string;
  shares: number;
  username: string;
  displayName: string;
  marketTitle: string;
  status: number; // 1=YES, 2=NO, 3=INVALID
  isRedeemable: boolean;
  redeemableAmount: number | null;
}

interface ResolvedPositionCardProps {
  position: ResolvedPosition;
  onRedeem: () => void;
}

export function ResolvedPositionCard({
  position,
  onRedeem,
}: ResolvedPositionCardProps) {
  // Determine resolution status
  const status = position.status;
  const statusLabels = [
    "",
    "Resolved YES ✅",
    "Resolved NO ❌",
    "Resolved INVALID ⚠️",
  ];
  const statusLabel = statusLabels[status] || "Unknown";

  // Determine if user won
  const isWon =
    position.isRedeemable && (position.redeemableAmount || 0) > 0;

  return (
    <div
      className={`${
        isWon
          ? "bg-gradient-to-br from-green-300 to-green-400"
          : "bg-gradient-to-br from-gray-300 to-gray-400"
      } nb-border nb-shadow p-5`}
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
              <p className="text-black mb-2" style={{ fontWeight: 500 }}>
                {position.marketTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap mb-4">
            <div className="px-4 py-2 rounded-full border-3 border-black bg-white">
              <span className="text-black" style={{ fontWeight: 700 }}>
                {statusLabel}
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-full border-3 border-black ${
                position.outcome === "YES" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span className="text-white" style={{ fontWeight: 700 }}>
                {position.outcome} {position.shares.toFixed(2)} shares
              </span>
            </div>
          </div>

          {/* Redeem Button */}
          {position.isRedeemable &&
          position.redeemableAmount &&
          position.redeemableAmount > 0 ? (
            <RedeemButton
              marketId={position.marketId}
              outcome={position.outcome}
              shares={position.shares}
              redeemableAmount={position.redeemableAmount}
              onSuccess={onRedeem}
            />
          ) : (
            <div className="p-3 bg-gray-100 border-2 border-gray-300 rounded-lg">
              <p className="text-sm text-gray-600" style={{ fontWeight: 600 }}>
                {position.isRedeemable
                  ? "Position already redeemed"
                  : "No payout available (position lost)"}
              </p>
            </div>
          )}
        </div>

        {/* Right: Result Stats */}
        <div className="bg-white rounded-xl border-3 border-black p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
              <span className="text-black/60" style={{ fontWeight: 600 }}>
                Shares
              </span>
              <span className="text-black" style={{ fontWeight: 700 }}>
                {position.shares.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b-2 border-black/10">
              <span className="text-black/60" style={{ fontWeight: 600 }}>
                Payout
              </span>
              <span className="text-black" style={{ fontWeight: 700 }}>
                ${(position.redeemableAmount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black/60" style={{ fontWeight: 600 }}>
                Result
              </span>
              <span
                className={`${isWon ? "text-green-600" : "text-red-600"}`}
                style={{ fontWeight: 700 }}
              >
                {isWon ? "✓ Won" : "✗ Lost"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
