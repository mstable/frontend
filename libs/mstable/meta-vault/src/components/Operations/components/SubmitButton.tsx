import { usePushNotification } from '@frontend/shared-notifications';
import { Button, Link, Stack } from '@mui/material';
import { ArrowRight, Infinity } from 'phosphor-react';
import { useIntl } from 'react-intl';
import {
  etherscanBlockExplorers,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetaVault } from '../../../hooks';
import {
  useApprovalConfig,
  useNeedApproval,
  useOperationConfig,
  useOperations,
} from '../hooks';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
  sx: {
    display: 'flex',
    flexDirection: 'row',
    svg: {
      ml: 0.75,
    },
  },
};

export const SubmitButton = () => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { address } = useMetaVault();
  const { amount, token } = useOperations();
  const needApproval = useNeedApproval();

  const { config: approveConfig } = useApprovalConfig();
  const {
    data: approveData,
    write: approve,
    isLoading: isApproveLoading,
    isSuccess: isApproveStarted,
  } = useContractWrite(approveConfig);
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess: (data) => {
      prepareDeposit();
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Token approved' }),
        content: (
          <Link
            href={`${etherscanBlockExplorers.goerli.url}/tx/${data?.transactionHash}`}
            target="_blank"
          >
            {intl.formatMessage({
              defaultMessage: 'View your transaction on etherscan',
            })}
          </Link>
        ),
        severity: 'success',
      });
    },
  });

  const { config: depositConfig, refetch: prepareDeposit } =
    useOperationConfig();
  const {
    data: depositData,
    write: deposit,
    isLoading: isDepositLoading,
    isSuccess: isDepositStarted,
  } = useContractWrite(depositConfig);
  const { isSuccess: isDepositSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Deposit completed' }),
        content: (
          <Link
            href={`${etherscanBlockExplorers.goerli.url}/tx/${data?.transactionHash}`}
            target="_blank"
          >
            {intl.formatMessage({
              defaultMessage: 'View your transaction on etherscan',
            })}
          </Link>
        ),
        severity: 'success',
      });
    },
  });

  if (!address) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Connect your wallet to deposit',
        })}
      </Button>
    );
  }

  if (!amount) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Deposit' })}
        <ArrowRight weight="bold" />
      </Button>
    );
  }

  if (isApproveLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
      </Button>
    );
  }

  if (isApproveStarted && !isApproveSuccess) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Approving' })}
      </Button>
    );
  }

  if (needApproval) {
    return (
      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          {...buttonProps}
          onClick={() => {
            approve({
              recklesslySetUnpreparedArgs: [address, amount.exact],
            });
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Approve exact' })}
        </Button>
        <Button
          fullWidth
          {...buttonProps}
          onClick={() => {
            approve();
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Approve' })}
          <Infinity fontWeight="bold" />
        </Button>
      </Stack>
    );
  }

  if (isDepositLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
      </Button>
    );
  }

  if (isDepositStarted && !isDepositSuccess) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Depositing' })}
      </Button>
    );
  }

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        deposit();
      }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ...buttonProps?.sx,
      }}
    >
      {amount && <span>{`${amount?.format()} ${token?.symbol}`}</span>}
      <Stack direction="row" alignItems="center">
        {intl.formatMessage({ defaultMessage: 'Deposit' })}
        <ArrowRight weight="bold" />
      </Stack>
    </Button>
  );
};
