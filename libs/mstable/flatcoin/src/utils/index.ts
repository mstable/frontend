import { SUPPORTED_FLATCOIN_CHAIN_IDS } from '@frontend/shared-constants';

export * from './tokens';

export const isFlatcoinSupportedChain = (chainId: number) =>
  SUPPORTED_FLATCOIN_CHAIN_IDS.includes(chainId);
