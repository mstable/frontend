import { useState } from 'react';

import { Metamask, USDC } from '@frontend/shared-icons';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  FormControl,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { range } from 'ramda';

import { BigDecimalInput } from './BigDecimalInput';

import type { StackProps, Theme } from '@mui/material';
import type { FetchBalanceResult, FetchTokenResult } from '@wagmi/core';

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  amount: BigDecimal;
  token: FetchTokenResult;
  balance: FetchBalanceResult;
  onChange?: (newValue: BigDecimal) => void;
  hideBottomRow?: boolean;
  components?: {
    container?: StackProps;
  };
};

const PERCENTAGE_STEPS = 4; // 100 / 4 = 25%

const balanceButton = (theme: Theme) => ({
  p: 0.5,
  borderRadius: '4px',
  minWidth: 0,
  minHeight: 0,
  ...theme.typography.value6,
});

const symbolButton = (theme: Theme) => ({
  py: 0.5,
  px: 1.5,
  borderRadius: '4px',
  minWidth: 48,
});

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
  amount,
  token,
  balance,
  onChange,
  hideBottomRow = false,
  components,
}: TokenInputProps) => {
  const bal = balance?.value
    ? new BigDecimal(balance.value, token?.decimals)
    : BigDecimal.ZERO;
  const [percentage, setPercentage] = useState(0);

  const handlePercentageChange = (_, newValue: number | null) => {
    setPercentage(newValue);
    if (onChange) {
      onChange(
        BigDecimal.fromSimple(bal.simple * newValue * (1 / PERCENTAGE_STEPS)),
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
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <BigDecimalInput
          placeholder={placeholder}
          value={amount}
          max={bal}
          onChange={handleChange}
          endAdornment={
            <Button variant="text" color="secondary" sx={symbolButton}>
              <USDC sx={{ width: 12, height: 12, mr: 0.5 }} />
              <Typography variant="buttonMedium">{token?.symbol}</Typography>
            </Button>
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
            sx={percentageButtonGroup}
          >
            {range(1, PERCENTAGE_STEPS + 1).map((n) => (
              <ToggleButton value={n} key={`percent-${n}`}>
                {n * (100 / PERCENTAGE_STEPS)}%
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button variant="text" color="secondary" sx={balanceButton}>
            <Metamask sx={{ width: 12, height: 12, mr: 1 }} />
            <Typography variant="value6">
              {bal.format()} {balance?.symbol}
            </Typography>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
