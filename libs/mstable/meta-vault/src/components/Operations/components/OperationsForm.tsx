import { useMemo } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavault } from '../../../state';
import { useChangeOperation, useOperations, useSetAmount } from '../hooks';

import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { assetToken, mvToken, assetBalance, mvBalance, assetsPerShare } =
    useMetavault();
  const { amount, operation, preview, tab, isLoading, isError } =
    useOperations();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();

  const primaryInput = useMemo(
    () =>
      ({
        deposit: {
          amount: amount,
        },
        mint: {
          amount: preview,
          isLoading,
        },
        withdraw: {
          amount: amount,
        },
        redeem: {
          amount: preview,
          isLoading,
        },
      }[operation]),
    [amount, isLoading, operation, preview],
  );

  const secondaryInput = useMemo(
    () =>
      ({
        deposit: {
          amount: preview,
          isLoading,
        },
        mint: {
          amount: amount,
        },
        withdraw: {
          amount: preview,
          isLoading,
        },
        redeem: {
          amount: amount,
        },
      }[operation]),
    [amount, isLoading, operation, preview],
  );

  const primaryBalance = useMemo(
    () =>
      tab === 0
        ? assetBalance
        : mvBalance?.exact && assetsPerShare?.exact
        ? new BigDecimal(mvBalance?.exact.mul(assetsPerShare?.exact))
        : BigDecimal.ZERO,
    [assetBalance, assetsPerShare?.exact, mvBalance?.exact, tab],
  );

  const primaryMaxLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Balance' })
        : intl.formatMessage({ defaultMessage: 'My Position' }),
    [intl, tab],
  );

  const handlePrimaryChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'deposit' : 'withdraw';
    if (newOp !== operation) {
      changeOperation(newOp);
    }
    setAmount(newValue);
  };

  const handleSecondaryChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'mint' : 'redeem';
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
      spacing={1}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...(!isConnected && {
          backgroundColor: 'background.highlight',
        }),
        ...props?.sx,
      }}
      {...props}
    >
      <TokenInput
        {...primaryInput}
        token={assetToken}
        max={primaryBalance}
        maxLabel={primaryMaxLabel}
        label={intl.formatMessage({ defaultMessage: 'Asset' })}
        onChange={handlePrimaryChange}
        placeholder="0.00"
        disabled={!isConnected}
        error={isError}
      />
      <Divider role="presentation" light={!isConnected}>
        <Typography variant="value6">
          {intl.formatMessage(
            { defaultMessage: '1 Share = {ratio} {asset}' },
            {
              ratio: assetsPerShare?.simple ?? '-',
              asset: assetToken?.symbol,
            },
          )}
        </Typography>
      </Divider>
      <TokenInput
        {...secondaryInput}
        hideTokenBadge
        hideBottomRow
        token={mvToken}
        label={intl.formatMessage({ defaultMessage: 'Shares' })}
        onChange={handleSecondaryChange}
        placeholder="0.00"
        disabled={!isConnected}
        error={isError}
      />
    </Stack>
  );
};
