# 💥 BANGR - Prediction Markets for Tweet Engagement

**"Polymarket for Tweets"** - Create and trade on-chain markets for any tweet's engagement metrics in seconds.

![BNB Chain](https://img.shields.io/badge/BNB%20Chain-Testnet-yellow)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 What is Bangr?

Bangr is a decentralized prediction market platform where users can **bet on whether tweets will reach engagement targets** (views, likes, retweets, comments) within 24 hours. We turn social media attention into a tradeable on-chain asset.

### Why Bangr?

Traditional prediction markets are:
- **Too abstract** – focused on macro events and politics
- **Hard to use** – complex UX that alienates non-crypto users
- **Slow to resolve** – manual, subjective oracles

Bangr feels like **scrolling Twitter and tapping a bet button**, not filling out a DeFi form.

---

## ✨ Key Features

### Current (MVP - Live on BNB Testnet)

- ✅ **Permissionless Market Creation** – Paste any tweet URL, pick a metric, set a target
- ✅ **4 Engagement Metrics** – Views, Likes, Retweets, Comments
- ✅ **YES/NO Trading** – Buy and sell shares with USDC
- ✅ **Real-time Tweet Data** – Live metrics, avatars, quote tweets, images
- ✅ **Portfolio Tracking** – Real cost basis, average entry price, P&L
- ✅ **One-Click USDC Minting** – Seamless testnet onboarding
- ✅ **Neo-Brutalist UI** – Arcade-style design that feels like a social app
- ✅ **Event-Driven Trading** – On-chain `TradeExecuted` events for accurate history

### Technical Highlights

- **Smart Contracts** (Solidity)
  - `MarketFactory` – Creates markets for tweet + metric + target
  - `OrderBook` – Manages trading and emits detailed trade events
  - `ShareToken` – ERC-1155 YES/NO shares per market
  - `Oracle` – Resolves markets based on final metrics
  - Mock USDC – ERC-20 stablecoin for testnet

- **Frontend** (Next.js 15 + TypeScript)
  - Privy wallet integration (email & social login)
  - Wagmi + Viem for blockchain interaction
  - Recharts for live metric visualization
  - TwitterAPI.io for real-time tweet data
  - Prisma + SQLite for caching and rate limit handling

- **Key Innovations**
  - No hidden creation thresholds
  - Green confetti on market creation
  - Real trade history from on-chain events
  - Quote tweet support with nested display
  - Dynamic chart scaling per metric

---

## 🏗️ Architecture

### Smart Contracts (BNB Testnet - Chain ID 97)

| Contract | Address | Description |
|----------|---------|-------------|
| **MockUSDC** | `0x64142706680e2707e5D23887505c5DD54855a779` | Mintable testnet USDC (6 decimals) |
| **ShareToken** | `0x21c0E794839d771Ff686A53c2750629A9253b171` | ERC-1155 YES/NO shares |
| **MarketFactory** | `0xf7fC37078f59123BB2e96fAB578EdD94009c5675` | Create & manage markets |
| **OrderBook** | `0x977ea3ab6588c05C19b7e5C7159c35b6205f57Eb` | Trading engine with events |
| **Oracle** | `0x67Eaa30E45a14DdfA63CBBd94633076BD98887bE` | Market resolution system |

**Last Deployed**: November 18, 2025  
**Network**: BSC Testnet  
**Explorer**: [View on BscScan](https://testnet.bscscan.com/)

### Tech Stack

**Blockchain:**
- Solidity ^0.8.20
- Hardhat (testing, deployment, verification)
- OpenZeppelin contracts (ERC-1155, ERC-20)
- BNB Chain (low fees, fast finality)

**Frontend:**
- Next.js 15.1.4 (App Router)
- TypeScript
- Tailwind CSS (neo-brutalist design system)
- Privy (wallet authentication)
- Wagmi + Viem (blockchain interaction)
- Recharts (live charts)
- Prisma + SQLite (tweet metadata caching)

**APIs:**
- TwitterAPI.io (tweet metrics + metadata)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask or wallet that supports BNB Testnet
- Testnet BNB ([Get from faucet](https://testnet.bnbchain.org/faucet-smart))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bangrsh.git
cd bangrsh/bangr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys (see below)

# Initialize database
npx prisma migrate dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env` in the `/bangr` directory:

```bash
# Privy Authentication (Required)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Twitter API (Required for metrics)
TWITTER_API_KEY=your_twitter_api_key

# Contract Addresses (BNB Testnet)
NEXT_PUBLIC_USDC_ADDRESS=0x64142706680e2707e5D23887505c5DD54855a779

# Database (SQLite for development)
DATABASE_URL="file:./dev.db"
```

**Get API Keys:**
- **Privy**: [dashboard.privy.io](https://dashboard.privy.io/) (Free tier)
- **TwitterAPI.io**: [twitterapi.io](https://twitterapi.io/) (Pay-as-you-go)

---

## 📖 How It Works

### 1. Market Creation

1. **Paste a tweet URL** (e.g., `https://twitter.com/elonmusk/status/123...`)
2. **App fetches metrics** – Views, likes, retweets, comments from TwitterAPI.io
3. **Pick a metric** – Choose which engagement type to bet on
4. **Set a target** – Use multiplier (2x, 5x, 10x, 20x) or manual input
5. **Duration: 24 hours** – Market expires 24h after creation
6. **Deposit 10 USDC** – Receive 10 YES + 10 NO shares
7. **Market goes live** – Tweet data cached in database, shares listed

**Example:**
- Tweet has 50K views currently
- Choose 10x multiplier
- Target: 500K views in 24h
- Market question: **"Will this hit 500K views in 24h?"**

### 2. Trading

Users can:
- **Buy YES shares** if they think the tweet will reach the target
- **Buy NO shares** if they think it won't
- **Sell shares** anytime before expiry
- **View live metrics** – Charts update with current tweet performance

Price discovery happens through supply/demand of YES/NO shares.

### 3. Resolution

After 24 hours:
- Oracle fetches final engagement metrics
- Compares final value to target threshold
- **YES wins**: Final metric ≥ Target → YES holders get $1/share
- **NO wins**: Final metric < Target → NO holders get $1/share
- **INVALID**: Tweet deleted/private → Both sides get $0.50/share

### 4. Portfolio

Users can see:
- **Active positions** – Markets still running
- **Historical trades** – On-chain `TradeExecuted` events
- **Real P&L** – Actual cost basis and average entry price
- **Position details** – Shares held, current value, unrealized gains

---

## 📁 Project Structure

```
bangrsh/
├── bangr/                          # Next.js frontend
│   ├── app/
│   │   ├── page.tsx               # Homepage (market grid)
│   │   ├── market/[id]/           # Market detail pages
│   │   ├── portfolio/             # User portfolio
│   │   └── api/                   # Next.js API routes
│   │       ├── twitter/           # Twitter metrics fetching
│   │       └── markets/           # Market data management
│   ├── components/
│   │   ├── Header.tsx             # Nav with wallet + balance
│   │   ├── BangrCard.tsx          # Market cards
│   │   ├── CreateMarketModal.tsx  # Market creation flow
│   │   ├── MintUSDCButton.tsx     # Testnet USDC minting
│   │   └── market/                # Market detail components
│   ├── lib/
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useMarkets.ts     # Fetch all markets
│   │   │   ├── useTweetMetrics.ts # Tweet data fetching
│   │   │   ├── useTradeHistory.ts # On-chain trade events
│   │   │   └── useUserPositions.ts # Portfolio tracking
│   │   ├── contracts/
│   │   │   ├── addresses.ts       # Contract addresses
│   │   │   └── abis.json          # Contract ABIs
│   │   └── prisma.ts              # Database client
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   └── contexts/
│       └── WalletContext.tsx      # Global wallet state
├── contracts/                      # Hardhat project
│   ├── contracts/
│   │   ├── MarketFactory.sol     # Market creation
│   │   ├── OrderBook.sol         # Trading engine
│   │   ├── ShareToken.sol        # ERC-1155 shares
│   │   ├── Oracle.sol            # Resolution system
│   │   └── MockERC20.sol         # Testnet USDC
│   ├── scripts/
│   │   └── deploy.js             # Deployment script
│   ├── test/                      # Contract tests
│   └── hardhat.config.js          # Hardhat config
└── REDEPLOY_INSTRUCTIONS.md       # Contract deployment guide
```

---

## 🧪 Testing on BSC Testnet

### Get Test Funds

1. **Get testnet BNB**: [BSC Faucet](https://testnet.bnbchain.org/faucet-smart)
2. **Connect wallet** to Bangr
3. **Click "Mint Test USDC"** in the header (mints 1000 USDC)

### Create Your First Market

1. Click **"+ Create"** button
2. Paste a tweet URL
3. Wait for metrics to load
4. Select **metric** (Views/Likes/Retweets/Comments)
5. Choose **target** (use multiplier or custom)
6. Click **"Create Market"**
7. Approve USDC spending (one-time)
8. Confirm transaction
9. 🎉 **Green confetti** on success!

### Trade on a Market

1. Browse markets on homepage
2. Click a market card
3. View live tweet + metrics
4. Click **YES** or **NO**
5. Enter amount (in USDC)
6. Review price per share
7. Confirm transaction
8. Check **Portfolio** to see your position

---

## 🔧 Smart Contract Development

### Setup

```bash
cd contracts

# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Testing

```bash
# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Test coverage
npx hardhat coverage
```

### Deployment

```bash
# Deploy to BNB Testnet
npx hardhat run scripts/deploy.js --network bscTestnet

# Update frontend addresses
# Copy addresses from terminal to bangr/lib/contracts/addresses.ts

# Restart dev server
cd ../bangr
npm run dev
```

See `REDEPLOY_INSTRUCTIONS.md` for detailed deployment guide.

---

## 📊 Roadmap

### ✅ Phase 1: MVP (COMPLETE)

- [x] Core smart contracts (Factory, OrderBook, ShareToken, Oracle)
- [x] Frontend UI with neo-brutalist design
- [x] Wallet integration (Privy)
- [x] Market creation flow
- [x] Tweet data fetching (TwitterAPI.io)
- [x] Real-time metrics display
- [x] Portfolio tracking
- [x] On-chain trade history
- [x] Quote tweet support
- [x] Database caching (Prisma + SQLite)
- [x] Testnet deployment (BNB Chain)

### 🚧 Phase 2: Polish & Testing (IN PROGRESS)

- [ ] Comprehensive error handling
- [ ] Mobile responsive design
- [ ] Market resolution testing
- [ ] Rate limit optimization
- [ ] Performance monitoring
- [ ] User feedback collection

### 📋 Phase 3: Oracle & Automation

- [ ] Automated market resolution (24h)
- [ ] Chainlink integration for decentralized oracles
- [ ] Email notifications for market expiry
- [ ] Tweet author verification & claiming
- [ ] Advanced analytics dashboard
- [ ] Historical market data

### 🚀 Phase 4: Mainnet Launch

- [ ] Security audit (CertiK or Quantstamp)
- [ ] Deploy to BNB Mainnet
- [ ] Switch to real USDC
- [ ] Marketing campaign
- [ ] Community building
- [ ] Mobile app (React Native)
- [ ] Multi-chain expansion (Base, Arbitrum)

### 🌟 Phase 5: Advanced Features

- [ ] Liquidity pools (AMM alternative)
- [ ] Leaderboards & achievements
- [ ] Social trading (copy trades)
- [ ] Limit orders on frontend
- [ ] Market insights (trending tweets)
- [ ] API for third-party integrations
- [ ] DAO governance (BANGR token)

---

## 🛠️ Development

### Frontend Development

```bash
cd bangr

# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

### Database Management

```bash
cd bangr

# Create new migration
npx prisma migrate dev --name description_here

# Reset database (wipes all data)
npx prisma migrate reset

# Open Prisma Studio (GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

### Contract Development

```bash
cd contracts

# Compile contracts
npx hardhat compile

# Run local node
npx hardhat node

# Deploy locally
npx hardhat run scripts/deploy.js --network localhost

# Verify on BscScan
npx hardhat verify --network bscTestnet DEPLOYED_ADDRESS "Constructor Arg1" "Arg2"
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test thoroughly
4. **Commit**: `git commit -m 'Add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Guidelines

- Write clean, commented code
- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links & Resources

- **Live App**: [Coming soon]
- **Documentation**: [/docs](./docs)
- **BscScan**: [Testnet Contracts](https://testnet.bscscan.com/)
- **BNB Faucet**: [Get Testnet BNB](https://testnet.bnbchain.org/faucet-smart)
- **Privy**: [Dashboard](https://dashboard.privy.io/)
- **TwitterAPI.io**: [Documentation](https://twitterapi.io/docs)

---

## 💬 Support & Community

Got questions? Need help?

- **Open an Issue**: [GitHub Issues](https://github.com/yourusername/bangrsh/issues)
- **Read the Docs**: [Documentation](./docs)
- **Join Discord**: [Coming soon]
- **Follow on Twitter**: [Coming soon]

---

## 🙏 Acknowledgments

Built with:
- **BNB Chain** – Fast, low-cost infrastructure
- **Privy** – Seamless wallet authentication
- **TwitterAPI.io** – Real-time tweet data
- **OpenZeppelin** – Battle-tested smart contracts
- **Next.js** – Modern React framework
- **Tailwind CSS** – Rapid UI development

---

## ⚠️ Disclaimer

**This is experimental software on testnet.**

- Markets are for entertainment/testing only
- No real money on testnet
- Smart contracts are not audited
- Use at your own risk

For mainnet launch, contracts will undergo professional security audits.

---

**Built with 💥 for the future of social betting**

*Bangr – Where tweets meet markets*
