import { usePushNotification } from '@frontend/shared-providers';
import { ApproveButton, ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl, isEqualAddresses } from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState } from '../state';

const useApprovalButton = () => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  const {
    flatcoinChainId,
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const {
    sendToken,
    needsApproval,

    refetch,
    isInsufficientBalance,
  } = useFlatcoinTradingState();
  const tokenToBeApproved = isEqualAddresses(
    sendToken.address,
    collateral.address,
  )
    ? collateral
    : flatcoin;

  const { config } = usePrepareContractWrite({
    address: tokenToBeApproved.address,
    abi: tokenToBeApproved.abi,
    functionName: 'approve',
    args: [
      getFlatcoinDelayedOrderContract(flatcoinChainId)?.address,
      sendToken.value, // TODO: check logic
    ],
    chainId: chain?.id,
    enabled: needsApproval && !isInsufficientBalance,
  });

  const {
    data: approveData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Approving Token',
          id: '/54G9d',
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
      hash: approveData?.hash,
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
              hash={approveData?.hash}
              blockExplorer={getBlockExplorerUrl(chain)}
            />
          ),
          severity: 'error',
        });
      },
      onSettled: refetch,
    });

  return {
    intl,
    write,
    sendToken,
    isWriteLoading,
    isWriteSuccess,
    isWaitSuccess,
    isWaitLoading,
  };
};

export const StableApprovalButton = () => {
  const {
    intl,
    sendToken,
    isWriteLoading,
    isWriteSuccess,
    isWaitSuccess,
    isWaitLoading,
    write,
  } = useApprovalButton();

  if (isWriteLoading) {
    return (
      <Button disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isWaitSuccess && isWaitLoading) {
    return (
      <Button disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return <ApproveButton symbol={sendToken.symbol} onApprove={write} />;
};
