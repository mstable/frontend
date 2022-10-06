/* eslint-disable formatjs/no-id */
import { forwardRef, useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  FormControl,
  InputLabel,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { TokenIcon } from '../TokenIcon';
import { BigDecimalInput } from './BigDecimalInput';

import type { ButtonProps, StackProps, SxProps } from '@mui/material';
import type { FetchTokenResult } from '@wagmi/core';

import type { BigDecimalInputProps } from './BigDecimalInput';

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
  amount: BigDecimal;
  token: FetchTokenResult;
  max?: BigDecimal;
  maxLabel?: string;
  onChange?: (newValue: BigDecimal) => void;
  hideBottomRow?: boolean;
  hideTokenBadge?: boolean;
  components?: {
    container?: StackProps;
    input?: Omit<
      BigDecimalInputProps,
      'value' | 'min' | 'max' | 'onChange' | 'ref'
    >;
  };
};

const PERCENTAGE_STEPS = 4; // 25%

const maxStyles: SxProps = {
  paddingX: 0.5,
  paddingY: 0.75,
  borderRadius: '4px',
};

const PercentageButton = (props: ButtonProps) => (
  <Button
    {...props}
    variant="outlined"
    size="small"
    sx={(theme) => ({
      padding: 0.5,
      margin: 0,
      minWidth: 28,
      minHeight: 16,
      borderRadius: '4px',
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[600]
          : theme.palette.grey[500],
      borderColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
      letterSpacing: '-0.04em',
      textTransform: 'uppercase',
      ':hover': {
        color: 'primary.main',
        borderColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      },
      '&.Mui-disabled': {
        color: 'text.disabled',
        borderColor: 'action.disabledBackground',
        ':hover': {
          borderColor: 'text.disabled',
        },
      },
      ...props?.sx,
    })}
  />
);

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  (
    {
      label,
      placeholder,
      disabled,
      error,
      isLoading,
      isConnected,
      amount,
      token,
      max,
      maxLabel,
      onChange,
      hideBottomRow = false,
      hideTokenBadge = false,
      components,
    },
    ref,
  ) => {
    const [percentage, setPercentage] = useState(0);
    const intl = useIntl();

    useEffect(() => {
      if (max && amount) {
        const ranges = range(1, PERCENTAGE_STEPS + 1).map(
          (n) => max.simple * n * (1 / PERCENTAGE_STEPS),
        );
        const idx = ranges.findIndex((r) => r === amount.simple);
        if (idx > -1) {
          setPercentage(idx + 1);
        } else {
          setPercentage(0);
        }
      } else {
        setPercentage(0);
      }
    }, [amount, max]);

    const handlePercentageChange = (newValue: number) => () => {
      setPercentage(newValue);
      if (onChange) {
        onChange(
          BigDecimal.fromSimple(
            max?.simple * newValue * (1 / PERCENTAGE_STEPS),
          ),
        );
      }
    };

    const handleChange = (value: BigDecimal) => {
      setPercentage(0);
      if (onChange) {
        onChange(value);
      }
    };

    return (
      <Stack {...components?.container}>
        <FormControl disabled={disabled} error={error}>
          <InputLabel error={error}>{label}</InputLabel>
          {isLoading ? (
            <Skeleton variant="rectangular" height={48} sx={{ mt: 1 }} />
          ) : (
            <BigDecimalInput
              ref={ref}
              placeholder={placeholder}
              value={amount}
              error={error}
              onChange={handleChange}
              disabled={disabled}
              endAdornment={
                !disabled &&
                !hideTokenBadge && (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      p: 1,
                      borderRadius: '4px',
                      backgroundColor: 'background.highlight',
                      color: 'text.primary',
                    }}
                  >
                    <TokenIcon
                      symbol={token?.symbol}
                      sx={{ width: 14, height: 14 }}
                    />
                    <Typography variant="buttonMedium" color="inherit">
                      {token?.symbol}
                    </Typography>
                  </Stack>
                )
              }
              {...components?.input}
            />
          )}
        </FormControl>
        {!hideBottomRow && (
          <Stack
            direction="row"
            mt={1}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            {isLoading ? (
              <Skeleton variant="rectangular" width={160} height={22} />
            ) : (
              <Stack direction="row" spacing={0.5}>
                {range(1, PERCENTAGE_STEPS + 1).map((n) => (
                  <PercentageButton
                    onClick={handlePercentageChange(n)}
                    value={n}
                    key={`percent-${n}`}
                    disabled={disabled}
                    sx={{
                      ...(n === percentage && {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        ':hover': {
                          borderColor: 'primary.main',
                        },
                      }),
                    }}
                  >
                    {`${
                      n === PERCENTAGE_STEPS
                        ? 'MAX'
                        : `${n * (100 / PERCENTAGE_STEPS)}%`
                    }`}
                  </PercentageButton>
                ))}
              </Stack>
            )}
            {isConnected && max ? (
              <Typography
                variant="value6"
                sx={{
                  ...maxStyles,
                  color: 'text.secondary',
                }}
                noWrap
              >
                {maxLabel ??
                  intl.formatMessage({
                    defaultMessage: 'Balance',
                    id: 'balance',
                  })}
                :&nbsp;
                {max.format()}
              </Typography>
            ) : (
              <Typography
                variant="value6"
                noWrap
                sx={{
                  ...maxStyles,
                  color: 'text.disabled',
                  backgroundColor: 'action.disabledBackground',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Not Connected',
                  id: 'not_connected',
                })}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    );
  },
);
TokenInput.displayName = 'TokenInput';
