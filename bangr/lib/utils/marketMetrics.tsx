import { MessageCircle, Repeat2, Heart, Eye } from "lucide-react";
import { formatViews } from "./formatting";

export type MetricType = 'views' | 'likes' | 'retweets' | 'replies';

export const METRIC_CONFIG: Record<
  MetricType,
  { emoji: string; label: string; chartColor: string; textColor: string; icon: any }
> = {
  views: {
    emoji: '👁️',
    label: 'views',
    chartColor: '#3b82f6', // blue-500
    textColor: 'text-blue-500',
    icon: Eye,
  },
  likes: {
    emoji: '❤️',
    label: 'likes',
    chartColor: '#ec4899', // pink-500
    textColor: 'text-pink-500',
    icon: Heart,
  },
  retweets: {
    emoji: '🔄',
    label: 'retweets',
    chartColor: '#22c55e', // green-500
    textColor: 'text-green-500',
    icon: Repeat2,
  },
  replies: {
    emoji: '💬',
    label: 'replies',
    chartColor: '#a855f7', // purple-500
    textColor: 'text-purple-500',
    icon: MessageCircle,
  },
};

// Custom tooltip for price charts
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white nb-border p-3">
        <p className="font-bold mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {`${entry.name}: ${formatViews(entry.value * 1000000)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
