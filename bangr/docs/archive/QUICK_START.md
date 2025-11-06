# Bangr - Quick Start Guide

**Last Updated:** January 2025

---

## **📚 Documentation Structure**

You now have **7 complete documentation files:**

### **Read in This Order:**

1. **[REPOSITORY_SUMMARY.md](REPOSITORY_SUMMARY.md)** ⭐ **START HERE**
   - Overview of everything
   - Links to all other docs
   - Quick reference for the new model

2. **[PUMP_FUN_MODEL.md](PUMP_FUN_MODEL.md)** 🔥 **CORE CONCEPT**
   - The "Pump.fun for tweets" model explained
   - One tweet, one market rule
   - Complete user journeys
   - Why this model is genius

3. **[MODEL_V2_CHANGES.md](MODEL_V2_CHANGES.md)** 📋 **WHAT CHANGED**
   - 8 critical changes from old to new
   - Before/after comparisons
   - Implementation checklist
   - 11-day build plan

4. **[FIGMA_DESIGN_EXTRACTION.md](FIGMA_DESIGN_EXTRACTION.md)** 🎨 **UI REFERENCE**
   - Complete design system
   - Component specifications
   - Color palette, typography, spacing
   - Animation details
   - Responsive behavior

5. **[BANGR_COMPLETE_PLAN.md](BANGR_COMPLETE_PLAN.md)** 📖 **ORIGINAL PLAN**
   - Full project documentation
   - Still valid, just refined with new model
   - Technical architecture
   - Smart contracts details

6. **[BANGR_ADDENDUM.md](BANGR_ADDENDUM.md)** 🎯 **HACKATHON SPECIFIC**
   - DoraHacks/Seedify requirements
   - Judging criteria mapping
   - Sponsor alignment
   - Technical details for judges

7. **[COMPETITIVE_ANALYSIS.md](COMPETITIVE_ANALYSIS.md)** 📊 **MARKET ANALYSIS**
   - Competitor breakdown
   - Market opportunity
   - Moat strategy
   - Go-to-market plan

---

## **🚀 To Start Building (New Repository)**

### **Step 1: Create New Repository**

```bash
# Create new project
mkdir bangr-app
cd bangr-app
git init

# Copy design files from extracted repo
cp -r ../bangrsh/polymarket-extract/src/components ./src/
cp -r ../bangrsh/polymarket-extract/src/styles ./src/
cp ../bangrsh/polymarket-extract/package.json ./
cp ../bangrsh/polymarket-extract/vite.config.ts ./
cp ../bangrsh/polymarket-extract/tailwind.config.js ./ # if exists

# Copy documentation
cp ../bangrsh/PUMP_FUN_MODEL.md ./docs/
cp ../bangrsh/MODEL_V2_CHANGES.md ./docs/
cp ../bangrsh/FIGMA_DESIGN_EXTRACTION.md ./docs/
```

### **Step 2: Install Dependencies**

```bash
npm install

# Add blockchain/backend dependencies
npm install ethers@^6 @biconomy/account apify-client socket.io-client
npm install next-auth@^5 @tanstack/react-query wagmi viem

# Install dev dependencies
npm install -D @types/node typescript tailwindcss postcss autoprefixer
```

### **Step 3: Project Structure**

```
bangr-app/
├── docs/                           # All documentation
│   ├── PUMP_FUN_MODEL.md
│   ├── MODEL_V2_CHANGES.md
│   └── FIGMA_DESIGN_EXTRACTION.md
├── contracts/                      # Smart contracts
│   ├── MarketFactory.sol
│   ├── PredictionMarket.sol
│   └── Treasury.sol
├── src/
│   ├── components/                 # UI components (from Figma)
│   │   ├── BangrCard.tsx
│   │   ├── CreateMarketModal.tsx
│   │   └── ui/                    # ShadcN components
│   ├── hooks/                      # React hooks
│   │   ├── useMarket.ts
│   │   ├── useTrade.ts
│   │   └── useAuth.ts
│   ├── lib/                        # Utilities
│   │   ├── apify.ts               # Twitter scraping
│   │   ├── biconomy.ts            # Account abstraction
│   │   └── contracts.ts           # Smart contract ABIs
│   ├── styles/                     # Global styles
│   │   └── globals.css
│   ├── pages/                      # Routes
│   │   ├── Dashboard.tsx
│   │   ├── MarketDetail.tsx
│   │   └── Profile.tsx
│   ├── App.tsx
│   └── main.tsx
├── server/                         # Backend
│   ├── api/                        # Express routes
│   ├── jobs/                       # Cron jobs (resolution)
│   ├── db/                         # Database schemas
│   └── websocket/                  # Real-time updates
├── package.json
├── vite.config.ts
└── README.md
```

