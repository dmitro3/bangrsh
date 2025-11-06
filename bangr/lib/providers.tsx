'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#f59e0b',
        },
        supportedChains: [bscTestnet],
        defaultChain: bscTestnet,
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Only create for email users
          requireUserPasswordOnCreate: false,
        },
        loginMethods: ['email', 'wallet'], // Enable both email AND external wallet (MetaMask)
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
