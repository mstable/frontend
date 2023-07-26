/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { isDev } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { pathOr, prop } from 'ramda';
import axios from 'redaxios';
import { mainnet, useNetwork } from 'wagmi';

import { usePrices, useUpdate } from './state';

import type { HexAddress } from '@frontend/shared-utils';
import type { UseQueryOptions } from '@tanstack/react-query';

import type {
  SupportedCurrency,
  UseTokenPriceHistoryRequest,
  UseTokenPriceHistoryResponse,
} from './types';

export const useSetCurrency = () => {
  const update = useUpdate();

  return useCallback(
    (currency: SupportedCurrency) => {
      update(
        produce((state) => {
          state.currency = currency;
          state.symbol = currency === 'USD' ? '$' : '€';
        }),
      );
    },
    [update],
  );
};

export const useGetNativePrice = (
  chainId?: number,
  options?: UseQueryOptions,
) => {
  const { chain } = useNetwork();
  const { currency } = usePrices();

  const ch = chainId ?? chain?.id ?? mainnet.id;
  const coinId = coingeckoCoinIds[ch];

  return useQuery<any, Error, number>({
    ...options,
    queryKey: ['getNativePrice', coinId, currency],
    initialData: 0,
    queryFn: ({ queryKey }) =>
      axios.get(
        `${coingeckoEndpoint}/simple/price?ids=${queryKey[1]}&vs_currencies=${queryKey[2]}`,
      ),
    select: pathOr(0, ['data', coinId, currency.toLowerCase()]),
    ...(isDev
      ? {
          cacheTime: Infinity,
        }
      : {
          refetchInterval: 30e3,
        }),
  });
};

export const useGetPrices = (
  addresses: HexAddress[],
  chainId?: number,
  options?: UseQueryOptions,
) => {
  const { chain } = useNetwork();
  const { currency } = usePrices();

  const ch = chainId ?? chain?.id ?? mainnet.id;
  const coinId = coingeckoCoinIds[ch];

  return useQuery<
    any,
    Error,
    Record<string, number>,
    [string, string, HexAddress[], string]
  >({
    ...options,
    queryKey: ['getTokenPrice', coinId, addresses, currency],
    queryFn: ({ queryKey }) =>
      axios.get(
        `${coingeckoEndpoint}/simple/token_price/${
          queryKey[1]
        }?contract_addresses=${(queryKey[2] ?? []).join(',')}&vs_currencies=${
          queryKey[3]
        }`,
      ),
    select: prop('data'),
    ...(isDev
      ? {
          cacheTime: Infinity,
        }
      : {
          refetchInterval: 30e3,
        }),
  });
};

export const useGetTokenPriceHistory = (
  { tokenId, from, to }: UseTokenPriceHistoryRequest,
  options?: Omit<
    UseQueryOptions<
      UseTokenPriceHistoryResponse,
      Error,
      UseTokenPriceHistoryResponse,
      [
        string,
        UseTokenPriceHistoryRequest['tokenId'],
        UseTokenPriceHistoryRequest['from'],
        UseTokenPriceHistoryRequest['to'],
      ]
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    ...options,
    queryKey: ['coins/:tokenId/market_chart/range', tokenId, from, to],
    queryFn: ({ queryKey }) =>
      axios
        .get(`${coingeckoEndpoint}/coins/${tokenId}/market_chart/range`, {
          params: { vs_currency: 'usd', from, to },
        })
        .then(pathOr([], ['data', 'prices'])),
  });
