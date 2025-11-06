import { useState } from "react";
import { Search, TrendingUp, MessageCircle, Repeat2, Heart, Eye, Plus } from "lucide-react";
import { Input } from "./components/ui/input";

// Bangr market data - Twitter engagement betting with standardized formula
const marketData = [
  {
    id: 1,
    username: "elonmusk",
    displayName: "Elon M...",
    timeAgo: "2h",
    tweetText: "Just launched the new Starship prototype. This is going to be epic! 🚀",
    tweetImage: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=300&fit=crop",
    currentViews: 2600000, // 2.6M
    targetViews: 52000000, // 52M (current × 20)
    yesPrice: 68,
    noPrice: 32,
    comments: 1200,
    retweets: 3800,
    likes: 8900,
    volume: "$45K",
    color: "bg-yellow-400"
  },
  {
    id: 2,
    username: "MrBeast",
    displayName: "MrBeast",
    timeAgo: "1h",
    tweetText: "I gave away $1,000,000 to random people. Watch the full video to see their reactions!",
    currentViews: 8500000, // 8.5M
    targetViews: 170000000, // 170M
    yesPrice: 82,
    noPrice: 18,
    comments: 2300,
    retweets: 5700,
    likes: 12300,
    volume: "$128K",
    color: "bg-orange-500"
  },
  {
    id: 3,
    username: "taylorswift13",
    displayName: "Taylor ...",
    timeAgo: "30m",
    tweetText: "Announcing my brand new album! Pre-save link in bio. This era is going to be special ✨",
    tweetImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    currentViews: 15000000, // 15M
    targetViews: 300000000, // 300M
    yesPrice: 91,
    noPrice: 9,
    comments: 4600,
    retweets: 8900,
    likes: 23400,
    volume: "$203K",
    color: "bg-purple-500"
  },
  {
    id: 4,
    username: "cristiano",
    displayName: "Cristiano",
    timeAgo: "4h",
    tweetText: "SIUUUUUU! What a goal tonight. Thanks to all the fans for the support 🙏⚽",
    tweetImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    currentViews: 3200000, // 3.2M
    targetViews: 64000000, // 64M
    yesPrice: 34,
    noPrice: 66,
    comments: 890,
    retweets: 2340,
    likes: 6780,
    volume: "$89K",
    color: "bg-blue-500"
  },
  {
    id: 5,
    username: "rihanna",
    displayName: "Rihanna",
    timeAgo: "2h",
    tweetText: "Super Bowl halftime show rehearsals 💎✨",
    tweetImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    currentViews: 6800000, // 6.8M
    targetViews: 136000000, // 136M
    yesPrice: 73,
    noPrice: 27,
    comments: 1560,
    retweets: 4230,
    likes: 9870,
    volume: "$112K",
    color: "bg-pink-500"
  },
  {
    id: 6,
    username: "KimKardashian",
    displayName: "Kim K...",
    timeAgo: "3h",
    tweetText: "SKIMS new collection drops tonight at midnight! You don't want to miss this 🔥",
    tweetImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    currentViews: 4500000, // 4.5M
    targetViews: 90000000, // 90M
    yesPrice: 88,
    noPrice: 12,
    comments: 2340,
    retweets: 5670,
    likes: 13450,
    volume: "$156K",
    color: "bg-red-500"
  }
];

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

interface BangrCardProps {
  username: string;
  displayName: string;
  timeAgo: string;
  tweetText: string;
  tweetImage?: string;
  currentViews: number;
  targetViews: number;
  yesPrice: number;
  noPrice: number;
  comments: number;
  retweets: number;
  likes: number;
  volume: string;
  color: string;
}

