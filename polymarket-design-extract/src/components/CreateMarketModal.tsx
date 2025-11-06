import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Input } from "./ui/input";

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMarketModal({ isOpen, onClose }: CreateMarketModalProps) {
  const [tweetUrl, setTweetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<{
    username: string;
    text: string;
    currentViews: number;
    targetViews: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleUrlChange = (url: string) => {
    setTweetUrl(url);
    
    // Simulate fetching tweet data
    if (url.includes('twitter.com') || url.includes('x.com')) {
      // Mock preview data
      setPreviewData({
        username: "username",
        text: "This is a preview of the tweet. The actual tweet content will be fetched from the API...",
        currentViews: 2500000,
        targetViews: 2500000 * 20 // Always current × 20
      });
    } else {
      setPreviewData(null);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setTweetUrl("");
      setPreviewData(null);
      onClose();
    }, 2000);
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
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
        className="relative bg-white rounded-2xl border-6 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto"
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
          <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Create Market 💥</h2>
          <p className="text-gray-600">Paste a tweet URL to create a prediction market</p>
          <div className="mt-3 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-800">
              <span style={{ fontWeight: 600 }}>Auto-calculated:</span> Target = Current Views × 20 | Timeframe = 24h
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2" style={{ fontWeight: 500 }}>
            Tweet URL
          </label>
          <Input
            type="url"
            placeholder="https://twitter.com/username/status/..."
            value={tweetUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="h-14 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all text-lg"
          />
        </div>

        {/* Preview */}
        {previewData && (
          <div className="mb-6">
            <label className="block text-sm mb-3" style={{ fontWeight: 500 }}>
              Market Preview
            </label>
            <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              {/* Tweet Preview */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b-2 border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">@{previewData.username} • Now</p>
                  <p className="text-gray-800 text-sm line-clamp-2">{previewData.text}</p>
                </div>
              </div>

              {/* Market Question */}
              <div className="mb-4">
                <p className="text-lg" style={{ fontWeight: 700 }}>
                  Will this hit <span className="text-yellow-600">{formatViews(previewData.targetViews)}</span> views in 24h?
                </p>
              </div>

              {/* Current Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border-2 border-black">
                  <p className="text-xs text-gray-600 mb-1">Current Views</p>
                  <p className="text-xl" style={{ fontWeight: 700 }}>{formatViews(previewData.currentViews)}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-black">
                  <p className="text-xs text-gray-600 mb-1">Target Views</p>
                  <p className="text-xl text-yellow-600" style={{ fontWeight: 700 }}>{formatViews(previewData.targetViews)}</p>
                </div>
              </div>

              {/* Formula */}
              <div className="mt-3 p-2 bg-white/50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 text-center">
                  Target = {formatViews(previewData.currentViews)} × 20 = {formatViews(previewData.targetViews)}
                </p>
              </div>

              {/* External Link */}
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                <ExternalLink className="w-4 h-4" />
                <span>View on Twitter</span>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!previewData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <h4 className="text-sm mb-2" style={{ fontWeight: 600 }}>How it works:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Paste any tweet URL</li>
              <li>• We fetch current view count automatically</li>
              <li>• Target is always <span style={{ fontWeight: 600 }}>current views × 20</span></li>
              <li>• Market runs for exactly <span style={{ fontWeight: 600 }}>24 hours</span></li>
              <li>• Question: "Will this hit [target] views in 24h?"</li>
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
            style={{ fontWeight: 600 }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!previewData || isLoading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ fontWeight: 700 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Market 🚀"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
