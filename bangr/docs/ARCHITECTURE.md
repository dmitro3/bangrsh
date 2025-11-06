# Bangr Phase 1: Smart Contract Specification

## ✅ CONFIRMED DECISIONS

### 1. Metrics (4 Separate)
Users can bet on **4 different metrics** per tweet:
- **Views** 👁️
- **Likes** ❤️
- **Retweets** 🔁
- **Comments** 💬

**Why:** More betting opportunities, differentiates from competitors like tweem.lol, each metric has different dynamics.

---

### 2. Time Windows (2 Options)
Each market has **2 possible durations**:
- **6 hours** (fast markets for breaking news/viral content)
- **24 hours** (standard markets for most tweets)

**Why:** Provides both short-term action and standard timeframes without overwhelming users.

---

### 3. Target Calculation (Simplified Multiplier System)
Users pick from **4 preset multipliers** (no custom inputs):
- **2x** = Easy (likely to hit)
- **5x** = Medium
- **10x** = Hard
- **20x** = Very Hard

**Example Flow:**
1. User pastes tweet URL
2. System shows current views: "2.5M"
3. User picks 10x multiplier
4. Target becomes: 25M views
5. Market question: "Will this hit 25M views in 24h?"

**Safety Cap:** Maximum 100x multiplier to prevent unrealistic targets.

**Why:** Simple for users, prevents confusion, creates clear difficulty levels.

---

### 4. Smart Contract Structure (Order Book Model)
```solidity
enum MetricType {
    VIEWS,
    LIKES,
    RETWEETS,
    COMMENTS
}

enum Duration {
    SIX_HOURS,
    TWENTY_FOUR_HOURS
}

enum ResolutionStatus {
    PENDING,
    RESOLVED_YES,     // YES wins
    RESOLVED_NO,      // NO wins
    RESOLVED_INVALID  // Both redeem for $0.50
}

struct Market {
    uint id;
    string tweetUrl;
    string tweetId;
    string authorHandle;      // @username
    address scout;            // Market creator
    address claimedBy;        // Tweet author (if claimed)
    bool isClaimed;
    MetricType metric;
    Duration duration;
    uint currentValue;        // Snapshot at creation
    uint targetValue;         // currentValue * multiplier
    uint multiplier;          // 2, 5, 10, or 20
    uint startTime;
    uint endTime;
    ResolutionStatus status;
    uint yesTokenId;          // ERC-1155 token ID for YES shares
    uint noTokenId;           // ERC-1155 token ID for NO shares
}

struct Order {
    uint orderId;
    uint marketId;
    address maker;
    bool isBuyOrder;          // true = buy, false = sell
    bool isYesShare;          // true = YES, false = NO
    uint shares;              // Number of shares
    uint pricePerShare;       // Price in USDC (6 decimals)
    uint filledShares;        // Shares already filled
    bool cancelled;
}
```

---

### 5. Market Combinations Per Tweet
Each tweet can have up to **32 unique markets**:
- 4 metrics × 2 durations × 4 multipliers = 32 markets
- Each (metric + duration + multiplier) combo can only exist ONCE per tweet (prevents spam)

**Example for @elonmusk tweet:**
1. Views 6h 2x
2. Views 6h 5x
3. Views 6h 10x
4. Views 6h 20x
5. Views 24h 2x
6. Views 24h 5x
7. Views 24h 10x
8. Views 24h 20x
9-16. Likes (same 8 combinations)
17-24. Retweets (same 8 combinations)
25-32. Comments (same 8 combinations)

**Why:** Prevents vamp attacks (like Pump.fun coin duplicates), ensures market uniqueness, allows multiple difficulty levels per metric.

---

### 6. Trading Mechanism: Order Book (Polymarket-Style)

**Bangr uses a Central Limit Order Book (CLOB), NOT an AMM.**

#### **How It Works:**

**Order Types:**
- **Limit Orders**: "I'll buy 100 YES shares at 65¢ each"
- **Market Orders**: "Buy YES shares at best available price"

**Order Matching:**
- Buyers and sellers post orders to the order book
- When bid price ≥ ask price, orders match automatically
- Trades execute instantly when matches occur

**Fee Structure:**
- **Maker Fee**: 0% (encourages liquidity)
- **Taker Fee**: 2% (charged to order filler)
- Fees distributed to Scout/Author/Protocol based on claim status

