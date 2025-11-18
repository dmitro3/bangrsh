import { http, fallback } from 'wagmi';
import { createConfig } from '@privy-io/wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';

// Define localhost chain for development
export const localhost = {
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  testnet: true,
} as const;

// Determine active chain based on environment
const activeChainId = Number(process.env.NEXT_PUBLIC_ACTIVE_CHAIN_ID || 97);
const activeChain = activeChainId === 31337 ? localhost : bscTestnet;

// Use official BNB Chain RPCs (they don't have CORS restrictions)
const bscTestnetRPCs = [
  'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
  'https://data-seed-prebsc-2-s1.bnbchain.org:8545',
  'https://data-seed-prebsc-1-s2.bnbchain.org:8545',
  'https://data-seed-prebsc-2-s2.bnbchain.org:8545',
];

export const wagmiConfig = createConfig({
  chains: [activeChain] as any,
  transports: {
    [localhost.id]: http('http://127.0.0.1:8545'),
    [bscTestnet.id]: fallback(
      bscTestnetRPCs.map(rpc => http(rpc, {
        timeout: 15_000,
        retryCount: 2,
      }))
    ),
  },
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
