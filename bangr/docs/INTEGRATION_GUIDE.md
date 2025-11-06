# Bangr Integration Guide

## ✅ What's Been Built

### Smart Contracts (100% Complete)
- **ShareToken.sol** - ERC-1155 for YES/NO shares
- **MarketFactory.sol** - Market creation, validation, resolution
- **OrderBook.sol** - Limit/market orders, order matching
- **Oracle.sol** - Market resolution system
- All tests passing (6/6)

### Frontend Integration (Ready to Use)
- **Privy + Wagmi** setup for BNB Chain
- **Contract ABIs** exported to `lib/contracts/abis.json`
- **Contract addresses** in `lib/contracts/addresses.ts`
- **React hooks** for all contract interactions:
  - `useCreateMarket` - Create new markets
  - `usePlaceLimitOrder` - Place limit orders
  - `usePlaceMarketOrder` - Place market orders
  - `useRedeemShares` - Cash out winnings
  - `useMarketData` - Read market info
  - `useOrderBook` - Get bids/asks
  - `useUSDCBalance` - Check USDC balance
  - `useShareBalance` - Check share balance

---

## 🔑 API Keys You Need

### 1. Privy App ID (REQUIRED)
**Where:** https://dashboard.privy.io/
**Steps:**
1. Sign up for Privy
2. Create new app
3. Copy App ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here
   ```

### 2. WalletConnect Project ID (Optional)
**Where:** https://cloud.walletconnect.com/
**Steps:**
1. Sign up
2. Create project
3. Copy Project ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

### 3. Apify API Key (For Oracle)
**Where:** https://console.apify.com/
**Steps:**
1. Sign up
2. Go to Settings → Integrations
3. Copy API token
4. Add to `.env.local`:
   ```
   APIFY_API_KEY=your_api_key_here
   ```

---

## 🚀 Testing Locally (Recommended First)

### Step 1: Start Hardhat Node
```bash
cd contracts
npx hardhat node
```
This will:
- Start a local blockchain on http://localhost:8545
- Give you 20 test accounts with 10,000 ETH each
- Deploy contracts automatically

### Step 2: Deploy Contracts
In another terminal:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

You'll see:
```
✅ ShareToken deployed to: 0x...
✅ MarketFactory deployed to: 0x...
✅ OrderBook deployed to: 0x...
✅ Oracle deployed to: 0x...
```

### Step 3: Update Contract Addresses
Copy the addresses to `lib/contracts/addresses.ts`:
```typescript
hardhat: {
  usdc: '0x...',
  shareToken: '0x...',
  marketFactory: '0x...',
  orderBook: '0x...',
  oracle: '0x...',
}
```

### Step 4: Connect MetaMask to Localhost
1. Open MetaMask
2. Add Network:
   - Network Name: Localhost 8545
   - RPC URL: http://localhost:8545
   - Chain ID: 31337
   - Currency: ETH
3. Import one of the test accounts (private key from hardhat node output)

### Step 5: Run Frontend
```bash
npm run dev
```

Open http://localhost:3000

---

## 🧪 Testing the Full Flow

### Test 1: Create a Market
```typescript
import { useCreateMarket } from '@/lib/hooks/useCreateMarket';

const { createMarket } = useCreateMarket();

await createMarket({
  tweetUrl: 'https://twitter.com/elonmusk/status/123',
  metric: 0, // VIEWS
  duration: 1, // 24 HOURS
  multiplier: 10,
  currentValue: 50000,
  tweetId: '123',
  authorHandle: '@elonmusk'
}, 31337); // localhost chainId
```

**You'll need to:**
1. Approve USDC spending first (use `useApproveUSDC` hook)
2. Transaction will mint you 10 YES + 10 NO shares

### Test 2: Place a Limit Order
```typescript
import { usePlaceLimitOrder } from '@/lib/hooks/usePlaceOrder';

const { placeLimitOrder } = usePlaceLimitOrder();

await placeLimitOrder({
  marketId: 0,
  isBuyOrder: true,
  isYesShare: true,
  shares: '5', // Buy 5 YES shares
  pricePerShare: '0.65' // At 65 cents each
}, 31337);
```

### Test 3: View Order Book
```typescript
import { useOrderBook } from '@/lib/hooks/useMarketData';

const { buyOrders, sellOrders } = useOrderBook(0, true, 31337);

console.log('Bids:', buyOrders);
console.log('Asks:', sellOrders);
```

### Test 4: Resolve Market (Owner Only)
```typescript
// In Hardhat console:
const oracle = await ethers.getContractAt('Oracle', '0x...');
await oracle.submitMetricAndResolve(0, 600000); // Market 0, 600K views
```

### Test 5: Redeem Shares
```typescript
import { useRedeemShares } from '@/lib/hooks/useRedeemShares';

const { redeemShares } = useRedeemShares();

