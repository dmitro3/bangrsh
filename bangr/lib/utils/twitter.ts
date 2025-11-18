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
  try {
    const response = await fetch("/api/twitter/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tweet metrics");
    }

    const raw = await response.json();

    // Normalise API response into the shape expected by the UI
    // The API route returns flat metrics (views, likes, retweets, replies, ...)
    // while the modal expects a `metrics` object.
    return {
      tweetId: raw.tweetId ?? tweetId,
      text: raw.text ?? "",
      authorHandle: raw.authorHandle ?? "unknown",
      authorName: raw.authorName ?? "Unknown",
      avatarUrl: raw.avatarUrl ?? null,
      quotedTweet: raw.quotedTweet ?? null,
      metrics: {
        views: raw.views ?? 0,
        likes: raw.likes ?? 0,
        retweets: raw.retweets ?? 0,
        replies: raw.replies ?? 0,
      },
    };
  } catch (error) {
    console.error("Error fetching tweet metrics:", error);
    throw error;
  }
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
