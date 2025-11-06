'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from './ui/button';

const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

const ERC20_ABI = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

export function MintUSDCButton() {
  const { address } = useAccount();
  const [isPending, setIsPending] = useState(false);

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!address) return;

    try {
      setIsPending(true);
      writeContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'mint',
        args: [address, parseUnits('1000', 6)], // 1000 USDC with 6 decimals
      });
    } catch (error) {
      console.error('Error minting USDC:', error);
      setIsPending(false);
    }
  };

  if (!address) return null;

  return (
    <Button
      onClick={handleMint}
      disabled={isPending || isConfirming}
      variant="outline"
      className="border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all font-bold"
    >
      {isPending || isConfirming ? 'Minting...' : '💰 Mint Test USDC'}
    </Button>
  );
}
