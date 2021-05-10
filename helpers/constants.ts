import { eEthereumNetwork, tEthereumAddress } from './types';
import { getParamPerNetwork } from './misc-utils';

export const MAX_UINT_AMOUNT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const MOCK_ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const WAD = Math.pow(10, 18).toString();
export const COOLDOWN_SECONDS = '3600'; // 1 hour in seconds
export const UNSTAKE_WINDOW = '1800'; // 30 min in seconds
export const DISTRIBUTION_DURATION = '86400'; // 1 day in seconds

export const STAKED_AAVE_NAME = 'Staked Agave';
export const STAKED_AAVE_SYMBOL = 'stkAGVE';
export const STAKED_AAVE_DECIMALS = 18;

export const AAVE_GOVERNANCE_V2 = '0xEC568fffba86c094cf06b22134B23074DFE2252c';
export const UPGRADABLE_CRP_FACTORY = '0x1156C30b08DbF16281c803EAe0d52Eee7652f10C';
export const AAVE_TOKEN = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
export const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const REWARDS_VAULT = '0x25f2226b597e8f9514b3f68f00f494cf4f286491';
export const BPOOL_FACTORY = '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd';

export const CRP_IMPLEMENTATION = '0xadc74a134082ea85105258407159fbb428a73782';
export const SHORT_EXECUTOR = '0xee56e2b3d491590b5b31738cc34d5232f378a8d5';
export const LONG_EXECUTOR = '0x61910EcD7e8e942136CE7Fe7943f956cea1CC2f7';
export const PROXY_CRP_ADMIN = SHORT_EXECUTOR;
export const RESERVE_CONTROLER = '0x1E506cbb6721B83B1549fa1558332381Ffa61A93';
export const ZERO_ADDRESS: tEthereumAddress = '0x0000000000000000000000000000000000000000';

// PEI constants
export const PSM_STAKER_PREMIUM = '2';

// just junk mock

export const RANDOM_ADDRESSES = [
  '0x0000000000000000000000000000000000000221',
  '0x0000000000000000000000000000000000000321',
  '0x0000000000000000000000000000000000000211',
  '0x0000000000000000000000000000000000000251',
  '0x0000000000000000000000000000000000000271',
  '0x0000000000000000000000000000000000000291',
  '0x0000000000000000000000000000000000000321',
  '0x0000000000000000000000000000000000000421',
  '0x0000000000000000000000000000000000000521',
  '0x0000000000000000000000000000000000000621',
  '0x0000000000000000000000000000000000000721',
];

export const getAaveTokenPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '',
      [eEthereumNetwork.ropsten]: '',
      [eEthereumNetwork.rinkeby]: '0x838341c70E1f02382AdA5e867DA7E5EC85fC47b7',
      [eEthereumNetwork.xdai]: '0x3a97704a1b25F08aa230ae53B352e2e72ef52843',
      [eEthereumNetwork.main]: '',
    },
    network
  );

export const getCooldownSecondsPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<string>(
    {
      [eEthereumNetwork.coverage]: COOLDOWN_SECONDS,
      [eEthereumNetwork.hardhat]: COOLDOWN_SECONDS,
      [eEthereumNetwork.kovan]: '21600', // 8h
      [eEthereumNetwork.ropsten]: '180', // 3m
      [eEthereumNetwork.rinkeby]: '180', // 3m
      [eEthereumNetwork.xdai]: '864000', // 10d
      [eEthereumNetwork.main]: '864000', // 10d
    },
    network
  );

export const getUnstakeWindowPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<string>(
    {
      [eEthereumNetwork.coverage]: UNSTAKE_WINDOW,
      [eEthereumNetwork.hardhat]: UNSTAKE_WINDOW,
      [eEthereumNetwork.kovan]: '10800', // 4h
      [eEthereumNetwork.ropsten]: '240', // 4m
      [eEthereumNetwork.rinkeby]: '240', // 4m
      [eEthereumNetwork.xdai]: '172800', // 2d
      [eEthereumNetwork.main]: '172800', // 2d
    },
    network
  );

export const getAaveAdminPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '', // Aave Governance
      [eEthereumNetwork.ropsten]: '', // Aave Governance
      [eEthereumNetwork.rinkeby]: '0x32b1ca2182eE26F8c5A6CB6Ed285Ef3304a4F5BE', // Rinkeby Agave Deployer
      [eEthereumNetwork.xdai]: '0xd811a03EEb2623556bf05bcD7F58874D2d784C26', // Agave DAO Agent
      [eEthereumNetwork.main]: '', // Aave Governance
    },
    network
  );

export const getDistributionDurationPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: DISTRIBUTION_DURATION,
      [eEthereumNetwork.hardhat]: DISTRIBUTION_DURATION,
      [eEthereumNetwork.kovan]: '864000',
      [eEthereumNetwork.ropsten]: '864000',
      [eEthereumNetwork.rinkeby]: '432000', // 5 days
      [eEthereumNetwork.xdai]: '16300000', // Number of seconds from deploy time until Nov 15 2021
      [eEthereumNetwork.main]: '12960000', // 5 months (30 days) in seconds
    },
    network
  );

export const getAaveIncentivesVaultPerNetwork = (network: eEthereumNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: '',
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '',
      [eEthereumNetwork.ropsten]: '',
      [eEthereumNetwork.rinkeby]: '0x2d206Fd0C7c76016234810232159b05562608A42',
      [eEthereumNetwork.xdai]: '0x70225281599Ba586039E7BD52736681DFf6c2Fc4',
      [eEthereumNetwork.main]: '',
    },
    network
  );
