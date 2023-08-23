import {
  flatcoinDelayedOrderBaseGoerli,
  flatcoinKeeperFeeBaseGoerli,
  flatcoinLeveragedModuleBaseGoerli,
  flatcoinOracleModuleBaseGoerli,
  flatcoinViewerContractBaseGoerli,
} from '@frontend/shared-constants';
import { baseGoerli } from 'wagmi/chains';

export const getFlatcoinDelayedOrderContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinDelayedOrderBaseGoerli;
    default:
      return null;
  }
};

export const getFlatcoinKeeperFeeContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinKeeperFeeBaseGoerli;
    default:
      return null;
  }
};

export const getFlatcoinLeveragedModuleContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinLeveragedModuleBaseGoerli;
    default:
      return null;
  }
};

export const getFlatcoinOracleModuleContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinOracleModuleBaseGoerli;
    default:
      return null;
  }
};

export const getFlatcoinViewerContract = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return flatcoinViewerContractBaseGoerli;
    default:
      return null;
  }
};
