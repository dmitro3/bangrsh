# Bangr: Pump.fun for Tweets

**The New Core Model**

---

## **Executive Summary**

**Bangr is Pump.fun for tweets** - not a generic prediction market.

**The Mechanic:**
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

**This changes EVERYTHING.**

---

## **Core Rules**

### **Rule #1: One Tweet, One Market (Forever)**

**Uniqueness Constraint:**
```sql
UNIQUE INDEX ON markets (tweet_id)
```

**What This Means:**
- ✅ First person to paste a tweet URL **owns that market**
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

---

### **Rule #2: Fresh Tweets Only (6-Hour Window)**

**Why Fresh Tweets?**
- ✅ Creates urgency (race to claim tweets)
- ✅ Prevents gaming (can't pick already-viral tweets)
- ✅ Forces speculation (engagement trajectory still forming)
- ✅ Like Pump.fun (find gems early before moon)

**Implementation:**
```javascript
// Tweet must be less than 6 hours old
const tweetAge = Date.now() - new Date(tweet.created_at);
const MAX_AGE = 6 * 60 * 60 * 1000; // 6 hours

if (tweetAge > MAX_AGE) {
  throw new Error(
    `This tweet is ${Math.round(tweetAge / 3600000)} hours old. ` +
    `Only tweets less than 6 hours old can have markets created.`
  );
}
```

**What This Enables:**
- 🔥 Hunt for fresh tweets from big accounts
- 📈 Speculate on engagement trajectory
- ⚡ FOMO to claim markets before others
- 🎯 Skill-based (need to find good tweets early)

---

### **Rule #3: 24-Hour Lifecycle (Auto-Resolve)**

**Market Timeline:**
```
T+0 min   → Market created (fresh tweet pasted)
T+0-24h   → Trading period (buy/sell YES/NO shares)
T+24h     → Auto-resolution (Apify checks final metrics)
T+24h+    → Archived (stays visible forever as historical record)
```

**Status Progression:**
```
ACTIVE (0-24h)
  ↓
RESOLVING (brief)
  ↓
RESOLVED (forever)
  ↓
ARCHIVED (30+ days, deprioritized in UI)
```

**Key Point:** Markets NEVER delete. They stay as historical records for:
- Transparency (users verify outcomes)
- Analytics (creator accuracy rates)
- SEO (Google indexes resolved markets)
- Trust (new users see platform history)

---

### **Rule #4: Market Creator Earns 1-2% Forever**

**Revenue Model (Pump.fun Style):**

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

**This incentivizes:**
- ✅ Users hunt for good tweets early
- ✅ Tweet authors claim their markets
- ✅ Tweet authors create markets about own tweets
- ✅ Viral loop (authors promote to followers)

---

## **The Complete User Journey**

### **Path 1: Fan Discovers Tweet Early**

**T+0 min (Tweet Posted):**
```
12:00 PM - Sam Altman tweets: "We're releasing GPT-7 tomorrow"
12:01 PM - Tweet goes live on Twitter (8,234 views)
```

**T+2 min (Alice Discovers):**
```
12:02 PM - Alice (follows Sam) sees tweet immediately
12:02 PM - Alice thinks: "This will go viral!"
12:02 PM - Alice opens Bangr
12:02 PM - Alice pastes tweet URL
```

**T+2 min (Market Created):**
```
System checks:
✅ No existing market for this tweet
✅ Tweet is 2 minutes old (fresh!)
✅ Tweet is public, not deleted
✅ User authenticated (email login)

Market created:
- Question: "Will this tweet hit 10M views in 24h?"
- Owner: Alice
- Starting views: 8,234
- Threshold: 10,000,000
- Resolves: Tomorrow 12:02 PM
- Revenue: Alice earns 1% of ALL volume forever

Alice sees:
"🎉 Market created! You own this market and earn 1% of all trading volume."

[Share on Twitter] [Copy Link]
```

**T+5 min (First Trades):**
```
12:07 PM - Bob discovers market (browsing Bangr)
12:07 PM - Bob buys 10 YES shares for $1.50
          → Alice earns: $0.015 (1%)

12:10 PM - Charlie buys 50 YES shares for $8.50
          → Alice earns: $0.085 (1%)

Alice's total earnings: $0.10
```

**T+2h (Sam Altman Claims):**
```
2:00 PM - Sam discovers market (someone tagged him)
2:01 PM - Sam: "Wait, people are betting on MY tweet?"
2:02 PM - Sam clicks "Claim This Market"
2:02 PM - Sam signs in with Twitter OAuth
2:02 PM - System verifies: OAuth twitter_id matches tweet author_id ✅
2:02 PM - Revenue split updates:
          BEFORE: 100% to Alice
          AFTER:  50% Alice, 50% Sam

2:03 PM - Market badge updates: "✅ Verified by @sama"
2:05 PM - Sam tweets:
          "Lol people are betting on my GPT-7 tweet hitting 10M views.
          Currently at $2K volume 👀 bangr.lol/market/123"

2:15 PM - Sam's 5M followers see tweet
2:30 PM - Volume explodes: $2K → $20K
3:00 PM - Alice's earnings: $100 (50% of 1% of $20K)
3:00 PM - Sam's earnings: $100 (50% of 1% of $20K)
```

**T+24h (Resolution):**
```
Tomorrow 12:02 PM:
→ Cron job detects market expired
→ Apify fetches final view count: 12,456,789
→ Compare: 12.4M > 10M threshold
→ Outcome: YES WINS! ✅
→ Smart contract resolves
→ YES holders can claim $1 per share
→ Final volume: $87,320

Alice earned: $436.60 (50% of 1% of $87K)
Sam earned: $436.60 (50% of 1% of $87K)

Market Page:
"✅ RESOLVED - YES Won!
Final Views: 12,456,789 (124% of target)
Alice (market creator) earned $436.60
@sama (tweet author) earned $436.60"

[View Full Results] [Claim Winnings]
```

**T+Forever (Historical Record):**
```
Market stays visible at: bangr.lol/market/123
Status: ARCHIVED
All data preserved:
- Final outcome
- Volume history
- Trades
- Creator earnings
- Chart of view growth

Used for:
- Alice's stats: "15 markets created, $2,340 earned"
- Sam's stats: "3 markets claimed, $890 earned"
- SEO traffic
- New user trust signals
```

---

### **Path 2: Tweet Author Creates First (Best Outcome)**

**T+0 min (Tweet Posted + Market Created):**
```
12:00 PM - MrBeast tweets: "Giving away $1M in 24h"
12:01 PM - MrBeast immediately opens Bangr
12:01 PM - MrBeast pastes his own tweet URL
12:01 PM - System detects: User's Twitter ID matches tweet author ID
12:01 PM - Auto-verified, auto-claimed

Market created:
- Owner: MrBeast
- Revenue: 2% (DOUBLE!) since he's both creator + author
- Badge: "✅ Created by @MrBeast"
- Locked: No one else can create market for this tweet

12:02 PM - MrBeast tweets:
           "Bet on my $1M giveaway tweet hitting 50M views in 24h!
           I earn 2% of all volume 💰 bangr.lol/market/456"

12:15 PM - 200M followers see tweet
1:00 PM - Volume: $100K
1:00 PM - MrBeast's earnings: $2,000 (2% of $100K)

Tomorrow 12:00 PM:
- Final volume: $500K
- MrBeast earned: $10,000 (2%)
- Platform earned: $20,000 (4%)
- Bettors profited/lost based on accuracy
```

**This is the IDEAL path.** MrBeast gets maximum earnings, market gets maximum volume, platform gets maximum revenue.

---

## **The Live Update System**

### **How Real-Time Updates Work (Without Constant Apify Calls)**

**Tiered Polling Strategy:**

| Market Age | Update Frequency | Why | Cost |
|------------|------------------|-----|------|
| 0-1h | Every 30 min | High interest, new | 2 calls/h |
| 1-6h | Every 1 hour | Active trading | 1 call/h |
| 6-12h | Every 2 hours | Mid-period | 0.5 calls/h |
| 12-23h | Every 3 hours | Winding down | 0.33 calls/h |
| 23-24h | Every 30 min | Final stretch | 2 calls/h |
| 24h | One final call | Resolution | 1 call |

**Total: ~15-20 Apify calls per market**
**Cost: $0.005 per market (half a cent!)**

### **Backend Cron Job:**

```javascript
// Every 10 minutes, check which markets need updates:
async function pollMarkets() {
  const markets = await db.markets.where({ status: 'ACTIVE' });

  for (const market of markets) {
    const age = Date.now() - market.created_at;
    const lastUpdate = Date.now() - market.last_polled_at;

    // Determine if this market needs update based on tier
    let needsUpdate = false;

    if (age < 1 * HOUR && lastUpdate > 30 * MINUTE) needsUpdate = true;
    else if (age < 6 * HOUR && lastUpdate > 1 * HOUR) needsUpdate = true;
    else if (age < 12 * HOUR && lastUpdate > 2 * HOUR) needsUpdate = true;
    else if (age < 23 * HOUR && lastUpdate > 3 * HOUR) needsUpdate = true;
    else if (age < 24 * HOUR && lastUpdate > 30 * MINUTE) needsUpdate = true;

    if (needsUpdate) {
      await fetchAndBroadcastUpdate(market);
    }
  }
}

async function fetchAndBroadcastUpdate(market) {
  // 1. Fetch from Apify
  const tweet = await apify.getTweet(market.tweet_id);
  const currentValue = tweet.view_count; // or likes/retweets/replies

  // 2. Store snapshot
  await db.market_snapshots.insert({
    market_id: market.id,
    metric_value: currentValue,
    percentage_to_goal: (currentValue / market.threshold) * 100,
    fetched_at: new Date()
  });

  // 3. Update Redis cache
  await redis.set(`market:${market.id}:current`, JSON.stringify({
    value: currentValue,
    percentage: (currentValue / market.threshold) * 100,
    updated_at: Date.now()
  }), 'EX', 3600);

  // 4. Broadcast to WebSocket clients
  websocket.broadcast(`market:${market.id}`, {
    current_value: currentValue,
    percentage: (currentValue / market.threshold) * 100,
    time_remaining: market.resolves_at - Date.now()
  });

  // 5. Update database
  await db.markets.update(market.id, {
    last_polled_at: new Date()
  });
}
```

### **Frontend (Real-Time Feel):**

```javascript
// User visits market page
const MarketPage = ({ marketId }) => {
  const [currentValue, setCurrentValue] = useState(null);
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    // 1. Load initial data from cache
    fetch(`/api/markets/${marketId}/current`)
      .then(res => res.json())
      .then(data => {
        setCurrentValue(data.value);
        setPercentage(data.percentage);
      });

    // 2. Connect to WebSocket for live updates
    const ws = new WebSocket(`wss://bangr.lol/markets/${marketId}`);

    ws.onmessage = (event) => {
      const { current_value, percentage } = JSON.parse(event.data);

      // Smooth animation of chart update
      setCurrentValue(current_value);
      setPercentage(percentage);
    };

    return () => ws.close();
  }, [marketId]);

  return (
    <div>
      <h1>Will this tweet hit 10M views in 24h?</h1>
      <div>Current Views: {currentValue.toLocaleString()} 📊</div>
      <div>Progress: {percentage.toFixed(2)}%</div>
      <ProgressBar value={percentage} target={100} />
      <Chart data={snapshots} />
      {/* User sees "Updated 12 minutes ago" */}
    </div>
  );
};
```

**User Experience:**
- Market page loads → Shows last known value (instant from Redis)
- Every 30min-3h → Backend polls Apify → WebSocket pushes update → Chart updates smoothly
- Users see: "Updated 12 minutes ago" with timestamp
- Feels real-time even though updates are sparse

---

## **Database Schema**

### **Core Tables:**

```sql
-- Markets table (one row per tweet)
CREATE TABLE markets (
  id SERIAL PRIMARY KEY,
  tweet_id VARCHAR(255) UNIQUE NOT NULL, -- ← UNIQUE CONSTRAINT
  tweet_url TEXT NOT NULL,
  tweet_text TEXT,
  tweet_author_id VARCHAR(255),
  tweet_author_username VARCHAR(255),

  metric_type VARCHAR(50) NOT NULL, -- VIEWS (MVP focus)
  threshold BIGINT NOT NULL,
  starting_value BIGINT NOT NULL,

  creator_address VARCHAR(255) NOT NULL, -- Market owner
  claimed_by VARCHAR(255), -- Tweet author (if claimed)
  verified BOOLEAN DEFAULT FALSE,

  status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE | RESOLVING | RESOLVED | ARCHIVED
  resolved BOOLEAN DEFAULT FALSE,
  outcome BOOLEAN, -- true = YES wins, false = NO wins
  final_value BIGINT,

  total_volume BIGINT DEFAULT 0,
  creator_earnings BIGINT DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  resolves_at TIMESTAMP NOT NULL, -- created_at + 24h
  resolved_at TIMESTAMP,
  last_polled_at TIMESTAMP,

  market_address VARCHAR(255), -- Smart contract address
  tx_hash VARCHAR(255)
);

