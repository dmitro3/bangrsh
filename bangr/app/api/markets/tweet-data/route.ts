import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/markets/tweet-data?marketId=123
 * Retrieve cached tweet data for a market from database
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const marketIdStr = searchParams.get("marketId");
    const tweetId = searchParams.get("tweetId");

    if (!marketIdStr && !tweetId) {
      return NextResponse.json(
        { error: "Market ID or Tweet ID is required" },
        { status: 400 }
      );
    }

    let tweetData;
    let actualTweetId: string | null = null;

    if (marketIdStr) {
      const marketId = parseInt(marketIdStr);
      const result = await prisma.tweetData.findUnique({
        where: { marketId },
        include: { market: true }, // Include market to get tweetId
      });
      tweetData = result;
      actualTweetId = result?.market.tweetId || null;
    } else if (tweetId) {
      const market = await prisma.market.findFirst({
        where: { tweetId },
        include: { tweetData: true },
        orderBy: { createdAt: 'desc' }, // Get the most recent market for this tweet
      });
      tweetData = market?.tweetData;
      actualTweetId = market?.tweetId || null;
    }

    if (!tweetData || !actualTweetId) {
      return NextResponse.json(
        { error: "Tweet data not found" },
        { status: 404 }
      );
    }

    // Build quoted tweet object if it exists
    let quotedTweet = null;
    if (tweetData.quotedTweetId && tweetData.quotedTweetText) {
      quotedTweet = {
        tweetId: tweetData.quotedTweetId,
        text: tweetData.quotedTweetText,
        authorHandle: tweetData.quotedAuthorHandle || "unknown",
        authorName: tweetData.quotedAuthorName || "Unknown",
        avatarUrl: tweetData.quotedAvatarUrl,
      };
    }

    // Return in the format expected by the frontend
    return NextResponse.json({
      tweetId: actualTweetId,
      text: tweetData.text,
      authorHandle: tweetData.authorHandle,
      authorName: tweetData.authorName,
      avatarUrl: tweetData.avatarUrl,
      imageUrl: tweetData.imageUrl,
      quotedTweet,
      views: tweetData.currentViews,
      likes: tweetData.currentLikes,
      retweets: tweetData.currentRetweets,
      replies: tweetData.currentReplies,
    });
  } catch (error: any) {
    console.error("[GetTweetData] Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

