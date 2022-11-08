import { useEffect, useMemo, useRef, useState } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavault } from '../../../state';
import { useChangeOperation, useOperations, useSetAmount } from '../hooks';

import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { assetToken, mvToken, assetBalance, mvBalanceInAsset } =
    useMetavault();
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
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const [hasFocus, setHasFocus] = useState(false);
  const primary = useRef(null);
  const secondary = useRef(null);

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

  const disabled = useMemo(
    () =>
      !isConnected ||
      isSubmitLoading ||
      (tab === 1 && primaryBalance?.exact.isZero()),
    [isConnected, isSubmitLoading, primaryBalance?.exact, tab],
  );

  useEffect(() => {
    if (
      document.hasFocus() &&
      (primary.current?.contains(document.activeElement) ||
        secondary.current?.contains(document.activeElement))
    ) {
      setHasFocus(true);
    }
  }, []);

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
        border: (theme) =>
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
      <TokenInput
        {...primaryInput}
        token={assetToken}
        max={primaryBalance}
        label={intl.formatMessage({ defaultMessage: 'Asset' })}
        onChange={handlePrimaryChange}
        placeholder="0.00"
        disabled={disabled}
        isConnected={isConnected}
        hideTokenBadge={!isConnected}
        error={isError}
        ref={primary}
        components={{
          input: {
            onFocus: () => {
              setHasFocus(true);
            },
            onBlur: () => {
              setHasFocus(false);
            },
          },
        }}
      />
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
      <TokenInput
        {...secondaryInput}
        hideTokenBadge
        hideBottomRow
        token={mvToken}
        label={intl.formatMessage({ defaultMessage: 'Shares' })}
        onChange={handleSecondaryChange}
        placeholder="0.00"
        disabled={disabled}
        isConnected={isConnected}
        error={isError}
        ref={secondary}
        components={{
          input: {
            onFocus: () => {
              setHasFocus(true);
            },
            onBlur: () => {
              setHasFocus(false);
            },
          },
        }}
      />
    </Stack>
  );
};
