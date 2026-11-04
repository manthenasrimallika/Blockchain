import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.waitForDeployment();
  const userRegistryAddress = await userRegistry.getAddress();
  console.log("UserRegistry deployed to:", userRegistryAddress);

  const PostRegistry = await ethers.getContractFactory("PostRegistry");
  const postRegistry = await PostRegistry.deploy();
  await postRegistry.waitForDeployment();
  const postRegistryAddress = await postRegistry.getAddress();
  console.log("PostRegistry deployed to:", postRegistryAddress);

  const ModerationContract = await ethers.getContractFactory("ModerationContract");
  const moderationContract = await ModerationContract.deploy(userRegistryAddress);
  await moderationContract.waitForDeployment();
  const moderationContractAddress = await moderationContract.getAddress();
  console.log("ModerationContract deployed to:", moderationContractAddress);

  const addresses = {
    UserRegistry: userRegistryAddress,
    PostRegistry: postRegistryAddress,
    ModerationContract: moderationContractAddress,
    deployedAt: new Date().toISOString(),
    network: "ganache",
  };

  const outputPath = path.join(__dirname, "..", "deployed-addresses.json");
  fs.writeFileSync(outputPath, JSON.stringify(addresses, null, 2));
  console.log("Contract addresses saved to:", outputPath);

  // Also copy ABIs to a shared location for backend/frontend consumption
  const abiOutputDir = path.join(__dirname, "..", "abi");
  if (!fs.existsSync(abiOutputDir)) {
    fs.mkdirSync(abiOutputDir, { recursive: true });
  }

  const contractNames = ["UserRegistry", "PostRegistry", "ModerationContract"];
  for (const name of contractNames) {
    const artifactPath = path.join(
      __dirname,
      "..",
      "artifacts",
      "contracts",
      `${name}.sol`,
      `${name}.json`
    );
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
    fs.writeFileSync(
      path.join(abiOutputDir, `${name}.json`),
      JSON.stringify(artifact.abi, null, 2)
    );
  }
  console.log("ABIs exported to:", abiOutputDir);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
