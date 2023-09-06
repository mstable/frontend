import { SUPPORTED_FLATCOIN_CHAIN_IDS } from '@frontend/flatcoin-constants';
import {
  flatcoinCollateralBaseGoerli,
  flatcoinTokenBaseGoerli,
} from '@frontend/flatcoin-constants';
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
      };
  }
  return {};
};

export const getOrderTypeName = (type: number): string => {
  switch (type) {
    case 1:
      return 'Stable deposit';
    case 2:
      return 'Stable withdraw';
    case 3:
      return 'Leverage open';
    case 4:
      return 'Leverage close';
    case 5:
      return 'Leverage adjust';
    default:
      return '';
  }
};
