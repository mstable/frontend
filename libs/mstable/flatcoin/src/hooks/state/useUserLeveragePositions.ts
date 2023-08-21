import { ZERO_ADDRESS } from '@frontend/shared-constants';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import produce from 'immer';
import { useAccount, useContractReads } from 'wagmi';

import { getFlatcoinLeveragedModuleContract } from '../../utils';

import type { BN } from '@dhedge/core-ui-kit/utils';
import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinState } from '../../types';
const { formatUnits } = utils;

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

// TODO: refactor using Viewer contract
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
        {
          address: getFlatcoinLeveragedModuleContract(chainId).address,
          chainId,
          abi: getFlatcoinLeveragedModuleContract(chainId).abi,
          functionName: 'getApproved',
          args: [id],
        },
      ])
      .flat(),
    enabled: !!tokenIds?.length,
    watch: true,
    onSuccess(data) {
      setState(
        produce((draft) => {
          draft.leveragedPositions = tokenIds?.length
            ? tokenIds.map((id, index) => {
                const positionIndex = index * 3;
                const positionSummaryIndex = positionIndex + 1;
                const positionApproveIndex = positionSummaryIndex + 1;
                const position = data[
                  positionIndex
                ] as unknown as GetPositionContractData;
                const positionSummary = data[
                  positionSummaryIndex
                ] as unknown as GetPositionSummaryContractData;
                return {
                  positionId: id.toString(),
                  additionalSize: position?.additionalSize
                    ? formatUnits(position.additionalSize)
                    : '',
                  leverage: new BigNumber(
                    position?.additionalSize?.toString() ?? '',
                  )
                    .dividedBy(
                      positionSummary?.marginAfterSettlement?.toString() ?? '0',
                    )
                    .toFixed(),
                  entryCumulativeFunding:
                    position?.entryCumulativeFunding?.toString() ?? '',
                  entryPrice: position?.entryPrice
                    ? formatUnits(position.entryPrice)
                    : '',
                  marginDeposited: position?.marginDeposited
                    ? formatUnits(position.marginDeposited)
                    : '',
                  accruedFunding:
                    positionSummary?.accruedFunding?.toString() ?? '',
                  marginAfterSettlement: positionSummary?.marginAfterSettlement
                    ? formatUnits(positionSummary.marginAfterSettlement)
                    : '',
                  profitLoss: positionSummary?.profitLoss
                    ? formatUnits(positionSummary.profitLoss)
                    : '',
                  approvedAddress:
                    data?.[positionApproveIndex].toString() ?? ZERO_ADDRESS,
                };
              })
            : [];
        }),
      );
    },
  });
};
