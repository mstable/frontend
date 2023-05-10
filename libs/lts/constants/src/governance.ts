import {
  StakedTokenBPTABI,
  StakedTokenMTAABI,
} from '@frontend/shared-constants';
import { MBTC, MTA } from '@frontend/shared-icons';
import { mainnet } from 'wagmi';

import type { Contract } from './types';

export const governances: Contract[] = [
  {
    name: 'Staked MTA',
    address: '0x8f2326316eC696F6d023E37A9931c2b2C177a3D7',
    type: 'governance',
    decimals: 18,
    symbol: 'stkMTA',
    icon: MTA,
    abi: StakedTokenMTAABI,
    chainId: mainnet.id,
    balanceFn: 'rawBalanceOf',
    balanceSelect: (res) => res[0],
  },
  {
    name: 'Staked BPT',
    address: '0xeFbe22085D9f29863Cfb77EEd16d3cC0D927b011',
    type: 'governance',
    decimals: 18,
    symbol: 'stkBPT',
    icon: MBTC,
    abi: StakedTokenBPTABI,
    chainId: mainnet.id,
    balanceFn: 'rawBalanceOf',
    balanceSelect: (res) => res[0],
  },
];
