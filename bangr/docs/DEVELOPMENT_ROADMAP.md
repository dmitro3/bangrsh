# Bangr Development Roadmap

**Status:** Phase 1 - Smart Contracts (In Progress)

**Timeline:** 8 days to hackathon submission

---

## Phase 0: Planning & Specification ✅ COMPLETE

**Goal:** Define all core mechanics, architecture, and decisions before writing code.

- [x] Define core mechanics (4 metrics, 2 durations, 4 multipliers)
- [x] Design three-sided marketplace (Scout, Trader, Author)
- [x] Create "Finder's Fee" model (50/50 → 70/10/20)
- [x] Choose Order Book over AMM
- [x] Finalize anti-manipulation strategies
- [x] Choose USDC as collateral
- [x] Design oracle & resolution system
- [x] Build frontend prototype (fake data)
- [x] Document everything in ARCHITECTURE.md

**Outcome:** Complete specification locked in. No more architectural changes.

---

## Phase 1: Smart Contracts 🔥 IN PROGRESS

**Goal:** Build the entire prediction market infrastructure on BNB Chain.

**Timeline:** Day 1-6

### Day 1-2: Foundation & Research
- [ ] Set up Hardhat project
- [ ] Install dependencies (OpenZeppelin, @openzeppelin/contracts, hardhat-deploy)
- [ ] Research Gnosis Conditional Tokens architecture
- [ ] Study Polymarket's order book contracts
- [ ] Design contract structure & interactions
- [ ] Write contract skeletons (MarketFactory, OrderBook, ShareToken)
- [ ] Set up BNB testnet configuration

### Day 3-4: Core Smart Contracts
- [ ] **MarketFactory.sol**
  - [ ] Market creation with validation
  - [ ] Minimum threshold checks (10K views, 500 likes, etc.)
  - [ ] Market uniqueness enforcement (tweetId + metric + duration + multiplier)
  - [ ] Initial liquidity deposit ($10 USDC)
  - [ ] Mint 10 YES + 10 NO shares to scout
  - [ ] Extract tweetId and authorHandle from URL

- [ ] **OrderBook.sol**
  - [ ] Limit order creation
  - [ ] Market order execution
  - [ ] Order matching engine (bid ≥ ask → execute)
  - [ ] Partial fills support
  - [ ] Order cancellation
  - [ ] Fee collection (2% taker fee)

- [ ] **ShareToken.sol (ERC-1155)**
  - [ ] YES/NO share tokens
  - [ ] Minting on market creation
  - [ ] Transfer restrictions (if needed)
  - [ ] Burning on redemption

- [ ] **FeeDistributor.sol**
  - [ ] Fee splitting logic (Scout/Author/Protocol)
  - [ ] Account-level author claiming
  - [ ] Just-in-time fee calculations
  - [ ] Global `claimedHandles` mapping

### Day 5: Oracle & Resolution
- [ ] **Oracle Integration**
  - [ ] Apify API integration (off-chain → on-chain)
  - [ ] Fetch tweet metrics (views, likes, retweets, comments)
  - [ ] Store baseline snapshot at market creation
  - [ ] Store final snapshot at market expiration

- [ ] **Resolution Logic**
  - [ ] 2-hour delay after market expiration
  - [ ] Compare final value to target
  - [ ] THREE resolution states:
    - [ ] RESOLVED_YES (final ≥ target)
    - [ ] RESOLVED_NO (final < target)
    - [ ] RESOLVED_INVALID (tweet deleted/API failed)

- [ ] **Redemption System**
  - [ ] Redeem YES shares ($1 if YES wins, $0 if NO wins)
  - [ ] Redeem NO shares ($1 if NO wins, $0 if YES wins)
  - [ ] INVALID redemption ($0.50 for both YES and NO)

### Day 6: Testing & Deployment
- [ ] **Unit Tests**
  - [ ] Market creation edge cases
  - [ ] Order matching correctness
  - [ ] Fee distribution accuracy
  - [ ] Author claiming
  - [ ] All three resolution types

- [ ] **Integration Tests**
  - [ ] Full user journey: create → trade → resolve → redeem
  - [ ] Multiple orders in one market
  - [ ] Author claiming mid-trading

