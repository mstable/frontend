import type { MessageDescriptor } from 'react-intl';

import type { Protocol } from '../protocols';
import type { Token } from '../tokens';
import type { Vault } from '../vaults';

export type Strategy = {
  protocol: Protocol;
  strategy: MessageDescriptor;
};

export type Metavault = {
  address: string;
  name: string;
  strategies: Strategy[];
  vaults: Vault[];
  assets: Token[];
};