**Example Trade Flow:**
1. Alice posts: "Selling 100 YES at 67¢" (maker order)
2. Bob sees it and clicks: "Buy YES at market price" (taker order)
3. Trade executes at 67¢
4. Bob receives 100 YES shares
5. Alice receives $67 USDC minus 2% fee ($65.66)
6. Protocol/Scout/Author split the $1.34 fee

**Why Order Book Instead of AMM:**
- ✅ No slippage on limit orders (you get exactly the price you want)
- ✅ Can scale to unlimited liquidity (no caps needed)
- ✅ Industry standard for prediction markets (Polymarket, Augur)
- ✅ More professional, less "casino-like" feeling
- ✅ Better price discovery and stability

---

### 7. Oracle Integration (Apify)
**Data Source:** Apify Twitter API
- Fetches tweet metrics (views, likes, retweets, comments)
- Takes snapshot at market creation (baseline)
- Takes snapshot at market expiration (final value)
- **Resolution Delay**: 2 hours after market expires before resolution
- Determines if target was reached (final ≥ target → YES wins)

---

### 8. Collateral Token: USDC

**All markets use USDC as collateral (NOT BNB or native tokens).**

**Why USDC:**
- ✅ No price volatility ($10 is always $10)
- ✅ Users can reason about profits clearly
- ✅ Industry standard for prediction markets
- ✅ Better UX than fluctuating native tokens

**How It Works:**
- Scouts deposit USDC to create markets
- Traders buy shares with USDC
- Winners redeem shares for USDC
- All fees paid in USDC

---

### 9. UI Features (Already Built)
✅ Homepage with market cards
✅ Market detail pages with price charts
✅ Trading modal with confetti celebration
✅ Portfolio page with real positions tracking
✅ Wallet connection (Privy integration ready)
✅ Toast notifications for successful trades
✅ Real-time P&L calculations

**Note:** Frontend currently uses fake wallet and positions. Will be updated to connect to real smart contracts in Phase 1.

---

### 10. Market Creation & Target Calculation Rules (✅ LOCKED IN)

Based on community feedback and internal review, the following rules for market creation and target calculation have been **FINALIZED** to balance user freedom with market integrity.

#### Rule 1: Minimum Creation Thresholds ✅
To prevent guaranteed-outcome markets and ensure a baseline level of uncertainty, a tweet must have minimum traction before a market can be created on it.

**Required Minimums:**
- **Views:** 10,000 minimum
- **Likes:** 500 minimum
- **Retweets:** 100 minimum
- **Comments:** 50 minimum

**Why This Works:**
- Filters out "guaranteed to 2x" garbage markets
- Still allows early discovery (10K views is early for viral content)
- Creates actual uncertainty and interesting price discovery
- Prevents platform spam and low-quality markets

**Smart Contract Implementation:**
```solidity
// USDC as collateral token (6 decimals)
IERC20 public immutable collateralToken;

function createMarket(
    string memory tweetUrl,
    MetricType metric,
    Duration duration,
    uint multiplier
) external returns (uint marketId) {
    uint currentValue = fetchMetricFromApify(tweetUrl, metric);

    // Enforce minimum thresholds
    if (metric == MetricType.VIEWS) {
        require(currentValue >= 10000, "Tweet must have 10K+ views");
    } else if (metric == MetricType.LIKES) {
        require(currentValue >= 500, "Tweet must have 500+ likes");
    } else if (metric == MetricType.RETWEETS) {
        require(currentValue >= 100, "Tweet must have 100+ retweets");
    } else if (metric == MetricType.COMMENTS) {
        require(currentValue >= 50, "Tweet must have 50+ comments");
    }

    // Scout must deposit $10 USDC for initial liquidity
    uint initialLiquidity = 10 * 10**6; // 10 USDC (6 decimals)
    require(
        collateralToken.transferFrom(msg.sender, address(this), initialLiquidity),
        "USDC transfer failed"
    );

    // Mint 10 YES + 10 NO shares to scout
    uint yesTokenId = _getYesTokenId(marketId);
    uint noTokenId = _getNoTokenId(marketId);
    _mint(msg.sender, yesTokenId, 10 * 10**18, "");
    _mint(msg.sender, noTokenId, 10 * 10**18, "");

    // Continue with market creation...
}
```

