import { useEffect } from 'react';

import { useSettings } from '@frontend/mstable-settings';
import { usePushNotification } from '@frontend/shared-notifications';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useOperations, useSetIsSubmitLoading } from '../../../hooks';
import { useMetavault } from '../../../state';

import type { ButtonProps } from '@mui/material';

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

  const { config: approveConfig, refetch: fetchApprovalConfig } =
    usePrepareContractWrite({
      addressOrName: asset,
      contractInterface: erc20ABI,
      functionName: 'approve',
      args: [address, constants.MaxUint256],
      enabled: false,
    });
  const {
    data: approveData,
    write: approve,
    isLoading: isApproveLoading,
    isSuccess: isApproveStarted,
  } = useContractWrite({
    ...approveConfig,
    onError: () => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Cancelled' }),
        severity: 'info',
      });
      setIsSubmitLoading(false);
    },
  });
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled: (data, error) => {
      pushNotification({
        title: error
          ? intl.formatMessage({ defaultMessage: 'Transaction Error' })
          : intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
        content: (
          <ViewEtherscanLink
            hash={error ? approveData?.hash : data?.transactionHash}
            blockExplorer={chain?.blockExplorers?.etherscan}
          />
        ),
        severity: error ? 'error' : 'success',
      });
      setIsSubmitLoading(false);
    },
  });

  useEffect(() => {
    if (!!asset && needsApproval) {
      fetchApprovalConfig();
    }
  }, [asset, fetchApprovalConfig, needsApproval]);

  useEffect(() => {
    if (isApproveStarted && !isApproveSuccess) {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Approving Token' }),
        content: (
          <ViewEtherscanLink
            hash={approveData?.hash}
            blockExplorer={chain?.blockExplorers?.etherscan}
          />
        ),
        severity: 'info',
      });
    }
  }, [
    approveData?.hash,
    chain?.blockExplorers?.etherscan,
    exactApproval,
    intl,
    isApproveStarted,
    isApproveSuccess,
    pushNotification,
  ]);

  const handleApprove = () => {
    if (exactApproval) {
      approve({
        recklesslySetUnpreparedArgs: [address, amount.exact],
      });
    } else {
      approve();
    }
    setIsSubmitLoading(true);
  };

  return (
    <Button
      {...props}
      onClick={handleApprove}
      disabled={isApproveLoading || isApproveStarted}
      size="large"
    >
      {isApproveLoading ? (
        intl.formatMessage({ defaultMessage: 'Waiting for approval' })
      ) : isApproveStarted && !isApproveSuccess ? (
        <CircularProgress size={20} />
      ) : (
        intl.formatMessage({ defaultMessage: 'Approve' })
      )}
    </Button>
  );
};
