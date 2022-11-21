import type { HexAddress } from '@frontend/shared-utils';
import type { MessageDescriptor } from 'react-intl';

import type { Protocol } from '../protocols';
import type { Token } from '../tokens';
import type { Vault } from '../vaults';

export type SupportedMetavault = 'mvusdc3pcv' | 'test';

export type Strategy = {
  protocol: Protocol;
  strategy: MessageDescriptor;
};

export type Metavault = {
  id: SupportedMetavault;
  address: HexAddress;
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
  gases: {
    deposit: number;
    withdraw: number;
  };
  primaryColor: string;
  featured?: boolean;
  firstBlock: number;
};
