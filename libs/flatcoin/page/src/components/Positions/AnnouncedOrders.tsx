import { DEFAULT_TOKEN_DECIMALS } from '@frontend/flatcoin-constants';
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

const SHOW_ORDER_DELAY = 25000; // give 10 seconds for keeper to execute an order

const useAnnouncedOrders = (order: Order | null) => {
  const { address: walletAddress } = useAccount();
  const { flatcoinChainId, tokens, keeperFee } = useFlatcoin();
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
  const canOrderBeExecuted = order
    ? Date.now() > +order.executableAtTime * 1000 + SHOW_ORDER_DELAY
    : false;
  const { config, error } = usePrepareContractWrite({
    address: delayedOrderContract.address,
    abi: delayedOrderContract.abi,
    functionName: 'executeOrder',
    args: [walletAddress, priceData],
    chainId: flatcoinChainId,
    enabled: !!priceData && !!order && !hasOrderExpired && canOrderBeExecuted,
    overrides: {
      value: '1', // the Pyth oracle will take 1 WEI of ETH to make the price update
    },
  });
  const keeperFeeUsd = keeperFee.simple * tokens.collateral.price.simple;

  return {
    error,
    config,
    hasOrderExpired,
    canOrderBeExecuted,
    orderExpirationDate: new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
    }).format(new Date(orderExpirationDate)),
    feeSymbol: tokens.collateral.symbol,
    keeperFeeUsd,
  };
};

export const AnnouncedOrders: FC<CardProps> = (props) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { announcedOrder } = useFlatcoin();
  const {
    error,
    config,
    hasOrderExpired,
    canOrderBeExecuted,
    orderExpirationDate,
    feeSymbol,
    keeperFeeUsd,
  } = useAnnouncedOrders(announcedOrder);

  if (!announcedOrder || hasOrderExpired || !canOrderBeExecuted) return null;

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
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
            }).format(announcedOrder.keeperFee.simple)}{' '}
            (
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(keeperFeeUsd)}
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
          error={error}
          transactionName={intl.formatMessage({
            defaultMessage: 'Execute Order',
            id: 'sjr65W',
          })}
          actionName={intl.formatMessage({
            defaultMessage: 'Execute',
            id: 'd21Els',
          })}
          components={{
            buttonContainer: {
              sx: {
                minWidth: 92,
                width: '100%',
              },
            },
          }}
        />
      </CardActions>
    </Card>
  );
};
