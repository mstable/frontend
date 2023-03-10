import type { Contract } from '@frontend/lts-constants';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';

export type LTSContract = {
  balance: BigNumber;
  token?: FetchTokenResult;
} & Contract;
