import { createSmartAccountClient, PaymasterMode } from "@biconomy/account";
import { WalletClient } from "viem";

// BSC Testnet configuration
const BSC_TESTNET_CHAIN_ID = 97;

export const createBiconomySmartAccount = async (walletClient: WalletClient) => {
  try {
    const smartAccount = await createSmartAccountClient({
      signer: walletClient,
      biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY!,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${BSC_TESTNET_CHAIN_ID}/${process.env.NEXT_PUBLIC_BICONOMY_API_KEY}`,
      chainId: BSC_TESTNET_CHAIN_ID,
    });

    return smartAccount;
  } catch (error) {
    console.error("Error creating Biconomy smart account:", error);
    throw error;
  }
};

export const sendSponsoredTransaction = async (
  smartAccount: any,
  to: `0x${string}`,
  data: `0x${string}`,
  value: bigint = 0n
) => {
  try {
    const userOp = await smartAccount.sendTransaction(
      {
        to,
        data,
        value,
      },
      {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      }
    );

    const { transactionHash } = await userOp.waitForTxHash();
    console.log("Transaction Hash:", transactionHash);

    const userOpReceipt = await userOp.wait();

    if (userOpReceipt.success === "true") {
      console.log("UserOp receipt:", userOpReceipt);
      console.log("Transaction receipt:", userOpReceipt.receipt);
    }

    return transactionHash;
  } catch (error) {
    console.error("Error sending sponsored transaction:", error);
    throw error;
  }
};
