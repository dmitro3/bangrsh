import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { getContractAddress } from '../contracts/addresses';
import abis from '../contracts/abis.json';

export type MetricType = 0 | 1 | 2 | 3; // VIEWS, LIKES, RETWEETS, COMMENTS
export type Duration = 0 | 1; // SIX_HOURS, TWENTY_FOUR_HOURS

export interface CreateMarketParams {
  tweetUrl: string;
  metric: MetricType;
  duration: Duration;
  multiplier: 2 | 5 | 10 | 20;
  currentValue: number;
  tweetId: string;
  authorHandle: string;
}

export function useCreateMarket() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createMarket = async (params: CreateMarketParams, chainId: number) => {
    const marketFactoryAddress = getContractAddress(chainId, 'marketFactory');
    const usdcAddress = getContractAddress(chainId, 'usdc');

    // First, we need to approve USDC spending (10 USDC = 10 * 10^6)
    // This should be done separately in the UI

    writeContract({
      address: marketFactoryAddress,
      abi: abis.marketFactory,
      functionName: 'createMarket',
      args: [
        params.tweetUrl,
        params.metric,
        params.duration,
        BigInt(params.multiplier),
        BigInt(params.currentValue),
        params.tweetId,
        params.authorHandle,
      ],
    });
  };

  return {
    createMarket,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook for approving USDC spending
export function useApproveUSDC() {
  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = (chainId: number, amount: bigint = parseUnits('1000', 6)) => {
    const usdcAddress = getContractAddress(chainId, 'usdc');
    const marketFactoryAddress = getContractAddress(chainId, 'marketFactory');

    writeContract({
      address: usdcAddress,
      abi: [
        {
          name: 'approve',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        },
      ],
      functionName: 'approve',
      args: [marketFactoryAddress, amount],
    });
  };

  return {
    approve,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}
