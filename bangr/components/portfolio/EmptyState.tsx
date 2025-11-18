import Link from "next/link";
import { Loader2 } from "lucide-react";

interface EmptyStateProps {
  type:
    | "loading-positions"
    | "loading-orders"
    | "no-positions"
    | "no-orders"
    | "no-resolved";
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === "loading-positions") {
    return (
      <div className="bg-white nb-border nb-shadow p-10 text-center">
        <Loader2
          className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-600"
          strokeWidth={3}
        />
        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>
          Loading Positions...
        </h3>
        <p className="text-black/60" style={{ fontWeight: 500 }}>
          Fetching your positions from the blockchain
        </p>
      </div>
    );
  }

  if (type === "loading-orders") {
    return (
      <div className="bg-white nb-border nb-shadow p-10 text-center">
        <Loader2
          className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-600"
          strokeWidth={3}
        />
        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>
          Loading Orders...
        </h3>
        <p className="text-black/60" style={{ fontWeight: 500 }}>
          Fetching your pending orders from the order book
        </p>
      </div>
    );
  }

  if (type === "no-positions") {
    return (
      <div className="bg-white nb-border nb-shadow p-10 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>
          No Active Positions
        </h3>
        <p className="text-black/60 mb-6" style={{ fontWeight: 500 }}>
          Start trading to see your positions here!
        </p>
        <Link href="/">
          <button
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{ fontWeight: 700 }}
          >
            Browse Markets
          </button>
        </Link>
      </div>
    );
  }

  if (type === "no-orders") {
    return (
      <div className="bg-white nb-border nb-shadow p-10 text-center">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>
          No Pending Orders
        </h3>
        <p className="text-black/60 mb-2" style={{ fontWeight: 500 }}>
          All your orders have been filled or you haven't placed any yet.
        </p>
      </div>
    );
  }

  if (type === "no-resolved") {
    return (
      <div className="bg-white nb-border nb-shadow p-10 text-center">
        <div className="text-4xl mb-4">🏁</div>
        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>
          No Resolved Markets
        </h3>
        <p className="text-black/60" style={{ fontWeight: 500 }}>
          Markets you've participated in will appear here once they're resolved
        </p>
      </div>
    );
  }

  return null;
}
