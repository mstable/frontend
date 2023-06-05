import { getContractAddressById } from '@dhedge/core-ui-kit/utils';
import { AddressZero } from '@dhedge/core-ui-kit/const';
import { DHedgeStakingV2Abi as abi } from '@dhedge/core-ui-kit/abi';

import {
  useAccount,
  useContractReads,
  useContractRead,
} from '@dhedge/core-ui-kit/hooks/web3';
import { STAKING_CHAIN_ID as chainId } from '@frontend/shared-constants';
import { Address } from '@dhedge/core-ui-kit/types';
import { useMemo } from 'react';

const address = getContractAddressById('stakingV2', chainId);

export const useUserStakedVaults = () => {
  const { account } = useAccount();

  const { data: userBalances } = useContractRead({
    address,
    abi,
    chainId,
    functionName: 'balanceOf',
    args: [account ?? AddressZero],
    staleTime: Infinity,
    enabled: !!account,
  });

  const { data: stakeIds } = useContractReads({
    contracts: Array.from(Array(userBalances?.toNumber() ?? 0).keys()).map(
      (index) => ({
        address,
        abi,
        chainId,
        functionName: 'tokenOfOwnerByIndex',
        args: [account, index],
      }),
    ),
    staleTime: Infinity,
    enabled: !!account,
  });

  const { data } = useContractReads({
    contracts: stakeIds?.map((stakeId) => ({
      address,
      abi,
      chainId,
      functionName: 'getStake',
      args: [stakeId],
    })),
    enabled: !!stakeIds?.length,
    staleTime: 60_000,
  });

  return useMemo(
    () =>
      data
        ?.filter(({ dhedgePoolAddress }) => dhedgePoolAddress !== AddressZero)
        .map(({ dhedgePoolAddress, dhedgePoolAmount }) => ({
          address: dhedgePoolAddress.toLowerCase() as Address,
          amount: dhedgePoolAmount.toString(),
        })),
    [data],
  );
};
