/**
 * Manual backfill script - Simpler approach
 * Run with: npx tsx scripts/manual-backfill.ts
 */

import { prisma } from '../lib/prisma';

const TWITTER_API_KEY = process.env.TWITTER_API_KEY || "new1_76b20b877cdd4fcba5323e4d9f2030dd";
const TWITTER_API_BASE = "https://api.twitterapi.io";

// Markets we know exist from server logs
const MARKETS_TO_BACKFILL = [
  { marketId: 0, tweetId: "1990567212785258812", authorHandle: "alightinastorm" },
  { marketId: 1, tweetId: "1990565906351554887", authorHandle: "alightinastorm" },
  { marketId: 2, tweetId: "1990554268244586689", authorHandle: "alightinastorm" },
  { marketId: 3, tweetId: "1990567212785258812", authorHandle: "alightinastorm" }, // might be duplicate
  { marketId: 4, tweetId: "1990565906351554887", authorHandle: "alightinastorm" }, // might be duplicate
  // marketId 5 already exists with tweet 1985127114400797104
];

async function fetchTweetData(tweetId: string) {
  console.log(`  📡 Fetching tweet ${tweetId} from Twitter API...`);

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
    throw new Error(`Twitter API Error: ${response.status} - ${await response.text()}`);
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

async function backfillMarket(marketId: number, tweetId: string, authorHandle: string) {
  console.log(`\n🔨 Processing Market ${marketId} (tweet ${tweetId})`);

  // Check if already exists
  const existing = await prisma.market.findUnique({
    where: { id: marketId },
    include: { tweetData: true },
  });

  if (existing && existing.tweetData) {
    console.log(`  ✅ Already has tweet data, skipping`);
    return { status: 'skipped', marketId };
  }

  try {
    // Fetch tweet data
    const tweetData = await fetchTweetData(tweetId);

    // Save market if it doesn't exist
    await prisma.market.upsert({
      where: { id: marketId },
      update: {},
      create: {
        id: marketId,
        tweetId,
        tweetUrl: `https://x.com/${authorHandle}/status/${tweetId}`,
        authorHandle,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h from now
        metric: 0, // VIEWS
        targetValue: (tweetData.views * 20).toString(),
        multiplier: 20,
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

    console.log(`  ✅ Successfully saved!`);
    console.log(`     Tweet: "${tweetData.text.substring(0, 60)}..."`);
    console.log(`     Metrics: ${tweetData.views} views, ${tweetData.likes} likes`);

    return { status: 'success', marketId };
  } catch (error: any) {
    console.error(`  ❌ Failed: ${error.message}`);
    return { status: 'failed', marketId, error: error.message };
  }
}

async function main() {
  console.log("🚀 Starting manual backfill...\n");

  const results = {
    success: 0,
    skipped: 0,
    failed: 0,
  };

  for (let i = 0; i < MARKETS_TO_BACKFILL.length; i++) {
    const market = MARKETS_TO_BACKFILL[i];
    const result = await backfillMarket(market.marketId, market.tweetId, market.authorHandle);

    if (result.status === 'success') results.success++;
    else if (result.status === 'skipped') results.skipped++;
    else results.failed++;

    // Rate limit: ALWAYS wait 6 seconds between requests (even on failure)
    if (i < MARKETS_TO_BACKFILL.length - 1) {
      console.log(`  ⏳ Waiting 6 seconds (Twitter API rate limit)...\n`);
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Backfill Complete!");
  console.log("=".repeat(50));
  console.log(`✅ Success: ${results.success}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log("\n🎉 Your markets are now ready for demo!");
}

main()
  .then(() => {
    console.log("\n✨ Done! Refresh your homepage to see the results.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
