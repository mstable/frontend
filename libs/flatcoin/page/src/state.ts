import { useCallback, useEffect, useState } from 'react';

import {
  KEEPER_FEE_SLIPPAGE_COEFF,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
} from '@frontend/flatcoin-constants';
import { BigDecimal } from '@frontend/shared-utils';
import BigNumber from 'bignumber.js';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useNetwork } from 'wagmi';

import { usePythEthPrice } from './hooks';
import { useUserLeveragePositions } from './hooks/state/useUserLeveragePositions';
import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinKeeperFeeContract,
  getFlatcoinTokensByChain,
  getFlatcoinVaultContract,
  getFlatcoinViewerContract,
  isFlatcoinSupportedChain,
} from './utils';

import type { BigNumberish } from 'ethers';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import type { FlatcoinState, PriceFeedData } from './types';
const defaultFlatcoinChainId = SUPPORTED_FLATCOIN_CHAIN_IDS[0];
const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(
  defaultFlatcoinChainId,
);

export const {
  Provider: FlatcoinProvider,
  useUpdate: useUpdateFlatcoin,
  useTrackedState: useFlatcoin,
} = createContainer<
  FlatcoinState,
  Dispatch<SetStateAction<FlatcoinState>>,
  PropsWithChildren
>(() => {
  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();

  const [state, setState] = useState<FlatcoinState>({
    data: {
      apy: new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.152),
      tvl: '',
    },
    leveragedPositions: [],
    announcedOrder: null,
    flatcoinChainId: defaultFlatcoinChainId,
    tokens: {
      collateral: {
        ...COLLATERAL,
        balance: BigDecimal.ZERO,
        price: BigDecimal.ZERO,
      },
      flatcoin: {
        ...FLATCOIN,
        balance: BigDecimal.ZERO,
        price: BigDecimal.ZERO,
      },
    },
    keeperFee: BigDecimal.ZERO,
  });

  const { data: contractData } = useContractReads({
    contracts: [
      {
        address: state.tokens.collateral.address,
        abi: state.tokens.collateral.abi,
        chainId: state.tokens.collateral.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.tokens.flatcoin.address,
        abi: state.tokens.flatcoin.abi,
        chainId: state.tokens.flatcoin.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.tokens.flatcoin.address,
        abi: state.tokens.flatcoin.abi,
        chainId: state.tokens.flatcoin.chainId,
        functionName: 'stableCollateralPerShare',
        args: [],
      },
      {
        address: getFlatcoinDelayedOrderContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinDelayedOrderContract(state.flatcoinChainId).abi,
        functionName: 'getAnnouncedOrder',
        args: [walletAddress],
      },
      {
        address: getFlatcoinDelayedOrderContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinDelayedOrderContract(state.flatcoinChainId).abi,
        functionName: 'maxExecutabilityAge',
        args: [],
      },
      {
        address: getFlatcoinDelayedOrderContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinDelayedOrderContract(state.flatcoinChainId).abi,
        functionName: 'minExecutabilityAge',
        args: [],
      },
      {
        address: getFlatcoinKeeperFeeContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinKeeperFeeContract(state.flatcoinChainId).abi,
        functionName: 'getKeeperFee',
        args: [],
      },
      {
        address: getFlatcoinViewerContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinViewerContract(state.flatcoinChainId).abi,
        functionName: 'getFlatcoinTVL',
        args: [],
      },
      {
        address: getFlatcoinVaultContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinVaultContract(state.flatcoinChainId).abi,
        functionName: 'getVaultSummary',
        args: [],
      },
      {
        address: getFlatcoinVaultContract(state.flatcoinChainId).address,
        chainId: state.flatcoinChainId,
        abi: getFlatcoinVaultContract(state.flatcoinChainId).abi,
        functionName: 'getCurrentFundingRate',
        args: [],
      },
    ],
    watch: true,
  });

  useEffect(() => {
    if (!contractData) return;

    const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(
      state.flatcoinChainId,
    );

    setState(
      produce((draft) => {
        draft.tokens.collateral = {
          ...draft.tokens.collateral,
          ...COLLATERAL,
          balance: contractData?.[0]
            ? new BigDecimal(contractData[0].toString())
            : BigDecimal.ZERO,
        };
        draft.tokens.flatcoin = {
          ...draft.tokens.flatcoin,
          ...FLATCOIN,
          balance: contractData?.[1]
            ? new BigDecimal(contractData[1].toString())
            : BigDecimal.ZERO,
        };
        draft.announcedOrder =
          !contractData[3] || contractData[3]['orderData'] === '0x'
            ? null
            : {
                orderData: contractData[3]?.['orderData'] as string,
                type: contractData[3]?.['orderType'] as number,
                keeperFee: new BigDecimal(
                  contractData[3]?.['keeperFee'] as BigNumberish,
                  COLLATERAL.decimals,
                ),
                executableAtTime: (
                  contractData[3]?.['executableAtTime'] as BigNumberish
                ).toString(),
                maxExecutabilityAge: contractData?.[4].toString() ?? '',
                minExecutabilityAge: contractData?.[5].toString() ?? '',
              };

        draft.keeperFee = contractData[6]
          ? new BigDecimal(
              new BigNumber(contractData[6].toString())
                .multipliedBy(KEEPER_FEE_SLIPPAGE_COEFF)
                .toFixed(0),
              COLLATERAL.decimals,
            )
          : BigDecimal.ZERO;

        draft.data.tvl = BigNumber.isBigNumber(contractData[7])
          ? new BigDecimal(contractData[7].toString()).usd
          : BigDecimal.ZERO.usd;

        draft.data.skew = contractData[8]
          ? new BigDecimal(contractData[8]['marketSkew'].toString())
          : BigDecimal.ZERO;

        draft.data.fundingRate = contractData[9]
          ? new BigDecimal(
              new BigNumber(contractData[9].toString())
                .multipliedBy(100)
                .toString(),
            )
          : BigDecimal.ZERO;

        draft.data.openInterest = contractData[8]
          ? new BigDecimal(
              contractData?.[8]?.['globalPositions']?.[
                'sizeOpenedTotal'
              ].toString(),
            )
          : BigDecimal.ZERO;
      }),
    );
  }, [contractData, state.flatcoinChainId]);

  useUserLeveragePositions({
    setState,
    chainId: state.flatcoinChainId,
  });

  const setEthPrice = useCallback(
    ([{ price }]: PriceFeedData[]) => {
      setState(
        produce((draft) => {
          const collateralPrice = new BigDecimal(
            new BigNumber(price.price)
              .shiftedBy(price.expo)
              .shiftedBy(state.tokens.collateral.decimals)
              .toFixed(),
          );
          draft.tokens.collateral.price = collateralPrice;
          draft.tokens.flatcoin.price = contractData?.[2]
            ? new BigDecimal(
                new BigNumber(contractData[2].toString())
                  .multipliedBy(collateralPrice.simple)
                  .toFixed(0),
              )
            : BigDecimal.ZERO;
        }),
      );
    },
    [contractData, state.tokens.collateral.decimals],
  );
  usePythEthPrice<PriceFeedData[]>({
    onSuccess: setEthPrice,
    type: 'price',
    enabled: !!contractData?.[2],
    chainId: state.flatcoinChainId,
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.flatcoinChainId = isFlatcoinSupportedChain(chain?.id)
          ? chain.id
          : SUPPORTED_FLATCOIN_CHAIN_IDS[0];
      }),
    );
  }, [chain]);

  return [state, setState];
});
