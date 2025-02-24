import { useMemo } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { useAccount, useContractRead } from 'wagmi';

import { l1Token, l2ComptrollerContract, l2Token } from '../../constants';

export const useUnclaimedL2TokenAmount = (): BigDecimal => {
  const { address: walletAddress } = useAccount();

  const { data } = useContractRead({
    address: l2ComptrollerContract.address,
    chainId: l2ComptrollerContract.chainId,
    abi: l2ComptrollerContract.abi,
    functionName: 'getClaimableAmount',
    args: [l1Token.address, l2Token.address, walletAddress, walletAddress],
    enabled: !!walletAddress,
    watch: true,
  });

  return useMemo(() => {
    if (!data) return BigDecimal.ZERO;

    return new BigDecimal(data.toString());
  }, [data]);
};
