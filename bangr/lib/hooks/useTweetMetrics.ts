import { useState, useEffect } from "react";

interface TweetMetricsResponse {
  tweetId: string;
  text: string;
  authorHandle: string;
  authorName: string;
  avatarUrl?: string | null;
  views: number;
  likes: number;
  retweets: number;
  replies: number;
  quotes?: number;
  bookmarks?: number;
}

export function useTweetMetrics(tweetId: string | undefined) {
  const [data, setData] = useState<TweetMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tweetId) {
      setIsLoading(false);
      return;
    }

    async function fetchMetrics() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/twitter/metrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }

        const json = await response.json();
        setData(json as TweetMetricsResponse);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching tweet metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, [tweetId]);

  return { data, isLoading, error };
}
