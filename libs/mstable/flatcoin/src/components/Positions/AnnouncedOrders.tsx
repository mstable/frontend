import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, usePrepareContractWrite } from 'wagmi';

import { useEthTransactionPriceData } from '../../hooks';
import { useFlatcoin } from '../../state';
import { getFlatcoinDelayedOrderContract, getOrderTypeName } from '../../utils';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

import type { Order } from '../../types';

const useAnnouncedOrders = (order: Order | null) => {
  const { address: walletAddress } = useAccount();
  const { flatcoinChainId, tokens } = useFlatcoin();
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
  const { config, isError } = usePrepareContractWrite({
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
    orderExpirationDate: new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
    }).format(new Date(orderExpirationDate)),
    feeSymbol: tokens.collateral.symbol,
  };
};

export const AnnouncedOrders: FC<CardProps> = (props) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { announcedOrder } = useFlatcoin();
  const { isError, config, hasOrderExpired, orderExpirationDate, feeSymbol } =
    useAnnouncedOrders(announcedOrder);

  if (!announcedOrder || hasOrderExpired) return null;

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="column">
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Announced Orders',
              id: 'LGv1C5',
            })}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Type',
              id: '+U6ozc',
            })}
            :
          </Typography>
          <Typography variant="value3" color="text.secondary" mb={2}>
            {getOrderTypeName(announcedOrder.type)}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Keeper fee',
              id: 'dlRkGS',
            })}
            , {feeSymbol}:
          </Typography>
          <Typography variant="value3" color="text.secondary" mb={2}>
            {new Intl.NumberFormat('en-US').format(+announcedOrder.keeperFee)} (
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(+announcedOrder.keeperFeeUsd)}
            )
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Executable at',
              id: 'tw0ig8',
            })}
            :
          </Typography>
          <Typography variant="value3" color="text.secondary" mb={2}>
            {new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(
              new Date(+announcedOrder.executableAtTime * 1000),
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Order expires at',
              id: 'ImPhdW',
            })}
            :
          </Typography>
          <Typography variant="value3" color="text.secondary" mb={2}>
            {orderExpirationDate}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
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
          sx={{ minWidth: 92, width: '100%' }}
        />
      </CardActions>
    </Card>
  );
};
