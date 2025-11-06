# Bangr - Complete Project Plan

**Prediction Markets for Twitter Engagement**

*Bet on likes, retweets, replies, and views - all 4 public Twitter metrics*

**Domain:** bangr.lol

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [The Core Concept](#the-core-concept)
3. [Market Analysis](#market-analysis)
4. [Technical Architecture](#technical-architecture)
5. [Feature Breakdown](#feature-breakdown)
6. [Data Oracle Strategy (Apify)](#data-oracle-strategy-apify)
7. [Business Model](#business-model)
8. [Competitive Analysis](#competitive-analysis)
9. [Hackathon Strategy](#hackathon-strategy)
10. [Development Roadmap](#development-roadmap)
11. [Risk Analysis](#risk-analysis)

---

## Executive Summary

**What:** Bangr is a real-money prediction market where users bet on Twitter engagement metrics (likes, retweets, replies, views) within 24 hours.

**The Hook:** It's Polymarket meets Twitter, with Pump.fun-style creator incentives.

**Target Market:** Twitter influencers, content creators, prediction market enthusiasts, Gen Z

**Unique Value Propositions:**
- **4 Market Types:** Bet on any public Twitter metric (likes, retweets, replies, views)
- **Gasless UX:** Account abstraction via Biconomy (no wallet needed)
- **Creator Revenue:** 1% of betting volume + bonuses
- **Viral Claim Feature:** Tweet authors can claim markets about their tweets
- **24-Hour Resolution:** Fast gratification vs weeks/months
- **Tradeable Shares:** AMM model, not locked bets
- **Flexible Login:** Email, wallet, Twitter OAuth, or guest trading

**Revenue Model:** 4-5% platform fee on all betting volume

**Hackathon Fit:** Perfect for Seedify Prediction Markets Hackathon (BNB Chain + Account Abstraction focus)

**Differentiator:** Only prediction market supporting ALL 4 public Twitter engagement metrics

---

## The Core Concept

### Problem
Influencers create viral content but can't monetize predictions around it. Fans want to engage beyond just liking/retweeting. Current prediction markets have massive UX friction (wallets, gas fees, crypto complexity).

### Solution
Turn tweet virality into tradeable markets where:
- **Creators** earn money from betting volume on their tweets
- **Fans** can profit from predicting engagement
- **Everyone** can participate without crypto knowledge
- **All 4 public metrics** are bettable (likes, retweets, replies, views)

### The 4 Market Types

Every tweet shows 4 public engagement numbers. Bangr lets you bet on ALL of them:

```
Tweet Example:
💬 1.2K replies
🔄 8.3K retweets
❤️ 45K likes
📊 2.1M views
```

**Market Types:**
1. **Likes Markets** - "Will this tweet hit 100K likes in 24h?"
2. **Retweets Markets** - "Will this get 50K retweets in 24h?"
3. **Replies Markets** - "Will this reach 10K replies in 24h?"
4. **Views Markets** - "Will this get 10M views in 24h?" ← *Your unique differentiator*

### Example User Flow

**For Influencer:**
1. MrBeast tweets: "Giving away $1M in 24 hours"
2. Creates market: "Will my tweet hit 10M views in 24h?"
3. Shares market link with 200M followers
4. Followers bet on outcome
5. Market generates $30K in betting volume
6. MrBeast earns: $300 (1%) + $250 (bonus) = **$550**

**For Bettor:**
1. Sees market: "YES shares trading at $0.65"
2. Clicks "Buy YES" → Prompt to sign in
3. Chooses: Email (easiest), Wallet (crypto users), Twitter (for verified badge), or Guest
4. Email login: Instant smart account via Biconomy, no wallet download
5. Buys 100 YES shares for $65 (gasless transaction)
6. 12 hours later, tweet is trending, YES shares now $0.80
7. Option A: Sells early for $80 (15% profit, $15 gain)
8. Option B: Holds until resolution, wins $100 (54% profit, $35 gain if correct)

---

## Market Analysis

### Prediction Markets Landscape (2025)

**Market Size:**
- Polymarket: $1B+ valuation, $3B+ in 2024 election volume
- Kalshi: $1B+ valuation, 60% US market share
- Total prediction market volume: $5B+ annually (growing fast)

**Trends:**
- Mainstream adoption accelerated by 2024 election
- Shift from political to diverse markets (sports, entertainment, crypto)
- UX friction remains major barrier (wallets, gas fees)

### Target Market: Twitter Engagement

**Why Twitter Engagement Markets?**
- ✅ **Measurable:** All 4 metrics are public, quantifiable, verifiable
- ✅ **Frequent:** Viral tweets happen daily (fast market turnover)
- ✅ **Familiar:** Everyone understands likes, retweets, views
- ✅ **Liquid:** Influencers have built-in audiences to bet
- ✅ **Skill-based:** Predictable (analyze trends, creator history, content quality)
- ✅ **Real-time:** Engagement updates live (dynamic odds)

**Market Size:**
- Twitter: 500M+ monthly active users
- Influencers with 100K+ followers: ~2.5M accounts
- Average viral tweet lifespan: 24 hours (perfect for fast markets)
- Daily viral tweets: 1,000+ tweets with 100K+ engagement

### Competitive Landscape

| Platform | Focus | Real Money | Gasless | Creator Incentives | Metrics Supported | Market Type |
|----------|-------|------------|---------|-------------------|-------------------|-------------|
| **Polymarket** | Politics, sports | ✅ | ❌ | ❌ | N/A | Order book |
| **Kalshi** | Economy, politics | ✅ | ❌ | ❌ | N/A | Exchange |
| **tweem.lol** | Twitter | ❌ (points) | ❌ | ❌ | 1-2 metrics | Points |
| **Bangr** | Twitter | ✅ | ✅ | ✅ (1%+) | **4 metrics** | AMM |

**Competitive Advantages:**
1. ✅ Only Twitter-focused real-money market
2. ✅ **Only platform supporting all 4 public metrics** (likes, retweets, replies, views)
3. ✅ Only prediction market with gasless UX
4. ✅ Only platform with creator revenue share
5. ✅ Fastest resolution (24h vs weeks/months)
6. ✅ Flexible login (email, wallet, Twitter, guest)

---

## Technical Architecture

### Tech Stack

**Blockchain Layer:**
- **Chain:** BNB Chain (hackathon requirement)
  - Low gas fees (~$0.001-0.01 per tx)
  - Fast finality (3 second blocks)
  - EVM-compatible (Solidity)
- **Smart Contracts:** Solidity
  - MarketFactory.sol (creates markets)
  - PredictionMarket.sol (AMM-based binary markets)
  - Treasury.sol (fee collection, creator payouts)
- **Account Abstraction:** Biconomy SDK v4
  - Gasless transactions via paymaster
  - ERC-4337 smart accounts
  - Email/social login support

**Backend:**
- **Runtime:** Node.js / TypeScript
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL
  - Users table (auth methods, wallet addresses)
  - Markets table (tweet_id, metric_type, threshold, creator)
  - Trades table (user_id, market_id, shares, price)
  - Resolution history
- **Cache:** Redis
  - Apify response caching (reduce API costs)
  - Rate limit management
  - Real-time market data
- **Queue:** Bull/BullMQ
  - Market resolution jobs (24h scheduled)
  - Tweet metric polling (every 1-6 hours)
  - Notification system

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Web3:**
  - Biconomy SDK (account abstraction)
  - ethers.js v6 or viem
- **State Management:** Zustand or React Query
- **Auth:** NextAuth.js v5
  - Email provider (passwordless)
  - Twitter OAuth 2.0 (claim feature)
  - Wallet connect (WalletConnect, MetaMask)
  - Guest mode (localStorage)

**External APIs:**
- **Apify:** Twitter scraping ($0.25 per 1,000 tweets)
  - Actor: `kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest`
  - Gets: likes, retweets, replies, views
- **Biconomy:** Paymaster for gasless transactions

**Infrastructure:**
- **Hosting:** Vercel (frontend), Railway (backend)
- **Blockchain Indexing:** The Graph (subgraph for market events)
- **Monitoring:** Sentry (errors), PostHog (analytics)
- **CDN:** Cloudflare (caching, DDoS protection)

### Smart Contract Architecture

#### 1. MarketFactory.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MarketFactory {
    enum MetricType { LIKES, RETWEETS, REPLIES, VIEWS }

    struct MarketParams {
        string tweetUrl;
        string tweetId;
        MetricType metric;
        uint256 threshold;
        address creator;
        uint256 initialLiquidity;
    }

    mapping(uint256 => address) public markets;
    uint256 public marketCount;

    event MarketCreated(
        uint256 indexed marketId,
        address indexed marketAddress,
        string tweetId,
        MetricType metric,
        uint256 threshold,
        address creator
    );

    function createMarket(MarketParams calldata params)
        external
        payable
        returns (address marketAddress)
    {
        // Deploy new prediction market contract
        PredictionMarket market = new PredictionMarket{value: msg.value}(
            params.tweetId,
            params.metric,
            params.threshold,
            params.creator,
            params.initialLiquidity
        );

        markets[marketCount] = address(market);

        emit MarketCreated(
            marketCount,
            address(market),
            params.tweetId,
            params.metric,
            params.threshold,
            params.creator
        );

        marketCount++;
        return address(market);
    }

    function getMarket(uint256 marketId) external view returns (address) {
        return markets[marketId];
    }
}
```

#### 2. PredictionMarket.sol (AMM-based)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarket is ReentrancyGuard, Ownable {
    // Market state
    string public tweetId;
    MetricType public metricType;
    uint256 public threshold;
    address public creator;
    bool public resolved;
    bool public outcome; // true = YES wins, false = NO wins
    uint256 public resolutionTime;

    // AMM state (Fixed Product Market Maker)
    uint256 public yesShares;
    uint256 public noShares;
    uint256 public constant k = 10_000; // Liquidity constant

    // User positions
    mapping(address => uint256) public yesBalances;
    mapping(address => uint256) public noBalances;

    // Fee configuration
    uint256 public constant PLATFORM_FEE = 400; // 4% in basis points
    uint256 public constant CREATOR_FEE = 100;  // 1% in basis points
    uint256 public totalVolume;

    // Events
    event SharesPurchased(address indexed user, bool isYes, uint256 shares, uint256 cost);
    event SharesSold(address indexed user, bool isYes, uint256 shares, uint256 payout);
    event MarketResolved(bool outcome, uint256 finalMetric);
    event WinningsClaimed(address indexed user, uint256 amount);

    constructor(
        string memory _tweetId,
        MetricType _metricType,
        uint256 _threshold,
        address _creator,
        uint256 _initialLiquidity
    ) payable {
        require(_initialLiquidity > 0, "Need initial liquidity");

        tweetId = _tweetId;
        metricType = _metricType;
        threshold = _threshold;
        creator = _creator;
        resolutionTime = block.timestamp + 24 hours;

        // Initialize AMM with equal YES/NO shares
        yesShares = 100;
        noShares = 100;
    }

    // Calculate cost to buy shares using constant product formula
    function getBuyPrice(bool isYes, uint256 amount) public view returns (uint256) {
        uint256 currentShares = isYes ? yesShares : noShares;
        require(currentShares > amount, "Insufficient liquidity");

        uint256 newShares = currentShares - amount;
        uint256 newOtherShares = k / newShares;
        uint256 otherShares = isYes ? noShares : yesShares;

        uint256 cost = newOtherShares - otherShares;

        // Add fees (5% total: 4% platform + 1% creator)
        uint256 feeAmount = (cost * (PLATFORM_FEE + CREATOR_FEE)) / 10000;
        return cost + feeAmount;
    }

    // Buy YES or NO shares
    function buyShares(bool isYes, uint256 amount) external payable nonReentrant {
        require(!resolved, "Market resolved");
        require(block.timestamp < resolutionTime, "Market expired");

        uint256 cost = getBuyPrice(isYes, amount);
        require(msg.value >= cost, "Insufficient payment");

        // Update AMM state
        if (isYes) {
            yesShares -= amount;
            noShares = k / yesShares;
            yesBalances[msg.sender] += amount;
        } else {
            noShares -= amount;
            yesShares = k / noShares;
            noBalances[msg.sender] += amount;
        }

        totalVolume += cost;

        // Refund excess
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        emit SharesPurchased(msg.sender, isYes, amount, cost);
    }

    // Sell shares back to pool
    function sellShares(bool isYes, uint256 amount) external nonReentrant {
        require(!resolved, "Market resolved");

        uint256 userShares = isYes ? yesBalances[msg.sender] : noBalances[msg.sender];
        require(userShares >= amount, "Insufficient shares");

        // Calculate payout (inverse of buy price)
        uint256 payout = getSellPrice(isYes, amount);

        // Update state
        if (isYes) {
            yesBalances[msg.sender] -= amount;
            yesShares += amount;
            noShares = k / yesShares;
        } else {
            noBalances[msg.sender] -= amount;
            noShares += amount;
            yesShares = k / noShares;
        }

        payable(msg.sender).transfer(payout);

        emit SharesSold(msg.sender, isYes, amount, payout);
    }

    function getSellPrice(bool isYes, uint256 amount) public view returns (uint256) {
        // Simplified: opposite of buy price minus fees
        uint256 currentShares = isYes ? yesShares : noShares;
        uint256 newShares = currentShares + amount;
        uint256 otherShares = isYes ? noShares : yesShares;
        uint256 newOtherShares = k / newShares;

        uint256 payout = otherShares - newOtherShares;

        // Subtract fees
        uint256 feeAmount = (payout * (PLATFORM_FEE + CREATOR_FEE)) / 10000;
        return payout - feeAmount;
    }

    // Resolve market (called by oracle)
    function resolve(bool _outcome, uint256 finalMetric) external onlyOwner {
        require(!resolved, "Already resolved");
        require(block.timestamp >= resolutionTime, "Too early");

        outcome = _outcome;
        resolved = true;

        emit MarketResolved(_outcome, finalMetric);
    }

    // Claim winnings after resolution
    function claimWinnings() external nonReentrant {
        require(resolved, "Not resolved yet");

        uint256 shares = outcome ? yesBalances[msg.sender] : noBalances[msg.sender];
        require(shares > 0, "No winning shares");

        // Each winning share pays $1
        uint256 payout = shares * 1 ether;

        // Clear balance
        if (outcome) {
            yesBalances[msg.sender] = 0;
        } else {
            noBalances[msg.sender] = 0;
        }

        payable(msg.sender).transfer(payout);

        emit WinningsClaimed(msg.sender, payout);
    }

    // View functions
    function getCurrentOdds() external view returns (uint256 yesPrice, uint256 noPrice) {
        uint256 total = yesShares + noShares;
        yesPrice = (noShares * 100) / total; // Probability in %
        noPrice = (yesShares * 100) / total;
    }

    function getUserShares(address user) external view returns (uint256 yes, uint256 no) {
        return (yesBalances[user], noBalances[user]);
    }
}
```

#### 3. Treasury.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Treasury {
    mapping(address => uint256) public creatorEarnings;
    mapping(address => uint256) public platformEarnings;

    address public owner;

    event CreatorPaid(address indexed creator, uint256 amount);
    event PlatformPaid(address indexed recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function recordCreatorEarnings(address creator, uint256 amount) external {
        creatorEarnings[creator] += amount;
    }

    function claimCreatorRevenue() external {
        uint256 amount = creatorEarnings[msg.sender];
        require(amount > 0, "No earnings");

        creatorEarnings[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit CreatorPaid(msg.sender, amount);
    }
}
```

### AMM Mechanism: Fixed Product Market Maker (FPMM)

**Why FPMM?**
- Proven in prediction markets (Gnosis, Omen, Polkamarkets)
- Simple constant product formula: `x * y = k`
- Automatic price discovery based on supply/demand
- Always provides liquidity
- Works perfectly for binary outcomes

**How It Works:**

```
Initial State:
- YES shares: 100
- NO shares: 100
- k = 100 * 100 = 10,000
- Price: $0.50 each (50% probability)

User buys 10 YES shares:
- YES shares decrease: 100 → 90
- k must remain constant: 10,000
- NO shares must adjust: 10,000 / 90 = 111.11
- New price: ~$0.55 YES, ~$0.45 NO

Why? More people buying YES → higher demand → higher price → higher implied probability
```

**Advantages:**
- ✅ Always provides liquidity (can't run out)
- ✅ Price reflects market sentiment
- ✅ Traders can exit early (sell back to pool)
- ✅ No order book complexity
- ✅ Gas efficient

### Account Abstraction Flow (Biconomy)

**Multiple Login Options:**

```javascript
// User clicks "Sign in" on landing page
// Modal shows 4 options:

1. [Continue with Email] ← Recommended (gasless, instant)
   → Passwordless email link
   → Biconomy creates smart account
   → User never sees wallet/gas

2. [Connect Wallet] ← For crypto users
   → WalletConnect/MetaMask
   → Optional gasless via Biconomy

3. [Sign in with Twitter] ← For claim feature + verified badge
   → Twitter OAuth 2.0
   → Links Twitter account to smart account
   → Can claim markets about their tweets

4. [Continue as Guest] ← Immediate trading
   → Creates temporary account
   → Stored in localStorage
   → Prompt to save account later
```

**Technical Implementation:**

```javascript
// Biconomy Setup
import { BiconomySmartAccountV2 } from '@biconomy/account';
import { createWalletClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';

// Initialize Biconomy
const smartAccount = await BiconomySmartAccountV2.create({
  chainId: 56, // BNB Chain
  bundler: {
    url: process.env.BICONOMY_BUNDLER_URL,
  },
  paymaster: {
    url: process.env.BICONOMY_PAYMASTER_URL,
  },
  signer: userSigner, // From email/wallet/twitter auth
});

// Send gasless transaction
async function buyShares(marketAddress, isYes, amount) {
  // Encode function call
  const data = encodeFunctionData({
    abi: PredictionMarketABI,
    functionName: 'buyShares',
    args: [isYes, amount],
  });

  // Build user operation
  const userOp = await smartAccount.buildUserOp({
    to: marketAddress,
    data: data,
    value: parseEther(cost),
  });

  // Send via Biconomy (platform pays gas)
  const userOpResponse = await smartAccount.sendUserOp(userOp);
  const receipt = await userOpResponse.wait();

  return receipt;
}
```

**Benefits:**
- ✅ Email users: No wallet download needed
- ✅ Wallet users: Can use existing wallets
- ✅ Twitter users: Verified badge + claim feature
- ✅ Guest users: Immediate access, convert later
- ✅ All users: Zero gas fees (platform pays)

---

## Feature Breakdown

### Core Features (MVP)

#### 1. Market Creation (4 Metric Types)

**User Story:** Anyone can create a prediction market from a Twitter URL for ANY of the 4 public metrics

**Flow:**
1. User pastes Twitter URL: `https://twitter.com/elonmusk/status/123456`
2. System fetches current engagement via Apify
3. System shows current metrics:
   ```
   Current Engagement:
   💬 Replies: 1,234
   🔄 Retweets: 5,678
   ❤️ Likes: 12,340
   📊 Views: 2,456,789
   ```
4. User selects metric type:
   - [ ] Likes
   - [x] Views ← Selected
   - [ ] Retweets
   - [ ] Replies
5. User sets threshold: "10,000,000 views"
6. Preview: "Will this tweet hit 10M views in 24h?"
7. Smart contract creates market (gasless)
8. Market goes live with 24-hour countdown

**Backend Logic:**
```javascript
import { ApifyClient } from 'apify-client';

const apify = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

async function createMarket(tweetUrl, threshold, metricType) {
  // 1. Extract tweet ID from URL
  const tweetId = extractTweetId(tweetUrl);

  // 2. Fetch tweet data via Apify
  const run = await apify.actor('kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
    tweetIds: [tweetId],
  });

  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  const tweet = items[0];

  // 3. Get current metric value
  const currentValue = {
    likes: tweet.like_count,
    retweets: tweet.retweet_count,
    replies: tweet.reply_count,
    views: tweet.view_count,
  }[metricType];

  // 4. Create market on-chain
  const tx = await marketFactory.createMarket({
    tweetUrl,
    tweetId,
    metric: metricType,
    threshold,
    creator: userAddress,
    initialLiquidity: parseEther('0.1'), // Platform seeds 0.1 BNB
  });

  // 5. Store in database
  await db.markets.insert({
    tweet_id: tweetId,
    tweet_url: tweetUrl,
    metric_type: metricType,
    threshold,
    starting_value: currentValue,
    creator: userAddress,
    resolves_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  // 6. Schedule resolution job
  await queue.add('resolveMarket', {
    marketId: tx.marketId,
    resolveAt: Date.now() + 24 * 60 * 60 * 1000,
  }, {
    delay: 24 * 60 * 60 * 1000, // 24 hours
  });

  return { marketId: tx.marketId, marketAddress: tx.marketAddress };
}
```

#### 2. Binary Trading (YES/NO shares)

**User Story:** Users buy/sell shares predicting outcome for ANY of the 4 metrics

**Interface Examples:**

**Likes Market:**
```
"Will @elonmusk's tweet hit 50K likes in 24h?"
Current likes: 12,340 ❤️
Threshold: 50,000
Time remaining: 18h 32m

Current Odds:
YES: $0.72 (72% probability)
NO: $0.28 (28% probability)

[Buy YES] [Buy NO]
```

**Views Market:**
```
"Will @MrBeast's tweet hit 10M views in 24h?"
Current views: 2.1M 📊
Threshold: 10,000,000
Time remaining: 6h 15m

Current Odds:
YES: $0.35 (35% probability)
NO: $0.65 (65% probability)

[Buy YES] [Buy NO]
```

**Trading Logic:**
- Uses FPMM pricing (constant product AMM)
- Shares are fungible (can trade with anyone)
- Can trade multiple times before resolution
- Can sell back to pool anytime
- All transactions gasless via Biconomy

#### 3. Flexible Authentication System

**User Story:** Users can sign in with email, wallet, Twitter, or trade as guest

**Login Modal:**
```
┌─────────────────────────────────────┐
│      Sign in to start trading       │
├─────────────────────────────────────┤
│                                     │
│  [📧 Continue with Email]           │
│   ↳ Gasless, no wallet needed      │
│                                     │
│  [🔗 Connect Wallet]                │
│   ↳ MetaMask, WalletConnect, etc.  │
│                                     │
│  [🐦 Sign in with Twitter]          │
│   ↳ Claim markets + verified badge │
│                                     │
│  [👤 Continue as Guest]             │
│   ↳ Trade now, save account later  │
│                                     │
└─────────────────────────────────────┘
```

**Implementation:**
```javascript
// NextAuth.js configuration
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter';
import { CredentialsProvider } from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    // Email (passwordless)
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: 'noreply@bangr.lol',
    }),

    // Twitter OAuth
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),

    // Wallet (signature verification)
    CredentialsProvider({
      name: 'Wallet',
      credentials: {
        address: { label: 'Address', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
      },
      async authorize(credentials) {
        const verified = await verifyWalletSignature(
          credentials.address,
          credentials.signature
        );
        if (verified) {
          return { id: credentials.address, wallet: credentials.address };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      // Create/retrieve Biconomy smart account
      if (!user.smartAccount) {
        const smartAccount = await createSmartAccount(user.id);
        user.smartAccount = smartAccount.address;
      }
      session.user.smartAccount = user.smartAccount;
      return session;
    },
  },
});
```

**Guest Mode:**
```javascript
// Guest trading (no sign-in required)
// Store wallet in localStorage, prompt to save later

function enableGuestTrading() {
  // Generate ephemeral wallet
  const wallet = Wallet.createRandom();

  // Store in localStorage
  localStorage.setItem('guestWallet', wallet.privateKey);

  // Create Biconomy smart account
  const smartAccount = await createSmartAccount(wallet);

  // User can trade immediately
  // Show banner: "Save your account to keep your positions"

  return smartAccount;
}
```

**Why This Matters:**
- ✅ Email: Lowest friction for normies
- ✅ Wallet: Crypto users feel at home
- ✅ Twitter: Enables claim feature, adds social proof
- ✅ Guest: Immediate trading, convert later
- ✅ All options: Gasless via Biconomy

#### 4. Apify Auto-Resolution (All 4 Metrics)

**User Story:** Markets resolve automatically after 24 hours by checking final engagement

**Resolution Flow:**
```javascript
// Cron job runs every minute checking for expired markets
import { ApifyClient } from 'apify-client';

const apify = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

async function resolveMarket(market) {
  const { tweet_id, metric_type, threshold } = market;

  // 1. Fetch final metrics from Apify
  const run = await apify.actor('kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
    tweetIds: [tweet_id],
  });

  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  const tweet = items[0];

  // 2. Get final value for specific metric
  const finalValue = {
    likes: tweet.like_count,      // ❤️
    retweets: tweet.retweet_count, // 🔄
    replies: tweet.reply_count,    // 💬
    views: tweet.view_count,       // 📊
  }[metric_type];

  // 3. Determine outcome
  const outcome = finalValue >= threshold;

  console.log(`Market ${market.id}:`);
  console.log(`  Metric: ${metric_type}`);
  console.log(`  Threshold: ${threshold}`);
  console.log(`  Final Value: ${finalValue}`);
  console.log(`  Outcome: ${outcome ? 'YES WINS' : 'NO WINS'}`);

  // 4. Resolve on-chain
  const tx = await predictionMarket.resolve(outcome, finalValue);
  await tx.wait();

  // 5. Update database
  await db.markets.update(market.id, {
    resolved: true,
    outcome,
    final_value: finalValue,
    resolved_at: new Date(),
  });

  // 6. Calculate creator revenue
  await calculateCreatorRevenue(market);

  // 7. Notify users
  await notifyUsers(market, outcome);

  return { outcome, finalValue };
}
```

**Edge Cases:**
- ❌ Tweet deleted → Market cancelled, refunds issued
- ❌ Apify API down → Retry 3x, then manual resolution
- ❌ Engagement decreases → Use maximum recorded value
- ❌ Suspicious activity → Flag for review, delay resolution

**Cost Per Resolution:**
```
1 tweet fetch via Apify = $0.25 / 1000 = $0.00025
Negligible compared to market volume
```

#### 5. Creator Revenue Share

**User Story:** Tweet authors and market creators earn from betting volume

**Revenue Model:**
```
Base: 1% of all betting volume
Bonuses (tiered):
- $5K volume → $50 bonus
- $20K volume → $200 bonus
- $50K volume → $500 bonus
- $100K+ volume → $1,000 bonus

Example Market:
- Volume: $30,000
- Creator base earnings: $300 (1%)
- Bonus tier: $200 ($20K tier)
- Total creator earnings: $500
```

**Who Earns?**
- **Market creator (default):** 1% if they created market
- **Tweet author (claimed):** 0.5% creator + 0.5% author if claimed
- **Tweet author (created first):** 2% if they created market about own tweet

**Payout Implementation:**
```javascript
async function calculateCreatorRevenue(market) {
  const { total_volume, creator, claimed_by, tweet_author } = market;

  // Base 1% earnings
  const baseEarnings = total_volume * 0.01;

  // Calculate bonus tier
  let bonus = 0;
  if (total_volume >= 100000) bonus = 1000;
  else if (total_volume >= 50000) bonus = 500;
  else if (total_volume >= 20000) bonus = 200;
  else if (total_volume >= 5000) bonus = 50;

  const totalEarnings = baseEarnings + bonus;

  // Distribute earnings
  if (claimed_by === tweet_author && creator !== tweet_author) {
    // Market claimed by tweet author
    // Split 50/50 between creator and author
    await treasury.recordCreatorEarnings(creator, totalEarnings * 0.5);
    await treasury.recordCreatorEarnings(tweet_author, totalEarnings * 0.5);
  } else if (creator === tweet_author) {
    // Tweet author created market themselves
    // Gets double (2%)
    await treasury.recordCreatorEarnings(creator, totalEarnings * 2);
  } else {
    // Normal market, creator gets 100%
    await treasury.recordCreatorEarnings(creator, totalEarnings);
  }
}
```

#### 6. Claim Feature (The Viral Mechanic)

**User Story:** Tweet authors can claim markets about their tweets to start earning

**Why This is Genius:**
- Creates viral loop: Market → Author notified → Author claims → Author promotes → Followers bet → Volume explodes
- Tweet authors discover platform organically
- Creates urgency (first to claim gets better deal)
- Verified badge adds social proof

**Claim Flow:**

**Step 1: Market Created**
```
Random user creates: "Will @MrBeast's tweet hit 10M views in 24h?"
MrBeast has NOT created or claimed this market
```

**Step 2: Notification**
```
System detects tweet author: @MrBeast (via Apify)
Sends notification:
  📧 Email: "Someone created a prediction market about your tweet!"
  🐦 Tweet mention: "@MrBeast your tweet has a $5K prediction market!"

[Claim This Market]
```

**Step 3: Verification**
```
MrBeast clicks "Claim This Market"
→ Redirects to "Sign in with Twitter"
→ Twitter OAuth verifies @MrBeast owns account
→ Links Twitter account to smart account
```

**Step 4: Claim Successful**
```
Revenue split updates:
  BEFORE: 100% to market creator
  AFTER:  50% to market creator, 50% to @MrBeast

Market UI updates:
  ✅ "Verified by @MrBeast" badge
  📊 Boosted in trending section
```

**Step 5: MrBeast Promotes**
```
MrBeast tweets:
"Bet on my tweet hitting 10M views in 24h on @Bangr 🚀
Currently at 2.1M views with 18h left.
Think I'll make it?"

[Link to market]

→ 200M followers see tweet
→ Thousands bet on outcome
→ Volume explodes to $50K
→ MrBeast earns $500 (1% of $50K)
→ Bettors profit from accuracy
→ Platform earns $2,000 (4%)
→ Everyone wins
```

**Technical Implementation:**
```javascript
// Claim endpoint
app.post('/api/markets/:id/claim', async (req, res) => {
  const { marketId } = req.params;
  const { twitterUserId, signature } = req.body;

  // 1. Get market and tweet author
  const market = await db.markets.findOne({ id: marketId });
  const tweetAuthor = await getTwitterUserFromTweet(market.tweet_id);

  // 2. Verify requester is tweet author
  if (tweetAuthor.id !== twitterUserId) {
    return res.status(403).json({ error: 'Not tweet author' });
  }

  // 3. Verify Twitter OAuth session
  const session = await getSession(req);
  if (!session?.user?.twitter?.id || session.user.twitter.id !== twitterUserId) {
    return res.status(401).json({ error: 'Twitter auth required' });
  }

  // 4. Update market
  await db.markets.update(marketId, {
    claimed_by: twitterUserId,
    claimed_at: new Date(),
    verified: true,
  });

  // 5. Update on-chain (optional, can be done at resolution)
  // This doesn't need on-chain tx since revenue split happens at resolution

  // 6. Send success
  return res.json({
    success: true,
    message: 'Market claimed! You now earn 50% of betting volume.',
  });
});

// Helper: Get Twitter user from tweet
async function getTwitterUserFromTweet(tweetId) {
  const run = await apify.actor('kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
    tweetIds: [tweetId],
  });

  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  const tweet = items[0];

  return {
    id: tweet.user.id_str,
    username: tweet.user.screen_name,
    displayName: tweet.user.name,
  };
}
```

### Advanced Features (Post-MVP)

#### 7. Multi-Metric Markets
**Example:** "Will this tweet hit BOTH 100K likes AND 1M views?"
- Requires both conditions to be true
- Higher risk, higher reward
- More complex AMM pricing

#### 8. Scalar Markets
**Example:** "Predict exact number of views (within 10%)"
- Slider from 0 to 10M
- Closer prediction = higher payout
- Requires pm-AMM implementation

#### 9. Leaderboards
- Top creators (by earnings)
- Top predictors (by accuracy)
- Biggest markets (by volume)
- Trending metrics (most popular metric type)

#### 10. Social Features
- Follow favorite creators
- Share positions on Twitter
- Portfolio analytics
- Prediction history

---

## Data Oracle Strategy (Apify)

### Why Apify vs Official Twitter API

| Feature | Apify | Twitter API Basic | Twitter API Pro |
|---------|-------|-------------------|-----------------|
| **Cost** | $0.25 / 1K tweets | $100/month (10K reads) | $5,000/month (1M reads) |
| **Effective Cost/1K** | **$0.25** | $10 | $5 |
| **Metrics Available** | ✅ Likes, Retweets, Replies, Views | ✅ Likes, Retweets, Replies | ✅ Likes, Retweets, Replies |
| **Views Available?** | ✅ YES | ❌ NO | ❌ NO |
| **Rate Limits** | None (1000+ req/sec) | 10K/month | 1M/month |
| **Setup Time** | <5 minutes | Weeks (approval) | Weeks (approval) |
| **ToS Compliant?** | ❌ No (scraping) | ✅ Yes | ✅ Yes |
| **Reliability** | High (99.99% uptime) | Medium | High |
| **Hackathon Ready?** | ✅ YES | ⚠️ Limited | ❌ Expensive |

**Winner for Hackathon (Bangr): Apify**
- **97% cheaper** than official API
- **Only way to get view counts** (not available in official API)
- Instant setup (no approval process)
- Perfect for MVP validation

### Apify Implementation

**Actor Used:**
```
kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest
URL: https://apify.com/kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest
Pricing: $0.25 per 1,000 tweets
```

**What You Get:**
```javascript
{
  "id_str": "1234567890",
  "text": "Tweet content...",
  "user": {
    "id_str": "123456",
    "screen_name": "elonmusk",
    "name": "Elon Musk"
  },
  "like_count": 45230,        // ❤️ Likes
  "retweet_count": 8934,      // 🔄 Retweets
  "reply_count": 1245,        // 💬 Replies
  "view_count": 2103456,      // 📊 Views ← KEY DIFFERENTIATOR
  "created_at": "2025-01-15T12:34:56Z"
}
```

**Code Example:**
```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN, // Get from apify.com
});

// Fetch tweet metrics
async function getTweetMetrics(tweetUrl) {
  // Extract tweet ID
  const tweetId = tweetUrl.match(/status\/(\d+)/)[1];

  // Run Apify actor
  const run = await client.actor('kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
    tweetIds: [tweetId],
    includeMetrics: true,
  });

  // Get results
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  const tweet = items[0];

  return {
    likes: tweet.like_count,      // ❤️
    retweets: tweet.retweet_count, // 🔄
    replies: tweet.reply_count,    // 💬
    views: tweet.view_count,       // 📊
    author: {
      id: tweet.user.id_str,
      username: tweet.user.screen_name,
      displayName: tweet.user.name,
    },
  };
}

// Example usage
const metrics = await getTweetMetrics('https://twitter.com/elonmusk/status/1234567890');
console.log(metrics);
// {
//   likes: 45230,
//   retweets: 8934,
//   replies: 1245,
//   views: 2103456,
//   author: { id: '123456', username: 'elonmusk', displayName: 'Elon Musk' }
// }
```

### Cost Analysis

**Hackathon (1 week):**
```
Conservative: 300 markets × 3 checks = 900 tweets
Cost: 900 × $0.25/1,000 = $0.23

Moderate: 500 markets × 3 checks = 1,500 tweets
Cost: 1,500 × $0.25/1,000 = $0.38

Aggressive: 1,000 markets × 3 checks = 3,000 tweets
Cost: 3,000 × $0.25/1,000 = $0.75

Your entire hackathon costs less than $1! 🤯
```

**Production (Monthly):**
```
1,000 markets/month × 3 checks = 3,000 tweets
Cost: $0.75/month

10,000 markets/month × 3 checks = 30,000 tweets
Cost: $7.50/month

100,000 markets/month × 3 checks = 300,000 tweets
Cost: $75/month

Even at massive scale (100K markets/month),
you're paying $75 vs $5,000 for official API.
```

### Migration Strategy

**Phase 1: Hackathon → Month 6 (Use Apify)**
- Cost: $1-75/month depending on volume
- Gets you all 4 metrics including views
- Validates product-market fit
- Proves concept to investors

**Phase 2: Month 6+ (Consider Official API)**
- When monthly revenue > $10K
- When legitimacy matters for B2B partnerships
- When regulatory compliance required
- Switch to Twitter API Pro ($5K/month)
- Note: You'll lose view counts (not available in official API)

**Hybrid Approach:**
- Use Apify for view count markets
- Use official API for likes/retweets/replies
- Best of both worlds

### Addressing Judge Questions

**Q: "Is Apify legal? It's scraping."**

**A:**
"Apify technically violates Twitter's ToS, and we're transparent about that. However:

1. **For MVP validation**, Apify is the pragmatic choice:
   - 97% cost savings ($0.75 vs $100/month)
   - Only way to access view counts
   - Allows us to prove PMF before investing $5K/month

2. **We have a migration path:**
   - Post-hackathon: Switch to Twitter API when revenue supports it
   - Budget: $5K/month API cost factored into unit economics
   - Prize money: Can fund 12 months of official API

3. **Precedent:**
   - Many successful startups scraped for MVP (Instagram tools, LinkedIn tools)
   - Apify is a $100M+ funded company (investors did due diligence)
   - Used by major enterprises for research

4. **Risk mitigation:**
   - We acknowledge ToS violation in terms
   - Geofence if needed
   - Ready to migrate on 48h notice

This is a calculated bootstrapping decision, not our long-term strategy. Judges appreciate resourcefulness."

---

## Business Model

### Revenue Streams

#### Primary: Trading Fees

**Model:** 5% total fee on all betting volume
- 4% platform fee
- 1% creator revenue share

**Fee Structure:**
```
Small market:
- Volume: $1,000
- Platform revenue: $40 (4%)
- Creator revenue: $10 (1%)
- Net platform: $40

Medium market:
- Volume: $10,000
- Platform revenue: $400 (4%)
- Creator revenue: $100 (1%)
- Net platform: $400

Viral market:
- Volume: $100,000
- Platform revenue: $4,000 (4%)
- Creator revenue: $1,000 + $1,000 bonus
- Net platform: $4,000
```

**Monthly Revenue Projections:**
```
Conservative (100 markets/month, $500 avg volume):
- Total volume: $50,000
- Platform revenue: $2,000/month
- Cost: $75 (Apify) + $200 (infra) = $275
- Net profit: $1,725/month

Moderate (500 markets/month, $1,000 avg volume):
- Total volume: $500,000
- Platform revenue: $20,000/month
- Cost: $275
- Net profit: $19,725/month

Aggressive (1,000 markets/month, $2,000 avg volume):
- Total volume: $2,000,000
- Platform revenue: $80,000/month
- Cost: $275
- Net profit: $79,725/month
```

### Cost Structure

**Fixed Costs (Monthly):**
```
Apify (10K markets): $75
Infrastructure:
  - Vercel (frontend): $20
  - Railway (backend): $50
  - PostgreSQL: $50
  - Redis: $30
  - Biconomy paymaster: $100-500 (usage-based)
Total Infrastructure: ~$250-650

Total Fixed: $325-725/month

Compare to Twitter API Pro: $5,000/month
Savings: $4,275-4,675/month (87-93% savings)
```

**Variable Costs:**
```
Gas fees (covered by paymaster):
  - Per transaction: $0.001-0.01 on BNB Chain
  - 1,000 trades/month: ~$10-100

Liquidity subsidies:
  - Seed liquidity per market: $50
  - 100 markets: $5,000 (one-time, recyclable)
```

**Break-Even Analysis:**
```
Monthly costs: ~$725 (high estimate)
Platform fee: 4%

Break-even volume: $725 ÷ 0.04 = $18,125/month

If average market = $500:
  Need 37 markets/month to break even

If average market = $1,000:
  Need 19 markets/month to break even

Extremely achievable!
```

### Unit Economics

**Per Market:**
```
Average betting volume: $1,000
Platform revenue (4%): $40
Creator payout (1%): $10
Apify cost: $0.0075 (3 checks × $0.0025)
Gas costs: ~$5
Liquidity subsidy (amortized): $10
Profit per market: ~$25

Margin: 62.5%
```

**Path to Profitability:**
```
Month 1 (Hackathon): -$500 (investment)
Month 2: $10K volume (20 markets) → +$75 profit
Month 3: $50K volume (50 markets) → +$1,275 profit
Month 6: $500K volume (500 markets) → +$19,275 profit
Month 12: $2M volume (2K markets) → +$79,275 profit
```

### Comparison: Apify vs Official API Economics

**Scenario: 500 markets/month @ $1K avg volume**

**With Apify:**
```
Revenue: $20,000 (4% of $500K)
Costs:
  - Apify: $4 (1,500 tweets × $0.0025)
  - Infrastructure: $250
  - Gas: $50
  - Total: $304
Profit: $19,696
Margin: 98.5%
```

**With Twitter API Pro:**
```
Revenue: $20,000 (4% of $500K)
Costs:
  - Twitter API: $5,000
  - Infrastructure: $250
  - Gas: $50
  - Total: $5,300
Profit: $14,700
Margin: 73.5%
```

**Difference:** $4,996/month saved with Apify (34% more profit)

**At What Scale Does Official API Make Sense?**
```
When monthly revenue > $50K (1,250 markets/month)
Why? Brand legitimacy matters for large scale
But even then, Apify economics are better
```

---

## Competitive Analysis

### Direct Competitors

#### tweem.lol
**What they do:** Twitter engagement prediction (points-based)

**Strengths:**
- First mover in Twitter prediction space
- Simple UX

**Weaknesses:**
- ❌ No real money (points have no value)
- ❌ Wallet friction (requires crypto wallet)
- ❌ No creator incentives
- ❌ Only 1-2 metrics (not all 4)
- ❌ Low user count (~30 users)

**How Bangr Wins:**
- ✅ Real money attracts serious users
- ✅ Gasless UX (email/wallet/Twitter/guest)
- ✅ Creator revenue share (1%+)
- ✅ **All 4 metrics** (likes, retweets, replies, views)
- ✅ Better economics (Apify vs paid API)

#### Polymarket
**What they do:** Decentralized prediction markets (politics, sports, crypto)

**Strengths:**
- $1B+ valuation
- Proven product-market fit
- High liquidity

**Weaknesses:**
- ❌ Banned in US (CFTC settlement)
- ❌ Requires crypto wallet + USDC
- ❌ No creator incentives
- ❌ Slow resolution (days/weeks/months)
- ❌ Not focused on social media
- ❌ No Twitter engagement markets

**How Bangr Wins:**
- ✅ Niche focus (Twitter engagement)
- ✅ Gasless UX (no wallet/USDC needed)
- ✅ 24h resolution (instant gratification)
- ✅ Creator revenue drives viral growth
- ✅ **4 metric types** for variety

#### Kalshi
**What they do:** CFTC-regulated prediction markets (US)

**Strengths:**
- Legal in US
- Institutional backing
- 60% US market share

**Weaknesses:**
- ❌ Requires bank account verification
- ❌ Limited market types (regulatory)
- ❌ No crypto integration
- ❌ Not social-first
- ❌ High friction onboarding

**How Bangr Wins:**
- ✅ Crypto-native (faster onboarding)
- ✅ Social virality built-in
- ✅ No KYC (pseudonymous)
- ✅ Entertainment-first

### Competitive Moat

**Bangr's Defensibility:**

1. **Network Effects:**
   - More creators → More markets → More users → More volume → More creator revenue → More creators (flywheel)

2. **Data Moat:**
   - Only platform with historical data on all 4 Twitter metrics
   - Engagement prediction models improve over time
   - Creator performance benchmarks

3. **Creator Lock-In:**
   - Revenue share incentivizes loyalty
   - Audience built on platform
   - Switching costs high (lose earnings)

4. **Technical Moat:**
   - Account abstraction expertise (Biconomy)
   - Apify integration know-how (cost advantage)
   - AMM tuning for 4 different metric types

5. **Brand:**
   - First mover in "Twitter engagement prediction markets"
   - "Bangr" brand = hits/bangers (viral tweets)

**What Doesn't Defend:**
- Smart contract code (can be forked)
- UI/UX (can be copied)
- Apify access (anyone can use)

**Strategy:** Win on execution, growth, and network effects

---

## Hackathon Strategy

### Why Bangr Wins Seedify Prediction Markets Hackathon

#### 1. Perfect Fit for YZi Labs Track

**Track Goal:** "Make prediction markets feel like normal apps"

**How Bangr Delivers:**
| Requirement | Hitmaker Solution |
|-------------|-------------------|
| Gasless UX | ✅ Biconomy account abstraction |
| No wallet needed | ✅ Email/Google login primary |
| No crypto complexity | ✅ Users never see BNB, gas, transactions |
| Feels like Web2 | ✅ Twitter-native, familiar UX |
| Multiple login options | ✅ Email, wallet, Twitter, guest |

**Judge Appeal:** This is EXACTLY what they asked for + more

#### 2. Novel Concept

**Why it's unique:**
- ✅ Nobody doing Twitter engagement prediction at scale
- ✅ **Only platform supporting all 4 public metrics**
- ✅ Creator incentives unprecedented in prediction markets
- ✅ Claim mechanism is innovative viral loop
- ✅ Flexible auth (email/wallet/Twitter/guest)
- ✅ Using Apify for 97% cost savings + view counts

**Novelty Score:** 10/10

#### 3. Technical Ambition (Without Overreach)

**Advanced but achievable:**
- ✅ Account abstraction (Biconomy) - impressive, well-documented
- ✅ AMM implementation (FPMM) - proven model
- ✅ Apify integration - clever cost optimization
- ✅ 4 market types - shows depth
- ✅ Flexible auth - real product thinking

**What you're NOT doing (good):**
- ❌ Building new AMM formula
- ❌ Multi-chain complexity
- ❌ Novel cryptography
- ❌ Over-engineering

**Sweet spot:** Ambitious + shippable

#### 4. Clear Business Model

**What judges want:**
- ✅ Revenue: 4% platform fee
- ✅ Margins: 98.5% with Apify (insane)
- ✅ Break-even: 37 markets/month
- ✅ TAM: $5B+ prediction markets
- ✅ GTM: Viral creator incentives

**Judge Appeal:** VCs love marketplaces with high margins

#### 5. The "4 Metrics" Story

**Slide: "Why 4 Metrics?"**
```
Every tweet shows 4 engagement numbers:
💬 Replies - Controversy/discussion
🔄 Retweets - Viral spread
❤️ Likes - Social proof
📊 Views - Reach

Bangr is the ONLY platform where you can bet on ALL 4.

Polymarket: 0 metrics (no Twitter focus)
tweem.lol: 1-2 metrics (limited)
Bangr: 4 metrics (complete)

More metrics = more market types = more volume
```

### Pitch Deck Structure (Updated)

**Slide 1: Hook**
```
"Polymarket for Twitter.
Bet on likes, retweets, replies, and views."

[Screenshot showing all 4 market types]
```

**Slide 2: Problem**
```
1. Influencers can't monetize virality predictions
2. Fans want to engage beyond liking/retweeting
3. Prediction markets have massive UX friction
   (Polymarket requires wallet + USDC)
```

**Slide 3: Solution**
```
Bangr: Bet on ALL 4 Twitter engagement metrics

💬 Replies - "Will this hit 10K replies?"
🔄 Retweets - "Will this get 5K retweets?"
❤️ Likes - "Will this reach 100K likes?"
📊 Views - "Will this hit 10M views?"

✅ Gasless UX (email/wallet/Twitter/guest)
✅ Creators earn 1% + bonuses
✅ 24-hour resolution
```

**Slide 4: How It Works**
```
1. Paste Twitter URL
2. Choose metric (likes/retweets/replies/views)
3. Set threshold
4. Users trade YES/NO shares (AMM pricing)
5. After 24h: Auto-resolve via Apify
6. Winners get paid, creator gets 1%
```

**Slide 5: The 4-Metric Advantage**
```
| Platform | Metrics Supported |
|----------|-------------------|
| Polymarket | 0 (no Twitter focus) |
| tweem.lol | 1-2 (limited) |
| Bangr | 4 (complete) ✅ |

More variety = more users = more volume
```

**Slide 6: Viral Claim Feature**
```
[Diagram]:
Market created → Tweet author notified →
Author claims via Twitter OAuth →
Author promotes to followers →
Volume explodes → Everyone profits
```

**Slide 7: Tech Stack (Hackathon Fit)**
```
✅ BNB Chain (low fees, fast finality)
✅ Biconomy (account abstraction, gasless)
✅ FPMM AMM (proven prediction market model)
✅ Apify (97% cost savings vs Twitter API)
✅ Flexible auth (email/wallet/Twitter/guest)

Perfect for YZi Labs "gasless UX" track
```

**Slide 8: Economics**
```
Revenue: 4% platform fee
Costs: $725/month (Apify + infra)
Break-even: 37 markets/month

Margins: 98.5% (thanks to Apify)
vs 73.5% with Twitter API Pro

Apify saves $4,996/month in API costs
```

**Slide 9: Demo**
```
[Live demo showing]:
1. Email login (gasless)
2. Create views market from Elon tweet
3. Buy YES shares (no wallet)
4. Show all 4 market types
5. Claim feature (Twitter OAuth)
```

**Slide 10: Market Opportunity**
```
Prediction markets: $5B+ annually
Twitter: 500M users, 2.5M influencers
Creator economy: $100B market

Our wedge: Twitter engagement
Our moat: All 4 metrics + creator incentives
```

**Slide 11: Competitive Advantages**
```
vs Polymarket:
✅ Twitter-native, 4 metrics, gasless UX

vs tweem.lol:
✅ Real money, all 4 metrics, creator revenue

vs Kalshi:
✅ No KYC, crypto-native, social virality

Our secret: Apify (97% cheaper + view counts)
```

**Slide 12: Ask**
```
Seeking: $400K from prize pool

Use of funds:
- $60K: Scale to Twitter API Pro (1 year)
- $100K: 2 engineers (6 months)
- $50K: Liquidity bootstrapping
- $100K: Influencer partnerships
- $90K: Infrastructure + buffer

Goal: 10,000 markets, $5M volume, 50K users in Year 1
```

### Demo Strategy (5 minutes)

**Minute 1: Problem**
- Show Polymarket (wallet friction)
- Show tweem.lol (points, no real money)
- "Markets need better UX + more metrics"

**Minute 2: The 4 Metrics**
- Show tweet with all 4 numbers
- "We're the only platform where you can bet on ALL 4"
- Quick examples of each market type

**Minute 3: Create + Trade**
- Email login (show gasless magic)
- Create views market: "Will Elon's tweet hit 10M views?"
- Buy YES shares (no wallet popup)
- Show price update

**Minute 4: Claim Feature**
- "Claim This Market" button
- Twitter OAuth
- Revenue split updates
- "This is how we go viral"

**Minute 5: Resolution**
- Fast-forward simulation
- Apify checks final views
- Market resolves automatically
- Winners get paid
- Creator gets 1%

**Backup:** Pre-recorded video in case live fails

### Judge Q&A Prep

**Q: "Is Apify legal?"**

**A:** "Technically violates Twitter ToS, but it's our pragmatic MVP choice. Three reasons: (1) 97% cost savings lets us validate PMF, (2) Only way to get view counts, (3) Clear migration path to official API post-hackathon. Many successful startups scraped for MVP. We're transparent and ready to migrate."

**Q: "Why not just use Twitter API?"**

**A:** "Three reasons: (1) Cost - $0.75/month with Apify vs $5,000 with Twitter Pro for same volume, (2) View counts - not available in official API at any price tier, (3) Speed - Apify works instantly vs weeks for Twitter approval. For hackathon MVP, Apify is clearly superior."

**Q: "What if Apify breaks?"**

**A:** "Apify guarantees 99.99% uptime and 24h fixes when Twitter changes. We also have: (1) Retry logic (3 attempts), (2) Caching (reduce API calls), (3) Manual resolution fallback, (4) Budget to migrate to official API with prize money."

**Q: "Why 4 metrics vs focusing on 1?"**

**A:** "Each metric appeals to different market types: (1) Views = biggest numbers, most impressive, (2) Likes = most popular, social proof, (3) Retweets = viral spread, (4) Replies = controversy. More variety = more users. Our AMM handles all 4 seamlessly."

---

## Development Roadmap

### Pre-Hackathon (1 week before)

**Infrastructure Setup:**
- [ ] BNB Chain testnet accounts + funds
- [ ] Apify account + API token
- [ ] Biconomy paymaster setup
- [ ] Next.js + Express boilerplate
- [ ] PostgreSQL + Redis deployment

**Smart Contracts:**
- [ ] Hardhat project initialized
- [ ] MarketFactory.sol skeleton
- [ ] PredictionMarket.sol (FPMM) skeleton
- [ ] Treasury.sol skeleton
- [ ] Testing framework (Hardhat + Chai)

### Hackathon Week

#### Day 1-2: Smart Contracts + Backend
- [ ] Implement FPMM logic (buy/sell/resolve)
- [ ] Deploy to BNB testnet
- [ ] Apify integration (getTweetMetrics)
- [ ] Database schema (users, markets, trades)
- [ ] API endpoints (create market, trade, resolve)

#### Day 3-4: Frontend + Auth
- [ ] Landing page (hero, how it works, featured markets)
- [ ] Auth modal (email/wallet/Twitter/guest)
- [ ] Biconomy integration (gasless txs)
- [ ] Create market page (all 4 metrics)
- [ ] Market detail page (trade interface)

#### Day 5: Resolution + Creator Revenue
- [ ] Resolution cron job (Apify → on-chain)
- [ ] Creator revenue calculation
- [ ] Claim feature (Twitter OAuth)
- [ ] Dashboard (creator earnings, portfolio)

#### Day 6: Polish + Testing
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Market discovery (filter by metric type)
- [ ] Social share cards
- [ ] End-to-end testing

#### Day 7: Demo + Pitch
- [ ] Record backup demo video
- [ ] Prepare pitch deck
- [ ] Practice presentation
- [ ] Deploy to production
- [ ] Final testing

### Post-Hackathon

#### Month 1-2:
- [ ] User feedback iteration
- [ ] Add leaderboards
- [ ] Improve AMM pricing
- [ ] Mobile app (React Native)

#### Month 3-6:
- [ ] 10,000 markets milestone
- [ ] Consider Twitter API migration
- [ ] Expand to Instagram/TikTok
- [ ] Liquidity mining rewards

---

## Risk Analysis

### Technical Risks

#### 1. Apify Dependency
**Risk:** Apify scraper breaks, Twitter blocks IPs

**Mitigation:**
- Apify guarantees 24h fixes
- Retry logic (3 attempts)
- Cache responses (reduce calls)
- Fallback to manual resolution
- Budget for Twitter API migration

#### 2. Smart Contract Bugs
**Risk:** AMM exploit, reentrancy attack

**Mitigation:**
- Use proven FPMM model
- ReentrancyGuard on all functions
- Unit tests (>90% coverage)
- Start with low liquidity ($50-100)
- Audit before mainnet (if budget)

#### 3. Account Abstraction Issues
**Risk:** Biconomy paymaster runs out of funds

**Mitigation:**
- Monitor balance daily
- Auto-refill via cron
- Fallback to standard txs
- Keep backup BNB in hot wallet

### Business Risks

#### 1. Regulatory Uncertainty
**Risk:** Classified as gambling

**Mitigation:**
- Frame as "skill-based gaming" (DFS model)
- Geofence restricted jurisdictions
- Legal counsel review
- Transparent terms of service

#### 2. Market Manipulation
**Risk:** Fake engagement purchases

**Mitigation:**
- Monitor velocity spikes
- Partner with bot detection (Botometer)
- Max bet limits
- Flag suspicious markets

#### 3. Chicken-and-Egg
**Risk:** Need creators to attract bettors, vice versa

**Mitigation:**
- Seed supply: Pay influencers $100-500 to create markets
- Platform creates markets proactively
- Focus on claim feature (viral loop)
- Hackathon exposure for initial users

---

## Appendix

### Success Criteria

**Hackathon Win:**
- ✅ Top 3 finish
- ✅ YZi Labs sponsor award
- ✅ "Best UX" or "Most Viable Business" mention

**Month 1:**
- 100 markets created (all 4 metric types)
- $50K total volume
- 500 users
- 10 claimed markets

**Month 6:**
- 1,000 markets
- $500K volume
- 5,000 users
- Break-even

**Year 1:**
- 10,000 markets
- $5M volume
- 50,000 users
- $10K+/month profit
- Expand to Instagram

### Key Metrics to Track

**By Metric Type:**
- Likes markets: 40% (most popular)
- Views markets: 30% (impressive numbers)
- Retweets markets: 20% (viral spread)
- Replies markets: 10% (controversy)

**Engagement:**
- Average market volume by metric type
- Resolution accuracy (predicted vs actual)
- Claim rate (% markets claimed by authors)

### Resources

**Technical:**
- Biconomy: https://docs.biconomy.io/
- Apify: https://docs.apify.com/
- BNB Chain: https://docs.bnbchain.org/
- FPMM: https://www.gwern.net/docs/statistics/decision/2002-hanson.pdf

**Competitors:**
- Polymarket: https://polymarket.com
- Kalshi: https://kalshi.com
- tweem.lol: https://tweem.lol

---

## Final Checklist

**Before Hackathon:**
- [ ] Apify API token secured
- [ ] Biconomy paymaster funded
- [ ] BNB testnet ready
- [ ] Development environment set up

**MVP Must-Haves:**
- [ ] All 4 metric types (likes, retweets, replies, views)
- [ ] Flexible auth (email/wallet/Twitter/guest)
- [ ] Gasless transactions (Biconomy)
- [ ] Apify auto-resolution
- [ ] Creator revenue tracking
- [ ] Claim feature (Twitter OAuth)

**Demo Must-Haves:**
- [ ] Live demo OR backup video
- [ ] Show all 4 market types
- [ ] Show gasless UX (email login)
- [ ] Show claim feature
- [ ] Pitch deck (12 slides)

**Post-Hackathon:**
- [ ] Deploy to mainnet (if funded)
- [ ] Legal review (terms of service)
- [ ] Consider Twitter API migration
- [ ] Launch marketing campaign

---

**That's Bangr. Let's build the future of prediction markets. 🚀**

**Domain:** bangr.lol

**Why "Bangr"?**
- Banger = viral tweet/hit content (Gen Z slang)
- Short, memorable, easy to spell
- .lol domain = perfect for fun, social betting
- Premium 5-letter domain

**Key Differentiators:**
- ✅ Only platform supporting all 4 public Twitter metrics
- ✅ 97% cost savings with Apify ($0.75 vs $100/month)
- ✅ Flexible login (email/wallet/Twitter/guest)
- ✅ View counts available (not in official API)
- ✅ Gasless UX via Biconomy
- ✅ Creator revenue share (1%+ bonuses)
- ✅ Viral claim mechanism

**Ready to win this hackathon!**
