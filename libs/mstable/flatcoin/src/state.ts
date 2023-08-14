import { useEffect, useState } from 'react';

import { SUPPORTED_FLATCOIN_CHAIN_IDS } from '@frontend/shared-constants';
import { useSearch } from '@tanstack/react-location';
import BigNumber from 'bignumber.js';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useNetwork } from 'wagmi';

import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinTokensByChain,
  isFlatcoinSupportedChain,
} from './utils';

import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinRoute, FlatcoinState } from './types';
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
  const { type } = useSearch<FlatcoinRoute>();
  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();

  const [state, setState] = useState<FlatcoinState>({
    type,
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
    positions: [
      {
        type: 'leveragedeth',
        value: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          minimumFractionDigits: 2,
        }).format(1000),
        date: new Date().toLocaleString(),
        leverageMultiplier: new Intl.NumberFormat('en-US', {
          compactDisplay: 'short',
          minimumFractionDigits: 1,
        }).format(10),
        liquidation: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
        }).format(1000),
        profitLossTotal: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(100),
        profitLossFunding: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(-20),
      },
      {
        type: 'flatcoin',
        value: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          minimumFractionDigits: 2,
        }).format(1000),
        date: new Date().toLocaleString(),
        profitLossTotal: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(100),
        profitLossFunding: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(20),
      },
    ],
    announcedOrders: [],
    flatcoinChainId: defaultFlatcoinChainId,
    tokens: {
      collateral: {
        ...COLLATERAL,
        balance: '',
        price: '',
      },
      flatcoin: {
        ...FLATCOIN,
        balance: '',
        price: '',
      },
    },
  });

  // TODO: uncomment and check prices
  // const setEthPrice = useCallback(([{ price }]: PriceFeedData[]) => {
  //   setState(
  //     produce((draft) => {
  //       draft.tokens.collateral.price = new BigNumber(price.price)
  //         .shiftedBy(price.expo)
  //         .toFixed();
  //     }),
  //   );
  // }, []);
  // useEthPriceFeed({ onSuccess: setEthPrice });

  useContractReads({
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
    ],
    watch: true,
    onSuccess(data) {
      const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(
        state.flatcoinChainId,
      );
      setState(
        produce((draft) => {
          draft.tokens.collateral = {
            ...draft.tokens.collateral,
            ...COLLATERAL,
            balance: data?.[0]
              ? new BigNumber(data[0].toString())
                  .shiftedBy(-COLLATERAL.decimals)
                  .toFixed()
              : '',
            price: data?.[2]
              ? new BigNumber(data[2].toString())
                  .shiftedBy(-FLATCOIN.decimals)
                  .toFixed()
              : '', // TODO: remove when uncommenting useEthPriceFeed
          };
          draft.tokens.flatcoin = {
            ...FLATCOIN,
            price: data?.[2]
              ? new BigNumber(data[2].toString())
                  .shiftedBy(-FLATCOIN.decimals)
                  .toFixed()
              : '', // TODO: check
            balance: data?.[1]
              ? new BigNumber(data[1].toString())
                  .shiftedBy(-FLATCOIN.decimals)
                  .toFixed()
              : '',
          };
          //TODO: check why only 1 announce order?
          draft.announcedOrders = data[3]
            ? [
                {
                  orderData: data[3]?.['orderData'] as string,
                  type: data[3]?.['orderType'] as number,
                  keeperFee: (
                    data[3]?.['keeperFee'] as BigNumberish
                  ).toString(),
                  executableAtTime: (
                    data[3]?.['executableAtTime'] as BigNumberish
                  ).toString(),
                },
              ]
            : [];
        }),
      );
    },
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.type = ['flatcoin', 'leveragedeth'].includes(type)
          ? type
          : 'flatcoin';
      }),
    );
  }, [type]);

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
