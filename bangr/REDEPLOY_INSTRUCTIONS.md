# Contract Redeployment Instructions

## What Changed
Added `TradeExecuted` event to OrderBook.sol for tracking real purchase prices.

## Steps to Redeploy

### 1. Make sure you have BNB in deployer wallet
```bash
# Your deployer wallet address is in the environment files
# Send ~0.2 BNB to cover gas fees
```

### 2. Compile contracts
```bash
cd contracts
npx hardhat compile
```

### 3. Deploy contracts
```bash
# For BNB Testnet (chain ID 97)
npx hardhat run scripts/deploy.ts --network bnbTestnet
```

### 4. Update contract addresses in frontend
After deployment, you'll get new addresses. Update them in:
- `bangr/lib/contracts/index.ts` - Update the ADDRESSES object for chainId 97

### 5. Restart the dev server
```bash
cd ../bangr
npm run dev
```

## Production Ready! 🚀

### To Go Mainnet:
1. **Change RPC URLs** in `contracts/hardhat.config.ts`
   - Replace testnet RPC with mainnet RPC
   - Change chain ID from 97 to 56

2. **Update frontend chain ID** in `bangr/lib/constants.ts`
   - Change `DEFAULT_CHAIN_ID` from 97 to 56

3. **Use real USDC contract** in `bangr/lib/contracts/index.ts`
   - Replace Mock USDC address with real USDC on BSC mainnet

4. **Redeploy contracts** to mainnet with same steps above

That's it! Only **3 lines of code** to switch from testnet to mainnet! 🎉

## What This Fixes
- ✅ Portfolio shows **real** invested amounts (not estimates)
- ✅ Accurate P&L calculations
- ✅ Average purchase price tracking
- ✅ Complete trade history on-chain
- ✅ Production-ready for mainnet launch

## Contract Changes
- Added `TradeExecuted` event with full trade details
- Emitted automatically on every trade
- No breaking changes to existing functionality

