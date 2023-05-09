import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  mainnet,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { l1Comptroller, l2Comptroller } from '../../../../../constants';
import { useTrackedState } from '../../../state';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
  fullWidth: true,
};

export const ApprovalButton = (props: ButtonProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { mta, needsApproval, isError, refetch } = useTrackedState();

  const { config } = usePrepareContractWrite({
    address: mta.contract.address,
    abi: mta.contract.abi,
    functionName: 'approve',
    args: [
      chain?.id === mainnet.id ? l1Comptroller.address : l2Comptroller.address,
      mta.balance.exact,
    ],
    chainId: chain?.id,
    enabled: needsApproval,
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
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              mainnet.blockExplorers.default
            }
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
              blockExplorer={
                chain?.blockExplorers?.['etherscan'] ??
                mainnet.blockExplorers.default
              }
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
              blockExplorer={
                chain?.blockExplorers?.['etherscan'] ??
                mainnet.blockExplorers.default
              }
            />
          ),
          severity: 'error',
        });
      },
      onSettled: refetch,
    });

  if (!chain?.id) {
    return (
      <Button {...buttonProps} {...props} disabled>
        {intl.formatMessage({ defaultMessage: 'Approve', id: 'WCaf5C' })}
      </Button>
    );
  }

  if (isError) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Insufficient balance',
          id: 'kaPKOB',
        })}
      </Button>
    );
  }

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isWaitSuccess && isWaitLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button {...buttonProps} {...props} onClick={write}>
      {intl.formatMessage({ defaultMessage: 'Approve', id: 'WCaf5C' })}
    </Button>
  );
};
