import {
  flatcoinDelayedOrderOptimismGoerli,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
  toks,
  ZERO_ADDRESS,
} from '@frontend/shared-constants';
import { optimismGoerli } from 'wagmi/chains';

export const isFlatcoinSupportedChain = (chainId: number) =>
  SUPPORTED_FLATCOIN_CHAIN_IDS.includes(chainId);

export const getFlatcoinTokensByChain = (chainId: number) => ({
  USDC: toks[chainId]['USDC'],
  FLATCOIN: toks[chainId]['mStable'],
  ETH: { symbol: 'ETH', decimals: 18, address: ZERO_ADDRESS },
});

export const getFlatcoinDelayedOrderContract = (chainId: number) => {
  switch (chainId) {
    case optimismGoerli.id:
      return flatcoinDelayedOrderOptimismGoerli;
    default:
      return flatcoinDelayedOrderOptimismGoerli;
  }
};
