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
import { erc20ABI, fetchToken, multicall, readContract } from '@wagmi/core';
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
} from 'wagmi';

import {
  useMetavaultQuery,
  useUserVaultBalanceQuery,
} from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { MvToken, Vault } from './types';

type MetaVaultState = {
  metavault: Metavault | null;
  mvToken: MvToken | null;
  assetToken: MvToken | null;
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

const emptyToken: MvToken = {
  address: null,
  decimals: null,
  name: null,
  symbol: null,
  totalSupply: {
    formatted: null,
    value: null,
  },
  totalAssets: {
    formatted: null,
    value: null,
  },
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
    metavault: {
      address: '',
      name: '',
      tags: [],
      strategies: [],
      assets: [],
      fees: { liquidation: 0, performance: 0 },
      ...initialState.metavault,
    },
    mvToken: { ...emptyToken, address: initialState.metavault.address },
    assetToken: emptyToken,
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

  const { data: mvTo } = useContractReads({
    contracts: [
      { address, abi: erc4626ABI, functionName: 'asset' },
      { address, abi: erc20ABI, functionName: 'name' },
      { address, abi: erc20ABI, functionName: 'decimals' },
      { address, abi: erc20ABI, functionName: 'symbol' },
    ],
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (mvTo) {
      setState(
        produce((draft) => {
          draft.assetToken.address = mvTo[0];
          draft.mvToken.name = mvTo[1];
          draft.mvToken.decimals = mvTo[2];
          draft.mvToken.symbol = mvTo[3];
        }),
      );
    }
  }, [mvTo]);

  const { data: tot } = useContractReads({
    contracts: [
      { address, abi: erc20ABI, functionName: 'totalSupply' },
      { address, abi: erc4626ABI, functionName: 'totalAssets' },
    ],
    cacheOnBlock: true,
    watch: true,
  });

  useEffect(() => {
    if (tot) {
      setState(
        produce((draft) => {
          draft.mvToken.totalSupply.value = tot[0];
          draft.mvToken.totalAssets.value = tot[1];
        }),
      );
    }
  }, [tot]);

  const { data: asTo } = useContractReads({
    contracts: [
      { address: assetToken?.address, abi: erc20ABI, functionName: 'name' },
      { address: assetToken?.address, abi: erc20ABI, functionName: 'decimals' },
      { address: assetToken?.address, abi: erc20ABI, functionName: 'symbol' },
    ],
    cacheTime: Infinity,
    enabled: !!assetToken?.address,
  });

  useEffect(() => {
    if (asTo) {
      setState(
        produce((draft) => {
          draft.assetToken.name = asTo[0];
          draft.assetToken.decimals = asTo[1];
          draft.assetToken.symbol = asTo[2];
        }),
      );
    }
  }, [asTo]);

  const { data: asTot } = useContractReads({
    contracts: [
      {
        address: assetToken?.address,
        abi: erc20ABI,
        functionName: 'totalSupply',
      },
    ],
    cacheOnBlock: true,
    watch: true,
    enabled: !!assetToken?.address,
  });

  useEffect(() => {
    if (asTot) {
      setState(
        produce((draft) => {
          draft.assetToken.totalSupply.value = asTot[0];
        }),
      );
    }
  }, [asTot]);

  const { data: mvBa } = useBalance({
    address: walletAddress,
    token: address,
    watch: true,
    enabled: !!walletAddress && !!address,
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
    token: assetToken?.address,
    watch: true,
    enabled: !!walletAddress && !!assetToken?.address,
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
      isConnected &&
      !!address &&
      !!state.mvToken?.decimals &&
      !!state.assetToken?.decimals &&
      !!state.mvBalance?.exact &&
      !!state.assetBalance?.exact,
  });

  useEffect(() => {
    if (pre && state.assetToken.decimals && state.mvToken.decimals) {
      setState(
        produce((draft) => {
          draft.mvBalanceInAsset = pre?.[0]
            ? new BigDecimal(pre[0] as BigNumberish, state.assetToken.decimals)
            : BigDecimal.ZERO;
          draft.assetBalanceInShare = pre?.[1]
            ? new BigDecimal(pre[1] as BigNumberish, state.mvToken.decimals)
            : BigDecimal.ZERO;
        }),
      );
    }
  }, [pre, state.assetToken.decimals, state.mvToken.decimals]);

  const { data: mvSt } = useQuery(
    ['structure', address, chain?.id],
    async () => {
      const proxiedVault = await readContract({
        address,
        abi: Curve3CrvBasicMetaVaultABI,
        functionName: 'metaVault',
        args: [],
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
            args: [],
          },
          {
            address: proxiedVault as unknown as HexAddress,
            abi: PeriodicAllocationPerfFeeMetaVaultABI,
            functionName: 'name',
            args: [],
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
      const [bals, decimals, names] = uvs.length
        ? transpose(splitEvery(uvs.length, res))
        : [[], [], []];

      const converted = await multicall({
        contracts: uvs.map((v, i) => ({
          address: v,
          abi: erc4626ABI,
          functionName: 'convertToAssets',
          args: [bals[i]],
        })),
      });

      const unallocated = await readContract({
        address: assetToken?.address,
        abi: erc4626ABI,
        functionName: 'balanceOf',
        args: [proxiedVault as unknown as HexAddress],
      });

      return {
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
      enabled: !!assetToken?.address,
      cacheTime: Infinity,
    },
  );

  useEffect(() => {
    if (mvSt) {
      setState(
        produce((draft) => {
          draft.allocations = mvSt.allocations;
          draft.structure = mvSt.structure;
        }),
      );
    }
  }, [mvSt]);

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
