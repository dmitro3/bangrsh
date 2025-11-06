const hre = require("hardhat");

async function main() {
  const address = "0x3a263ea24497c71eba2146a1090df26da54fd6c9";
  const balance = await hre.ethers.provider.getBalance(address);
  console.log("Address:", address);
  console.log("BNB Balance:", hre.ethers.formatEther(balance), "BNB");
  console.log("USD Value (approx):", "$" + (parseFloat(hre.ethers.formatEther(balance)) * 600).toFixed(2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
