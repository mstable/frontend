/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MessageDescriptor } from 'react-intl';

import type { Protocol } from '../protocols';
import type { Token } from '../tokens';
import type { Contract } from '../types';

export type SupportedMetavault = 'mvusdc3pcv' | 'test';

export type Strategy = {
  protocol: Protocol;
  strategy: MessageDescriptor;
};

export type Metavault = Contract & {
  id: SupportedMetavault;
  asset: Token;
  underlyings: Token[];
  proxy: Contract;
  primaryColor: string;
  featured?: boolean;
  firstBlock: number;
  fees: {
    liquidation: number;
    performance: number;
  };
  gases: {
    deposit: number;
    withdraw: number;
  };

  // labels and doc
  tags: MessageDescriptor[];
  strategyDescription?: MessageDescriptor;
  strategies: Strategy[];
  assets: Token[];
};