---

## **📝 Implementation Order (11 Days)**

### **Days 1-2: Smart Contracts**
```bash
# Navigate to contracts/
cd contracts

# Write smart contracts:
✅ MarketFactory.sol
✅ PredictionMarket.sol (FPMM AMM)
✅ Treasury.sol

# Test & deploy:
npx hardhat test
npx hardhat run scripts/deploy.ts --network bnbTestnet
```

**Key Files to Create:**
- `contracts/MarketFactory.sol`
- `contracts/PredictionMarket.sol`
- `contracts/Treasury.sol`
- `test/MarketFactory.test.ts`
- `scripts/deploy.ts`

**Reference:** [BANGR_COMPLETE_PLAN.md](BANGR_COMPLETE_PLAN.md#smart-contract-architecture)

---

### **Days 3-4: Backend + Apify**
```bash
# Navigate to server/
cd server

# Create API endpoints:
✅ POST /api/markets (create from tweet URL)
✅ GET /api/markets/:id (fetch details)
✅ POST /api/trades (buy/sell shares)
✅ POST /api/resolve (auto-resolution)

# Apify integration:
✅ lib/apify.ts (getTweetMetrics)
✅ jobs/polling.ts (tiered polling cron)
✅ jobs/resolution.ts (24h auto-resolve)
```

**Key Files to Create:**
- `server/api/markets.ts`
- `server/api/trades.ts`
- `server/lib/apify.ts`
- `server/jobs/polling.ts`
- `server/jobs/resolution.ts`
- `server/db/schema.sql`

**Reference:** [PUMP_FUN_MODEL.md](PUMP_FUN_MODEL.md#the-live-update-system)

---

### **Days 5-6: Frontend Integration**
```bash
# Connect UI to backend
✅ Wire BangrCard to real market data
✅ CreateMarketModal → API call
✅ Biconomy AA setup (gasless)
✅ WebSocket connection (real-time)
```

**Key Files to Update:**
- `src/components/BangrCard.tsx` (connect to API)
- `src/components/CreateMarketModal.tsx` (Apify integration)
- `src/hooks/useMarket.ts` (data fetching)
- `src/lib/biconomy.ts` (AA setup)
- `src/hooks/useWebSocket.ts` (real-time updates)

**Reference:** [FIGMA_DESIGN_EXTRACTION.md](FIGMA_DESIGN_EXTRACTION.md#core-components)

---

### **Days 7-8: Claim Feature**
```bash
# Implement Twitter OAuth claim
✅ Twitter OAuth flow (NextAuth)
✅ Ownership verification
✅ 50/50 revenue split
✅ Verified badge UI
```

**Key Files to Create:**
- `src/pages/api/auth/[...nextauth].ts`
- `server/api/claim.ts`
- `src/components/ClaimButton.tsx`

**Reference:** [PUMP_FUN_MODEL.md](PUMP_FUN_MODEL.md#path-1-fan-discovers-tweet-early)

---

### **Days 9-10: Polish**
```bash
# Testing & optimization
✅ Mobile responsive (test all breakpoints)
✅ Error handling
✅ Edge cases (deleted tweets, failures)
✅ Performance optimization
```

---

### **Day 11: Demo Prep**
```bash
# Final preparation
✅ Record backup video (5 min)
✅ Prepare pitch deck (12 slides)
✅ Practice presentation (3x)
✅ Deploy to production
```

**Reference:** [REPOSITORY_SUMMARY.md](REPOSITORY_SUMMARY.md#-demo-script-5-minutes)

---

## **🔑 Key Environment Variables**

Create `.env.local`:

```bash
# Blockchain
VITE_BNB_RPC_URL=https://bsc-testnet.publicnode.com
VITE_MARKET_FACTORY_ADDRESS=0x... # After deploy
VITE_TREASURY_ADDRESS=0x... # After deploy

# Apify
APIFY_API_TOKEN=your_token_here

# Biconomy
VITE_BICONOMY_BUNDLER_URL=https://...
VITE_BICONOMY_PAYMASTER_URL=https://...

# NextAuth (Twitter OAuth)
NEXTAUTH_SECRET=your_secret_here
TWITTER_CLIENT_ID=your_id_here
TWITTER_CLIENT_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

## **🎨 Using the Figma Design**

### **All Components Are Ready:**

1. **BangrCard** - Market display card
   - Location: `src/components/BangrCard.tsx`
   - Just connect to real data via props

2. **CreateMarketModal** - Market creation flow
   - Location: `src/components/CreateMarketModal.tsx`
   - Wire up to Apify + API

3. **Header** - Navigation bar
   - Location: `src/App.tsx` (lines 190-252)
   - Already responsive

4. **Filter Bar** - Market filtering
   - Location: `src/App.tsx` (lines 258-275)
   - Add click handlers

5. **Formula Banner** - Shows 20x rule
   - Location: `src/App.tsx` (lines 280-295)
   - Keep as-is (educates users)

**Just update the `marketData` array to fetch from your API instead of hardcoded values.**

---

## **🧪 Testing Checklist**

### **Smart Contracts:**
- [ ] Deploy to BNB testnet
- [ ] Create market test
- [ ] Buy YES shares test
- [ ] Buy NO shares test
- [ ] Sell shares test
- [ ] Resolve market test (YES wins)
- [ ] Resolve market test (NO wins)
- [ ] Claim winnings test
- [ ] Fee distribution test

### **Backend:**
- [ ] POST /api/markets with tweet URL
- [ ] Apify fetches tweet data correctly
- [ ] Market stored in database
- [ ] Polling cron job runs every 10min
- [ ] Resolution triggers at 24h exactly
- [ ] WebSocket broadcasts updates

### **Frontend:**
- [ ] Email login (gasless)
- [ ] Wallet login
- [ ] Twitter login
- [ ] Guest mode
- [ ] Create market flow (paste → preview → create)
- [ ] Trading (buy YES, buy NO)
- [ ] Real-time chart updates
- [ ] Claim feature (Twitter OAuth)
- [ ] Mobile responsive (test on phone)

---

## **📱 Demo Day Checklist**

### **Before Presentation:**
- [ ] Backup video recorded (upload to YouTube)
- [ ] Pitch deck finalized (12 slides)
- [ ] Practice presentation 3x minimum
- [ ] Test live demo on actual site
- [ ] Have fallback plan if live demo fails

### **During Demo:**
- [ ] Start with hook ("Pump.fun for tweets")
- [ ] Show create market flow (paste URL → create)
- [ ] Show trading (buy YES shares, gasless)
- [ ] Show claim feature (Twitter OAuth)
- [ ] Show resolution (fast-forward if needed)
- [ ] Emphasize: one tweet = one market (scarcity)
- [ ] Emphasize: 98.5% margins (economics)

### **Q&A Preparation:**
- [ ] Apify ToS answer ready
- [ ] One market per tweet rationale ready
- [ ] Views-only justification ready
- [ ] Migration path explained (Twitter API)
- [ ] Confident, not defensive

---

## **🏆 Success Criteria**

### **Minimum Viable Demo:**
- ✅ User can paste tweet URL
- ✅ System auto-generates market (current × 20)
- ✅ User can trade (email login, gasless)
- ✅ Chart shows view count updates
- ✅ Market resolves after 24h

### **Nice-to-Have:**
- Claim feature working (Twitter OAuth)
- Multiple markets on dashboard
- Mobile responsive
- Beautiful animations

### **Must NOT:**
- Break during live demo (have backup video!)
- Look buggy or unpolished
- Miss the 5-minute time limit

---

## **🎯 Final Tips**

1. **Focus on MVP** - One complete flow working > broken ambitious demo
2. **Record backup video** - Live demos ALWAYS fail
3. **Practice pitch 3x** - Muscle memory for presentation
4. **Emphasize Pump.fun parallel** - Judges understand instantly
5. **Show the economics** - 98.5% margins, $0.005 cost per market
6. **Address Apify proactively** - Don't wait for judges to ask
7. **Smile and be confident** - You have a STRONG idea

---

## **📞 Need Help?**

### **Documentation:**
- [REPOSITORY_SUMMARY.md](REPOSITORY_SUMMARY.md) - Overview
- [PUMP_FUN_MODEL.md](PUMP_FUN_MODEL.md) - Core concept
- [MODEL_V2_CHANGES.md](MODEL_V2_CHANGES.md) - Implementation guide
- [FIGMA_DESIGN_EXTRACTION.md](FIGMA_DESIGN_EXTRACTION.md) - UI reference

### **Extracted Code:**
- `/polymarket-extract/` - Complete working UI

---

**You have everything you need to build and win this hackathon.** 🚀

**The idea is FIRE. The design is READY. The plan is CLEAR.**

**Now go execute.** 💥

Good luck! 🍀
