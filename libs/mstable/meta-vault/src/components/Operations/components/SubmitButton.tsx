import { useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-notifications';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import { Button, CircularProgress, Link, Stack } from '@mui/material';
import { ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';
import {
  etherscanBlockExplorers,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetaVault } from '../../../hooks';
import { useOperationLabel, useOperations } from '../hooks';

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
  const { address: walletAddress } = useAccount();
  const { address } = useMetaVault();
  const { amount, token, operation, needsApproval } = useOperations();
  const operationLabel = useOperationLabel();

  const args = useMemo(
    () =>
      ({
        deposit: [amount?.exact, walletAddress],
        mint: [amount?.exact, walletAddress],
        withdraw: [amount?.exact, walletAddress, walletAddress],
        redeem: [amount?.exact, walletAddress, walletAddress],
      }[operation] || []),
    [amount?.exact, operation, walletAddress],
  );

  const { config: submitConfig } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName: operation,
    args,
    enabled: !!amount?.exact && !!walletAddress,
  });
  const {
    data: submitData,
    write: submit,
    isLoading: isSubmitLoading,
    isSuccess: isSubmitStarted,
  } = useContractWrite(submitConfig);
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
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

  if (!walletAddress) {
    return (
      <OpenAccountModalButton variant="contained" color="primary" fullWidth />
    );
  }

  if (!amount || needsApproval) {
    return (
      <Button {...buttonProps} disabled>
        {operationLabel}
        <ArrowRight weight="bold" />
      </Button>
    );
  }

  if (isSubmitLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
      </Button>
    );
  }

  if (isSubmitStarted && !isSubmitSuccess) {
    return (
      <Button {...buttonProps} disabled>
        <CircularProgress />
      </Button>
    );
  }

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        submit();
      }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ...buttonProps?.sx,
      }}
    >
      {amount && <span>{`${amount?.format()} ${token?.symbol}`}</span>}
      <Stack direction="row" alignItems="center">
        {operationLabel}
        <ArrowRight weight="bold" />
      </Stack>
    </Button>
  );
};
