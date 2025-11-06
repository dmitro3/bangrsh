import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { getContractAddress } from '../contracts/addresses';
import abis from '../contracts/abis.json';

export function useRedeemShares() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const redeemShares = (
    marketId: number,
    isYesShare: boolean,
    amount: string, // Human-readable amount (e.g., "10.5")
    chainId: number
  ) => {
    const orderBookAddress = getContractAddress(chainId, 'orderBook');
    const amountWei = parseUnits(amount, 18);

    writeContract({
      address: orderBookAddress,
      abi: abis.orderBook,
      functionName: 'redeemShares',
      args: [BigInt(marketId), isYesShare, amountWei],
    });
  };

  return {
    redeemShares,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
