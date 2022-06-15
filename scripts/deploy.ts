import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy("Larecoin", {
    from: deployer,
    contract: "Larecoin",
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        methodName: "initialize",
        args: [
          "Larecoin",
          "LARE",
          9,
          10000000000000,
          10,
          10,
          30,
          "0x10ed43c718714eb63d5aa57b78b54704e256024e",
          "0xa08c6155ef90dbe0801eb4ff0cce2d7aacfa8147",
          "0x3e2a5c405cf61643c15650c066ff4e22dd11740a",
        ],
      },
      upgradeIndex: 0,
    },
    log: true,
  });
};

export default func;
func.tags = ["Larecoin", "Larecoin_deploy"];
