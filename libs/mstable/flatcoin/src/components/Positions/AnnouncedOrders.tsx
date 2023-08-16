import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl } from '@frontend/shared-utils';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useEthTransactionPriceData } from '../../hooks';
import { useFlatcoin } from '../../state';
import { getFlatcoinDelayedOrderContract } from '../../utils';

import type { FC } from 'react';

import type { Order } from '../../types';

const useAnnouncedOrders = (order: Order | null) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
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

  const {
    data: executeOrderData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    request: {
      ...config?.request,
      gasLimit: config?.request?.gasLimit?.mul(150).div(100), // TODO: think how to move this logic into separate function and reuse in other palces
    },
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Execute Order',
          id: 'sjr65W',
        }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });

  const { isSuccess: isWaitSuccess, isLoading: isWaitLoading } =
    useWaitForTransaction({
      hash: executeOrderData?.hash,
      onSuccess: ({ transactionHash }) => {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction Confirmed',
            id: 'rgdwQX',
          }),
          content: (
            <ViewEtherscanLink
              hash={transactionHash}
              blockExplorer={getBlockExplorerUrl(chain)}
            />
          ),
          severity: 'success',
        });
      },
      onError: () => {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction Error',
            id: 'p8bsw4',
          }),
          content: (
            <ViewEtherscanLink
              hash={executeOrderData?.hash}
              blockExplorer={getBlockExplorerUrl(chain)}
            />
          ),
          severity: 'error',
        });
      },
    });

  return {
    intl,
    write,
    isError,
    isEstimating,
    isWriteLoading,
    isWriteSuccess,
    isWaitSuccess,
    isWaitLoading,
    hasOrderExpired,
    orderExpirationDate,
  };
};

export const AnnouncedOrders: FC = () => {
  const { announcedOrder } = useFlatcoin();
  const {
    intl,
    write,
    isError,
    isEstimating,
    isWriteLoading,
    isWriteSuccess,
    isWaitSuccess,
    isWaitLoading,
    hasOrderExpired,
    orderExpirationDate,
  } = useAnnouncedOrders(announcedOrder);

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
        {isWriteLoading ? (
          <Button sx={{ minWidth: 92 }} disabled>
            {intl.formatMessage({
              defaultMessage: 'Sign Transaction',
              id: 'w1LBDB',
            })}
          </Button>
        ) : isWriteSuccess && !isWaitSuccess && isWaitLoading ? (
          <Button sx={{ minWidth: 92 }} disabled>
            <CircularProgress size={20} />
          </Button>
        ) : (
          <Button
            sx={{ minWidth: 92 }}
            onClick={write}
            disabled={isError || isEstimating}
          >
            {intl.formatMessage({ defaultMessage: 'Execute', id: 'd21Els' })}
          </Button>
        )}
      </div>
    </>
  );
};
