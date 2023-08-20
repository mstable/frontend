import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, usePrepareContractWrite } from 'wagmi';

import { useEthTransactionPriceData } from '../../hooks';
import { useFlatcoin } from '../../state';
import { getFlatcoinDelayedOrderContract } from '../../utils';

import type { FC } from 'react';

import type { Order } from '../../types';

const useAnnouncedOrders = (order: Order | null) => {
  const { address: walletAddress } = useAccount();
  const { flatcoinChainId } = useFlatcoin();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);
  const priceData = useEthTransactionPriceData();
  const orderExpirationDate = order
    ? (+order.executableAtTime -
        +order.minExecutabilityAge +
        +order.maxExecutabilityAge) *
      1000
    : null;
  const hasOrderExpired = orderExpirationDate
    ? orderExpirationDate < Date.now()
    : true;
  const {
    config,
    isError,
    isLoading: isEstimating,
  } = usePrepareContractWrite({
    address: delayedOrderContract.address,
    abi: delayedOrderContract.abi,
    functionName: 'executeOrder',
    args: [walletAddress, priceData],
    chainId: flatcoinChainId,
    enabled:
      !!priceData &&
      !!order &&
      !hasOrderExpired &&
      Date.now() > +order.executableAtTime * 1000,
    overrides: {
      value: '1', // the Pyth oracle will take 1 WEI of ETH to make the price update
    },
  });

  return {
    isError,
    config,
    hasOrderExpired,
    orderExpirationDate,
  };
};

export const AnnouncedOrders: FC = () => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { announcedOrder } = useFlatcoin();
  const { isError, config, hasOrderExpired, orderExpirationDate } =
    useAnnouncedOrders(announcedOrder);

  if (!announcedOrder || hasOrderExpired) return null;

  return (
    <>
      <Typography variant="h3" py={2}>
        {intl.formatMessage({
          defaultMessage: 'Announced Orders',
          id: 'LGv1C5',
        })}
      </Typography>
      <div>
        Type:
        <p>{announcedOrder.type}</p>
        Keeper Fee:
        <p>{announcedOrder.keeperFee}</p>
        Executable At:
        <p>{new Date(+announcedOrder.executableAtTime * 1000).toString()}</p>
        Order Expires At:
        <p>{new Date(orderExpirationDate).toString()}</p>
        <TransactionActionButton
          config={config}
          pushNotification={pushNotification}
          isError={isError}
          transactionName={intl.formatMessage({
            defaultMessage: 'Execute Order',
            id: 'sjr65W',
          })}
          actionName={intl.formatMessage({
            defaultMessage: 'Execute',
            id: 'd21Els',
          })}
          sx={{ minWidth: 92 }}
        />
      </div>
    </>
  );
};
