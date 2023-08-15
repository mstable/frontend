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

const useAnnouncedOrder = (executableAtTime?: string) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();
  const { flatcoinChainId } = useFlatcoin();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);
  const priceData = useEthTransactionPriceData();

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
      !!priceData && executableAtTime && Date.now() > +executableAtTime * 1000,
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
  };
};

export const AnnouncedOrder: FC = () => {
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
  } = useAnnouncedOrder(announcedOrder?.executableAtTime);

  if (!announcedOrder) return null;

  return (
    <>
      <Typography variant="h3" py={2}>
        {intl.formatMessage({
          defaultMessage: 'Announced Orders',
          id: 'LGv1C5',
        })}
      </Typography>
      <div key={announcedOrder.type}>
        {announcedOrder.type}
        <p>{announcedOrder.keeperFee}</p>
        <p>{new Date(+announcedOrder.executableAtTime * 1000).toString()}</p>
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
