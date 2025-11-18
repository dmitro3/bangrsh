// Contract addresses for different networks
// Update these after deploying to BNB testnet/mainnet

export const contracts = {
  // Local Hardhat network (for development)
  hardhat: {
    usdc: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    shareToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    marketFactory: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    orderBook: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    oracle: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  },
  // BNB Testnet (97)
  bscTestnet: {
    usdc: '0x64142706680e2707e5D23887505c5DD54855a779', // MockUSDC (mintable)
    shareToken: '0xE398bC15DB47C6c5FF50d55f86DD261ee788C4BD',
    marketFactory: '0xeDe61b1194A2D9C695596eAED97d8CEb587A1F34',
    orderBook: '0xD0FDe43286b854EdC96E7d61c4C79D38c9E9Ce8d',
    oracle: '0x3d180CE6D0a0b4320Df4e063332bBcC1f121F498',
  },
  // BNB Mainnet (56)
  bscMainnet: {
    usdc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // Real USDC on BSC
    shareToken: '',
    marketFactory: '',
    orderBook: '',
    oracle: '',
  },
} as const;

export type NetworkName = keyof typeof contracts;

export function getContractAddress(
  chainId: number,
  contractName: keyof typeof contracts.hardhat
): `0x${string}` {
  let network: NetworkName;

  switch (chainId) {
    case 1337: // Hardhat
    case 31337: // Hardhat alternative
      network = 'hardhat';
      break;
    case 97: // BNB Testnet
      network = 'bscTestnet';
      break;
    case 56: // BNB Mainnet
      network = 'bscMainnet';
      break;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }

  const address = contracts[network][contractName];
  if (!address) {
    throw new Error(`Contract ${contractName} not deployed on ${network}`);
  }

  return address as `0x${string}`;
}