function BangrCard({
  username,
  displayName,
  timeAgo,
  tweetText,
  tweetImage,
  currentViews,
  targetViews,
  yesPrice,
  noPrice,
  comments,
  retweets,
  likes,
  volume,
  color
}: BangrCardProps) {
  const formattedTarget = formatViews(targetViews);

  return (
    <div className={`${color} rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all duration-200 p-4`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-3 border-black flex items-center justify-center text-white flex-shrink-0" style={{ fontWeight: 700 }}>
          {username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white truncate" style={{ 
              fontWeight: 700, 
              textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 2px 2px 0 #000'
            }}>{displayName}</span>
            <span className="text-black/70 text-sm">@{username}</span>
          </div>
          <span className="text-black/70 text-sm">{timeAgo}</span>
        </div>
      </div>

      {/* Tweet Content in White Box */}
      <div className="bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 mb-3">
        <p className="text-black" style={{ fontWeight: 500 }}>
          {tweetText}
        </p>
      </div>

      {/* Tweet Image with Border */}
      {tweetImage && (
        <div className="mb-3">
          <img 
            src={tweetImage} 
            alt="Tweet" 
            className="w-full rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
          />
        </div>
      )}

      {/* Market Question in White Box */}
      <div className="bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 mb-3">
        <h3 className="text-black leading-tight" style={{ fontWeight: 700 }}>
          Will this hit <span className="text-orange-500">{formattedTarget}</span> views in 24h?
        </h3>
      </div>

      {/* YES Option with Border */}
      <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 mb-2 hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-black" style={{ fontWeight: 700 }}>YES</span>
          <div className="bg-green-400 px-3 py-1 rounded-full border-3 border-black">
            <span className="text-black" style={{ fontWeight: 700 }}>{yesPrice}%</span>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
          <div 
            className="h-full bg-green-400"
            style={{ width: `${yesPrice}%` }}
          />
        </div>
      </div>

      {/* NO Option with Border */}
      <div className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 mb-3 hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-black" style={{ fontWeight: 700 }}>NO</span>
          <div className="bg-red-400 px-3 py-1 rounded-full border-3 border-black">
            <span className="text-black" style={{ fontWeight: 700 }}>{noPrice}%</span>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
          <div 
            className="h-full bg-red-400"
            style={{ width: `${noPrice}%` }}
          />
        </div>
      </div>

      {/* Twitter-style engagement metrics */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-black hover:text-black/70 transition-colors">
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(comments)}</span>
        </button>
        <button className="flex items-center gap-1 text-black hover:text-black/70 transition-colors">
          <Repeat2 className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(retweets)}</span>
        </button>
        <button className="flex items-center gap-1 text-black hover:text-black/70 transition-colors">
          <Heart className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm" style={{ fontWeight: 600 }}>{formatNumber(likes)}</span>
        </button>
        <button className="flex items-center gap-1 text-black hover:text-black/70 transition-colors">
          <Eye className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm" style={{ fontWeight: 600 }}>{formatViews(currentViews)}</span>
        </button>
      </div>
    </div>
  );
}

const categories = ["Hot", "New", "Closing", "Big Bets", "Resolved"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Hot");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-pink-400 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 border-4 border-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-4 border-blue-400 rotate-12"></div>
      </div>

      {/* Header */}
      <header className="border-b-6 border-black bg-gradient-to-r from-yellow-400 to-orange-500 sticky top-0 z-50 shadow-[0_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="w-7 h-7 text-black" strokeWidth={3} />
              </div>
              <h1 className="text-black text-2xl" style={{ fontWeight: 700 }}>Bangr</h1>
              <div className="bg-white px-3 py-1 rounded-full border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-lg">💥</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60" strokeWidth={3} />
                <Input 
                  placeholder="Search markets..." 
                  className="pl-12 bg-white border-4 border-black text-black placeholder:text-black/50 h-12 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-3 bg-white text-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center gap-2" style={{ fontWeight: 700 }}>
                <Plus className="w-5 h-5" strokeWidth={3} />
                Create
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all" style={{ fontWeight: 700 }}>
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <div className="bg-white px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" strokeWidth={3} />
                <span className="text-black whitespace-nowrap" style={{ fontWeight: 600 }}>Trending</span>
              </div>
            </div>
            {categories.map((category) => (
              <div 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all ${
                  activeCategory === category ? 'bg-white' : 'bg-yellow-300'
                }`}
              >
                <span className="text-black whitespace-nowrap" style={{ fontWeight: 600 }}>{category}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Formula Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-black" style={{ fontWeight: 700 }}>📊 Formula:</span>
            <div className="bg-white px-3 py-1.5 rounded-xl border-2 border-black">
              <span className="text-black" style={{ fontWeight: 600 }}>Target = Current Views × 20</span>
            </div>
            <span className="text-black">•</span>
            <div className="bg-white px-3 py-1.5 rounded-xl border-2 border-black">
              <span className="text-black" style={{ fontWeight: 600 }}>24h Timeframe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketData.map((market) => (
            <BangrCard key={market.id} {...market} />
          ))}
        </div>
      </main>
    </div>
  );
}
