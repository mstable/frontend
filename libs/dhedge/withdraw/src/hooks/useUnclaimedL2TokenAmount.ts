import { useMemo } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { useAccount, useContractReads } from 'wagmi';

import {
  deprecatedL1Vaults,
  l2ComptrollerContract,
  l2Token,
} from '../constants';

import type { Address } from 'wagmi';

interface UnclaimedL2Tokens {
  address: Address;
  amount: BigDecimal;
}

export const useUnclaimedL2TokenAmount = (): UnclaimedL2Tokens[] => {
  const { address: walletAddress } = useAccount();

  const { data } = useContractReads({
    contracts: deprecatedL1Vaults.map((address) => ({
      address: l2ComptrollerContract.address,
      chainId: l2ComptrollerContract.chainId,
      abi: l2ComptrollerContract.abi,
      functionName: 'getClaimableAmount',
      args: [address, l2Token.address, walletAddress, walletAddress],
    })),
    enabled: !!walletAddress,
    watch: true,
  });

  return useMemo(() => {
    if (!data) return [];

    return data
      .map((value, index) => {
        if (!value || value.toString() === '0') return null;

        return {
          address: deprecatedL1Vaults[index],
          amount: new BigDecimal(value.toString()),
        };
      })
      .filter((value) => !!value);
  }, [data]);
};
