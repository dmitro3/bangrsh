/**
 * Backfill script to populate database with tweet data for all existing markets
 * Run with: npx tsx scripts/backfill-tweet-data.ts
 */

import { createPublicClient, http } from 'viem';
import { bscTestnet } from 'viem/chains';
import { prisma } from '../lib/prisma';
import { ADDRESSES, MARKET_FACTORY_ABI } from '../lib/contracts';

const TWITTER_API_KEY = process.env.TWITTER_API_KEY || "new1_76b20b877cdd4fcba5323e4d9f2030dd";
const TWITTER_API_BASE = "https://api.twitterapi.io";

const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
});

async function fetchTweetData(tweetId: string) {
  const response = await fetch(
    `${TWITTER_API_BASE}/twitter/tweets?tweet_ids=${tweetId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": TWITTER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Twitter API Error: ${response.status}`);
  }

  const data = await response.json();
  const tweets = data.tweets || [];

  if (tweets.length === 0) {
    throw new Error("Tweet not found");
  }

  const tweet = tweets[0];
  const author = tweet.author || tweet.user || {};
  const publicMetrics = tweet.public_metrics || tweet.publicMetrics || tweet.metrics || {};

  const views = tweet.viewCount ?? tweet.impressionCount ?? publicMetrics.impression_count ?? 0;
  const likes = tweet.likeCount ?? publicMetrics.like_count ?? 0;
  const retweets = tweet.retweetCount ?? publicMetrics.retweet_count ?? 0;
  const replies = tweet.replyCount ?? publicMetrics.reply_count ?? 0;

  const avatarUrl = author.profilePicture || author.profileImageUrl || author.profile_image_url || author.avatar || null;
  const extendedMedia = tweet.extendedEntities?.media || tweet.entities?.media || tweet.media || [];
  const imageUrl = extendedMedia.length > 0 && extendedMedia[0].type === 'photo'
    ? extendedMedia[0].media_url_https || extendedMedia[0].url || extendedMedia[0].media_url
    : null;

  // Extract quote tweet if it exists
  let quotedTweetId: string | null = null;
  let quotedTweetText: string | null = null;
  let quotedAuthorHandle: string | null = null;
  let quotedAuthorName: string | null = null;
  let quotedAvatarUrl: string | null = null;

  if (tweet.quotedTweet || tweet.quoted_tweet || tweet.is_quote_status) {
    const quoted = tweet.quotedTweet || tweet.quoted_tweet || {};
    const quotedAuthor = quoted.author || quoted.user || {};

    if (quoted.text || quoted.full_text) {
      quotedTweetId = quoted.id ? String(quoted.id) : null;
      quotedTweetText = quoted.text || quoted.full_text || null;
      quotedAuthorHandle = quotedAuthor.username || quotedAuthor.userName || null;
      quotedAuthorName = quotedAuthor.name || null;
      quotedAvatarUrl = quotedAuthor.profilePicture ||
                        quotedAuthor.profileImageUrl ||
                        quotedAuthor.profile_image_url ||
                        quotedAuthor.avatar ||
                        null;
    }
  }

  return {
    text: tweet.text || "",
    authorHandle: author.username || author.userName || "unknown",
    authorName: author.name || "Unknown",
    avatarUrl,
    imageUrl,
    quotedTweetId,
    quotedTweetText,
    quotedAuthorHandle,
    quotedAuthorName,
    quotedAvatarUrl,
    views,
    likes,
    retweets,
    replies,
  };
}

