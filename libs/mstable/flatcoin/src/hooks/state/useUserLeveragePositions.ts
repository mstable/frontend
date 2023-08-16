import produce from 'immer';
import { useAccount, useContractReads } from 'wagmi';

import { getFlatcoinLeveragedModuleContract } from '../../utils';

import type { BN } from '@dhedge/core-ui-kit/utils';
import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinState } from '../../types';

interface UseUserLeveragePositionsVariables {
  userLeverageBalance: string;
  chainId: number;
  setState: Dispatch<SetStateAction<FlatcoinState>>;
}

interface GetPositionContractData {
  additionalSize: BN;
  entryCumulativeFunding: BN;
  entryPrice: BN;
  marginDeposited: BN;
}
interface GetPositionSummaryContractData {
  accruedFunding: BN;
  marginAfterSettlement: BN;
  profitLoss: BN;
}

export const useUserLeveragePositions = ({
  userLeverageBalance,
  chainId,
  setState,
}: UseUserLeveragePositionsVariables) => {
  const { address: walletAddress } = useAccount();
  const { data: tokenIds } = useContractReads({
    contracts: Array.from(Array(+userLeverageBalance || 0).keys()).map(
      (index) => ({
        address: getFlatcoinLeveragedModuleContract(chainId).address,
        chainId,
        abi: getFlatcoinLeveragedModuleContract(chainId).abi,
        functionName: 'tokenOfOwnerByIndex',
        args: [walletAddress, index],
      }),
    ),
    enabled: !!userLeverageBalance,
  });

  useContractReads({
    contracts: tokenIds
      ?.map((id) => [
        {
          address: getFlatcoinLeveragedModuleContract(chainId).address,
          chainId,
          abi: getFlatcoinLeveragedModuleContract(chainId).abi,
          functionName: 'getPosition',
          args: [id],
        },
        {
          address: getFlatcoinLeveragedModuleContract(chainId).address,
          chainId,
          abi: getFlatcoinLeveragedModuleContract(chainId).abi,
          functionName: 'getPositionSummary',
          args: [id],
        },
      ])
      .flat(),
    enabled: !!tokenIds?.length,
    onSuccess(data) {
      setState(
        produce((draft) => {
          draft.leveragedPositions = tokenIds.map((_, index) => {
            const positionIndex = index * 2;
            const positionSummaryIndex = positionIndex + 1;
            const position = data[
              positionIndex
            ] as unknown as GetPositionContractData;
            const positionSummary = data[
              positionSummaryIndex
            ] as unknown as GetPositionSummaryContractData;
            return {
              additionalSize: position?.additionalSize?.toString() ?? '',
              entryCumulativeFunding:
                position?.entryCumulativeFunding?.toString() ?? '',
              entryPrice: position?.entryPrice?.toString() ?? '',
              marginDeposited: position?.marginDeposited?.toString() ?? '',
              accruedFunding: positionSummary?.accruedFunding?.toString() ?? '',
              marginAfterSettlement:
                positionSummary?.marginAfterSettlement?.toString() ?? '',
              profitLoss: positionSummary?.profitLoss?.toString() ?? '',
            };
          });
        }),
      );
    },
  });
};
