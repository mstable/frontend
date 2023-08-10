import {
  flatcoinDelayedOrderBaseGoerli,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
  toks,
  ZERO_ADDRESS,
} from '@frontend/shared-constants';
import { baseGoerli } from 'wagmi/chains';

export const isFlatcoinSupportedChain = (chainId: number) =>
  SUPPORTED_FLATCOIN_CHAIN_IDS.includes(chainId);

export const getFlatcoinTokensByChain = (chainId: number) => ({
  COLLATERAL: toks[chainId]['USDC'],
  FLATCOIN: toks[chainId]['mStable'],
  ETH: { symbol: 'ETH', decimals: 18, address: ZERO_ADDRESS },
});

export const getFlatcoinDelayedOrderContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinDelayedOrderBaseGoerli;
    default:
      return null;
  }
};
