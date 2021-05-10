import { task } from 'hardhat/config';

import { eContractid, eEthereumNetwork, tEthereumAddress } from '../../helpers/types';
import { registerContractInJsonDb } from '../../helpers/contracts-helpers';
import {
  getAaveTokenPerNetwork,
  getCooldownSecondsPerNetwork,
  getUnstakeWindowPerNetwork,
  getAaveAdminPerNetwork,
  getDistributionDurationPerNetwork,
  getAaveIncentivesVaultPerNetwork,
} from '../../helpers/constants';
import {
  deployStakedAave,
  deployInitializableAdminUpgradeabilityProxy,
} from '../../helpers/contracts-accessors';
import { checkVerification } from '../../helpers/etherscan-verification';

const { StakedAgave, StakedAaveImpl } = eContractid;

task(`deploy-${StakedAgave}`, `Deploys the ${StakedAgave} contract`)
  .addFlag('verify', 'Verify StakedAave contract via Etherscan API.')
  .addOptionalParam(
    'vaultAddress',
    'Use AaveIncentivesVault address by param instead of configuration.'
  )
  .addOptionalParam('aaveAddress', 'Use AaveToken address by param instead of configuration.')
  .setAction(async ({ verify, vaultAddress, aaveAddress }, localBRE) => {
    await localBRE.run('set-dre');

    // If Etherscan verification is enabled, check needed enviroments to prevent loss of gas in failed deployments.
    if (verify) {
      checkVerification();
    }

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    const network = localBRE.network.name as eEthereumNetwork;

    console.log(`\n- ${StakedAgave} deployment`);

    console.log(`\tDeploying ${StakedAgave} implementation ...`);
    const stakedAaveImpl = await deployStakedAave(
      [
        aaveAddress || getAaveTokenPerNetwork(network),
        aaveAddress || getAaveTokenPerNetwork(network),
        getCooldownSecondsPerNetwork(network),
        getUnstakeWindowPerNetwork(network),
        vaultAddress || getAaveIncentivesVaultPerNetwork(network),
        // We can't use the AaveAdmin here because we're using it as the proxy admin,
        // and the proxy admin can't call the proxied-to contract
        // The vault will be fine, since it's what's paying the bills anyway
        vaultAddress || getAaveIncentivesVaultPerNetwork(network), //getAaveAdminPerNetwork(network),
        getDistributionDurationPerNetwork(network),
      ],
      false // disable verify due not supported by current buidler etherscan plugin
    );
    await stakedAaveImpl.deployTransaction.wait();
    await registerContractInJsonDb(StakedAaveImpl, stakedAaveImpl);

    console.log(`\tDeploying ${StakedAgave} Transparent Proxy ...`);
    const stakedAaveProxy = await deployInitializableAdminUpgradeabilityProxy(verify);
    await registerContractInJsonDb(StakedAgave, stakedAaveProxy);

    console.log(`\tFinished ${StakedAgave} proxy and implementation deployment`);
  });
