import { USDC_OPTIMISM } from '@dhedge/core-ui-kit/const';
import {
  ETH_OPTIMISM,
  ETH_OPTIMISM_GOERLI,
  FLATCOIN_OPTIMISM,
  FLATCOIN_OPTIMISM_GOERLI,
  USDC_OPTIMISM_GOERLI,
} from '@frontend/shared-constants';
import { optimismGoerli } from 'wagmi/chains';

export const getFlatcoinTokensByChain = (chainId: number) => {
  switch (chainId) {
    case optimismGoerli.id:
      return {
        USDC: USDC_OPTIMISM_GOERLI,
        FLATCOIN: FLATCOIN_OPTIMISM_GOERLI,
        ETH: ETH_OPTIMISM_GOERLI,
      };
    default:
      return {
        USDC: USDC_OPTIMISM,
        FLATCOIN: FLATCOIN_OPTIMISM,
        ETH: ETH_OPTIMISM,
      };
  }
};
