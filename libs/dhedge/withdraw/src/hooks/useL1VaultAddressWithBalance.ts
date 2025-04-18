import { PoolLogicABI, ZERO_ADDRESS } from '@frontend/shared-constants';
import { useAccount, useContractReads } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { deprecatedL1Vaults } from '../constants';

import type { Address } from 'wagmi';

export const useL1VaultAddressWithBalance = (): Address => {
  const { address: walletAddress } = useAccount();

  const { data } = useContractReads({
    contracts: deprecatedL1Vaults.map((address) => ({
      address,
      chainId: mainnet.id,
      abi: PoolLogicABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    })),
    enabled: !!walletAddress,
  });

  const [addressWithBalance] = deprecatedL1Vaults.filter(
    (_, index) => !!data?.[index] && data[index].toString() !== '0',
  );

  return addressWithBalance ?? ZERO_ADDRESS;
};
