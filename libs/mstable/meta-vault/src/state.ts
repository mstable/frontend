/* eslint-disable no-empty */
import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';
import { multicall, readContract } from '@wagmi/core';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi';

import {
  useMetavaultQuery,
  useUserVaultBalanceQuery,
} from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { BigNumber, BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { MvToken } from './types';

type MetaVaultState = {
  metavault: Metavault | null;
  mvToken: MvToken | null;
  mvBalance: BigDecimal | null;
  mvBalanceInAsset: BigDecimal | null;
  mvDeposited: BigDecimal | null;
  profitOrLoss: BigDecimal | null;
  assetBalance: BigDecimal | null;
  assetBalanceInShare: BigDecimal | null;
  roi: number | null;
  allocations: { address: HexAddress; name: string; balance: number }[] | null;
};

export const {
  Provider: MetavaultProvider,
  useUpdate: useUpdateMetavault,
  useTrackedState: useMetavault,
} = createContainer<
  MetaVaultState,
  Dispatch<SetStateAction<MetaVaultState>>,
  { initialState: { metavault: Metavault } }
>(({ initialState }) => {
  const dataSource = useDataSource();
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();
  const [state, setState] = useState<MetaVaultState>({
    metavault: initialState.metavault,
    mvToken: {
      address: initialState.metavault.address,
      decimals: initialState.metavault.decimals,
      name: initialState.metavault.name,
      symbol: initialState.metavault.symbol,
      totalSupply: {
        formatted: null,
        value: null,
      },
      totalAssets: {
        formatted: null,
        value: null,
      },
    },
    mvBalance: null,
    mvBalanceInAsset: null,
    mvDeposited: null,
    profitOrLoss: null,
    assetBalance: null,
    assetBalanceInShare: null,
    roi: null,
    allocations: null,
  });

  const {
    metavault: {
      address,
      abi,
      firstBlock,
      asset,
      proxy,
      underlyings,
      decimals,
    },
  } = state;

  const { data: tot } = useContractReads({
    contracts: [
      { address, abi, functionName: 'totalSupply' },
      { address, abi, functionName: 'totalAssets' },
    ],
    cacheOnBlock: true,
    watch: true,
  });

  useEffect(() => {
    if (tot) {
      setState(
        produce((draft) => {
          draft.mvToken.totalSupply.value = tot[0] as unknown as BigNumber;
          draft.mvToken.totalAssets.value = tot[1] as unknown as BigNumber;
        }),
      );
    }
  }, [tot]);

  const { data: mvBa } = useBalance({
    address: walletAddress,
    token: address,
    watch: true,
    enabled: !!walletAddress,
  });

  useEffect(() => {
    if (mvBa) {
      setState(
        produce((draft) => {
          draft.mvBalance = mvBa?.value
            ? new BigDecimal(mvBa.value, mvBa.decimals)
            : BigDecimal.ZERO;
        }),
      );
    }
  }, [mvBa]);

  const { data: asBa } = useBalance({
    address: walletAddress,
    token: asset.address,
    watch: true,
    enabled: !!walletAddress,
  });

  useEffect(() => {
    if (asBa) {
      setState(
        produce((draft) => {
          draft.assetBalance = asBa?.value
            ? new BigDecimal(asBa.value, asBa.decimals)
            : BigDecimal.ZERO;
        }),
      );
    }
  }, [asBa]);

  const { data: usBa } = useUserVaultBalanceQuery(
    dataSource,
    {
      owner: walletAddress,
      vault: address,
    },
    {
      enabled: !!address && !!walletAddress && !!state.mvBalanceInAsset,
      refetchInterval: 15000,
    },
  );

  useEffect(() => {
    if (usBa) {
      setState(
        produce((draft) => {
          const mvDeposited = new BigDecimal(
            usBa.vaultBalances[0]?.assetDeposited || constants.Zero,
          );
          draft.mvDeposited = mvDeposited;
          draft.profitOrLoss =
            draft.mvBalanceInAsset?.sub(mvDeposited) ?? BigDecimal.ZERO;
        }),
      );
    }
  }, [usBa]);

  const { data: roi } = useMetavaultQuery(dataSource, {
    id: address,
    firstBlock,
  });

  useEffect(() => {
    if (roi) {
      setState(
        produce((draft) => {
          draft.roi =
            roi?.vault?.assetPerShare /
              (roi?.vault?.first?.[0]?.assetPerShare ?? 1) -
              1 ?? 0;
        }),
      );
    }
  }, [roi]);

  const { data: pre } = useContractReads({
    contracts: [
      {
        address,
        abi,
        functionName: 'convertToAssets',
        args: [state.mvBalance?.exact],
      },
      {
        address,
        abi,
        functionName: 'convertToShares',
        args: [state.assetBalance?.exact],
      },
    ],
    allowFailure: true,
    cacheOnBlock: true,
    watch: true,
    enabled:
      isConnected &&
      !!address &&
      !!state.mvBalance?.exact &&
      !!state.assetBalance?.exact,
  });

  useEffect(() => {
    if (pre) {
      setState(
        produce((draft) => {
          draft.mvBalanceInAsset = pre?.[0]
            ? new BigDecimal(pre[0] as BigNumberish, asset.decimals)
            : BigDecimal.ZERO;
          draft.assetBalanceInShare = pre?.[1]
            ? new BigDecimal(pre[1] as BigNumberish, decimals)
            : BigDecimal.ZERO;
        }),
      );
    }
  }, [asset.decimals, decimals, pre]);

  const { data: mvAll } = useQuery(
    ['allocations', address, chain?.id],
    async () => {
      const bals = await multicall({
        contracts: underlyings.map((uv) => ({
          address: uv.address,
          abi: uv.abi,
          functionName: 'balanceOf',
          args: [proxy.address],
        })),
      });

      const converted = await multicall({
        contracts: underlyings.map((v, i) => ({
          address: v.address,
          abi: v.abi,
          functionName: 'convertToAssets',
          args: [bals[i]],
        })),
      });

      const unallocated = await readContract({
        address: asset.address,
        abi: asset.abi,
        functionName: 'balanceOf',
        args: [proxy.address],
      });

      return [
        {
          name: 'Unallocated',
          balance: new BigDecimal(
            unallocated as unknown as BigNumberish,
            proxy.decimals,
          ).simple,
        },
        ...underlyings.reduce(
          (acc, curr, i) => [
            ...acc,
            {
              address: curr.address,
              name: curr.name,
              balance: new BigDecimal(
                converted[i] as unknown as BigNumber,
                decimals[i] as unknown as number,
              ).simple,
            },
          ],
          [],
        ),
      ];
    },
    {
      cacheTime: Infinity,
    },
  );

  useEffect(() => {
    if (mvAll) {
      setState(
        produce((draft) => {
          draft.allocations = mvAll;
        }),
      );
    }
  }, [mvAll]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.mvBalance = null;
        draft.mvBalanceInAsset = null;
        draft.assetBalance = null;
        draft.assetBalanceInShare = null;
        draft.mvDeposited = null;
        draft.profitOrLoss = null;
      }),
    );
  }, [walletAddress]);

  return [state, setState];
});
