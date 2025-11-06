import { useState, useEffect } from "react";
import { X, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "./ui/input";
import { useAccount, useWalletClient, useReadContract } from "wagmi";
import { parseUnits, encodeFunctionData } from "viem";
import { ADDRESSES, MARKET_FACTORY_ABI, ERC20_ABI } from "@/lib/contracts";
import { createBiconomySmartAccount, sendSponsoredTransaction } from "@/lib/biconomy";

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMarketModal({ isOpen, onClose }: CreateMarketModalProps) {
  const [tweetUrl, setTweetUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [txStep, setTxStep] = useState<"idle" | "approving" | "creating" | "success">("idle");
  const [previewData, setPreviewData] = useState<{
    username: string;
    text: string;
    currentViews: number;
    targetViews: number;
    tweetId: string;
  } | null>(null);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Read USDC allowance
  const { data: usdcAllowance, refetch: refetchAllowance } = useReadContract({
    address: ADDRESSES.USDC,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && ADDRESSES.MARKET_FACTORY ? [address, ADDRESSES.MARKET_FACTORY] : undefined,
  });

  // Initialize Biconomy smart account when wallet is connected
  useEffect(() => {
    const initSmartAccount = async () => {
      if (walletClient && !smartAccount && !isInitializing) {
        try {
          setIsInitializing(true);
          const sa = await createBiconomySmartAccount(walletClient);
          setSmartAccount(sa);
        } catch (error) {
          console.error("Failed to initialize smart account:", error);
          setError("Failed to initialize gasless transactions");
        } finally {
          setIsInitializing(false);
        }
      }
    };

    initSmartAccount();
  }, [walletClient, smartAccount, isInitializing]);

  // Parse tweet URL to extract ID and username
  const parseTweetUrl = (url: string): { tweetId: string; username: string } | null => {
    try {
      const match = url.match(/(?:twitter\.com|x\.com)\/([^\/]+)\/status\/(\d+)/);
      if (match) {
        return { username: match[1], tweetId: match[2] };
      }
      return null;
    } catch {
      return null;
    }
  };

  if (!isOpen) return null;

  const handleUrlChange = (url: string) => {
    setTweetUrl(url);
    setError(null);

    // Parse tweet URL
    const parsed = parseTweetUrl(url);
    if (parsed) {
      // Mock preview data - in production, fetch from API
      setPreviewData({
        username: parsed.username,
        text: "This is a preview of the tweet. The actual tweet content will be fetched from the API...",
        currentViews: 2500000,
        targetViews: 2500000 * 20, // Always current × 20
        tweetId: parsed.tweetId
      });
    } else {
      setPreviewData(null);
    }
  };

  const handleCreate = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!smartAccount) {
      setError("Initializing gasless transactions...");
      return;
    }

    if (!previewData) {
      setError("Please enter a valid tweet URL");
      return;
    }

    try {
      setError(null);
      const requiredAmount = parseUnits("10", 6); // 10 USDC with 6 decimals

      // Step 1: Check and approve USDC if needed (GASLESS!)
      const currentAllowance = BigInt(usdcAllowance || 0);
      if (currentAllowance < requiredAmount) {
        setTxStep("approving");

        // Encode approve function call
        const approveData = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [ADDRESSES.MARKET_FACTORY, requiredAmount],
        });

        // Send gasless approval transaction
        await sendSponsoredTransaction(
          smartAccount,
          ADDRESSES.USDC,
          approveData as `0x${string}`
        );

        // Wait a moment and refetch allowance
        await new Promise(resolve => setTimeout(resolve, 2000));
        await refetchAllowance();
      }

      // Step 2: Create market (GASLESS!)
      setTxStep("creating");

      // Encode createMarket function call
      const createMarketData = encodeFunctionData({
        abi: MARKET_FACTORY_ABI,
        functionName: "createMarket",
        args: [
          tweetUrl,
          0, // MetricType.Views
          0, // Duration.ONE_DAY (24 hours)
          BigInt(20), // multiplier (20x)
          BigInt(previewData.currentViews), // current value
          previewData.tweetId,
          previewData.username
        ],
      });

      // Send gasless market creation transaction
      await sendSponsoredTransaction(
        smartAccount,
        ADDRESSES.MARKET_FACTORY,
        createMarketData as `0x${string}`
      );

      // Success!
      setTxStep("success");
      setTimeout(() => {
        setTweetUrl("");
        setPreviewData(null);
        setTxStep("idle");
        onClose();
      }, 2000);

    } catch (err: any) {
      console.error("Transaction error:", err);
      setError(err.message || "Transaction failed");
      setTxStep("idle");
    }
  };

  const isLoading = isInitializing || txStep !== "idle";

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl border-6 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Create Market 💥</h2>
          <p className="text-gray-600">Paste a tweet URL to create a prediction market</p>
          <div className="mt-3 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-800">
              <span style={{ fontWeight: 600 }}>Auto-calculated:</span> Target = Current Views × 20 | Timeframe = 24h
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2" style={{ fontWeight: 500 }}>
            Tweet URL
          </label>
          <Input
            type="url"
            placeholder="https://twitter.com/username/status/..."
            value={tweetUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="h-14 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all text-lg"
          />
        </div>

        {/* Preview */}
        {previewData && (
          <div className="mb-6">
            <label className="block text-sm mb-3" style={{ fontWeight: 500 }}>
              Market Preview
            </label>
            <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              {/* Tweet Preview */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b-2 border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">@{previewData.username} • Now</p>
                  <p className="text-gray-800 text-sm line-clamp-2">{previewData.text}</p>
                </div>
              </div>

              {/* Market Question */}
              <div className="mb-4">
                <p className="text-lg" style={{ fontWeight: 700 }}>
                  Will this hit <span className="text-yellow-600">{formatViews(previewData.targetViews)}</span> views in 24h?
                </p>
              </div>

              {/* Current Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border-2 border-black">
                  <p className="text-xs text-gray-600 mb-1">Current Views</p>
                  <p className="text-xl" style={{ fontWeight: 700 }}>{formatViews(previewData.currentViews)}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-black">
                  <p className="text-xs text-gray-600 mb-1">Target Views</p>
                  <p className="text-xl text-yellow-600" style={{ fontWeight: 700 }}>{formatViews(previewData.targetViews)}</p>
                </div>
              </div>

              {/* Formula */}
              <div className="mt-3 p-2 bg-white/50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 text-center">
                  Target = {formatViews(previewData.currentViews)} × 20 = {formatViews(previewData.targetViews)}
                </p>
              </div>

              {/* External Link */}
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                <ExternalLink className="w-4 h-4" />
                <span>View on Twitter</span>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!previewData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <h4 className="text-sm mb-2" style={{ fontWeight: 600 }}>How it works:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Paste any tweet URL</li>
              <li>• We fetch current view count automatically</li>
              <li>• Target is always <span style={{ fontWeight: 600 }}>current views × 20</span></li>
              <li>• Market runs for exactly <span style={{ fontWeight: 600 }}>24 hours</span></li>
              <li>• Question: "Will this hit [target] views in 24h?"</li>
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Gasless Transaction Info */}
        {isConnected && smartAccount && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <p className="text-sm text-green-800">
              <span style={{ fontWeight: 600 }}>✨ Gasless Transactions Enabled:</span> No BNB needed! Transactions are sponsored by Biconomy.
            </p>
          </div>
        )}

        {/* Transaction Status */}
        {txStep !== "idle" && (
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            {txStep === "approving" && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-blue-800">Step 1/2: Approving USDC (gasless)...</p>
              </div>
            )}
            {txStep === "creating" && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-blue-800">Step 2/2: Creating market (gasless)...</p>
              </div>
            )}
            {txStep === "success" && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-800" style={{ fontWeight: 600 }}>Market created successfully! 🎉</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ fontWeight: 600 }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!isConnected || !previewData || isLoading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ fontWeight: 700 }}
          >
            {!isConnected ? (
              "Connect Wallet First"
            ) : isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                {txStep === "approving" ? "Approving..." : txStep === "creating" ? "Creating..." : "Processing..."}
              </span>
            ) : (
              "Create Market 🚀"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
