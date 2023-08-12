import {
  flatcoinCollateralBaseGoerli,
  flatcoinTokenBaseGoerli,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
  ZERO_ADDRESS,
} from '@frontend/shared-constants';
import { baseGoerli } from 'wagmi/chains';

export * from './contracts';

export const isFlatcoinSupportedChain = (chainId: number) =>
  SUPPORTED_FLATCOIN_CHAIN_IDS.includes(chainId);

export const getFlatcoinTokensByChain = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return {
        COLLATERAL: flatcoinCollateralBaseGoerli,
        FLATCOIN: flatcoinTokenBaseGoerli,
        ETH: { symbol: 'ETH', decimals: 18, address: ZERO_ADDRESS },
      };
  }
  return {};
};
