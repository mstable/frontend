import { useMemo } from 'react';

import { axiosInstance } from '@frontend/shared-data-access';
import { usePushNotification } from '@frontend/shared-notifications';
import { useQuery } from '@tanstack/react-query';
import { path } from 'ramda';
import { useIntl } from 'react-intl';
import { chainId, useBlockNumber, useNetwork } from 'wagmi';

import { usePrices, useSetPrice } from '../hooks';
import { Provider } from '../state';

import type { Children } from '@frontend/shared-utils';

const coingeckoEndpoint = 'https://api.coingecko.com/api/v3';

const PricesWrapped = ({ children }: Children) => {
  const intl = useIntl();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { currency } = usePrices();
  const setPrice = useSetPrice();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();

  const coingeckoCoinId = useMemo(
    () =>
      ({ [chainId.polygon]: 'matic-network', [chainId.mainnet]: 'ethereum' }[
        chain?.id
      ] || 'ethereum'),
    [chain?.id],
  );
  useQuery(
    ['prices', blockNumber, currency, chain?.id],
    () =>
      axiosInstance.get(
        `${coingeckoEndpoint}/simple/price?ids=${coingeckoCoinId}&vs_currencies=${currency}`,
      ),
    {
      staleTime: 0,
      cacheTime: 0,
      onError: (err: Error) => {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Error fetching prices',
          }),
          message: err?.message,
        });
      },
      onSuccess: (data) => {
        setPrice(parseFloat(path(['data', coingeckoCoinId, currency], data)));
      },
    },
  );

  return <>{children}</>;
};

export const PricesProvider = (props: Children) => (
  <Provider>
    <PricesWrapped {...props} />
  </Provider>
);
