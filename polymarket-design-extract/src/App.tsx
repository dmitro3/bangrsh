import { Search, Plus, Home, User } from "lucide-react";
import { BangrCard } from "./components/BangrCard";
import { CreateMarketModal } from "./components/CreateMarketModal";
import { EmptyState } from "./components/EmptyState";
import { Input } from "./components/ui/input";
import { useState } from "react";

const marketData = [
  {
    username: "elonmusk",
    timeAgo: "3h ago",
    tweetText: "Just launched the new Starship prototype. This is going to be epic! 🚀",
    currentViews: 2600000, // 2.6M
    targetViews: 2600000 * 20, // 52M (current × 20)
    yesPrice: 0.68,
    noPrice: 0.32,
    timeRemaining: "21h",
    volume: "$45K",
    bettors: 234,
    isClaimed: true,
    claimedBy: "elonmusk",
    isHighVolume: false
  },
  {
    username: "MrBeast",
    timeAgo: "1h ago",
    tweetText: "I gave away $1,000,000 to random people. Watch the full video to see their reactions!",
    currentViews: 8500000, // 8.5M
    targetViews: 8500000 * 20, // 170M
    yesPrice: 0.82,
    noPrice: 0.18,
    timeRemaining: "23h",
    volume: "$128K",
    bettors: 567,
    isEndingSoon: false,
    isHighVolume: true
  },
  {
    username: "kanyewest",
    timeAgo: "6h ago",
    tweetText: "New album dropping Friday. Trust me on this one.",
    currentViews: 1200000, // 1.2M
    targetViews: 1200000 * 20, // 24M
    yesPrice: 0.45,
    noPrice: 0.55,
    timeRemaining: "18h",
    volume: "$67K",
    bettors: 189
  },
  {
    username: "taylorswift13",
    timeAgo: "30m ago",
    tweetText: "Announcing my brand new album! Pre-save link in bio. This era is going to be special ✨",
    tweetImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    currentViews: 15000000, // 15M
    targetViews: 15000000 * 20, // 300M
    yesPrice: 0.91,
    noPrice: 0.09,
    timeRemaining: "23h",
    volume: "$203K",
    bettors: 892,
    isHighVolume: true
  },
  {
    username: "cristiano",
    timeAgo: "12h ago",
    tweetText: "SIUUUUUU! What a goal tonight. Thanks to all the fans for the support 🙏⚽",
    tweetImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    currentViews: 3200000, // 3.2M
    targetViews: 3200000 * 20, // 64M
    yesPrice: 0.34,
    noPrice: 0.66,
    timeRemaining: "12h",
    volume: "$89K",
    bettors: 445,
    isResolved: true,
    outcome: "no"
  },
  {
    username: "rihanna",
    timeAgo: "2h ago",
    tweetText: "Super Bowl halftime show rehearsals 💎✨",
    tweetImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    currentViews: 6800000, // 6.8M
    targetViews: 6800000 * 20, // 136M
    yesPrice: 0.73,
    noPrice: 0.27,
    timeRemaining: "22h",
    volume: "$112K",
    bettors: 623,
    isHighVolume: true
  },
  {
    username: "BillGates",
    timeAgo: "8h ago",
    tweetText: "Climate change is the biggest challenge of our generation. Here's what we can do about it 🌍",
    currentViews: 890000, // 890K
    targetViews: 890000 * 20, // 17.8M
    yesPrice: 0.56,
    noPrice: 0.44,
    timeRemaining: "16h",
    volume: "$34K",
    bettors: 156
  },
  {
    username: "KimKardashian",
    timeAgo: "4h ago",
    tweetText: "SKIMS new collection drops tonight at midnight! You don't want to miss this 🔥",
    tweetImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    currentViews: 4500000, // 4.5M
    targetViews: 4500000 * 20, // 90M
    yesPrice: 0.88,
    noPrice: 0.12,
    timeRemaining: "20h",
    volume: "$156K",
    bettors: 734,
    isHighVolume: true,
    isClaimed: true,
    claimedBy: "KimKardashian"
  },
  {
    username: "nasa",
    timeAgo: "5h ago",
    tweetText: "Webb telescope captures stunning new images of distant galaxies 🌌",
    tweetImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    currentViews: 2100000, // 2.1M
    targetViews: 2100000 * 20, // 42M
    yesPrice: 0.62,
    noPrice: 0.38,
    timeRemaining: "19h",
    volume: "$78K",
    bettors: 312
  },
  {
    username: "POTUS",
    timeAgo: "7h ago",
    tweetText: "Major announcement coming tomorrow. Stay tuned 🇺🇸",
    currentViews: 5600000, // 5.6M
    targetViews: 5600000 * 20, // 112M
    yesPrice: 0.77,
    noPrice: 0.23,
    timeRemaining: "17h",
    volume: "$94K",
    bettors: 421,
    isEndingSoon: false
  },
  {
    username: "Drake",
    timeAgo: "45m ago",
    tweetText: "New music video out now. Link in bio. Let's break the internet 🎵",
    tweetImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    currentViews: 7200000, // 7.2M
    targetViews: 7200000 * 20, // 144M
    yesPrice: 0.85,
    noPrice: 0.15,
    timeRemaining: "23h",
    volume: "$145K",
    bettors: 678,
    isHighVolume: true
  },
  {
    username: "TheRock",
    timeAgo: "4h ago",
    tweetText: "Blood, sweat, and respect. First two you give, last one you earn. Let's get it 💪",
    currentViews: 3400000, // 3.4M
    targetViews: 3400000 * 20, // 68M
    yesPrice: 0.58,
    noPrice: 0.42,
    timeRemaining: "20h",
    volume: "$56K",
    bettors: 289
  }
];

