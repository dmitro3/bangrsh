// Contract addresses from environment variables
export const ADDRESSES = {
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
  SHARE_TOKEN: process.env.NEXT_PUBLIC_SHARE_TOKEN_ADDRESS as `0x${string}`,
  MARKET_FACTORY: process.env.NEXT_PUBLIC_MARKET_FACTORY_ADDRESS as `0x${string}`,
  ORDER_BOOK: process.env.NEXT_PUBLIC_ORDER_BOOK_ADDRESS as `0x${string}`,
  ORACLE: process.env.NEXT_PUBLIC_ORACLE_ADDRESS as `0x${string}`,
} as const;

// MarketFactory ABI
export const MARKET_FACTORY_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_shareToken", "type": "address"}, {"internalType": "address", "name": "_collateralToken", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "marketId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "scout", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "tweetUrl", "type": "string"},
      {"indexed": false, "internalType": "enum MarketFactory.MetricType", "name": "metric", "type": "uint8"},
      {"indexed": false, "internalType": "enum MarketFactory.Duration", "name": "duration", "type": "uint8"},
      {"indexed": false, "internalType": "uint256", "name": "multiplier", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "currentValue", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "targetValue", "type": "uint256"}
    ],
    "name": "MarketCreated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "tweetUrl", "type": "string"},
      {"internalType": "enum MarketFactory.MetricType", "name": "metric", "type": "uint8"},
      {"internalType": "enum MarketFactory.Duration", "name": "duration", "type": "uint8"},
      {"internalType": "uint256", "name": "multiplier", "type": "uint256"},
      {"internalType": "uint256", "name": "currentValue", "type": "uint256"},
      {"internalType": "string", "name": "tweetId", "type": "string"},
      {"internalType": "string", "name": "authorHandle", "type": "string"}
    ],
    "name": "createMarket",
    "outputs": [{"internalType": "uint256", "name": "marketId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "marketId", "type": "uint256"}],
    "name": "getMarket",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "tweetUrl", "type": "string"},
          {"internalType": "string", "name": "tweetId", "type": "string"},
          {"internalType": "string", "name": "authorHandle", "type": "string"},
          {"internalType": "address", "name": "scout", "type": "address"},
          {"internalType": "address", "name": "claimedBy", "type": "address"},
          {"internalType": "bool", "name": "isClaimed", "type": "bool"},
          {"internalType": "enum MarketFactory.MetricType", "name": "metric", "type": "uint8"},
          {"internalType": "enum MarketFactory.Duration", "name": "duration", "type": "uint8"},
          {"internalType": "uint256", "name": "currentValue", "type": "uint256"},
          {"internalType": "uint256", "name": "targetValue", "type": "uint256"},
          {"internalType": "uint256", "name": "multiplier", "type": "uint256"},
          {"internalType": "uint256", "name": "startTime", "type": "uint256"},
          {"internalType": "uint256", "name": "endTime", "type": "uint256"},
          {"internalType": "enum MarketFactory.ResolutionStatus", "name": "status", "type": "uint8"},
          {"internalType": "uint256", "name": "yesTokenId", "type": "uint256"},
          {"internalType": "uint256", "name": "noTokenId", "type": "uint256"}
        ],
        "internalType": "struct MarketFactory.Market",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextMarketId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collateralToken",
    "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "INITIAL_LIQUIDITY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// OrderBook ABI
export const ORDER_BOOK_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_shareToken", "type": "address"},
      {"internalType": "address", "name": "_collateralToken", "type": "address"},
      {"internalType": "address", "name": "_marketFactory", "type": "address"},
      {"internalType": "address", "name": "_protocolWallet", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "orderId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "marketId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "maker", "type": "address"},
      {"indexed": false, "internalType": "bool", "name": "isBuyOrder", "type": "bool"},
      {"indexed": false, "internalType": "bool", "name": "isYesShare", "type": "bool"},
      {"indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "pricePerShare", "type": "uint256"}
    ],
    "name": "OrderPlaced",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "marketId", "type": "uint256"},
      {"internalType": "bool", "name": "isBuyOrder", "type": "bool"},
      {"internalType": "bool", "name": "isYesShare", "type": "bool"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"},
      {"internalType": "uint256", "name": "pricePerShare", "type": "uint256"}
    ],
    "name": "placeLimitOrder",
    "outputs": [{"internalType": "uint256", "name": "orderId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "marketId", "type": "uint256"},
      {"internalType": "bool", "name": "isYesShare", "type": "bool"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"},
      {"internalType": "bool", "name": "isBuyOrder", "type": "bool"}
    ],
    "name": "placeMarketOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// ShareToken ABI
export const SHARE_TOKEN_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "uri", "type": "string"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "account", "type": "address"},
      {"internalType": "uint256", "name": "id", "type": "uint256"}
    ],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// USDC ERC20 ABI (minimal)
export const ERC20_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "account", "type": "address"}
    ],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Type exports for frontend components
export type MarketFactoryABI = typeof MARKET_FACTORY_ABI;
export type OrderBookABI = typeof ORDER_BOOK_ABI;
export type ShareTokenABI = typeof SHARE_TOKEN_ABI;
export type ERC20ABI = typeof ERC20_ABI;
