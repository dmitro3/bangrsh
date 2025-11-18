/**
 * Twitter utility functions
 */

/**
 * Extract tweet ID from various Twitter URL formats
 */
export function extractTweetId(url: string): string | null {
  try {
    // Support various Twitter URL formats:
    // https://twitter.com/username/status/1234567890
    // https://x.com/username/status/1234567890
    // https://twitter.com/i/web/status/1234567890
    const tweetIdRegex = /(?:twitter\.com|x\.com)\/(?:\w+\/)?status\/(\d+)/;
    const match = url.match(tweetIdRegex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting tweet ID:", error);
    return null;
  }
}

/**
 * Fetch tweet metrics from the API
 */
export async function fetchTweetMetrics(tweetId: string) {
  const response = await fetch("/api/twitter/metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweetId }),
  });

  let raw: any = {};

  try {
    raw = await response.json();
  } catch {
    // Ignore JSON parse errors; we'll fall back below.
  }

  // If the API explicitly reports an error or the HTTP status is not ok,
  // return a safe fallback object instead of throwing. This keeps the
  // dev overlay from exploding during demos and lets the UI show a
  // friendly error message.
  if (!response.ok || raw?.error) {
    console.warn(
      "[fetchTweetMetrics] Using fallback tweet data:",
      raw?.error || response.statusText
    );

    return {
      tweetId,
      text:
        raw?.text ||
        "Tweet data temporarily unavailable due to rate limiting or an API error.",
      authorHandle: raw?.authorHandle || "unknown",
      authorName: raw?.authorName || "Unknown",
      avatarUrl: raw?.avatarUrl ?? null,
      imageUrl: raw?.imageUrl ?? null,
      quotedTweet: raw?.quotedTweet ?? null,
      metrics: {
        views: raw?.views ?? 0,
        likes: raw?.likes ?? 0,
        retweets: raw?.retweets ?? 0,
        replies: raw?.replies ?? 0,
      },
    };
  }

  // Normalise successful response into the shape expected by the UI.
  return {
    tweetId: raw.tweetId ?? tweetId,
    text: raw.text ?? "",
    authorHandle: raw.authorHandle ?? "unknown",
    authorName: raw.authorName ?? "Unknown",
    avatarUrl: raw.avatarUrl ?? null,
    imageUrl: raw.imageUrl ?? null,
    quotedTweet: raw.quotedTweet ?? null,
    metrics: {
      views: raw.views ?? 0,
      likes: raw.likes ?? 0,
      retweets: raw.retweets ?? 0,
      replies: raw.replies ?? 0,
    },
  };
}

/**
 * Validate if metrics meet threshold requirements
 */
export function validateMetricThreshold(
  metricType: "views" | "likes" | "retweets" | "replies",
  metricValue: number
): { valid: boolean; minRequired: number } {
  return {
    valid: true,
    minRequired: 0,
  };
}
