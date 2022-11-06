import { useCallback } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { axiosInstance } from '@frontend/shared-data-access';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { prop } from 'ramda';
import { chainId, useNetwork } from 'wagmi';

import { useTrackedState, useUpdate } from './state';

import type { HexAddress } from '@frontend/shared-utils';

import type { SupportedCurrency } from './types';

export const usePrices = () => useTrackedState();

export const useSetPrice = () => {
  const update = useUpdate();

  return useCallback(
    (price: number) => {
      update(
        produce((state) => {
          state.price = price;
        }),
      );
    },
    [update],
  );
};

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

export const useGetPrices = (addresses: HexAddress[]) => {
  const { currency } = useTrackedState();
  const { chain } = useNetwork();

  return useQuery({
    queryKey: [
      'getTokenPrice',
      coingeckoCoinIds[chain?.id ?? chainId.mainnet],
      addresses ?? [],
      currency,
    ],
    queryFn: () =>
      axiosInstance.get(
        `${coingeckoEndpoint}/simple/token_price/${
          coingeckoCoinIds[chain?.id ?? chainId.mainnet]
        }?contract_addresses=${(addresses ?? []).join(
          ',',
        )}&vs_currencies=${currency}`,
      ),
    select: prop('data'),
  });
};
