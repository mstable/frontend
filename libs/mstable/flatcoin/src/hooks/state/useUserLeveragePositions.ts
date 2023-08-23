import { useEffect } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import produce from 'immer';
import { useAccount, useContractRead } from 'wagmi';

import { getFlatcoinViewerContract } from '../../utils';

import type { BN } from '@dhedge/core-ui-kit/utils';
import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinState } from '../../types';

interface UseUserLeveragePositionsVariables {
  chainId: number;
  setState: Dispatch<SetStateAction<FlatcoinState>>;
}

interface LeveragedPositionContractData {
  additionalSize: BN;
  entryCumulativeFunding: BN;
  entryPrice: BN;
  marginDeposited: BN;
  accruedFunding: BN;
  marginAfterSettlement: BN;
  profitLoss: BN;
  tokenId: BN;
}

export const useUserLeveragePositions = ({
  chainId,
  setState,
}: UseUserLeveragePositionsVariables) => {
  const { address: walletAddress } = useAccount();

  const { data } = useContractRead({
    address: getFlatcoinViewerContract(chainId).address,
    chainId,
    abi: getFlatcoinViewerContract(chainId).abi,
    functionName: 'getAccountLeveragePositionData',
    args: [walletAddress],
    enabled: !!walletAddress,
    watch: true,
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.leveragedPositions = data?.length
          ? data.map(
              ({
                tokenId,
                additionalSize,
                entryCumulativeFunding,
                entryPrice,
                marginDeposited,
                accruedFunding,
                marginAfterSettlement,
                profitLoss,
              }: LeveragedPositionContractData) => {
                return {
                  positionId: tokenId.toString(),
                  additionalSize: new BigDecimal(additionalSize),
                  leverage:
                    new BigDecimal(additionalSize).simple /
                    new BigDecimal(marginAfterSettlement).simple,
                  entryCumulativeFunding: new BigDecimal(
                    entryCumulativeFunding,
                  ),
                  entryPrice: new BigDecimal(entryPrice),
                  marginDeposited: new BigDecimal(marginDeposited),
                  accruedFunding: new BigDecimal(accruedFunding),
                  marginAfterSettlement: new BigDecimal(marginAfterSettlement),
                  profitLoss: new BigDecimal(profitLoss),
                };
              },
            )
          : [];
      }),
    );
  }, [data, setState]);
};
