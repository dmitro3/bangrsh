# 💥 BANGR - Prediction Markets for Twitter Engagement

**"Polymarket for Tweets"** - Bet on Twitter engagement metrics with an order book trading system on BNB Chain.

![BNB Chain](https://img.shields.io/badge/BNB%20Chain-Testnet-yellow)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Overview

Bangr is a decentralized prediction market platform where users bet on whether tweets will reach engagement targets (views, likes, retweets, comments) within specific timeframes (6h or 24h).

### Key Features

- ✅ **4 Metrics**: Views, Likes, Retweets, Comments
- ✅ **2 Durations**: 6 hours or 24 hours
- ✅ **Order Book Trading**: Limit & market orders (NOT AMM)
- ✅ **USDC Collateral**: Stable pricing, no volatility
- ✅ **Finder's Fee Model**: Scouts earn from markets they create
- ✅ **Author Claiming**: Tweet authors can claim their markets
- ✅ **BNB Chain**: Low fees, fast finality
- ✅ **Gasless Transactions**: Email login via Privy + Biconomy

---

## 🏗️ Architecture

### Smart Contracts (Deployed to BSC Testnet)

| Contract | Address | Description |
|----------|---------|-------------|
| **MockUSDC** | `0x337610d27c682E347C9cD60BD4b3b107C9d34dDd` | Testnet USDC (6 decimals) |
| **ShareToken** | `0xA9dC1aBD1Bef785f9cE7a369836Bc0678e24CD97` | ERC-1155 YES/NO shares |
| **MarketFactory** | `0x6BAad96CDf18014AFD790fA80B64f1AcF259c115` | Create & manage markets |
| **OrderBook** | `0x37f995E07136CD18F6F34C1FBD9F04bDFf845058` | Limit/market order matching |
| **Oracle** | `0x4d52A24F5Ba5558Fe0d1F86997420BeAe5f204cB` | Market resolution |

**Deployed**: November 4, 2025  
**Network**: BSC Testnet (Chain ID: 97)  
**Explorer**: [View on BscScan](https://testnet.bscscan.com/)

### Tech Stack

**Blockchain:**
- Solidity ^0.8.20
- Hardhat (testing & deployment)
- OpenZeppelin contracts
- BNB Chain (BSC)

**Frontend:**
- Next.js 15.1.4 (App Router)
- TypeScript
- Tailwind CSS (Y2K retro design)
- Privy (authentication)
- Wagmi + Viem (blockchain interaction)
- Biconomy (account abstraction)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask or Trust Wallet (with BSC Testnet)
- Testnet BNB ([Get from faucet](https://testnet.bnbchain.org/faucet-smart))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bangrsh.git
cd bangrsh/bangr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env.local` in the `/bangr` directory:

```bash
# Chain Configuration
NEXT_PUBLIC_ACTIVE_CHAIN_ID=97

# Deployed Contracts (BSC Testnet)
NEXT_PUBLIC_USDC_ADDRESS=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd
NEXT_PUBLIC_SHARE_TOKEN_ADDRESS=0xA9dC1aBD1Bef785f9cE7a369836Bc0678e24CD97
NEXT_PUBLIC_MARKET_FACTORY_ADDRESS=0x6BAad96CDf18014AFD790fA80B64f1AcF259c115
NEXT_PUBLIC_ORDER_BOOK_ADDRESS=0x37f995E07136CD18F6F34C1FBD9F04bDFf845058
NEXT_PUBLIC_ORACLE_ADDRESS=0x4d52A24F5Ba5558Fe0d1F86997420BeAe5f204cB

# Privy Authentication (Required)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Biconomy (Optional - for gasless transactions)
NEXT_PUBLIC_BICONOMY_API_KEY=your_biconomy_key
NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY=your_paymaster_key
```

**Get API Keys:**
- **Privy**: [dashboard.privy.io](https://dashboard.privy.io/) (Free tier available)
- **Biconomy**: [dashboard.biconomy.io](https://dashboard.biconomy.io/) (Free tier available)

---

## 📖 How It Works

### 1. Market Creation

Anyone can create a market by:
1. Pasting a tweet URL
2. Selecting metric (views/likes/retweets/comments)
3. Choosing duration (6h or 24h)
4. Picking multiplier (2x, 5x, 10x, 20x)
5. Depositing 10 USDC → Receive 10 YES + 10 NO shares

**Example:**
- Tweet has 50K views
- Choose 10x multiplier
- Target: 500K views in 24h
- Market question: "Will this hit 500K views in 24h?"

### 2. Trading

Users can:
- **Place limit orders**: "Buy 100 YES at 65¢ each"
- **Place market orders**: "Buy YES at best price"
- **Cancel orders**: Anytime before filled
- **Exit early**: Sell shares back to order book

### 3. Resolution

After market expires:
- Oracle fetches final metrics (Apify)
- Compares final value to target
- **YES wins**: Final ≥ Target
- **NO wins**: Final < Target
- **INVALID**: Tweet deleted/private (both sides get $0.50)

### 4. Fee Distribution

**Unclaimed Market (Scout only):**
- Scout: 50%
- Protocol: 50%

**Claimed Market (Author verified):**
- Tweet Author: 70%
- Protocol: 20%
- Scout: 10% (finder's fee)

---

## 🧪 Testing on BSC Testnet

### Get Test Funds

1. **Get testnet BNB**: [BSC Faucet](https://testnet.bnbchain.org/faucet-smart)
2. **Mint testnet USDC**:
   ```bash
   cd contracts
   npx hardhat run scripts/mint-usdc.js --network bscTestnet
   ```

### Create Your First Market

1. Connect wallet (email or MetaMask)
2. Click "Create Market"
3. Paste a tweet URL
4. Configure parameters
5. Approve USDC spending
6. Create market (costs 10 USDC)
7. Trade on your market!

---

## 📁 Project Structure

```
bangrsh/
├── bangr/                          # Next.js frontend
│   ├── app/                        # Next.js 15 App Router
│   │   ├── page.tsx               # Homepage (market grid)
│   │   ├── market/[id]/           # Market detail pages
│   │   └── portfolio/             # User portfolio
│   ├── components/                 # React components
│   │   ├── CreateMarketModal.tsx  # Market creation
│   │   ├── TradingModal.tsx       # Order placement
│   │   └── ui/                    # shadcn/ui components
│   ├── lib/
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── contracts.ts           # ABIs & addresses
│   │   ├── wagmi.ts               # Blockchain config
│   │   └── providers.tsx          # Privy/Wagmi setup
│   └── contexts/                   # React contexts
├── contracts/                      # Hardhat project
│   ├── contracts/                 # Solidity contracts
│   │   ├── MarketFactory.sol     # Market creation
│   │   ├── OrderBook.sol         # Trading engine
│   │   ├── ShareToken.sol        # ERC-1155 shares
│   │   └── Oracle.sol            # Resolution system
│   ├── scripts/                   # Deployment scripts
│   ├── test/                      # Contract tests
│   └── hardhat.config.js          # Hardhat config
└── docs/                           # Documentation
    ├── ARCHITECTURE.md            # Complete spec
    ├── DEVELOPMENT_ROADMAP.md     # Implementation plan
    └── INTEGRATION_GUIDE.md       # Frontend integration
```

---

## 🧪 Smart Contract Testing

```bash
cd contracts

# Install dependencies
npm install

# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Test coverage
npx hardhat coverage
```

**Current Test Results:** ✅ 6/6 tests passing

---

## 🚢 Deployment

### Deploy to BSC Testnet

```bash
cd contracts

# Set private key in contracts/.env
echo "PRIVATE_KEY=your_private_key_here" > .env

# Deploy all contracts
npx hardhat run scripts/deploy.js --network bscTestnet

# Verify on BscScan (optional)
npx hardhat verify --network bscTestnet DEPLOYED_ADDRESS
```

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd bangr
vercel

# Add environment variables in Vercel dashboard
```

---

## 📊 Features Roadmap

### ✅ Phase 1: Core Platform (COMPLETE)
- [x] Smart contracts (MarketFactory, OrderBook, Oracle)
- [x] Order book trading system
- [x] Market creation & resolution
- [x] Frontend UI (Y2K design)
- [x] Wallet integration (Privy)
- [x] Deploy to BSC Testnet

### 🚧 Phase 2: Integration (IN PROGRESS)
- [ ] Connect UI to smart contracts
- [ ] Real-time order book updates
- [ ] Portfolio tracking
- [ ] USDC approval flows
- [ ] Error handling & loading states

### 📋 Phase 3: Oracle & Automation
- [ ] Apify integration (Twitter scraping)
- [ ] Automated market resolution
- [ ] Twitter OAuth (author claiming)
- [ ] Email notifications

### 🚀 Phase 4: Mainnet Launch
- [ ] Security audit
- [ ] Deploy to BSC Mainnet
- [ ] Marketing & user acquisition
- [ ] Mobile optimization

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Documentation**: [/docs](./docs)
- **BscScan**: [Testnet Contracts](https://testnet.bscscan.com/)
- **BNB Faucet**: [Get Testnet BNB](https://testnet.bnbchain.org/faucet-smart)
- **Privy**: [Dashboard](https://dashboard.privy.io/)
- **Biconomy**: [Dashboard](https://dashboard.biconomy.io/)

---

## 💡 Support

Questions? Issues?

- Open an [Issue](https://github.com/yourusername/bangrsh/issues)
- Read the [Documentation](./docs)
- Check [Integration Guide](./docs/INTEGRATION_GUIDE.md)

---

**Built with 💥 on BNB Chain**