-- Snapshots table (one row per Apify poll)
CREATE TABLE market_snapshots (
  id SERIAL PRIMARY KEY,
  market_id INTEGER REFERENCES markets(id),
  metric_value BIGINT NOT NULL,
  percentage_to_goal DECIMAL(5,2),
  fetched_at TIMESTAMP NOT NULL,
  apify_run_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_markets_tweet_id ON markets(tweet_id);
CREATE INDEX idx_markets_status ON markets(status) WHERE status = 'ACTIVE';
CREATE INDEX idx_snapshots_market_id ON market_snapshots(market_id);
```

---

## **MVP Simplifications (Hackathon)**

### **Focus on ONE Metric: VIEWS**

**Why Views Only for MVP:**
- ✅ Biggest numbers (millions vs thousands)
- ✅ Most impressive ("10M views!")
- ✅ Only available via Apify (unique differentiator)
- ✅ Simplifies UI (no metric selection dropdown)
- ✅ Simplifies backend (one oracle endpoint)
- ✅ Faster to build (11 days remaining)

**Auto-Generate Threshold:**
```javascript
// Instead of letting user choose threshold:
const currentViews = tweet.view_count; // e.g., 50,000
const threshold = currentViews * 20; // e.g., 1,000,000 (20x)

// Market question becomes:
// "Will this tweet hit 1M views in 24h?" (auto-generated)
```

**User flow becomes:**
```
1. User pastes tweet URL
2. System shows current views: 50,000
3. System auto-generates target: 1,000,000 (20x)
4. One-click "Create Market"
5. Done!
```

**Post-MVP:** Add likes, retweets, replies + custom thresholds.

---

## **Why This Model is GENIUS**

### **1. Creates Scarcity (Pump.fun Mechanic)**

**Pump.fun:**
- First person creates "PEPE" token → owns bonding curve forever
- FOMO to create tokens before others
- Race to find good memes early

**Bangr:**
- First person pastes Sam's tweet → owns market forever
- FOMO to claim tweets before others
- Race to find viral tweets early

**Psychological Effect:**
- ⚡ Urgency ("If I don't claim this, someone else will!")
- 🎯 Skill-based ("I need to find good tweets before they blow up")
- 💰 Revenue potential ("I could earn $500 if this goes viral")

### **2. Clean UX (No Confusion)**

**Old Model (Multiple Markets Per Tweet):**
```
User searches: "Sam Altman GPT-7 tweet"

Results:
1. "Will it hit 5M views?" (10 traders, $500 volume)
2. "Will it hit 10M views?" (30 traders, $2K volume) ← Which one is "real"?
3. "Will it hit 50M views?" (5 traders, $100 volume)
...
10 more markets about same tweet

User: "Which market should I trade on? This is confusing."
```

**New Model (One Market Per Tweet):**
```
User searches: "Sam Altman GPT-7 tweet"

Result:
1. "Will it hit 10M views in 24h?"
   ✅ Verified by @sama
   📊 $50K volume
   👥 500 traders
   ⏰ 8h remaining

User: "This is THE market. Clear choice."
```

### **3. Concentrated Liquidity**

**Old Model:**
- 10 markets × $5K volume each = $50K total
- Each market has thin liquidity
- Price slippage high
- Bad trading experience

**New Model:**
- 1 market × $50K volume = $50K total
- All liquidity in one place
- Price discovery efficient
- Great trading experience

### **4. SEO + Discovery**

**One URL per tweet:**
```
Google search: "Sam Altman GPT-7 prediction market"
Result: bangr.lol/market/123 (one canonical link)
→ Clear, authoritative result
→ All traffic goes to one page
→ High engagement metrics → better SEO ranking
```

**Multiple URLs:**
```
Google search: "Sam Altman GPT-7 prediction market"
Results:
- bangr.lol/market/123 (10 views)
- bangr.lol/market/456 (5 views)
- bangr.lol/market/789 (2 views)
→ Split traffic, low engagement
→ Worse SEO ranking
```

### **5. Viral Creator Incentive (Strongest)**

**Old Model:**
```
MrBeast's tweet has 10 markets
MrBeast sees one of them: "$500 volume"
MrBeast thinks: "Meh, not worth promoting"
```

**New Model:**
```
MrBeast's tweet has ONE market
MrBeast sees it: "$50K volume"
MrBeast thinks: "Whoa! I'm earning $500. Let me share this!"
MrBeast tweets to 200M followers
Volume explodes to $500K
MrBeast earns $5K
Platform earns $20K
```

**Concentration = stronger incentive.**

---

## **Comparison to Original Model**

| Feature | Old Model (Multi-Market) | New Model (One Market) |
|---------|-------------------------|------------------------|
| **Markets per tweet** | Unlimited | **1 (exclusive)** |
| **Creator ownership** | Anyone can duplicate | **First-come ownership** |
| **Liquidity** | Split across markets | **Concentrated** |
| **User confusion** | High (which market?) | **Zero (one choice)** |
| **Creator incentive** | Weak (diluted) | **Strong (concentrated)** |
| **Spam risk** | High | **Zero (impossible)** |
| **SEO** | Split URLs | **One canonical URL** |
| **Viral potential** | Medium | **Maximum** |
| **Pump.fun similarity** | None | **Exact parallel** |

**The new model is VASTLY superior.**

---

## **Implementation Checklist**

### **MVP (Hackathon - 11 Days):**

**Must-Have:**
- ✅ One tweet, one market (UNIQUE tweet_id constraint)
- ✅ First-to-paste ownership (creator recorded)
- ✅ 6-hour freshness check (reject old tweets)
- ✅ Views metric ONLY (simplify)
- ✅ Auto-generated threshold (20x current views)
- ✅ 24-hour lifecycle (auto-resolve)
- ✅ Tweet author claim (Twitter OAuth)
- ✅ 50/50 split on claim
- ✅ 2% if author creates first
- ✅ Markets never delete (historical record)
- ✅ Tiered polling (cost-efficient updates)
- ✅ WebSocket broadcasts (real-time feel)

**Skip for MVP:**
- ⏸️ Multiple metrics (focus on views)
- ⏸️ Custom thresholds (auto-generate only)
- ⏸️ Advanced analytics
- ⏸️ Leaderboards

**Simplified Flow:**
```
1. User pastes tweet URL
2. System validates: unique? fresh? public?
3. Auto-generate: "Will this hit 20x views in 24h?"
4. Create market (one-click)
5. User owns market forever
6. Earns 1-2% of all volume
7. 24h later: auto-resolve
8. Market stays visible forever
```

---

## **Pitch Deck Update**

### **Slide 1: Hook**
```
"Pump.fun for Tweets"

[Side-by-side comparison]

Pump.fun:                    Bangr:
Create PEPE token     →      Paste viral tweet
Own bonding curve     →      Own prediction market
Earn fees forever     →      Earn fees forever
```

### **Slide 2: The Mechanic**
```
First-to-Claim Ownership

1. Sam Altman tweets "GPT-7 tomorrow"
2. Alice discovers tweet (2 min old)
3. Alice pastes URL on Bangr
4. Alice OWNS this market forever
5. Alice earns 1% of ALL volume
6. No one else can create market for this tweet

Just like Pump.fun bonding curves.
```

### **Slide 3: Why It's Genius**
```
✅ Scarcity (FOMO to claim fresh tweets)
✅ Speculation (find viral tweets early)
✅ Clean UX (one market per tweet)
✅ Concentrated liquidity (better trading)
✅ Maximum creator incentive (revenue concentrated)
✅ Proven mechanic (Pump.fun works)
```

---

## **Final Verdict**

**This is your KILLER feature.**

Judges will immediately understand: "Oh, it's Pump.fun but for tweets instead of tokens."

This is:
- ✅ **Simple to explain** (30 seconds)
- ✅ **Proven mechanic** (Pump.fun validation)
- ✅ **Novel application** (no one doing this for tweets)
- ✅ **Strong incentives** (creator revenue concentrated)
- ✅ **Viral by design** (FOMO + speculation)

**Ship this version for the hackathon.** 🚀
