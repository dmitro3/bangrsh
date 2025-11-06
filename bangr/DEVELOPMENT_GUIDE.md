# 💥 BANGR - Complete Development Guide

**Version:** 2.0 (Final)
**Last Updated:** January 2025
**Status:** Ready for Development

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Core Concept: "Pump.fun for Tweets"](#core-concept-pumpfun-for-tweets)
3. [Key Features](#key-features)
4. [Technical Architecture](#technical-architecture)
5. [BNB Chain & Wallet Integration](#bnb-chain--wallet-integration)
6. [Development Roadmap](#development-roadmap)
7. [Cost Analysis](#cost-analysis)
8. [Revenue Model](#revenue-model)
9. [Implementation Details](#implementation-details)
10. [Deployment Checklist](#deployment-checklist)

---

## 🎯 Project Overview

### What is Bangr?

**Bangr is Pump.fun for Tweets** - A prediction market platform where users bet on Twitter engagement metrics (views) within 24 hours.

**The Hook:**
- Just like Pump.fun lets you create and own meme token bonding curves
- Bangr lets you paste a tweet URL and own that market forever
- First-to-paste ownership = you earn 1-2% of ALL volume

### Core Differentiators

✅ **ONE market per tweet** (scarcity creates FOMO)
✅ **First-to-paste ownership** (exactly like Pump.fun)
✅ **Fresh tweets only** (6-hour window prevents gaming)
✅ **Views metric ONLY** (MVP simplification)
✅ **Auto-generated thresholds** (20x current views)
✅ **Gasless UX** (email/Twitter/wallet/guest login via Biconomy)
✅ **Apify oracle** (97% cost savings vs Twitter API)
✅ **BNB Chain** (low fees, fast finality)

### Why This Works

**Scarcity:** One tweet = one market (forever)
**Speculation:** Find viral tweets early before they blow up
**FOMO:** Race to claim fresh tweets before others
**Viral Loop:** Tweet authors claim markets → promote to followers → volume explodes
**Proven Mechanic:** Pump.fun has validated this ownership model

---

## 🚀 Core Concept: "Pump.fun for Tweets"

### The Mechanic Explained

```
Pump.fun:
→ First person creates "PEPE" token
→ They own the bonding curve
→ They earn fees on all trades forever
→ One token = one bonding curve (exclusive)

Bangr:
→ First person pastes Sam Altman's tweet
→ They own the prediction market
→ They earn fees on all trades forever
→ One tweet = one market (exclusive)
```

### Critical Rules

#### Rule #1: One Tweet, One Market (Forever)

**Database Constraint:**
```sql
UNIQUE INDEX ON markets (tweet_id)
```

**What This Means:**
- ✅ First person to paste a tweet URL OWNS that market
- ❌ No one else can create a market for that tweet
- ✅ One canonical market per tweet (clean UX)
- ❌ No duplicate markets (no confusion)

**Example:**
```
12:02 PM - Alice pastes Sam Altman's "GPT-7" tweet
         → Market created, Alice owns it forever
12:03 PM - Bob tries to paste same tweet
         → ❌ BLOCKED: "This tweet already has a market! Trade here: [link]"
```

#### Rule #2: Fresh Tweets Only (6-Hour Window)

**Why Fresh Tweets?**
- ✅ Creates urgency (race to claim tweets)
- ✅ Prevents gaming (can't pick already-viral tweets)
- ✅ Forces speculation (engagement trajectory still forming)
- ✅ Like Pump.fun (find gems early before moon)

**Implementation:**
```javascript
const tweetAge = Date.now() - new Date(tweet.created_at);
const MAX_AGE = 6 * 60 * 60 * 1000; // 6 hours

if (tweetAge > MAX_AGE) {
  throw new Error(
    `This tweet is ${Math.round(tweetAge / 3600000)}h old. ` +
    `Only tweets less than 6 hours old can have markets created.`
  );
}
```

#### Rule #3: 24-Hour Lifecycle (Auto-Resolve)

**Market Timeline:**
```
T+0 min   → Market created (fresh tweet pasted)
T+0-24h   → Trading period (buy/sell YES/NO shares)
T+24h     → Auto-resolution (Apify checks final metrics)
T+24h+    → Archived (stays visible forever as historical record)
```

#### Rule #4: Market Creator Earns 1-2% Forever

**Revenue Scenarios:**

**Scenario A: Market Creator Owns Market Alone**
```
Market Volume: $50,000
Platform Fee (4%): $2,000
Creator Fee (1%): $500

Creator Earnings: $500
```

**Scenario B: Tweet Author Claims Market (50/50 Split)**
```
Market Volume: $50,000
Platform Fee (4%): $2,000
Creator Fee (1%): $500

Split:
- Market Creator: $250 (50% of $500)
- Tweet Author: $250 (50% of $500)
```

**Scenario C: Tweet Author Creates First (Double Earnings)**
```
Market Volume: $50,000
Platform Fee (4%): $2,000
Creator Fee (2%): $1,000 (DOUBLE!)

Tweet Author Earnings: $1,000
```

---

## ⚙️ Key Features

### MVP Features (Hackathon)

#### 1. Market Creation (Views Only)

**Simplified Flow:**
```
1. User pastes tweet URL
2. System validates: unique? fresh? public?
3. Auto-generates: "Will this hit 20x views in 24h?"
4. One-click "Create Market"
5. Done!

Total: 2 steps, zero decisions
```

**Auto-Generated Threshold:**
```javascript
const currentViews = tweet.view_count; // e.g., 50,000
const threshold = currentViews * 20; // e.g., 1,000,000 (20x)

// Market question becomes:
// "Will this tweet hit 1M views in 24h?" (auto-generated)
```

#### 2. Binary Trading (YES/NO Shares)

**FPMM AMM Model:**
- Constant product formula: `x * y = k`
- Users buy/sell YES or NO shares
- Price automatically adjusts based on supply/demand
- Can exit early (sell back to pool)
- Winning shares pay $1 each at resolution

#### 3. Flexible Authentication System

**Four Login Options:**

**Option 1: Email Login (PRIMARY - Easiest)** ⭐
- User enters email → Passwordless magic link
- Biconomy creates ERC-4337 smart account automatically
- User never sees wallet, gas fees, or crypto
- Platform pays gas via Biconomy Paymaster

**Option 2: Social Login (Twitter/Google)** 🐦
- "Sign in with Twitter" → OAuth 2.0 flow
- Links Twitter account to smart account
- Enables claiming markets about their tweets
- Verified badge shows on profile

**Option 3: Wallet Connect (For Crypto Users)** 🔐
- WalletConnect modal: Trust Wallet, MetaMask, Binance Web3 Wallet
- User connects existing wallet
- Optional gasless via Biconomy

**Option 4: Guest Mode (Immediate Trading)** 👤
- Generates ephemeral wallet (localStorage)
- Can trade immediately
- Prompt to "save account" later

#### 4. Apify Auto-Resolution

**Tiered Polling System (Cost-Efficient):**

| Market Age | Update Frequency | Why | Cost |
|------------|------------------|-----|------|
| 0-1h | 30min | High interest, new | 2/h |
| 1-6h | 1h | Active trading | 1/h |
| 6-12h | 2h | Mid-period | 0.5/h |
| 12-23h | 3h | Winding down | 0.33/h |
| 23-24h | 30min | Final stretch | 2/h |
| 24h | Once | Resolution | 1 call |

**Total: ~15-20 calls per market**
**Cost: $0.005 per market (half a cent!)**

**Resolution Flow:**
```javascript
async function resolveMarket(market) {
  // 1. Fetch final metrics from Apify
  const tweet = await apify.getTweet(market.tweet_id);
  const finalValue = tweet.view_count;

  // 2. Determine outcome
  const outcome = finalValue >= market.threshold;

  // 3. Resolve on-chain
  await predictionMarket.resolve(outcome, finalValue);

  // 4. Calculate creator revenue
  await calculateCreatorRevenue(market);

  // 5. Notify users
  await notifyUsers(market, outcome);
}
```

#### 5. Creator Revenue Share

**Who Earns:**
- **Market creator (default):** 1% if they created market
- **Tweet author (claimed):** 0.5% creator + 0.5% author if claimed
- **Tweet author (created first):** 2% if they created market about own tweet

**Bonuses (Tiered):**
```
$5K volume → $50 bonus
$20K volume → $200 bonus
$50K volume → $500 bonus
$100K+ volume → $1,000 bonus
```

#### 6. Claim Feature (The Viral Mechanic)

**Flow:**
```
Step 1: Market Created
→ Random user creates: "Will @MrBeast's tweet hit 10M views in 24h?"

Step 2: Notification
→ System sends notification to @MrBeast
→ "Someone created a prediction market about your tweet!"

Step 3: Verification
→ MrBeast clicks "Claim This Market"
→ Twitter OAuth verifies @MrBeast owns account

Step 4: Claim Successful
→ Revenue split updates: 50% creator, 50% MrBeast
→ Market UI: "✅ Verified by @MrBeast" badge

Step 5: MrBeast Promotes
→ MrBeast tweets to 200M followers
→ Volume explodes to $50K
→ MrBeast earns $500 (1% of $50K)
→ Platform earns $2,000 (4%)
→ Everyone wins
```

---

## 🏗️ Technical Architecture

### Tech Stack Overview

**Blockchain Layer:**
- **Chain:** BNB Chain (mainnet: 56, testnet: 97)
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
- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL
  - Users table (auth methods, wallet addresses)
  - Markets table (tweet_id, metric_type, threshold, creator)
  - Trades table (user_id, market_id, shares, price)
  - Snapshots table (periodic Apify data)
- **Cache:** Redis
  - Apify response caching
  - Real-time market data
- **Queue:** Bull/BullMQ
  - Market resolution jobs (24h scheduled)
  - Tweet metric polling
  - Notification system

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Web3:**
  - Biconomy SDK (account abstraction)
  - wagmi + viem (Ethereum interactions)
  - WalletConnect v2
- **State Management:** Zustand
- **Auth:** Privy or Dynamic (social login)

**External APIs:**
- **Apify:** Twitter scraping ($0.25 per 1,000 tweets)
  - Actor: `kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest`
  - Gets: likes, retweets, replies, views
- **Biconomy:** Paymaster for gasless transactions

### Smart Contract Architecture

#### MarketFactory.sol

```solidity
contract MarketFactory {
    enum MetricType { VIEWS } // MVP: Views only

    struct MarketParams {
        string tweetId;
        string tweetUrl;
        uint256 threshold;
        address creator;
        uint256 initialLiquidity;
    }

    mapping(uint256 => address) public markets;
    uint256 public marketCount;

    function createMarket(MarketParams calldata params)
        external
        payable
        returns (address marketAddress)
    {
        // Deploy new prediction market contract
        PredictionMarket market = new PredictionMarket{value: msg.value}(
            params.tweetId,
            params.threshold,
            params.creator,
            params.initialLiquidity
        );

        markets[marketCount] = address(market);
        marketCount++;

        return address(market);
    }
}
```

#### PredictionMarket.sol (FPMM AMM)

```solidity
contract PredictionMarket is ReentrancyGuard {
    // Market state
    string public tweetId;
    uint256 public threshold;
    address public creator;
    bool public resolved;
    bool public outcome;
    uint256 public resolutionTime;

    // AMM state (Fixed Product Market Maker)
    uint256 public yesShares = 100;
    uint256 public noShares = 100;
    uint256 public constant k = 10_000;

    // User positions
    mapping(address => uint256) public yesBalances;
    mapping(address => uint256) public noBalances;

    // Fee configuration
    uint256 public constant PLATFORM_FEE = 400; // 4%
    uint256 public constant CREATOR_FEE = 100;  // 1%
    uint256 public totalVolume;

    constructor(
        string memory _tweetId,
        uint256 _threshold,
        address _creator,
        uint256 _initialLiquidity
    ) payable {
        tweetId = _tweetId;
        threshold = _threshold;
        creator = _creator;
        resolutionTime = block.timestamp + 24 hours;
    }

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
    }

    function resolve(bool _outcome, uint256 finalMetric) external onlyOwner {
        require(!resolved, "Already resolved");
        require(block.timestamp >= resolutionTime, "Too early");

        outcome = _outcome;
        resolved = true;
    }

    function claimWinnings() external nonReentrant {
        require(resolved, "Not resolved yet");
        uint256 shares = outcome ? yesBalances[msg.sender] : noBalances[msg.sender];
        require(shares > 0, "No winning shares");

        uint256 payout = shares * 1 ether;

        if (outcome) {
            yesBalances[msg.sender] = 0;
        } else {
            noBalances[msg.sender] = 0;
        }

        payable(msg.sender).transfer(payout);
    }
}
```

### Database Schema

```sql
-- Markets table (one row per tweet)
CREATE TABLE markets (
  id SERIAL PRIMARY KEY,
  tweet_id VARCHAR(255) UNIQUE NOT NULL, -- ← UNIQUE CONSTRAINT
  tweet_url TEXT NOT NULL,
  tweet_text TEXT,
  tweet_author_id VARCHAR(255),
  tweet_author_username VARCHAR(255),
  tweet_created_at TIMESTAMP,

  metric_type VARCHAR(50) DEFAULT 'VIEWS',
  threshold BIGINT NOT NULL,
  starting_value BIGINT NOT NULL,

  creator_address VARCHAR(255) NOT NULL,
  claimed_by VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,

  status VARCHAR(50) DEFAULT 'ACTIVE',
  resolved BOOLEAN DEFAULT FALSE,
  outcome BOOLEAN,
  final_value BIGINT,

  total_volume BIGINT DEFAULT 0,
  creator_earnings BIGINT DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  resolves_at TIMESTAMP NOT NULL,
  resolved_at TIMESTAMP,
  last_polled_at TIMESTAMP,

  market_address VARCHAR(255),
  tx_hash VARCHAR(255)
);

-- Snapshots table (periodic Apify polls)
CREATE TABLE market_snapshots (
  id SERIAL PRIMARY KEY,
  market_id INTEGER REFERENCES markets(id),
  metric_value BIGINT NOT NULL,
  percentage_to_goal DECIMAL(5,2),
  fetched_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_markets_tweet_id ON markets(tweet_id);
CREATE INDEX idx_markets_status ON markets(status) WHERE status = 'ACTIVE';
CREATE INDEX idx_snapshots_market_id ON market_snapshots(market_id);
```

---

## 🔗 BNB Chain & Wallet Integration

### Most Popular BNB Chain Wallets (2025)

1. **Trust Wallet** - 190M+ users, official Binance wallet
2. **MetaMask** - Multi-chain support, most popular Web3 wallet
3. **Binance Web3 Wallet** - Native BNB Chain integration
4. **SafePal** - Hardware + software combo

### Recommended Wallet Integration Stack

**Primary Choice: Biconomy + Privy**

#### Why Biconomy?
- ✅ Best-in-class account abstraction for BNB Chain
- ✅ Native BNB Chain support (56 mainnet, 97 testnet)
- ✅ ERC-4337 compliant
- ✅ Gasless transactions via Paymaster
- ✅ 240K+ transactions on opBNB (proven at scale)

#### Why Privy?
- ✅ Same tech PancakeSwap uses for social login on BNB Chain
- ✅ Email, Twitter, Google, Discord, Telegram login
- ✅ Embedded wallets with self-custody
- ✅ Non-custodial (users control keys)
- ✅ Battle-tested in production

#### Alternative: Dynamic
- Also offers excellent social login
- Multi-chain support
- Embedded wallets
- Slightly more developer-friendly docs

### Implementation: Biconomy Setup

**Install Dependencies:**
```bash
npm install @biconomy/account @biconomy/bundler @biconomy/paymaster
```

**Initialize Smart Account:**
```typescript
import { BiconomySmartAccountV2 } from '@biconomy/account';

const smartAccount = await BiconomySmartAccountV2.create({
  chainId: 56, // BNB Chain mainnet (or 97 for testnet)
  bundler: {
    url: process.env.BICONOMY_BUNDLER_URL,
  },
  paymaster: {
    url: process.env.BICONOMY_PAYMASTER_URL,
  },
  signer: userSigner, // from email/wallet/Twitter auth
});
```

**Send Gasless Transaction:**
```typescript
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

### Implementation: Privy Setup

**Install Dependencies:**
```bash
npm install @privy-io/react-auth @privy-io/server-auth
```

**Configure Privy Provider:**
```typescript
import { PrivyProvider } from '@privy-io/react-auth';

<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
  config={{
    loginMethods: ['email', 'twitter', 'google', 'wallet'],
    appearance: {
      theme: 'dark',
      accentColor: '#FFB627',
    },
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
    },
  }}
>
  {children}
</PrivyProvider>
```

**Login Modal Component:**
```typescript
import { usePrivy } from '@privy-io/react-auth';

export function LoginModal() {
  const { login, authenticated, user } = usePrivy();

  return (
    <div className="modal">
      <h2>Welcome to Bangr 💥</h2>
      <p>Bet on Twitter engagement</p>

      <button onClick={() => login()}>
        📧 Continue with Email
      </button>

      <button onClick={() => login({ loginMethod: 'twitter' })}>
        🐦 Sign in with Twitter
      </button>

      <button onClick={() => login({ loginMethod: 'wallet' })}>
        🔗 Connect Wallet
      </button>

      <button onClick={() => enableGuestMode()}>
        👤 Continue as Guest
      </button>
    </div>
  );
}
```

### WalletConnect Integration

**Install Dependencies:**
```bash
npm install wagmi viem @web3modal/wagmi
```

**Configure Wagmi:**
```typescript
import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { walletConnect, injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    walletConnect({ projectId: process.env.WALLETCONNECT_PROJECT_ID }),
    injected(), // MetaMask, Trust Wallet
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
```

---

## 📅 Development Roadmap

### Phase 1: Smart Contracts (Days 1-2)

**Tasks:**
- [ ] Set up Hardhat project
- [ ] Write MarketFactory.sol with UNIQUE tweet_id constraint
- [ ] Write PredictionMarket.sol with FPMM logic
- [ ] Write Treasury.sol for creator payouts
- [ ] Unit tests (>90% coverage)
- [ ] Deploy to BNB Testnet (chain ID: 97)
- [ ] Get testnet BNB from faucet
- [ ] Verify contracts on BSCScan

**Key Features:**
- One tweet, one market (database + smart contract validation)
- 6-hour freshness check
- Auto-generated threshold (current views × 20)
- 24-hour lifecycle
- 1-2% creator revenue

### Phase 2: Account Abstraction (Day 3)

**Tasks:**
- [ ] Create Biconomy account at dashboard.biconomy.io
- [ ] Get API keys (Bundler URL + Paymaster URL)
- [ ] Set up Paymaster for BNB Chain
- [ ] Fund Paymaster with BNB for gasless txs
- [ ] Install Biconomy SDK
- [ ] Test smart account creation
- [ ] Test gasless transaction sending

### Phase 3: Authentication (Days 4-5)

**Tasks:**
- [ ] Set up Privy account (or Dynamic)
- [ ] Configure login methods: Email, Twitter, Google, Wallet
- [ ] Create login modal UI
- [ ] Integrate with Biconomy for smart account creation
- [ ] Implement guest mode (ephemeral wallets)
- [ ] Test all 4 login flows end-to-end

**Deliverables:**
- Working email login with magic link
- Twitter OAuth for claim feature
- WalletConnect for crypto natives
- Guest mode for immediate access

### Phase 4: Backend API (Day 5)

**Tasks:**
- [ ] Set up PostgreSQL database
- [ ] Create database schema (markets, snapshots, users, trades)
- [ ] Set up Redis for caching
- [ ] Create Apify client
- [ ] Build API endpoints:
  - `POST /api/markets` - Create market
  - `GET /api/markets/:id` - Get market details
  - `GET /api/tweets/:id/metrics` - Fetch tweet data
  - `POST /api/markets/:id/resolve` - Resolve market
  - `POST /api/markets/:id/claim` - Claim market (Twitter OAuth)
- [ ] Implement tiered polling cron job
- [ ] Set up WebSocket for real-time updates

### Phase 5: Frontend (Days 6-7)

**Tasks:**
- [ ] Landing page with hero + auth modal
- [ ] Market creation page:
  - Paste tweet URL input
  - Auto-validate (unique? fresh? public?)
  - Auto-generate preview
  - One-click create button
- [ ] Market detail page:
  - Real-time view count chart
  - YES/NO trading interface
  - Progress indicator
  - Claim button (for tweet authors)
- [ ] User dashboard:
  - Portfolio (positions)
  - Markets created
  - Earnings
- [ ] Mobile responsive design
- [ ] Error handling & loading states

### Phase 6: Claim Feature (Day 8)

**Tasks:**
- [ ] Twitter OAuth app setup
- [ ] Claim endpoint (`POST /api/markets/:id/claim`)
- [ ] Verify requester owns tweet (OAuth twitter_id === tweet author_id)
- [ ] Update revenue split (50/50 after claim)
- [ ] Add "✅ Verified by @username" badge
- [ ] Test claim flow end-to-end

### Phase 7: Testing & Polish (Days 9-10)

**Tasks:**
- [ ] End-to-end testing (create → trade → resolve → claim)
- [ ] Security audit (basic checks)
- [ ] Gas optimization
- [ ] Error handling improvements
- [ ] Mobile testing (iOS + Android)
- [ ] Performance optimization
- [ ] Record backup demo video
- [ ] Practice pitch (5 minutes)
- [ ] Deploy to production

---

## 💰 Cost Analysis

### Monthly Operating Costs

**At Scale (1,000 markets/month):**
```
Apify (1,000 markets × $0.005): $5
Biconomy Paymaster (usage-based): $100-500
Infrastructure:
  - Vercel (frontend): $20
  - Railway (backend): $50
  - PostgreSQL: $50
  - Redis: $30
─────────────────────────────────────
Total: $255-655/month

vs. Twitter API Pro: $5,000/month
Savings: $4,345-4,745/month (87-94%)
```

### Break-Even Analysis

```
Monthly costs: ~$655 (high estimate)
Platform fee: 4%

Break-even volume: $655 ÷ 0.04 = $16,375/month

If average market = $500:
  Need 33 markets/month to break even

If average market = $1,000:
  Need 17 markets/month to break even

Extremely achievable!
```

### Per Market Economics

```
Average market: $1,000 volume
Platform revenue (4%): $40
Creator payout (1%): $10
Apify cost: $0.005
Gas costs: ~$5
Profit per market: ~$25

Margin: 62.5%
```

### Scaling Costs

```
100 markets/month:
- Apify: $0.50
- Total costs: ~$300
- Need: $7,500 volume to break even
- Profit margin: 96%

1,000 markets/month:
- Apify: $5
- Total costs: ~$655
- Need: $16,375 volume to break even
- Profit margin: 96%

10,000 markets/month:
- Apify: $50
- Total costs: ~$700
- Need: $17,500 volume to break even
- Profit margin: 96%
```

---

## 💵 Revenue Model

### Fee Structure

**Total Fees: 5%**
- 4% Platform fee
- 1% Creator fee (split based on claim status)

### Revenue Scenarios

**Scenario A: Market Creator Alone**
```
Market volume: $10,000
Platform fee (4%): $400
Creator fee (1%): $100

Platform net: $400
Creator earnings: $100
```

**Scenario B: Tweet Author Claims**
```
Market volume: $10,000
Platform fee (4%): $400
Creator fee (1%): $100

Split 50/50:
- Market creator: $50
- Tweet author: $50

Platform net: $400
```

**Scenario C: Tweet Author Creates First**
```
Market volume: $10,000
Platform fee (4%): $400
Creator fee (2%): $200 (DOUBLE!)

Platform net: $400
Tweet author earnings: $200
```

### Bonus Structure

```
Volume Tier     Bonus
$5K             $50
$20K            $200
$50K            $500
$100K+          $1,000
```

### Revenue Projections

**Month 1 (Hackathon):**
```
Markets: 100
Avg volume: $500
Total volume: $50,000
Platform revenue: $2,000
Costs: $300
Net profit: $1,700
```

**Month 6:**
```
Markets: 1,000
Avg volume: $1,000
Total volume: $1,000,000
Platform revenue: $40,000
Costs: $655
Net profit: $39,345
```

**Year 1:**
```
Markets: 10,000
Avg volume: $2,000
Total volume: $20,000,000
Platform revenue: $800,000
Costs: $700
Net profit: $799,300
```

---

## 🛠️ Implementation Details

### Environment Variables

```env
# Blockchain
NEXT_PUBLIC_BNB_CHAIN_ID=56
NEXT_PUBLIC_BNB_TESTNET_CHAIN_ID=97
NEXT_PUBLIC_RPC_URL=https://bsc-dataseed.binance.org/

# Biconomy
NEXT_PUBLIC_BICONOMY_BUNDLER_URL=
NEXT_PUBLIC_BICONOMY_PAYMASTER_URL=
BICONOMY_API_KEY=

# Privy (or Dynamic)
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# Apify
APIFY_API_TOKEN=

# Database
DATABASE_URL=postgresql://user:password@host:5432/bangr
REDIS_URL=redis://host:6379

# Twitter OAuth
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

### Deployment Checklist

**Pre-Deploy:**
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Smart contracts deployed to BNB mainnet
- [ ] Biconomy Paymaster funded (at least 1 BNB)
- [ ] Apify API token active
- [ ] Twitter OAuth app approved
- [ ] Domain configured (bangr.lol)

**Deploy Steps:**
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Set up PostgreSQL (Supabase or Neon)
- [ ] Set up Redis (Upstash)
- [ ] Configure custom domain
- [ ] Set up monitoring (Sentry)
- [ ] Set up analytics (PostHog)
- [ ] Enable HTTPS
- [ ] Test all flows in production

**Post-Deploy:**
- [ ] Monitor Biconomy Paymaster balance
- [ ] Monitor Apify usage
- [ ] Set up alerts (low balance, errors)
- [ ] Create first market manually
- [ ] Share on Twitter
- [ ] Collect user feedback

---

## 📊 Success Metrics

### Hackathon (Week 1)

- [ ] 100 markets created
- [ ] $50K total volume
- [ ] 500 users
- [ ] 10 claimed markets
- [ ] Break-even (33 markets @ $500 avg)

### Month 1

- [ ] 300 markets
- [ ] $150K volume
- [ ] 1,500 users
- [ ] 30 claimed markets
- [ ] $5K profit

### Month 6

- [ ] 1,000 markets
- [ ] $1M volume
- [ ] 10,000 users
- [ ] 100 claimed markets
- [ ] $39K profit

### Year 1

- [ ] 10,000 markets
- [ ] $20M volume
- [ ] 100,000 users
- [ ] 1,000 claimed markets
- [ ] Consider Twitter API migration
- [ ] Consider adding more metrics (likes, retweets, replies)

---

## 🚨 Risk Mitigation

### Technical Risks

**Risk: Apify scraper breaks**
- Mitigation: Retry logic (3 attempts), cache responses, fallback to manual resolution, budget for Twitter API migration

**Risk: Smart contract bugs**
- Mitigation: Use proven FPMM model, ReentrancyGuard on all functions, unit tests (>90% coverage), start with low liquidity

**Risk: Biconomy Paymaster runs out of funds**
- Mitigation: Monitor balance daily, auto-refill via cron, fallback to standard txs, keep backup BNB

### Business Risks

**Risk: Regulatory classification as gambling**
- Mitigation: Frame as "skill-based gaming" (DFS model), geofence restricted jurisdictions, legal counsel review

**Risk: Market manipulation (fake engagement)**
- Mitigation: Monitor velocity spikes, partner with bot detection (Botometer), max bet limits, flag suspicious markets

**Risk: Chicken-and-egg (need creators + bettors)**
- Mitigation: Seed supply (pay influencers to create markets), platform creates markets proactively, focus on claim feature

---

## 🎯 Next Steps

### Immediate Actions (This Week)

1. **Set up Biconomy account** → Get API keys
2. **Set up Privy account** → Configure social login
3. **Deploy smart contracts** to BNB Testnet
4. **Build authentication flow** → Test email + Twitter + wallet + guest
5. **Create first market** → End-to-end test

### Questions to Answer

- Which social login provider? (Privy vs Dynamic)
- What's our backup plan if Apify breaks?
- Should we add Telegram login?
- Should we support opBNB (Layer 2) for even cheaper gas?

---

**Ready to build? Let's ship this! 🚀**

**Repository:** https://github.com/nocaligic/bangr.git
**Domain:** bangr.lol
**Chain:** BNB Smart Chain (56 mainnet, 97 testnet)
**Target:** Seedify Prediction Markets Hackathon
