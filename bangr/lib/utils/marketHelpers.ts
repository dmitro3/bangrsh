/**
 * Helper functions for market data
 */

/**
 * Map metric enum to string
 * Contract enum: 0=VIEWS, 1=LIKES, 2=RETWEETS, 3=COMMENTS
 */
export function mapMetricEnumToString(metricEnum: number): 'views' | 'likes' | 'retweets' | 'comments' {
  switch (metricEnum) {
    case 0:
      return 'views';
    case 1:
      return 'likes';
    case 2:
      return 'retweets';
    case 3:
      return 'comments';
    default:
      return 'views';
  }
}

/**
 * Format large numbers for display
 */
export function formatMetricValue(value: number | bigint): string {
  const num = typeof value === 'bigint' ? Number(value) : value;

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Calculate time left from end time
 */
export function calculateTimeLeft(endTime: number | bigint): string {
  const endTimeMs = typeof endTime === 'bigint' ? Number(endTime) * 1000 : endTime * 1000;
  const now = Date.now();
  const diff = endTimeMs - now;

  if (diff <= 0) {
    return 'Ended';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d left`;
  }

  if (hours > 0) {
    return `${hours}h left`;
  }

  return `${minutes}m left`;
}
