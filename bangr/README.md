# Bangr

**Polymarket for Tweets - Prediction Markets for Social Media Engagement**

Bangr is an order book-based prediction market platform where users bet on whether tweets will hit specific engagement targets. Built for the BNB Chain Prediction Market Hackathon.

---

## 🎯 What is Bangr?

**The Problem:**
You see a tweet that you think will go viral. But there's no way to put your money where your mouth is.

**The Solution:**
Bangr lets you create and trade prediction markets on Twitter engagement metrics (views, likes, retweets, comments).

**Example Market:**
> "Will Elon's Starship tweet hit 1M views in the next 24 hours?"
> Current: 100K views | Target: 1M views (10x multiplier)
> Trade: YES at 65¢ or NO at 35¢

---

## 🚀 How It Works

### Three-Sided Marketplace

**1. Scouts (Market Creators)**
- Find tweets they think will go viral
- Deposit $10 USDC to create a market
- Receive 10 YES + 10 NO shares
- Earn **50% of trading fees** (before author claims)
- Earn **10% forever** (after author claims)

**2. Traders**
- Post limit orders or market orders
- Buy YES if they think target will hit
- Buy NO if they think it won't
- Win: redeem shares for $1 each
- Lose: shares become worthless

**3. Authors (Tweet Owners)**
- Can claim their markets via Twitter OAuth
- Start earning **70% of all trading fees**
- Incentivized to promote their markets
- Creates viral growth loop

---

## 💰 The "Finder's Fee" Model

**Before Author Claims:**
- Scout: 50%
- Protocol: 50%

**After Author Claims:**
- Author: 70%
- Protocol: 20%
- Scout: 10% (permanent "finder's fee")

**Why This is Genius:**
- Scouts find viral content early → earn big
- Authors have huge incentive to claim → earn bigger
- Scouts still benefit forever → aligned incentives
- Creates viral loop: more markets → more authors → more legitimacy

---

## 🏗️ Architecture

**Trading Model:** Order Book (Polymarket-style CLOB)
**Collateral:** USDC (stablecoin)
**Blockchain:** BNB Chain
**Share Tokens:** ERC-1155 (YES/NO shares)
**Oracle:** Apify Twitter API

### Core Mechanics
- **4 Metrics:** Views, Likes, Retweets, Comments
- **2 Time Windows:** 6 hours, 24 hours
- **4 Multipliers:** 2x, 5x, 10x, 20x
- **32 Markets Per Tweet:** 4 × 2 × 4 = 32 unique combinations

### Market Creation Rules
**Minimum Thresholds (Anti-Spam):**
- Views: 10,000 minimum
- Likes: 500 minimum
- Retweets: 100 minimum
- Comments: 50 minimum

**Initial Liquidity:** $10 USDC deposit from scout

### Resolution
- Markets expire after duration (6h or 24h)
- 2-hour delay for Twitter to purge bots
- Oracle fetches final metrics
- Three outcomes: YES wins, NO wins, or INVALID (50/50 split)

---

## 📁 Project Structure

```
/bangr
├── README.md                    ← You are here
├── docs/
│   ├── ARCHITECTURE.md          ← All core decisions (order book, fees, metrics)
│   ├── DEVELOPMENT_ROADMAP.md   ← 6-phase development plan
│   └── archive/
│
├── contracts/                   ← Smart contract workspace
│   ├── README.md                ← Contract development guide
│   ├── hardhat.config.js
│   ├── contracts/
│   │   ├── MarketFactory.sol
│   │   ├── OrderBook.sol
│   │   ├── ShareToken.sol
│   │   ├── FeeDistributor.sol
│   │   └── Oracle.sol
│   ├── test/
│   └── scripts/
│
├── app/                         ← Next.js frontend
├── components/                  ← React components
├── contexts/                    ← React contexts (Wallet, Positions)
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- BNB testnet wallet
- Testnet USDC (from faucet)

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Smart Contract Setup
```bash
# Navigate to contracts
cd contracts

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to BNB testnet
npx hardhat run scripts/deploy.js --network bscTestnet
```

---

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - Complete technical specification
- **[Development Roadmap](docs/DEVELOPMENT_ROADMAP.md)** - 6-phase plan (Phase 1 in progress)
- **[Contracts README](contracts/README.md)** - Smart contract development guide

---

## 🎯 Current Status

**Phase:** 1 - Smart Contracts (Day 1)
**Timeline:** 8 days to hackathon submission
**Progress:** Documentation complete, beginning smart contract development

### Completed
- ✅ Full product specification
- ✅ Architecture decisions locked in
- ✅ Frontend prototype (fake data)
- ✅ Organized project structure

### In Progress
- 🔥 Smart contract development (Day 1-6)
- ⏳ Hardhat setup
- ⏳ Order book contracts
- ⏳ Testing & deployment

### Next
- ⏳ Frontend integration (Day 7-8)
- ⏳ Hackathon submission (Day 8)

---

## 🏆 Why Bangr Will Win

**1. Solves a Real Problem**
- No prediction markets exist for social media engagement
- Massive TAM: every viral tweet = potential market

**2. Innovative Economics**
- "Finder's Fee" model creates viral growth loop
- Authors incentivized to promote their own markets
- Network effects compound

**3. Technical Excellence**
- Order book (not AMM) = industry standard
- USDC collateral = stable pricing
- Anti-manipulation built-in (thresholds + 2h delay)

**4. Perfect Timing**
- Prediction markets are hot (Polymarket doing $billions)
- Social media betting is untapped
- BNB Chain support = infrastructure ready

---

## 🚀 Vision

**Phase 1 (Now):** Prediction markets for tweets
**Phase 2 (Month 1):** Instagram, TikTok, YouTube
**Phase 3 (Month 3):** Every viral moment has a market
**Phase 4 (Year 1):** $1B+ in annual volume

**Mission:** Become Polymarket for all of social media.

---

## 📞 Contact

**Hackathon Submission:** BNB Chain Prediction Market Hackathon
**Timeline:** 8 days remaining
**Builder:** Solo founder (AI-assisted development)

---

## 📄 License

MIT License - Built for BNB Chain Hackathon 2024

---

**Let's make this happen. 🚀**
