import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { getContractAddress } from '../contracts/addresses';
import abis from '../contracts/abis.json';

export interface PlaceOrderParams {
  marketId: number;
  isBuyOrder: boolean;
  isYesShare: boolean;
  shares: string; // Amount in human-readable format (e.g., "10.5")
  pricePerShare: string; // Price in USDC (e.g., "0.65" for 65 cents)
}

export function usePlaceLimitOrder() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const placeLimitOrder = async (params: PlaceOrderParams, chainId: number) => {
    const orderBookAddress = getContractAddress(chainId, 'orderBook');

    // Convert shares to wei (18 decimals)
    const sharesWei = parseUnits(params.shares, 18);
    // Convert price to USDC (6 decimals)
    const priceWei = parseUnits(params.pricePerShare, 6);

    writeContract({
      address: orderBookAddress,
      abi: abis.orderBook,
      functionName: 'placeLimitOrder',
      args: [
        BigInt(params.marketId),
        params.isBuyOrder,
        params.isYesShare,
        sharesWei,
        priceWei,
      ],
    });
  };

  return {
    placeLimitOrder,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function usePlaceMarketOrder() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const placeMarketOrder = async (
    marketId: number,
    isBuyOrder: boolean,
    isYesShare: boolean,
    shares: string,
    maxSlippage: string, // e.g., "0.05" for 5% slippage
    chainId: number
  ) => {
    const orderBookAddress = getContractAddress(chainId, 'orderBook');
    const sharesWei = parseUnits(shares, 18);
    const slippageBps = parseUnits(maxSlippage, 2); // Convert to basis points

    writeContract({
      address: orderBookAddress,
      abi: abis.orderBook,
      functionName: 'placeMarketOrder',
      args: [
        BigInt(marketId),
        isBuyOrder,
        isYesShare,
        sharesWei,
        slippageBps,
      ],
    });
  };

  return {
    placeMarketOrder,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useCancelOrder() {
  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelOrder = (orderId: number, chainId: number) => {
    const orderBookAddress = getContractAddress(chainId, 'orderBook');

    writeContract({
      address: orderBookAddress,
      abi: abis.orderBook,
      functionName: 'cancelOrder',
      args: [BigInt(orderId)],
    });
  };

  return {
    cancelOrder,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}
