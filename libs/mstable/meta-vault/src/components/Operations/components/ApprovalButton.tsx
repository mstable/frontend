import { useMemo } from 'react';

import { useSettings } from '@frontend/mstable-settings';
import { usePushNotification } from '@frontend/shared-notifications';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  etherscanBlockExplorers,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetavault } from '../../../state';
import { useOperations, useSetIsSubmitLoading } from '../hooks';

import type { HexAddress } from '@frontend/shared-utils';
import type { ButtonProps } from '@mui/material';
import type { BigNumber } from 'ethers';

const buttonProps: ButtonProps = {
  size: 'large',
};

export const ApprovalButton = (props: ButtonProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { exactApproval } = useSettings();
  const {
    metavault: { address },
    asset,
  } = useMetavault();
  const { amount, needsApproval } = useOperations();
  const setIsSubmitLoading = useSetIsSubmitLoading();

  const args = useMemo<[HexAddress, BigNumber]>(
    () => [address, exactApproval ? amount?.exact : constants.MaxUint256],
    [address, amount?.exact, exactApproval],
  );

  const { config } = usePrepareContractWrite({
    address: asset,
    abi: erc20ABI,
    functionName: 'approve',
    args,
    enabled: !!asset && needsApproval,
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
        title: intl.formatMessage({ defaultMessage: 'Approving Token' }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={
              chain?.blockExplorers?.etherscan ??
              etherscanBlockExplorers.mainnet
            }
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      setIsSubmitLoading(false);
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Cancelled' }),
        severity: 'info',
      });
    },
  });
  const { isSuccess: isWaitSuccess, isLoading: isWaitLoading } =
    useWaitForTransaction({
      hash: approveData?.hash,
      onSettled: (data, error) => {
        setIsSubmitLoading(false);
        pushNotification({
          title: error
            ? intl.formatMessage({ defaultMessage: 'Transaction Error' })
            : intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
          content: (
            <ViewEtherscanLink
              hash={error ? approveData?.hash : data?.transactionHash}
              blockExplorer={
                chain?.blockExplorers?.etherscan ??
                etherscanBlockExplorers.mainnet
              }
            />
          ),
          severity: error ? 'error' : 'success',
        });
      },
    });

  const approve = () => {
    write();
    setIsSubmitLoading(true);
  };

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        {intl.formatMessage({ defaultMessage: 'Sign Transaction' })}
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
    <Button {...buttonProps} {...props} onClick={approve}>
      {intl.formatMessage({ defaultMessage: 'Approve' })}
    </Button>
  );
};
