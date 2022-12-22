/* eslint-disable no-empty */
import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/mstable-shared-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Curve3CrvBasicMetaVaultABI,
  ERC20ABI,
  PeriodicAllocationPerfFeeMetaVaultABI,
} from '@mstable/metavaults-web';
import { useQuery } from '@tanstack/react-query';
import { getContract } from '@wagmi/core';
import { BigNumber, constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import {
  erc4626ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useProvider,
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
  asset: HexAddress | null;
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
  const { address: walletAddress, isConnected } = useAccount();
  const provider = useProvider();
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
    asset: null,
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
    asset,
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

  useContractRead({
    address,
    abi: erc4626ABI,
    functionName: 'asset',
    enabled: !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.asset = data as HexAddress;
        }),
      );
    },
  });

  const { refetch: fetchMvToken } = useToken({
    address,
    enabled: false,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvToken = data;
        }),
      );
    },
  });

  const { refetch: fetchAssetToken } = useToken({
    address: asset,
    enabled: false,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetToken = data;
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
    token: asset,
    watch: true,
    enabled: !!walletAddress && !!asset,
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
    ['structure', address],
    async () => {
      const proxiedVault = (await getContract({
        address,
        abi: Curve3CrvBasicMetaVaultABI,
        signerOrProvider: provider,
      }).metaVault()) as HexAddress;

      const [uvIdx, asset, shareDecimals, proxiedName] = await Promise.all([
        getContract({
          address: proxiedVault,
          abi: PeriodicAllocationPerfFeeMetaVaultABI,
          signerOrProvider: provider,
        }).totalUnderlyingVaults(),
        getContract({
          address: proxiedVault,
          abi: PeriodicAllocationPerfFeeMetaVaultABI,
          signerOrProvider: provider,
        }).asset(),
        getContract({
          address: proxiedVault,
          abi: PeriodicAllocationPerfFeeMetaVaultABI,
          signerOrProvider: provider,
        }).decimals(),
        getContract({
          address: proxiedVault,
          abi: PeriodicAllocationPerfFeeMetaVaultABI,
          signerOrProvider: provider,
        }).name(),
      ]);

      const assetDecimals = await getContract({
        address: asset,
        abi: ERC20ABI,
        signerOrProvider: provider,
      }).decimals();

      const uvs = [];
      let indexes = 0;
      try {
        indexes = BigNumber.from(uvIdx).toNumber();
      } catch {}

      for (let i = 0; i < indexes; i++) {
        try {
          const address = await getContract({
            address: proxiedVault,
            abi: PeriodicAllocationPerfFeeMetaVaultABI,
            signerOrProvider: provider,
          }).resolveVaultIndex(i);
          uvs.push(address);
        } catch {}
      }

      const bals = await Promise.all(
        uvs.map((v) =>
          getContract({
            address: v,
            abi: ERC20ABI,
            signerOrProvider: provider,
          }).balanceOf(proxiedVault),
        ),
      );
      const decimals = await Promise.all(
        uvs.map((v) =>
          getContract({
            address: v,
            abi: ERC20ABI,
            signerOrProvider: provider,
          }).decimals(),
        ),
      );
      const names = await Promise.all(
        uvs.map((v) =>
          getContract({
            address: v,
            abi: ERC20ABI,
            signerOrProvider: provider,
          }).name(),
        ),
      );
      const converted = await Promise.all(
        uvs.map((v, i) =>
          getContract({
            address: v,
            abi: erc4626ABI,
            signerOrProvider: provider,
          }).convertToAssets(bals[i]),
        ),
      );
      const unallocated = await getContract({
        address: asset,
        abi: erc4626ABI,
        signerOrProvider: provider,
      }).balanceOf(proxiedVault);

      return {
        structure: {
          proxiedVault: {
            address: proxiedVault,
            decimals: shareDecimals,
            name: proxiedName,
          },
          underlyingVaults: uvs.map((v, i) => ({
            address: v,
            name: names[i],
            decimals: decimals[i],
          })),
        },
        allocations: [
          {
            name: 'Unallocated',
            balance: new BigDecimal(unallocated, assetDecimals).simple,
          },
          ...uvs.reduce(
            (acc, curr, i) => [
              ...acc,
              {
                address: curr,
                name: names[i],
                balance: new BigDecimal(converted[i], decimals[i]).simple,
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
            draft.allocations = data.allocations;
            draft.structure = data.structure;
          }),
        );
      },
    },
  );

  useEffect(() => {
    if (address) {
      fetchMvToken();
    }
  }, [address, fetchMvToken]);

  useEffect(() => {
    if (asset) {
      fetchAssetToken();
    }
  }, [asset, fetchAssetToken]);

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