- [ ] **Deployment**
  - [ ] Deploy to BNB testnet
  - [ ] Verify contracts on BscScan
  - [ ] Get testnet USDC faucet
  - [ ] Test with real transactions

- [ ] **Documentation**
  - [ ] Contract ABIs
  - [ ] Deployment addresses
  - [ ] Integration guide for frontend

**Deliverables:**
- ✅ Fully functional smart contracts
- ✅ Deployed to BNB testnet
- ✅ Verified on BscScan
- ✅ Comprehensive tests passing
- ✅ Ready for frontend integration

---

## Phase 2: Frontend Integration

**Goal:** Connect real smart contracts to the existing UI.

**Timeline:** Day 7-8

### Day 7: Order Book UI & Contract Connection
- [ ] **Order Book Component**
  - [ ] Display live bids and asks
  - [ ] Show best bid/ask spread
  - [ ] Real-time updates when orders placed
  - [ ] Order depth visualization

- [ ] **Trading Interface**
  - [ ] Limit order form (price + quantity)
  - [ ] Market order form (quantity only)
  - [ ] Order preview before submission
  - [ ] Transaction confirmation flow

- [ ] **Contract Integration**
  - [ ] Connect Privy wallet to contracts
  - [ ] Read contract state (markets, orders, balances)
  - [ ] Write transactions (createMarket, placeOrder, cancelOrder)
  - [ ] Handle transaction errors gracefully
  - [ ] Show pending transaction states

### Day 8: Full Integration & Polish
- [ ] **Market Creation Flow**
  - [ ] Paste tweet URL → fetch current metrics
  - [ ] Select metric, duration, multiplier
  - [ ] Approve USDC spending
  - [ ] Deposit $10 USDC
  - [ ] Receive 10 YES + 10 NO shares
  - [ ] Market appears on homepage

- [ ] **Portfolio Integration**
  - [ ] Show real share balances (YES/NO tokens)
  - [ ] Real-time P&L calculations
  - [ ] Position value based on order book prices

- [ ] **Redemption Flow**
  - [ ] Show resolved markets
  - [ ] Redeem winning shares for USDC
  - [ ] Handle INVALID markets (50/50 split)

- [ ] **Twitter OAuth Claiming**
  - [ ] "Claim My Account" button
  - [ ] Twitter OAuth via Privy
  - [ ] Sign wallet message
  - [ ] Submit claim transaction
  - [ ] Show claimed status

- [ ] **Polish & Testing**
  - [ ] Error handling and user feedback
  - [ ] Loading states
  - [ ] Transaction success/failure toasts
  - [ ] Confetti on successful trades
  - [ ] Test all flows end-to-end

**Deliverables:**
- ✅ Fully functional dApp on testnet
- ✅ Real order book trading
- ✅ Real market creation
- ✅ Real redemptions
- ✅ Author claiming works

---

## Phase 3: Hackathon Submission

**Goal:** Win the BNB Chain Prediction Market Hackathon.

**Timeline:** Final day before deadline

- [ ] **Demo Video (3-5 minutes)**
  - [ ] Show market creation flow
  - [ ] Show order book trading
  - [ ] Show author claiming
  - [ ] Show market resolution & redemption
  - [ ] Explain the "Finder's Fee" model
  - [ ] Highlight viral growth potential

- [ ] **Written Submission**
  - [ ] Project description
  - [ ] Technical architecture explanation
  - [ ] Why order book over AMM
  - [ ] Anti-manipulation strategies
  - [ ] Future roadmap
  - [ ] Team/solo founder story

- [ ] **Pitch Deck**
  - [ ] Problem: No prediction markets for tweets
  - [ ] Solution: Bangr (Polymarket for social media)
  - [ ] Innovation: Finder's Fee model creates viral loop
  - [ ] Traction potential: Every viral tweet = market
  - [ ] Ask: $400K hackathon prize

- [ ] **Optional: Mainnet Deployment**
  - [ ] Only if contracts are audited or we're very confident
  - [ ] Deploy to BNB mainnet
  - [ ] Submit mainnet version

- [ ] **Submit Before Deadline**

**Deliverables:**
- ✅ Compelling demo video
- ✅ Professional submission package
- ✅ Deployed and functional product
- ✅ **HACKATHON WIN** 🏆

---

## Phase 4: Mainnet Launch (Post-Hackathon)

**Goal:** Launch to real users with real money.