const filters = [
  { icon: "🔥", label: "Hot" },
  { icon: "⚡", label: "New" },
  { icon: "🎯", label: "Closing" },
  { icon: "💰", label: "Big Bets" },
  { icon: "✅", label: "Resolved" }
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-orange-500 border-b-4 border-black sticky top-0 z-50 shadow-[0_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Desktop Header */}
          <div className="hidden md:flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-4xl">💥</div>
              <div>
                <h1 className="text-3xl text-black" style={{ fontWeight: 900 }}>BANGR</h1>
                <p className="text-xs text-black/70">bangr.lol</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <Input 
                  placeholder="Search markets..." 
                  className="pl-12 bg-white border-4 border-black text-black placeholder:text-gray-400 h-12 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 bg-black text-white rounded-lg border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-150 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" strokeWidth={3} />
                <span>Create Market</span>
              </button>
              <button className="px-5 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="text-3xl">💥</div>
                <div>
                  <h1 className="text-2xl text-black" style={{ fontWeight: 900 }}>BANGR</h1>
                  <p className="text-xs text-black/70">bangr.lol</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all text-sm" style={{ fontWeight: 600 }}>
                Connect
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <Input 
                placeholder="Search markets..." 
                className="pl-10 bg-white border-3 border-black text-black placeholder:text-gray-400 h-10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Create Market Modal */}
      <CreateMarketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Filter Bar */}
      <div className="h-14 px-6 flex items-center gap-3 overflow-x-auto" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-150 whitespace-nowrap ${
                activeFilter === filter.label
                  ? 'bg-yellow-400 border-black border-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'border-white/20 text-white hover:bg-yellow-400 hover:border-black hover:text-black'
              }`}
            >
              <span className="mr-2">{filter.icon}</span>
              <span className="text-sm" style={{ fontWeight: 500 }}>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 pb-24 md:pb-10">
        {/* Formula Banner */}
        <div className="mb-8 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-black text-lg" style={{ fontWeight: 700 }}>📊 Formula:</span>
            <div className="bg-white px-4 py-2 rounded-lg border-2 border-black">
              <span className="text-black" style={{ fontWeight: 600 }}>Target = Current Views × 20</span>
            </div>
            <span className="text-black">•</span>
            <div className="bg-white px-4 py-2 rounded-lg border-2 border-black">
              <span className="text-black" style={{ fontWeight: 600 }}>Timeframe = 24h</span>
            </div>
            <span className="text-black">•</span>
            <div className="bg-white px-4 py-2 rounded-lg border-2 border-black">
              <span className="text-black" style={{ fontWeight: 600 }}>Metric = VIEWS</span>
            </div>
          </div>
        </div>

        {marketData.length === 0 ? (
          <EmptyState onCreateClick={() => setIsModalOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {marketData.map((market, index) => (
              <BangrCard key={index} {...market} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 border-t-4 border-black z-40 shadow-[0_-6px_0px_0px_rgba(0,0,0,1)]">
        <div className="h-full flex items-center justify-around px-6">
          <button className="flex flex-col items-center gap-1 text-black hover:scale-110 active:scale-95 transition-transform">
            <Home className="w-6 h-6" strokeWidth={3} />
            <span className="text-xs" style={{ fontWeight: 600 }}>Home</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center gap-1 text-black hover:scale-110 active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" strokeWidth={3} />
            <span className="text-xs" style={{ fontWeight: 600 }}>Create</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-black hover:scale-110 active:scale-95 transition-transform">
            <User className="w-6 h-6" strokeWidth={3} />
            <span className="text-xs" style={{ fontWeight: 600 }}>Profile</span>
          </button>
        </div>
      </nav>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-pink-400 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 border-4 border-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-4 border-blue-400 rotate-12"></div>
      </div>
    </div>
  );
}
