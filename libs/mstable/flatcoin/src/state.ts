import { useEffect, useState } from 'react';

import { SUPPORTED_FLATCOIN_CHAIN_IDS, toks } from '@frontend/shared-constants';
import { useSearch } from '@tanstack/react-location';
import BigNumber from 'bignumber.js';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi';

import { getFlatcoinTokensByChain, isFlatcoinSupportedChain } from './utils';

import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinRoute, FlatcoinState } from './types';
const defaultFlatcoinChainId = SUPPORTED_FLATCOIN_CHAIN_IDS[0];

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
    flatcoinChainId: defaultFlatcoinChainId,
    tokens: {
      collateral: {
        ...toks[defaultFlatcoinChainId]['USDC'],
        balance: '',
        price: '',
      },
      flatcoin: {
        ...toks[defaultFlatcoinChainId]['mStable'],
        balance: '',
        price: '',
      },
      native: {
        balance: '',
        price: '',
        symbol: '',
        decimals: 18,
      },
    },
  });

  useBalance({
    address: walletAddress,
    chainId: chain?.id,
    onSuccess({ decimals, symbol, formatted }) {
      setState(
        produce((draft) => {
          draft.tokens.native.decimals = decimals;
          draft.tokens.native.symbol = symbol;
          draft.tokens.native.balance = formatted;
        }),
      );
    },
    enabled: !!walletAddress,
    watch: true,
  });
  const { data: tokensChainData } = useContractReads({
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
    ],
    enabled: !!walletAddress,
    watch: true,
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

  useEffect(() => {
    const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(
      state.flatcoinChainId,
    );
    setState(
      produce((draft) => {
        draft.tokens.collateral = {
          ...COLLATERAL,
          price: '1',
          balance: tokensChainData[0]
            ? new BigNumber(tokensChainData[0].toString())
                .shiftedBy(-COLLATERAL.decimals)
                .toFixed()
            : '',
        };
        draft.tokens.flatcoin = {
          ...FLATCOIN,
          price: tokensChainData[2]
            ? new BigNumber(tokensChainData[2].toString())
                .shiftedBy(-FLATCOIN.decimals)
                .toFixed()
            : '', // TODO: check
          balance: tokensChainData[1]
            ? new BigNumber(tokensChainData[1].toString())
                .shiftedBy(-FLATCOIN.decimals)
                .toFixed()
            : '',
        };
      }),
    );
  }, [state.flatcoinChainId, tokensChainData]);

  return [state, setState];
});