#### Rule 2: Simple, Universal Multipliers ✅
The multiplier system will be kept simple and consistent for all markets, regardless of the tweet's current metrics.

**Allowed Multipliers:**
- **2x** = Easy mode (likely to hit)
- **5x** = Medium difficulty
- **10x** = Hard mode
- **20x** = Moon shot
- **100x safety cap** (maximum allowed)

**Why This Works:**
- Dead simple to understand: "Pick 2x, 5x, 10x, or 20x"
- No complex rules about tweet size or account size
- Minimum thresholds already prevent "too easy" markets
- Consistent user experience across all markets

**Example:**
- Tweet has 50K views
- User picks 5x multiplier
- Target = 50K × 5 = 250K views
- Market question: "Will this hit 250K views in 24h?"

#### Rule 3: Account Size is Ignored ✅
The system will **NOT** factor in the tweet author's follower count or verification status.

**Why This Works:**
- **The market prices it in naturally:** Traders will see it's an Elon tweet and price YES higher
- **Simpler smart contract:** No need to fetch follower counts or verification status
- **Avoids edge cases:** What about bought followers? Shadow bans? Account deletions?
- **Trust in market efficiency:** The crowd is smarter than any algorithm we could write

**Example:**
- @elonmusk tweet (160M followers) at 10K views → 2x target = 20K
- @randomguy (50 followers) at 10K views → 2x target = 20K
- System treats them identically
- Market prices YES at 95¢ for Elon, 30¢ for random guy
- **This is working correctly**

#### Rule 4: No Tweet Age Restrictions ✅
Markets can be created on tweets of **any age**. No maximum age limit.

**Why This Works:**
- **Tweet resurrection is real:** Old tweets go viral again when quote-tweeted or resurfaced
- **Market self-regulates:** 3-day-old tweet at 100K trying to hit 200K? NO shares price at 95¢, boring market
- **Prevents farming?** Yes, but returns are so small nobody bothers
- **Simpler rules:** One less restriction to explain
- **Easy to add later:** If this becomes a problem (unlikely), we can add age limits in V2

**Edge Case Example:**
- Tweet from 3 days ago: 100K views (completely dead)
- Someone creates: "Will this hit 200K (2x) in 24h?"
- Traders look at engagement curve → obviously flatlined
- NO shares price at 98¢, YES at 2¢
- Nobody trades it because returns are terrible
- **Not an exploit, just a boring market that gets ignored**

---

## 📊 Complete Market Creation Flow (FINALIZED)

**Step-by-Step User Experience:**

1. **User finds a tweet they think will go viral**
   - Could be brand new (just hit 10K views)
   - Could be established (already at 2M views)
   - Could be old but resurging

2. **User pastes tweet URL into Bangr**
   - System fetches current metrics via Apify

3. **System validates minimum thresholds**
   - ✅ Views ≥ 10K? Likes ≥ 500? Retweets ≥ 100? Comments ≥ 50?
   - ❌ If not met: "This tweet needs more traction to create a market"

4. **User selects parameters**
   - **Metric:** Views, Likes, Retweets, or Comments
   - **Duration:** 6h or 24h
   - **Multiplier:** 2x, 5x, 10x, or 20x

5. **System calculates target**
   - Target = Current Value × Multiplier
   - Example: 50K views × 10x = 500K target

6. **Market goes live instantly**
   - Market question: "Will this tweet hit 500K views in the next 24h?"
   - Trading begins immediately
   - Users bet YES or NO

---

## 🎯 Tech Stack

### Smart Contracts
- **Language:** Solidity ^0.8.20
- **Framework:** Hardhat
- **Standards:** ERC-1155 (share tokens), OpenZeppelin
- **Network:** BNB Chain Testnet (then mainnet)

### Frontend
- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Y2K retro theme)
- **Charts:** Recharts
- **Wallet:** Privy + Biconomy (account abstraction)
- **Blockchain:** Ethers.js v6

---

## 📊 User Journey (Confirmed)

### Betting Flow:
1. User connects wallet
2. Browses available markets
3. Clicks market → sees detail page
4. Clicks YES or NO button
5. Trading modal opens
6. Enters amount ($10, $25, $50, $100)
7. Reviews: shares, avg price, price impact
8. Confirms trade
9. 🎉 Confetti + Toast notification
10. Position appears in portfolio

