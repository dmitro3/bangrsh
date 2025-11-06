import { Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="text-8xl mb-6">💥</div>
      <h3 className="text-3xl text-white mb-2" style={{ fontWeight: 700 }}>No markets yet!</h3>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Be the first to create a prediction market and start betting on Twitter engagement.
      </p>
      <button
        onClick={onCreateClick}
        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex items-center gap-2"
        style={{ fontWeight: 700 }}
      >
        <Plus className="w-5 h-5" strokeWidth={3} />
        Create Your First Market
      </button>
    </div>
  );
}
