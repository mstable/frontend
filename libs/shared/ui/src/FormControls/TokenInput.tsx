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

import type { StackProps } from '@mui/material';
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
            <Stack direction="row" spacing={1}>
              {range(1, PERCENTAGE_STEPS + 1).map((n) => (
                <Button
                  onClick={handlePercentageChange(n)}
                  value={n}
                  key={`percent-${n}`}
                  variant="outlined"
                  disabled={disabled}
                  sx={{
                    padding: 0.5,
                    margin: 0,
                    minWidth: 28,
                    minHeight: 16,
                    borderRadius: '4px',
                    color: 'grey.500',
                    borderColor: 'grey.100',
                    letterSpacing: '-0.04em',
                    textTransform: 'uppercase',
                    ':hover': {
                      color: 'primary.main',
                      borderColor: 'grey.100',
                    },
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
                </Button>
              ))}
            </Stack>
          )}
          {!disabled && balance ? (
            <Typography variant="value6" noWrap>
              {intl.formatMessage({ defaultMessage: 'Balance', id: 'balance' })}
              :&nbsp;
              {balance.format()}
            </Typography>
          ) : (
            <Typography
              variant="value6"
              p={0.5}
              color="grey.400"
              bgcolor="grey.200"
              borderRadius="4px"
              height={22}
              noWrap
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
