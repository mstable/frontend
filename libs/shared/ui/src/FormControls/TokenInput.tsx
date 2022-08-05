import { useEffect, useState } from 'react';

import { USDC } from '@frontend/shared-icons';
import { BigDecimal } from '@frontend/shared-utils';
import {
  FormControl,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { BigDecimalInput } from './BigDecimalInput';

import type { StackProps, Theme } from '@mui/material';
import type { FetchTokenResult } from '@wagmi/core';

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  amount: BigDecimal;
  token: FetchTokenResult;
  balance?: BigDecimal;
  onChange?: (newValue: BigDecimal) => void;
  hideBottomRow?: boolean;
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
  amount,
  token,
  balance,
  onChange,
  hideBottomRow = false,
  components,
}: TokenInputProps) => {
  const [percentage, setPercentage] = useState(0);
  const intl = useIntl();

  useEffect(() => {
    if (!amount) {
      setPercentage(0);
    }
  }, [amount]);

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
          endAdornment={
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                p: 1,
                borderRadius: '4px',
                backgroundColor: 'background.highlight',
              }}
            >
              <USDC sx={{ width: 14, height: 14 }} />
              <Typography variant="buttonMedium" sx={{ color: 'text.primary' }}>
                {token?.symbol}
              </Typography>
            </Stack>
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
          {balance && (
            <Typography variant="value6">
              {intl.formatMessage({ defaultMessage: 'Balance' })}
              :&nbsp;
              {balance.format()}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};
