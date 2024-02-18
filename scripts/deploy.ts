import { ethers } from "hardhat";

async function main() {
  // Getting the contract factories
  const Token = await ethers.deployContract("ShibaInu");
  await Token.waitForDeployment();

  console.log(
    `Token contract deployed to ${Token.target}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
