"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount, useChainId } from "wagmi";
import { useUSDCBalance } from "@/lib/hooks/useMarketData";

interface WalletContextType {
  isConnected: boolean;
  address: string;
  balance: number;
  connect: () => void;
  disconnect: () => void;
  spendBalance: (amount: number) => boolean;
  showCustomModal: boolean;
  setShowCustomModal: (show: boolean) => void;
}

// Not used anymore - keeping for backward compatibility
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  // This is now a wrapper around Privy for backward compatibility
  // The actual provider is in lib/providers.tsx
  return <>{children}</>;
}

export function useWallet(): WalletContextType {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const chainId = useChainId() || 97;
  const { wallets, ready: walletsReady } = useWallets();
  const [mounted, setMounted] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-connect Privy embedded wallet to wagmi after login
  useEffect(() => {
    const autoConnectWallet = async () => {
      if (authenticated && ready && walletsReady && wallets.length > 0 && !wagmiAddress) {
        console.log('[useWallet] Auto-connecting wallet...', {
          walletsCount: wallets.length,
          firstWallet: wallets[0]?.address
        });

        // Find the embedded wallet
        const embeddedWallet = wallets.find(
          w => w.walletClientType === 'privy'
        );

        if (embeddedWallet) {
          console.log('[useWallet] Found embedded wallet, connecting to wagmi:', embeddedWallet.address);
          try {
            // Privy's WagmiProvider should auto-connect when wallet is available
            // Just need to trigger it by switching to the wallet
            await embeddedWallet.switchChain(97); // BSC testnet
            console.log('[useWallet] Switched to BSC testnet');
          } catch (error) {
            console.error('[useWallet] Error auto-connecting wallet:', error);
          }
        }
      }
    };

    autoConnectWallet();
  }, [authenticated, ready, walletsReady, wallets, wagmiAddress]);

  // Debug logging
  useEffect(() => {
    if (mounted && ready) {
      console.log('[useWallet] State:', {
        authenticated,
        wagmiAddress,
        wagmiConnected,
        hasUser: !!user,
        privyWalletsCount: wallets?.length || 0,
        privyWallets: wallets?.map(w => ({ address: w.address, walletClientType: w.walletClientType, chainType: w.chainType })) || [],
        linkedAccounts: user?.linkedAccounts?.length || 0
      });
    }
  }, [mounted, ready, authenticated, wagmiAddress, wagmiConnected, user, wallets]);

  // Prevent hydration mismatch by only showing connected state on client
  const isConnected = mounted && authenticated && ready && !!wagmiAddress;
  const address = mounted && wagmiAddress ? wagmiAddress : "";

  // Real on-chain USDC balance instead of mock.
  // Always call the hook with a stable address to respect Rules of Hooks.
  const zeroAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;
  const usdcOwner = (wagmiAddress as `0x${string}`) || zeroAddress;
  const { balance: usdcBalance } = useUSDCBalance(usdcOwner, chainId);

  const balance =
    isConnected && usdcBalance !== undefined
      ? Number((usdcBalance as bigint) / BigInt(1_000_000))
      : 0;

  const connect = async () => {
    console.log('[useWallet] connect() called', {
      authenticated,
      ready,
      wagmiAddress,
      walletsCount: wallets.length
    });

    if (!ready) {
      console.warn('[useWallet] Privy not ready yet');
      return;
    }

    if (!authenticated) {
      console.log('[useWallet] Not authenticated, calling login()');
      // Use Privy's built-in modal (customized with your branding)
      login();
    } else if (wagmiAddress) {
      console.log('[useWallet] Already connected with address:', wagmiAddress);
    } else {
      console.log('[useWallet] Authenticated but wallet not showing yet. Auto-connect should handle this...');
    }
  };

  const disconnect = () => {
    logout();
  };

  const spendBalance = (amount: number): boolean => {
    return balance >= amount;
  };

  return {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
    spendBalance,
    showCustomModal,
    setShowCustomModal,
  };
}