await redeemShares(0, true, '10', 31337); // Redeem 10 YES shares
```

---

## 🌐 Deploying to BNB Testnet

### Step 1: Get Testnet BNB
Go to: https://testnet.bnbchain.org/faucet-smart
- Connect wallet
- Request testnet BNB

### Step 2: Add Private Key
Create `contracts/.env`:
```
PRIVATE_KEY=your_private_key_here
BSCSCAN_API_KEY=optional_for_verification
```

### Step 3: Deploy
```bash
cd contracts
npx hardhat run scripts/deploy.js --network bscTestnet
```

### Step 4: Update Addresses
Update `lib/contracts/addresses.ts`:
```typescript
bscTestnet: {
  usdc: '0x...',
  shareToken: '0x...',
  marketFactory: '0x...',
  orderBook: '0x...',
  oracle: '0x...',
}
```

### Step 5: Get Testnet USDC
Our deployment script deploys a mock USDC on testnet. You can mint yourself some:
```bash
npx hardhat console --network bscTestnet

const usdc = await ethers.getContractAt('MockERC20', 'USDC_ADDRESS');
await usdc.mint('YOUR_ADDRESS', ethers.parseUnits('1000', 6)); // 1000 USDC
```

---

## 📝 Example Component: Create Market Button

```typescript
'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useChainId } from 'wagmi';
import { useCreateMarket, useApproveUSDC } from '@/lib/hooks/useCreateMarket';
import { parseUnits } from 'viem';

export function CreateMarketButton() {
  const { login, authenticated } = usePrivy();
  const { address } = useAccount();
  const chainId = useChainId();

  const { approve, isPending: isApproving } = useApproveUSDC();
  const { createMarket, isPending, isConfirming } = useCreateMarket();

  const handleCreate = async () => {
    if (!authenticated) {
      login();
      return;
    }

    // Step 1: Approve USDC
    await approve(chainId, parseUnits('100', 6)); // Approve 100 USDC

    // Step 2: Create market
    await createMarket({
      tweetUrl: 'https://twitter.com/elonmusk/status/123',
      metric: 0,
      duration: 1,
      multiplier: 10,
      currentValue: 50000,
      tweetId: '123',
      authorHandle: '@elonmusk'
    }, chainId);
  };

  return (
    <button onClick={handleCreate} disabled={isPending || isConfirming || isApproving}>
      {!authenticated && 'Connect Wallet to Create'}
      {isApproving && 'Approving USDC...'}
      {isPending && 'Creating Market...'}
      {isConfirming && 'Confirming...'}
      {authenticated && !isPending && !isConfirming && !isApproving && 'Create Market'}
    </button>
  );
}
```

---

## 🐛 Troubleshooting

### Error: "Privy App ID not set"
- Make sure `.env.local` has `NEXT_PUBLIC_PRIVY_APP_ID`
- Restart Next.js dev server

### Error: "Contract not deployed on this network"
- Check `lib/contracts/addresses.ts` has addresses for your chain
- Make sure you're connected to the right network

### Error: "USDC transfer failed"
- You need to approve USDC spending first
- Use `useApproveUSDC` hook before creating markets

### Error: "Insufficient USDC balance"
- On localhost: Mint yourself mock USDC
- On testnet: Use the mint function on mock USDC contract

### Hardhat node connection issues
- Make sure Hardhat node is running on port 8545
- Check MetaMask is connected to localhost network
- Try resetting MetaMask account (Settings → Advanced → Reset Account)

---

## 📚 Next Steps

1. **Get Privy App ID** and add to `.env.local`
2. **Start testing locally** with Hardhat node
3. **Integrate hooks into your UI components**
4. **Deploy to BNB testnet** when ready
5. **Set up Apify integration** for automatic resolution

---

## 🎯 Available Hooks Reference

### Write Operations (Transactions)
- `useCreateMarket()` - Create new prediction market
- `useApproveUSDC()` - Approve USDC spending
- `usePlaceLimitOrder()` - Place limit order
- `usePlaceMarketOrder()` - Place market order
- `useCancelOrder()` - Cancel existing order
- `useRedeemShares()` - Cash out winning shares

### Read Operations (Free)
- `useMarket(marketId, chainId)` - Get market details
- `useOrderBook(marketId, isYesShare, chainId)` - Get bids/asks
- `useShareBalance(address, marketId, isYesShare, chainId)` - Check shares
- `useUSDCBalance(address, chainId)` - Check USDC balance
- `useUSDCAllowance(owner, spender, chainId)` - Check approval

### Privy/Wallet
- `usePrivy()` - Login, logout, user info
- `useAccount()` - Connected wallet address
- `useChainId()` - Current chain ID

---

## 💡 Tips

- **Always approve USDC before creating markets**
- **Test on localhost first** - it's instant and free
- **Use the Privy UI** - it handles wallet connection beautifully
- **Check allowances** before transactions to avoid errors
- **Monitor gas prices** on mainnet (testnet is free)

---

## 📞 Need Help?

If you run into issues:
1. Check contract addresses in `lib/contracts/addresses.ts`
2. Verify `.env.local` has all required keys
3. Make sure Hardhat node is running (for local testing)
4. Check MetaMask is on the correct network
5. Look at browser console for detailed errors