### Market Resolution:
1. Market expires (6h or 24h passes)
2. Oracle fetches final tweet metrics
3. Compares final value to target
4. Market resolves (YES wins or NO wins)
5. Winners can claim winnings
6. Losers' shares become worthless

---

## ✅ LOCKED IN: The "Finder's Fee" Model

Based on community feedback and analysis, we've finalized the market creation and fee distribution system.

### **Public Creation with Finder's Fee**

**Anyone can create markets** for any tweet that meets minimum thresholds. The creator becomes the "Scout" and earns fees.

---

### Fee Distribution System

#### **Before Author Claims (Unclaimed Markets):**
When a Scout creates a market and the tweet author hasn't claimed it yet:

- **Scout:** 50%
- **Protocol:** 50%
- **Author:** 0%

#### **After Author Claims (Claimed Markets):**
When the tweet author verifies ownership and claims their account:

- **Tweet Author:** 70%
- **Protocol:** 20%
- **Scout:** 10% (permanent "finder's fee")

**Key Points:**
- Author claiming is **account-level**, not per-market
- Once claimed, ALL past and future markets for that Twitter handle update fee structure
- Scout always earns something (50% before, 10% after)
- Creates viral loop: more markets → more authors join → more legitimacy

---

### Initial Liquidity Requirement (✅ FINALIZED)

To prevent spam and ensure tradeable markets, scouts must provide initial liquidity:

**Requirements:**
- **Minimum deposit:** $10 USDC
- Scout receives: 10 YES shares + 10 NO shares
- Scout can post these shares to the order book immediately
- Creates instant liquidity for other traders

**Benefits:**
- ✅ Prevents spam (costs $10 to create)
- ✅ Creates immediate trading liquidity (scout can post sell orders)
- ✅ Aligns incentives (scouts should believe in their markets)
- ✅ Scout can sell shares to recoup cost + earn fees as market creator

---

### Market Uniqueness & Race Conditions (✅ FINALIZED)

Each unique market can only exist once:

**Unique Market Hash:**
```solidity
// Must include ALL parameters to allow 32 markets per tweet
bytes32 marketHash = keccak256(abi.encode(
    tweetId,      // Extracted from URL
    metric,       // VIEWS, LIKES, RETWEETS, COMMENTS
    duration,     // SIX_HOURS, TWENTY_FOUR_HOURS
    multiplier    // 2, 5, 10, or 20
));

require(!marketExists[marketHash], "Market already exists");
marketExists[marketHash] = true;
```

**Maximum Markets Per Tweet:** 4 metrics × 2 durations × 4 multipliers = **32 unique markets**

**Race Condition Handling:**
- First transaction wins
- Second transaction reverts with clear error
- Frontend checks for duplicates before submitting
- Shows existing market instead: "Someone beat you to it! Trade here instead"

---

### Author Claiming System (✅ FINALIZED)

**Account-Level Claiming (NOT Per-Market):**

Tweet authors claim their entire Twitter account once, which updates ALL markets (past and future).

**Claim Process:**
1. Author clicks "Claim My Account" on Bangr
2. Twitter OAuth proves ownership of @twitterhandle
3. Signs message with wallet: "I am @elonmusk claiming Bangr markets"
4. Smart contract verifies both OAuth and signature
5. Claim recorded: `claimedHandles[@elonmusk] = 0xWalletAddress`
6. ALL existing markets for @elonmusk update fee structure instantly
7. ALL future markets automatically use claimed fee structure

**Smart Contract Implementation:**
```solidity
// Global account claims mapping
mapping(string => address) public claimedHandles;

function claimAccount(
    string memory twitterHandle,
    bytes memory oauthProof,
    bytes memory signature
) external {
    // Verify Twitter OAuth
    require(
        verifyTwitterOwnership(twitterHandle, oauthProof),
        "Invalid Twitter proof"
    );

    // Verify wallet signature
    bytes32 messageHash = keccak256(abi.encodePacked(
        "I am @",
        twitterHandle,
        " claiming Bangr markets"
    ));
    require(
        recoverSigner(messageHash, signature) == msg.sender,
        "Invalid signature"
    );

    // Store claim (one simple storage write)
    require(claimedHandles[twitterHandle] == address(0), "Already claimed");
    claimedHandles[twitterHandle] = msg.sender;

    emit AccountClaimed(twitterHandle, msg.sender);
}

// Just-in-time fee lookup (zero gas, called during fee distribution)
function getFeeRecipients(uint marketId) public view returns (
    address authorAddress,
    address scoutAddress,
    uint authorShare,
    uint scoutShare,
    uint protocolShare
) {
    Market storage market = markets[marketId];
    address claimedAuthor = claimedHandles[market.authorHandle];

    if (claimedAuthor != address(0)) {
        // Claimed: 70/10/20
        return (claimedAuthor, market.scout, 70, 10, 20);
    } else {
        // Unclaimed: 0/50/50
        return (address(0), market.scout, 0, 50, 50);
    }
}
```

