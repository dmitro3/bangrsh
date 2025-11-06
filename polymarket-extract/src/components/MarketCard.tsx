import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Heart, Eye, MoreHorizontal } from "lucide-react";

interface MarketOption {
  name: string;
  percentage: number;
}

interface MarketCardProps {
  title: string;
  icon?: string;
  options: MarketOption[];
  volume: string;
  date?: string;
  chance?: number;
  type?: "binary" | "multiple";
}

export function MarketCard({ title, icon, options, volume, date, chance, type = "multiple" }: MarketCardProps) {
  return (
    <div 
      className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-5 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Twitter-style header */}
      <div className="flex items-start gap-3 mb-4">
        {icon && (
          <div className="w-12 h-12 rounded-full bg-white border-4 border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-2xl">{icon}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-black">Polymarket</span>
            <span className="text-black/60">@polymarket · 2h</span>
          </div>
          <p className="text-black mt-1">{title}</p>
        </div>
        <button className="text-black hover:text-black/70 transition-colors">
          <MoreHorizontal className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>

      {/* Market Options */}
      {type === "multiple" && (
        <div className="space-y-3 mb-4">
          {options.map((option, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-black">{option.name}</span>
                <span className="text-orange-600 px-3 py-1 bg-orange-100 rounded-full border-2 border-black">{option.percentage}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden border-2 border-black">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 border-r-2 border-black"
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "binary" && chance && (
        <div className="mb-4">
          <div className="bg-white rounded-xl p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-black">Yes</span>
              <span className="text-green-700 px-3 py-1 bg-green-100 rounded-full border-2 border-black">{chance}%</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden border-2 border-black mb-4">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 border-r-2 border-black"
                style={{ width: `${chance}%` }}
              />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                Buy Yes
              </button>
              <button className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                Buy No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Twitter-style engagement metrics */}
      <div className="flex items-center justify-around text-black pt-4 border-t-4 border-black/20">
        <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
          <MessageCircle className="w-6 h-6" strokeWidth={3} />
          <span className="text-sm">{Math.floor(Math.random() * 50 + 10)}</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
          <Repeat2 className="w-6 h-6" strokeWidth={3} />
          <span className="text-sm">{Math.floor(Math.random() * 100 + 20)}</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
          <Heart className="w-6 h-6" strokeWidth={3} />
          <span className="text-sm">{Math.floor(Math.random() * 200 + 50)}</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
          <Eye className="w-6 h-6" strokeWidth={3} />
          <span className="text-sm">{volume}</span>
        </button>
      </div>
    </div>
  );
}
