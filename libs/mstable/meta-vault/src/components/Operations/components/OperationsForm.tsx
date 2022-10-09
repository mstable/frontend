import { useMemo } from 'react';

import { useDataSource } from '@frontend/shared-data-access';
import { TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavaultQuery } from '../../../queries.generated';
import { useMetavault } from '../../../state';
import { useChangeOperation, useOperations, useSetAmount } from '../hooks';

import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const {
    assetToken,
    mvToken,
    assetBalance,
    mvBalanceInAsset,
    metavault: { address },
  } = useMetavault();
  const dataSource = useDataSource();
  const { data: mvData } = useMetavaultQuery(
    dataSource,
    { id: address },
    { enabled: !!address },
  );
  const {
    amount,
    operation,
    preview,
    tab,
    isInputLoading,
    isSubmitLoading,
    isError,
  } = useOperations();
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
          isLoading: isInputLoading,
        },
        withdraw: {
          amount: amount,
        },
        redeem: {
          amount: preview,
          isLoading: isInputLoading,
        },
      }[operation]),
    [amount, isInputLoading, operation, preview],
  );

  const secondaryInput = useMemo(
    () =>
      ({
        deposit: {
          amount: preview,
          isLoading: isInputLoading,
        },
        mint: {
          amount: amount,
        },
        withdraw: {
          amount: preview,
          isLoading: isInputLoading,
        },
        redeem: {
          amount: amount,
        },
      }[operation]),
    [amount, isInputLoading, operation, preview],
  );

  const primaryBalance = useMemo(
    () => (tab === 0 ? assetBalance : mvBalanceInAsset || BigDecimal.ZERO),
    [assetBalance, mvBalanceInAsset, tab],
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
      spacing={3}
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
        disabled={!isConnected || isSubmitLoading}
        isConnected={isConnected}
        error={isError}
      />
      <Divider role="presentation" light={!isConnected}>
        <Typography variant="value6">
          {intl.formatMessage(
            { defaultMessage: '1 Share = {ratio} {asset}' },
            {
              ratio:
                intl.formatNumber(Number(mvData?.vault?.assetPerShare), {
                  maximumFractionDigits: 2,
                }) ?? '-',
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
        disabled={!isConnected || isSubmitLoading}
        isConnected={isConnected}
        error={isError}
      />
    </Stack>
  );
};
