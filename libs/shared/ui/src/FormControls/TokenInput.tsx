/* eslint-disable formatjs/no-id */
import { useEffect, useState } from 'react';

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

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  amount: BigDecimal;
  token: FetchTokenResult;
  balance?: BigDecimal;
  onChange?: (newValue: BigDecimal) => void;
  hideBottomRow?: boolean;
  hideTokenBadge?: boolean;
  components?: {
    container?: StackProps;
  };
};

const PERCENTAGE_STEPS = 4; // 25%

const balanceStyles: SxProps = {
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

export const TokenInput = ({
  label,
  placeholder,
  disabled,
  error,
  isLoading,
  amount,
  token,
  balance,
  onChange,
  hideBottomRow = false,
  hideTokenBadge = false,
  components,
}: TokenInputProps) => {
  const [percentage, setPercentage] = useState(0);
  const intl = useIntl();

  useEffect(() => {
    if (balance && amount) {
      const ranges = range(1, PERCENTAGE_STEPS + 1).map(
        (n) => balance.simple * n * (1 / PERCENTAGE_STEPS),
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
  }, [amount, balance]);

  const handlePercentageChange = (newValue: number) => () => {
    setPercentage(newValue);
    if (onChange) {
      onChange(
        BigDecimal.fromSimple(
          balance?.simple * newValue * (1 / PERCENTAGE_STEPS),
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
        <BigDecimalInput
          placeholder={placeholder}
          value={amount}
          error={error}
          onChange={handleChange}
          disabled={disabled}
          isLoading={isLoading}
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
        />
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
            <Skeleton
              variant="rectangular"
              width={160}
              height={24}
              sx={{ my: 1 }}
            />
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
          {!disabled && balance ? (
            <Typography
              variant="value6"
              sx={{
                ...balanceStyles,
                color: 'text.secondary',
              }}
              noWrap
            >
              {intl.formatMessage({ defaultMessage: 'Balance', id: 'balance' })}
              :&nbsp;
              {balance.format()}
            </Typography>
          ) : (
            <Typography
              variant="value6"
              noWrap
              sx={{
                ...balanceStyles,
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
};