**Why This is Brilliant:**
- ✅ Claim once, applies to all markets forever
- ✅ No expensive loops or mass updates
- ✅ Zero gas cost for lookups (view function)
- ✅ Simple and scalable

---

### Oracle Failure Handling (✅ FINALIZED)

**What happens if tweet is deleted/private/account suspended?**

**Resolution:** Market resolves as **INVALID**, both YES and NO shares redeem for **$0.50 each**.

**Why 50/50 Resolution:**
- Fair to all traders (everyone gets 50% back)
- Simple to implement
- Maintains solvency (every $1 = 0.50 YES + 0.50 NO)
- Industry standard
- Prevents author deletion exploits

**Smart Contract Implementation:**
```solidity
enum ResolutionStatus {
    PENDING,
    RESOLVED_YES,     // YES wins, redeem for $1
    RESOLVED_NO,      // NO wins, redeem for $1
    RESOLVED_INVALID  // Both redeem for $0.50
}

function resolveMarket(uint marketId) external {
    Market storage market = markets[marketId];
    require(block.timestamp >= market.endTime, "Not expired");
    require(market.status == ResolutionStatus.PENDING, "Already resolved");

    // Try to fetch final metrics from oracle
    (bool success, uint finalValue) = oracle.fetchMetric(
        market.tweetUrl,
        market.metric
    );

    if (!success) {
        // Oracle failed → INVALID resolution
        market.status = ResolutionStatus.RESOLVED_INVALID;
        emit MarketInvalidated(marketId, "Oracle fetch failed");
    } else {
        // Normal resolution
        if (finalValue >= market.targetValue) {
            market.status = ResolutionStatus.RESOLVED_YES;
        } else {
            market.status = ResolutionStatus.RESOLVED_NO;
        }
        emit MarketResolved(marketId, market.status, finalValue);
    }
}

function redeemShares(
    uint marketId,
    bool isYesShare,
    uint amount
) external {
    Market storage market = markets[marketId];
    require(market.status != ResolutionStatus.PENDING, "Not resolved");

    uint tokenId = isYesShare ? market.yesTokenId : market.noTokenId;
    require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient shares");

    uint payout;

    if (market.status == ResolutionStatus.RESOLVED_INVALID) {
        // INVALID: both YES and NO redeem for $0.50
        payout = amount * 0.5 * 10**6; // USDC has 6 decimals

    } else if (market.status == ResolutionStatus.RESOLVED_YES) {
        // YES wins
        payout = isYesShare ? (amount * 1 * 10**6) : 0;

    } else if (market.status == ResolutionStatus.RESOLVED_NO) {
        // NO wins
        payout = isYesShare ? 0 : (amount * 1 * 10**6);
    }

    // Burn shares and pay out USDC
    _burn(msg.sender, tokenId, amount);
    require(collateralToken.transfer(msg.sender, payout), "Payout failed");

    emit SharesRedeemed(msg.sender, marketId, tokenId, amount, payout);
}
```

**Handles:**
- ✅ Deleted tweets
- ✅ Private accounts
- ✅ Suspended accounts
- ✅ Oracle downtime
- ✅ API failures

---

### Trading UX Requirements (✅ FINALIZED)

**Order Book Interface:**

The trading interface must show:

```
ORDER BOOK:
--------------------------
ASKS (Selling YES):
100 shares @ 68¢
250 shares @ 67¢
500 shares @ 65¢   ← Best Ask

[SPREAD: 2¢]

1000 shares @ 63¢  ← Best Bid
300 shares @ 62¢
150 shares @ 60¢
BIDS (Buying YES):
--------------------------

Last Trade: 64¢
24h Volume: $5,420
```

