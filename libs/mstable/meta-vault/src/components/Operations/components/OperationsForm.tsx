import { useCallback, useMemo, useRef, useState } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import {
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
    assetToken,
    mvToken,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
          token: assetToken,
          max: tab === 0 ? assetBalance : mvBalanceInAsset,
          maxIcon: 'wallet',
          hideTokenBadge: !isConnected || !assetToken || tab === 1,
          hideBottomRow: tab === 1,
          label: intl.formatMessage({ defaultMessage: 'Asset' }),
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
      assetBalance,
      assetToken,
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
          token: mvToken,
          max: tab === 0 ? assetBalanceInShare : mvBalance,
          maxIcon: 'vault',
          hideTokenBadge: !isConnected || !mvToken || tab === 0,
          hideBottomRow: tab === 0,
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          tokenLabel: intl.formatMessage({ defaultMessage: 'Shares' }),
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
      mvBalance,
      mvToken,
      operation,
      preview,
      tab,
      theme.palette.icons.color,
    ],
  );

  return (
    <Stack
      borderRadius={1}
      p={isMobile ? 0 : 2}
      direction="column"
      spacing={3}
      sx={{
        border: isMobile
          ? undefined
          : (theme) =>
              `1px solid ${
                hasFocus ? theme.palette.primary.main : theme.palette.divider
              }`,
        ...(!isConnected && {
          backgroundColor: 'background.highlight',
        }),
        ...props?.sx,
      }}
      {...props}
    >
      <TokenInput {...primaryInput} />
      <Divider role="presentation" light={!isConnected}>
        {assetsPerShare && assetToken ? (
          <Typography variant="value6">
            {intl.formatMessage(
              { defaultMessage: '1 Share = {ratio} {asset}' },
              {
                ratio: assetsPerShare?.simpleRounded ?? '-',
                asset: assetToken?.symbol,
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
