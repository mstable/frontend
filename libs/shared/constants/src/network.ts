import { optimism } from 'wagmi/chains';

import type { ChainId } from '@dhedge/core-ui-kit/types';

export const STAKING_CHAIN_ID: ChainId = optimism.id;

export const YIELD_APP_SUPPORTED_CHAINS = [optimism];