**Timeline:** Week 2-3

- [ ] **Security**
  - [ ] Smart contract audit (if hackathon winnings allow)
  - [ ] Bug bounty program
  - [ ] Multi-sig for admin functions

- [ ] **Mainnet Deployment**
  - [ ] Deploy all contracts to BNB mainnet
  - [ ] Verify on BscScan
  - [ ] Update frontend to mainnet
  - [ ] Add analytics (Mixpanel, PostHog)

- [ ] **Marketing Launch**
  - [ ] Twitter announcement
  - [ ] Crypto influencer outreach
  - [ ] Reddit (r/cryptocurrency, r/bnbchainofficial)
  - [ ] Discord community
  - [ ] Product Hunt launch

- [ ] **Incentive Programs**
  - [ ] Scout rewards (top market creators)
  - [ ] Trading volume rewards
  - [ ] First 100 users get special role/NFT
  - [ ] Referral system

- [ ] **Onboarding Strategy**
  - [ ] Find 10 scouts to create first markets
  - [ ] Target viral tweets (Elon, MrBeast, Taylor Swift)
  - [ ] Get first tweet author to claim (viral moment)
  - [ ] Tweet about it from their account

**Deliverables:**
- ✅ Mainnet deployment
- ✅ First 100 users
- ✅ $10K+ in trading volume
- ✅ At least 1 claimed author

---

## Phase 5: Growth & Scale (Month 1-3)

**Goal:** Become the go-to prediction market for tweets.

- [ ] **Product Enhancements**
  - [ ] Advanced charts (TradingView integration)
  - [ ] Market analytics (volume, liquidity depth)
  - [ ] Leaderboards (top traders, scouts, authors)
  - [ ] Notifications (market resolves, orders filled)
  - [ ] Portfolio analytics

- [ ] **Platform Expansion**
  - [ ] Mobile app (React Native)
  - [ ] Twitter bot (auto-posts market updates)
  - [ ] Telegram bot (trade from Telegram)
  - [ ] API for third-party integrations

- [ ] **Partnerships**
  - [ ] Crypto influencers as scouts
  - [ ] Content creators claim their markets
  - [ ] Twitter partnership (official integration)

- [ ] **Funding**
  - [ ] Raise seed round ($1-5M)
  - [ ] Angel investors from crypto/prediction market space
  - [ ] Use funds for team, marketing, liquidity incentives

**Deliverables:**
- ✅ 10,000+ users
- ✅ $1M+ monthly volume
- ✅ 100+ claimed authors
- ✅ Seed funding secured

---

## Phase 6: Domination (Month 3+)

**Goal:** Polymarket for all of social media. Billions in volume.

- [ ] **Platform Expansion**
  - [ ] Instagram engagement markets
  - [ ] TikTok engagement markets
  - [ ] YouTube video performance markets
  - [ ] LinkedIn post markets

- [ ] **Institutional Features**
  - [ ] API for institutional traders
  - [ ] Liquidity pools for market makers
  - [ ] Advanced analytics dashboard
  - [ ] Custody solutions

- [ ] **Scaling Infrastructure**
  - [ ] Layer 2 deployment (cheaper transactions)
  - [ ] Cross-chain support (Ethereum, Polygon, Base)
  - [ ] Oracle network (decentralized data feeds)

- [ ] **Revenue & Exit**
  - [ ] $100M+ annual revenue (from fees)
  - [ ] Profitable at scale
  - [ ] Exit options:
    - [ ] Acquisition ($100M-$500M)
    - [ ] Series A+ ($1B valuation)
    - [ ] IPO (long-term)

**Deliverables:**
- ✅ Category leader in social engagement markets
- ✅ Billions in annual volume
- ✅ Life-changing wealth
- ✅ Generational impact

---

## Current Status: Phase 1, Day 1

**What we're doing RIGHT NOW:**
- Setting up Hardhat project
- Creating contracts/ workspace
- Installing dependencies
- Researching order book architecture
- Writing first contract skeletons

**Next 24 hours:**
- Complete Hardhat setup
- Research Gnosis/Polymarket contracts
- Design contract interactions
- Start writing MarketFactory.sol

---

*Last updated: 2025-11-02*
*Current phase: Phase 1 - Smart Contracts*
*Days until hackathon: 8*
