const { ethers } = require("hardhat");

async function main() {
  const marketFactoryAddress = "0xf7fC37078f59123BB2e96fAB578EdD94009c5675";
  const marketFactory = await ethers.getContractAt("MarketFactory", marketFactoryAddress);
  
  const nextMarketId = await marketFactory.nextMarketId();
  console.log("Next Market ID:", nextMarketId.toString());
  console.log("Total markets:", (Number(nextMarketId) - 1));
  
  if (Number(nextMarketId) > 1) {
    console.log("\nMarkets found:");
    for (let i = 0; i < Number(nextMarketId) - 1; i++) {
      const market = await marketFactory.getMarket(i);
      console.log(`Market ${i}:`, market);
    }
  } else {
    console.log("\n✅ No markets in NEW contract - this is expected!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
