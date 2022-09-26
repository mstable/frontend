import { useEffect, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-notifications';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import { Button, CircularProgress, Link } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  etherscanBlockExplorers,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetavault } from '../../../state';
import { useOperations, useReset } from '../hooks';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
};

export const SubmitButton = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { address: walletAddress } = useAccount();
  const {
    metavault: { address },
  } = useMetavault();
  const { amount, operation, needsApproval, isError, tab, token } =
    useOperations();
  const reset = useReset();

  const operationLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Deposit' })
        : intl.formatMessage({ defaultMessage: 'Withdraw' }),
    [intl, tab],
  );

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

  const { config: submitConfig, refetch: fetchSubmitConfig } =
    usePrepareContractWrite({
      addressOrName: address,
      contractInterface: erc4626ABI,
      functionName: operation,
      args,
      enabled: false,
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
      reset();
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
    if (!!amount?.exact && !!walletAddress && !needsApproval) {
      fetchSubmitConfig();
    }
  }, [amount?.exact, fetchSubmitConfig, needsApproval, walletAddress]);

  useEffect(() => {
    if (isSubmitStarted && !isSubmitSuccess) {
      pushNotification({
        title: intl.formatMessage(
          { defaultMessage: '{operation}ing {currency}' },
          {
            operation: operationLabel,
            currency: token?.symbol,
          },
        ),
        content: (
          <Link
            href={`${
              chain?.blockExplorers?.etherscan?.url ??
              etherscanBlockExplorers.mainnet.url
            }/tx/${submitData?.hash}`}
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
    chain?.blockExplorers?.etherscan?.name,
    chain?.blockExplorers?.etherscan?.url,
    intl,
    isSubmitStarted,
    isSubmitSuccess,
    operationLabel,
    pushNotification,
    submitData?.hash,
    token?.symbol,
  ]);

  const handleSubmit = () => {
    submit();
  };

  if (!walletAddress) {
    return (
      <OpenAccountModalButton variant="contained" color="primary" fullWidth />
    );
  }

  if (!amount || needsApproval) {
    return (
      <Button {...buttonProps} disabled>
        {operationLabel}
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
        <CircularProgress size={20} />
      </Button>
    );
  }

  if (isError) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Insufficient balance' })}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} onClick={handleSubmit}>
      {operationLabel}
    </Button>
  );
};
