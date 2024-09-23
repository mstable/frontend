import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import {
  mainnet,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { l1ComptrollerContract } from '../../../../../constants';
import { useNeedsApproval } from '../../../../../hooks/useNeedsApproval';
import { useTrackedState } from '../../../state';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
  fullWidth: true,
};

export const ApprovalButton = (props: ButtonProps) => {
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { l1token, isError, refetch } = useTrackedState();
  const needsApproval = useNeedsApproval();

  const { config } = usePrepareContractWrite({
    address: l1token.contract.address,
    abi: l1token.contract.abi,
    functionName: 'approve',
    args: [l1ComptrollerContract.address, l1token.balance.exact],
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
        title: 'Approving Token',
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
        title: 'Transaction Cancelled',
        severity: 'info',
      });
    },
  });
  const { isSuccess: isWaitSuccess, isLoading: isWaitLoading } =
    useWaitForTransaction({
      hash: approveData?.hash,
      onSuccess: ({ transactionHash }) => {
        pushNotification({
          title: 'Transaction Confirmed',
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
          title: 'Transaction Error',
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
        Approve
      </Button>
    );
  }

  if (isError) {
    return (
      <Button {...buttonProps} disabled>
        Insufficient balance
      </Button>
    );
  }

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        Sign Transaction
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
      Approve
    </Button>
  );
};
