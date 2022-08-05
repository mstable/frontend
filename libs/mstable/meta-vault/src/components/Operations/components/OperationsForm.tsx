import { useMemo } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { Divider, Stack } from '@mui/material';
import { ArrowDown } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { useMetaVault } from '../../../hooks';
import {
  useChangeOperation,
  useOperations,
  usePreview,
  useSetAmount,
} from '../hooks';

import type { BigDecimal } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { address: walletAddress } = useAccount();
  const { address, asset, assetToken, mvToken } = useMetaVault();
  const { amount, operation, tab } = useOperations();
  const { preview } = usePreview();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const { data: assetBalance } = useBalance({
    addressOrName: walletAddress,
    token: asset,
    enabled: !!asset,
    watch: true,
  });
  const { data: mvBalance } = useBalance({
    addressOrName: walletAddress,
    token: address,
    enabled: !!walletAddress,
    watch: true,
  });

  const primaryInput = useMemo(
    () =>
      ({
        deposit: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: amount,
          token: assetToken,
          balance: assetBalance,
        },
        mint: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: preview,
          token: assetToken,
          // TODO fetch max preview
          balance: assetBalance,
        },
        redeem: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: amount,
          token: mvToken,
          balance: mvBalance,
        },
        withdraw: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: preview,
          token: mvToken,
          balance: mvBalance,
        },
      }[operation]),
    [
      amount,
      assetBalance,
      assetToken,
      intl,
      mvBalance,
      mvToken,
      operation,
      preview,
    ],
  );

  const secondaryInput = useMemo(
    () =>
      ({
        deposit: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: preview,
          token: mvToken,
          balance: mvBalance,
        },
        mint: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: amount,
          token: mvToken,
          balance: mvBalance,
        },
        redeem: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: preview,
          token: assetToken,
          balance: assetBalance,
        },
        withdraw: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: amount,
          token: assetToken,
          // TODO fetch max preview
          balance: mvBalance,
        },
      }[operation]),
    [
      amount,
      assetBalance,
      assetToken,
      intl,
      mvBalance,
      mvToken,
      operation,
      preview,
    ],
  );

  const handlePrimaryChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'deposit' : 'redeem';
    if (newOp !== operation) {
      changeOperation(newOp);
    }
    setAmount(newValue);
  };

  const handleDownChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'mint' : 'withdraw';
    if (newOp !== operation) {
      changeOperation(newOp);
    }
    setAmount(newValue);
  };

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      {...props}
    >
      <TokenInput
        {...primaryInput}
        onChange={handlePrimaryChange}
        placeholder="0.00"
        disabled={!walletAddress}
      />
      <Divider>
        <ArrowDown fontWeight="bold" />
      </Divider>
      <TokenInput
        {...secondaryInput}
        onChange={handleDownChange}
        placeholder="0.00"
        disabled={!walletAddress}
        hideBottomRow
      />
    </Stack>
  );
};