**Order Types:**
- **Market Order**: "Buy 100 YES shares at best available price"
  - Executes immediately against best ask
  - Clear display: "You'll receive ~100 shares at ~65¢ average"

- **Limit Order**: "Buy 100 YES shares at 60¢ or better"
  - Order sits in book until filled
  - Can be partially filled
  - Can be cancelled anytime

**This is standard prediction market UX** (same as Polymarket, traditional exchanges)

---

## 📋 Phase 1 Development Roadmap

All decisions are finalized. Ready to build:

1. ✅ Finalize fee distribution model → **DONE**
2. ✅ Finalize target calculation rules → **DONE**
3. ✅ Finalize initial liquidity system → **DONE**
4. ✅ Finalize oracle failure handling → **DONE**
5. ✅ Finalize author claiming system → **DONE**
6. ✅ Decide on Order Book vs AMM → **DONE (Order Book)**
7. ⏳ Set up Hardhat project
8. ⏳ Write MarketFactory.sol
9. ⏳ Write Order Book matching engine
10. ⏳ Implement ERC-1155 share tokens
11. ⏳ Add Apify oracle integration
12. ⏳ Write comprehensive tests
13. ⏳ Deploy to BNB testnet
14. ⏳ Build order book UI
15. ⏳ Integrate frontend with contracts

---

## 🚀 Timeline Estimate (8 Days Available):

**Smart Contract Development:**
- Day 1-2: Research & Setup
  - Study Polymarket/Gnosis order book architecture
  - Set up Hardhat project with dependencies
  - Design contract structure

- Day 3-4: Core Contracts
  - MarketFactory.sol (market creation, validation)
  - OrderBook.sol (limit/market orders, matching)
  - ERC-1155 share tokens
  - Fee distribution logic
  - Author claiming system

- Day 5: Oracle & Resolution
  - Apify integration
  - Market resolution logic
  - INVALID handling (50/50 split)

- Day 6: Testing
  - Unit tests for all contracts
  - Integration tests
  - Deploy to BNB testnet

**Frontend Development:**
- Day 7: Order Book UI
  - Order book component
  - Limit order form
  - Market order form
  - Connect to contracts

- Day 8: Polish & Demo
  - Portfolio redemption
  - Market creation flow
  - Test all user journeys
  - Prepare hackathon presentation

**Total Phase 1: 8 days** (with buffer)

---

## 🎯 Success Criteria

**Phase 1 is complete when:**
- ✅ Users can create markets by depositing 10 USDC
- ✅ Users can place limit and market orders
- ✅ Order matching engine works correctly
- ✅ Markets resolve correctly (YES/NO/INVALID)
- ✅ Winners can redeem shares for USDC
- ✅ Fee distribution works (Scout/Author/Protocol via Taker fees)
- ✅ Authors can claim accounts via Twitter OAuth
- ✅ All contracts deployed to BNB testnet
- ✅ Order book UI functional
- ✅ Full end-to-end flow works (create → trade → resolve → redeem)

---

## 🔑 Key Architectural Decisions

**Final Locked-In Choices:**

1. **Trading Model:** Order Book (NOT AMM)
   - Polymarket-style CLOB
   - No slippage on limit orders
   - Unlimited liquidity scaling
   - Industry standard for prediction markets

2. **Collateral:** USDC (NOT BNB)
   - Stablecoin prevents volatility
   - Better UX for traders
   - Industry standard

3. **Market Creation:** Public with $10 USDC deposit
   - Anyone can create (Scouts)
   - Scouts earn fees
   - Authors can claim for higher fees

4. **Fee Model:** Finder's Fee (50/50 → 70/10/20)
   - Before claim: Scout 50%, Protocol 50%
   - After claim: Author 70%, Protocol 20%, Scout 10%
   - Account-level claiming (not per-market)

5. **Oracle Failures:** 50/50 Resolution
   - Both YES and NO redeem for $0.50
   - Fair to all traders
   - Simple and solvent

6. **Anti-Manipulation:** Minimum Thresholds + Resolution Delay
   - Views: 10K, Likes: 500, Retweets: 100, Comments: 50
   - 2-hour delay after expiration
   - No liquidity caps needed (order book scales naturally)

---

*Last updated: 2025-11-02*
*Status: **READY TO BUILD** - All specifications finalized with Order Book architecture*
