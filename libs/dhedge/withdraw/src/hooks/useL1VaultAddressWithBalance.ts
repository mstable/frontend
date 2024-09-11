import { Address, useAccount, useContractReads } from 'wagmi';
import { deprecatedL1Vaults } from '../constants';
import { mainnet } from 'wagmi/chains';
import { PoolLogicAbi } from '../constants/abis/PoolLogicAbi';
import { AddressZero } from '@dhedge/core-ui-kit/const';

export const useL1VaultAddressWithBalance = (): Address => {
  const { address: walletAddress } = useAccount();
  const { data } = useContractReads({
    contracts: deprecatedL1Vaults.map((address) => ({
      address,
      chainId: mainnet.id,
      abi: PoolLogicAbi,
      functionName: 'balanceOf',
      args: [walletAddress],
    })),
  });

  const [addressWithBalance] = deprecatedL1Vaults.filter(
    (_, index) => !!data?.[index] && data[index].toString() !== '0',
  );

  return addressWithBalance ?? AddressZero;
};
