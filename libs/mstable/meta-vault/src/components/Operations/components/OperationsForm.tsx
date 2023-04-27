import { useCallback, useMemo, useRef, useState } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { Divider, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { Ticket } from 'phosphor-react';
import { mergeAll } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavault } from '../../../state';
import { useChangeOperation, useOperations, useSetAmount } from '../hooks';

import type { TokenInputProps } from '@frontend/shared-ui';
import type { BigDecimal } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const {
    metavault,
    assetBalance,
    mvBalance,
    assetBalanceInShare,
    mvBalanceInAsset,
  } = useMetavault();
  const {
    amount,
    operation,
    preview,
    assetsPerShare,
    tab,
    isInputLoading,
    isSubmitLoading,
    isError,
  } = useOperations();
  const theme = useTheme();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const [hasFocus, setHasFocus] = useState(false);
  const primary = useRef(null);
  const secondary = useRef(null);

  const input = useMemo(
    () => ({
      placeholder: '0.00',
      disabled: !isConnected || isSubmitLoading,
      isConnected: isConnected,
      error: isError,
      components: {
        input: {
          onFocus: () => {
            setHasFocus(true);
          },
          onBlur: () => {
            setHasFocus(false);
          },
        },
      },
    }),
    [isConnected, isError, isSubmitLoading],
  );

  const handlePrimaryChange = useCallback(
    (newValue: BigDecimal) => {
      const newOp = tab === 0 ? 'deposit' : 'withdraw';
      if (newOp !== operation) {
        changeOperation(newOp);
      }
      setAmount(newValue);
    },
    [changeOperation, operation, setAmount, tab],
  );

  const handleSecondaryChange = useCallback(
    (newValue: BigDecimal) => {
      const newOp = tab === 0 ? 'mint' : 'redeem';
      if (newOp !== operation) {
        changeOperation(newOp);
      }
      setAmount(newValue);
    },
    [changeOperation, operation, setAmount, tab],
  );

  const primaryInput = useMemo(
    () =>
      mergeAll([
        input,
        {
          token: metavault.asset,
          max: tab === 0 ? assetBalance : mvBalanceInAsset,
          maxIcon: 'wallet',
          hideTokenBadge: !isConnected || tab === 1,
          hideBottomRow: tab === 1,
          label: intl.formatMessage({ defaultMessage: 'Asset', id: 'WKCp0D' }),
          onChange: handlePrimaryChange,
          ref: primary,
        },
        {
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
        }[operation],
      ]) as TokenInputProps,
    [
      amount,
      metavault.asset,
      assetBalance,
      handlePrimaryChange,
      input,
      intl,
      isConnected,
      isInputLoading,
      mvBalanceInAsset,
      operation,
      preview,
      tab,
    ],
  );

  const secondaryInput = useMemo(
    () =>
      mergeAll([
        input,
        {
          token: metavault,
          max: tab === 0 ? assetBalanceInShare : mvBalance,
          maxIcon: 'vault',
          hideTokenBadge: !isConnected || tab === 0,
          hideBottomRow: tab === 0,
          label: intl.formatMessage({ defaultMessage: 'Shares', id: 'mrwfXX' }),
          tokenLabel: intl.formatMessage({
            defaultMessage: 'Shares',
            id: 'mrwfXX',
          }),
          tokenIcon: (
            <Ticket
              width={14}
              height={14}
              weight="fill"
              color={theme.palette.icons.color}
            />
          ),
          onChange: handleSecondaryChange,
          ref: secondary,
        },
        {
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
        }[operation],
      ]) as TokenInputProps,
    [
      amount,
      assetBalanceInShare,
      handleSecondaryChange,
      input,
      intl,
      isConnected,
      isInputLoading,
      metavault,
      mvBalance,
      operation,
      preview,
      tab,
      theme.palette.icons.color,
    ],
  );

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      spacing={3}
      sx={{
        border: (theme) =>
          `1px solid ${
            hasFocus ? theme.palette.primary.main : theme.palette.divider
          }`,
        backgroundColor: 'transparent',
        ...props?.sx,
      }}
      {...props}
    >
      <TokenInput {...primaryInput} />
      <Divider role="presentation" light={!isConnected}>
        {assetsPerShare ? (
          <Typography variant="value6">
            {intl.formatMessage(
              { defaultMessage: '1 Share = {ratio} {asset}', id: '/e4KBT' },
              {
                ratio: assetsPerShare?.simpleRounded ?? '-',
                asset: metavault.asset.symbol,
              },
            )}
          </Typography>
        ) : (
          <Skeleton width={150} height={26} />
        )}
      </Divider>
      <TokenInput {...secondaryInput} />
    </Stack>
  );
};
