/* eslint-disable no-empty */
import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Curve3CrvBasicMetaVaultABI,
  ERC20ABI,
  PeriodicAllocationPerfFeeMetaVaultABI,
} from '@mstable/metavaults-web';
import { useQuery } from '@tanstack/react-query';
import { fetchToken, multicall, readContract } from '@wagmi/core';
import { BigNumber, constants } from 'ethers';
import produce from 'immer';
import { splitEvery, transpose } from 'ramda';
import { createContainer } from 'react-tracked';
import {
  erc4626ABI,
  useAccount,
  useBalance,
  useContractReads,
  useNetwork,
  useToken,
} from 'wagmi';

import {
  useMetavaultQuery,
  useUserVaultBalanceQuery,
} from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { Vault } from './types';

type MetaVaultState = {
  metavault: Metavault | null;
  mvToken: FetchTokenResult | null;
  assetToken: FetchTokenResult | null;
  mvBalance: BigDecimal | null;
  mvBalanceInAsset: BigDecimal | null;
  mvDeposited: BigDecimal | null;
  profitOrLoss: BigDecimal | null;
  assetBalance: BigDecimal | null;
  assetBalanceInShare: BigDecimal | null;
  roi: number | null;
  structure: {
    proxiedVault: Vault;
    underlyingVaults: Vault[];
  } | null;
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
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();
  const [state, setState] = useState<MetaVaultState>({
    metavault: {
      address: '',
      name: '',
      tags: [],
      strategies: [],
      assets: [],
      fees: { liquidation: 0, performance: 0 },
      ...initialState.metavault,
    },
    mvToken: null,
    assetToken: null,
    mvBalance: null,
    mvBalanceInAsset: null,
    mvDeposited: null,
    profitOrLoss: null,
    assetBalance: null,
    assetBalanceInShare: null,
    roi: null,
    structure: null,
    allocations: null,
  });

  const {
    metavault: { address, firstBlock },
    assetToken,
  } = state;

  const dataSource = useDataSource();
  useUserVaultBalanceQuery(
    dataSource,
    {
      owner: walletAddress,
      vault: address,
    },
    {
      enabled: !!address && !!walletAddress && !!state.mvBalanceInAsset,
      refetchInterval: 15000,
      onSuccess: (data) => {
        if (data) {
          setState(
            produce((draft) => {
              const mvDeposited = new BigDecimal(
                data.vaultBalances[0]?.assetDeposited || constants.Zero,
              );
              draft.mvDeposited = mvDeposited;
              draft.profitOrLoss =
                draft.mvBalanceInAsset?.sub(mvDeposited) ?? BigDecimal.ZERO;
            }),
          );
        }
      },
    },
  );

  useMetavaultQuery(
    dataSource,
    { id: address, firstBlock },
    {
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.roi =
              data?.vault?.assetPerShare /
                (data?.vault?.first?.[0]?.assetPerShare ?? 1) -
                1 ?? 0;
          }),
        );
      },
    },
  );

  useToken({
    address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvToken = data;
        }),
      );
    },
  });

  useBalance({
    address: walletAddress,
    token: address,
    watch: true,
    enabled: !!walletAddress && !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvBalance = data
            ? new BigDecimal(data.value, data.decimals)
            : BigDecimal.ZERO;
        }),
      );
    },
  });

  useBalance({
    address: walletAddress,
    token: assetToken?.address,
    watch: true,
    enabled: !!walletAddress,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetBalance = data
            ? new BigDecimal(data.value, data.decimals)
            : BigDecimal.ZERO;
        }),
      );
    },
  });

  useContractReads({
    contracts: [
      {
        address,
        abi: erc4626ABI,
        functionName: 'convertToAssets',
        args: [state.mvBalance?.exact],
      },
      {
        address,
        abi: erc4626ABI,
        functionName: 'convertToShares',
        args: [state.assetBalance?.exact],
      },
    ],
    allowFailure: true,
    cacheOnBlock: true,
    watch: true,
    enabled:
      !!address &&
      isConnected &&
      !!state.mvBalance &&
      !!state.assetToken &&
      !!state.assetBalance &&
      !!state.mvToken,
    onSettled: (data) => {
      setState(
        produce((draft) => {
          draft.mvBalanceInAsset = data?.[0]
            ? new BigDecimal(data[0] as BigNumberish, state.assetToken.decimals)
            : BigDecimal.ZERO;
          draft.assetBalanceInShare = data?.[1]
            ? new BigDecimal(data[1] as BigNumberish, state.mvToken.decimals)
            : BigDecimal.ZERO;
        }),
      );
    },
  });

  useQuery(
    ['structure', address, chain?.id],
    async () => {
      const [asset, proxiedVault] = await multicall({
        contracts: [
          {
            address,
            abi: Curve3CrvBasicMetaVaultABI,
            functionName: 'asset',
          },
          {
            address,
            abi: Curve3CrvBasicMetaVaultABI,
            functionName: 'metaVault',
          },
        ],
      });

      const assetToken = await fetchToken({
        address: asset as unknown as HexAddress,
      });
      const proxyToken = await fetchToken({
        address: proxiedVault as unknown as HexAddress,
      });

      const [uvIdx, proxiedName] = await multicall({
        contracts: [
          {
            address: proxiedVault as unknown as HexAddress,
            abi: PeriodicAllocationPerfFeeMetaVaultABI,
            functionName: 'totalUnderlyingVaults',
          },
          {
            address: proxiedVault as unknown as HexAddress,
            abi: PeriodicAllocationPerfFeeMetaVaultABI,
            functionName: 'name',
          },
        ],
      });

      const uvs = [];
      let indexes = 0;
      try {
        indexes = BigNumber.from(uvIdx).toNumber();
      } catch {}

      for (let i = 0; i < indexes; i++) {
        try {
          const address = await readContract({
            address: proxiedVault as unknown as HexAddress,
            abi: PeriodicAllocationPerfFeeMetaVaultABI,
            functionName: 'resolveVaultIndex',
            args: [i],
          });
          uvs.push(address);
        } catch {}
      }

      const res = await multicall({
        contracts: uvs.reduce(
          (acc, uv) => [
            ...acc,
            {
              address: uv,
              abi: ERC20ABI,
              functionName: 'balanceOf',
              args: [proxiedVault],
            },
            {
              address: uv,
              abi: ERC20ABI,
              functionName: 'decimals',
            },
            {
              address: uv,
              abi: ERC20ABI,
              functionName: 'name',
            },
          ],
          [],
        ),
      });
      const [bals, decimals, names] = transpose(splitEvery(uvs.length, res));

      const converted = await multicall({
        contracts: uvs.map((v, i) => ({
          address: v,
          abi: erc4626ABI,
          functionName: 'convertToAssets',
          args: [bals[i]],
        })),
      });

      const unallocated = await readContract({
        address: asset as unknown as HexAddress,
        abi: erc4626ABI,
        functionName: 'balanceOf',
        args: [proxiedVault as unknown as HexAddress],
      });

      return {
        assetToken,
        structure: {
          proxiedVault: {
            address: proxiedVault as unknown as HexAddress,
            decimals: proxyToken.decimals,
            name: proxiedName as unknown as string,
          },
          underlyingVaults: uvs.map((v, i) => ({
            address: v,
            name: names[i] as unknown as string,
            decimals: decimals[i] as unknown as number,
          })),
        },
        allocations: [
          {
            name: 'Unallocated',
            balance: new BigDecimal(unallocated, proxyToken.decimals).simple,
          },
          ...uvs.reduce(
            (acc, curr, i) => [
              ...acc,
              {
                address: curr,
                name: names[i] as unknown as string,
                balance: new BigDecimal(
                  converted[i] as unknown as BigNumber,
                  decimals[i] as unknown as number,
                ).simple,
              },
            ],
            [],
          ),
        ],
      };
    },
    {
      cacheTime: Infinity,
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.assetToken = data.assetToken;
            draft.allocations = data.allocations;
            draft.structure = data.structure;
          }),
        );
      },
    },
  );

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
