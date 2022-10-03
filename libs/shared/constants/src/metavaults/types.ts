import type { MessageDescriptor } from 'react-intl';

import type { Protocol } from '../protocols';
import type { Token } from '../tokens';
import type { Vault } from '../vaults';

export type SupportedMetavault = 'usdc3crv' | 'test';

export type Strategy = {
  protocol: Protocol;
  strategy: MessageDescriptor;
};

export type Metavault = {
  address: string;
  name: string;
  tags: MessageDescriptor[];
  strategyDescription?: MessageDescriptor;
  strategies: Strategy[];
  vaults: Vault[];
  assets: Token[];
  fees: {
    liquidation: number;
    performance: number;
  };
};
