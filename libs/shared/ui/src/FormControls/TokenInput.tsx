/* eslint-disable formatjs/no-id */
import { useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import {
  FormControl,
  InputLabel,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { TokenIcon } from '../TokenIcon';
import { BigDecimalInput } from './BigDecimalInput';

import type { StackProps, Theme } from '@mui/material';
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
  connected: boolean;
  components?: {
    container?: StackProps;
  };
};

const PERCENTAGE_STEPS = 4; // 25%

const percentageButtonGroup = (theme: Theme) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.2, 0),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: '4px',
    },
    '&:first-of-type': {
      borderRadius: '4px',
    },
  },
});

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
  connected = false,
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

  const handlePercentageChange = (_, newValue: number | null) => {
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
            !disabled && (
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
            <ToggleButtonGroup
              value={percentage}
              onChange={handlePercentageChange}
              exclusive
              size="small"
              disabled={
                !balance || balance?.exact?.eq(constants.Zero) || disabled
              }
              sx={percentageButtonGroup}
            >
              {range(1, PERCENTAGE_STEPS + 1).map((n) => (
                <ToggleButton value={n} key={`percent-${n}`}>
                  {`${
                    n === PERCENTAGE_STEPS
                      ? 'MAX'
                      : `${n * (100 / PERCENTAGE_STEPS)}%`
                  }`}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
          {connected && balance ? (
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