async function backfillMarkets() {
  console.log("🔍 Fetching total markets from blockchain...");

  // Get next market ID (total markets = nextMarketId)
  const nextMarketId: any = await publicClient.readContract({
    address: ADDRESSES.MARKET_FACTORY,
    abi: MARKET_FACTORY_ABI,
    functionName: "nextMarketId",
  });

  const totalMarkets = Number(nextMarketId);

  console.log(`📊 Total markets on blockchain: ${totalMarkets}`);

  let processed = 0;
  let skipped = 0;
  let created = 0;
  let failed = 0;

  for (let marketId = 0; marketId < Number(totalMarkets); marketId++) {
    try {
      // Check if market already exists in database
      const existingMarket = await prisma.market.findUnique({
        where: { id: marketId },
        include: { tweetData: true },
      });

      if (existingMarket && existingMarket.tweetData) {
        console.log(`✅ Market ${marketId} already has tweet data, skipping`);
        skipped++;
        continue;
      }

      // Fetch market data from blockchain
      console.log(`🔎 Fetching market ${marketId} from blockchain...`);
      const market: any = await publicClient.readContract({
        address: ADDRESSES.MARKET_FACTORY,
        abi: MARKET_FACTORY_ABI,
        functionName: "getMarket",
        args: [BigInt(marketId)],
      });

      const tweetId = market.tweetId;
      const tweetUrl = market.tweetUrl;
      const authorHandle = market.authorHandle;
      const endTime = market.endTime;
      const metric = market.metric;
      const targetValue = market.targetValue;
      const multiplier = market.multiplier;

      console.log(`📝 Fetching tweet data for tweet ${tweetId}...`);

      // Fetch tweet data from Twitter API with rate limit handling
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay to respect rate limits

      const tweetData = await fetchTweetData(tweetId);

      // Save market if it doesn't exist
      await prisma.market.upsert({
        where: { id: marketId },
        update: {},
        create: {
          id: marketId,
          tweetId,
          tweetUrl,
          authorHandle,
          endTime: new Date(Number(endTime) * 1000),
          metric: Number(metric),
          targetValue: targetValue.toString(),
          multiplier: Number(multiplier),
        },
      });

      // Save tweet data
      await prisma.tweetData.upsert({
        where: { marketId },
        update: {
          text: tweetData.text,
          authorHandle: tweetData.authorHandle,
          authorName: tweetData.authorName,
          avatarUrl: tweetData.avatarUrl,
          imageUrl: tweetData.imageUrl,
          quotedTweetId: tweetData.quotedTweetId,
          quotedTweetText: tweetData.quotedTweetText,
          quotedAuthorHandle: tweetData.quotedAuthorHandle,
          quotedAuthorName: tweetData.quotedAuthorName,
          quotedAvatarUrl: tweetData.quotedAvatarUrl,
          initialViews: tweetData.views,
          initialLikes: tweetData.likes,
          initialRetweets: tweetData.retweets,
          initialReplies: tweetData.replies,
          currentViews: tweetData.views,
          currentLikes: tweetData.likes,
          currentRetweets: tweetData.retweets,
          currentReplies: tweetData.replies,
          lastUpdated: new Date(),
        },
        create: {
          marketId,
          text: tweetData.text,
          authorHandle: tweetData.authorHandle,
          authorName: tweetData.authorName,
          avatarUrl: tweetData.avatarUrl,
          imageUrl: tweetData.imageUrl,
          quotedTweetId: tweetData.quotedTweetId,
          quotedTweetText: tweetData.quotedTweetText,
          quotedAuthorHandle: tweetData.quotedAuthorHandle,
          quotedAuthorName: tweetData.quotedAuthorName,
          quotedAvatarUrl: tweetData.quotedAvatarUrl,
          initialViews: tweetData.views,
          initialLikes: tweetData.likes,
          initialRetweets: tweetData.retweets,
          initialReplies: tweetData.replies,
          currentViews: tweetData.views,
          currentLikes: tweetData.likes,
          currentRetweets: tweetData.retweets,
          currentReplies: tweetData.replies,
        },
      });

      // Save metric snapshot
      await prisma.metricUpdate.create({
        data: {
          marketId,
          views: tweetData.views,
          likes: tweetData.likes,
          retweets: tweetData.retweets,
          replies: tweetData.replies,
        },
      });

      console.log(`✅ Successfully backfilled market ${marketId} (tweet ${tweetId})`);
      created++;
      processed++;
    } catch (error: any) {
      console.error(`❌ Failed to backfill market ${marketId}:`, error.message);
      failed++;
      processed++;
    }
  }

  console.log("\n📊 Backfill Summary:");
  console.log(`  Total markets: ${totalMarkets}`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Created: ${created}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed: ${failed}`);
}

backfillMarkets()
  .then(() => {
    console.log("✅ Backfill complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Backfill failed:", error);
    process.exit(1);
  });
