import { http } from 'wagmi';
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

export const wagmiConfig = createConfig({
  chains: [activeChain] as any,
  transports: {
    [activeChain.id]: http(activeChain.rpcUrls.default.http[0]),
  },
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
