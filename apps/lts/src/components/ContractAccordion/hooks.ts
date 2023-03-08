import { fetchToken, readContracts } from '@wagmi/core';
import { useAccount, useBalance, useQuery } from 'wagmi';

import type { Contract } from '@frontend/lts-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { BigNumber } from 'ethers';

const legacyBalance = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const data = await readContracts({
    contracts: [
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'stakingToken',
        args: undefined,
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: contract?.balanceFn ?? 'balanceOf',
        args: [walletAddress],
      },
    ],
  });
  const stakingToken = await fetchToken({
    address: data?.[0] as unknown as HexAddress,
  });

  return {
    value: data?.[1] as unknown as BigNumber,
    decimals: stakingToken?.decimals,
    symbol: stakingToken?.symbol,
  };
};

export const useContractBalance = (contract: Contract) => {
  const { address: walletAddress } = useAccount();

  let balance;

  balance = useBalance({
    address: walletAddress,
    token: contract.address,
    enabled: contract.type !== 'legacypool',
  });

  balance = useQuery(['legacybal', contract, walletAddress], legacyBalance, {
    enabled: contract.type === 'legacypool',
  });

  return balance;
};
