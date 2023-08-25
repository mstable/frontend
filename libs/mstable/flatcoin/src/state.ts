import { useCallback, useEffect, useState } from 'react';

import {
  KEEPER_FEE_SLIPPAGE_COEFF,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
} from '@frontend/shared-constants';
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
  isFlatcoinSupportedChain,
} from './utils';

import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

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
  {
    initialState: {
      configs: FlatcoinState['configs'];
    };
  }
>(({ initialState }) => {
  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();

  const [state, setState] = useState<FlatcoinState>({
    configs: initialState.configs,
    data: {
      apy: new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.152),
      tvl: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        compactDisplay: 'short',
      }).format(1234567),
      fundingRate: new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 3,
      }).format(-0.00001),
      openInterest: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        compactDisplay: 'short',
      }).format(1234567),
      skew: new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.48),
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

        draft.keeperFee = new BigDecimal(
          new BigNumber(contractData[6].toString())
            .multipliedBy(KEEPER_FEE_SLIPPAGE_COEFF)
            .toFixed(0),
          COLLATERAL.decimals,
        );
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
