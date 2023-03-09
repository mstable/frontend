import { FeederPoolVaultABI } from '@frontend/shared-constants';
import { Vault } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

const main: Contract[] = [
  // TODO verify address and abi
  // {
  //   name: 'mUSD Save Vault',
  //   address: '0x78befca7de27d07dc6e71da295cc2946681a6c7b',
  //   type: 'vault',
  //   abi: FeederPoolVaultABI,
  //   icon: Vault,
  // },
  {
    name: 'mBTC Save Vault',
    address: '0xf38522f63f40f9dd81abafd2b8efc2ec958a3016',
    type: 'vault',
    abi: FeederPoolVaultABI,
    icon: Vault,
  },
  {
    name: 'mBTC/HBTC Vault',
    address: '0xF65D53AA6e2E4A5f4F026e73cb3e22C22D75E35C',
    type: 'vault',
    abi: FeederPoolVaultABI,
    icon: Vault,
  },
  {
    name: 'mBTC/TBTC Vault',
    address: '0x760ea8CfDcC4e78d8b9cA3088ECD460246DC0731',
    type: 'vault',
    abi: FeederPoolVaultABI,
    icon: Vault,
  },
  {
    name: 'mBTC/tBTCv2 Vault',
    address: '0x97E2a2F97A2E9a4cFB462a49Ab7c8D205aBB9ed9',
    type: 'vault',
    abi: FeederPoolVaultABI,
    icon: Vault,
  },
];

const poly: Contract[] = [];

export const vaults = { [mainnet.id]: main, [polygon.id]: poly };
