import { Clock } from "lucide-react";

interface BangrCardProps {
  username: string;
  timeAgo: string;
  tweetText: string;
  tweetImage?: string;
  currentViews: number;
  targetViews: number;
  yesPrice: number;
  noPrice: number;
  timeRemaining: string;
  volume: string;
  bettors: number;
  isClaimed?: boolean;
  claimedBy?: string;
  isEndingSoon?: boolean;
  isHighVolume?: boolean;
  isResolved?: boolean;
  outcome?: "yes" | "no";
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function BangrCard({
  username,
  timeAgo,
  tweetText,
  tweetImage,
  currentViews,
  targetViews,
  yesPrice,
  noPrice,
  timeRemaining,
  volume,
  bettors,
  isClaimed = false,
  claimedBy,
  isEndingSoon = false,
  isHighVolume = false,
  isResolved = false,
  outcome
}: BangrCardProps) {
  const progressPercentage = (currentViews / targetViews) * 100;
  const formattedCurrent = formatViews(currentViews);
  const formattedTarget = formatViews(targetViews);

  // Truncate tweet text to 100 characters
  const truncatedText = tweetText.length > 100 
    ? tweetText.substring(0, 100) + "..." 
    : tweetText;

  return (
    <div 
      className={`relative bg-white rounded-2xl border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all duration-200 p-5 w-full max-w-[360px] ${
        isResolved ? 'opacity-70' : ''
      } ${isClaimed ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-white' : ''}`}
      style={{ height: '500px' }}
    >
      {/* HEADER (50px) */}
      <div className="flex items-center justify-between mb-4" style={{ height: '50px' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black flex items-center justify-center text-white flex-shrink-0">
            {username[0].toUpperCase()}
          </div>
          <span className="text-sm text-gray-600">@{username} • {timeAgo}</span>
        </div>
        {isClaimed && claimedBy && (
          <div className="bg-yellow-400 border-2 border-black px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
            <span className="text-xs">🔥</span>
          </div>
        )}
        {isHighVolume && !isClaimed && (
          <div className="bg-orange-400 border-2 border-black px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
            <span className="text-xs">🔥 HOT</span>
          </div>
        )}
      </div>

      {/* TWEET CONTENT (120px) */}
      <div className="mb-4" style={{ height: '120px' }}>
        {tweetImage && (
          <img 
            src={tweetImage} 
            alt="Tweet" 
            className="w-full h-20 object-cover rounded-lg border-2 border-black mb-2" 
          />
        )}
        <p className="text-sm text-gray-800 line-clamp-2">
          {truncatedText}
        </p>
      </div>

      {/* MARKET QUESTION (60px) */}
      <div className="mb-4" style={{ height: '60px' }}>
        <h3 className="text-xl leading-tight" style={{ fontWeight: 700, color: '#1A1A1A' }}>
          Will this hit <span className="text-yellow-500">{formattedTarget}</span> views in 24h?
        </h3>
      </div>

      {/* PROGRESS INDICATOR (40px) */}
      <div className="mb-4" style={{ height: '40px' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">📊 {formattedCurrent} / {formattedTarget}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 to-green-400 transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* TRADE BUTTONS (100px) */}
      <div className="flex gap-3 mb-4" style={{ height: '100px' }}>
        <button 
          className={`flex-1 bg-teal-400 border-4 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-150 ${
            isResolved ? 'cursor-not-allowed opacity-60' : ''
          } ${outcome === 'yes' ? 'ring-4 ring-green-500' : ''}`}
          disabled={isResolved}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>YES</span>
            <span className="text-2xl text-white" style={{ fontWeight: 700 }}>${yesPrice.toFixed(2)}</span>
            {outcome === 'yes' && <span className="text-lg mt-1">✅</span>}
          </div>
        </button>
        
        <button 
          className={`flex-1 bg-red-400 border-4 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-150 ${
            isResolved ? 'cursor-not-allowed opacity-60' : ''
          } ${outcome === 'no' ? 'ring-4 ring-green-500' : ''}`}
          disabled={isResolved}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>NO</span>
            <span className="text-2xl text-white" style={{ fontWeight: 700 }}>${noPrice.toFixed(2)}</span>
            {outcome === 'no' && <span className="text-lg mt-1">✅</span>}
          </div>
        </button>
      </div>

      {/* METADATA (60px) */}
      <div className="flex items-center justify-between text-sm" style={{ height: '60px' }}>
        <div className={`flex items-center gap-1 ${isEndingSoon ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
          <Clock className="w-4 h-4" />
          <span>{timeRemaining} left</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <span>💰</span>
          <span>{volume}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <span>👥</span>
          <span>{bettors}</span>
        </div>
      </div>

      {/* Resolved Overlay */}
      {isResolved && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-2xl">
          <div className="bg-black text-white px-6 py-3 rounded-xl border-4 border-yellow-400 transform rotate-[-12deg] shadow-lg">
            <span className="text-2xl" style={{ fontWeight: 900 }}>RESOLVED</span>
          </div>
        </div>
      )}
    </div>
  );
}
