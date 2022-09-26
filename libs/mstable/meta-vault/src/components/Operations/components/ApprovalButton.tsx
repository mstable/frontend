import { useEffect } from 'react';

import { useSettings } from '@frontend/mstable-settings';
import { usePushNotification } from '@frontend/shared-notifications';
import { Button, CircularProgress, Link } from '@mui/material';
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
import { useOperations } from '../hooks';

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
  } = useContractWrite(approveConfig);
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
        content: (
          <Link
            href={`${
              chain?.blockExplorers?.etherscan?.url ??
              etherscanBlockExplorers.mainnet.url
            }/tx/${data?.transactionHash}`}
            target="_blank"
          >
            {intl.formatMessage(
              {
                defaultMessage: 'View on {name}',
              },
              { name: chain?.blockExplorers?.etherscan?.name ?? 'Etherscan' },
            )}
          </Link>
        ),
        severity: 'success',
      });
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
        title: intl.formatMessage(
          { defaultMessage: 'Approving Token{exact}' },
          { exact: exactApproval ? ' - exact' : '' },
        ),
        content: (
          <Link
            href={`${
              chain?.blockExplorers?.etherscan?.url ??
              etherscanBlockExplorers.mainnet.url
            }/tx/${approveData?.hash}`}
            target="_blank"
          >
            {intl.formatMessage(
              {
                defaultMessage: 'View on {name}',
              },
              { name: chain?.blockExplorers?.etherscan?.name ?? 'Etherscan' },
            )}
          </Link>
        ),
        severity: 'info',
      });
    }
  }, [
    approveData?.hash,
    chain?.blockExplorers?.etherscan?.name,
    chain?.blockExplorers?.etherscan?.url,
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
