import {
  flatcoinDelayedOrderBaseGoerli,
  flatcoinKeeperFeeBaseGoerli,
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
