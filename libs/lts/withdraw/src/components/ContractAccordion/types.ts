import type { Contract } from '@frontend/lts-constants';
import type { BigNumber } from 'ethers';

export type LTSContract = {
  balance: BigNumber;
} & Contract;
